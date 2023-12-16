const express = require("express");
const { createFile, getFiles, getFileInfo } = require("./files");

const router = express.Router();

router.post("/", createFile);

router.get("/", getFiles);

router.get("/:fileName", getFileInfo);

module.exports = router;
