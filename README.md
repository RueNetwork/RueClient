# Version Info
V0.1 - Public Alpha (Unstable)

# RueClient
 The RueClient is part of the Rue Network's "Rue Framework" project allowing users to build Ethereum dApps using WordPress in a private and decentralized way while connecting to the Rue Network to empower low cost transactions, identity management and monetization.

The RueClient is based on WP-Calypso by Automattic (the creators of WordPress) which is a redesign of the WordPress dashboard using a single-page web application, powered by the WordPress.com REST API.

The RueClient allows you to connect to any WordPress site and via the dashboards built in wizard you'll be able to deploy an ERC-20 token on the Ethereum network (currently the Ropsten test network) in a way that is private, secure, trustless and without running your own Ethereum node.

![Image of RueClient](https://i.imgur.com/0HeExTn.png)

In the future, you'll be able to use the RueClient's modular smart contract templates to create your own full dApps and connecting it with "RuePress" our WordPress plugin to enable Web3JS functionality on your WordPress site and connection to the Rue Network's full suite of offerings including a zero-fee sidechain, user identity services, monetization and payment monitoring systems, and the ability to use WordPress as a backend for your a mobile dApp on iOS or Android.

# How is RueClient Built

The Calypso component is maintained by Automattic, here is what they had to say about it:

"It’s built with JavaScript – a very light node plus express server, React.js, Redux, wpcom.js, and many other wonderful libraries on the front-end.

You can read more about Calypso at developer.wordpress.com/calypso."

Rue bakes in Web3JS and pre-built .sol contracts. Users have native key management via Web3JS. Private keys are used to sign all transactions on the local machiene and send the pre-signed transaction to Ethereum nodes hosted by Infura. This protects the users private key.

# What is Rue? What is the Rue Network?
You can learn more about Rue and the Rue Network in our [introduction piece](https://github.com/RueNetwork/Rue/blob/master/README.md)

# Getting Started

1.	Make sure you have [`git`](https://git-scm.com/), [`node`](https://nodejs.org/), [`npm`](https://www.npmjs.com/get-npm) and build-essentials (Linx) installed.
2.	Clone this repository locally.
3.	Add `127.0.0.1 calypso.localhost` to your local `hosts` file.
4.	Execute `npm start` from the root directory of the repository.
5.	Open [`calypso.localhost:3000`](http://calypso.localhost:3000/) in your browser.

Need more detailed installation instructions? [We have them](./docs/install.md).

# Common Issues:
Most build issues relate to incorrect package versions and other challenges introduced from the setup of WP Calypso, you can often find most issues reported and resolved here: https://github.com/Automattic/wp-calypso/issues

Common troubleshooting steps:

1. To start use [n](https://github.com/tj/n) to ensure you have the correct version of NodeJS and NPM.
2. You may need to install certain packages manually. The most common ones users have issues with are `gyp`, `ncp` and `transpile`. They can be installed with `npm install [package name]`.
3. You may need to run an `npm-clean-install` to remove old package caches. If you do run a clean install you may also need to manually reinstall the packages in tip #2.
4. If you get a build or make errors you may need to run the command `sudo apt-get install build-essential` prior to building.
5. In some version of Linux you may have installed build-essnetials but be lacking g++ if you have a g++ related error you can use `sudo apt-get install build-essential g++`

# Deployment of Token:

Depending on the version you are running you may need to navigate to http://calypso.localhost:3000/hello-world to interact with the token contract
