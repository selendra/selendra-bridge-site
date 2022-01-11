import styled, { keyframes } from 'styled-components';

export default function Loading () {
  return (
    <Wrapper>
      <span></span>
      <span></span>
      <span></span>
    </Wrapper>
  );
}

const flashing = keyframes`
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`;
const Wrapper = styled.div`
  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    animation: ${flashing} 1.4s infinite linear;
    margin: 0 4px;
    display: inline-block;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
