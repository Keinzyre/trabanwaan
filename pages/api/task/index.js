import { connectToDataBase } from "../../../lib/db";
import { ObjectId } from "mongodb";

async function workerTaskHandler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const {
      clientID,
      workerID,
      firstName,
      lastName,
      workerData,
      frequency,
      description,
    } = data;
    console.log(workerData, "workerData in api");
    if (
      !clientID &&
      !workerID &&
      !firstName &&
      !lastName &&
      !workerData &&
      !frequency &&
      !description
    ) {
      res.status(422).json({ message: "Missing fields create task cancelled" });
      client.close();
      return;
    }
    const client = await connectToDataBase();
    const db = client.db();

    if (frequency === "one time") {
      const { valueDateTime } = data;
      try {
        const result = await db.collection("task").insertOne({
          clientID: ObjectId(clientID),
          workerID: ObjectId(workerID),
          firstName,
          lastName,
          workerData,
          frequency,
          date: valueDateTime,
          description,
          status: "pending",
        });
        console.log(result);
      } catch (err) {
        res.status(500).json({ message: err });
        client.close();
      }
    }
    if (frequency === "recurring") {
      const { dateStart, dateEnd, timeStart, timeEnd } = data;
      try {
        const result = await db.collection("task").insertOne({
          clientID: ObjectId(clientID),
          workerID: ObjectId(workerID),
          firstName,
          lastName,
          workerData,
          frequency,
          dateStart,
          dateEnd,
          timeStart,
          timeEnd,
          description,
          status: "pending",
        });
        console.log(result);
      } catch (err) {
        res.status(500).json({ message: err });
        client.close();
      }
    }

    client.close();
    res.status(201).json({ message: "Task Created!" });
  }
  if (req.method === "PUT") {
    const data = req.body;
    const { task_id, status } = data;
    const client = await connectToDataBase();
    const db = client.db();
    try {
      const result = await db
        .collection("task")
        .updateOne(
          { _id: ObjectId(task_id) },
          { $set: { status: status }, $currentDate: { lastModified: true } }
        );
      client.close();
      console.log(result, "update task");
      res.status(200).json({ result });
    } catch (err) {
      console.log(err, "task GET trycatch");
      client.close();
      res.status(500).json({ message: "Failed to update task" });
    }
  }
}

export default workerTaskHandler;
