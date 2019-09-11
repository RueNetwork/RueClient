const updateContract = require('../../scripts/updateContract');
const compileAndDeployContract = require('../../scripts/compileAndDeployContract');

const variableName = 'FRED TOKEN';
const variableSymbol = 'FRED13363234355';
const variableSupply = 100000000000;
const variableDecimals = 8;

// variable symbol is needed for compileanddeploy



async function main(){
  const contractPath = await updateContract(variableName, variableSymbol, variableSupply, variableDecimals);
  const deployResponse = await compileAndDeployContract(contractPath, variableSymbol);

  console.log(deployResponse);
}

main();


// console.log(__dirname)
//
// console.log('FUNCTIONS TO FOLLOW');
// console.log(updateContract.toString(), compileAndDeployContract.toString());
//
// console.log(updateContract)