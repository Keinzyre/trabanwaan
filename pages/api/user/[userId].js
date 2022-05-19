import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";

async function userHandler(req, res) {
  const userId = req.query.userId;
  if (req.method === "GET") {
    const client = await connectToDataBase();
    const db = client.db();
    try {
      const userInfo = await db
        .collection("worker")
        .findOne({ _id: ObjectId(userId) }, { projection: { password: 0 } });
      client.close();
      console.log(userInfo, "api/[userid]");
      res.status(200).json({ userInfo });
    } catch (err) {
      console.log(err, "user GET trycatch");
      client.close();
      res.status(500).json({ message: err });
    }
  }
}

export default userHandler;
