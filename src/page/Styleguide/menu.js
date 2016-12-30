import xs from 'xstream'
import { div, i, a, input, button } from '@cycle/dom'

export default function Styleguide(sources) {

  const vdom$ = xs.of(div('.ui.menu', [

    div('.header.item', [
      'Brand'
    ]),
    a('.active.item', [
      'Link'
    ]),
    a('.item', [
      'Link'
    ]),
    div('.ui.dropdown.item', [
      'Dropdown',
      i('.dropdown.icon'),
      div('.menu', [

        div('.item', [
          'Action'
        ]),
        div('.item', [
          'Another Action'
        ]),
        div('.item', [
          'Something else here'
        ]),
        div('.divider'),
        div('.item', [
          'Separated Link'
        ]),
        div('.divider'),
        div('.item', [
          'One more separated link'
        ])
      ])
    ]),
    div('.right.menu', [

      div('.item', [

        div('.ui.action.left.icon.input', [

          i('.search.icon'),
          input({ attr: { type: 'text', placeholder: 'Search' } }),
          button('.ui.button', [
            'Submit'
          ])
        ])
      ]),
      a('.item', [
        'Link'
      ])
    ])
  ]))

  return {
    DOM: vdom$
  }
}
