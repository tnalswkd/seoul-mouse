import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementRef,
  forwardRef,
} from "react";
import { GetPropDefTypes } from "@/app/_components/props/prop-def";
import colorToken from "@/app/_styles/colorToken";
import styled from "styled-components";

import { typographyPropDefs } from "./types";
import typography from "@/app/_styles/typography";

type TypohraphyElement = ElementRef<"span">;
type TypographySpanProps = { as?: "span" } & ComponentPropsWithoutRef<"span">;
type TypohraphyOwnProps = GetPropDefTypes<typeof typographyPropDefs>;
type TypohraphyProps = TypographySpanProps & TypohraphyOwnProps & CSSProperties;

/**
 * @param {string} variant - 디자인 시스템에 적용된 variant 참고
 * @param {string} color - 디자인 시스템에 적용된 colorToken 참고
 * @example
 * <Typography variant='' color=''></Typography>
 */
const Typography = forwardRef<TypohraphyElement, TypohraphyProps>(
  (props, forwardedRef) => {
    const {
      as = "span",
      variant = typographyPropDefs.variant.default,
      color,
      children,
      style,
      className,
      onClick,
      // ...typoProps
    } = props;

    return (
      <S.Typography
        ref={forwardedRef}
        color={color}
        variant={variant}
        style={style}
        className={className}
        onClick={onClick}
        // {...typoProps}
      >
        {children}
      </S.Typography>
    );
  }
);

type TypographyStyleProps = {
  color: any;
  variant: any;
};

const S = {
  Typography: styled("span")<TypographyStyleProps>(({ color, variant }) => ({
    color: colorToken[color as keyof typeof colorToken],
    ...(typography[variant as keyof typeof typography] as any),
  })) as any,
} as any;

Typography.displayName = "Typography";

export default Typography;
