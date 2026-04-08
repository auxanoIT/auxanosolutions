import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { dataset, projectId } from "./sanity/lib/client";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "auxano-studio",
  title: "Auxano Studio",
  projectId: projectId || "placeholder",
  dataset,
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
