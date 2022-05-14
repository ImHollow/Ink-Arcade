const { Client, Intents, MessageEmbed, Discord } = require('discord.js');
const config = require('./config.json');
const chalk = require('chalk');
const os = require('os-utils');
const db = require('rethinkdb');

//INTENT MNAGER AND CLIENT SPAWNER
const client = new Client({ intents: [ 
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_VOICE_STATES, 
    Intents.FLAGS.GUILD_MEMBERS
] });

//MODULES
var ready = require('./BOT/READY/ready.js');
var commandHandler = require('./BOT/COMMANDS/commandHandler.js');
var levelHandler = require('./BOT/LEVELS/levelHandler.js');

//WHEN CLIENT INITIALIZES
client.once('ready', () => {
    ready(client, chalk, db);
});

var Levels = [];
//COMMAND HANDLER
client.on('messageCreate', async msg => {

    //DONT LET BOT RESPOND TO ITSELF
    if(msg.author.id == client.user.id)return;

    //DONT LET BOT RESPOND TO OTHER BOTS
    if(msg.author.bot == true)return;

    //HANDLES COMMANDS
    commandHandler(msg, db, config.dPrefix, os, MessageEmbed, client);

    //HANDLES LEVELS
    levelHandler(msg, db, chalk, Levels);


});

//LOGIN THE CLIENT
client.login(config.token);