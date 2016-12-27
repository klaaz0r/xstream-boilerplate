import xs from 'xstream'
import delay from 'xstream/extra/delay'

import isolate from '@cycle/isolate'
import model from './model'
import view from './view'
import intent from './intent'

function Landing (sources) {
  const route$ = xs.of('/landing')
    .compose(delay(3000))

  const request$ = xs.of({
    url: 'http://localhost:9091/v1/stats/finance',
    category: 'getFinanceStats',
    withCredentials: true
  })

  const state$ = sources.onion.state$
  const action$ = intent(sources)
  const { reducer$, sidebarReducer$ } = model(action$)
  const vdom$ = view(state$)

  return {
    DOM: vdom$,
    route$,
    HTTP: request$,
    onion: reducer$,
    sidebar: sidebarReducer$
  }
}

export default sources => isolate(Landing)(sources)
