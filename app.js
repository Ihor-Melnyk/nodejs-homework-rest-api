const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
const PORT = process.env.PORT;
const DB_HOST = process.env.MONGO_URL;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Datanse connect success");
  })
  .catch((error) => {
    console.log(error.message);
    console.log(1);
  });

const contactsRouter = require("./routes/api/contacts");

const morgan = require("morgan");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// якщо 4 параметри, то в такий middleware першим пишемо помилку
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
