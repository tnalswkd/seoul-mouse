import { colorPropDef } from "@/app/_components/props/color-def";
import { variantPropDef } from "@/app/_components/props/variant-def";

const as = ["span", "div", "label", "p"] as const;

const typographyPropDefs = {
  as: { type: "enum", values: as, default: "span" },
  ...variantPropDef,
  ...colorPropDef,
};

export { typographyPropDefs };
