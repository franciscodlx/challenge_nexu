const express = require("express");
const apicache = require("apicache");
const brandRoutes = require("./v1/routes/brandRoutes");
const modelRoutes = require("./v1/routes/modelRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/models", modelRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

module.exports = app