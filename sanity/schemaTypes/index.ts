import type { SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import { blogPostType } from "./blogPostType";
import { categoryType } from "./categoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, projectType, blogPostType],
};
