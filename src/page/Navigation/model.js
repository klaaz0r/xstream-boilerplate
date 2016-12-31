import xs from 'xstream'
import { isNil } from 'ramda'

export default function SidebarModel(action$) {
  const defaultState = {
    loggedIn: true
  }
  const defaultReducer$ = xs.of(prevState => isNil(prevState) ? defaultState : prevState)

  const toggleReducer$ = action$
    .filter(a => a.type === 'toggleSidebar')
    .map(e => prevState => {
      const nextState = { ...prevState, sidebar: { visible: !prevState.sidebar.visible } }
      console.log('navigation toggle reducer', prevState, nextState)
      return nextState
    })

  const reducer$ = xs.merge(defaultReducer$, toggleReducer$)
  return reducer$
}
