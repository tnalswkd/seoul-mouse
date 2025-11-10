"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import Typography from "@/app/_components/Typography";
import loadingImage from "@/app/_assets/illust/loading.png";

export default function LoadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 2초 후 결과 페이지로 이동
    const timer = setTimeout(() => {
      router.push(`/result?${searchParams.toString()}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <S.Container>
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
