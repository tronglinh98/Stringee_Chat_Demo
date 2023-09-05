import './App.css';
import Chat from "./views/chats/Chat";
import ChatBox from "./views/chats_box/ChatBox";
import {useRef} from "react";

function App() {
    const accessToken = useRef(getUrlParameter('key'));
    function getUrlParameter(name) {
        try {
            const stringeeXChatWidget = window.parent.document.getElementById("stringeeXChatWidget")
            if (stringeeXChatWidget) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
                let results = regex.exec(
                    window.parent.document
                        .getElementById("stringeeXChatWidget")
                        .getAttribute("src")
                );
                return results === null
                    ? ""
                    : decodeURIComponent(results[1].replace(/\+/g, " "));
            } else {
                let url = new URL( window.location.href);
                return url.searchParams.get(name);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="container">
            {
                accessToken.current ?
                    <ChatBox access_token={accessToken.current}/> :
                    <Chat/>
            }
        </div>
    );
}

export default App;
