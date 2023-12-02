const fs = require("fs").promises;
const path = require("path");
const dataValidate = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

async function createFile(fileName, content) {
  const file = {
    fileName,
    content,
  };

  const { error } = dataValidate(file);

  if (error) {
    const { path } = error.details[0];
    console.log(`Please specify ${path[0]} parameter`);
    return;
  }

  const { result, extension } = checkExtension(fileName);

  if (!result) {
    console.log(
      `Sorry, this application doesn't support file with ${extension} extension`
    );
    return;
  }

  const filePath = path.join(__dirname, "files", fileName);

  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log("file created successfully");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createFile,
};
