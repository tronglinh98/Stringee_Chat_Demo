import {useState} from "react";
import {StringeeChat2} from "stringee";
import {unshiftItemToConvList} from "../../store/chat";
import {useDispatch} from "react-redux";

const CreateConversation = (props) => {
    const client = props.client;

    const dispatch = useDispatch();

    const [userIdsInput, setUserIdsInput] = useState('');

    function createNewChatConv() {
        let userIds = [];
        let listUserIDs = userIdsInput.trim().split(',');

        listUserIDs.forEach((id) => {
            if (id.trim().length === 0) {
                return;
            }

            userIds.push(id.trim());
        });

        if (userIds.length === 0) {
            alert('Please enter userIDs');
            return;
        }

        let name = 'Group ' + userIdsInput.trim();
        let options = {
            isDistinct: true,
            isGroup: true,
            name: name,
        };

        StringeeChat2.createConversation(client, userIds, options)
            .then(function (createdConv) {
                console.log('created Conversation', createdConv);

                dispatch(unshiftItemToConvList(createdConv))
            })
            .catch(function (err) {
                console.log(err);
            });

        setUserIdsInput('');
    }

    return (
        <div className="col">
            Create new conversation with:
            <div className="mb-3">
                <input type="text" className="form-control" id="listUserIDs"
                       value={userIdsInput}
                       onChange={e => setUserIdsInput(e.target.value)}
                       placeholder="user_id_1, user_id_2, user_id_3,..."/>
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary mb-3" id="createNewBtn" onClick={createNewChatConv}>
                    Create new conv
                </button>
            </div>
        </div>
    )
}

export default CreateConversation