import express from "express";

//import route
import AuthRoute from "./modules/auth/auth.route";
import UserRoute from "./modules/user/user.route";
import PostRoute from "./modules/post/post.route";

const route = express.Router();

//route for authentication
route.use("/auth", AuthRoute);
//route for user
route.use("/user", UserRoute);
//route for post
route.use("/post", PostRoute);

export default route;
