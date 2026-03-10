import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { markdownSchema } from 'sanity-plugin-markdown';

export default defineConfig({
  name: "sanity-nextjs-portfolio",
  title: "sanity protfolio",
  projectId: "ha2z8oet",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool(),
    markdownSchema(),
  ],
  schema: {
    types: schemaTypes,
  },
});