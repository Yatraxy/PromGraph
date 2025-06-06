const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const client = require("prom-client");

const port = 3001;

main().catch((err) => console.error("Startup error:", err));

async function main() {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://root:root@mongodb:27017/todos?authSource=admin",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);

  client.collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    try {
      res.set("Content-Type", client.register.contentType);
      res.end(await client.register.metrics());
    } catch (err) {
      console.error("Error in /metrics:", err);
      res.status(500).end(err.message);
    }
  });

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}
