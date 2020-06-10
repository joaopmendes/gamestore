import { ThemeProvider } from 'styled-components';
import React from 'react';

const theme = {
  primary: "#ff4d23",
  secundary: "#ffefec",
};
export const StyledTheme = ({ children }) => (
  <>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);
