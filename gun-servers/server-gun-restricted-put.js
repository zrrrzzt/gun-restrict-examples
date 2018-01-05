const port = 8000
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
        console.log('writing')
        to.next(msg)
      } else {
        console.log('not writing')
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
})

Gun({
  file: 'data.json',
  web: server
})

server.listen(port)

console.log('Server started on port ' + port + ' with /gun')
console.log('Use CTRL + C to stop it')
