import assert from 'node:assert/strict'
import { join } from 'node:path'
import { describe, it } from 'node:test'

import { ESLint } from 'eslint'

import defaultConfig, { createNestConfig } from '../index.js'

const dir = import.meta.dirname

describe('@bratislava/eslint-config-nest', () => {
  it('default export resolves config for .ts files', async () => {
    const eslint = new ESLint({ overrideConfig: defaultConfig, overrideConfigFile: null })
    await eslint.calculateConfigForFile(join(dir, 'virtual.ts'))
  })

  it('createNestConfig() resolves config for .ts files', async () => {
    const eslint = new ESLint({
      overrideConfig: createNestConfig(),
      overrideConfigFile: null,
    })
    await eslint.calculateConfigForFile(join(dir, 'virtual.ts'))
  })

  it('createNestConfig() resolves config for .spec.ts files', async () => {
    const eslint = new ESLint({
      overrideConfig: createNestConfig(),
      overrideConfigFile: null,
    })
    await eslint.calculateConfigForFile(join(dir, 'virtual.spec.ts'))
  })

  it('createNestConfig() resolves config for .json files', async () => {
    const eslint = new ESLint({
      overrideConfig: createNestConfig(),
      overrideConfigFile: null,
    })
    await eslint.calculateConfigForFile(join(dir, 'virtual.json'))
  })

  it('createNestConfig() accepts tsconfigRootDir and ignores options', async () => {
    const eslint = new ESLint({
      overrideConfig: createNestConfig({ tsconfigRootDir: dir, ignores: ['generated/**'] }),
      overrideConfigFile: null,
    })
    await eslint.calculateConfigForFile(join(dir, 'virtual.ts'))
  })

  it('createNestConfig() defaults to jest rules for .spec.ts files', async () => {
    const eslint = new ESLint({
      overrideConfig: createNestConfig(),
      overrideConfigFile: null,
    })
    const config = await eslint.calculateConfigForFile(join(dir, 'virtual.spec.ts'))
    assert.ok(config.rules['jest/unbound-method'])
    assert.equal(config.rules['vitest/unbound-method'], undefined)
  })

  it('createNestConfig() applies jest rules for .spec.ts files with testRunner: "jest"', async () => {
    const eslint = new ESLint({
      overrideConfig: createNestConfig({ testRunner: 'jest' }),
      overrideConfigFile: null,
    })
    const config = await eslint.calculateConfigForFile(join(dir, 'virtual.spec.ts'))
    assert.ok(config.rules['jest/unbound-method'])
    assert.equal(config.rules['vitest/unbound-method'], undefined)
  })

  it('createNestConfig() throws for an unknown testRunner', () => {
    for (const testRunner of ['mocha', '', null, 'toString']) {
      assert.throws(() => createNestConfig({ testRunner }), /unknown testRunner/)
    }
  })

  it('createNestConfig() applies vitest rules for .spec.ts files with testRunner: "vitest"', async () => {
    const eslint = new ESLint({
      overrideConfig: createNestConfig({ testRunner: 'vitest' }),
      overrideConfigFile: null,
    })
    const config = await eslint.calculateConfigForFile(join(dir, 'virtual.spec.ts'))
    assert.ok(config.rules['vitest/unbound-method'])
    assert.equal(config.rules['jest/unbound-method'], undefined)
  })
})
