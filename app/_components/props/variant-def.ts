import { Variants } from "@/app/_types/variants";

import { PropDef } from "./prop-def";

const variants = ["title", "subtitle", "body1", "body2", "body3"] as const;

const variantPropDef = {
  variant: { type: "enum", values: variants, default: "body1" },
} satisfies {
  variant: PropDef<Variants>;
};

export { variantPropDef };
