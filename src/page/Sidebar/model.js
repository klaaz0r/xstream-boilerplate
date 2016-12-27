import xs from 'xstream'
import { isNil } from 'ramda'

export default function SidebarModel(action$) {
  const defaultState = {
    visible: true
  }
  const defaultReducer$ = xs.of(prevState => isNil(prevState) ? defaultState : prevState)

  const toggleReducer$ = action$
    .filter(a => a.type === 'toggleSidebar')
    .map(action => prevState => ({ visible: !prevState.visible }))

  const reducer$ = xs.merge(defaultReducer$, toggleReducer$)
  return reducer$
}
