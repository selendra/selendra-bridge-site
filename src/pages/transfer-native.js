import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ApiPromise, WsProvider } from '@polkadot/api';
// import keyring from '@polkadot/ui-keyring';
import Input from '../components/input';
import Button from '../components/button';
import { Card, Label } from '../styles/globalStyle';
import toast from 'react-hot-toast';
import Select from '../components/select';
import { Context } from '../context/context';
import { web3FromAddress } from '@polkadot/extension-dapp';
import AddSEL from '../components/addSEL';

export default function TransferNative () {
  const { substrateAccount, ConnectSubstrate, SwitchNetworkToRopsten } = useContext(Context);
  const [addressSinger, setAddressSigner] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  // const [json, setJson] = useState();
  // const [password, setPassword] = useState('');

  useEffect(() => {
    SwitchNetworkToRopsten();
  }, [SwitchNetworkToRopsten]);

  // const changeHandler = (event) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setJson(JSON.parse(reader.result));
  //   };
  //   reader.readAsText(event.target.files[0]);
  // };

  const handleNativeTransfer = async () => {
    try {
      setLoading(true);
      const chainId = 3;
      const provider = new WsProvider('wss://rpc1-testnet.selendra.org/');
      const api = await ApiPromise.create({ provider });

      // const pair = await keyring.restoreAccount(json, password);
      // pair.decodePkcs8(password);
      // console.log(pair.publicKey);

      // finds an injector for an address
      const injector = await web3FromAddress(addressSinger);

      const chainDecimals = api.registry.chainDecimals;
      const transferAmount = ethers.utils.parseUnits(amount, chainDecimals[0]);

      // console.log(transferAmount, recipient, amount, pair);
      // const nonce = await api.rpc.system.accountNextIndex(json.address);
      await api.tx.bridgeTransfer
        .transferNative(transferAmount, recipient, chainId)
        .signAndSend(addressSinger, { signer: injector.signer }, ({ status }) => {
          if (status.isFinalized) {
            toast.success('Transaction Completed!');
            setLoading(false);
          }
        });
      console.log('balance have been transfer....');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  async function onChangeHandler (val) {
    setAddressSigner(val.value);
  }

  return (
    <Card>
      {/* <Label>Upload JSON</Label>
      <Input type='file' onChange={changeHandler} />
      <Label>Password</Label>
      <Input type='password' value={password} onChange={e => setPassword(e.target.value)} /> */}
      <AddSEL />
      {substrateAccount.length
        ? <div>
            <Label>Transfer from Substrate address</Label>
            <Select options={substrateAccount} onChange={onChangeHandler} />
          </div>
        : <Button onClick={ConnectSubstrate}>Connect Substrate Wallet</Button>
      }
      <Label>Transfer to EVM address</Label>
      <Input value={recipient} onChange={e => setRecipient(e.target.value)} />
      <Label>Amount</Label>
      <Input value={amount} onChange={e => setAmount(e.target.value)} />
      <Button loading={loading} onClick={handleNativeTransfer}>Transfer</Button>
    </Card>
  );
}
