const express = require("express");
const { default: axios } = require("axios");
const fs = require("fs/promises");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// app.get("/", (req, res) => {
//   res.send("Connected to EC2 with get method");
// });

app.get("/", (req, res) => {
  axios({
    url: "http://jsonplaceholder.typicode.com/posts",
    method: "get",
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.post("/api", (req, res) => {
  if (req.body) {
    const data = {
      posts: req.body.posts,
      users: req.body.users,
      mean_posts_per_user: req.body.mean_posts_per_user,
    };
    let file = req.body.file_name;
    remove_file(file);
    console.log("File Deleted");

    // res.send(delR);
    // console.log(res);
    const isSuccess = save_file(data, file);
    let resp = {
      resp: isSuccess
        ? "File saved Successfully"
        : "Failure !!! File not saved",
    };
    if (isSuccess) {
      res.send(resp);
    } else {
      res.send(resp);
    }
  } else {
    res.send("Server not available...");
  }
});

async function save_file(dx, file) {
  try {
    const content = JSON.stringify(dx);
    await fs.writeFile(file, content);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function remove_file(filename) {
  var fx = require("fs");
  var filePath = "C:/Users/smhum/Documents/Softwares/node/" + filename;
  if (fx.existsSync(filePath)) {
    console.log("file exists");
    fx.unlinkSync(filePath);
  } else {
    console.log("file not found!");
  }
}

app.listen(8080, () => console.log("Running on port 8080"));
