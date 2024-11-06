import express from "express";
import { SignUp, SignIn, SignOut } from "./auth.controller";

// other imports
import { zodValidation } from "../../middleware/zodValidation";

// zod schemas
import {zodSignInSchema, zodUserSchema} from "../../shared/zod/user";

const route = express.Router();

route.post("/sign-up", zodValidation(zodUserSchema), SignUp);
route.post("/sign-in", zodValidation(zodSignInSchema), SignIn);
route.post("/sign-out", SignOut);


export default route;