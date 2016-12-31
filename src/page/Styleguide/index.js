import xs from 'xstream'
import { div } from '@cycle/dom'
import R from 'ramda'
import button from './button'
import card from './card'
import input from './input'
import menu from './menu'
import site from './site'
import table from './table'
import isolate from '@cycle/isolate'

function Styleguide(sources) {

  const sinks = [ button, card, input, menu, site, table ].map(c => c(sources))
  const vdomSinks = R.pluck('DOM', sinks)
  const vdom$ = xs.combine(...vdomSinks)
    .map((styleguide) => div('.ui.container', styleguide))

  return {
    DOM: vdom$,
    onion: xs.of(() => ({}))
  }
}

export default sources => isolate(Styleguide)(sources)
