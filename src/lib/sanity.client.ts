import { ClientPerspective } from "next-sanity";
import { createClient } from "@sanity/client";

const config = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: "production",
  apiVersion: "2024-10-28",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN as string,
  perspective: "published" as ClientPerspective,
});

export default config;
