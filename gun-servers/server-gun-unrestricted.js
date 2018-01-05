const port = 8000
const Gun = require('gun')

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

console.log('Unrestricted server started on port ' + port + ' with /gun')
console.log('Use CTRL + C to stop it')
