import { div } from '@cycle/dom'
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

  const vdom$ = objState$.map(state => {
    const { stats, sidebarVisible } = state
    console.log('Received render data, pairs', state, sidebarVisible)
    return div('.finance.stats', [
      div('.ui.doubling.five.column.page.grid', R.map(renderStat, R.toPairs(stats)))
    ])
  })

  return vdom$
}
