import express from "express";
import upload from "../utils/upload.js";
import { signup, login, getProfile } from "../controllers/user.js";
import { authentication } from "../utils/auth.js";

const user = express.Router();

// Users API
user.use(express.json());
user.post("/signup", upload.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).send("Avatar is required");
  signup(req, res);
});
user.post("/login", login);
user.use(authentication);
user.get("/profile", getProfile);

export default user;
