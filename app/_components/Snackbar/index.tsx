"use client";
import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { variants as typographyVariants } from "@/app/_styles/typography";
import { snackbarPropDefs, SnackbarProps, StyledSnackbarProps } from "./types";

function getVariant(props: StyledSnackbarProps) {
  const { position } = props;

  return {
    backgroundColor: "var(--gray3)",
    color: "var(--white)",
    borderRadius: "12px",
    padding: "16px 20px",
    width: "343px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    position: "fixed" as const,
    left: "50%",
    transform: "translateX(-50%)",
    ...(position === "top"
      ? {
          top: "20px",
        }
      : {
          bottom: "88px", // 버튼 위에 표시하기 위한 위치 (버튼 높이 48px + 여백 40px)
        }),
    zIndex: 1000,
    opacity: props.open ? 1 : 0,
    visibility: (props.open ? "visible" : "hidden") as "visible" | "hidden",
    transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
  };
}

/**
 * @example
 * <Snackbar message="18평 이상은 '투룸+'으로 선택해야 해요." open={true} />
 */
const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
  const {
    message,
    open = snackbarPropDefs.open.default,
    position = snackbarPropDefs.position.default,
    autoHideDuration,
    onClose,
    ...snackbarProps
  } = props;

  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && autoHideDuration && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          setTimeout(() => onClose(), 300); // 애니메이션 완료 후 onClose 호출
        }
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  if (!open && !isVisible) {
    return null;
  }

  return (
    <S.Snackbar
      {...snackbarProps}
      ref={ref}
      open={isVisible}
      position={position}
    >
      <S.Message>{message}</S.Message>
    </S.Snackbar>
  );
});

const S = {
  Snackbar: styled("div")<StyledSnackbarProps>((props) => {
    return {
      ...getVariant(props),
    };
  }),
  Message: styled("span")({
    fontFamily: "GangwonEduAll, sans-serif",
    fontWeight: 400,
    ...typographyVariants.body1,
    color: "var(--white)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  }),
};

Snackbar.displayName = "Snackbar";

export { Snackbar };
