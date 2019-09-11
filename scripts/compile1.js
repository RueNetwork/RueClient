const fs = require("fs");
const solc = require('solc')
let Web3 = require('web3');

const url = 'http://ropsten.infura.io/v3/0c629267075740938abb6d8a80a2834c'

const web3 = new Web3(new Web3.providers.HttpProvider(url));

console.log(web3.eth.gasPrice);

return

var input = {
  'Context.sol': fs.readFileSync('Context.sol', 'utf8'),
  'IERC20.sol': fs.readFileSync('IERC20.sol', 'utf8'),
  'SafeMath.sol': fs.readFileSync('SafeMath.sol', 'utf8'),
  'contract.sol': fs.readFileSync('contract.sol', 'utf8'),
};

let output = solc.compile({sources: input}, 1);

// console.log(JSON.stringify(output.contracts))


// console.log(JSON.stringify(output.contracts,1,1))

// console.log(compiledContract);


const bytecode = output.contracts['contract.sol:ERC20'].bytecode;
const abi = JSON.parse(output.contracts['contract.sol:ERC20'].interface);




// Contract object
const contract = web3.eth.contract(abi);

// const contract = new web3.eth.Contract(abi);

console.log(contract);

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


//
// let abi = compiledContract.contracts['LMS.sol:LMS'].interface;
// let bytecode = '0x'+compiledContract.contracts['LMS.sol:LMS'].bytecode;
// let gasEstimate = web3.eth.estimateGas({data: bytecode});
// let LMS = web3.eth.contract(JSON.parse(abi));
