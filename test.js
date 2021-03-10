const test = require('ava')

test('fn - sloppy', t => {
  const getter = function () { return this }
  t.is(
    getter.call(),
    globalThis
  )
})

test('fn - strict', t => {
  'use strict'
  const getter = function () { return this }
  t.is(
    getter.call(),
    undefined
  )
})

test('inline fn - sloppy', t => {
  const abc = { xyz () { return this } }
  const getter = abc.xyz
  t.is(
    getter.call(),
    globalThis
  )
})

test('inline fn - strict', t => {
  'use strict'
  const abc = { xyz () { return this } }
  const getter = abc.xyz
  t.is(
    getter.call(),
    undefined
  )
})

test('inline getter - sloppy', t => {
  const abc = { get xyz () { return this } }
  const getter = Reflect.getOwnPropertyDescriptor(abc, 'xyz').get
  t.is(
    getter.call(),
    globalThis
  )
})

test('inline getter - strict', t => {
  'use strict'
  const abc = { get xyz () { return this } }
  const getter = Reflect.getOwnPropertyDescriptor(abc, 'xyz').get
  t.is(
    getter.call(),
    undefined
  )
})

test('define getter - sloppy', t => {
  const abc = {}
  Reflect.defineProperty(abc, 'xyz', { get () { return this }})
  const getter = Reflect.getOwnPropertyDescriptor(abc, 'xyz').get
  t.is(
    getter.call(),
    globalThis
  )
})

test('define getter - strict', t => {
  'use strict'
  const abc = {}
  Reflect.defineProperty(abc, 'xyz', { get () { return this }})
  const getter = Reflect.getOwnPropertyDescriptor(abc, 'xyz').get
  t.is(
    getter.call(),
    undefined
  )
})

test('global define getter - sloppy', t => {
  Reflect.defineProperty(globalThis, 'xyz', { get () { return this }})
  const getter = Reflect.getOwnPropertyDescriptor(globalThis, 'xyz').get
  t.is(
    getter.call(),
    globalThis
  )
})

test('global define getter - strict', t => {
  'use strict'
  Reflect.defineProperty(globalThis, 'xyz', { get () { return this }})
  const getter = Reflect.getOwnPropertyDescriptor(globalThis, 'xyz').get
  t.is(
    getter.call(),
    undefined // <------- this fails, it is actually globalThis
  )
})
