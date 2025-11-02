import { ComponentPropsWithoutRef, ReactNode } from "react";

import { GetPropDefTypes, PropDef } from "../props/prop-def";

const variants = ["default", "dark", "gray"] as const;
const disabledVariants = ["default", "dark", "gray"] as const;

type Variants = (typeof variants)[number];
type DisabledVariants = (typeof disabledVariants)[number];

type Variant = Extract<Variants, DisabledVariants>;

type ButtonOwnProps =
  | {
      variant: "gray1" | "gray2";
      disabled?: never;
    }
  | {
      variant: Variant;
      disabled?: boolean;
    }
  | {
      variant: "grayline";
      selected?: boolean;
    };

type ButtonBaseProps = GetPropDefTypes<typeof buttonPropDefs> & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  subtext?: string;
};

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  ButtonBaseProps &
  ButtonOwnProps;

type StyledButtonProps = Pick<
  ButtonProps,
  "disabled" | "variant" | "width" | "selected"
>;

const buttonPropDefs = {
  width: {
    type: "string",
    default: "",
  },
  variant: {
    type: "enum",
    values: variants,
    default: "default",
  },
  loading: { type: "boolean", default: false },
  disabled: { type: "boolean", default: false },
  selected: { type: "boolean", default: false },
} satisfies {
  width: PropDef<string>;
  variant: PropDef<(typeof variants)[number]>;
  loading: PropDef<boolean>;
  disabled: PropDef<boolean>;
  selected: PropDef<boolean>;
};

export { buttonPropDefs };
export type {
  ButtonProps,
  ButtonBaseProps,
  ButtonOwnProps,
  Variants,
  DisabledVariants,
  StyledButtonProps,
};
