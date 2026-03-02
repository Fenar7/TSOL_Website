import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId, studioPath } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "TSOL Studio",
  projectId,
  dataset,
  basePath: studioPath,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
