import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export const Context = createContext();
export const ContextProvider = ({children}) => {
  const [account, setAccount] = useState('');

  async function SwitchEthChain() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
      })
    } catch(error) {
      console.log(error);
    }
  }

  async function ConnectWallet() {
    if(window.ethereum) {
      // SwitchEthChain();
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccount(accounts[0]);
        });
    } else {
      toast.error('Metamask not Detected!');
    }
  }

  return (
    <Context.Provider
      value={{
        account,
        ConnectWallet
      }}
    >{children}</Context.Provider>
  )
}