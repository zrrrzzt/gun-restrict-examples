const port = process.env.PORT || process.argv[2] || 8000
const Gun = require('gun')

function hasValidToken (msg) {
  return msg && msg && msg.headers && msg.headers.token && msg.headers.token === 'thisIsTheTokenForReals'
}

// Add listener
Gun.on('opt', function (ctx) {
  if (ctx.once) {
    return
  }
  // Check all incoming traffic
  ctx.on('in', function (msg) {
    var to = this.to
    // restrict put
    if (msg.put) {
      if (hasValidToken(msg)) {
        to.next(msg)
      }
    } else {
      to.next(msg)
    }
  })
})

const server = require('http').createServer((req, res) => {
  // filters gun requests!
  if (Gun.serve(req, res)) {
    return
  }

  require('fs').createReadStream(require('path').join(__dirname, req.url)).on('error', function () { // static files!
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(require('fs')
    .readFileSync(require('path')
    .join(__dirname, 'index.html') // or default to index
  ))
  }).pipe(res) // stream
})

Gun({
  file: 'data.json',
  web: server
})

server.listen(port)

console.log('Server started on port ' + port + ' with /gun')
console.log('Use CTRL + C to stop it')
