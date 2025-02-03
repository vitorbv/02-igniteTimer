import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";

import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
// import { ButtonContainer } from "./components/Button.styles";


export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary"/>
      <Button variant="secondary"/>


      <GlobalStyle />
    </ThemeProvider>
  )
}


