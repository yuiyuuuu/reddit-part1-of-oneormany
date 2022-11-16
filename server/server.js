const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const parser = require("body-parser");

app.use("/api", require("./api/api"));

app.use(express.static(path.join(__dirname, "..", "dist")));
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));
app.use(morgan("dev"));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", async (req, res) => {
//   //find all post if nothing is passed into findmany function

// });

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist/index.html"));
});

const port = process.env.PORT || 3002;

app.listen(port, () => console.log("listening on port " + port));
