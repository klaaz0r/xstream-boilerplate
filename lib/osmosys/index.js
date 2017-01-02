import xs from 'xstream'
import dropRepeats from 'xstream/extra/dropRepeats'
import { __, always, equals, ifElse, is, isNil, keys, lensIndex, lensPath, map, remove, set, split, values, view, zipObj } from 'ramda'

export function pick(selector) {
  function pickWithString(sinksArray$) {
    return sinksArray$.map(sinksArray => sinksArray.map(sinks => sinks[selector]))
  }
  function pickWithFunction(sinksArray$) {
    return sinksArray$.map(sinksArray => sinksArray.map(selector))
  }
  return ifElse(is(String), () => pickWithString, pickWithFunction)
}

export function mix(aggregator) {
  return function mixOperator(streamArray$) {
    return streamArray$
      .map(streamArray => aggregator(...streamArray))
      .flatten()
  }
}

function isUnnamedIsolation(path) {
  return /cycle\d/.test(path)
}

function getStateSlice(path, state) {
  return isUnnamedIsolation(path) ? state : view(lensPath(split('.', path)), state)
}

export function isolateSource(source, path) {
  return source.select(path)
}

function updateArrayEntry(array, index, reducer) {
  const indexLens = lensIndex(index)
  const prevValue = view(indexLens, array)
  const newValue = reducer(prevValue)
  const setEntry = set(indexLens, __, array)
  const removeEntry = () => remove(index, 1, array)
  const setOrRemove = ifElse(isNil, removeEntry, setEntry)
  const updateEntry = ifElse(equals(prevValue), always(array), setOrRemove)

  return updateEntry(newValue)
}

export function isolateSink(reducer$, path) {
  return reducer$.map(reducer => prevState => {
    const index = parseInt(path)
    if (Array.isArray(prevState) && typeof index === 'number') {
      return updateArrayEntry(prevState, index, reducer)
    } else if (typeof prevState === 'undefined') {
      return isUnnamedIsolation(path) ? reducer(null) : {[path]: reducer(null)}
    } else {
      const prevValue = getStateSlice(path, prevState)
      const nextValue = reducer(prevValue)
      if (prevValue === nextValue) {
        return prevState
      } else {
        return isUnnamedIsolation(path) ? Object.assign({}, prevState, nextValue) : Object.assign({}, prevState, {[path]: nextValue})
      }
    }
  })
}

class Osmosys {
  constructor(stream, path) {
    this._path = path
    this.state$ = stream.remember()
    if (!path) {
      return
    }
    this.state$._isCycleSource = path
  }

  select(path) {
    if (!path) {
      return this.state$
    }
    const getStateObject = this.getStateObject.bind(this)
    const getState = this.getState.bind(this)
    return ifElse(is(Object), getStateObject, getState)(path)
  }

  getState(path) {
    return new Osmosys(
      this.state$.map(state => getStateSlice(path, state))
    )
  }

  getStateObject(pathObject) {
    const pathKeys = keys(pathObject)
    const paths = values(pathObject)
    return new Osmosys(
      this.state$.map(
        state => zipObj(pathKeys, map(path => getStateSlice(path, state), paths))
      )
    )
  }
}

// cycle-isolate uses these functions to isolate sinks and source
Osmosys.prototype.isolateSource = isolateSource
Osmosys.prototype.isolateSink = isolateSink

export default function osmosify(main, name = 'onion') {
  return function augmentedMain(sources) {
    const reducerMimic$ = xs.create()
    const state$ = reducerMimic$
      .fold((state, reducer) => reducer(state), void 0)
      .drop(1)
      .compose(dropRepeats())
    sources[name] = new Osmosys(state$, name)
    const sinks = main(sources)
    reducerMimic$.imitate(sinks[name])
    return sinks
  }
}
