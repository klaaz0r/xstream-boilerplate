import xs from 'xstream'

export default function NavigationIntent(sources) {
  const toggleAction$ = sources.DOM.select('.power.icon')
    .events('click')
    .map(e => ({ type: 'toggleSidebar', payload: e.target }))

  const action$ = xs.merge(toggleAction$)
  return action$
}
