import { getJobs } from "./graphql-client";
import * as fs from "fs";
import * as path from "path";

const htmlTemplate = fs.readFileSync(path.join(__dirname, "/html_template.html"));

export async function generateHtml() {
  const jobs = await getJobs();
  const jobLinks = jobs.data.jobs.map(j => {
    return `<div>${j.title}</div>`;
  });
  return htmlTemplate.toString().replace("$$JOBS$$", jobLinks.join("\n"));
}