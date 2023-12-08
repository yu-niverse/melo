import client from "../utils/mongo.js";
import mongodb from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = client.db("melo");
const userCollection = db.collection("users");
const roomCollection = db.collection("rooms");

export const signup = async (username, email, password) => {
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
        rooms: [roomID],
        created_at: new Date(),
      },
      { session }
    );
    // Create a default room for the user
    const description = "Hi " + username + ", Welcome to melo, this is your default room!";
    await roomCollection.insertOne(
      {
        _id: roomID,
        name: "Default",
        type: "private",
        description: description,
        member_limit: 1,
        members: [userID],
        queue: [],
        playlists: [],
        created_at: new Date(),
      },
      { session }
    );
    await session.commitTransaction();
    session.endSession();
    return {
      userID: userID,
      roomID: roomID,
    };
  } catch (err) {
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
    const token = jwt.sign({ userID: user._id }, process.env.JSON_SIGN_SECRET, {
      expiresIn: "1h",
    });
    return {
      id: user._id,
      name: user.username,
      token: token,
    };
  } catch (err) {
    throw err;
  }
};

export const getProfile = async (userID) => {
  try {
    // Check if user exists
    const id = new mongodb.ObjectId(userID);
    const user = await userCollection.findOne({ _id: id });
    if (!user) {
      throw new Error("User does not exist!");
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export const updateAvatar = async (userID, avatar) => {
  try {
    // Check if user exists
    const id = new mongodb.ObjectId(userID);
    const user = await userCollection.findOne({ _id: id });
    if (!user) {
      throw new Error("User does not exist!");
    }
    // Update avatar
    await userCollection.updateOne(
      { _id: id },
      { $set: { avatar: avatar } }
    );
    return {
      id: user._id,
      name: user.username,
      avatar: avatar,
    };
  } catch (err) {
    throw err;
  }
};
