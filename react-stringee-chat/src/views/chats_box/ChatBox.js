import {useState} from "react";
import Chat from "../chats/Chat";
import "./../../css/chat_box.scss";

function ChatBox(props) {
    const [showChat, setShowChat] = useState(false);
    const [chatStep, setChatStep] = useState(1);

    function toggleChatOn() {
        let chatBoxIframeWrapper = window.parent.document.getElementById('stringeeX_chatbox_iframe_wrapper');

        if (chatBoxIframeWrapper) {
            if (showChat) {
                chatBoxIframeWrapper.classList.remove('full-open');
            } else {
                chatBoxIframeWrapper.classList.add('full-open');
            }
        }

        setShowChat(!showChat);
    }

    function selectConvInChatBox() {
        setChatStep(2);
    }

    return <div className="row">
        <div id="stringeechat" className="k8s">
            <div className={"Layout Layout-open Layout-expand Layout-right stringeechat" + (showChat? '' : ' display-none')}>
                <div className="Messenger_messenger initial_chat" style={{display: "block"}}>
                    <div className="Messenger_header">
                        <h4 className="Messenger_prompt" tkey="chat_us">
                            Trò chuyện với chúng tôi
                        </h4>
                        <div className="header_right">
                            <span className="chat_close_icon" onClick={toggleChatOn}>
                                <svg>
                                    <path
                                        d="M0 0H30V5H0z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="Messenger_content">
                        <Chat access_token={props.access_token} chat_step={chatStep} selectConvInChatBox={selectConvInChatBox}/>
                    </div>
                </div>
            </div>
            { !showChat && <div className="chat_on" onClick={toggleChatOn} style={{marginLeft: "-12px"}}>
                <div className="badge">0</div>
                <img className="chat_on_img" id="chat_on_img" alt=""
                     src="https://vn-release-stringeex-chat-widget.stringeetest.com//css/assets/chat-icon.png"/>
            </div> }
        </div>
    </div>
}
export default ChatBox;