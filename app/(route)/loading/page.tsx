"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import Typography from "@/app/_components/Typography";
import loadingImage from "@/app/_assets/illust/loading.png";
import { getRecommendations } from "@/app/_libs/api/recommend";

export default function LoadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
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

        const recommendations = await getRecommendations(params);

        // 결과를 localStorage에 저장
        localStorage.setItem(
          "recommendations",
          JSON.stringify(recommendations)
        );

        // 결과 페이지로 이동
        router.push(`/result?${searchParams.toString()}`);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setError("추천 결과를 불러오는데 실패했습니다.");
      }
    };

    fetchRecommendations();
  }, [router, searchParams]);

  return (
    <S.Container>
      <S.LoadingWrapper>
        {error ? (
          <S.TextWrapper>
            <Typography variant="title" color="black">
              {error}
            </Typography>
          </S.TextWrapper>
        ) : (
          <>
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
          </>
        )}
      </S.LoadingWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
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
  `,
};
