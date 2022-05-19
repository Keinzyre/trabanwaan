import { hashPassword } from "../../../lib/auth";
import { connectToDataBase } from "../../../lib/db";

async function signUpHandler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { firstName, lastName, email, accountType, password } = data;
  const client = await connectToDataBase();
  const db = client.db();

  if (
    !firstName ||
    !lastName ||
    !email ||
    !email.includes("@") ||
    !accountType ||
    !password ||
    password.length < 8 ||
    password.length > 72
  ) {
    res.status(422).json({ message: "Invalid input" });
    client.close();
    return;
  }

  const existingUser = await db.collection("worker").findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "User Exist already" });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(password);

  try {
    const result = await db.collection("worker").insertOne({
      firstName: firstName,
      lastName: lastName,
      accountType: accountType,
      email: email,
      password: hashedPassword,
      profile: { avatar: null },
    });
    console.log(result, "insertOne collection");
  } catch (err) {
    res.status(500).json({ message: "Failed to send data" });
    client.close();
  }
  res.status(201).json({ message: "Created User" });
  client.close();
}

export default signUpHandler;
