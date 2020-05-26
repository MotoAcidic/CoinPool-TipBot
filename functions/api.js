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
/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

module.exports = {

    explorer_api_blockhash1: async function() {
        var chainInfo = await wallet.wallet_chain_info();
        var bestBlockHash = chainInfo.bestblockhash;
        var explorerLink = config.apiLinks.explorerAPI;
        var explorerGetBlock = "getblock?hash=";
    // fetch data from a url endpoint
       //const response = await axios.get(explorerLink+explorerGetBlock+bestBlockHash);
        const response = await axios.get("http://80.240.25.212:3001/api/getblock?hash=00001c40589092854b7c60700f287428eacf6cd5406fb70ef4b7375b8e2c16dd");
        const data = await response.json();
        var hash = data.hash;
        return hash;
    },

    /* ------------------------------------------------------------------------------ */
    // Get current currency price for coin id
    /* ------------------------------------------------------------------------------ */
    explorer_api_blockhash: function () {
        return new Promise((resolve, reject) => {

            var explorerAPI = config.apiLinks.hasExplorerAPI;
            var requestOptions = {};

            switch (explorerAPI) {
                case 'true':
                    requestOptions = {
                        method: 'GET',
                        uri: 'http://80.240.25.212:3001/api/getblock',
                        qs: {
                            hash: command.command_chain.chainBlockhash                             
                        },

                        json: true,
                        gzip: true
                    };
                    rp(requestOptions).then(response => {
                        if (response.status.error_code > 0) {
                            resolve(false);
                        } else {
                            resolve(response.hash);
                        }
                    }).catch((err) => {
                        resolve(false);
                    });
                    break;
                case 'false':
                        resolve(false);
                    break;
                default:
                    resolve(false);
            }

        });

        var options = {
            uri: 'https://api.github.com/user/repos',
            qs: {
                access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };

        rp(options)
            .then(function (repos) {
                console.log('User has %d repos', repos.length);
            })
            .catch(function (err) {
                // API call failed...
            });
       
};