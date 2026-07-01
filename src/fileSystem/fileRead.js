const fs = require("fs/promises");
const path = require("path");

const readFiles = async () => {
  try {
    // const uploadsPath = path.join(__dirname, "uploads");
    const uploadsPath = path.join(process.cwd(), "src", "uploads");
    await fs.mkdir(uploadsPath);
    const file = await fs.readFile("./package.json", "utf8");
    return file;
  } catch (e) {
    console.log(e);
  }
};

const writeFile = async () => {
  const uploadsPath = path.join(process.cwd(), "uploads");
  await fs.mkdir(uploadsPath, { recursive: true });
  await fs.writeFile(
    path.join(uploadsPath, "first.json"),
    JSON.stringify({ name: "ganesh", age: 27 }, null, 2),
  );
  await fs.rename(
    path.join(uploadsPath, "first.json"),
    path.join(uploadsPath, "second.json"),
  );
  await fs.unlink(path.join(uploadsPath, "second.json"));
};

module.exports = writeFile;
