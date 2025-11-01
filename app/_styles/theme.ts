import colorchip from "./colorchip";
import colorToken from "./colorToken";
import typography from "./typography";

type PaletteMode = "light" | "dark";

type IPaletteBreakpoints = {
  [x: string]: any;
  values: {
    md: 768;
    lg: 1024;
    xl: 1920;
  };
};

const breakpoints: any = {
  md: 768,
  lg: 1024,
  xl: 1920,
} as const;

const theme = (mode: PaletteMode) => {
  const token = {
    ...colorchip,
    ...colorToken,
  };

  return {
    breakpoints: breakpoints,
    palette: {
      mode,
      ...token,
    },
    typography: typography,
    components: {},
  };
};

export { theme, breakpoints };
export type { PaletteMode, IPaletteBreakpoints };
