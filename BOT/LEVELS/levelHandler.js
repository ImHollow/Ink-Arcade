module.exports = (msg, db, chalk, Levels) => {

    //ONLY GIVE PEOPLE XP EVERY 10 SECONDS
    if(Levels.includes(msg.author.id)){
        return;
    }else{
        Levels.push(msg.author.id);
        setTimeout(() => {
            Levels.splice(Levels.indexOf(msg.author.id));
        }, 10000);
    }

    //GLOBAL USER LEVELS
    db.table('Users').get(msg.author.id.toString()).run(global.conn, (err, res) => {
        if(err)console.log(chalk.red(chalk.grey('[' + chalk.red('ERROR') + '] ' + chalk.red(err.message))));

        //IF USER ISNT IN DATABASE ADD THEM TO IT
        if(res == null){
            db.table('Users').insert({
                id: msg.author.id,
                name: msg.author.username,
                icon: msg.author.avatarURL(),
                creationDate: msg.author.createdAt,
                level: 1,
                xp: 0,
                xpNeeded: 150,
                bits: 0
            }).run(global.conn, (err, res) => {
                if(err)console.log(chalk.red(chalk.grey('[' + chalk.red('ERROR') + '] ' + chalk.red(err.message))));
                if(res != null)console.log(chalk.green(chalk.grey('[' + chalk.green('DB') + ']Successfully inserted: ' + chalk.green(res.inserted + ' User'))));
            });

        //IF USER IS IN DATABASE UPDATE VALUES
        }else{

            var xpToAdd = randomnum(1, 10);
            var newLevel;
            var newXp;
            var newXpNeeded;

            //IF XP IS GREATER THAN XPNEEDED LEVEL UP USER
            if(xpToAdd + res.xp >= res.xpNeeded){
                newLevel = res.level+1;
                newXp = 0;
                newXpNeeded = Math.floor(res.xpNeeded*1.3);
                const embed = new MessageEmbed()
                .setColor('#63f542')
                .setTitle(':tada: ' + msg.author.username + ' You have leveled up to level: ' + newLevel);
                msg.channel.send({ embeds: [embed]});
                
            //IF XP IS NOT GREATER THAN XP NEEDED ADD XP
            }else{
                newLevel = res.level;
                newXp = res.xp+xpToAdd;
                newXpNeeded = res.xpNeeded;
            }

            //SUBMIT UPDATES TO DATABASE
            db.table('Users').get(msg.author.id.toString()).update({
                name: msg.author.username,
                icon: msg.author.avatarURL(),
                level: newLevel,
                xp: newXp,
                xpNeeded: newXpNeeded,
                bits: (res.bits+randomnum(1, 5))
            }).run(global.conn, (err, res) => {
                if(err)console.log(chalk.red(chalk.grey('[' + chalk.red('ERROR') + '] ' + chalk.red(err.message))));
            });
        }
    });




}

function randomnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }