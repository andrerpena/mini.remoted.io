import { getJobs } from "./src/graphql-client";

const x = getJobs().then(d => {
  console.log(d.data.jobs.length);
}).catch(e => {
  console.log(e);
});