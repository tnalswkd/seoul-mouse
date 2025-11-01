"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { PaletteMode, theme } from "../../_styles/theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";

import "@/app/_styles/theme.css";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Pretendard','Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
`;

const ThemeContext = createContext({
  handleToggleTheme: (theme: string) => {
    //
  },
  mode: "",
});

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState("light");

  const handleToggleTheme: any = (theme: PaletteMode) => {
    setMode(() => theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        handleToggleTheme,
        mode,
      }}
    >
      <ThemeProvider theme={theme(mode as PaletteMode)}>
        <Reset />
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContextProvider;
