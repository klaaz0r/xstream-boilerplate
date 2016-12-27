import xs from 'xstream'
import delay from 'xstream/extra/delay'

import isolate from '@cycle/isolate'
import { div, h1, button, i } from '@cycle/dom'
import R from 'ramda'

function Landing (sources) {

  const defaults = {
    stats: {
      'paidAccounts': 91,
      'newAccounts': 0,
      'lastMonthRevenue': '78909.38',
      'currentRevenue': '3821.66',
      'projectedRevenue': '40771.08',
      'revenueDiff': -38138.3
    },
    sidebar: {
      visible: true
    }
  }

  const defaultReducer$ = xs.of(prevState => R.isNil(prevState) ? defaults : prevState)
  const toggleReducer$ = sources.DOM.select('.ui.left.attached.icon.button')
    .events('click')
    .map(e => prevState => {
      console.log('toggleReducer$', prevState)
      return { ...prevState, sidebar: { visible: !prevState.sidebar.visible } }
    })

  const request$ = xs.of({
    url: 'http://localhost:9091/v1/stats/finance',
    category: 'getFinanceStats',
    withCredentials: true
  })

  const route$ = xs.of('/landing')
    .compose(delay(3000))

  const getBody = R.prop('body')
  const stats$ = sources.HTTP.select('getFinanceStats')
    .flatten()
    .map(getBody)
    .startWith(defaults)
    .map(R.prop('stats'))
    .map(R.toPairs)

  const query$ = sources.HTTP.select('getFinanceStats')
    .flatten()
    .map(getBody)
    .map(R.prop('query'))

  const keyToLabel = R.pipe(R.replace(/[A-Z]/g, ',$&'), R.toUpper, R.split(','), R.join(' '))

  const renderStat = ([key, val]) => {
    console.log('RenderStat', key, val)
    return div('.center.aligned.column', [
      div('.ui.statistic', [
        div('.value', val), div('.label', keyToLabel(key))
      ])
    ])
  }

  const state$ = xs.combine(stats$, query$, sources.onion.state$)

  const vdom$ = state$.map(([stats, query, state]) => {
    console.log('Received render data, pairs', stats, query, state)
    return div('.finance.stats', [
      h1('.ui.inverted.centered.block.header', [
        button('.ui.left.attached.icon.button', [i('.menu.icon')]),
        `Finance Dashboard / ${query.fromDate} - ${query.toDate}`
      ]),
      div('.ui.doubling.five.column.page.grid', R.map(renderStat, stats))
    ])
  })

  return {
    DOM: vdom$,
    route$,
    HTTP: request$,
    onion: xs.merge(defaultReducer$, toggleReducer$)
  }
}

export default sources => isolate(Landing)(sources)
