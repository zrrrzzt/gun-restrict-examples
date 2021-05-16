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
    const to = this.to
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

const server = require('http').createServer(Gun.serve(__dirname))

const gun = Gun({
  file: 'data.json',
  web: server
})

// Sync everything
gun.on('out', { get: { '#': { '*': '' } } })

server.listen(port)

console.log('GUN server (restricted put) started on port 8000')
console.log('Use CTRL + C to stop it')
