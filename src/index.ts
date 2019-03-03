import express from "express";
import * as fs from "fs";
import * as path from "path";
import { getJobs } from "./graphql-client";

const htmlTemplate = fs.readFileSync(path.join(__dirname, "/html_template.html"));

const app = express();

app.get("/", async (req, res) => {
  const jobs = await getJobs();
  const jobLinks = jobs.data.jobs.map(j => {
    return `<div>${j.title}</div>`;
  });
  res.end(htmlTemplate.toString().replace("$$JOBS$$", jobLinks.join("\n")));
});
app.use("/static", express.static(__dirname + "/static"));

app.listen(4000, () => console.log(`mini.remoted.io listening on port ${4000}!`));