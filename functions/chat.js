//var config = require('../config.js');
try{
    var config = process.cwd()+'/config.js';
    config = require(config);
}catch (error){
    console.error('ERROR -> Unable to load config file.');
    process.exit(1);
}

/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

// A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
const moment = require('moment-timezone');

const { RichEmbed } = require('discord.js');
var check = require("./check.js");
const Big = require('big.js'); // https://github.com/MikeMcl/big.js -> http://mikemcl.github.io/big.js/

/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

module.exports = {

    /* ------------------------------------------------------------------------------ */
    // Create reply message
    /* ------------------------------------------------------------------------------ */
    //   msg.channel.send(chat.chat_build_reply('embed',userName,messageType,config.colors.special,['Test Author Name',config.wallet.thumbnailIcon,'https://google.de'],'Title',[['Testfield1','Testfield1 Value',true],['Testfield2','Testfield2 Value',true]],'This is a test description.',['Test Footer',config.wallet.thumbnailIcon],config.wallet.thumbnailIcon,'https://media.wired.com/photos/5ada3a2c1e66870735eada27/master/pass/DragonPasswordFINAL.jpg',1));
    chat_build_reply: function(replyType,replyUsername,senderMessageType,replyEmbedColor,replyAuthor,replyTitle,replyFields,replyDescription,replyFooter,replyThumbnail,replyImage,replyTimestamp){
        if(replyType == 'normal'){
            if(senderMessageType == 'dm' || !replyUsername){
                return replyDescription;
            }else{
                return  replyDescription + ' ' + replyUsername;
            }
        }
        if(replyType == 'embed' || 'private'){
            var embed = new RichEmbed();
            // Set embed color
            if(replyEmbedColor){
                embed.setColor(replyEmbedColor);
            }else{
                embed.setColor(config.colors.normal);
            }
            // Set reply autor
            if(replyAuthor){
                var replyAuthorName = '';
                var replyAuthorIcon = '';
                var replyAuthorLink = '';
                if(replyAuthor[0])
                    replyAuthorName = replyAuthor[0];
                if(replyAuthor[1])
                replyAuthorIcon = replyAuthor[1];
                if(replyAuthor[2])
                    replyAuthorLink = replyAuthor[2];
                embed.setAuthor(replyAuthorName,replyAuthorIcon,replyAuthorLink);
            }
            // Set Title
            if(replyTitle){
                embed.setTitle(replyTitle.toUpperCase());
            }
            // This could be added to be able to set a link for the title
            // embed.setURL('http://google.de');
             // Set description
            if(replyDescription){
                //console.log(senderMessageType+' '+replyUsername+' '+typeof(replyUsername));
                // Check if request was not private or add username disabled
                if(senderMessageType === 'dm' || !replyUsername){
                    embed.setDescription(replyDescription);
                }else{
                    embed.setDescription(replyDescription + ' ' + replyUsername);
                }
            }
            // Set reply fields
            for (var i = 0 ; i < replyFields.length ; ++i){
                if(replyFields[i][0] === 0 && replyFields[i][1] === 0){
                    embed.addBlankField(replyFields[i][2]);
                }else{
                    embed.addField(replyFields[i][0],replyFields[i][1],replyFields[i][2]);
                }
                
            }
            // Set reply footer
            if(replyFooter){
                var replyFooterText = '';
                var replyFooterIcon = '';
                if(replyFooter[0])
                    replyFooterText = replyFooter[0];
                if(replyFooter[1])
                    replyFooterIcon = replyFooter[1];
                embed.setFooter(replyFooterText,replyFooterIcon);
            }
            // Set thumbnail
            if(replyThumbnail){
                embed.setThumbnail(replyThumbnail);
            }   
            // Set image
            if(replyImage){
                embed.setImage(replyImage);
            }
            // Set timestamp
            if(replyTimestamp){
                embed.setTimestamp();
            }
            // all done and return embed
            return embed;
        }
    },

    /* ------------------------------------------------------------------------------ */
    // Build chat reply
    /* ------------------------------------------------------------------------------ */
    chat_reply: function(msg,replyType,replyUsername,senderMessageType,replyEmbedColor,replyAuthor,replyTitle,replyFields,replyDescription,replyFooter,replyThumbnail,replyImage,replyTimestamp){

        if (replyType == 'pool') {
            var poolChannel = globalClient.channels.get(config.bot.stakePoolChannelID);
            return poolChannel.send(this.chat_build_reply(replyType,replyUsername,senderMessageType,replyEmbedColor,replyAuthor,replyTitle,replyFields,replyDescription,replyFooter,replyThumbnail,replyImage,replyTimestamp));
        }

        if (msg == 'status') {
            return globalClient.channels.get(check.check_getRandomFromArray(config.bot.statusChannelIDs, 1)[0]).send(this.chat_build_reply(replyType, replyUsername, senderMessageType, replyEmbedColor, replyAuthor, replyTitle, replyFields, replyDescription, replyFooter, replyThumbnail, replyImage, replyTimestamp));
        }

        if (msg == 'price') {
            var priceChannel = globalClient.channels.get(config.bot.priceChannelID);
            return priceChannel.send(this.chat_build_reply(replyType, replyUsername, senderMessageType, replyEmbedColor, replyAuthor, replyTitle, replyFields, replyDescription, replyFooter, replyThumbnail, replyImage, replyTimestamp));
        }

        if (msg == 'airdrop') {
            var airDropChannel = globalClient.channels.get(config.bot.airDropChannelID);
            return airDropChannel.send(this.chat_build_reply(replyType, replyUsername, senderMessageType, replyEmbedColor, replyAuthor, replyTitle, replyFields, replyDescription, replyFooter, replyThumbnail, replyImage, replyTimestamp));
        }

        if (msg == 'rain') {
            return globalClient.channels.get(check.check_getRandomFromArray(config.bot.rainChannelIDs, 1)[0]).send(this.chat_build_reply(replyType, replyUsername, senderMessageType, replyEmbedColor, replyAuthor, replyTitle, replyFields, replyDescription, replyFooter, replyThumbnail, replyImage, replyTimestamp));
        }

        if (msg == 'news') {
            return globalClient.channels.get(check.check_getRandomFromArray(config.bot.newsChannelID, 1)[0]).send(this.chat_build_reply(replyType, replyUsername, senderMessageType, replyEmbedColor, replyAuthor, replyTitle, replyFields, replyDescription, replyFooter, replyThumbnail, replyImage, replyTimestamp));
        }

        if (replyType == 'private') {
            return msg.author.send(this.chat_build_reply(replyType, replyUsername, senderMessageType, replyEmbedColor, replyAuthor, replyTitle, replyFields, replyDescription, replyFooter, replyThumbnail, replyImage, replyTimestamp));
        } else {
            return msg.channel.send(this.chat_build_reply(replyType, replyUsername, senderMessageType, replyEmbedColor, replyAuthor, replyTitle, replyFields, replyDescription, replyFooter, replyThumbnail, replyImage, replyTimestamp));
        }

    },

/* ------------------------------------------------------------------------------ */
    // Delete chat messages
/* ------------------------------------------------------------------------------ */

    chat_delete_chain_status_message: function (message) {
        try {
            message.delete(config.cronTimes.statusChainCronTimeDelete * 1000);
        } catch (error) {
        }
    },

    chat_delete_price_message: function (message) {
        try {
            message.delete(config.cronTimes.priceCronTimeDelete * 1000);
        } catch (error) {
        }
    },

    chat_delete_lcp_status_message: function (message) {

        try {            
            message.delete(config.cronTimes.statusLcpCronTimeDelete * 1000);
        } catch (error) {
        }
    },

    chat_delete_balance_message: function (message) {

        try {
            message.delete(config.cronTimes.balanceTimeDelete * 1000);
        } catch (error) {
        }
    },

    chat_edit_message: function (messageID, message) {
        try {
            messageID.edit(message);
        } catch (error) {
        }
    }

    
};