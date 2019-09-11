const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

const testnet = 'https://ropsten.infura.io/v3/6156d5a31ef44b66899b1b88f7f26d63';

const privateKey = '8084234477DFEDECA9F6814997B009E1B0364FF85CAE59B596CAFB7E953A6F06';

const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

// Compile the source code
const input = fs.readFileSync('contract.sol');

console.log(input.toString())

const output = solc.compile(input.toString(), 1);


console.log(output);
process.exit(0);

const bytecode = output.contracts['Token'].bytecode;
const abi = JSON.parse(output.contracts['Token'].interface);

// Contract object
const contract = web3.eth.contract(abi);

// Get contract data
const contractData = contract.new.getData({
  data: '0x' + bytecode
});

const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.toHex(gasPrice);
const gasLimitHex = web3.toHex(300000);

const nonce = web3.eth.getTransactionCount(web3.eth.coinbase);
const nonceHex = web3.toHex(nonce);

const rawTx = {
  nonce: nonceHex,
  gasPrice: gasPriceHex,
  gasLimit: gasLimitHex,
  data: contractData,
  from: web3.eth.coinbase
};

const tx = new Tx(rawTx);
tx.sign(privateKey);
const serializedTx = tx.serialize();

function waitForTransactionReceipt(hash) {
  console.log('waiting for contract to be mined');
  const receipt = web3.eth.getTransactionReceipt(hash);
  // If no receipt, try again in 1s
  if (receipt == null) {
    setTimeout(() => {
      waitForTransactionReceipt(hash);
    }, 1000);
  } else {
    // The transaction was mined, we can retrieve the contract address
    console.log('contract address: ' + receipt.contractAddress);
    //testContract(receipt.contractAddress);
  }
}

web3.eth.sendRawTransaction(serializedTx.toString('hex'), (err, hash) => {
  if (err) { console.log(err); return; }

  // Log the tx, you can explore status manually with eth.getTransaction()
  console.log('contract creation tx: ' + hash);

  // Wait for the transaction to be mined
  waitForTransactionReceipt(hash);
});

