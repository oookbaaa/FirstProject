import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const writeclient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});
if (!writeclient.config().token) {
  throw new Error("The token is missing");
}
