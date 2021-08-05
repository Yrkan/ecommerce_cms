const express = require("express");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const connectDatabase = require("./db");

const PORT = process.env.PORT || 6500;
const app = express();

// CORS
app.use(cors());

// JSON Parser
app.use(express.json());

// Defend against NoSQL Injection
app.use(mongoSanitize());

// Connect to database
connectDatabase();

// API V1
app.use("/api/v1/admins", require("./routes/api/v1/admins"));
app.use("/api/v1/auth", require("./routes/api/v1/auth"));
app.use("/api/v1/categories", require("./routes/api/v1/categories"));
app.use("/api/v1/orders", require("./routes/api/v1/orders"));
app.use("/api/v1/products", require("./routes/api/v1/products"));

// Start server
app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
