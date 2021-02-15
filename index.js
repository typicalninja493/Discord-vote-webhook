require('dotenv').config()
const express = require('express');
const lists = require('./lists')
const app = express();
const WEBclient = require('./webhook/Webdiscord.js')
const webhook = new WEBclient(app)
const chalk = require('chalk');
const config = require('./config.js');
const { _parseRequest, validateConfig } = require('./src/mainFunctions.js')
const port = config.port
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ error: false, message: 'Ok o_o'})
});

app.post('/:list', async (req, res) => {
let botlist = req.params.list

if(!lists[botlist]) return res.json('{error: true, message: `Bot list is not supported`}')

let ListinFile = lists[botlist]

if(req.headers.authorization !== ListinFile) {
  console.log(`[`, chalk.red(`Auth error: post`), ']', `Path : /${req.params.list} | Auth : ${req.headers.authorization} | message : authorization incorrect`)
  return res.status(403).json({error: true, message: `Authorization incorrect`})
}

const response = await _parseRequest(req, res)

if(!response) return console.log('[', chalk.red('ERROR'), ']', `Invalid body`)

return webhook.sendData(response)
})



app.get('/:list', (req, res) => {
let botlist = req.params.list
if(!lists[botlist]) return res.json({error: true, message: `Bot list is not supported`})


res.json('{error: false, message: `Web hook is woking!!, send a post request to here!!`}')

})


app.listen(port, () => {
  validateConfig(config)
	console.log('[', chalk.blue('DVW'), ']', `Webserver has started at port : ${port} and is ready to recive votes`)
});

