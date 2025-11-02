import { ComponentPropsWithoutRef } from "react";
import { GetPropDefTypes, PropDef } from "../props/prop-def";

const variants = ["default", "filled", "focus"] as const;

type Variants = (typeof variants)[number];

type CounterOwnProps = {
  variant?: Variants;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
};

type CounterBaseProps = GetPropDefTypes<typeof counterPropDefs>;

type CounterProps = Omit<ComponentPropsWithoutRef<"div">, "onChange"> &
  CounterBaseProps &
  CounterOwnProps;

type StyledCounterProps = Pick<CounterProps, "variant" | "disabled">;

const counterPropDefs = {
  variant: {
    type: "enum",
    values: variants,
    default: "default",
  },
  disabled: {
    type: "boolean",
    default: false,
  },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
  disabled: PropDef<boolean>;
};

export { counterPropDefs };
export type {
  CounterProps,
  CounterOwnProps,
  CounterBaseProps,
  Variants,
  StyledCounterProps,
};
