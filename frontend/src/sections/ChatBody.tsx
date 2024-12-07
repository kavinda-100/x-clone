import { useChatStore } from "../store/useChatStore";
import { MessageCircle } from "lucide-react";
import ChatBodyHeader from "../components/ChatBodyHeader";
import ChatBodyMessageBar from "../components/ChatBodyMessageBar";

const ChatBody = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className={"w-full h-full"}>
      {selectedUser === null ? (
        <section className={"w-full h-full"}>
          <div className={"flex justify-center items-center"}>
            <h1
              className={
                "flex gap-2 text-md text-center text-muted-foreground my-4"
              }
            >
              Select a user to start chatting
              <MessageCircle className={"size-5 animate-bounce"} />
            </h1>
          </div>
        </section>
      ) : (
        <section className={"h-full w-full"}>
          <ChatBodyHeader user={selectedUser} />
          <div className={"flex flex-1"}>
            <p>messages</p>
          </div>
          <ChatBodyMessageBar />
        </section>
      )}
    </div>
  );
};

export default ChatBody;
