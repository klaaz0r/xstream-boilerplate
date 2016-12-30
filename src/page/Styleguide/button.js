import xs from 'xstream'
import { div, button, i, span, img } from '@cycle/dom'

export default function Styleguide(sources) {

  const vdom$ = xs.of(div('.ui.stackable.equal.width.grid', [

    div('.column', [

      button('.ui.button', [
        'Default'
      ]),
      button('.ui.primary.button', [
        'Primary'
      ]),
      button('.ui.secondary.button', [
        'Secondary'
      ]),
      button('.ui.basic.button', [
        'Basic'
      ]),
      button('.ui.compact.button', [
        'Compact'
      ]),
      div('.ui.divider'),
      button('.ui.icon.button', [

        i('.heart.icon')
      ]),
      button('.ui.labeled.icon.button', [
        i('.heart.icon'),
        'Labeled'
      ]),
      button('.ui.right.labeled.icon.button', [
        i('.heart.icon'),
        'Labeled'
      ]),
      div('.ui.divider'),
      div('.ui.buttons', [

        button('.ui.button', [
          'Combo'
        ]),
        div('.ui.floating.dropdown.icon.button', [

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
      div('.ui.floating.search.dropdown.button', [

        span('.text', [
          'Search Dropdown'
        ]),
        div('.menu', [

          div('.item', [
            'Arabic'
          ]),
          div('.item', [
            'Chinese'
          ]),
          div('.item', [
            'Danish'
          ]),
          div('.item', [
            'Dutch'
          ]),
          div('.item', [
            'English'
          ]),
          div('.item', [
            'French'
          ]),
          div('.item', [
            'German'
          ]),
          div('.item', [
            'Greek'
          ]),
          div('.item', [
            'Hungarian'
          ]),
          div('.item', [
            'Italian'
          ]),
          div('.item', [
            'Japanese'
          ]),
          div('.item', [
            'Korean'
          ]),
          div('.item', [
            'Lithuanian'
          ]),
          div('.item', [
            'Persian'
          ]),
          div('.item', [
            'Polish'
          ]),
          div('.item', [
            'Portuguese'
          ]),
          div('.item', [
            'Russian'
          ]),
          div('.item', [
            'Spanish'
          ]),
          div('.item', [
            'Swedish'
          ]),
          div('.item', [
            'Turkish'
          ]),
          div('.item', [
            'Vietnamese'
          ])
        ])
      ]),
      div('.ui.divider'),
      div('.ui.animated.button', { attr: { tabindex: '0' } }, [

        div('.visible.content', [
          'Horizontal'
        ]),
        div('.hidden.content', [
          'Hidden'
        ])
      ]),
      div('.ui.vertical.animated.button', { attr: { tabindex: '0' } }, [

        div('.visible.content', [
          'Vertical'
        ]),
        div('.hidden.content', [
          'Hidden'
        ])
      ]),
      div('.ui.animated.fade.button', { attr: { tabindex: '0' } }, [

        div('.visible.content', [
          'Fade In'
        ]),
        div('.hidden.content', [
          'Hidden'
        ])
      ]),
      div('.ui.divider'),
      button('.ui.disabled.button', [
        'Disabled'
      ]),
      button('.ui.loading.button', [
        'Loading'
      ]),
      div('.ui.divider'),
      div('.ui.buttons', [

        button('.ui.button', [
          '1'
        ]),
        button('.ui.button', [
          '2'
        ]),
        button('.ui.button', [
          '3'
        ])
      ]),
      div('.ui.icon.buttons', [

        button('.ui.button', [

          i('.align.left.icon')
        ]),
        button('.ui.button', [

          i('.align.center.icon')
        ]),
        button('.ui.button', [

          i('.align.right.icon')
        ]),
        button('.ui.button', [

          i('.align.justify.icon')
        ])
      ]),
      div('.ui.buttons', [

        button('.ui.button', [
          '1'
        ]),
        div('.or'),
        button('.ui.button', [
          '2'
        ])
      ]),
      div('.ui.divider'),
      div('.ui.two.top.attached.buttons', [

        div('.ui.button', [
          'One'
        ]),
        div('.ui.button', [
          'Two'
        ])
      ]),
      div('.ui.attached.segment', [

        img('.ui.wireframe.image', { attr: { src: '../assets/images/wireframe/paragraph.png' } })
      ]),
      div('.ui.two.bottom.attached.buttons', [

        div('.ui.button', [
          'One'
        ]),
        div('.ui.button', [
          'Two'
        ])
      ])
    ]),
    div('.column', [
      button('.ui.mini.button', [
        'Mini'
      ]),
      button('.ui.tiny.button', [
        'Tiny'
      ]),
      button('.ui.small.button', [
        'Small'
      ]),
      button('.ui.large.button', [
        'Large'
      ]),
      button('.ui.big.button', [
        'Big'
      ]),
      button('.ui.huge.button', [
        'Huge'
      ]),
      button('.ui.massive.button', [
        'Massive'
      ]),
      div('.ui.divider'),
      div('.spaced', [

        button('.yellow.ui.button', [
          'Yellow'
        ]),
        button('.orange.ui.button', [
          'Orange'
        ]),
        button('.green.ui.button', [
          'Green'
        ]),
        button('.teal.ui.button', [
          'Teal'
        ]),
        button('.blue.ui.button', [
          'Blue'
        ]),
        button('.purple.ui.button', [
          'Purple'
        ]),
        button('.pink.ui.button', [
          'Pink'
        ]),
        button('.red.ui.button', [
          'Red'
        ]),
        button('.black.ui.button', [
          'Black'
        ])
      ]),
      div('.ui.divider'),
      div('.ui.inverted.segment', [

        button('.ui.inverted.button', [
          'Inverted'
        ]),
        button('.ui.inverted.basic.button', [
          'Basic'
        ]),
        button('.ui.inverted.blue.button', [
          'Colored'
        ]),
        button('.ui.inverted.blue.basic.button', [
          'Basic Colored'
        ])
      ])
    ])
  ]))

  return {
    DOM: vdom$
  }
}
