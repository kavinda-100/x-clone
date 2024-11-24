import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import { useEffect } from "react";
import { IKContext } from "imagekitio-react";

const MainLayout = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  // required parameter to fetch images from imagekit.io
  const urlEndpoint = import.meta.env.VITE_IMAGEKITIO_URL_ENDPOINT as string;
  // optional parameters (needed for client-side upload)
  const publicKey = import.meta.env.VITE_IMAGEKITIO_PUBLIC_KEY as string;
  // backend endpoint
  const backendEndpoint =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/auth"
      : "/auth";

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user]);

  const authenticator = async () => {
    try {
      const response = await fetch(backendEndpoint);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: Error | any) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  return (
    <main className={"w-full max-w-[1300px] mx-auto min-h-screen p-2 "}>
      <Header />
      <section className={"flex gap-3"}>
        <LeftSideBar />
        <div className={"w-full"}>
          <IKContext
            urlEndpoint={urlEndpoint}
            publicKey={publicKey}
            authenticator={authenticator}
          >
            <Outlet />
          </IKContext>
        </div>
        <RightSideBar />
      </section>
    </main>
  );
};

export default MainLayout;
