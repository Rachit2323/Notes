const express = require("express");
const mongoose = require("mongoose");

const app = express();

const userRoutes = require("./routes/user.js");
const notesRoutes = require("./routes/note.js");

// const URI =
//   "mongodb+srv://Rachit23:UhP8Iiyp4xxptvmM@cluster0.fgnb20h.mongodb.net/food";
const URI = "mongodb://localhost:27017/speer";

app.use(express.json({ limit: "50mb" }));

app.use("/api", userRoutes);
app.use("/api", notesRoutes);

app.get("/", (req, res) => {
  res.send("Hello, I am here and running!");
});

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
