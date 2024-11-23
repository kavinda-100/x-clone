import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./LayOuts/MainLayout";
import {
  Chat,
  Home,
  NotFound,
  SignIn,
  SignUp,
  LoaderPage,
  SinglePostPage,
  User,
  Settings,
} from "./pages";
import { useUserStore } from "./store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "./api/auth";
import { useEffect } from "react";

const App = () => {
  const { user, setUser } = useUserStore();

  //get the user from the backend
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["authUser", "me"],
    queryFn: getMe,
  });

  //set the user in to the glob store
  useEffect(() => {
    if (isSuccess) {
      setUser(data?.data);
    }
  }, [isSuccess, data, setUser]);

  if (isLoading) return <LoaderPage />;

  if (isError) {
    console.log("error in fetching user data in App.tsx", error);
  }

  // if (isSuccess) {
  //   console.log("user data in App.tsx", data);
  //   localStorage.setItem("user", JSON.stringify(data?.data));
  // }

  return (
    <BrowserRouter>
      <Routes>
        {/* auth routes */}
        <Route
          path={"/sign-in"}
          element={user ? <Navigate to={"/"} /> : <SignIn />}
        />
        <Route
          path={"/sign-up"}
          element={user ? <Navigate to={"/"} /> : <SignUp />}
        />
        {/*protected routes */}
        <Route element={<MainLayout />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/chat"} element={<Chat />} />
          <Route path={"/post/:postId"} element={<SinglePostPage />} />
          <Route path={"/user/:username"} element={<User />} />
          <Route path={"/setting/:username"} element={<Settings />} />
        </Route>
        {/*  not found page */}
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
