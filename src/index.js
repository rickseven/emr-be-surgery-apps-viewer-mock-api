const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use(routes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    isSuccessful: false,
    message: "Endpoint not found",
    type: "",
    errorCode: 404,
    payload: null,
  });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
