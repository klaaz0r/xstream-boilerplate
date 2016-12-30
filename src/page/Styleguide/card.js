import xs from 'xstream'
import { div, i, span, img, a } from '@cycle/dom'

export default function Styleguide(sources) {

  const vdom$ = xs.of(div('.ui.four.cards', [

    div('.ui.card', [

      div('.image', [

        div('.ui.blurring.inverted.dimmer', [

          div('.content', [

            div('.center', [

              div('.ui.teal.button', [
                'Add Friend'
              ])
            ])
          ])
        ]),
        img({ attr: { src: '../assets/images/wireframe/image.png' } })
      ]),
      div('.content', [

        div('.header', [
          'Title'
        ]),
        div('.meta', [

          a('.group', [
            'Meta'
          ])
        ]),
        div('.description', [
          'One or two sentence description that may go to several lines'
        ])
      ]),
      div('.extra.content', [

        a('.right.floated.created', [
          'Arbitrary'
        ]),
        a('.friends', [
          'Arbitrary'
        ])
      ])
    ]),
    div('.ui.card', [

      div('.blurring.dimmable.image', [

        div('.ui.dimmer', [

          div('.content', [

            div('.center', [

              div('.ui.inverted.button', [
                'Call to Action'
              ])
            ])
          ])
        ]),
        img({ attr: { src: '../assets/images/wireframe/image.png' } })
      ]),
      div('.content', [

        a('.header', [
          'Name'
        ]),
        div('.meta', [

          span('.date', [
            'Date'
          ])
        ])
      ]),
      div('.extra.content', [

        a([

          i('.users.icon'), 'Users'
        ])
      ])
    ]),
    div('.ui.card', [

      div('.ui.slide.right.reveal.image', [

        div('.visible.content', [

          img('.ui.fluid.image', { attr: { src: '../assets/images/avatar/nan.jpg' } })
        ]),
        div('.hidden.content', [

          img('.ui.fluid.image', { attr: { src: '../assets/images/avatar/tom.jpg' } })
        ])
      ]),
      div('.content', [

        img('.ui.wireframe.image', { attr: { src: '../assets/images/wireframe/paragraph.png' } })
      ])
    ]),
    div('.ui.card', [

      div('.ui.move.reveal.image', [

        div('.visible.content', [

          img('.ui.fluid.image', { attr: { src: '../assets/images/avatar/tom.jpg' } })
        ]),
        div('.hidden.content', [

          img('.ui.fluid.image', { attr: { src: '../assets/images/avatar/nan.jpg' } })
        ])
      ]),
      div('.content', [

        img('.ui.wireframe.image', { attr: { src: '../assets/images/wireframe/paragraph.png' } })
      ])
    ])
  ]))

  return {
    DOM: vdom$
  }
}
