import { Router } from "express";
export const usersRouter = Router();

usersRouter.get("/", (req, res) => {
    res.send("Hello World!");
    }
);

