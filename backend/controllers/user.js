import { checkName, checkEmail, checkPassword } from "../utils/validate.js";
import * as User from "../models/user.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    if (!checkName(username)) {
      return res.status(400).send("Name can only contain letters and digits");
    }
    if (!checkEmail(email)) {
      return res.status(400).send("Invalid email format");
    }
    const info = await User.signup(username, email, password);
    res.status(200).json({
      data: {
        userID: info.userID,
        roomID: info.roomID,
      },
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Email registered!") {
      return res.status(409).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }
    const info = await User.login(email, password);
    res.status(200).json({
      data: info,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Wrong email or password!") {
      return res.status(401).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userID = req.user.userID;
    const user = await User.getProfile(userID);
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "User does not exist!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const avatar = req.file.location;
    const userID = req.user.userID;
    const user = await User.updateAvatar(userID, avatar);
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "User does not exist!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};
