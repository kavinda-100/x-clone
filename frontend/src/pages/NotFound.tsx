import { Button } from "../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <section className={"w-full h-screen flex justify-center items-center"}>
      <Card>
        <CardHeader>
          <CardTitle className={"text-center"}>404 - Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={"text-center"}>
            The page you are looking{" "}
            <span className={"font-bold space-x-1"}>
              {location.pathname.split("/")[1]}
            </span>{" "}
            does not exist.
          </p>
        </CardContent>
        <CardFooter className={"flex justify-center items-center"}>
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default NotFound;
