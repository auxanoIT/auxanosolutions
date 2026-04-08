import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/lib/client";

export default defineCliConfig({
  api: {
    projectId: projectId || "placeholder",
    dataset,
  },
});
