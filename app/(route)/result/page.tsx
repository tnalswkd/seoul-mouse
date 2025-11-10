"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import Typography from "@/app/_components/Typography";
import { Button } from "@/app/_components/Button";
import { Card } from "@/app/_components/Card";
import { SeoulMap } from "@/app/_components/SeoulMap";
import { getRecommendations } from "@/app/_libs/api/recommend";
import type { DistrictRecommendation } from "@/app/_types/recommend";
import loadingImage from "@/app/_assets/illust/loading.png";

/**
 * 구 이름을 district ID로 매핑
 */
function mapDistrictNameToId(districtName: string): string {
  const mapping: Record<string, string> = {
    강남구: "gangnam",
    강동구: "gangdong",
    강북구: "gangbuk",
    강서구: "gangseo",
    관악구: "gwanak",
    광진구: "gwangjin",
    구로구: "guro",
    금천구: "geumcheon",
    노원구: "nowon",
    도봉구: "dobong",
    동대문구: "dongdaemun",
    동작구: "dongjak",
    마포구: "mapo",
    서대문구: "seodaemun",
    서초구: "seocho",
    성동구: "seongdong",
    송파구: "songpa",
    양천구: "yangcheon",
    영등포구: "yeongdeungpo",
    용산구: "yongsan",
    은평구: "eunpyeong",
    종로구: "jongno",
    중구: "jung",
    중랑구: "jungnang",
  };
  return mapping[districtName] || "";
}

const housingTypeLabels: Record<string, string> = {
  apartment: "아파트",
  office: "오피스텔",
  oneroom: "원룸",
  tworoom: "투룸+",
};

const contractTypeLabels: Record<string, string> = {
  jeonse: "전세",
  wolse: "월세",
};

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recommendations, setRecommendations] = useState<
    DistrictRecommendation[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const params = {
          housingType: searchParams.get("housingType") || "",
          contractType: searchParams.get("contractType") || "",
          depositMin: Number(searchParams.get("depositMin")) || 0,
          depositMax: Number(searchParams.get("depositMax")) || 0,
          monthlyMin: Number(searchParams.get("monthlyMin")) || 0,
          monthlyMax: Number(searchParams.get("monthlyMax")) || 0,
          areaMin: Number(searchParams.get("areaMin")) || 0,
          areaMax: Number(searchParams.get("areaMax")) || 0,
        };

        const data = await getRecommendations(params);
        setRecommendations(data);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setError(
          err instanceof Error
            ? err.message
            : "추천 결과를 불러오는데 실패했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [searchParams]);

  const handleRetry = () => {
    router.push("/type-select");
  };

  // 지도에 표시할 구 ID 배열
  const highlightedDistricts = recommendations
    .map((rec) => mapDistrictNameToId(rec.district))
    .filter((id) => id !== "");

  // 사용자가 선택한 조건 요약 생성
  const getSummaryText = () => {
    const housingType = searchParams.get("housingType") || "";
    const contractType = searchParams.get("contractType") || "";
    const depositMin = searchParams.get("depositMin") || "0";
    const depositMax = searchParams.get("depositMax") || "0";
    const monthlyMin = searchParams.get("monthlyMin") || "0";
    const monthlyMax = searchParams.get("monthlyMax") || "0";
    const areaMin = searchParams.get("areaMin") || "0";
    const areaMax = searchParams.get("areaMax") || "0";

    const housingLabel = housingTypeLabels[housingType] || "원룸";
    const contractLabel = contractTypeLabels[contractType] || "월세";

    let summary = `보증금 ${depositMin}~${depositMax}만원`;

    if (contractType === "wolse") {
      summary += `, 월세 ${monthlyMin}~${monthlyMax}만원으로`;
    } else {
      summary += `으로`;
    }

    summary += `\n${areaMin}~${areaMax}㎡, ${housingLabel}에 살고 싶으면 여기 추천하맨`;

    return summary;
  };

  // 로딩 중일 때 로딩 UI 표시
  if (isLoading) {
    return (
      <S.LoadingContainer>
        <S.LoadingWrapper>
          <S.Spinner>
            <Image
              src={loadingImage}
              alt="로딩중"
              width={120}
              height={120}
              priority
            />
          </S.Spinner>
          <S.TextWrapper>
            <Typography variant="title" color="black">
              너한테 맞는 서울을 둘러보는쥥
            </Typography>
          </S.TextWrapper>
        </S.LoadingWrapper>
      </S.LoadingContainer>
    );
  }

  // 에러가 있을 때
  if (error) {
    return (
      <S.LoadingContainer>
        <S.LoadingWrapper>
          <S.TextWrapper>
            <Typography variant="title" color="black">
              {error}
            </Typography>
          </S.TextWrapper>
          <Button variant="dark" width="200px" onClick={handleRetry}>
            다시 찾기
          </Button>
        </S.LoadingWrapper>
      </S.LoadingContainer>
    );
  }

  return (
    <S.Container>
      <S.MapSection>
        <SeoulMap highlightedDistricts={highlightedDistricts} />
      </S.MapSection>

      <S.ScrollContent>
        {recommendations.length === 0 ? (
          <S.SummaryCard>
            <Typography variant="body2" color="black">
              추천 결과가 없습니다.
            </Typography>
          </S.SummaryCard>
        ) : (
          <>
            <S.SummaryCard>
              <Typography
                variant="body2"
                color="black"
                style={{ whiteSpace: "pre-line" }}
              >
                {getSummaryText()}
              </Typography>
            </S.SummaryCard>

            <S.ResultList>
              {recommendations.map((result, index) => (
                <Card
                  key={index}
                  title={result.district}
                  description={result.description}
                  numberTags={result.subwaylines
                    .map((line) => {
                      const num = parseInt(line);
                      return isNaN(num) ? null : num;
                    })
                    .filter((num): num is number => num !== null)}
                  tags={result.subwaystations}
                  variant="default"
                />
              ))}
            </S.ResultList>
          </>
        )}

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
  LoadingContainer: styled.div`
    width: 375px;
    min-height: 100vh;
    background-color: var(--bg);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  `,

  LoadingWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  `,

  Spinner: styled.div`
    width: 64px;
    height: 64px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  TextWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-align: center;
  `,

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
