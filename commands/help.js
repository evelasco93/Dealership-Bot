const Discord = require('discord.js');

module.exports = 
{
    name: 'help',
	description: 'List all the commands or info about an specific command.',
    usage: '[command name]',
    execute(message, args) 
    {
	const data = [];
	const { commands } = message.client;
	let embed = new Discord.RichEmbed()
	.setTitle("Available Commands:")
	.setColor(0xF9FF1C)
	.addField(`!help`, `Sends a list of available commands via DM`)
	.addField(`!stock`, `Displays the available stock for an specific vehicle \nUsage: [!stock vehiclesname]`)
	.addField(`!stats`, `Displays the stats of an specific vehicle\nUsage: [!stats vehiclesname]`)
	.addField(`!order`, `Starts the process to import an specific vehicle\nUsage: [!order vehiclesname]`);

		return message.author.sendEmbed(embed)
		.then(() => {
			if (message.channel.type === 'dm') return;
			message.reply('I\'ve sent you a DM with all the available commands!');
		})
		.catch(error => {
			console.error(`Could not send you a DM with our commands, ${message.author.tag}.\n`, error);
			message.reply('Houston we have a problem. I can\'t DM you!');
		});

	},
};