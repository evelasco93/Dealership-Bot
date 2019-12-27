module.exports = {
    name: 'order',
    description: 'get vehicle stats',
    usage: '[vehicle name]',
    guildOnly: true,
    args: true,
    cooldown: 5,
	execute(message) {
		message.reply('I\'ll be more than happy to help you with your order!');
	},
};