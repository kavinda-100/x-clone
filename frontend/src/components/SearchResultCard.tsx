import { Card, CardHeader } from "./ui/card";
import { UserSearchType } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

type SearchResultCardProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  UserSearchType: UserSearchType;
};

const SearchResultCard = ({
  setOpen,
  UserSearchType: { _id, name, userName, profileImage },
}: SearchResultCardProps) => {
  const navigate = useNavigate();

  const handleGoToProfile = (userName: string) => {
    navigate(`/user/${userName}`);
    setOpen(false);
  };
  return (
    <Card className={"w-full mb-2"}>
      <CardHeader>
        <div className={"flex justify-between items-center gap-3"}>
          <div className={"flex grow"}>
            <Avatar>
              <AvatarImage src={profileImage} alt={_id} />
              <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className={"text-sm lg:text-md font-semibold"}>{name}</h3>
              <p className={"text-sm text-muted-foreground"}>@{userName}</p>
            </div>
          </div>
          <Button
            variant={"secondary"}
            onClick={() => handleGoToProfile(userName)}
          >
            Profile
            <ArrowRight className={"size-5"} />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default SearchResultCard;
