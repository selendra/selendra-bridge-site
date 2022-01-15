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

  async function SwitchNetworkToSEL () {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xDE' }] // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // console.log(error.code);
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0xDE',
            chainName: 'Selendra Testnet',
            rpcUrls: ['https://rpc.testnet.selendra.org'],
            iconUrls: 'https://user-images.githubusercontent.com/38589050/149439179-f287a574-b153-45e6-a96c-1a3c9adc36d0.png',
            nativeCurrency: {
              name: 'Selendra',
              symbol: 'SEL', // 2-6 characters long
              decimals: 18
            }
          }]
        });
      }
    }
  }

  async function SwitchNetworkToRopsten () {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x3' }] // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // console.log(error.code);
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x3',
            chainName: 'Ropsten Testnet',
            rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
            nativeCurrency: {
              name: 'Ropsten Testnet',
              symbol: 'ETH', // 2-6 characters long
              decimals: 18
            }
          }]
        });
      }
    }
  }

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
    try {
      const extension = await web3Enable('Selendra Bridge');
      if (extension.length === 0) {
        return toast.error('Polkadot extension not detected!');
      }
      const allAccounts = await web3Accounts();
      const reArray = allAccounts.map(i => {
        const newArr = {};
        newArr.label = (i.address);
        newArr.value = i.address;
        return newArr;
      });
      setSubstrateAccount(reArray);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Context.Provider
      value={{
        account,
        substrateAccount,
        ConnectWallet,
        ConnectSubstrate,
        SwitchNetworkToSEL,
        SwitchNetworkToRopsten
      }}
    >{children}</Context.Provider>
  );
};
