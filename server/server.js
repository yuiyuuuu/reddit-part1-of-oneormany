const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const parser = require("body-parser");

app.use(express.static(path.join(__dirname, "..", "dist")));
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));
app.use(morgan("dev"));

app.use(express.json({ extended: true, limit: "30mb" }));
app.use(express.urlencoded());

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use("/api", require("./api/api"));

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist/index.html"));
});

const port = process.env.PORT || 3002;

app.listen(port, () => console.log("listening on port " + port));
