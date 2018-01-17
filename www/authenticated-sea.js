localStorage.clear()

function init () {
  addListener(document.getElementById('loginForm'), 'submit', doLogin)
  addListener(document.getElementById('gunForm'), 'submit', addLine)
  addListener(document.getElementById('logoutButton'), 'click', doLogout)
}

const gun = Gun(`http://localhost:8000/gun`)
const user = gun.user()

function hideLogin () {
  const login = document.getElementById('loginWrapper')
  const authed = document.getElementById('authed')
  const userField = document.getElementById('userField')
  const passField = document.getElementById('passField')
  userField.value = ''
  passField.value = ''
  login.style.visibility = 'hidden'
  authed.style.visibility = ''
}

function doLogin (e) {
  e.preventDefault()
  const userField = document.getElementById('userField')
  const passField = document.getElementById('passField')
  user.auth(userField.value, passField.value, data => {
    if (data.err && /No user/.test(data.err) === true) {
      console.log('creating user')
      user.create(userField.value, passField.value, ack => {
        if (ack.err) {
          return
        }
        login({user: userField.value, pass: passField.value})
      })
    } else {
      write(data)
    }
  })
}

function doLogout (e) {
  e.preventDefault()
  user.leave()
  const login = document.getElementById('loginWrapper')
  const authed = document.getElementById('authed')
  login.style.visibility = ''
  authed.style.visibility = 'hidden'
  localStorage.clear()
}

function login (data) {
	console.log("login...")
	user.auth(data.user, data.pass, write)
}

function write (data) {
  user.get('lines').set('ready')
  generateUnauthLink(data.pub)
}

function generateUnauthLink (key) {
  const p = document.getElementById('unauthed')
  p.innerHTML = `<a href="http://localhost:4000?key=${key}" target="_blank">Visit the unathenticated site</a>`
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
  hideLogin()
})

function ready (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(init)
