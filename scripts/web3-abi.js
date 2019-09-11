const fs = require("fs");
const solc = require('solc');
let Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

// https://ropsten.etherscan.io/address/0x0764edccd0278ee60c421148b8bab812306d90d5

const testnet = 'https://ropsten.infura.io/v3/6156d5a31ef44b66899b1b88f7f26d63';

const address = '0x0764eDcCD0278Ee60C421148B8baB812306D90D5';

const contractAddress = '0x461df611bb11d423eb41f31b9213dc6b36e91c43';

// 0x5A8082BB480979b9C0583aB8B1b34A279D6C2310

const privateKeyValue = '8084234477DFEDECA9F6814997B009E1B0364FF85CAE59B596CAFB7E953A6F06';

const privateKey = new Buffer(privateKeyValue, 'hex');

const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

const input = fs.readFileSync('contract3.sol');
const output = solc.compile(input.toString(), 1);

const abi = JSON.parse(output.contracts[':FucksToken'].interface);

console.log(abi);

const contract = new web3.eth.Contract(abi);

console.log(contract.methods);

let data = contract.methods.transfer(address, 1).encodeABI();

const bytecode = output.contracts[':FucksToken'].bytecode;

console.log(JSON.stringify(abi,1,1));

// for(const method of abi){
//   console.log(method);
// }

// return



// const contract = new web3.eth.Contract(abi);

const weiAmount = web3.utils.toWei('1', 'ether');

// let data = contract.methods.transfer(address, weiAmount).encodeABI();

async function main(){
  const gasPrice = await web3.eth.getGasPrice();

  const gasPriceHex = await web3.utils.toHex(gasPrice);

  const gasLimitHex = await web3.utils.toHex(7957355);

  const nonce = await web3.eth.getTransactionCount(address);

  const nonceHex = await web3.utils.toHex(nonce);

  const rawTx = {
    from: address,
    to: contractAddress,
    nonce: nonceHex,
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    data: data,
    chainId: web3.utils.toHex(3),
  };

  const tx = new Tx(rawTx, {'chain':'ropsten'});
  tx.sign(privateKey);
  const serializedTx = tx.serialize();

  console.log(serializedTx + 'serialized tx');

  const promiseEvent = web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

  return promiseEvent
    .on('transactionHash', (txHash) => {
        console.log('TRANSACTION HASH');
        console.log(txHash);
        console.log('TRANSACTION HASH');
      }
    )
    .on('confirmation', (confirmNumber, receipt) => {
        console.log('CONFIRM NUMBER, RECEIPT');
        console.log(confirmNumber, receipt);
        console.log('CONFIRM NUMBER, RECEIPT');
      }
    )
    .on('error', (error => {
        console.log('ERROR');
        console.log(error);
        console.log('ERROR');
      })
    );

}

main();
