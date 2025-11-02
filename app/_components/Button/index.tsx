"use client";
import React, { forwardRef } from "react";
import typography, {
  variants as typographyVariants,
} from "@/app/_styles/typography";
import styled from "styled-components";

import { buttonPropDefs, ButtonProps, StyledButtonProps } from "./types";

function getVariant(props: StyledButtonProps) {
  const { variant, disabled, selected } = props;

  switch (variant) {
    case "dark":
      return getDarkVariant(disabled || false);
    case "default":
      return {
        backgroundColor: `var(--${disabled ? "gray" : "black"})`,
        color: `var(--gray2)`,
        border: "none",
        // ":hover": {
        //   backgroundColor: `var(--${disabled ? "" : "blue_400"})`,
        // },
      };
    case "gray":
      return {
        border: "none",
        backgroundColor: `var(--gray)`,
        color: `var(--gray2)`,
        ":hover": {
          backgroundColor: "#409CFF2E",
        },
      };
  }
}

// Figma 디자인에 맞춘 dark 버튼 스타일
const getDarkVariant = (disabled: boolean) => ({
  backgroundColor: disabled ? "var(--gray1)" : "var(--black)",
  color: "var(--gray2)",
  borderRadius: "54px",
  padding: "7px 0px",
  height: "48px",
  border: "none",
  fontFamily: "Gangwon, sans-serif",
  ":hover": {
    backgroundColor: disabled ? "var(--gray1)" : "var(--black)",
  },
});

/**
 *  @example <Button variant="gray1" size="md">button</Button>
 *  @example <Button variant="dark" subtext="지금까지 321명이 알아봤어요">부탁하쥐</Button>
 *
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    width = buttonPropDefs.width.default,
    variant = buttonPropDefs.variant.default,
    disabled = props.loading || buttonPropDefs.disabled.default,
    startIcon,
    endIcon,
    selected = buttonPropDefs.selected.default,
    subtext,
    // color,
    ...buttonProps
  } = props;

  const isDarkVariant = variant === "dark";

  return (
    <S.Button
      {...buttonProps}
      ref={ref}
      disabled={disabled}
      variant={variant}
      width={isDarkVariant && !width ? "284px" : width}
      selected={selected}
    >
      {startIcon && startIcon}

      {variant === "dark" ? (
        <S.LabelContainer $hasSubtext={!!subtext}>
          <S.Label variant={variant}>{children}</S.Label>
          {subtext && <S.Subtext variant={variant}>{subtext}</S.Subtext>}
        </S.LabelContainer>
      ) : (
        <S.Label variant={variant}>{children}</S.Label>
      )}

      {endIcon && endIcon}
    </S.Button>
  );
});

const S = {
  Button: styled("button")<StyledButtonProps>((props) => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      borderRadius: "54px",
      transition: "all .25s",
      cursor: props.disabled ? "not-allowed" : "pointer",
      width: props.width,
      fontFamily:
        props.variant === "dark"
          ? "Gangwon, sans-serif"
          : "Pretendard, sans-serif",
      padding: "7px 0px",
      height: "48px",
      ...getVariant(props),
    };
  }),
  LabelContainer: styled("div")<{ $hasSubtext: boolean }>(
    ({ $hasSubtext }) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: $hasSubtext ? "1px" : "0",
    })
  ),
  Label: styled("span")<
    Pick<ButtonProps, "variant"> & {
      variant?: ButtonProps["variant"];
    }
  >(() => {
    return {
      fontFamily: "Gangwon, sans-serif",
      fontWeight: 400,
      ...typographyVariants.title,
    };
  }),
  Subtext: styled("span")<{ variant?: ButtonProps["variant"] }>(
    ({ variant }) => ({
      fontFamily: "Gangwon, sans-serif",
      fontWeight: 400,
      ...typographyVariants.body3,
    })
  ),
};

Button.displayName = "Button";

export { Button };
