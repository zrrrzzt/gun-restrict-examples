const finalhandler = require('finalhandler')
const http = require('http')
const serveStatic = require('serve-static')
const port = process.argv[2] || 3000
const index = process.argv[3] || 'authenticated.html'
// Serve up public/ftp folder
const serve = serveStatic('www', {'index': [index]})

// Create server
const server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(port)

console.log(`www server started on port: ${port} - ${index}`)
