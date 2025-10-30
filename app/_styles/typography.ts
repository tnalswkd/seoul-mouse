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
  "headline.100": {
    fontWeight: 700,
    fontSize: "42px",
    lineHeight: "50px",
    letterSpacing: "-0.5px",
  },
  "headline.200": {
    fontWeight: 600,
    fontSize: "36px",
    lineHeight: "44px",
    letterSpacing: "-0.5px",
  },
  "headline.300": {
    fontWeight: 600,
    fontSize: "32px",
    lineHeight: "38px",
    letterSpacing: "-0.5px",
  },
  "headline.400": {
    fontWeight: 600,
    fontSize: "28px",
    lineHeight: "36px",
    letterSpacing: "-0.5px",
  },
  "title.100": {
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: "36px",
    letterSpacing: "-0.5px",
  },
  "title.101": {
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "-0.5px",
  },
  "title.100_sb": {
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "36px",
    letterSpacing: "-0.5px",
  },
  "title.200": {
    fontWeight: 400,
    fontSize: "22px",
    lineHeight: "32px",
    letterSpacing: "-0.5px",
  },
  "title.200_sb": {
    fontWeight: 600,
    fontSize: "22px",
    lineHeight: "32px",
    letterSpacing: "-0.5px",
  },
  "subtitle.100": {
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "28px",
    letterSpacing: "-0.5px",
  },
  "subtitle.100_sb": {
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "28px",
    letterSpacing: "-0.5px",
  },
  "subtitle.101": {
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "32px",
    letterSpacing: "-0.5px",
  },
  "subtitle.200": {
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "26px",
    letterSpacing: "-0.5px",
  },
  "subtitle.200_sb": {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "26px",
    letterSpacing: "-0.5px",
  },
  "subtitle.201": {
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "30px",
    letterSpacing: "-0.5px",
  },
  "subtitle.202_sb": {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "22px",
    letterSpacing: "-0.09px",
  },
  "body.100": {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "22px",
    letterSpacing: "-0.5px",
  },
  "body.100_sb": {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "22px",
    letterSpacing: "-0.5px",
  },
  "body.200": {
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "22px",
    letterSpacing: "-0.5px",
  },
  "body.200_sb": {
    fontWeight: 600,
    fontSize: "15px",
    lineHeight: "22px",
    letterSpacing: "-0.5px",
  },
  "body.201": {
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "26px",
    letterSpacing: "-0.5px",
  },
  "body.300": {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "-0.5px",
  },
  "body.300_md": {
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "-0.5px",
  },
  "body.300_sb": {
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "-0.5px",
  },
  "body.301": {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "-0.5px",
  },
  "caption.100": {
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "20px",
    letterSpacing: "-0.5px",
  },
  "caption.100_md": {
    fontWeight: 500,
    fontSize: "13px",
    lineHeight: "20px",
    letterSpacing: "-0.5px",
  },
  "caption.100_sb": {
    fontWeight: 600,
    fontSize: "13px",
    lineHeight: "20px",
    letterSpacing: "-0.5px",
  },
  "caption.200": {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "-0.5px",
  },
  "caption.200_sb": {
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "-0.5px",
  },
  "caption.300": {
    fontWeight: 400,
    fontSize: "11px",
    lineHeight: "16px",
    letterSpacing: "-0.5px",
  },
  "caption.300_sb": {
    fontWeight: 600,
    fontSize: "11px",
    lineHeight: "16px",
    letterSpacing: "-0.5px",
  },
  gnb_on: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: 700,
  },
  gnb_off: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: 400,
    letterSpacing: "-0.5px",
  },
  btn: {
    fontSize: "15px",
    lineHeight: "26px",
    fontWeight: 700,
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
