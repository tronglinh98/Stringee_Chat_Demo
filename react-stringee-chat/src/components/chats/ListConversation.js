import {convListState, convSelectedState, setConvSelectedStore} from "../../store/chat";
import {useDispatch, useSelector} from "react-redux";
import "./../../css/list_conversation.scss"

const ListConv = (props) => {
    const convListStore = useSelector(convListState);
    const convSelectedStore = useSelector(convSelectedState);

    const dispatch = useDispatch();

    function onSelectConv(conv) {
        dispatch(setConvSelectedStore(conv));
        // convSelectedId.current = conv.id;

        if (props.showMessages) {
            props.showMessages(conv);
        }

        if (props.selectConvInChatBox) {
            props.selectConvInChatBox();
        }
    }

    return (
        <div className="col">
            List conversations:<br/>

            <ol className="list-group list-group-numbered" id="listConvs">
                {
                    convListStore.map((conv) => {
                        return <li className={"list-group-item one_conv " + (conv.id === convSelectedStore.id ? "active" : '')}
                                   onClick={() => onSelectConv(conv)}
                                   key={conv.id}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold conv-name">{conv.name}</div>
                                <span className="conv-last-msg">
                                    {conv.lastMessage.type === 1 ?
                                        conv.lastMessage.sender + ': ' + conv.lastMessage.content.text
                                        : (conv.lastMessage.type === 7 ?
                                            conv.lastMessage.content.creator + ': created group' : '')}
                                </span>
                            </div>
                            {conv.unread ? <span className="badge bg-primary rounded-pill conv-unread">{conv.unread}</span> : ''}
                        </li>
                    })
                }
            </ol>

        </div>
    )
}

export default ListConv;