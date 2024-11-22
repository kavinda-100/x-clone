import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { AlignLeft, House, MessageCircle, Settings } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const LeftSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {/*    desktop sidebar */}
      <aside className={"hidden lg:flex min-w-[300px] my-2"}>
        <div className={"flex flex-col gap-3 w-full"}>
          <Button
            variant={location.pathname === "/" ? "secondary" : "ghost"}
            onClick={() => navigate("/")}
            className={"w-full flex gap-2"}
          >
            <House />
            Home
          </Button>
          <Button
            variant={location.pathname === "/chat" ? "secondary" : "ghost"}
            onClick={() => navigate("/chat")}
            className={"w-full flex gap-2"}
          >
            <MessageCircle />
            Message
          </Button>
          <Button
            variant={location.pathname === "/setting" ? "secondary" : "ghost"}
            onClick={() => navigate("/setting")}
            className={"w-full flex gap-2"}
          >
            <Settings />
            Settings
          </Button>
        </div>
      </aside>
    </>
  );
};

export default LeftSideBar;

export const LeftSideBarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignLeft />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <SheetContent side={"left"}>
          <div className={"flex flex-col gap-3 w-full"}>
            <Button
              variant={location.pathname === "/" ? "secondary" : "ghost"}
              onClick={() => navigate("/")}
              className={"w-full flex justify-start items-center gap-2"}
            >
              <House />
              Home
            </Button>
            <Button
              variant={location.pathname === "/chat" ? "secondary" : "ghost"}
              onClick={() => navigate("/chat")}
              className={"w-full flex justify-start items-center gap-2"}
            >
              <MessageCircle />
              Message
            </Button>
            <Button
              variant={location.pathname === "/setting" ? "secondary" : "ghost"}
              onClick={() => navigate("/setting")}
              className={"w-full flex justify-start items-center gap-2"}
            >
              <Settings />
              Settings
            </Button>
          </div>
        </SheetContent>
      </SheetContent>
    </Sheet>
  );
};
