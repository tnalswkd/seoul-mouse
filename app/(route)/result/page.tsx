"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Typography from "@/app/_components/Typography";
import { Button } from "@/app/_components/Button";
import { Card } from "@/app/_components/Card";
import { SeoulMap } from "@/app/_components/SeoulMap";

const mockResults = [
  {
    id: 1,
    district: "강북구",
    description: "저렴한 보도로 지하철 접근성이 좋고 소소한 상점이 많고 모인행",
    numberTags: [1, 2, 3],
    stations: [
      "이마트마켓",
      "수유역",
      "수정역",
      "강북역",
      "가오산리",
      "한성대역",
      "북한산역",
    ],
  },
  {
    id: 2,
    district: "강서구",
    description: "근래 대한 단전 성명",
    numberTags: [4, 5, 6],
    stations: ["개봉역", "개봉남역", "개봉북역", "개미역"],
  },
  {
    id: 3,
    district: "관악구",
    description: "근래 대한 단전 성명",
    numberTags: [7, 8, 9],
    stations: ["낙성대역", "서울대역", "봉천역", "신림역"],
  },
];

const highlightedDistricts = ["gangbuk", "gangseo", "gwanak"];

export default function ResultPage() {
  const router = useRouter();

  const handleRetry = () => {
    router.push("/type-select");
  };

  return (
    <S.Container>
      <S.MapSection>
        <SeoulMap highlightedDistricts={highlightedDistricts} />
      </S.MapSection>

      <S.ScrollContent>
        <S.SummaryCard>
          <Typography variant="body2" color="black">
            보증금 300~1000만원, 월세 40만원정도로 10평, 한옥과 살고 싶으면 여기
            3곳넬랴
          </Typography>
        </S.SummaryCard>

        <S.ResultList>
          {mockResults.map((result) => (
            <Card
              key={result.id}
              title={result.district}
              description={result.description}
              numberTags={result.numberTags}
              tags={result.stations}
              variant="default"
            />
          ))}
        </S.ResultList>

        <S.ButtonWrapper>
          <Button variant="dark" width="100%" onClick={handleRetry}>
            다시 찾기
          </Button>
        </S.ButtonWrapper>
      </S.ScrollContent>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 375px;
    height: 100vh;
    background-color: var(--bg);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,

  MapSection: styled.div`
    width: 100%;
    height: 320px;
    flex-shrink: 0;
    background-color: var(--white);
    position: relative;
    border-bottom: 1px solid var(--line);
  `,

  ScrollContent: styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  SummaryCard: styled.div`
    width: 100%;
    padding: 16px 20px;
    border-radius: 12px;
    background-color: #f5f5f5;
    text-align: center;
    line-height: 1.5;
  `,

  ResultList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  `,

  ButtonWrapper: styled.div`
    margin-top: 8px;
    padding-top: 8px;
    width: 100%;
    position: sticky;
    bottom: 0;
    background-color: var(--bg);
    padding-bottom: 16px;
  `,
};
