import express from 'express'
import path from 'path'
import serveStatic from 'serve-static'

let app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))
var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)
