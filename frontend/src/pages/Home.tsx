import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForYou from "@/components/tabs/ForYou";
import Following from "@/components/tabs/Following";

const Home = () => {
  return (
    <div className={"w-full h-auto"}>
      <Tabs defaultValue="for-you" className="w-full mt-2">
        <TabsList className={"w-full"}>
          <TabsTrigger value="for-you" className={"w-full"}>
            For You
          </TabsTrigger>
          <TabsTrigger value="following" className={"w-full"}>
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="for-you">
          <ForYou />
        </TabsContent>
        <TabsContent value="following">
          <Following />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
