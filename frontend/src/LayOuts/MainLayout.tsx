import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import { useEffect } from "react";

const MainLayout = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user]);

  return (
    <main className={"w-full max-w-[1300px] mx-auto min-h-screen p-2 "}>
      <Header />
      <section className={"flex gap-3"}>
        <LeftSideBar />
        <div className={"w-full"}>
          <Outlet />
        </div>
        <RightSideBar />
      </section>
    </main>
  );
};

export default MainLayout;
