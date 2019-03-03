import { getJobs } from "./graphql-client";
import * as fs from "fs";
import * as path from "path";

const htmlTemplate = fs.readFileSync(path.join(__dirname, "/html_template.html"));

export async function generateHtml() {
  const jobs = await getJobs();
  const jobLinks = jobs.data.jobs.map(j => {
    let finalUrl = j.url;
    if (!j.url.startsWith("https://")) {
      finalUrl = `https://${j.url}`;
    }
    const tags = j.tags;
    const imageUrl = j.company ? j.company.imageUrl : "";
    const companyName = j.company ? j.company.displayName : "";
    return `<a class="job" href="${finalUrl}" target="_blank">
        <div class="image-column">
            <img src="${imageUrl}"/>
        </div>
        <div class="content-column">
            <span class="company">${companyName}</span>
            <span>${j.title}</span>
            <span class="time">${j.publishedAt}</span>
            <span class="tags">
            ${tags.map(t => `<span class="tag">[${t}]</span>`)}
            </span>
        </div>
    </a>`;
  });
  return htmlTemplate.toString().replace("$$JOBS$$", jobLinks.join("\n"));
}