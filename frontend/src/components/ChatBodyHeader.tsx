import { messageUserType } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";

type ChatBodyHeaderProps = {
  user: messageUserType;
};

const ChatBodyHeader = ({ user }: ChatBodyHeaderProps) => {
  const { onlineUsers, setSelectedUserToNull } = useChatStore();
  return (
    <div className={"w-full h-auto border border-b p-2 rounded-md"}>
      <div className={"flex justify-between items-center"}>
        <div className={"flex justify-start items-center gap-2"}>
          <Avatar>
            <AvatarImage src={user.profileImage} alt={user.userName} />
            <AvatarFallback>{user.userName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className={"text-lg font-semibold"}>{user.userName}</h1>
            <p className={"text-xs text-muted-foreground"}>
              {onlineUsers.find((u) => u.id === user._id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>
        <X
          className={"size-auto cursor-pointer"}
          onClick={setSelectedUserToNull}
        />
      </div>
    </div>
  );
};

export default ChatBodyHeader;
