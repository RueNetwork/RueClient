const web3 = require('web3');

const contractAddress = '0x79fFCfec1cee6c1952385578E56E313b75Ffe0B1';  // use quotes!

// https://ropsten.etherscan.io/address/0x0764edccd0278ee60c421148b8bab812306d90d5

const testnet = 'https://ropsten.infura.io/v3/6156d5a31ef44b66899b1b88f7f26d63';

// const address = '0x0764eDcCD0278Ee60C421148B8baB812306D90D5';

// const address = '0x5A8082BB480979b9C0583aB8B1b34A279D6C2310';

const address = '0x0764eDcCD0278Ee60C421148B8baB812306D90D5';

const privateKeyValue = '8084234477DFEDECA9F6814997B009E1B0364FF85CAE59B596CAFB7E953A6F06';

const privateKey = new Buffer(privateKeyValue, 'hex');



// const acct = Account.privateKeyToAccount('private key')
// nonce = w3.eth.getTransactionCount(acct.address)



// const projectId = '6156d5a31ef44b66899b1b88f7f26d63';

//
// const projectSecret = 'ca44d7f5e4da4986ad1ad92ef2d292e1';

const web3 = new Web3(new Web3.providers.HttpProvider(testnet));


const abi = [contractAbi];
// contract abi doesn't have quotes an will be something like [{a lot of code}, {a lot of code}, … ];  REMEMBER to add ; or it won't work
export default new web3.eth.Contract(abi


const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/<API key>");
const web3 = new Web3(provider);
web3.eth.net.isListening()
  .then(() => console.log('web3 is connected'))
  .catch(e => console.log('Wow. Something went wrong'));
const abi=[{"constant":false,"inputs":[{"name":"_greeting","type":"string"}],"name":"greet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGreeting","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];
const contract_Address="0xcbe74e21b070a979b9d6426b11e876d4cb618daf";
const contract = new web3.eth.Contract(abi, contract_Address);
contract.methods.getGreeting().call().then(console.log);



const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/<API KEY>");
const web3 = new Web3(provider);

const account1 = '<your Acoount address>'; // Your account address 1
//const account2 = '' // Your account address 2
web3.eth.defaultAccount = account1;

const privateKey1 = Buffer.from('<your Private key>', 'hex');

const abi = [{"constant":false,"inputs":[{"name":"_greeting","type":"string"}],"name":"greet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGreeting","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];

const contract_Address = "0xcbe74e21b070a979b9d6426b11e876d4cb618daf";

const contract = new web3.eth.Contract(abi, contract_Address);

const myData = contract.methods.greet( "hello all devs").encodeABI();

web3.eth.getTransactionCount(account1, (err, txCount) => {
// Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       contract_Address,
    value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
    gasLimit: web3.utils.toHex(2100000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
    data: myData
  }
  // Sign the transaction
  const tx = new Tx(txObject);
  tx.sign(privateKey1);

  const serializedTx = tx.serialize();
  const raw = '0x' + serializedTx.toString('hex');

  // Broadcast the transaction
  const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
    console.log(tx)
  });
});