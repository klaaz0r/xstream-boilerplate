import xs from 'xstream'
import delay from 'xstream/extra/delay'
import { isolateSink } from '../../../lib/osmosys'
// import { isolateSink } from 'cycle-onionify'

import isolate from '@cycle/isolate'
import model from './model'
import view from './view'
import intent from './intent'

function Landing (sources) {
  const route$ = xs.of('/finance')
    .compose(delay(1000))

  const request$ = xs.of({
    url: 'http://localhost:9091/v1/stats/finance',
    category: 'getFinanceStats',
    withCredentials: true
  })

  const state$ = sources.onion.state$
  /* eslint-disable */
  const selector = {
    sidebarVisible: 'sidebar.visible',
    query: 'query',
    stats: 'stats'
  }
  const objState = sources.onion.select(selector).state$

  const action$ = intent(sources)
  const { reducer$, sidebarReducer$ } = model(action$)
  const vdom$ = view(state$, objState)

  return {
    DOM: vdom$,
    route$,
    HTTP: request$,
    onion: reducer$,
    isolatedSinks: xs.merge(isolateSink(sidebarReducer$, 'sidebar'))
  }
}

export default sources => isolate(Landing)(sources)
