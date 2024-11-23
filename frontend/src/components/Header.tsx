import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { SignOutMethod } from "../api/auth";
import { toast } from "sonner";
import { useTheme } from "./Theme-provider";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "../store/useUserStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { LeftSideBarMobile } from "./LeftSideBar";

const Header = () => {
  const theme = useTheme();
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: SignOutMethod,
    onError: (error) => {
      console.log("error in sign out", error);
    },
    onSuccess: (data) => {
      console.log("data in sign out", data);
      toast.success("Sign out successfully");
      logout();
      // localStorage.removeItem("user");
      navigate("/sign-in");
    },
  });
  return (
    <header
      className={
        "w-full h-[80px] border-b flex justify-between items-center p-3"
      }
    >
      <img
        className={"size-5 lg:size-10 object-cover"}
        src={theme.theme === "dark" ? "/X_dark.svg" : "X_light.svg"}
        alt={"logo"}
      />
      {/* desktop nav */}
      <div className={"hidden lg:flex justify-center items-center gap-3"}>
        <Button
          variant={"outline"}
          onClick={() => mutate()}
          disabled={isPending}
        >
          Sign Out
        </Button>
        <ModeToggle />
        <Avatar>
          <AvatarImage src={user?.profileImage} />
          <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>

      {/* mobile nav */}
      <div className={"flex justify-center items-center gap-2 lg:hidden"}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Hi, {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                className={"w-full"}
                variant={"outline"}
                onClick={() => mutate()}
                disabled={isPending}
              >
                Sign Out
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ModeToggle />
              {theme.theme === "dark" ? "Dark Mode" : "Light Mode"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* mobile sidebar*/}
        <div>
          <LeftSideBarMobile />
        </div>
      </div>
    </header>
  );
};

export default Header;
