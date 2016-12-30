import xs from 'xstream'
import { div, h1, h2, h3, h4, h5, p, small, a, strong, abbr, em } from '@cycle/dom'

export default function Styleguide(sources) {

  const vdom$ = xs.of(div('.ui.three.column.stackable.grid', [
    div('.column', [
      h1([
        'Heading 1'
      ]),
      h2([
        'Heading 2'
      ]),
      h3([
        'Heading 3'
      ]),
      h4([
        'Heading 4'
      ]),
      h5([
        'Heading 5'
      ]),
      p([
        'Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.'
      ])
    ]),
    div('.column', [
      h2([
        'Example body text'
      ]),
      p([
        'Nullam quis risus eget ',
        a({ attr: { href: '#' } }, [
          'urna mollis ornare'
        ]), ' vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.'
      ]),
      p([
        small([
          'This line of text is meant to be treated as fine print.'
        ])
      ]),
      p([
        'The following snippet of text is ',
        strong([
          'rendered as bold text'
        ]), '.'
      ]),
      p([
        'The following snippet of text is ',
        em([
          'rendered as italicized text'
        ]), '.'
      ]),
      p([
        'An abbreviation of the word attribute is ',
        abbr({ attr: { title: 'attribute' } }, [
          'attr'
        ]), '.'
      ])
    ]),
    div('.column', [
      div('.ui.three.column.stackable.padded.middle.aligned.centered.color.grid', [
        div('.red.column', [
          'Red'
        ]),
        div('.orange.column', [
          'Orange'
        ]),
        div('.yellow.column', [
          'Yellow'
        ]),
        div('.olive.column', [
          'Olive'
        ]),
        div('.green.column', [
          'Green'
        ]),
        div('.teal.column', [
          'Teal'
        ]),
        div('.blue.column', [
          'Blue'
        ]),
        div('.violet.column', [
          'Violet'
        ]),
        div('.purple.column', [
          'Purple'
        ]),
        div('.pink.column', [
          'Pink'
        ]),
        div('.brown.column', [
          'Brown'
        ]),
        div('.grey.column', [
          'Grey'
        ]),
        div('.black.column', [
          'Black'
        ])
      ])
    ])
  ]))

  return {
    DOM: vdom$
  }
}
