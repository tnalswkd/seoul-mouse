import { Variants } from "@/app/_types/variants";

export const variants: Record<
  Variants,
  {
    fontWeight?: number;
    fontSize?: string;
    lineHeight?: string;
    letterSpacing?: string;
    fontFamily?: string;
  }
> = {
  title: {
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "140%",
    letterSpacing: "0%",
    fontFamily: "GangwonEdu",
  },
  subtitle: {
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "130%",
    letterSpacing: "0%",
    fontFamily: "GangwonEdu",
  },
  body1: {
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "140%",
    letterSpacing: "0%",
    fontFamily: "GangwonEdu",
  },
  body2: {
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "130%",
    letterSpacing: "0%",
    fontFamily: "GangwonEdu",
  },
  body3: {
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "130%",
    letterSpacing: "0%",
    fontFamily: "GangwonEdu",
  },
};

const typography = {
  fontFamily: "GangwonEdu, sans-serif",
  htmlFontSize: 10,
  letterSpacing: "-0.5px",
  ...variants,
};

export default typography;
