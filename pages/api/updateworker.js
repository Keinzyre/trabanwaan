import { connectToDataBase } from "../../lib/db";
import { hashPassword, verifyPassword } from "../../lib/auth";
import { ObjectId } from "mongodb";

async function updateWorkerHandler(req, res) {
  if (req.method !== "PUT") {
    return;
  }
  if (req.query.update === "account") {
    const data = req.body;
    const {
      worker_id,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = data;
    const client = await connectToDataBase();
    const db = client.db();

    if (!firstName || !lastName || !email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }
    //check worker exist
    const worker = await db.collection("worker").findOne({
      _id: ObjectId(worker_id),
    });
    if (!worker) {
      client.close();
      res.status(422).json({ message: "No worker found" });
      return;
    }

    const isValid = await verifyPassword(confirmPassword, worker.password);
    if (!isValid) {
      client.close();
      res.status(422).json({ message: "Invalid password" });
      return;
    }

    if (password) {
      //check if changepass exist
      if (password.length < 8 || password.length > 72) {
        res.status(422).json({ message: "Invalid input" });
        client.close();
        return;
      }
      const hashedPassword = await hashPassword(password);
      try {
        const result = await db.collection("worker").updateOne(
          { _id: ObjectId(worker_id) },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              phoneNumber: phoneNumber,
              password: hashedPassword,
            },
          }
        );
        console.log(result, " update worker account result");
      } catch (err) {
        res.status(500).json({ message: "Failed to update account" });
        console.log(err);
        client.close();
      }
    }
    if (!password) {
      //if password doesnt exist then dont update password

      try {
        const result = await db.collection("worker").updateOne(
          { _id: ObjectId(worker_id) },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              phoneNumber: phoneNumber,
            },
          }
        );
        console.log(result, " update worker account result");
      } catch (err) {
        res.status(500).json({ message: "Failed to update account" });
        console.log(err);
        client.close();
      }
    }
    res.status(200).json({ message: "Update Account Successfully" });
    client.close();
  }
  if (req.query.update === "profile") {
    const data = req.body;
    const { worker_id, avatar, introduction, service, startingCost, area } =
      data;
    const client = await connectToDataBase();
    const db = client.db();

    //check worker exist
    const worker = await db.collection("worker").findOne({
      _id: ObjectId(worker_id),
    });
    if (!worker) {
      client.close();
      res.status(422).json({ message: "No worker found" });
      return;
    }

    try {
      const result = await db.collection("worker").updateOne(
        { _id: ObjectId(worker_id) },
        {
          $set: {
            "profile.avatar": avatar,
            "profile.introduction": introduction,
            "profile.service": service,
            "profile.startingCost": startingCost,
            "profile.area": area,
          },
        }
      );
      console.log(result, " update worker profile result");
    } catch (err) {
      res.status(500).json({ message: "Failed to update worker profile" });
      console.log(err);
      client.close();
    }

    res.status(200).json({ message: "Update Profile Successfully" });
    client.close();
  }
}

export default updateWorkerHandler;
