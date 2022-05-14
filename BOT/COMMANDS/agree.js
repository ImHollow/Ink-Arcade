module.exports = async function eightball(MessageEmbed, msg, client){


    if (!msg.member.roles.cache.some(role => role.id === '967983691152367666')) {
        let roleMember = msg.guild.roles.cache.find(r => r.id === '967983691152367666');
        msg.member.roles.add(roleMember);
        msg.delete();
    }else{
        msg.delete();
    }


}