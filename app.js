const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const morgan = require("morgan");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// // ----------- hw-code------------
// app.use(morgan("tiny"));

// app.post("/home", (req, res) => {
//   res.json();
// });
// // -----------end hw-code ---------
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
