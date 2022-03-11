import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/header';
import Binding from './pages/binding';
import TransferEvm from './pages/transfer-evm';
import TransferNative from './pages/transfer-native';

export default function App () {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/transfer-evm' />} />
          <Route path='/transfer-evm' element={<TransferEvm />} />
          <Route path='/transfer-native' element={<TransferNative />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-image: 
    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
    radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
`;
