import express from "express";
import { exec } from "shelljs";

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let isBuildRunning = false;

app.use(express.static("client"));

app.get("/", (req, res) => {
  res.status("200").sendFile("index.html", { root: __dirname });
});

io.on("connection", (socket) => {
  socket.on("triggerBuild", () => {
    if (!isBuildRunning) {
      //isBuildRunning = true;

      var child = exec("./build.sh", { async: true });
      child.stdout.on("data", function (data) {
        socket.emit("buildOutput", data);
      });
    }
  });
});

http.listen(3000, () => {
  console.log("listening on http://localhost");
});
