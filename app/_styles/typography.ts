import { Variants } from "@/app/_types/variants";

export const variants: Record<
  Variants,
  {
    fontWeight?: number;
    fontSize?: string;
    lineHeight?: string;
    letterSpacing?: string;
  }
> = {
  title: {
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "140%",
    letterSpacing: "0%",
  },
  subtitle: {
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "130%",
    letterSpacing: "0%",
  },
  body1: {
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "140%",
    letterSpacing: "0%",
  },
  body2: {
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "130%",
    letterSpacing: "0%",
  },
  body3: {
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "130%",
    letterSpacing: "0%",
  },
};

const typography = {
  fontFamily: [
    "Pretendard",
    "Pretendard Regular",
    "Pretendard Black",
    "Pretendard Bold",
    "Pretendard ExtraBold",
    "Pretendard ExtraLight",
    "Pretendard Light",
    "Pretendard Medium",
    "Pretendard SemiBold",
    "Pretendard Thin",
  ].join(","),
  htmlFontSize: 10,
  letterSpacing: "-0.5px",
  ...variants,
};

export default typography;
