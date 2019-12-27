const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) 
	{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	}

client.once('ready', () => 
	{
	console.log('Bot is ready to rock!');
	});
// Assign role to new members and welcome message! 
client.on('guildMemberAdd', member => 
	{
		// Asigning role
		console.log('User ' + member.user.username + ' has joined the server!')
		var role = member.guild.roles.find('name', 'Customer');
		member.addRole(role);

		// Welcome message
		const channel = member.guild.channels.find(channel => channel.name === "welcome");
		 if(!channel) return;
		 channel.send(`Welcome to Beautiful Cars lol, ${member}! Please change to your IC name!\nRefer to <#660079605037924372> for any questions you might have!\nUse !help to receive a list of available commands!`)
	});

// Command control
client.on('message', message => 
	{
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('This command is disabled in DMs!');
		}

		if (command.args && !args.length) {
		let reply = `You didn't use the proper format for the command, ${message.author}!`;

		if (command.usage) {
			reply += `\nTo use this command type: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
		}
		try {
		command.execute(message, args);
		} catch (error) 
		{
		console.error(error);
		message.reply('there was an error trying to execute that command!');
		}
	});

client.login(token);