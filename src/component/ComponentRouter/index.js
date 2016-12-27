import dropRepeats from 'xstream/extra/dropRepeats'
import isolate from '@cycle/isolate'
import {div} from '@cycle/dom'
import {eqProps} from 'ramda'

import {requireSources, mergeFlatten} from 'util/index'

const equalPaths = eqProps('path')
const loading = div('.ui.center.aligned.page.grid', [
  div('.ui.active.inverted.dimmer', [
    div('.ui.text.loader', 'Loading')
  ])
])

const callComponent = sources => ({path, value}) => {
  const component = value({...sources, router: sources.router.path(path)})
  /* eslint-disable */
  return {
    ...component,
    DOM: component.DOM.startWith(loading)
  }
}

function ComponentRouter (sources) {
  requireSources('ComponentRouter', sources, 'routes$')

  const component$ = sources.routes$
    .map(routes => sources.router.define(routes)).flatten()
    .compose(dropRepeats(equalPaths)) // dont render the same page twice in a row
    .map(callComponent(sources))
    .remember()

  const sinks = {
    pluck: key => mergeFlatten(key, [component$]),
    DOM: mergeFlatten('DOM', [component$]),
    route$: mergeFlatten('route$', [component$]),
    HTTP: mergeFlatten('HTTP', [component$]),
    onion: mergeFlatten('onion', [component$]),
    sidebar: mergeFlatten('sidebar', [component$])
  }

  return sinks
}

export default sources => isolate(ComponentRouter)(sources)
