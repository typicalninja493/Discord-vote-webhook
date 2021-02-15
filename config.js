module.exports = {
  "mode": "bot",
  "messageType": "embed",
  "webhook": {
         "botToken": process.env.TOKEN,
        "channelID": "776291354430930944",
        "serverID": "735024688224272395",
        "avatarURL": "{{user:avatar}}",
        "name": "{{user:name}}",
        "text": "New vote from {{user:mention}}"
  },
  "port": "3000",
  "embed": {
    "title": "",
    "description": "thanks {{user:name}} for voting for {{server}}",
    "footer": "",
    "url": "",
    "image": "",
    "color": ""

  }
}
