import 'normalize-css'

// Globals
import xs from 'xstream'
import { div } from '@cycle/dom'
import { isolateSink } from 'cycle-onionify'

// Pages
import Landing from './Landing'
import Login from './Login'
import Sidebar from './Sidebar'

// Components
import ComponentRouter from 'component/ComponentRouter'

const routes = {
  '/': Landing,
  '/login': Login
}

export default function main (sources) {
  const page = ComponentRouter({...sources, routes$: xs.of(routes)})
  const sidebar = Sidebar(sources)

  const vdom$ = xs.combine(sidebar.DOM, page.DOM).map(([sidebarVdom, pageVdom]) => div('.main', [sidebarVdom, pageVdom]))

  const initialReducer$ = xs.of(() => ({ query: {}, loggedIn: true, stats: {}, sidebar: { visible: true } }))
  const reducer$ = xs.merge(initialReducer$, sidebar.onion, page.onion, isolateSink(page.sidebar, 'sidebar'))

  return {
    DOM: vdom$,
    router: page.route$,
    HTTP: page.HTTP,
    onion: reducer$
  }
}
