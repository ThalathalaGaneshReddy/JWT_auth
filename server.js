const server = require("./src/app");
const dotevn = require("dotenv");
const connectDB = require("./src/config/db");

dotevn.config();
const PORT = process.env.SERVER_PORT;

// Start the server only after successfully connecting to the database
connectDB().then(() => {
  server.listen(PORT, (err) => {
    if (err) {
      console.log("error while running server", err);
    } else {
      console.log("Server is running on:", PORT);
    }
  });
});
