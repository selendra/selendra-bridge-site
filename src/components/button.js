import styled from 'styled-components';
import Loading from './loading';

export default function Button ({ children, loading, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      {loading ? <Loading /> : <span>{children}</span>}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  z-index: 1;
  position: relative;
  width: 100%;
  background: none;
  color: #FFF;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #ED1576;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  margin-top: 20px;
  padding: 12px 24px;
  span {
    z-index: 1;
    position: relative;
  }
  :before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 140px;
    border-radius: 8px;
    transform: translate3d(-50%,-50%,0) scale3d(0,0,0);
    transition: opacity .4s cubic-bezier(.19,1,.22,1),transform 1s cubic-bezier(.19,1,.22,1);
    opacity: 0;
    background-color: #ED1576;
  }
  :hover {
    :before {
      opacity: 1;
      transition-duration: .85s;
      transform: translate3d(-50%,-50%,0) scale3d(1.2,1.2,1.2);
    }
  }
`;
