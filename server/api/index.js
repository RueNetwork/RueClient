/** @format */
/**
 * External dependencies
 */

const express = require( 'express' );
const bodyParser = require('body-parser');


const updateContract = require('../../scripts/updateContract');
const compileAndDeployContract = require('../../scripts/compileAndDeployContract');

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })
const path = require('path');


// console.log(web3);

/**
 * Internal dependencies
 */
const version = require( '../../package.json' ).version,
	config = require( 'config' ),
	oauth = require( './oauth' );

module.exports = function() {
	const app = express();

  app.use(express.static(path.join(__dirname, '../../javascripts')));


  app.use(bodyParser.urlencoded({ extended: true }));

  app.get( '/version', function( request, response ) {
		response.json( {
			version: version,
		} );
	} );

	app.post('/deployContract', async function(req, res){

		try {

      const tokenName = req.body['token-name'];
      const tokenSymbol = req.body['token-symbol'];
      const totalSupply = req.body['total-supply'];
      const decimalPlaces = req.body['decimal-places'];

      console.log(tokenName, tokenSymbol, decimalPlaces, totalSupply);

      const contractPath = await updateContract(tokenName, tokenSymbol, totalSupply, decimalPlaces);
      const deployResponse = compileAndDeployContract(contractPath, tokenSymbol, wss);

      res.send('Success')
    } catch(err){
		  console.log(err);
			res.json(err);
		}
	});

	if ( config.isEnabled( 'oauth' ) ) {
		oauth( app );
	}

	return app;
};
