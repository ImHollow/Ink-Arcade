const status = require('./status.js');
const ping = require('./ping.js');
const eightBall = require('./eightBall.js');
const help = require('./help.js');
const agree = require('./agree.js');
const { Message } = require('discord.js');

module.exports = (msg, db, prefix, os, MessageEmbed, client) => {

    
    switch (msg.content.toLocaleLowerCase().split(' ')[0]) {


        //HELP COMMAND
        case prefix + 'help':
            help(MessageEmbed, msg, client, prefix);
            break;
        
        //STATUS COMMAND    
        case prefix + 'status':
            status(msg, os, MessageEmbed, client);
            break;
        
        //PING COMMAND
        case prefix + 'ping':
            ping(MessageEmbed, msg, client);
            break;

        //8BALL COMMAND
        case prefix + '8ball':
            eightBall(MessageEmbed, msg, client);
            break;

        //AGREE TO RULES COMMAND
        case prefix + 'agree':
            agree(MessageEmbed, msg, client);
            break;

        default:
            break;
    }
}

