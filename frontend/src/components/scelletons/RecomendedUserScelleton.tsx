import { Skeleton } from "@/components/ui/skeleton";

const RecomendedUserScelleton = () => {
  return (
    <div
      className={
        "w-full p-2 flex justify-center items-center gap-3 border rounded-md"
      }
    >
      <div className={"flex justify-start items-center gap-3"}>
        <Skeleton className={"w-10 h-10 rounded-full"} />
        <Skeleton className={"w-20 h-3"} />
      </div>
      <div>
        <Skeleton className={"w-20 h-10"} />
      </div>
    </div>
  );
};

export default RecomendedUserScelleton;
