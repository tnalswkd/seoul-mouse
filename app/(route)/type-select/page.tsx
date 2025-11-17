"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Typography from "@/app/_components/Typography";
import { Button } from "@/app/_components/Button";

import icInfo from "@/app/_assets/icon/ic_info.png";
import icChevronLeft from "@/app/_assets/icon/ic_chevron-left.png";
import ilApartment from "@/app/_assets/illust/il_apartment.png";
import ilOffice from "@/app/_assets/illust/il_office.png";
import ilOneroom from "@/app/_assets/illust/il_oneroom.png";
import ilTworoom from "@/app/_assets/illust/il_tworoom.png";

type HousingType = "apartment" | "office" | "oneroom" | "tworoom" | null;
type ContractType = "jeonse" | "wolse" | null;

export default function TypeSelectPage() {
  const router = useRouter();
  const [selectedHousingType, setSelectedHousingType] =
    useState<HousingType>(null);
  const [selectedContractType, setSelectedContractType] =
    useState<ContractType>(null);

  const housingTypes = [
    { id: "apartment" as HousingType, label: "아파트", image: ilApartment },
    { id: "office" as HousingType, label: "오피스텔", image: ilOffice },
    { id: "oneroom" as HousingType, label: "원룸", image: ilOneroom },
    { id: "tworoom" as HousingType, label: "투룸+", image: ilTworoom },
  ];

  const contractTypes = [
    {
      id: "jeonse" as ContractType,
      title: "전세",
      description: "한 번에 큰 돈 맡기고 살기",
    },
    {
      id: "wolse" as ContractType,
      title: "월세",
      description: "매달 돈 내고 살기",
    },
  ];

  const handleBack = () => {
    router.push("/");
  };

  const handleNext = () => {
    if (!selectedHousingType || !selectedContractType) return;

    const params = new URLSearchParams({
      housingType: selectedHousingType,
      contractType: selectedContractType,
    });

    router.push(`/range-select?${params.toString()}`);
  };

  return (
    <S.Container>
      {/* 헤더 */}
      <S.Header>
        <S.BackButton onClick={handleBack}>
          <Image src={icChevronLeft} alt="뒤로가기" width={48} height={48} />
        </S.BackButton>
      </S.Header>

      {/* 주거 형태 섹션 */}
      <S.Section>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Typography variant="title" color="black">
            어떤 집에서 살젠?
          </Typography>

          <S.HousingTypeGrid>
            {housingTypes.map((type) => (
              <S.HousingTypeButton
                key={type.id}
                $selected={selectedHousingType === type.id}
                onClick={() => setSelectedHousingType(type.id)}
              >
                <div style={{ width: "60px", height: "70px" }}>
                  <Image
                    src={type.image}
                    alt={type.label}
                    width={60}
                    height={70}
                  />
                </div>
                <Typography variant="subtitle" color="black">
                  {type.label}
                </Typography>
              </S.HousingTypeButton>
            ))}
          </S.HousingTypeGrid>
        </div>

        <S.InfoText>
          <Image src={icInfo} alt="정보" width={16} height={16} />
          <Typography variant="body2" style={{ color: "var(--gray1)" }}>
            18평(60㎡) 이상은 투룸+, 그보다 작으면 원룸이에요.
          </Typography>
        </S.InfoText>
      </S.Section>

      {/* 계약 형태 섹션 */}
      <S.Section>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Typography variant="title" color="black">
            계약 형태는?
          </Typography>

          <S.ContractTypeGrid>
            {contractTypes.map((type) => (
              <S.ContractTypeButton
                key={type.id}
                $selected={selectedContractType === type.id}
                onClick={() => setSelectedContractType(type.id)}
              >
                <S.ContractContent>
                  <Typography variant="subtitle" color="black">
                    {type.title}
                  </Typography>
                  <Typography variant="body1" color="black">
                    {type.description}
                  </Typography>
                </S.ContractContent>
              </S.ContractTypeButton>
            ))}
          </S.ContractTypeGrid>
        </div>
      </S.Section>

      {/* 다음 버튼 */}
      <S.NextButtonWrapper>
        <Button
          variant="dark"
          width="100%"
          onClick={handleNext}
          disabled={!selectedHousingType || !selectedContractType}
        >
          다음
        </Button>
      </S.NextButtonWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 375px;
    min-height: 100vh;
    background-color: var(--bg);
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* padding: 16px; */
  `,

  Header: styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 0;
    padding: 0;
    position: relative;
  `,

  BackButton: styled.button`
    width: 48px;
    height: 48px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
  `,

  Section: styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  Title: styled.div`
    margin-bottom: 16px;
  `,

  HousingTypeGrid: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  `,

  HousingTypeButton: styled.button<{ $selected: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 16px;
    min-height: 120px;
    border: 1px solid
      ${(props) => (props.$selected ? "var(--black)" : "var(--line)")};
    border-radius: 12px;
    background-color: ${(props) =>
      props.$selected ? "var(--white)" : "var(--white)"};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: var(--black);
    }

    img {
      width: 60px;
      height: 70px;
    }
  `,

  InfoText: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  ContractTypeGrid: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  `,

  ContractTypeButton: styled.button<{ $selected: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    padding: 20px 16px;
    min-height: 100px;
    border: 1px solid
      ${(props) => (props.$selected ? "var(--black)" : "var(--line)")};
    border-radius: 12px;
    background-color: var(--white);
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    word-break: keep-all;
    overflow-wrap: break-word;

    &:hover {
      border-color: var(--black);
    }
  `,

  ContractContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
  `,

  NextButtonWrapper: styled.div`
    margin-top: auto;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 40px;
  `,
};
