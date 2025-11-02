"use client";
import styled from "styled-components";
import { Grid } from "./_components/Grid";

const Text = styled.span`
  color: var(--sub_9);
  font-size: 20px;
`;

const MobileWrapper = styled.div`
  max-width: 375px;
  width: 100%;
  margin: 0 auto;
`;

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:white">
      <MobileWrapper>
        <main className="flex min-h-screen w-full flex-col py-32 bg-white dark:white">
          <Grid.Container>
            <Grid.Item xs={4} md={4} lg={3} xl={3}>
              콘텐츠 1
            </Grid.Item>
            <Grid.Item xs={4} md={4} lg={3} xl={3}>
              콘텐츠 2
            </Grid.Item>
          </Grid.Container>
        </main>
      </MobileWrapper>
    </div>
  );
}
