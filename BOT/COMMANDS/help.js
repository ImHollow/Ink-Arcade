module.exports = async function help(MessageEmbed, msg, client, prefix){

    const embed = new MessageEmbed()
        .setColor('#006fdd')
        .setTitle('HELP MENU')
        .addField(':tada: Fun Commands :tada:', `**${prefix + '8ball [question]** | Will reply with an answer based on the question you ask!'}`)
        msg.channel.send({ embeds: [embed]});

}
