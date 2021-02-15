const Discord = require('discord.js');
const config = require('../config.js');
const chalk = require('chalk');
const consola = require('consola')
const { getUser,  fatalError, fIllPlaceholders } = require('../src/mainFunctions.js')
// our discord bot
const client = new Discord.Client();
let ready = false


const { embed } = require('../src/embed.js')
class webhook {
constructor(server) {
client.once('ready', () => {
  ready = true
	console.log('[', chalk.blue('DVW'), ']', `${client.user.tag} has logged in!!`)

});



client.login(config.webhook.botToken);
}

async sendData(data) {
  if(data.type && data.type.toLowerCase() == 'test') {
const user = await getUser(data.user)

const Sendingembed = await embed(config.embed, user)

const channel = await client.channels.cache.get(config.webhook.channelID)

if(!channel) {
 return fatalError('Channel not found')
}

	try {
	const webhooks = await channel.fetchWebhooks();
if(webhooks.size == 0) {
  await channel.createWebhook(config.webhook.name)
	.then(webhook => console.log(`Created webhook ${webhook.name} as we didnt find any related webhooks in your channel!!`))
	.catch(console.error);
}
const webhook = webhooks.first();
user.server = channel.guild.name
const text = await fIllPlaceholders(config.webhook.text, user)
const name = await fIllPlaceholders(config.webhook.name, user)
const avatar = await fIllPlaceholders(config.webhook.avatarURL, user)

	await webhook.send(text, {
			username: name,
			avatarURL: avatar,
			embeds: [Sendingembed],
		});
  } catch(err) {
console.log(err)

  }

  }


}




}


module.exports = webhook