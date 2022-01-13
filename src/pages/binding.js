import { useContext, useState } from 'react';
import { ethers } from 'ethers';
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import toast from 'react-hot-toast';
import Select from '../components/select';
// import Input from '../components/input';
import Button from '../components/button';
import { Card, Label } from '../styles/globalStyle';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { Context } from '../context/context';

export default function Binding () {
  const { substrateAccount, ConnectSubstrate } = useContext(Context);
  // const [json, setJson] = useState();
  // const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [addressSinger, setAddressSigner] = useState('');

  const selendraTypes = {
    EvmAddress: 'H160',
    EthereumTxHash: 'H256',
    TokenId: 'U256',
    Address: 'MultiAddress',
    LookupSource: 'MultiAddress'
  };

  async function handleBinding () {
    try {
      setLoading(true);
      const wsProvider = new WsProvider('wss://rpc1-testnet.selendra.org');
      const api = await ApiPromise.create({ provider: wsProvider, types: selendraTypes });

      // const pair = await keyring.restoreAccount(json, password);
      // pair.decodePkcs8(password);
      const publicKey = keyring.decodeAddress(addressSinger);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();

      const signer = provider.getSigner(accounts[0]);
      const signature = await signer.signMessage(`Selendra evm:${ethers.utils.hexlify(publicKey).slice(2)}`);

      // const nonce = await api.rpc.system.accountNextIndex(addressSinger);

      // finds an injector for an address
      const injector = await web3FromAddress(addressSinger);

      await api.tx.evmAccounts
        .claimAccount(accounts[0], ethers.utils.arrayify(signature))
        .signAndSend(addressSinger, { signer: injector.signer }, ({ status }) => {
          console.log(status);
          if (status.isFinalized) {
            toast.success(`${(addressSinger).slice(0, 5)}... has bound with EVM address: ${accounts[0].slice(0, 5)}...`);
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function onChangeHandler (val) {
    setAddressSigner(val.value);
  }

  return (
    <Card>
      {substrateAccount.length
        ? <div>
            <Label>Select Substrate Address</Label>
            <Select options={substrateAccount} onChange={onChangeHandler} />
          </div>
        : <Button onClick={ConnectSubstrate}>Connect Substrate Wallet</Button>
      }
      <Button loading={loading} onClick={handleBinding}>Bind Account</Button>
    </Card>
  );
}
