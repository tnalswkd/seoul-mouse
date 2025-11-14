"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import Typography from "@/app/_components/Typography";
import { Button } from "@/app/_components/Button";
import { Counter } from "@/app/_components/Counter";

import { getDepositOptions, type HousingType } from "./options";

import icChevronLeft from "@/app/_assets/icon/ic_chevron-left.png";

type ContractType = "jeonse" | "wolse" | null;

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

function RangeSelectPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const housingType = searchParams.get("housingType") as HousingType;
  const contractType = searchParams.get("contractType") as ContractType;

  const [selectedDepositFirst, setSelectedDepositFirst] = useState<
    string | null
  >(null);
  const [selectedDepositSecond, setSelectedDepositSecond] = useState<
    string | null
  >(null);
  const [depositMinValue, setDepositMinValue] = useState(0);
  const [depositMaxValue, setDepositMaxValue] = useState(0);

  const [selectedMonthlyFirst, setSelectedMonthlyFirst] = useState<
    string | null
  >(null);
  const [selectedMonthlySecond, setSelectedMonthlySecond] = useState<
    string | null
  >(null);
  const [monthlyMinValue, setMonthlyMinValue] = useState(0);
  const [monthlyMaxValue, setMonthlyMaxValue] = useState(0);

  const [selectedAreaFirst, setSelectedAreaFirst] = useState<string | null>(
    null
  );
  const [selectedAreaSecond, setSelectedAreaSecond] = useState<string | null>(
    null
  );
  const [areaMinValue, setAreaMinValue] = useState(0);
  const [areaMaxValue, setAreaMaxValue] = useState(0);

  const depositOptions = getDepositOptions(housingType);

  // 주택 유형이 변경되면 선택된 값들 초기화
  useEffect(() => {
    setSelectedDepositFirst(null);
    setSelectedDepositSecond(null);
    setDepositMinValue(0);
    setDepositMaxValue(0);
  }, [housingType]);

  const monthlyOptions = {
    row1: ["10", "20", "30", "40", "50"],
    row2: ["60", "70", "80", "90", "100~"],
  };

  const areaOptions = {
    row1: ["~10", "20", "30", "40", "50"],
    row2: ["60", "70", "80", "90", "100~"],
  };

  // 문자열 값을 숫자로 변환하는 헬퍼 함수
  const parseValue = (value: string, type: "deposit" | "monthly" | "area") => {
    if (type === "deposit") {
      if (value.includes("천")) {
        const num = parseInt(value.replace("천", "").replace("~", ""));
        return num * 1000; // 천만원 단위
      }
      if (value.includes("억")) {
        // "1.5억" 같은 경우 처리
        const numStr = value.replace("억", "").replace("~", "");
        const num = parseFloat(numStr);
        return Math.round(num * 10000); // 억 단위 (만원)
      }
      if (value.startsWith("~")) {
        const num = parseInt(value.replace("~", "").replace("천", ""));
        return num * 1000;
      }
      // 숫자만 있는 경우 (만원 단위)
      const num = parseInt(value);
      if (!isNaN(num)) {
        return num;
      }
    } else if (type === "monthly" || type === "area") {
      if (value.includes("~")) {
        const num = parseInt(value.replace("~", ""));
        return num;
      }
      return parseInt(value) || 0;
    }
    return 0;
  };

  const handleDepositSelect = (value: string) => {
    // 이미 선택된 값이면 해제
    if (selectedDepositFirst === value) {
      setSelectedDepositFirst(null);
      setSelectedDepositSecond(null);
      setDepositMinValue(0);
      setDepositMaxValue(0);
    } else if (selectedDepositSecond === value) {
      setSelectedDepositSecond(null);
      setDepositMaxValue(0);
    } else {
      // 첫 번째 선택이 없으면 첫 번째로, 있으면 두 번째로
      if (!selectedDepositFirst) {
        setSelectedDepositFirst(value);
        const numValue = parseValue(value, "deposit");
        setDepositMinValue(numValue);
        setDepositMaxValue(numValue);
      } else {
        // 두 번째 선택 시 범위 처리
        const allOptions = [...depositOptions.row1, ...depositOptions.row2];
        const firstIndex = allOptions.indexOf(selectedDepositFirst);
        const secondIndex = allOptions.indexOf(value);

        if (firstIndex !== -1 && secondIndex !== -1) {
          const minIndex = Math.min(firstIndex, secondIndex);
          const maxIndex = Math.max(firstIndex, secondIndex);

          // 범위의 최소값과 최대값 설정
          const minValue = parseValue(allOptions[minIndex], "deposit");
          const maxValue = parseValue(allOptions[maxIndex], "deposit");

          setDepositMinValue(minValue);
          setDepositMaxValue(maxValue);

          // 작은 값이 첫 번째, 큰 값이 두 번째
          if (minIndex === firstIndex) {
            setSelectedDepositSecond(value);
          } else {
            setSelectedDepositSecond(selectedDepositFirst);
            setSelectedDepositFirst(value);
          }
        }
      }
    }
  };

  const handleMonthlySelect = (value: string) => {
    if (selectedMonthlyFirst === value) {
      setSelectedMonthlyFirst(null);
      setSelectedMonthlySecond(null);
      setMonthlyMinValue(0);
      setMonthlyMaxValue(0);
    } else if (selectedMonthlySecond === value) {
      setSelectedMonthlySecond(null);
      setMonthlyMaxValue(0);
    } else {
      if (!selectedMonthlyFirst) {
        setSelectedMonthlyFirst(value);
        const numValue = parseValue(value, "monthly");
        setMonthlyMinValue(numValue);
        setMonthlyMaxValue(numValue);
      } else {
        const allOptions = [...monthlyOptions.row1, ...monthlyOptions.row2];
        const firstIndex = allOptions.indexOf(selectedMonthlyFirst);
        const secondIndex = allOptions.indexOf(value);

        if (firstIndex !== -1 && secondIndex !== -1) {
          const minIndex = Math.min(firstIndex, secondIndex);
          const maxIndex = Math.max(firstIndex, secondIndex);

          const minValue = parseValue(allOptions[minIndex], "monthly");
          const maxValue = parseValue(allOptions[maxIndex], "monthly");

          setMonthlyMinValue(minValue);
          setMonthlyMaxValue(maxValue);

          if (minIndex === firstIndex) {
            setSelectedMonthlySecond(value);
          } else {
            setSelectedMonthlySecond(selectedMonthlyFirst);
            setSelectedMonthlyFirst(value);
          }
        }
      }
    }
  };

  const handleAreaSelect = (value: string) => {
    if (selectedAreaFirst === value) {
      setSelectedAreaFirst(null);
      setSelectedAreaSecond(null);
      setAreaMinValue(0);
      setAreaMaxValue(0);
    } else if (selectedAreaSecond === value) {
      setSelectedAreaSecond(null);
      setAreaMaxValue(0);
    } else {
      if (!selectedAreaFirst) {
        setSelectedAreaFirst(value);
        const numValue = parseValue(value, "area");
        setAreaMinValue(numValue);
        setAreaMaxValue(numValue);
      } else {
        const allOptions = [...areaOptions.row1, ...areaOptions.row2];
        const firstIndex = allOptions.indexOf(selectedAreaFirst);
        const secondIndex = allOptions.indexOf(value);

        if (firstIndex !== -1 && secondIndex !== -1) {
          const minIndex = Math.min(firstIndex, secondIndex);
          const maxIndex = Math.max(firstIndex, secondIndex);

          const minValue = parseValue(allOptions[minIndex], "area");
          const maxValue = parseValue(allOptions[maxIndex], "area");

          setAreaMinValue(minValue);
          setAreaMaxValue(maxValue);

          if (minIndex === firstIndex) {
            setSelectedAreaSecond(value);
          } else {
            setSelectedAreaSecond(selectedAreaFirst);
            setSelectedAreaFirst(value);
          }
        }
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!housingType || !contractType) return;

    const params = new URLSearchParams({
      housingType: housingType,
      contractType: contractType,
      depositMin: depositMinValue.toString(),
      depositMax: depositMaxValue.toString(),
      monthlyMin: monthlyMinValue.toString(),
      monthlyMax: monthlyMaxValue.toString(),
      areaMin: areaMinValue.toString(),
      areaMax: areaMaxValue.toString(),
    });

    router.push(`/result?${params.toString()}`);
  };

  const isFormValid = () => {
    if (contractType === "wolse") {
      return (
        (selectedDepositFirst || depositMinValue > 0) &&
        (selectedDepositSecond || depositMaxValue > 0) &&
        (selectedMonthlyFirst || monthlyMinValue > 0) &&
        (selectedMonthlySecond || monthlyMaxValue > 0) &&
        (selectedAreaFirst || areaMinValue > 0) &&
        (selectedAreaSecond || areaMaxValue > 0)
      );
    } else {
      return (
        (selectedDepositFirst || depositMinValue > 0) &&
        (selectedDepositSecond || depositMaxValue > 0) &&
        (selectedAreaFirst || areaMinValue > 0) &&
        (selectedAreaSecond || areaMaxValue > 0)
      );
    }
  };

  if (!housingType || !contractType) {
    return <div>잘못된 접근입니다.</div>;
  }

  const displayTag = `${housingTypeLabels[housingType]}/${contractTypeLabels[contractType]}`;

  return (
    <S.Container>
      {/* 헤더 */}
      <S.Header>
        <S.BackButton onClick={handleBack}>
          <Image src={icChevronLeft} alt="뒤로가기" width={48} height={48} />
        </S.BackButton>
        <S.Tag>{displayTag}</S.Tag>
      </S.Header>

      {/* 제목 */}
      <S.Section>
        <Typography variant="title" color="black">
          예산은 어느정도 생각핸?
        </Typography>
      </S.Section>

      {/* 보증금 섹션 */}
      <S.Section>
        <S.SectionHeader>
          <Typography variant="subtitle" color="black">
            보증금
          </Typography>
          <S.DescriptionRow>
            <Typography variant="body2" color="black">
              {contractType === "jeonse"
                ? "전세 계약 때 맡겨두고 나중에 돌려받는 돈"
                : "월세 계약 때 맡겨두고 나중에 돌려받는 돈"}
            </Typography>
            <Typography variant="body2" style={{ color: "var(--gray1)" }}>
              (만원)
            </Typography>
          </S.DescriptionRow>
        </S.SectionHeader>

        <S.NumberGrid>
          <S.NumberRow>
            {depositOptions.row1.map((option, index) => {
              const isFirstSelected = selectedDepositFirst === option;
              const isSecondSelected = selectedDepositSecond === option;
              const allOptions = [
                ...depositOptions.row1,
                ...depositOptions.row2,
              ];
              const optionIndex = allOptions.indexOf(option);
              const firstIndex = selectedDepositFirst
                ? allOptions.indexOf(selectedDepositFirst)
                : -1;
              const secondIndex = selectedDepositSecond
                ? allOptions.indexOf(selectedDepositSecond)
                : -1;
              const isInRange =
                firstIndex !== -1 &&
                secondIndex !== -1 &&
                optionIndex >= Math.min(firstIndex, secondIndex) &&
                optionIndex <= Math.max(firstIndex, secondIndex);
              const isRangeMiddle =
                isInRange && !isFirstSelected && !isSecondSelected;

              return (
                <S.NumberButton
                  key={option}
                  $selected={isFirstSelected}
                  $selectedSecond={isSecondSelected}
                  $isInRange={isRangeMiddle}
                  $isFirst={index === 0}
                  $isLast={index === depositOptions.row1.length - 1}
                  $isTopRow={true}
                  onClick={() => handleDepositSelect(option)}
                >
                  <Typography
                    variant="subtitle"
                    style={{
                      color:
                        isFirstSelected || isSecondSelected
                          ? "#FFFFFF"
                          : isRangeMiddle
                          ? "#564200"
                          : "#161616",
                    }}
                  >
                    {option}
                  </Typography>
                </S.NumberButton>
              );
            })}
          </S.NumberRow>
          <S.NumberRow>
            {depositOptions.row2.map((option, index) => {
              const isFirstSelected = selectedDepositFirst === option;
              const isSecondSelected = selectedDepositSecond === option;
              const allOptions = [
                ...depositOptions.row1,
                ...depositOptions.row2,
              ];
              const optionIndex = allOptions.indexOf(option);
              const firstIndex = selectedDepositFirst
                ? allOptions.indexOf(selectedDepositFirst)
                : -1;
              const secondIndex = selectedDepositSecond
                ? allOptions.indexOf(selectedDepositSecond)
                : -1;
              const isInRange =
                firstIndex !== -1 &&
                secondIndex !== -1 &&
                optionIndex >= Math.min(firstIndex, secondIndex) &&
                optionIndex <= Math.max(firstIndex, secondIndex);
              const isRangeMiddle =
                isInRange && !isFirstSelected && !isSecondSelected;

              return (
                <S.NumberButton
                  key={option}
                  $selected={isFirstSelected}
                  $selectedSecond={isSecondSelected}
                  $isInRange={isRangeMiddle}
                  $isFirst={index === 0}
                  $isLast={index === depositOptions.row2.length - 1}
                  $isTopRow={false}
                  onClick={() => handleDepositSelect(option)}
                >
                  <Typography
                    variant="subtitle"
                    style={{
                      color:
                        isFirstSelected || isSecondSelected
                          ? "#FFFFFF"
                          : isRangeMiddle
                          ? "#564200"
                          : "#161616",
                    }}
                  >
                    {option}
                  </Typography>
                </S.NumberButton>
              );
            })}
          </S.NumberRow>
        </S.NumberGrid>

        <S.CounterRow>
          <Counter
            value={depositMinValue}
            onChange={setDepositMinValue}
            variant={depositMinValue > 0 ? "filled" : "default"}
            min={0}
            max={9999}
            placeholder="최소"
            width="100%"
          />

          <Typography variant="title" color="black">
            ~
          </Typography>
          <Counter
            value={depositMaxValue}
            onChange={setDepositMaxValue}
            variant={depositMaxValue > 0 ? "filled" : "default"}
            min={0}
            max={9999}
            placeholder="최대"
            width="100%"
          />
        </S.CounterRow>
      </S.Section>

      {/* 월세 섹션 - 월세일 때만 표시 */}
      {contractType === "wolse" && (
        <S.Section>
          <S.SectionHeader>
            <Typography variant="subtitle" color="black">
              월세
            </Typography>
            <S.DescriptionRow>
              <Typography variant="body2" color="black">
                매달 내는 집세
              </Typography>
              <Typography variant="body2" style={{ color: "var(--gray1)" }}>
                (만원)
              </Typography>
            </S.DescriptionRow>
          </S.SectionHeader>

          <S.NumberGrid>
            <S.NumberRow>
              {monthlyOptions.row1.map((option, index) => {
                const isFirstSelected = selectedMonthlyFirst === option;
                const isSecondSelected = selectedMonthlySecond === option;
                const allOptions = [
                  ...monthlyOptions.row1,
                  ...monthlyOptions.row2,
                ];
                const optionIndex = allOptions.indexOf(option);
                const firstIndex = selectedMonthlyFirst
                  ? allOptions.indexOf(selectedMonthlyFirst)
                  : -1;
                const secondIndex = selectedMonthlySecond
                  ? allOptions.indexOf(selectedMonthlySecond)
                  : -1;
                const isInRange =
                  firstIndex !== -1 &&
                  secondIndex !== -1 &&
                  optionIndex >= Math.min(firstIndex, secondIndex) &&
                  optionIndex <= Math.max(firstIndex, secondIndex);
                const isRangeMiddle =
                  isInRange && !isFirstSelected && !isSecondSelected;

                return (
                  <S.NumberButton
                    key={option}
                    $selected={isFirstSelected}
                    $selectedSecond={isSecondSelected}
                    $isInRange={isRangeMiddle}
                    $isFirst={index === 0}
                    $isLast={index === monthlyOptions.row1.length - 1}
                    $isTopRow={true}
                    onClick={() => handleMonthlySelect(option)}
                  >
                    <Typography
                      variant="subtitle"
                      style={{
                        color:
                          isFirstSelected || isSecondSelected
                            ? "#FFFFFF"
                            : isRangeMiddle
                            ? "#564200"
                            : "#161616",
                      }}
                    >
                      {option}
                    </Typography>
                  </S.NumberButton>
                );
              })}
            </S.NumberRow>
            <S.NumberRow>
              {monthlyOptions.row2.map((option, index) => {
                const isFirstSelected = selectedMonthlyFirst === option;
                const isSecondSelected = selectedMonthlySecond === option;
                const allOptions = [
                  ...monthlyOptions.row1,
                  ...monthlyOptions.row2,
                ];
                const optionIndex = allOptions.indexOf(option);
                const firstIndex = selectedMonthlyFirst
                  ? allOptions.indexOf(selectedMonthlyFirst)
                  : -1;
                const secondIndex = selectedMonthlySecond
                  ? allOptions.indexOf(selectedMonthlySecond)
                  : -1;
                const isInRange =
                  firstIndex !== -1 &&
                  secondIndex !== -1 &&
                  optionIndex >= Math.min(firstIndex, secondIndex) &&
                  optionIndex <= Math.max(firstIndex, secondIndex);
                const isRangeMiddle =
                  isInRange && !isFirstSelected && !isSecondSelected;

                return (
                  <S.NumberButton
                    key={option}
                    $selected={isFirstSelected}
                    $selectedSecond={isSecondSelected}
                    $isInRange={isRangeMiddle}
                    $isFirst={index === 0}
                    $isLast={index === monthlyOptions.row2.length - 1}
                    $isTopRow={false}
                    onClick={() => handleMonthlySelect(option)}
                  >
                    <Typography
                      variant="subtitle"
                      style={{
                        color:
                          isFirstSelected || isSecondSelected
                            ? "#FFFFFF"
                            : isRangeMiddle
                            ? "#564200"
                            : "#161616",
                      }}
                    >
                      {option}
                    </Typography>
                  </S.NumberButton>
                );
              })}
            </S.NumberRow>
          </S.NumberGrid>

          <S.CounterRow>
            <Counter
              value={monthlyMinValue}
              onChange={setMonthlyMinValue}
              variant={monthlyMinValue > 0 ? "filled" : "default"}
              min={0}
              max={999}
              placeholder="최소"
              width="100%"
            />
            <Typography variant="title" color="black">
              ~
            </Typography>
            <Counter
              value={monthlyMaxValue}
              onChange={setMonthlyMaxValue}
              variant={monthlyMaxValue > 0 ? "filled" : "default"}
              min={0}
              max={999}
              placeholder="최대"
              width="100%"
            />
          </S.CounterRow>
        </S.Section>
      )}

      {/* 평수 섹션 */}
      <S.Section>
        <S.SectionHeader>
          <S.DescriptionRow>
            <Typography variant="subtitle" color="black">
              면적
            </Typography>
            <Typography variant="body2" style={{ color: "var(--gray1)" }}>
              (평)
            </Typography>
          </S.DescriptionRow>
        </S.SectionHeader>

        <S.NumberGrid>
          <S.NumberRow>
            {areaOptions.row1.map((option, index) => {
              const isFirstSelected = selectedAreaFirst === option;
              const isSecondSelected = selectedAreaSecond === option;
              const allOptions = [...areaOptions.row1, ...areaOptions.row2];
              const optionIndex = allOptions.indexOf(option);
              const firstIndex = selectedAreaFirst
                ? allOptions.indexOf(selectedAreaFirst)
                : -1;
              const secondIndex = selectedAreaSecond
                ? allOptions.indexOf(selectedAreaSecond)
                : -1;
              const isInRange =
                firstIndex !== -1 &&
                secondIndex !== -1 &&
                optionIndex >= Math.min(firstIndex, secondIndex) &&
                optionIndex <= Math.max(firstIndex, secondIndex);
              const isRangeMiddle =
                isInRange && !isFirstSelected && !isSecondSelected;

              return (
                <S.NumberButton
                  key={option}
                  $selected={isFirstSelected}
                  $selectedSecond={isSecondSelected}
                  $isInRange={isRangeMiddle}
                  $isFirst={index === 0}
                  $isLast={index === areaOptions.row1.length - 1}
                  $isTopRow={true}
                  onClick={() => handleAreaSelect(option)}
                >
                  <Typography
                    variant="subtitle"
                    style={{
                      color:
                        isFirstSelected || isSecondSelected
                          ? "#FFFFFF"
                          : isRangeMiddle
                          ? "#564200"
                          : "#161616",
                    }}
                  >
                    {option}
                  </Typography>
                </S.NumberButton>
              );
            })}
          </S.NumberRow>
          <S.NumberRow>
            {areaOptions.row2.map((option, index) => {
              const isFirstSelected = selectedAreaFirst === option;
              const isSecondSelected = selectedAreaSecond === option;
              const allOptions = [...areaOptions.row1, ...areaOptions.row2];
              const optionIndex = allOptions.indexOf(option);
              const firstIndex = selectedAreaFirst
                ? allOptions.indexOf(selectedAreaFirst)
                : -1;
              const secondIndex = selectedAreaSecond
                ? allOptions.indexOf(selectedAreaSecond)
                : -1;
              const isInRange =
                firstIndex !== -1 &&
                secondIndex !== -1 &&
                optionIndex >= Math.min(firstIndex, secondIndex) &&
                optionIndex <= Math.max(firstIndex, secondIndex);
              const isRangeMiddle =
                isInRange && !isFirstSelected && !isSecondSelected;

              return (
                <S.NumberButton
                  key={option}
                  $selected={isFirstSelected}
                  $selectedSecond={isSecondSelected}
                  $isInRange={isRangeMiddle}
                  $isFirst={index === 0}
                  $isLast={index === areaOptions.row2.length - 1}
                  $isTopRow={false}
                  onClick={() => handleAreaSelect(option)}
                >
                  <Typography
                    variant="subtitle"
                    style={{
                      color:
                        isFirstSelected || isSecondSelected
                          ? "#FFFFFF"
                          : isRangeMiddle
                          ? "#564200"
                          : "#161616",
                    }}
                  >
                    {option}
                  </Typography>
                </S.NumberButton>
              );
            })}
          </S.NumberRow>
        </S.NumberGrid>

        <S.CounterRow>
          <Counter
            value={areaMinValue}
            onChange={setAreaMinValue}
            variant={areaMinValue > 0 ? "filled" : "default"}
            min={0}
            max={999}
            placeholder="최소"
            width="100%"
          />
          <Typography variant="title" color="black">
            ~
          </Typography>
          <Counter
            value={areaMaxValue}
            onChange={setAreaMaxValue}
            variant={areaMaxValue > 0 ? "filled" : "default"}
            min={0}
            max={999}
            placeholder="최대"
            width="100%"
          />
        </S.CounterRow>
      </S.Section>

      {/* 다음 버튼 */}
      <S.NextButtonWrapper>
        <Button
          variant="dark"
          width="100%"
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          다음
        </Button>
      </S.NextButtonWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 375px;
    min-height: 100vh;
    background-color: var(--bg);
    margin: 0 auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `,

  Header: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0;
    padding: 0;
    position: relative;
  `,

  BackButton: styled.button`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 6px 9px;
  `,

  Tag: styled.div`
    position: absolute;
    left: 48px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 12px;
    border-radius: 32px;
    background-color: #fff3cd;
    font-family: GangwonEduAll, sans-serif;
    font-weight: 400;
    font-size: 17px;
    line-height: 130%;
    color: #564200;
  `,

  Section: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  SectionHeader: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,

  DescriptionRow: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  NumberGrid: styled.div`
    display: flex;
    flex-direction: column;
    gap: -1px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--line);
  `,

  NumberRow: styled.div`
    display: flex;
    gap: -1px;
  `,

  NumberButton: styled.button<{
    $selected: boolean;
    $selectedSecond: boolean;
    $isInRange: boolean;
    $isFirst: boolean;
    $isLast: boolean;
    $isTopRow: boolean;
  }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border: 1px solid var(--line);
    border-right: ${(props) =>
      props.$isLast ? "1px solid var(--line)" : "none"};
    background-color: ${(props) => {
      if (props.$selected) return "#F4BB00"; // 첫 번째 선택: 노란색
      if (props.$selectedSecond) return "#F4BB00"; // 두 번째 선택: 노란색
      if (props.$isInRange) return "#FFF3CD"; // 범위 내: 연한 노란색
      return "var(--white)";
    }};
    border-radius: ${(props) => {
      if (props.$isTopRow) {
        if (props.$isFirst) return "8px 0 0 0";
        if (props.$isLast) return "0 8px 0 0";
      } else {
        if (props.$isFirst) return "0 0 0 8px";
        if (props.$isLast) return "0 0 8px 0";
      }
      return "0";
    }};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: ${(props) => {
        if (props.$selected || props.$selectedSecond) return "#F4BB00";
        if (props.$isInRange) return "#FFF3CD";
        return "#f9f9f9";
      }};
    }

    ${(props) =>
      (props.$selected || props.$selectedSecond || props.$isInRange) &&
      `
      border-color: ${
        props.$selected || props.$selectedSecond ? "#F4BB00" : "#FFF3CD"
      };
      border-width: 1px;
      z-index: 1;
    `}
  `,

  CounterRow: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0;

    > div {
      flex: 1;
      min-width: 0;
    }

    > span {
      flex-shrink: 0;
    }
  `,

  NextButtonWrapper: styled.div`
    margin-top: auto;
    display: flex;
    justify-content: center;
    width: 100%;
  `,

  LoadingWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  `,
};

export default function RangeSelectPage() {
  return (
    <Suspense fallback={
      <S.Container>
        <S.LoadingWrapper>
          <Typography variant="title" color="black">
            로딩 중...
          </Typography>
        </S.LoadingWrapper>
      </S.Container>
    }>
      <RangeSelectPageContent />
    </Suspense>
  );
}
