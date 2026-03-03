import type { SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import { blogPostType } from "./blogPostType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, blogPostType],
};
