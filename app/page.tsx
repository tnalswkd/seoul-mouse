"use client";
import styled from "styled-components";
import Image from "next/image";
import titleSvg from "@/app/_assets/illust/title.png";
import introImage from "@/app/_assets/illust/intro.png";
import { Button } from "@/app/_components/Button";
import Typography from "@/app/_components/Typography";

export default function IntroPage() {
  return (
    <S.Container>
      <S.TitleWrapper>
        <Image src={titleSvg} alt="서울살쥐" width={186} height={83} priority />
      </S.TitleWrapper>

      <S.Subtitle style={{ whiteSpace: "nowrap" }}>
        <Typography variant="title" color="black">
          서울 물가를 모르는 지방러들을 위한
          <br />
          맞춤형 AI 집 찾기 도우미
        </Typography>
      </S.Subtitle>

      <S.ChatImageContainer>
        <S.ChatImageWrapper>
          <Image src={introImage} width={337} height={561} alt="채팅 화면" />
        </S.ChatImageWrapper>

        <S.ButtonWrapper>
          <Button
            variant="dark"
            subtext="지금까지 321명이 알아봤어요"
            width="282px"
          >
            부탁하쥐
          </Button>
        </S.ButtonWrapper>
      </S.ChatImageContainer>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 17px;
  `,
  TitleWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    margin-top: 83px;
  `,
  Subtitle: styled.div`
    width: 260px;
    text-align: center;
    z-index: 1;
  `,
  ChatImageWrapper: styled.div`
    display: flex;
    justify-content: center;
  `,
  ChatImageContainer: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 13px;
  `,
  ButtonWrapper: styled.div`
    position: absolute;
    bottom: 52px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    z-index: 3;
  `,
};
