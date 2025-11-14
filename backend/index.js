const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/auth", require("./routes/authRoute.js"));
app.use("/admin", require("./routes/adminRoutes"));


app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
