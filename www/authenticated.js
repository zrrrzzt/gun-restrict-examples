localStorage.clear()

function init () {
  addListener(document.getElementById('gunForm'), 'submit', addLine)
}

Gun.on('opt', function (ctx) {
  if (ctx.once) {
    return
  }
  ctx.on('out', function (msg) {
    var to = this.to
    // Adds headers for put
    msg.headers = {
      token: 'thisIsTheTokenForReals'
    }
    to.next(msg) // pass to next middleware
  })
})

const gun = Gun(`http://localhost:8000/gun`)

function addListener (element, type, func) {
  element.removeEventListener(type, func)
  element.addEventListener(type, func)
}

function addLine (e) {
  e.preventDefault()
  const field = document.getElementById('gunField')
  gun.get('lines').set(field.value)
  field.value = ''
}

function createLi (data) {
  const li = document.createElement('li')
  li.innerHTML = data
  return li
}

function updateLines () {
  const ul = document.getElementById('gunList')
  ul.innerHTML = ''
  gun.get('lines').map().val((value, index) => {
    const li = createLi(value)
    ul.appendChild(li)
  })
}

gun.get('lines').on(line => {
  updateLines()
}, true)

function ready (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(init)
