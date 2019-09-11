/** @format */
/**
 * External dependencies
 */

const express = require( 'express' );
const bodyParser = require('body-parser');


const updateContract = require('../../scripts/updateContract');
const compileAndDeployContract = require('../../scripts/compileAndDeployContract');


// console.log(web3);

/**
 * Internal dependencies
 */
const version = require( '../../package.json' ).version,
	config = require( 'config' ),
	oauth = require( './oauth' );

module.exports = function() {
	const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get( '/version', function( request, response ) {
		response.json( {
			version: version,
		} );
	} );

	app.post('/deployContract', async function(req, res){

		const tokenName = req.body['token-name'];
		const tokenSymbol = req.body['token-symbol'];
		const totalSupply = req.body['total-supply'];
    const decimalPlaces = req.body['decimal-places'];

    console.log(tokenName, tokenSymbol, decimalPlaces, totalSupply);

    const contractPath = await updateContract(tokenName, tokenSymbol, totalSupply, decimalPlaces);
    const deployResponse = await compileAndDeployContract(contractPath, tokenSymbol);

    console.log(deployResponse);

    const transactionHash = deployResponse.transactionHash;

    const ropsteinUrl = 'https://ropsten.etherscan.io/tx'

    const ropsteinTransaction = `${ropsteinUrl}/${transactionHash}`;

    res.send('Congratulations your contract was successfully created, deployed and confirmed. You can view it live on the blockchain at ' + ropsteinTransaction)
	});

	if ( config.isEnabled( 'oauth' ) ) {
		oauth( app );
	}

	return app;
};
