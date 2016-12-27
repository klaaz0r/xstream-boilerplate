// import xs from 'xstream'

export default function LandingModel(action$) {

  const toggleReducer$ = action$
    .filter(a => a.type === 'toggleSidebar')
    .map(e => prevState => {
      const nextState = { ...prevState, visible: !prevState.visible }
      console.log('header toggle reducer', prevState, nextState)
      return nextState
    })

  const getStatsReducer$ = action$
    .filter(a => a.type === 'getFinanceStats')
    .map(result => result.payload)
    .map(payload => prevState => ({ ...prevState, ...payload }))

  return { reducer$: getStatsReducer$, sidebarReducer$: toggleReducer$ }
}
