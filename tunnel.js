const { writeFileSync } = require('fs')
const ngrok = require('ngrok')
const port = 8000

ngrok.connect(port, (error, url) => {
  if (error) {
    console.error(error)
  } else {
    console.log(url)
    const data = `const tunnelUrl = '${url}'`
    writeFileSync('www/tunnel-url.js', data, 'utf-8')
    console.log(`Tunnel opened on ${url}`)
    console.log('Use CTRL + C to close it')
  }
})
