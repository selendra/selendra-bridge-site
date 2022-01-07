import { useState } from 'react'
import { ApiPromise, WsProvider } from "@polkadot/api";
import keyring from '@polkadot/ui-keyring';
import { u8aToHex } from '@polkadot/util'
import { ethers } from 'ethers';
import abi from '../constant/abi.json';
import { decodeAddress } from '@polkadot/util-crypto';

export default function Transfer() {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const contractAddress = '0xe8f9290AC56f4045F070F0306f0dAfba57e2280a';

  const getHex = (address) => {
    const publicKey = decodeAddress(address);
    const hexPublicKey = u8aToHex(publicKey);
    return hexPublicKey;
  } 
  
  const handleTransfer = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    let signer = provider.getSigner(accounts[0])

    const contract = new ethers.Contract(
      contractAddress,
      abi.abi,
      signer
    );

    const recipient = getHex(address);
    const transferAmount = ethers.utils.parseUnits(amount, 18);

    const data = '0x' +
      ethers.utils.hexZeroPad(ethers.BigNumber.from(transferAmount).toHexString(), 32).substr(2) +    // Deposit Amount        (32 bytes)
      ethers.utils.hexZeroPad(ethers.utils.hexlify((recipient.length - 2)/2), 32).substr(2) +    // len(recipientAddress) (32 bytes)
      recipient.substr(2);

    await contract.deposit(
      1, 
      "0x0000000000000000000000372a410b50DA68144b8666Fa351FD38DFb0E1C3703",
      data
    );
    console.log("balance have been transfer....");
  }

  return (
    <div className="max-w-md m-auto mt-12 p-12 blue-glassmorphism flex flex-col">
      <p className="font-semibold">Address</p>
      <input className="h-10 my-2 p-2 rounded-md outline-none border-none bg-transparent white-glassmorphism" value={address} onChange={e => setAddress(e.target.value)} />
      <p className="font-semibold">Amount</p>
      <input className="h-10 my-2 p-2 rounded-md outline-none border-none bg-transparent white-glassmorphism" value={amount} onChange={e => setAmount(e.target.value)} />
      <button className="mt-4 p-2 border-2 border-purple hover:bg-pink rounded-full cursor-pointer transition-all" onClick={handleTransfer}>Transfer</button>
    </div>
  )
}
