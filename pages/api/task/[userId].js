import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";

async function taskHandler(req, res) {
  const user_id = req.query.userId;
  const type = req.query.type;
  console.log(type, "type api route task");
  if (req.method === "GET") {
    const client = await connectToDataBase();
    const db = client.db();
    try {
      if (type === "worker") {
        const taskInfo = await db
          .collection("task")
          .find({ workerID: ObjectId(user_id) })
          .toArray();
        client.close();
        console.log("api task result called");
        res.status(200).json({ taskInfo });
      }
      if (type === "client") {
        const taskInfo = await db
          .collection("task")
          .find({ clientID: ObjectId(user_id) })
          .toArray();
        client.close();
        console.log("api task result called");
        res.status(200).json({ taskInfo });
      }
    } catch (err) {
      console.log(err, "task GET trycatch");
      client.close();
      res.status(500).json({ message: err });
    }
  }
}

export default taskHandler;
