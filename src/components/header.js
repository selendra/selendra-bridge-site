import styled from 'styled-components';
import { GlobalContainer } from '../styles/globalStyle';
import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Context } from '../context/context';
import Sidebar from './sidebar';

export default function Header () {
  const location = useLocation();
  const { ConnectWallet, account } = useContext(Context);

  useEffect(() => {
    ConnectWallet();
  }, [ConnectWallet]);

  return (
    <GlobalContainer>
      <Wrapper>
        <Logo src={logo} alt='' />
        <Navigation>
          <Nav active={(location.pathname === '/').toString()} to='/'>Account Binding</Nav>
          <Nav active={(location.pathname === '/transfer-evm').toString()} to='/transfer-evm'>Transfer EVM</Nav>
          <Nav active={(location.pathname === '/transfer-native').toString()} to='/transfer-native'>Transfer Native</Nav>
          <Button onClick={ConnectWallet}>{account ? `0x...${account.slice(-6)}` : 'Connect Metamask'}</Button>
        </Navigation>
        <Sidebar />
      </Wrapper>
    </GlobalContainer>
  );
}

const Wrapper = styled.header`
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.img`
  width: auto;
  height: 2.75rem;
`;
const Navigation = styled.div`
  max-width: 40rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 15px;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Nav = styled(Link)`
  color: ${props => props.active === 'true' ? '#ED1576' : '#FFF'};
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: .6s all;
  :hover {
    color: #ED1576;
  }
`;
const Button = styled.button`
  width: 13rem;
  height: 2.75rem;
  color: #FFF;
  background: #ED1576;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: .6s all;
  :hover {
    opacity: 0.8;
  }
`;
