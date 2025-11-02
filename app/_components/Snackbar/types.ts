import { ComponentPropsWithoutRef, ReactNode } from "react";

import { GetPropDefTypes, PropDef } from "../props/prop-def";

type SnackbarOwnProps = {
  message: string;
  open?: boolean;
  position?: "top" | "bottom";
  autoHideDuration?: number;
  onClose?: () => void;
};

type SnackbarBaseProps = GetPropDefTypes<typeof snackbarPropDefs>;

type SnackbarProps = ComponentPropsWithoutRef<"div"> &
  SnackbarBaseProps &
  SnackbarOwnProps;

type StyledSnackbarProps = Pick<SnackbarProps, "open" | "position">;

const snackbarPropDefs = {
  open: {
    type: "boolean",
    default: false,
  },
  position: {
    type: "enum",
    values: ["top", "bottom"],
    default: "bottom",
  },
} satisfies {
  open: PropDef<boolean>;
  position: PropDef<"top" | "bottom">;
};

export { snackbarPropDefs };
export type { SnackbarProps, StyledSnackbarProps };
