import { div, h1, button, i } from '@cycle/dom'
import R from 'ramda'

export default function LandingView(state$, objState$) {

  const keyToLabel = R.pipe(R.replace(/[A-Z]/g, ',$&'), R.toUpper, R.split(','), R.join(' '))

  const renderStat = ([key, val]) => {
    console.log('RenderStat', key, val)
    return div('.center.aligned.column', [
      div('.ui.statistic', [
        div('.value', val), div('.label', keyToLabel(key))
      ])
    ])
  }

  const loading = div('.ui.center.aligned.page.grid', [
    div('.ui.active.inverted.dimmer', [
      div('.ui.text.loader', 'Loading')
    ])
  ])
  /* eslint-disable */
  debugger
  const vdom$ = objState$.map(state => {
    const { stats, query, sidebarVisible } = state
    console.log('Received render data, pairs', state, sidebarVisible)
    if (!query) {
      return loading
    }
    return div('.finance.stats', [
      h1('.ui.inverted.centered.block.header', [
        button('.ui.left.attached.icon.button', [i('.menu.icon')]),
        `Finance Dashboard / ${query.fromDate} - ${query.toDate}`
      ]),
      div('.ui.doubling.five.column.page.grid', R.map(renderStat, R.toPairs(stats)))
    ])
  })

  return vdom$
}
