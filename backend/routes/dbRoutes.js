import express from "express";
import { setConnection } from "../controllers/dbController.js";

const dbRouter = express.Router();

dbRouter.post('/setConnection', setConnection);

export default dbRouter;