"use client";

import ReduxProvider from "../base/reduxProvider";
import { ThemeProvider } from "../base/ThemeProvider";

type Props = {
  children: React.ReactNode;
};

function MainProvider({ children }: Props) {
  return (
    <ReduxProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default MainProvider;
