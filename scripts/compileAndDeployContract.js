const fs = require("fs");
const solc = require('solc');
let Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

/** Code to find errant console logs **/
['log', 'warn', 'error'].forEach(function(method) {
  var old = console[method];
  console[method] = function() {
    var stack = (new Error()).stack.split(/\n/);
    // Chrome includes a single "Error" line, FF doesn't.
    if (stack[0].indexOf('Error') === 0) {
      stack = stack.slice(1);
    }
    var args = [].slice.apply(arguments).concat([stack[1].trim()]);
    return old.apply(console, args);
  };
});

async function compileAndDeployContract(path, passedTokenName){
  // for prod, change to regular network
  const testnet = 'https://ropsten.infura.io/v3/6156d5a31ef44b66899b1b88f7f26d63';

  // from address
  const address = '0x0764eDcCD0278Ee60C421148B8baB812306D90D5';

  const privateKeyValue = '8084234477DFEDECA9F6814997B009E1B0364FF85CAE59B596CAFB7E953A6F06';

  const privateKey = new Buffer(privateKeyValue, 'hex');


  const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

  // TODO: change to path variable
  const input = fs.readFileSync(path);
  const output = solc.compile(input.toString(), 1);

  const tokenName = `:${passedTokenName}`

  // const abi = JSON.parse(output.contracts[tokenName].interface);
  //
  // const bytecode = output.contracts[tokenName].bytecode;


  const abi = JSON.parse(output.contracts[':EthpressToken'].interface);

  const bytecode = output.contracts[':EthpressToken'].bytecode;

  const weiAmount = web3.utils.toWei('1', 'ether');

  const gasPrice = await web3.eth.getGasPrice();

  const gasPriceHex = await web3.utils.toHex(gasPrice);

  const gasLimitHex = await web3.utils.toHex(7957355);

  const nonce = await web3.eth.getTransactionCount(address);

  const nonceHex = await web3.utils.toHex(nonce);

  const rawTx = {
    from: address,
    nonce: nonceHex,
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    data: '0x' + bytecode,
    chainId: web3.utils.toHex(3),
  };

  const tx = new Tx(rawTx, {'chain':'ropsten'});
  tx.sign(privateKey);
  const serializedTx = tx.serialize();

  // console.log(serializedTx + 'serialized tx');

  // const deployResponse = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  //
  // console.log(deployResponse);

  const promiseEvent = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

  return promiseEvent;

  // return promiseEvent
  //   .on('transactionHash', (txHash) => {
  //       console.log('TRANSACTION HASH');
  //       console.log(txHash);
  //       console.log('TRANSACTION HASH');
  //     }
  //   )
  //   .on('confirmation', (confirmNumber, receipt) => {
  //       console.log('CONFIRM NUMBER, RECEIPT');
  //       console.log(confirmNumber, receipt);
  //       console.log('CONFIRM NUMBER, RECEIPT');
  //     }
  //   )
  //   .on('error', (error => {
  //       console.log('ERROR');
  //       console.log(error);
  //       console.log('ERROR');
  //     })
  //   );

}

module.exports = compileAndDeployContract;