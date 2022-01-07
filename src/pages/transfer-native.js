import { useState } from "react";
import { ethers } from "ethers";
import { ApiPromise, WsProvider } from "@polkadot/api";
import keyring from '@polkadot/ui-keyring';

export default function TransferNative() {
  const [amount, setAmount] = useState('');
  const [json, setJson] = useState();
  const [password, setPassword] = useState('');
  const [recipient, setRecipient] = useState('');

  const changeHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      setJson(JSON.parse(reader.result));
    };
    reader.readAsText(event.target.files[0]);
	};
  
  const handleNativeTransfer = async() => {
    const chainId = 3;
    const provider = new WsProvider('wss://rpc1-testnet.selendra.org/');
    const api = await ApiPromise.create({ provider });

    const pair = await keyring.restoreAccount(json, password);
    pair.decodePkcs8(password);

    const transferAmount = ethers.utils.parseUnits(amount, api.registry.chainDecimals);

    const nonce = await api.rpc.system.accountNextIndex(json.address);
    await api.tx.bridgeTransfer
        .transferNative(transferAmount, recipient, chainId)
        .signAndSend(pair, { nonce });
    
    console.log("balance have been transfer....");
  }


  return (
    <div className="max-w-md m-auto mt-12 p-12 blue-glassmorphism flex flex-col">
      <p className="font-semibold">Upload JSON</p>
      <input className="h-10 my-2 p-2 rounded-md outline-none border-none bg-transparent white-glassmorphism" aria-describedby="user_avatar_help" id="user_avatar" type="file" name='file' onChange={changeHandler} />
      <p className="font-semibold">Password</p>
      <input className="h-10 my-2 p-2 rounded-md outline-none border-none bg-transparent white-glassmorphism" value={password} onChange={e => setPassword(e.target.value)} />
      <p className="font-semibold">Address</p>
      <input className="h-10 my-2 p-2 rounded-md outline-none border-none bg-transparent white-glassmorphism" value={recipient} onChange={e => setRecipient(e.target.value)} />
      <p className="font-semibold">Amount</p>
      <input className="h-10 my-2 p-2 rounded-md outline-none border-none bg-transparent white-glassmorphism" value={amount} onChange={e => setAmount(e.target.value)} />
      <button className="mt-4 p-2 border-2 border-purple hover:bg-pink rounded-full cursor-pointer transition-all" onClick={handleNativeTransfer}>Transfer</button>
    </div>
  )
}
