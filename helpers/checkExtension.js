function checkExtension(fileName) {
  const EXTENSIONS = ["json", "js", "ts", "cjs"];

  const array = fileName.toLowerCase().split(".");
  const extension = array[array.length - 1];
  return { extension, result: EXTENSIONS.includes(extension) };
}

module.exports = checkExtension;
