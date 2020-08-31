const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/posts", async (req, res) => {
  const posts = JSON.parse(await readFile("./posts.json"));
  res.send(posts);
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const posts = JSON.parse(await readFile("./posts.json"));
  const post = posts.find((post) => post.id === +id);
  if (post) {
    res.send(post);
  } else {
    res.status(404).send();
  }
});

app.post("/posts", async (req, res) => {
  const post = req.body;
  console.log(post);
  const posts = JSON.parse(await readFile("./posts.json"));
  post.id = posts.length + 1;
  posts.push(post);
  await writeFile("./posts.json", JSON.stringify(posts));
  res.status(201).send(post);
});

app.get("/cookies", (req, res) => {
  res.cookie("test", "hello");
  res.send();
});

const port = process.env.PORT || 8400;
app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
