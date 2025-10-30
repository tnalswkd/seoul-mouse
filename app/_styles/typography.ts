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
    fontWeight: 700,
    fontSize: "42px",
    lineHeight: "50px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontWeight: 600,
    fontSize: "36px",
    lineHeight: "44px",
    letterSpacing: "-0.5px",
  },
  body1: {
    fontWeight: 600,
    fontSize: "32px",
    lineHeight: "38px",
    letterSpacing: "-0.5px",
  },
  body2: {
    fontWeight: 600,
    fontSize: "28px",
    lineHeight: "36px",
    letterSpacing: "-0.5px",
  },
  body3: {
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: "36px",
    letterSpacing: "-0.5px",
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
