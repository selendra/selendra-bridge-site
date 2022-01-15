import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { Card, Label } from '../styles/globalStyle';
import { abi } from '../constant/abi.json';
import Input from '../components/input';
import Button from '../components/button';
import toast from 'react-hot-toast';
import { Context } from '../context/context';
import AddSEL from '../components/addSEL';

export default function TransferEvm () {
  const contractAddress = '0xe8f9290AC56f4045F070F0306f0dAfba57e2280a';
  const { SwitchNetworkToRopsten } = useContext(Context);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SwitchNetworkToRopsten();
  }, [SwitchNetworkToRopsten]);

  const getHex = (address) => {
    const publicKey = decodeAddress(address);
    const hexPublicKey = u8aToHex(publicKey);
    return hexPublicKey;
  };

  const handleTransfer = async () => {
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      const signer = provider.getSigner(accounts[0]);

      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );

      const recipient = getHex(address);
      const transferAmount = ethers.utils.parseUnits(amount, 18);

      const data = '0x' +
        ethers.utils.hexZeroPad(ethers.BigNumber.from(transferAmount).toHexString(), 32).substr(2) + // Deposit Amount (32 bytes)
        ethers.utils.hexZeroPad(ethers.utils.hexlify((recipient.length - 2) / 2), 32).substr(2) + // len(recipientAddress) (32 bytes)
        recipient.substr(2);

      const trx = await contract.deposit(
        1,
        '0x0000000000000000000000372a410b50DA68144b8666Fa351FD38DFb0E1C3703',
        data
      );
      await trx.wait();
      toast.success('Transaction Completed!');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <AddSEL />
      <Label>Transfer to address</Label>
      <Input value={address} onChange={e => setAddress(e.target.value)} />
      <Label>Amount</Label>
      <Input value={amount} onChange={e => setAmount(e.target.value)} />
      <Button loading={loading} onClick={handleTransfer}>Transfer</Button>
    </Card>
  );
}
