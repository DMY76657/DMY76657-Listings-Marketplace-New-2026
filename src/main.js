import './styles/app.css'

import { renderIndex } from './pages/index'
import { renderLogin } from './pages/login'
import { renderRegister } from './pages/register'

const root = document.querySelector('#app')
const page = root?.dataset?.page

const routes = {
  index: renderIndex,
  login: renderLogin,
  register: renderRegister,
}

const render = routes[page]

if (!render) {
  root.innerHTML = `
    <h1 class="h4">Page not wired</h1>
    <p class="text-muted">No handler for data-page="${page}".</p>
  `
} else {
  render(root)
}
