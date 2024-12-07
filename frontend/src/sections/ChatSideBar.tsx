import { useQuery } from "@tanstack/react-query";
import { getMyFriends } from "../api/messages";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { messageUserType } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import UserChatCardSkeleton from "../components/Skeletons/UserChatCardSkeleton";

const ChatSideBar = () => {
  const { setUsers, users, setSelectedUser, onlineUsers } = useChatStore();

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["myFriends"],
    queryFn: getMyFriends,
  });
  useEffect(() => {
    if (isSuccess) {
      setUsers(data?.data);
    }
  }, [isSuccess]);

  return (
    <div className={"flex flex-col"}>
      {isLoading &&
        Array.from({ length: 5 }).map((_, i) => (
          <UserChatCardSkeleton key={i} />
        ))}
      {isError && (
        <div className={"text-muted-foreground text-red-400"}>
          {error?.message || "something went wrong"}
        </div>
      )}
      {isSuccess &&
        users.map((user: messageUserType) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={
              "flex gap-2 justify-start items-center my-1 p-2 border rounded-md shadow-sm cursor-pointer hover:bg-foreground/10"
            }
          >
            <Avatar className={"relative"}>
              <AvatarImage src={user.profileImage} alt={user.userName} />
              <AvatarFallback>{user.userName[0].toUpperCase()}</AvatarFallback>
              {onlineUsers.find((u) => u.id === user._id) ? (
                <div
                  className={
                    "absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"
                  }
                />
              ) : null}
            </Avatar>
            <div className={"hidden lg:flex flex-col"}>
              <p className={"text-sm truncate"}>{user.userName}</p>
              <p className={"text-sm text-muted-foreground truncate"}>
                {user.email}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatSideBar;
