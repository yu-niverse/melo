import client from "../utils/mongo.js";

const db = client.db("melo");
const roomCollection = db.collection("rooms");

export const add = async (room, session) => {
  try {
    const result = await roomCollection.insertOne(room, { session });
    return result.insertedId;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
