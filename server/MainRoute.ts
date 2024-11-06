import express from "express";

//import route
import AuthRoute from "./modules/auth/auth.route";

const route = express.Router();

//route for authentication
route.use("/auth", AuthRoute)

export default route;