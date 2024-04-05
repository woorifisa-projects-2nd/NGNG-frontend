"use client";
import { ThemeProvider } from "next-themes";

const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default ColorModeProvider;
