const config = require('../../config.json');

module.exports = (client, chalk, db) => {
    console.log(chalk.grey('[' + chalk.cyan('LOGIN') + ']Logged in as: ' + chalk.cyan(client.user.tag)));
    db.connect({ host: config.host, port: config.port, db: config.db}, (err, conn) => {
		global.conn = conn;
		if(err)console.log(chalk.red(chalk.grey('[' + chalk.red('ERROR') + '] ' + chalk.red(err.message))));
        if(conn != undefined)console.log(chalk.grey('[' + chalk.green('DB') + ']Logged in to Database: ' + chalk.green(conn.db) + ' Address: ' + chalk.green(conn.host + ':' + conn.port)));
	});
}