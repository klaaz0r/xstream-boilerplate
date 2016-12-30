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
  R.mapObjIndexed((value, key) => `${key}: '${value}'`),
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

const markup = `<div class="ui menu">
  <div class="header item">Brand</div>
  <a class="active item">Link</a>
  <a class="item">Link</a>
  <div class="ui dropdown item">
    Dropdown
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item">Action</div>
      <div class="item">Another Action</div>
      <div class="item">Something else here</div>
      <div class="divider"></div>
      <div class="item">Separated Link</div>
      <div class="divider"></div>
      <div class="item">One more separated link</div>
    </div>
  </div>
  <div class="right menu">
    <div class="item">
      <div class="ui action left icon input">
        <i class="search icon"></i>
        <input type="text" placeholder="Search">
        <button class="ui button">Submit</button>
      </div>
    </div>
    <a class="item">Link</a>
  </div>
</div>

<div class="ui inverted menu">
  <div class="header item">Brand</div>
  <div class="active item">Link</div>
  <a class="item">Link</a>
  <div class="ui dropdown item">
    Dropdown
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item">Action</div>
      <div class="item">Another Action</div>
      <div class="item">Something else here</div>
      <div class="divider"></div>
      <div class="item">Separated Link</div>
      <div class="divider"></div>
      <div class="item">One more separated link</div>
    </div>
  </div>
  <div class="right menu">
    <div class="item">
      <div class="ui transparent inverted icon input">
        <i class="search icon"></i>
        <input type="text" placeholder="Search">
      </div>
    </div>
    <a class="item">Link</a>
  </div>
</div>

<div class="ui secondary menu">
  <div class="active item">Link</div>
  <a class="item">Link</a>
  <div class="ui dropdown item">
    Dropdown
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item">Action</div>
      <div class="item">Another Action</div>
      <div class="item">Something else here</div>
      <div class="divider"></div>
      <div class="item">Separated Link</div>
      <div class="divider"></div>
      <div class="item">One more separated link</div>
    </div>
  </div>
  <div class="right menu">
    <div class="item">
      <div class="ui action left icon input">
        <i class="search icon"></i>
        <input type="text" placeholder="Search">
        <button class="ui button">Submit</button>
      </div>
    </div>
    <a class="item">Link</a>
  </div>
</div>

<div class="ui three column doubling grid">
  <div class="column">
    <div class="ui secondary pointing menu">
      <div class="active item">Link</div>
      <a class="item">Link</a>
      <a class="item">Link</a>
    </div>
  </div>

  <div class="column">
    <div class="ui tabular menu">
      <div class="active item">Link</div>
      <a class="item">Link</a>
      <a class="item">Link</a>
    </div>
  </div>

  <div class="column">
    <div class="ui pointing menu">
      <div class="active item">Link</div>
      <a class="item">Link</a>
      <div class="right item">
        Right Text
      </div>
    </div>
  </div>
</div>`

console.log(JSON.stringify(parseHtml(markup), false, 4))
console.log(parse(markup))
