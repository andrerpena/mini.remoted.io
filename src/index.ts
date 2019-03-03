import express from "express";
import { generateHtml } from "./generator";

const app = express();

app.get("/", async (req, res) => {
  res.end(await generateHtml());
});
app.use("/static", express.static(__dirname + "/../docs"));

app.listen(4000, () => console.log(`mini.remoted.io listening on port ${4000}!`));