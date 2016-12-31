import xs from 'xstream'
import R from 'ramda'
export default function LandingIntent(sources) {
  const toggleAction$ = sources.DOM.select('.ui.left.attached.icon.button')
    .events('click')
    .map(e => ({ type: 'toggleSidebar', payload: e.target }))

  const requestAction$ = sources.HTTP.select('getFinanceStats')
    .flatten()
    .map(R.prop('body'))
    .debug(console.log.bind(console, 'getFinanceStats'))
    .map(body => ({ type: 'getFinanceStats', payload: body }))

  const action$ = xs.merge(toggleAction$, requestAction$)

  return action$
}
