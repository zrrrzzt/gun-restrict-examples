const port = 8000
const Gun = require('gun')

function hasValidToken (msg) {
  return msg && msg.headers && msg.headers.token && msg.headers.token === 'thisIsTheTokenForReals'
}

// Add listener
Gun.on('opt', function (ctx) {
  if (ctx.once) {
    return
  }
  // Check all incoming traffic
  ctx.on('in', function (msg) {
    var to = this.to
    // restrict everything with invalid tokens
    if (msg.put || msg.get) {
      if (hasValidToken(msg)) {
        console.log('okay')
        to.next(msg)
      } else {
        console.log('not okay')
        console.log(msg)
      }
    } else {
      console.log(msg)
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
