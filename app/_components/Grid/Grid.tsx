import { breakpoints } from "../../_styles/theme";
import styled from "styled-components";

interface GridContainerProps {
  fullWidth?: boolean;
}

interface GridItemProps {
  xs?: number; // 모바일(375px) 기준 컬럼 수 (1-4)
  md?: number; // 768px 이상 컬럼 수 (1-12)
  lg?: number; // 1024px 이상 컬럼 수 (1-12)
  xl?: number; // 1920px 이상 컬럼 수 (1-12)
  align?: "start" | "center" | "end";
}

// Grid Container: 375px 기준 4컬럼, md 이상 12컬럼
const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: ${breakpoints.md}px) {
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
    padding: ${({ fullWidth }) => (fullWidth ? "0" : "0 16px")};
  }
`;

GridContainer.displayName = "Grid.Container";

// Grid Item: 각 브레이크포인트별 컬럼 수 지정
const GridItem = styled.div<GridItemProps>`
  grid-column: ${({ xs }) => `span ${xs ?? 4}`};

  @media (min-width: ${breakpoints.md}px) {
    grid-column: ${({ md }) => `span ${md ?? 12}`};
  }

  @media (min-width: ${breakpoints.lg}px) {
    grid-column: ${({ lg, md }) => `span ${lg ?? md ?? 12}`};
  }

  @media (min-width: ${breakpoints.xl}px) {
    grid-column: ${({ xl, lg, md }) => `span ${xl ?? lg ?? md ?? 12}`};
  }

  ${({ align }) => {
    if (align === "center") {
      return "margin: 0 auto;";
    }
    if (align === "end") {
      return "margin-left: auto;";
    }
    return "";
  }}
`;

GridItem.displayName = "Grid.Item";

export { GridContainer as Container, GridItem as Item };
