"use client";
import React, { forwardRef } from "react";
import styled from "styled-components";
import { variants as typographyVariants } from "@/app/_styles/typography";

type TagProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * @example
 * <Tag>지하철역</Tag>
 */
export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const { children, ...tagProps } = props;

  return (
    <S.Tag {...tagProps} ref={ref}>
      {children}
    </S.Tag>
  );
});

const S = {
  Tag: styled("div")({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "4px 12px",
    borderRadius: "32px",
    backgroundColor: "rgba(46, 156, 59, 0.3)", // #2E9C3B with 30% opacity
    fontFamily: "GangwonEduAll, sans-serif",
    fontWeight: 400,
    ...typographyVariants.body3,
    color: "var(--sub_2)",
    width: "fit-content",
  }),
};

Tag.displayName = "Tag";

