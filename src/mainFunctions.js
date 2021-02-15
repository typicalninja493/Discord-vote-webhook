const querystring = require('querystring')
const getBody = require('raw-body')
const fetch = require('node-fetch')
const config = require('../config.js');
const chalk = require('chalk');
const consola = require('consola')
const botToken = config.webhook.botToken


async function formatBody(body) {
  if (body.query.length > 0) body.query = querystring.parse(body.query.substr(1))
    return body
}


async function _parseRequest(req, res) {

      if (req.body) return formatBody(req.body)

    await getBody(req, {}, (error, body) => {
        if (error) return res.status(422).json({ error: 'Malformed request' })

        try {
          const parsed = JSON.parse(body.toString('utf8'))

          return formatBody(parsed)
        } catch (err) {
          res.status(400).json({ error: 'Invalid body' })
         return false
        }
      })
}


async function fIllPlaceholders(descripton, data) {
let string = descripton;

let link = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=4096`

string = string.replace('{{user:id}}', data.id)
               .replace('{{user:name}}', data.username)
                .replace('{{user:Discrim}}', data.discriminator)
               .replace('{{user:server}}', "unavilable")
              .replace('{{user:mention}}', `<@${data.id}>`)
              .replace('{{user:avatar}}', link)
                .replace('{{server}}', data.server || 'Unkown')
return string;

}

async function getUser(userID) {
const res = await fetch(`https://discord.com/api/users/${userID}`, { headers: { Authorization: `Bot ${botToken}`}}).then(res => res.json())

return res;
}

async function fatalError(error){
  console.log(`[`, chalk.bgRed('Fatal-error'), `]`, error)

  process.exit()
}

async function validateConfig(config) {
if(!config) return fatalError('Config not found')

if(!config.webhook) return fatalError('Config for webhook was not found')

if(!config.webhook.botToken) return fatalError('Bot token was not found')


if(!config.webhook.channelID) return fatalError('channelID was not found')


}

module.exports = {
  formatBody,
  _parseRequest,
  fIllPlaceholders,
  getUser,
  fatalError,
  validateConfig
}