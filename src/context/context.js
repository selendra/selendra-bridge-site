import { createContext, useState } from 'react';
import {
  web3Accounts,
  web3Enable
} from '@polkadot/extension-dapp';
import toast from 'react-hot-toast';

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [substrateAccount, setSubstrateAccount] = useState([]);

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

  // function StrSlice (str) {
  //   return `${str.slice(0, 10)}+....+${str.slice(-10)}`;
  // }

  async function ConnectSubstrate () {
    const allInjected = await web3Enable('Selendra Bridge');

    const allAccounts = await web3Accounts();
    const reArray = allAccounts.map(i => {
      const newArr = {};
      newArr.label = (i.address);
      newArr.value = i.address;
      return newArr;
    });
    setSubstrateAccount(reArray);
    // console.log(reArray);
  }

  return (
    <Context.Provider
      value={{
        account,
        substrateAccount,
        ConnectWallet,
        ConnectSubstrate
      }}
    >{children}</Context.Provider>
  );
};
