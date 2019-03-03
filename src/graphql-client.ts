import ApolloClient from "apollo-boost";
import "cross-fetch/polyfill";
import * as graphql from "graphql";
import * as fs from "fs";
import * as path from "path";
import { GetJobs } from "./graphql-types";

const client = new ApolloClient({
  uri: "https://remoted.io/graphql"
});

const getJobsQuery = graphql.parse(
  fs
    .readFileSync(path.join(__dirname, "/queries/get-jobs.graphql"))
    .toString()
);

export function getJobs() {
  return client.query<GetJobs.Query>({
    query: getJobsQuery
  });
}