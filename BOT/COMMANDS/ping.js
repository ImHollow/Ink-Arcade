module.exports = async function ping(MessageEmbed, msg, client){
    const embed = new MessageEmbed()
					.setColor('#006fdd')
					.setTitle('LATENCY: ' + client.ws.ping + ' MS');
		msg.channel.send({ embeds: [embed]});
}