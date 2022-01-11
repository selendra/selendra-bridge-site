import { useState } from 'react';
import { ethers } from 'ethers';
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import toast from 'react-hot-toast';
import Input from '../components/input';
import Button from '../components/button';
import { Card, Label } from '../styles/globalStyle';

export default function Binding () {
  const [json, setJson] = useState();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

  async function handleBinding () {
    try {
      setLoading(true);
      const wsProvider = new WsProvider('wss://rpc1-testnet.selendra.org');
      const api = await ApiPromise.create({ provider: wsProvider, types: selendraTypes });

      const pair = await keyring.restoreAccount(json, password);
      pair.decodePkcs8(password);
      // console.log(pair)

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      // console.log(accounts);

      const signer = provider.getSigner(accounts[0]);
      const signature = await signer.signMessage(`Selendra evm:${ethers.utils.hexlify(pair.publicKey).slice(2)}`);

      const nonce = await api.rpc.system.accountNextIndex(json.address);

      await api.tx.evmAccounts
        .claimAccount(accounts[0], ethers.utils.arrayify(signature))
        .signAndSend(pair, {
          nonce
        }, ({ events = [], status }) => {
          if (status.isFinalized) {
            toast.success(`${(pair.address).slice(0, 5)}... has bound with EVM address: ${accounts[0].slice(0, 5)}...`);
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <Label>Upload JSON</Label>
      <Input type='file' onChange={changeHandler} />
      <Label>Password</Label>
      <Input value={password} type='password' onChange={e => setPassword(e.target.value)} />
      <Button loading={loading} onClick={handleBinding}>Bind Account</Button>
    </Card>
  );
};
