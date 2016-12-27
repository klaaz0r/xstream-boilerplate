import xs from 'xstream'
import isolate from '@cycle/isolate'
import { div, h2, img, form, i, input, a } from '@cycle/dom'

/* Login page HTML
<div class='ui middle aligned center aligned grid'>
  <div class='column'>
    <h2 class='ui teal image header'>
      <img src='assets/images/logo.png' class='image'>
      <div class='content'>
        Log-in to your account
      </div>
    </h2>
    <form class='ui large form'>
      <div class='ui stacked segment'>
        <div class='field'>
          <div class='ui left icon input'>
            <i class='user icon'></i>
            <input type='text' name='email' placeholder='E-mail address'>
          </div>
        </div>
        <div class='field'>
          <div class='ui left icon input'>
            <i class='lock icon'></i>
            <input type='password' name='password' placeholder='Password'>
          </div>
        </div>
        <div class='ui fluid large teal submit button'>Login</div>
      </div>

      <div class='ui error message'></div>

    </form>

    <div class='ui message'>
      New to us? <a href='#'>Sign Up</a>
    </div>
  </div>
</div>
*/

function Login(sources) {
  return {
    DOM: xs.of(
      div('.ui.middle.aligned.center.aligned.three.column.page.grid', [
        div('.column', [
          h2('.ui.teal.image.header', [
            img('.image', { attr: { src: 'assets/images/logo.png' } }), div('.content', [
              'Log-in to your account'
            ])
          ]),
          form('.ui.large.form', [
            div('.ui.stacked.segment', [
              div('.field', [
                div('.ui.left.icon.input', [
                  i('.user.icon'),
                  input({ attr: { type: 'text', name: 'email', placeholder: 'E-mail address' } })
                ])
              ]),
              div('.field', [
                div('.ui.left.icon.input', [
                  i('.lock.icon'),
                  input({ attr: { type: 'password', name: 'password', placeholder: 'Password' } })
                ])
              ]),
              div('.ui.fluid.large.teal.submit.button', 'Login')
            ]),
            div('.ui.error.message')
          ]),
          div('.ui.message', [
            a('.request.access', { attr: { href: '#' } }, 'Request Access')
          ])
        ])
      ])
    )
  }
}

export default sources => isolate(Login)(sources)
