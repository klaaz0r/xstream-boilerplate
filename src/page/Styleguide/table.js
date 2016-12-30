import xs from 'xstream'
import { div, table, thead, th, td, tr, tbody } from '@cycle/dom'

export default function Styleguide(sources) {

  const vdom$ = xs.of(div('.ui.two.column.relaxed.grid', [

    div('.column', [

      table('.ui.right.aligned.table', [

        thead([

          th('.left.aligned', [
            'Person'
          ]),
          th([
            'Calories'
          ]),
          th([
            'Fat'
          ]),
          th([
            'Protein'
          ])
        ]),
        tbody([

          tr([

            td('.left.aligned', [
              'Delmar'
            ]),
            td([
              '36'
            ]),
            td([
              '36g'
            ]),
            td([
              '2g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Louise'
            ]),
            td([
              '24'
            ]),
            td([
              '24g'
            ]),
            td([
              '29g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Terrell'
            ]),
            td([
              '22'
            ]),
            td([
              '11g'
            ]),
            td([
              '9g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Marion'
            ]),
            td([
              '7'
            ]),
            td([
              '35g'
            ]),
            td([
              '3g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Clayton'
            ]),
            td([
              '7'
            ]),
            td([
              '38g'
            ]),
            td([
              '20g'
            ])
          ])
        ])
      ])
    ]),
    div('.column', [

      table('.ui.right.aligned.celled.table', [

        thead([

          th('.left.aligned', [
            'Person'
          ]),
          th([
            'Calories'
          ]),
          th([
            'Fat'
          ]),
          th([
            'Protein'
          ])
        ]),
        tbody([

          tr([

            td('.left.aligned', [
              'Drema'
            ]),
            td('.positive', [
              '15'
            ]),
            td('.negative', [
              '26g'
            ]),
            td('.warning', [
              '8g'
            ])
          ]),
          tr('.positive', [

            td('.left.aligned', [
              'Nona'
            ]),
            td([
              '11'
            ]),
            td([
              '21g'
            ]),
            td([
              '16g'
            ])
          ]),
          tr('.negative', [

            td('.left.aligned', [
              'Isidra'
            ]),
            td([
              '34'
            ]),
            td([
              '43g'
            ]),
            td([
              '11g'
            ])
          ]),
          tr('.warning', [

            td('.left.aligned', [
              'Bart'
            ]),
            td([
              '41'
            ]),
            td([
              '40g'
            ]),
            td([
              '30g'
            ])
          ]),
          tr('.selected', [

            td('.left.aligned', [
              'Nguyet'
            ]),
            td([
              '41'
            ]),
            td([
              '44g'
            ]),
            td([
              '28g'
            ])
          ])
        ])
      ])
    ]),
    div('.column', [

      table('.ui.basic.right.aligned.table', [

        thead([

          th('.left.aligned', [
            'Person'
          ]),
          th([
            'Calories'
          ]),
          th([
            'Fat'
          ]),
          th([
            'Protein'
          ])
        ]),
        tbody([

          tr([

            td('.left.aligned', [
              'Mirna'
            ]),
            td([
              '1'
            ]),
            td([
              '28g'
            ]),
            td([
              '29g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Fernando'
            ]),
            td([
              '38'
            ]),
            td([
              '2g'
            ]),
            td([
              '48g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Lisette'
            ]),
            td([
              '18'
            ]),
            td([
              '9g'
            ]),
            td([
              '23g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Ahmad'
            ]),
            td([
              '42'
            ]),
            td([
              '26g'
            ]),
            td([
              '49g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Laquanda'
            ]),
            td([
              '27'
            ]),
            td([
              '27g'
            ]),
            td([
              '49g'
            ])
          ])
        ])
      ])
    ]),
    div('.column', [

      table('.ui.very.basic.right.aligned.table', [

        thead([

          th('.left.aligned', [
            'Person'
          ]),
          th([
            'Calories'
          ]),
          th([
            'Fat'
          ]),
          th([
            'Protein'
          ])
        ]),
        tbody([

          tr([

            td('.left.aligned', [
              'Drema'
            ]),
            td([
              '15'
            ]),
            td([
              '26g'
            ]),
            td([
              '8g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Nona'
            ]),
            td([
              '11'
            ]),
            td([
              '21g'
            ]),
            td([
              '16g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Isidra'
            ]),
            td([
              '34'
            ]),
            td([
              '43g'
            ]),
            td([
              '11g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Bart'
            ]),
            td([
              '41'
            ]),
            td([
              '40g'
            ]),
            td([
              '30g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Nguyet'
            ]),
            td([
              '41'
            ]),
            td([
              '44g'
            ]),
            td([
              '28g'
            ])
          ])
        ])
      ])
    ]),
    div('.column', [

      table('.ui.celled.selectable.right.aligned.table', [

        thead([

          th('.left.aligned', [
            'Person'
          ]),
          th([
            'Calories'
          ]),
          th([
            'Fat'
          ]),
          th([
            'Protein'
          ])
        ]),
        tbody([

          tr([

            td('.left.aligned', [
              'Tasia'
            ]),
            td([
              '12'
            ]),
            td([
              '7g'
            ]),
            td([
              '21g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Ronnie'
            ]),
            td([
              '38'
            ]),
            td([
              '37g'
            ]),
            td([
              '38g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Gabriel'
            ]),
            td([
              '30'
            ]),
            td([
              '46g'
            ]),
            td([
              '46g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Logan'
            ]),
            td([
              '12'
            ]),
            td([
              '21g'
            ]),
            td([
              '39g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Clare'
            ]),
            td([
              '39'
            ]),
            td([
              '41g'
            ]),
            td([
              '2g'
            ])
          ])
        ])
      ])
    ]),
    div('.column', [

      table('.ui.striped.right.aligned.table', [

        thead([

          th('.left.aligned', [
            'Person'
          ]),
          th([
            'Calories'
          ]),
          th([
            'Fat'
          ]),
          th([
            'Protein'
          ])
        ]),
        tbody([

          tr([

            td('.left.aligned', [
              'Rosaline'
            ]),
            td([
              '5'
            ]),
            td([
              '35g'
            ]),
            td([
              '6g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Barrie'
            ]),
            td([
              '27'
            ]),
            td([
              '23g'
            ]),
            td([
              '28g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Trinidad'
            ]),
            td([
              '14'
            ]),
            td([
              '50g'
            ]),
            td([
              '7g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Jaqueline'
            ]),
            td([
              '31'
            ]),
            td([
              '30g'
            ]),
            td([
              '50g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Tamala'
            ]),
            td([
              '18'
            ]),
            td([
              '6g'
            ]),
            td([
              '13g'
            ])
          ])
        ])
      ])
    ]),
    div('.column', [

      table('.ui.padded.celled.right.aligned.table', [

        thead([

          th('.left.aligned', [
            'Person'
          ]),
          th([
            'Calories'
          ]),
          th([
            'Fat'
          ]),
          th([
            'Protein'
          ])
        ]),
        tbody([

          tr([

            td('.left.aligned', [
              'Lianne'
            ]),
            td([
              '23'
            ]),
            td([
              '32g'
            ]),
            td([
              '43g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Joette'
            ]),
            td([
              '21'
            ]),
            td([
              '13g'
            ]),
            td([
              '31g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Le'
            ]),
            td([
              '28'
            ]),
            td([
              '39g'
            ]),
            td([
              '23g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Sacha'
            ]),
            td([
              '46'
            ]),
            td([
              '43g'
            ]),
            td([
              '13g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Bruna'
            ]),
            td([
              '9'
            ]),
            td([
              '47g'
            ]),
            td([
              '12g'
            ])
          ])
        ])
      ])
    ]),
    div('.column', [

      table('.ui.definition.celled.right.aligned.table', [

        thead([

          th(),
          th([
            'Calories'
          ]),
          th([
            'Fat'
          ]),
          th([
            'Protein'
          ])
        ]),
        tbody([

          tr([

            td('.left.aligned', [
              'Lianne'
            ]),
            td([
              '23'
            ]),
            td([
              '32g'
            ]),
            td([
              '43g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Joette'
            ]),
            td([
              '21'
            ]),
            td([
              '13g'
            ]),
            td([
              '31g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Le'
            ]),
            td([
              '28'
            ]),
            td([
              '39g'
            ]),
            td([
              '23g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Sacha'
            ]),
            td([
              '46'
            ]),
            td([
              '43g'
            ]),
            td([
              '13g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Bruna'
            ]),
            td([
              '9'
            ]),
            td([
              '47g'
            ]),
            td([
              '12g'
            ])
          ])
        ])
      ])
    ]),
    div('.column', [

      table('.ui.inverted.right.aligned.table', [

        thead([

          th('.left.aligned', [
            'Person'
          ]),
          th([
            'Calories'
          ]),
          th([
            'Fat'
          ]),
          th([
            'Protein'
          ])
        ]),
        tbody([

          tr([

            td('.left.aligned', [
              'Lianne'
            ]),
            td([
              '23'
            ]),
            td([
              '32g'
            ]),
            td([
              '43g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Joette'
            ]),
            td([
              '21'
            ]),
            td([
              '13g'
            ]),
            td([
              '31g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Le'
            ]),
            td([
              '28'
            ]),
            td([
              '39g'
            ]),
            td([
              '23g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Sacha'
            ]),
            td([
              '46'
            ]),
            td([
              '43g'
            ]),
            td([
              '13g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Bruna'
            ]),
            td([
              '9'
            ]),
            td([
              '47g'
            ]),
            td([
              '12g'
            ])
          ])
        ])
      ])
    ]),
    div('.column', [

      table('.ui.inverted.blue.selectable.celled.right.aligned.table', [

        thead([

          th('.left.aligned', [
            'Person'
          ]),
          th([
            'Calories'
          ]),
          th([
            'Fat'
          ]),
          th([
            'Protein'
          ])
        ]),
        tbody([

          tr([

            td('.left.aligned', [
              'Lianne'
            ]),
            td([
              '23'
            ]),
            td([
              '32g'
            ]),
            td([
              '43g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Joette'
            ]),
            td([
              '21'
            ]),
            td([
              '13g'
            ]),
            td([
              '31g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Le'
            ]),
            td([
              '28'
            ]),
            td([
              '39g'
            ]),
            td([
              '23g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Sacha'
            ]),
            td([
              '46'
            ]),
            td([
              '43g'
            ]),
            td([
              '13g'
            ])
          ]),
          tr([

            td('.left.aligned', [
              'Bruna'
            ]),
            td([
              '9'
            ]),
            td([
              '47g'
            ]),
            td([
              '12g'
            ])
          ])
        ])
      ])
    ])
  ]))

  return {
    DOM: vdom$
  }
}
