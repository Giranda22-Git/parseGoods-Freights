const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// require and connect telegram bot
//const bot = require('./botCommands/connection.js')

// require bot middleware
//----

// enable bot middleware
//----

// require mounted data as serverData
const serverData = require('./staticData/mountedData.js').data

// activate mounted functions
//----

// require simple functions
//----

// initial express js application
const app = express()

// standart middleweare settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
	res.contentType('application/json')
	next()
})
app.use(cors())


// function of init all process
async function init(serverData) {
	await mongoose.connect(serverData.mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})

  mongoose.connection.once('open', () => {
		app.listen(serverData.PORT, '0.0.0.0', (err) => {
			if (err) return new Error(`error in starting server, error: ${err}`)
			else console.log(`server started on \nPORT: ${serverData.PORT}\nURL: ${serverData.serverUrl}`)
		})

    // require all end points
		app.use('/goods', require('./endPoints/goods.js'))
    app.use('/suppliers', require('./endPoints/suppliers.js'))
	})

  // require bot commands
  //require('./botCommands/addToBasketAction.js')

  //await centralDataBaseParse()

	mongoose.connection.emit('open')
  //bot.launch()
}

init (serverData)