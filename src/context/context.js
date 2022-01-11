import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [account, setAccount] = useState('');

  async function ConnectWallet () {
    console.log('Connecting to Wallet...');
    if (window.ethereum) {
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
  );
};
