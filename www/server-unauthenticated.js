const finalhandler = require('finalhandler')
const http = require('http')
const serveStatic = require('serve-static')

// Serve up public/ftp folder
const serve = serveStatic('www', {'index': ['not-authenticated.html']})

// Create server
const server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(4000)

console.log('unauthenticated www server started on port 4000')
console.log('Use CTRL + C to stop it')
