import { div, i, input, button } from '@cycle/dom'

export default function NavigationView(state$) {
  const vdom$ = state$
    .debug(console.log.bind(console, 'Navigation state'))
    .map(state => div('.ui.menu', [
      div('.right.menu', [
        div('.item', [
          div('.ui.action.left.icon.input', [
            i('.search.icon'),
            input(),
            button('.ui.button', [
              'Submit'
            ])
          ])
        ]),
        button('#openMenu .ui.circular.icon.button', [i('.inverted.circular.power.icon')])
      ])
    ]))

  return vdom$
}
