const API = require("@polkadot/api")
const Web3 = require("web3")


const selendraTypes = {
    "EvmAddress": "H160",
    "EthereumTxHash": "H256",
    "TokenId": "U256",
    "Address": "MultiAddress",
    "LookupSource": "MultiAddress"
};

const PUB_KEY = "<evm public key>"
const PRIV_KEY = "<evm private key>"
const SEED = "<seed>"

async function run() {
    const web3 = new Web3("https://rpc.testnet.selendra.org")
    const wsProvider = new API.WsProvider('wss://rpc1-testnet.selendra.org');

    const api = await API.ApiPromise.create({
        provider: wsProvider,
        types: selendraTypes
    });

    const keyring = new API.Keyring({ type: 'sr25519' });
    const account = keyring.addFromUri(SEED);
    let nonce = await api.rpc.system.accountNextIndex(account.address);
    web3.eth.accounts.wallet.add(PRIV_KEY);
    let signature = await web3.eth.sign(`Selendra evm:${web3.utils.bytesToHex(account.publicKey).slice(2)}`, PUB_KEY);

    await api.tx.evmAccounts
        .claimAccount(PUB_KEY, web3.utils.hexToBytes(signature))
        .signAndSend(account, {
            nonce,
        }, ({ events = [], status }) => {
            if (status.isFinalized) {
                console.log(`${account.address} has bound with EVM address: ${PUB_KEY}`)
                process.exit(0)
            }
        });
}

run()