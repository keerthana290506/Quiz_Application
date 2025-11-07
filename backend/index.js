const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/authRoute.js");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
