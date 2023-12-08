import express from "express";
import { uploadImage } from "../utils/upload.js";
import { signup, login, getProfile, updateAvatar } from "../controllers/user.js";
import { authentication } from "../utils/auth.js";

const user = express.Router();

// Users API
user.use(express.json());

user.post("/signup", signup);
user.post("/login", login);
user.use(authentication);
user.get("/profile", getProfile);
user.patch("/avatar", uploadImage.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).send("Avatar is required");
  updateAvatar(req, res);
});

export default user;
