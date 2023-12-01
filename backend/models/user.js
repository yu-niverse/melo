import client from "../utils/mongo.js";
import * as Room from "./room.js";
import mongodb from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = client.db("melo");
const userCollection = db.collection("users");

export const signup = async (username, email, password, avatar) => {
  const session = client.startSession();
  session.startTransaction();
  try {
    // Check if email already exists
    const existingUser = await userCollection.findOne({ email: email });
    if (existingUser) {
      throw new Error("Email registered!");
    }
    const ObjectId = mongodb.ObjectId;
    const userID = new ObjectId();
    const roomID = new ObjectId();
    // Hash password
    const hash = await bcrypt.hash(password, 10);
    // Create a new user
    await userCollection.insertOne(
      {
        _id: userID,
        username: username,
        email: email,
        password: hash,
        avatar: avatar,
        rooms: [roomID],
        created_at: new Date(),
      },
      { session }
    );
    // Create a default room for the user
    await Room.add(
      {
        _id: roomID,
        name: "default",
        type: "private",
        description: "Welcome to melo, this is your default room!",
        member_limit: 1,
        members: [userID],
        created_at: new Date(),
      },
      session
    );
    // Sign JWT token
    const token = jwt.sign({ user_id: userID }, process.env.JSON_SIGN_SECRET, {
      expiresIn: "1h",
    });
    await session.commitTransaction();
    session.endSession();
    return {
      token: token,
      userID: userID,
      roomID: roomID,
    };
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const login = async (email, password) => {
  try {
    // Check if email exists
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      throw new Error("Wrong email or password!");
    }
    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Wrong email or password!");
    }
    // Sign JWT token
    const token = jwt.sign(
      { user_id: user._id },
      process.env.JSON_SIGN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return {
      id: user._id,
      name: user.username,
      avatar: user.avatar,
      token: token,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getProfile = async (userID) => {
  try {
    // Check if user exists
    const user = await userCollection.findOne({ _id: userID });
    if (!user) {
      throw new Error("User does not exist!");
    }
    return {
      id: user._id,
      name: user.username,
      email: user.email,
      avatar: user.avatar,
      rooms: user.rooms,
      created_at: user.created_at,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
