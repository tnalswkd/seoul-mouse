"use client";
import styled from "styled-components";
import { Grid } from "./_components/Grid";
import { Button } from "./_components/Button";
import { Counter } from "./_components/Counter";
import { useState } from "react";
import { Card } from "./_components/Card";
import { Snackbar } from "./_components/Snackbar";

const Text = styled.span`
  color: var(--sub_9);
  font-size: 20px;
`;

const MobileWrapper = styled.div`
  max-width: 375px;
  width: 100%;
  margin: 0 auto;
`;

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

export default function Home() {
  const [count, setCount] = useState(100);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:white">
      <MobileWrapper>
        <main className="flex min-h-screen w-full flex-col py-32 bg-white dark:white">
          <ComponentWrapper>
            <Grid.Container>
              <Grid.Item xs={4} md={4} lg={3} xl={3}>
                콘텐츠 1
              </Grid.Item>
              <Grid.Item xs={4} md={4} lg={3} xl={3}>
                콘텐츠 2
              </Grid.Item>
            </Grid.Container>
            <Button
              variant="dark"
              subtext="지금까지 321명이 알아봤어요"
              width="100%"
            >
              부탁하쥐
            </Button>
            <Button
              variant="default"
              width="100%"
              onClick={() => setSnackbarOpen(true)}
            >
              스낵바 보기
            </Button>
            <Counter
              variant="default"
              value={count}
              onChange={setCount}
              min={0}
              max={999}
            />
            <Card
              title="자치구"
              description="구에 대한 간단 설명"
              numberTags={[1, 2, 3]}
              tags={["지하철역", "지하철역", "지하철역"]}
            />
            <Button variant="dark" width="100%">
              다음
            </Button>
          </ComponentWrapper>
        </main>
      </MobileWrapper>
      <Snackbar
        message="18평 이상은 '투룸+'으로 선택해야 해요."
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
}
