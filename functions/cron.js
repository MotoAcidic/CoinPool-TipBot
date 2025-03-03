//var config = require('../config.js');
try {
    var config = process.cwd() + '/config.js';
    config = require(config);
} catch (error) {
    console.error('ERROR -> Unable to load config file.');
    process.exit(1);
}

const Big = require('big.js'); // https://github.com/MikeMcl/big.js -> http://mikemcl.github.io/big.js/

var chat = require("./chat.js");
var command = require("./command.js");
var check = require("./check.js");
var transaction = require("./transaction.js");

/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

module.exports = {

    /* ------------------------------------------------------------------------------ */
    // Process deposits cron
    /* ------------------------------------------------------------------------------ */

    cron_get_deposits: function () {
        setInterval(function () {
            command.command_get_deposits(0);
            //command.command_testrule();
        }, config.wallet.depositsConfirmationTime * 1000);
    },

    /* ------------------------------------------------------------------------------ */
    // Credit deposits cron
    /* ------------------------------------------------------------------------------ */

    cron_credit_deposits: function () {
        setInterval(function () {
            command.command_credit_deposits(0);
        }, config.wallet.depositsCreditTime * 1000);
    },

    /* ------------------------------------------------------------------------------ */
    // Check saved wallet transactions for stakes
    /* ------------------------------------------------------------------------------ */

    cron_get_stakes: function () {
        setInterval(function () {
            command.command_get_stakes(0);
        }, config.staking.checkTime * 1000);
    },

    /* ------------------------------------------------------------------------------ */
    // Credit stake transactions
    /* ------------------------------------------------------------------------------ */

    cron_credit_stakes: function () {
        setInterval(function () {
            command.command_credit_stakes(0);
        }, config.staking.creditTime * 1000);
    },

    /* ------------------------------------------------------------------------------ */
    // Send LCP chain status Message
    /* ------------------------------------------------------------------------------ */

    cron_lcp_chain_status: function () {
        setInterval(function () {
            command.command_testrule(1, config.bot.adminIDs[0], '', 'text', '3', 'lcpstatus');
        }, config.cronTimes.statusLcpCronTime * 1000); //30 seconds
    },

    /* ------------------------------------------------------------------------------ */
    // Send Chain status Message
    /* ------------------------------------------------------------------------------ */

    cron_chain_status: function () {
        setInterval(function () {
            command.command_chain(config.bot.adminIDs[0], '', 'text', 'chainstatus');
        }, config.cronTimes.statusChainCronTime * 1000); //60 seconds
    },

    /* ------------------------------------------------------------------------------ */
    // Send Price Message
    /* ------------------------------------------------------------------------------ */

    cron_price_status: function () {
        setInterval(function () {
            command.command_price(config.bot.adminIDs[0], '', 'text', 'price');
        }, config.cronTimes.priceCronTime * 1000); //3mins 
    },


    /* ------------------------------------------------------------------------------ */
    // Send News Headlines
    /* ------------------------------------------------------------------------------ */

    cron_hot_news: function () {
        setInterval(function () {
            command.command_hotnews(config.bot.adminIDs[0], '', 'text', 'hotnews');
        }, 60000); //60 seconds
    },

    /* ------------------------------------------------------------------------------ */
    // Get coin price
    /* ------------------------------------------------------------------------------ */

    cron_price: async function () {
        var newCoinPrice = 0;
        newCoinPrice = await check.check_get_coin_price();
        if (newCoinPrice) {
            coinPrice = newCoinPrice;
            coinCentPrice = Big(0.01).div(newCoinPrice).toFixed(8);
            saveCoinPriceHistory = await transaction.transaction_coin_price_history(coinPrice);
        }
        setInterval(async function () {
            // Check if bot is curently disabled
            if (botEnabled) {
                newCoinPrice = await check.check_get_coin_price();
                if (newCoinPrice) {
                    coinPrice = newCoinPrice;
                    coinCentPrice = Big(0.01).div(newCoinPrice).toFixed(8);
                    saveCoinPriceHistory = await transaction.transaction_coin_price_history(coinPrice);
                }
            }
        }, config.coinPrice.cronTime * 1000);
    }

};