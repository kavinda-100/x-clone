import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "../ui/card";

const UserFollowFollowingCardSkeleton = () => {
  return (
    <Card className={"w-full p-4"}>
      <div className={"flex justify-between items-center gap-3"}>
        <div className={"flex justify-start items-center gap-2"}>
          <Skeleton className={"rounded-full w-10 h-10"} />
          <div>
            <Skeleton className={"w-[100px] h-2"} />
          </div>
        </div>
        <Skeleton className={"w-[80px] h-8"} />
      </div>
    </Card>
  );
};

export default UserFollowFollowingCardSkeleton;
