import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const MainLayout = () => {
  const { user } = useUserStore();
  return (
    <section>
      {user && user != null ? <Outlet /> : <Navigate to={"/sign-in"} />}
    </section>
  );
};

export default MainLayout;
