import { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Menu } from '../assets/menu.svg';
import logo from '../assets/logo.png';
import { Context } from '../context/context';

export default function Sidebar () {
  const location = useLocation();
  const { ConnectWallet, account } = useContext(Context);
  const [drawer, setDrawer] = useState(false);

  const handleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <Wrapper>
      <MenuStyled onClick={handleDrawer} />
      {/* {drawer && <Background onClick={handleDrawer} />} */}
      <MenuItems open={drawer}>
        <Logo src={logo} alt='' />
        <Nav active={(location.pathname === '/').toString()} to='/'>Account Binding</Nav>
        <Nav active={(location.pathname === '/transfer-evm').toString()} to='/transfer-evm'>Transfer EVM</Nav>
        <Nav active={(location.pathname === '/transfer-native').toString()} to='/transfer-native'>Transfer Native</Nav>
        <Button onClick={ConnectWallet}>{account ? `0x...${account.slice(-6)}` : 'Connect Metamask'}</Button>
      </MenuItems>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const MenuStyled = styled(Menu)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const Background = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .4);
  overflow: hidden;
  /* z-index: 8; */
`;
const MenuItems = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: rgb(39, 51, 89, 1); 
  backdrop-filter: blur(25px);
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
`;
const Logo = styled.img`
  width: 10rem;
  height: 4rem;
  margin-bottom: 1.5rem;
`;
const Nav = styled(Link)`
  color: ${props => props.active === 'true' ? '#ED1576' : '#FFF'};
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: .6s all;
  margin-bottom: 1rem;
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
