import { useState } from "react";
import { ethers } from "ethers";
import { ApiPromise, WsProvider } from "@polkadot/api";
import toast from "react-hot-toast";
import keyring from '@polkadot/ui-keyring';

export default function Binding() {
  const [json, setJson] = useState();
  const [password, setPassword] = useState('');

  const selendraTypes = {
    "EvmAddress": "H160",
    "EthereumTxHash": "H256",
    "TokenId": "U256",
    "Address": "MultiAddress",
    "LookupSource": "MultiAddress"
  };

  const changeHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      setJson(JSON.parse(reader.result));
    };
    reader.readAsText(event.target.files[0]);
	};

  async function handleBinding() {
    const wsProvider = new WsProvider('wss://rpc1-testnet.selendra.org');
    const api = await ApiPromise.create({ provider: wsProvider, types: selendraTypes });
    
    const pair = await keyring.restoreAccount(json, password);
    pair.decodePkcs8(password);
    // console.log(pair)
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    // console.log(accounts);

    const signer = provider.getSigner(accounts[0]);
    let signature = await signer.signMessage(`Selendra evm:${ethers.utils.hexlify(pair.publicKey).slice(2)}`);

    let nonce = await api.rpc.system.accountNextIndex(json.address);

    await api.tx.evmAccounts
      .claimAccount(accounts[0], ethers.utils.arrayify(signature))
      .signAndSend(pair, {
        nonce,
      }, ({ events = [], status }) => {
        if (status.isFinalized) {
          toast.success(`${pair.address} has bound with EVM address: ${accounts[0]}`);
        }
      });
  }

  return (
    <div className='max-w-[74rem] m-auto'>
      <div className="max-w-md m-auto mt-12 p-12 blue-glassmorphism flex flex-col">
        <p className="font-semibold">Upload JSON</p>
        <input className="h-10 my-2 p-2 rounded-md outline-none border-none bg-transparent white-glassmorphism" aria-describedby="user_avatar_help" id="user_avatar" type="file" name='file' onChange={changeHandler} />
        <p className="font-semibold">Password</p>
        <input className="h-10 my-2 p-2 rounded-md outline-none border-none bg-transparent white-glassmorphism" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="mt-4 p-2 border-2 border-purple hover:bg-pink rounded-full cursor-pointer transition-all" onClick={handleBinding}>Bind Account</button>
      </div>
    </div>
  )
}
