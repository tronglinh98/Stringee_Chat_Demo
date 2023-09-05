import {useDispatch, useSelector} from "react-redux";
import {convSelectedState, msgListState, pushItemToMsgList} from "../../store/chat";
import {useEffect, useRef, useState} from "react";

const ContentConversation = () => {
    const dispatch = useDispatch();
    const convSelectedStore = useSelector(convSelectedState);
    const msgListStore = useSelector(msgListState);

    const [msgInput, setMsgInput] = useState('');
    const messagesEndRef = useRef();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [msgListStore]);

    function sendMsg(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (!convSelectedStore || !convSelectedStore.id) {
                alert('Please select conversation!')
                return false;
            }

            let messageObject = {
                text: msgInput.trim()
            };

            convSelectedStore
                .sendMessage(1, messageObject)
                .then((msg1) => {
                    console.log('sent success', msg1);

                    dispatch(pushItemToMsgList(msg1));
                    msg1.conv.markRead(msg1);
                })
                .catch((e) => {
                    console.log(e);
                });

            setMsgInput('');
        }
    }

    return (
        <div className="col">
            <span style={{color: "blue"}} id="selectedConv">
                Selected conversation: {convSelectedStore.id}
            </span>

            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Content:</label>

                <div className="list-group overflow-auto" id="convContent" style={{height: "320px"}}>
                    {
                        msgListStore.map((msg) => {
                            let usersReadThisMsg = [];
                            msg.conv.participants.forEach((participant) => {
                                if (participant.lastMsgSeqSeen === msg.seq) {
                                    usersReadThisMsg.push(participant.user);
                                }
                            });

                            return <div className="list-group-item list-group-item-action" key={msg.id}>
                                <div className="d-flex justify-content-between">
                                    <span className="mb-1 msg-content">
                                        {
                                            msg.type == 1 ?
                                                msg.sender + ': ' + msg.content.text :
                                                msg.type == 7 ?
                                                    msg.content.creator + ': created group' : ''
                                        }
                                    </span>

                                </div>
                                <p style={{textAlign: "right", marginBottom: "0"}}>
                                    { usersReadThisMsg.length ?
                                        <small className="text-muted msg-read-users">Read: {usersReadThisMsg.join(', ')}</small>
                                        : '' }
                                </p>
                            </div>
                        })
                    }

                    <div ref={messagesEndRef}/>
                </div>

            </div>
            <div className="mb-3">
                {
                    convSelectedStore.id &&
                    <input type="text" className="form-control" id="msgToSend"
                           value={msgInput}
                           onChange={e => setMsgInput(e.target.value)}
                           onKeyUp={sendMsg}
                           placeholder="Enter message end ENTER to send"/>
                }
            </div>
        </div>
    )
}

export default ContentConversation;