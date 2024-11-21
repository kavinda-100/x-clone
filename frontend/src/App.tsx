import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./LayOuts/MainLayout";
import { Chat, Home, NotFound, SignIn, SignUp } from "./pages";
import { useUserStore } from "./store/useUserStore";

const App = () => {
  const { user } = useUserStore();
  return (
    <main className={"w-full max-w-[1400px] mx-auto min-h-screen "}>
      <Routes>
        <Route
          path={"/sign-in"}
          element={user ? <Navigate to={"/"} /> : <SignIn />}
        />
        <Route
          path={"/sign-up"}
          element={user ? <Navigate to={"/"} /> : <SignUp />}
        />
        {/* protected routes */}
        <Route element={<MainLayout />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/chat"} element={<Chat />} />
        </Route>
        {/*  not found page */}
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
