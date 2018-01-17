localStorage.clear()

function init () {
  addListener(document.getElementById('gunForm'), 'submit', addLine)
}

const gun = Gun(`http://localhost:8000/gun`)
const user = gun.user()

user.create('alice', 'asdf', login)

function login(ack){
	console.log("login...")
	user.auth('alice', 'asdf', write)
}

function write (data) {
  user.get('lines').set('ready')
  generateUnauthLink(data.pub)
}

function generateUnauthLink (key) {
  const p = document.getElementById('unauthed')
  p.innerHTML = `<a href="http://localhost:4000?key=${key}" target="_blank">press me</a>`
}

function addListener (element, type, func) {
  element.removeEventListener(type, func)
  element.addEventListener(type, func)
}

function addLine (e) {
  e.preventDefault()
  const field = document.getElementById('gunField')
  user.get('lines').set(field.value)
  field.value = ''
}

function createLi (data) {
  const li = document.createElement('li')
  li.innerHTML = data
  return li
}

function updateLines () {
  console.log('updateLines')
  const ul = document.getElementById('gunList')
  ul.innerHTML = ''
  user.get('lines').map().val((value, index) => {
    const li = createLi(value)
    ul.appendChild(li)
  })
}

gun.on('auth', () => {
  updateLines()
})

function ready (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(init)
