const R = require('ramda')
const himalaya = require('himalaya')

module.exports = { parse }

function parse (html) {
  return R.pipe(
    parseHtml,
    removeType,
    createElement,
    R.head
  )(html)
}

const removeType = elem => R.pipe(
  // R.reject(removeText),
  R.map(e => e.children
    ? R.set(R.lensProp('children'), removeType(e.children), e)
    : R.set(R.lensProp('children'), [], e)
  )
)(elem)

const indenter = times => R.pipe(R.map(R.always(' ')), R.prepend('\n'), R.join(''))(R.range(0, times))

const createElement = (elements, indent = 0) => R.map(e => {
  if (e.type === 'Text') {
    return `'${e.content}'`
  }
  const plusTwo = R.add(2)
  const attributes = e.attributes ? makeAttributes(e.attributes) : ''
  const classes = e.attributes.className ? `'${mapStrings(e.attributes.className)}'` : ''
  const children = R.isEmpty(e.children) ? '' : `[${indenter(plusTwo(indent))}${createElement(e.children, plusTwo(indent))}${indenter(indent)}]`
  return `${indenter(indent)}${e.tagName}(${concatValues(indent, [classes, attributes, children])})`
})(elements)

const mapStrings = R.pipe(R.reduce((a, b) => `${a}.${b}`, ''))

const concatValues = (indent, values) => R.pipe(
  R.reject(R.isEmpty),
  R.reduce((a, b) => `${a}${b}, `, ''),
  R.dropLast(2)
)(values)

const makeAttributes = attributes => {
  const attrs = R.dissoc('className', attributes)
  return R.isEmpty(attrs) ? '' : `{ attr: { ${mapObjToString(attrs)} } }`
}

const mapObjToString = obj => R.pipe(
  R.mapObjIndexed((value, key) => `${key}: "${value}"`),
  R.values,
  R.join(', ')
)(obj)

const removeText = e => R.equals('Text', e.type)

const parseHtml = R.pipe(
  R.split('\n'),
  R.map(R.trim),
  R.join(''),
  himalaya.parse
)

const markup = `<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal image header">
      <img src="assets/images/logo.png" class="image">
      <div class="content">
        Log-in to your account
      </div>
    </h2>
    <form class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="email" placeholder="E-mail address">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="Password">
          </div>
        </div>
        <div class="ui fluid large teal submit button">Login</div>
      </div>

      <div class="ui error message"></div>

    </form>

    <div class="ui message">
      New to us? <a href="#">Sign Up</a>
    </div>
  </div>
</div>`

console.log(JSON.stringify(parseHtml(markup), false, 4))
console.log(parse(markup))
