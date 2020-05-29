//var config = require('../config.js');
try {
    var config = process.cwd() + '/config.js';
    config = require(config);
} catch (error) {
    console.error('ERROR -> Unable to load config file.');
    process.exit(1);
}

/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

//const Big = require('big.js'); // https://github.com/MikeMcl/big.js -> http://mikemcl.github.io/big.js/
const rp = require('request-promise');
var command = require("./command.js");
var wallet = require("./wallet.js");
/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

module.exports = {

/* ------------------------------------------------------------------------------ 
                      Explorer API Get Block Call
 ------------------------------------------------------------------------------ */

    explorer_api_getblock: async function () {
        var chainInfo = await wallet.wallet_chain_info();
        var currentBlock = chainInfo.bestblockhash;
        return new Promise((resolve, reject) => {
            var requestOptions = {};
            requestOptions = {
                method: 'GET',
                uri: config.apiLinks.explorerAPI + 'getblock',
                qs: {
                    hash: currentBlock
                },
                json: true
            };
            rp(requestOptions).then(response => {
                //console.log(response);
                resolve(response);
            })
        })
    },


    /* Example GETBLOCK Output
  { hash: '007fad00fb33d063a31b83624d780a31cdd7da51e9862f2786065633a13b2057',
  confirmations: 1,
  size: 429,
  height: 21355,
  version: 3,
  merkleroot: '65a4c938a26e06bccc7d6d6a98766b377a815df490719c70c19fcca38f9918b5',
  tx:
   [ '225237c748ae81522df13d1a60e7f73541292010bcc8a83817f2172c9345223d',
     '19f733d31c8148b84adc7d8185587a1658bad2a2663259dbc1fd458f6914f341' ],
  time: 1590596773,
  nonce: 0,
  bits: '1b1e4281',
  difficulty: 2165.7460195,
  chainwork: '00000000000000000000000000000000000000000000000002065a93cd44dc62',
  previousblockhash: '0a68a4b834c4fe02ff4cb16eaea3537d78d0b08f0b95537bbee7b2711abbbdeb',
  flags: 'proof-of-stake stake-modifier',
  proofhash: '0000000000000000000000000000000000000000000000000000000000000000',
  entropybit: 1,
  modifierchecksum: '5909df08' }

     */

    // https://api-docs.cryptocontrol.io/?json-doc#introduction

    cryptoPanic_hot_news: async function () {
        return new Promise((resolve, reject) => {
            var requestOptions = {};
            requestOptions = {
                method: 'GET',
                uri: config.apiLinks.cryptoPanicAPI + 'public/news/category',
                qs: {
                    auth_token: config.apiLinks.cryptoPanicKey
                },
                json: true
            };
            rp(requestOptions).then(response => {
                console.log(response);
                resolve(response);
            })
        })
    },
};