import {useState, useEffect, useCallback, useRef} from "react";
import ListConversation from "./../../components/chats/ListConversation";
import ContentConversation from "./../../components/chats/ContentConversation";
import CreateConversation from "./../../components/chats/CreateConversation";
import {StringeeClient, StringeeChat2, StringeeServiceType} from "stringee";

import {useDispatch, useSelector} from "react-redux";
import {
    setConvListStore,
    convSelectedState,
    convListState,
    msgListState,
    unshiftItemToConvList,
    pushItemToMsgList,
    setMsgListStore
} from '../../store/chat';

function Chat(props) {
    const [client, setClient] = useState(null);
    const [auth, setAuth] = useState(null);
    const [connected, setConnected] = useState(false);

    const convListRef = useRef([]);
    const convSelectedId = useRef(null);
    const listMsgRef = useRef([]);

    const convSelectedStore = useSelector(convSelectedState);
    const convListStore = useSelector(convListState);
    const msgListStore = useSelector(msgListState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.parent.StringeeClient) {
            console.log('++++++ StringeeClient được truyền vào', window.parent.StringeeClient);
            setClient(window.parent.StringeeClient);
        } else {
            console.log('++++++ tự sinh StringeeClient');

            const STRINGEE_SERVER_ADDRS = [
                "wss://v1.stringee.com:6899/",
                "wss://v2.stringee.com:6899/"
            ];
            const client = new StringeeClient(STRINGEE_SERVER_ADDRS);
            client.isInternal = true;

            setClient(client);
        }

        // fix tạm lỗi StringeeServiceType trên sdk
        window.StringeeServiceType = StringeeServiceType;
    }, [])

    useEffect(() => { convListRef.current = convListStore; }, [convListStore]);
    useEffect(() => { convSelectedId.current = convSelectedStore.id }, [convSelectedStore]);
    useEffect(() => { listMsgRef.current = msgListStore;}, [msgListStore]);


    useEffect(() => {
        if (client) {
            if (client.isInternal) {
                let access_token = "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSy4wLmFKTGdUR0h5WER1eFY2bVdEMFU3MTV4a2RQeHJBZkJHLTE2OTMyMTI3NDkiLCJpc3MiOiJTSy4wLmFKTGdUR0h5WER1eFY2bVdEMFU3MTV4a2RQeHJBZkJHIiwiZXhwIjoxNjk1ODA0NzQ5LCJ1c2VySWQiOiJsaW5oNCJ9.2U6lZhAEnBAlvtmh_R9DFg71-2LqXjKG5qQBhAjDEgg";

                if (props.access_token) {
                    access_token = props.access_token;
                }

                client.connect(access_token);

                client.on("connect", () => {
                    console.log("++++++++++++++ connected");
                });
                client.on("disconnect", () => {
                    setConnected(false);
                    console.log("++++++++++++++ disconnected");
                });

                client.on('authen', function (res) {
                    setConnected(true);
                    setAuth(res);
                    console.log('authen', res);
                });
            } else {
                setAuth(window.parent.authStringee);
                setConnected(!!client.hasConnected);
            }
        }
    }, [client])

    const showListConversations = useCallback(() => {
        let lastUpdateGreater = 0;
        let lastUpdateSmaller = Number.MAX_SAFE_INTEGER;
        StringeeChat2.getListConversations(
            client,
            lastUpdateGreater,
            lastUpdateSmaller,
            10
        )
            .then(function (convs1) {
                console.log('getListConversations', convs1);

                // setConvList(convs1);
                dispatch(setConvListStore(convs1));
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [client, dispatch]);

    const showMessages = useCallback((conv) => {
        const seqGreater = 0;
        const seqSmaller = Number.MAX_SAFE_INTEGER;
        const limit = 50;
        const sort = 'DESC';

        conv
            .getMessages(seqGreater, seqSmaller, limit, sort)
            .then(function (messages) {
                console.log('messages', messages);
                dispatch(setMsgListStore(messages.reverse()));

                //danh dau da doc (seen): truyen len msg co seq lon nhat
                console.log('messages last: ', messages[messages.length - 1]);
                let lastMsg = messages[messages.length - 1];
                conv.markRead(lastMsg);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [dispatch])

    const settingsChat = useCallback(() => {
        if (client) {
            if (client.isInternal) {
                console.log("StringeeChat2 init ++++++++++++++++")
                StringeeChat2.init(client);
            }

            showListConversations();
        }
    }, [client, dispatch, showListConversations, showMessages]);


    useEffect(() => {
        if (connected) {
            settingsChat();
        }
    }, [connected, settingsChat]);

    const appendMessage = useCallback((message, append) => {
        if (!append) {
            return;
        }

        console.log('appendMessage', listMsgRef.current, message);

        for (let i = listMsgRef.current.length - 1; i >= 0; i--) {
            if (listMsgRef.current[i].id === message.id) {
                return;
            }
        }

        // setListMsg([...listMsgRef.current, message]);
        dispatch(pushItemToMsgList(message));

    }, [dispatch]);

    const changeMessageState = useCallback((event) => {
        if (!convSelectedId.current) {
            return;
        }

        let participant = event.participant;
        console.log('changemessagestate+++++++++', event);

        if (participant.conv.id === convSelectedId.current && event.status === 'MsgSeen') {
            //TOOD: can code toi uu hon
            let msg1 = participant.conv.getMsgBySeq(event.oldLastMsgSeqSeen);
            if (msg1) {
                console.log('render lai tin nhan msg1+++++++++', msg1.content.text);
                appendMessage(msg1, false);
            }

            //lastMsgSeqSeen: 228
            let msg2 = participant.conv.getMsgBySeq(event.participant.lastMsgSeqSeen);
            if (msg2) {
                console.log('render lai tin nhan msg2+++++++++', msg2.content.text);
                appendMessage(msg2, false);
            }
        }
    }, [appendMessage]);

    const addChatMessage = useCallback((message) => {
        console.log('addchatmessage', message);
        //xem trong mang convs co chua
        let convIndex = convListRef.current.findIndex((conv) => conv.id === message.conv.id);
        if (convIndex === -1) {
            dispatch(unshiftItemToConvList(message.conv))
            // dispatch(setConvListStore([message.conv, ...convListRef.current]))
        } else {
            if (message.conv.id === convSelectedId.current) {
                //tin nhan den dung man hinh dang xem
                message.conv.unread = 0;
                message.conv.markRead(message);
            }

            const convListTemp = [...convListRef.current];
            convListTemp[convIndex] = message.conv;
            dispatch(setConvListStore(convListTemp))
        }

        if (message.conv.id === convSelectedId.current) {
            appendMessage(message, 1);
        }
    }, [appendMessage, dispatch])

    useEffect(() => {
        if (client && connected) {
            if (client._onMethods.findIndex(el => (el.key === "changemessagestate")) === -1) {
                console.log('client listener event chat message ++++++');
                client.on('changemessagestate', (ev) => changeMessageState(ev));

                client.on('addchatmessage', (message) => addChatMessage(message));
            }
        }
    }, [addChatMessage, changeMessageState, client, connected]);

    return (
        <div className="container-fluid">
            <h2 style={{textAlign: "center"}}>
                React Chat Demo
            </h2>

            {auth ? <div>
                <span style={{color:  "black"}}>Logged in: </span>
                <span style={{fontWeight: 'bold', color: 'blue'}}>{auth.userId}</span>
            </div> : ''}

            <div className="row">
                {(!props.chat_step || props.chat_step === 1) &&
                    <ListConversation showMessages={showMessages} selectConvInChatBox={props.selectConvInChatBox} />}

                {(!props.chat_step || props.chat_step === 2) && <ContentConversation />}

                {!props.chat_step && <CreateConversation client={client}/>}
            </div>
        </div>
    );
}

export default Chat;
