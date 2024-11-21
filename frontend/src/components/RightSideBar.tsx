import { AlignRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { RECOMMEND_FOR_YOU } from "../static";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const RightSideBar = () => {
  return (
    <>
      {/*    desktop sidebar */}
      <aside className={"hidden min-w-[300px] lg:flex my-2"}>
        <div className={"flex flex-col gap-3 w-full"}>
          <div className={"flex flex-col gap-2"}>
            <h1 className={"font-semibold"}>You Might Like</h1>
            <div className={"w-full space-y-2"}>
              {RECOMMEND_FOR_YOU.map((user) => {
                return (
                  <div
                    key={user.id}
                    className={
                      "flex justify-between items-center gap-2 p-3 border rounded-md cursor-pointer hover:opacity-70 w-full"
                    }
                  >
                    <div className={"flex justify-start items-center gap-3"}>
                      <Avatar>
                        <AvatarImage
                          src={user.profileImage}
                          alt={`${user.id}-${user.userName}`}
                        />
                        <AvatarFallback>
                          {user.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className={"flex-col gap-2"}>
                        <p className={"text-sm font-light"}>{user.userName}</p>
                        <p className={"text-sm font-normal"}>
                          @{user.userName.split(" ").join("").toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <Button>Follow</Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      {/*    mobile sidebar */}
      <div className={"lg:hidden"}>
        <Sheet>
          <SheetTrigger>
            <AlignRight />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>You Might Like</SheetTitle>
            </SheetHeader>
            <SheetContent side={"right"}>
              <div className={"flex flex-col gap-3 w-full"}>
                <div className={"flex flex-col gap-2"}>
                  <h1>You Might Like</h1>
                  <div className={"w-full space-y-2"}>
                    {RECOMMEND_FOR_YOU.map((user) => {
                      return (
                        <div
                          key={user.id}
                          className={
                            "flex justify-between items-center gap-2 p-3 border rounded-md cursor-pointer hover:opacity-70 w-full"
                          }
                        >
                          <div
                            className={"flex justify-start items-center gap-3"}
                          >
                            <Avatar>
                              <AvatarImage
                                src={user.profileImage}
                                alt={`${user.id}-${user.userName}`}
                              />
                              <AvatarFallback>
                                {user.userName[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className={"flex-col gap-2"}>
                              <p className={"text-sm font-light"}>
                                {user.userName}
                              </p>
                              <p className={"text-sm font-normal"}>
                                @
                                {user.userName
                                  .split(" ")
                                  .join("")
                                  .toLowerCase()}
                              </p>
                            </div>
                          </div>
                          <Button>Follow</Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SheetContent>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default RightSideBar;
