import { createGlobalStyle } from "styled-components";
import Lato400 from "../../assets/fonts/Lato-Regular.ttf";
import Lato800 from "../../assets/fonts/Lato-Bold.ttf";

export const GlobalStyles = createGlobalStyle`


    @font-face {
      font-family: Lato;
      src: url(${Lato400});
    }
    @font-face {
      font-family: Lato800;
      src: url(${Lato800});
    }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
  }
`;
