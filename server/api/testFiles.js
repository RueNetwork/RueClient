const updateContract = require('../../scripts/updateContract');
const compileAndDeployContract = require('../../scripts/compileAndDeployContract');

const express = require('express');
const path = require('path');


const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8081 });


const app = express();

const javascriptsPath = path.join(__dirname, '../../javascripts');

console.log(javascriptsPath)

app.use(express.static(javascriptsPath));

app.listen(3001);



const variableName = 'FRED TOKEN';
const variableSymbol = 'FRED13363234355';
const variableSupply = 100000000000;
const variableDecimals = 8;

// variable symbol is needed for compileanddeploy



async function main(){
  const contractPath = await updateContract(variableName, variableSymbol, variableSupply, variableDecimals);
  const deployResponse = await compileAndDeployContract(contractPath, variableSymbol, wss);

  console.log(deployResponse);
}

// setTimeout(main, 1000 * 10);

// main();


// console.log(__dirname)
//
// console.log('FUNCTIONS TO FOLLOW');
// console.log(updateContract.toString(), compileAndDeployContract.toString());
//
// console.log(updateContract)