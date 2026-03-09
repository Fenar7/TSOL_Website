import type { SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import { blogPostType } from "./blogPostType";
import { testimonialType } from "./testimonialType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, blogPostType, testimonialType],
};
