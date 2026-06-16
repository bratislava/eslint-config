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
})
