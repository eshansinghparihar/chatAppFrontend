import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { sendMessage } from "../../../features/chatSlice";
import { sendEmailAsync } from '../../../features/emailSlice';
import { SendIcon } from "../../../svg";
import { Attachments } from "./attachments";
import EmojiPickerApp from "./EmojiPicker";
import Input from "./Input";
import SocketContext from "../../../context/SocketContext";
import { checkOnlineStatus } from "../../../utils/chat";
function ChatActions({ socket, onlineUsers }) {
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [loading, setLoading] = useState(false);
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const [message, setMessage] = useState("");
  const textRef = useRef();
  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token,
  };

  const SendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    /* TODO: Check if the participant is online
    if participant is not online then we trigger an email for the participant
    */

    if(!checkOnlineStatus(onlineUsers, user, activeConversation.users))
    {
      console.log('Sending email since user offline')
      try{
      
      const sender = activeConversation.latestMessage.sender.email
      const messageText = message
      const { email } = activeConversation.users.filter(user=> user.email !== sender)[0]
      
      await dispatch(sendEmailAsync({ sender, email, message: messageText }));
      console.log('Email sent successfully!');
      
      }
      catch (error) {
        console.error('Failed to send email',error);
      }
    }

    let newMsg = await dispatch(sendMessage(values));
    socket.emit("send message", newMsg.payload);
    setMessage("");
    setLoading(false);
  };
  return (
    <form
      onSubmit={(e) => SendMessageHandler(e)}
      className="dark:bg-dark_bg_6 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      {/*Container*/}
      <div className="w-full flex items-center gap-x-2">
        {/*Emojis and attachpments*/}
        <ul className="flex gap-x-2">
          <EmojiPickerApp
            textRef={textRef}
            message={message}
            setMessage={setMessage}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
            setShowPicker={setShowPicker}
          />
        </ul>
        {/*Input*/}
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        {/*Send button*/}
        <button type="submit" className="btn">
          {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}

const ChatActionsWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActions {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default ChatActionsWithSocket;
