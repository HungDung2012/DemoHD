const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbconn = require('./config/dbconn')
const initRoutes = require('./routes')
const app = express()
app.use(
    cors({
        origin: process.env.CILENT_URL
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
initRoutes(app)
dbconn()

const PORT = process.env.PORT || 7777

app.listen(PORT, () => console.log(':::::::SERVER RUNNING ON PORT 5000:::::::'))
// Path: server/index.js