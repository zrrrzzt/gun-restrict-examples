const port = 8000
const Gun = require('gun')

const server = require('http').createServer((req, res) => {
  // filters gun requests!
  if (Gun.serve(req, res)) {
    return
  }
  require('fs').createReadStream(require('path').join(__dirname, req.url)).on('error', function () {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(require('fs')
      .readFileSync(require('path')
        .join(__dirname, 'index.html')
      ))
  }).pipe(res)
})

const gun = Gun({
  file: 'data.json',
  web: server
})

// Sync everything
gun.on('out', { get: { '#': { '*': '' } } })

server.listen(port)

console.log('GUN server (unrestricted) started on port 8000')
console.log('Use CTRL + C to stop it')
