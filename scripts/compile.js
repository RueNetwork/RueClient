const path = require('path');
const fs = require('fs');
const solc = require('solc');
const helloPath = './contract.sol';
const source = fs.readFileSync(helloPath, 'UTF-8');

console.log(source.toString())

const compiled = solc.compile(source, 1).contracts[':Hello'];

console.log(compiled);

module.exports = compiled


//
//
// var input = {
//   language: 'Solidity',
//   sources: {
//     'hello.sol' : {
//       content: source
//     }
//   },
//   settings: {
//     outputSelection: {
//       '*': {
//         '*': [ '*' ]
//       }
//     }
//   }
// };
// console.log(JSON.parse(solc.compile(JSON.stringify(input))));