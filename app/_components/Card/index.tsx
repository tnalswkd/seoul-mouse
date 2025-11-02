"use client";
import { forwardRef } from "react";
import styled from "styled-components";
import { variants as typographyVariants } from "@/app/_styles/typography";
import { cardPropDefs, CardProps, StyledCardProps } from "./types";
import { Tag } from "./Tag";
import tagNumber1 from "@/app/_assets/icon/tag_number1.png";
import tagNumber2 from "@/app/_assets/icon/tag_number2.png";
import tagNumber3 from "@/app/_assets/icon/tag_number3.png";
import tagNumber4 from "@/app/_assets/icon/tag_number4.png";
import tagNumber5 from "@/app/_assets/icon/tag_number5.png";
import tagNumber6 from "@/app/_assets/icon/tag_number6.png";
import tagNumber7 from "@/app/_assets/icon/tag_number7.png";
import tagNumber8 from "@/app/_assets/icon/tag_number8.png";
import tagNumber9 from "@/app/_assets/icon/tag_number9.png";
import tagNumber10 from "@/app/_assets/icon/tag_number10.png";

const numberImages: Record<number, any> = {
  1: tagNumber1,
  2: tagNumber2,
  3: tagNumber3,
  4: tagNumber4,
  5: tagNumber5,
  6: tagNumber6,
  7: tagNumber7,
  8: tagNumber8,
  9: tagNumber9,
  10: tagNumber10,
};

function getVariant(props: StyledCardProps) {
  const { variant } = props;

  switch (variant) {
    case "default":
    default:
      return {
        backgroundColor: "var(--white)",
        border: "1px solid var(--line)",
        borderRadius: "16px",
        padding: "16px",
      };
  }
}

/**
 * @example
 * <Card
 *   title="자치구"
 *   description="구에 대한 간단 설명"
 *   numberTags={[1, 2, 3]}
 *   tags={["지하철역", "지하철역", "지하철역"]}
 * />
 */
const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    title,
    description,
    numberTags = [],
    tags = [],
    variant = cardPropDefs.variant.default,
    children,
    ...cardProps
  } = props;

  return (
    <S.Card {...cardProps} ref={ref} variant={variant}>
      <S.ContentSection>
        <S.Header>
          {title && <S.Title>{title}</S.Title>}
          {numberTags.length > 0 && (
            <S.NumberTagsContainer>
              {numberTags.map((num, index) => {
                const imageSrc = numberImages[num];
                const imageUrl =
                  typeof imageSrc === "string"
                    ? imageSrc
                    : imageSrc?.src || imageSrc;

                return (
                  <S.NumberTagWrapper key={index}>
                    <img
                      src={imageUrl}
                      alt={`${num}`}
                      width={20}
                      height={20}
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </S.NumberTagWrapper>
                );
              })}
            </S.NumberTagsContainer>
          )}
        </S.Header>
        {description && <S.Description>{description}</S.Description>}
      </S.ContentSection>
      {tags.length > 0 && (
        <S.TagsSection>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </S.TagsSection>
      )}
      {children}
    </S.Card>
  );
});

const S = {
  Card: styled("div")<StyledCardProps>((props) => {
    return {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      width: "100%",
      ...getVariant(props),
    };
  }),
  ContentSection: styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    width: "100%",
  }),
  Header: styled("div")({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  }),
  Title: styled("span")({
    fontFamily: "GangwonEduAll, sans-serif",
    fontWeight: 400,
    ...typographyVariants.subtitle,
    color: "var(--black)",
  }),
  NumberTagsContainer: styled("div")({
    display: "flex",
    flexDirection: "row",
    gap: "8px",
  }),
  NumberTagWrapper: styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  Description: styled("span")({
    fontFamily: "GangwonEduAll, sans-serif",
    fontWeight: 400,
    ...typographyVariants.body3,
    color: "var(--black)",
  }),
  TagsSection: styled("div")({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "8px",
    width: "100%",
  }),
};

Card.displayName = "Card";

export { Card };
