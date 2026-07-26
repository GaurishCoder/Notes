const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";

const client = new MongoClient(MONGO_URL);

async function connectDB() {
  await client.connect();
  console.log("✅ Connected to MongoDB");
}

connectDB();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/getUsers", async (req, res) => {
  try {
    const db = client.db("gaurish-db");

    const users = await db.collection("users").find({}).toArray();

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.post("/addUser", async (req, res) => {
  try {
    const db = client.db("gaurish-db");

    const result = await db.collection("users").insertOne(req.body);

    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});