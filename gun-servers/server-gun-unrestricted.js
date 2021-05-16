const port = 8000
const Gun = require('gun')

const server = require('http').createServer(Gun.serve(__dirname))

const gun = Gun({
  file: 'data.json',
  web: server
})

// Sync everything
gun.on('out', { get: { '#': { '*': '' } } })

server.listen(port)

console.log('GUN server (unrestricted) started on port 8000')
console.log('Use CTRL + C to stop it')
