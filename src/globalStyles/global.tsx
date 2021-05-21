import { createGlobalStyle } from "styled-components";

export default createGlobalStyle` 

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Lato, sans-serif, Montserrat, PingFang SC, -apple-system;
    font-size: 82.5%; /*1rem = 10px*/
}

body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    font-size: 1.4rem;
}

@font-face {
    font-family: 'Lato';
    src: local('Lato'), url('./assets/fonts/NotoSansJP.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
}


.monospace {
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
}

*[role]:focus {
    outline: none;
}

.container {
    width: auto;
    margin: 0 120px;
}

@media (max-width: 1440px) {
    .container {
        width: auto;
        margin: 0 100px;
    }
}

@media (max-width: 1200px) {
    .container {
        width: auto;
        margin: 0 45px;
    }
}

@media (max-width: 750px) {
    .container {
        width: auto;
        margin: 0 18px;
    }
}

a {
    text-decoration: none;
    font-size: inherit;
    font-weight: 500;
    color: inherit;
}

ul,li {
    list-style: none;
    margin: 0;
    padding: 0;
  } 
  button {
    cursor: pointer;
    *{
      pointer-events:none;
    }
  }
`;