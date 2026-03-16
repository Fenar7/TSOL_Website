import type { SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import { blogPostType } from "./blogPostType";
import { testimonialType } from "./testimonialType";
import { siteSettingsType } from "./siteSettingsType";
import { approachItemType } from "./approachItemType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, blogPostType, testimonialType, siteSettingsType, approachItemType],
};
