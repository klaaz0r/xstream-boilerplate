import xs from 'xstream'
import { div, input, i, a } from '@cycle/dom'

export default function Styleguide(sources) {

  const vdom$ = xs.of(div('.ui.two.column.stackable.grid', [

    div('.column', [

      div('.ui.action.left.icon.input', [

        i('.search.icon'),
        input({ attr: { type: 'text', placeholder: 'Search...' } }),
        div('.ui.teal.button', [
          'Search'
        ])
      ]),
      div('.ui.divider'),
      div('.ui.input.error', [

        input({ attr: { placeholder: 'Search...', type: 'text' } })
      ]),
      div('.ui.divider'),
      div('.ui.right.labeled.input', [

        input({ attr: { placeholder: 'Placeholder', type: 'text' } }),
        div('.ui.dropdown.label', [

          div('.text', [
            'Dropdown'
          ]),
          i('.dropdown.icon'),
          div('.menu', [

            div('.item', [
              'Choice 1'
            ]),
            div('.item', [
              'Choice 2'
            ]),
            div('.item', [
              'Choice 3'
            ])
          ])
        ])
      ]),
      div('.ui.divider'),
      div('.ui.transparent.icon.input', [

        input({ attr: { placeholder: 'Search...', type: 'text' } }),
        i('.search.icon')
      ]),
      div('.ui.transparent.left.icon.input', [

        input({ attr: { placeholder: 'Search...', type: 'text' } }),
        i('.search.icon')
      ]),
      div('.ui.divider'),
      div('.ui.left.icon.input.loading', [

        input({ attr: { placeholder: 'Loading...', type: 'text' } }),
        i('.search.icon')
      ]),
      div('.ui.icon.input.loading', [

        input({ attr: { placeholder: 'Loading...', type: 'text' } }),
        i('.search.icon')
      ])
    ]),
    div('.column', [

      div('.ui.right.labeled.left.icon.input', [

        i('.tags.icon'),
        input({ attr: { placeholder: 'Enter tags', type: 'text' } }),
        a('.ui.tag.label', [
          'Add Tag'
        ])
      ]),
      div('.ui.divider'),
      div('.ui.labeled.input', [

        a('.ui.label', [
          'Label'
        ]),
        input({ attr: { type: 'text', placeholder: 'Placeholder...' } })
      ]),
      div('.ui.divider'),
      div('.ui.right.labeled.input', [

        input({ attr: { type: 'text', placeholder: 'Placeholder...' } }),
        a('.ui.label', [
          'Label'
        ])
      ]),
      div('.ui.divider'),
      div('.ui.labeled.icon.input', [

        div('.ui.label', [
          'http://'
        ]),
        input({ attr: { type: 'text', placeholder: 'domain.com' } }),
        i('.add.circle.link.icon')
      ]),
      div('.ui.right.action.input', [

        input({ attr: { type: 'text', placeholder: 'domain.com' } }),
        div('.ui.teal.button', [

          i('.add.icon'), 'Add'
        ])
      ]),
      div('.ui.divider'),
      div('.ui.corner.labeled.input', [

        input({ attr: { type: 'text', placeholder: 'Required Field' } }),
        div('.ui.corner.label', [

          i('.asterisk.icon')
        ])
      ])
    ])
  ]))

  return {
    DOM: vdom$
  }
}
