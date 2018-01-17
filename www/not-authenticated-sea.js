localStorage.clear()
const url = new URL(window.location.href)
const publicKey = url.searchParams.get('key')

function init () {
  addListener(document.getElementById('gunForm'), 'submit', addLine)
}

const gun = Gun('http://localhost:8000/gun')

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
  gun.get(`pub/${publicKey}`).get('lines').map().val((value, index) => {
    const li = createLi(value)
    ul.appendChild(li)
  })
}

gun.get(`pub/${publicKey}`).get('lines').on(() => {
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
