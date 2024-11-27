import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/users";
import { UserSearchType } from "../types";
import SearchResultCard from "./SearchResultCard";
import { ThreeDotSimpleLoader } from "./ThreeDotSimpleLoader";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1500);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["searchUsers", debouncedSearch],
    queryFn: async () => searchUsers(debouncedSearch),
    enabled: !!debouncedSearch,
  });
  console.log("search", data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSearch(e.target.value);
    }
  };
  return (
    <div className={"flex justify-between items-center"}>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Search className={"size-4 lg:size-6"} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search Users</DialogTitle>
            </DialogHeader>
            <Input placeholder={"@JhonDoe"} onChange={(e) => handleSearch(e)} />
            {isLoading && (
              <div className={"w-full p-2"}>
                <ThreeDotSimpleLoader />
              </div>
            )}
            {isError && <p>Error...</p>}
            {isSuccess && data?.data && (
              <ul>
                {data?.data.map((user: UserSearchType) => (
                  <SearchResultCard
                    key={user._id}
                    UserSearchType={user}
                    setOpen={setOpen}
                  />
                ))}
              </ul>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Button>Create Post</Button>
    </div>
  );
};

export default TopBar;
