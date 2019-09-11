const Web3 = require('web3');

const testnet = 'https://ropsten.infura.io/v3/6156d5a31ef44b66899b1b88f7f26d63';

// const projectId = '6156d5a31ef44b66899b1b88f7f26d63';
//
// const projectSecret = 'ca44d7f5e4da4986ad1ad92ef2d292e1';

const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

console.log(web3);



async function main(){
  try {
    // const response = await web3.eth.getAccounts();
    // const response = web3.eth.blockNumber;
    const response = await web3.eth.getBlockNumber();

    const gasPrice = await web3.eth.getGasPrice();


    console.log(response, gasPrice);
  } catch (err){
    console.log(err);
  }
}

main();


async function test(){
  const account = await web3.eth.accounts.privateKeyToAccount(privateKeyValue);
  console.log(account);
}

// return test();

// web3.eth.getAccounts()
//   .then(console.log);

// let rpcUrl = "https://mainnet.infura.io/ocCdekUYwOyLn7h7OlJM";
// var web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
//
// web3.eth.getTransaction("0xaf7bfec2f84b35a58e93ebdf688ba079721b2ac064d7adff520100352206472d")
//   .then(txObj => {
//     console.log( txObj); // logs "string"
//   });

