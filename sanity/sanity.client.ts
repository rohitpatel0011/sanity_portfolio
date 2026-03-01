// sanity/sanity.client.ts
import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "ha2z8oet", // Apna actual projectId yahan daalein
  dataset: "production",
  apiVersion: "2023-07-16", // API version (aaj ki date ya purani daal sakte hain)
  useCdn: false, // Development ke liye false rakhte hain taaki fresh data mile
};

const client = createClient(config);

export default client;