import { Router } from "express";
import Users from "./users";
import Language from "./language";
import userRequireMiddleware from "../middleware/userRequire";

const router = Router();

router.use(userRequireMiddleware);
router.use("/users", Users);
router.use("/language", Language);

export default router;
