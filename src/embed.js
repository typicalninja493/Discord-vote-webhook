const Discord = require('discord.js');
const { fIllPlaceholders } = require('../src/mainFunctions.js')

async function embed(data, res) {
  const embed = new Discord.MessageEmbed()

if(data.color) {
  embed.setColor(data.color);
}

if(data.description) {
  const description = await fIllPlaceholders(data.description, res)

  embed.setDescription(description)
}

if(data.footer) {
  const footer = await fIllPlaceholders(data.footer, res)
  embed.setFooter(footer);
}
if(data.url) {
   embed.setURL(data.url)
}

return embed
}

module.exports = {
  embed
}