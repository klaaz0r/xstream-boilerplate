import xs from 'xstream'

import isolate from '@cycle/isolate'
import { div, i, p } from '@cycle/dom'

function Accordion (sources) {

  const vdom$ = xs.of(div('.ui.styled.accordion', [
    div('.active.title', [
      i('.dropdown.icon')
    ]),
    div('.active.content', [
      div('.accordion', [
        div('.active.title', [
          i('.dropdown.icon')
        ]),
        div('.active.content', [
          p(),
          div('.accordion', [
            div('.title', [
              i('.dropdown.icon')]),
            div('.content'),
            div('.title', [i('.dropdown.icon')]),
            div('.content')
          ])
        ]),
        div('.title', [i('.dropdown.icon')]),
        div('.content'),
        div('.title', [i('.dropdown.icon')]), div('.content')
      ])
    ]),
    div('.title', [
      i('.dropdown.icon')
    ]),
    div('.content', [
      p(), div('.accordion', [
        div('.active.title', [
          i('.dropdown.icon')
        ]),
        div('.active.content', [
          p(),
          div('.accordion', [
            div('.title', [
              i('.dropdown.icon')
            ]),
            div('.content'),
            div('.title', [
              i('.dropdown.icon')
            ]),
            div('.content')
          ])
        ]),
        div('.title', [
          i('.dropdown.icon')
        ]),
        div('.content'),
        div('.title', [
          i('.dropdown.icon')
        ]),
        div('.content')
      ])
    ])
  ])
)

  return {
    DOM: vdom$
  }
}

export default sources => isolate(Accordion)(sources)
