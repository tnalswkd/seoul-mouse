import { ComponentPropsWithoutRef, ReactNode } from "react";
import { GetPropDefTypes, PropDef } from "../props/prop-def";

const variants = ["default"] as const;

type Variants = (typeof variants)[number];

type CardOwnProps = {
  variant?: Variants;
};

type CardBaseProps = GetPropDefTypes<typeof cardPropDefs> & {
  title?: string;
  description?: string;
  numberTags?: number[];
  tags?: string[];
};

type CardProps = ComponentPropsWithoutRef<"div"> & CardBaseProps & CardOwnProps;

type StyledCardProps = Pick<CardProps, "variant">;

const cardPropDefs = {
  variant: {
    type: "enum",
    values: variants,
    default: "default",
  },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
};

export { cardPropDefs };
export type { CardProps, CardBaseProps, CardOwnProps, Variants, StyledCardProps };

