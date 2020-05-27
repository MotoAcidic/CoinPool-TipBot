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
const axios = require('axios');
var command = require("./command.js");
var wallet = require("./wallet.js");
var getJSON = require('get-json')
/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

module.exports = {

/* ------------------------------------------------------------------------------ 
                                    Old method
 ------------------------------------------------------------------------------ */

/*
    explorer_api_blockhash1: function () {

        getJSON('http://80.240.25.212:3001/api/getblock?hash=00001c40589092854b7c60700f287428eacf6cd5406fb70ef4b7375b8e2c16dd')
                .then(function (response) {
                    console.log(response.hash, response.merkleroot);
                }).catch(function (error) {
                    console.log(error);
                });        
    },
*/

    explorer_api_getblock: async function () {
        var chainInfo = await wallet.wallet_chain_info();
        var currentBlock = chainInfo.bestblockhash;
        return new Promise((resolve, reject) => {
            var requestOptions = {};
            requestOptions = {
                method: 'GET',
                uri: config.apiLinks.explorerAPI + 'getblock',
                //uri: 'http://80.240.25.212:3001/api/getblock',
            qs: {
                hash: currentBlock
            },
                json: true
            };
            rp(requestOptions).then(response => {
                    console.log(response);
                    resolve(response);
            })
        })
    }
};