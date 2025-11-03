"use client";
import React, { forwardRef, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { counterPropDefs, CounterProps, StyledCounterProps } from "./types";
import { variants as typographyVariants } from "@/app/_styles/typography";
import minusIcon from "@/app/_assets/icon/ic_minus.png";
import plusIcon from "@/app/_assets/icon/ic_plus.png";

function getVariantStyles(props: StyledCounterProps) {
  const { variant, disabled, width } = props;

  const baseStyles = {
    backgroundColor: "#F3F3F3",
    borderRadius: "12px",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    cursor: disabled ? "not-allowed" : "default",
    userSelect: "none" as const,
    width: width ?? "fit-content",
    minWidth: "fit-content",
    boxSizing: "border-box" as const,
    overflow: "visible" as const,
  };

  switch (variant) {
    case "default":
      return {
        ...baseStyles,
      };
    case "filled":
      return {
        ...baseStyles,
      };
    case "focus":
      return {
        ...baseStyles,
        border: "1px solid #161616",
      };
    default:
      return baseStyles;
  }
}

/**
 * @example <Counter value={100} onChange={(value) => console.log(value)} />
 * @example <Counter variant="filled" value={50} />
 */
const Counter = forwardRef<HTMLDivElement, CounterProps>((props, ref) => {
  const {
    value = 0,
    variant: initialVariant = counterPropDefs.variant.default,
    disabled = counterPropDefs.disabled.default,
    min = 0,
    max = 999,
    onChange,
    width,
    placeholder,
    ...divProps
  } = props;

  const [internalValue, setInternalValue] = useState(value);
  const [currentVariant, setCurrentVariant] = useState(initialVariant);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentValue = value !== undefined ? value : internalValue;

  // 외부 variant prop이 변경되면 내부 상태도 업데이트 (단, 포커스 중이 아닐 때만)
  useEffect(() => {
    if (!isFocused) {
      setCurrentVariant(initialVariant);
    }
  }, [initialVariant, isFocused]);

  const handleDecrease = () => {
    if (disabled) return;
    const newValue = Math.max(min, currentValue - 1);
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    setCurrentVariant("filled");
  };

  const handleIncrease = () => {
    if (disabled) return;
    const newValue = Math.min(max, currentValue + 1);
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    setCurrentVariant("filled");
  };

  const handleFocus = () => {
    setIsFocused(true);
    setCurrentVariant("focus");
  };

  const handleBlur = () => {
    setIsFocused(false);
    setCurrentVariant(initialVariant);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      // 빈 값일 때는 min 값으로 설정
      const newValue = min;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
      return;
    }
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(max, numValue));
      if (value === undefined) {
        setInternalValue(clampedValue);
      }
      onChange?.(clampedValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  return (
    <S.Counter
      {...divProps}
      ref={ref}
      variant={currentVariant}
      disabled={disabled}
      width={width}
    >
      <S.IconButton
        onClick={handleDecrease}
        disabled={disabled || currentValue <= min}
        aria-label="감소"
      >
        <Image src={minusIcon} alt="감소" width={24} height={24} />
      </S.IconButton>
      <S.Input
        ref={inputRef}
        type="text"
        value={currentValue === 0 && placeholder ? "" : currentValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        variant={currentVariant}
        aria-label="숫자 입력"
      />
      <S.IconButton
        onClick={handleIncrease}
        disabled={disabled || currentValue >= max}
        aria-label="증가"
      >
        <Image src={plusIcon} alt="증가" width={24} height={24} />
      </S.IconButton>
    </S.Counter>
  );
});

const S = {
  Counter: styled("div")<StyledCounterProps>((props) => ({
    ...getVariantStyles(props),
  })),
  IconButton: styled("button")<{ disabled: boolean }>(({ disabled }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "clamp(20px, 6.4vw, 24px)",
    height: "clamp(20px, 6.4vw, 24px)",
    minWidth: "20px",
    minHeight: "20px",
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "opacity 0.2s",
    flexShrink: 0,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
    "&:hover": {
      opacity: disabled ? 0.5 : 0.8,
    },
    "&:active": {
      opacity: disabled ? 0.5 : 0.6,
    },
  })),
  Input: styled("input")<StyledCounterProps>(({ variant, disabled }) => ({
    ...typographyVariants.subtitle,
    fontFamily: "Gangwon, sans-serif",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "130%",
    color: variant === "default" ? "#919191" : "#161616",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    textAlign: "center",
    padding: 0,
    cursor: disabled ? "not-allowed" : "text",
    flex: 1,
    minWidth: 0,

    appearance: "none",
    MozAppearance: "textfield",
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
    "&::placeholder": {
      color: "#919191",
    },
  })),
};

Counter.displayName = "Counter";

export { Counter };
