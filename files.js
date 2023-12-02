const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidate = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const folderPath = path.join(__dirname, "files");

async function createFile(fileName, content) {
  const file = {
    fileName,
    content,
  };

  const { error } = dataValidate(file);

  if (error) {
    const { path } = error.details[0];
    console.log(chalk.red(`Please specify ${path[0]} parameter`));
    return;
  }

  const { result, extension } = checkExtension(fileName);

  if (!result) {
    console.log(
      chalk.red(
        `Sorry, this application doesn't support file with ${extension} extension`
      )
    );
    return;
  }

  const filePath = path.join(__dirname, "files", fileName);

  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green("file created successfully"));
  } catch (err) {
    console.log(chalk.red(err));
  }
}

async function getFiles() {
  const result = await fs.readdir(folderPath);

  if (!result.length) {
    console.log(chalk.red("Sorry, this folder is empty"));
    return;
  }

  result.forEach((file) => {
    console.log(chalk.green(file));
  });
}

async function getFileInfo(fileName) {
  const files = await fs.readdir(folderPath);

  if (!files.includes(fileName)) {
    console.log(chalk.red("Sorry, this file not found"));
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

  console.log(info);
}

module.exports = {
  createFile,
  getFiles,
  getFileInfo,
};
