import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/context';
import logo from '../assets/logo.png';

export default function Header() {
  const { ConnectWallet, account } = useContext(Context);

  return (
    <header className='h-container h-24 p-4 flex justify-between items-center'>
      <img src={logo} alt='' className='w-26 h-11' />
      <div className='h-width text-sm font-bold flex justify-around items-center'>
        <Link to='/'>
          <p className='transition-all hover:text-pink'>Binding</p>
        </Link>
        <Link to='/transfer'>
          <p className='transition-all hover:text-pink'>Transfer EVM</p>
        </Link>
        <Link to='/transfer-native'>
          <p className='transition-all hover:text-pink'>Transfer Native</p>
        </Link>
        <button onClick={ConnectWallet} className="w-52 h-12 text-base font-bold bg-pink hover:opacity-80 transition-all rounded-xl shadow-lg cursor-pointer px-4 ml-2">{account ? `0x...${account.slice(-6)}` : 'Connect Wallet'}</button>
      </div>
    </header>
  )
}
