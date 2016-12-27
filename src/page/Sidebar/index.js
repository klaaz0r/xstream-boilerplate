import isolate from '@cycle/isolate'
import model from './model'
import view from './view'
import intent from './intent'

function Sidebar(sources) {
  const state$ = sources.onion.state$
  const action$ = intent(sources)
  const reducer$ = model(action$)
  const vdom$ = view(state$)

  return {
    DOM: vdom$,
    onion: reducer$,
    action$
  }
}

export default sources => isolate(Sidebar, 'sidebar')(sources)
