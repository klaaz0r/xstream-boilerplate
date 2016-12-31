import 'normalize-css'

// Globals
import { pluck } from 'ramda'
import xs from 'xstream'
import { div } from '@cycle/dom'

// Snippets
import Sidebar from './Sidebar'
import Navigation from './Navigation'

// Pages
import FinanceStats from './FinanceStats'
import Login from './Login'
import Styleguide from './Styleguide'

// Components
import ComponentRouter from 'component/ComponentRouter'

const routes = {
  '/': Styleguide,
  '/finance': FinanceStats,
  '/login': Login,
  '/styleguide': Styleguide
}

export default function main (sources) {
  const page = ComponentRouter({...sources, routes$: xs.of(routes)})
  const sidebar = Sidebar(sources)
  const navigation = Navigation(sources)

  const domSinks = pluck('DOM', [navigation, sidebar, page])

  const vdom$ = xs.combine(...domSinks).map(
    ([navigationVdom, sidebarVdom, pageVdom]) => div('.container', [
      navigationVdom,
      sidebarVdom,
      pageVdom
    ])
  )

  const initialReducer$ = xs.of(() => ({ loggedIn: true }))
  const reducer$ = xs.merge(initialReducer$, sidebar.onion, page.onion, page.isolatedSinks, navigation.onion)

  return {
    DOM: vdom$,
    router: page.route$,
    HTTP: page.HTTP,
    onion: reducer$
  }
}
