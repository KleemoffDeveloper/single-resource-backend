require('dotenv').config()
const port = process.env.PORT
const app = require('./app')

app.listen(port, () => {
    console.log(`Listening on port: ${port}.`)
})