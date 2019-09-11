const fs = require('fs');

function changeContract(variableName, variableSymbol, variableSupply, variableDecimals){
  // console.log(__dirname);

  const path = __dirname + '/ChangeContract.sol';

  const file =  fs.readFileSync(path,{ encoding: 'utf8' });

  // console.log(file);
  //
  // console.log(typeof file);

  // const variableName = 'FRED TOKEN';
  // const variableSymbol = 'FRED123';
  // const variableSupply = 10000000;
  // const variableDecimals = 8;


  var newThing  = file.replace('TOKENSYMBOL', `'${variableName}'`)
                  .replace('TOKENNAME', `'${variableSymbol}'`)
                  .replace('TOKENDECIMALS', `${variableDecimals}`)
                  .replace('TOKENSUPPLY', `${variableSupply}`);

  // var newThing1  = file.replace('TOKENNAME', `'${variableSymbol}'`);
  // var newThing2  = file.replace('TOKENSUPPLY', `${variableSupply}`);
  // var newThing3  = file.replace('TOKENDECIMALS', `${variableDecimals}`);

  // console.log(newThing);

  const fileSavePath = `${__dirname}/generatedContracts/${variableSymbol}.sol`

  fs.writeFileSync(fileSavePath, newThing);

  return fileSavePath

}

module.exports = changeContract