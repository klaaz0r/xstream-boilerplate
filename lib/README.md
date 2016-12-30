# Osmosys - Observable storage module system

Osmosys is a modular object storage, with the capabilities to provide bindings to `namespaces` within the internal storage object.

There's only a single serializable source of truth. That is a stream of truth actually.

```js
import osmosify from 'cycle-osmosify'
Cycle.run(osmosyify(main)(sources), drivers)
```
Getting a piece of state

```js
function main(sources) {
  const state$ = sources.osmosys.select('sidebar.visible')
  return {
    osmosys: xs.of(prevState => { sidebar: { visible: true } })
  }
```

Getting a formatted piece of state

```js
function main(sources) {
  const state$ = sources.osmosys.select({
    visible: 'sidebar.visible',
    account: 'account'  
  })

  return {
    osmosys: xs.of(prevState => {
      sidebar: { visible: true },
      account: {...}
    })
  }
}
```
