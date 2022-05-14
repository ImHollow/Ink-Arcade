module.exports = async function eightball(MessageEmbed, msg, client){


    var replymap = ['yes', 'no', 'maybe', 'I believe so!', 'Most likely not!', 'Absolutely!', 'Not a chance!', 'Probably tomorrow!', 'Could be.', 'Not too sure!'];
    if(msg.content.includes('?')){
        const embed = new MessageEmbed()
        .setColor('#006fdd')
        .setTitle(':8ball: ' + replymap[randomnum(0, replymap.length-1)]);
        msg.channel.send({ embeds: [embed]});
    }else{
        const embed = new MessageEmbed()
        .setColor('#006fdd')
        .setTitle(':8ball: ' + 'You must ask 8Ball a question');
        msg.channel.send({ embeds: [embed]});
    }
}

function randomnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }