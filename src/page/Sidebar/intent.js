import xs from 'xstream'

export default function SidebarIntent(sources) {
  const toggleAction$ = sources.DOM
    .select('.ui.orange.right.floating.label')
    .events('click')
    .map(e => ({ payload: e.target, type: 'toggleSidebar' }))

  const action$ = xs.merge(toggleAction$)
  return action$
}
