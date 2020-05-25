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

    /* ------------------------------------------------------------------------------ */
    // Get explorer api blockhash
    /* ------------------------------------------------------------------------------ */
    explorer_api_blockhash: async function () {
        return new Promise((resolve, reject) => {
            var requestOptions = {};           
            var apiEnabled = config.apiLinks.hasExplorerAPI;
            switch (apiEnabled) {
                case 'true':
                    requestOptions = {
                        method: 'GET',
                        uri: config.apiLinks.explorerAPI + 'getblock?hash=' + wallet.wallet_chain_info(),
                        json: true
                    };
                    rp(requestOptions).then(response => {
                        if (response.Response == "Error") {
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

    }


};