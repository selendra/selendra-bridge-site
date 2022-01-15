import styled, { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #FFF;
    background: #0F0E13;
  }
`;

export const GlobalContainer = styled.div`
  max-width: 74rem;
  margin: 0 auto;
  @media screen and (max-width: 74rem) {
    padding: 0 10px;
  }
`;
export const Card = styled.div`
  max-width: 28rem;
  margin: 6rem auto;
  background: rgb(39, 51, 89, 0.4);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 20px;
  @media screen and (max-width: 28rem) {
    margin: 6rem 10px;
  }
`;
export const Label = styled.p`
  font-weight: 600;
  margin: 6px 0;
`;
