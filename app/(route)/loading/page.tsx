"use client";
import styled from "styled-components";
import Typography from "@/app/_components/Typography";

export default function LoadingPage() {
  return (
    <S.Container>
      <S.LoadingWrapper>
        <S.Spinner>쥐 들어가야함</S.Spinner>
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
