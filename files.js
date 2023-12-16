const fs = require("fs").promises;
const path = require("path");
const dataValidate = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const folderPath = path.join(__dirname, "files");

async function createFile(req, res) {
  const { error } = dataValidate(req.body);
  const { fileName, content } = req.body;

  if (error) {
    const { path } = error.details[0];
    res.status(400).json({
      message: `Please specify ${path[0]} parameter`,
    });

    return;
  }

  const { result, extension } = checkExtension(fileName);

  if (!result) {
    res.status(400).json({
      message: `Sorry, this application doesn't support file with ${extension} extension`,
    });

    return;
  }

  const filePath = path.join(__dirname, "files", fileName);

  try {
    await fs.writeFile(filePath, content, "utf-8");
    res.status(201).json({
      message: "file created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "file isn't created, all gone!!!",
    });
  }
}

async function getFiles(req, res) {
  const result = await fs.readdir(folderPath);

  if (!result.length) {
    res.status(404).json({
      message: "Sorry, this folder is empty",
    });

    return;
  }

  res.status(200).json(result);
}

async function getFileInfo(req, res) {
  const files = await fs.readdir(folderPath);

  const { fileName } = req.params;

  if (!files.includes(fileName)) {
    res.status(404).json({ message: "Sorry, this file not found" });
    return;
  }

  const filePath = path.join(folderPath, fileName);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const fileInfo = await fs.stat(filePath);

  const info = {
    extension: path.extname(fileName),
    name: path.basename(fileName, path.extname(fileName)),
    content: fileContent,
    date: fileInfo.birthtime.toString(),
  };

  res.json(info);
}

module.exports = {
  createFile,
  getFiles,
  getFileInfo,
};
