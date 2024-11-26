import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const PostSkeleton = () => {
  return (
    <Card className={"w-full mb-2"}>
      <CardHeader className={"flex justify-start gap-3"}>
        <div className={"flex justify-start items-center gap-3"}>
          <Skeleton className={"rounded-full size-10"} />
          <Skeleton className={"w-[100px] h-2"} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={"flex-col gap-2 mb-2"}>
          <Skeleton className={"w-[100px] h-1"} />
          <Skeleton className={"w-[100px] h-1"} />
        </div>
        <Skeleton className={"w-full h-[200px] lg:h-[400px] rounded-md"} />
      </CardContent>
      <CardFooter className={"flex justify-between items-center"}>
        <Skeleton className={"hidden lg:flex w-[40px] lg:w-[80px] h-2"} />
      </CardFooter>
    </Card>
  );
};

export default PostSkeleton;
