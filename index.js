const express = require("express");
const morgan = require("morgan");

const router = require("./router");

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/files", router);

app.listen(3003, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running`);
  }
});
