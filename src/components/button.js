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
  transition: .6s all;
  :hover {
    background-color: #ED1576;
  }
`;
