import { client } from "@/sanity/lib/client";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

// Create a client with a viewer token for the Presentation tool
const clientWithToken = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
});

export const { GET } = defineEnableDraftMode({
  client: clientWithToken,
});
