const execFile = require('child_process').execFile;
const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const chalk = require('chalk');

const manager = new ShardingManager('./ink.js', { token: config.token });

manager.on('shardCreate', shard => console.log(`${chalk.grey('[' + chalk.yellow('SHARD') + ']Launched shard: ' + chalk.yellow(shard.id))}`));

//START DATABASE
const db = execFile('./DB/db.exe');

//SPAWN SHARDS
manager.spawn('auto');