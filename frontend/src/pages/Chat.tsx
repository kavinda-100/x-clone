import ChatSideBar from "../sections/ChatSideBar";
import ChatBody from "../sections/ChatBody";

const Chat = () => {
  return (
    <section className={"w-full flex flex-col flex-1"}>
      <div className={"flex gap-2"}>
        <ChatSideBar />
        <ChatBody />
      </div>
    </section>
  );
};

export default Chat;
