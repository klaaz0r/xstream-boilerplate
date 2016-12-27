import { div, a, i } from '@cycle/dom'

export default function SidebarView(state$) {
  const vdom$ = state$
    .map(state => state.visible)
    .map(visible => div(`.ui.left.vertical.inverted.labeled.icon.overlay.sidebar.menu`, { class: { visible } }, [
      a('.ui.orange.right.floating.label', '<'),
      a('.item', [i('.home.icon'), 'Financial Stats']),
      a('.item', [i('.sign.out.icon'), 'Logout'])
    ]))

  return vdom$
}
