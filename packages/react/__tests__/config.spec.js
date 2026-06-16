import { join } from 'node:path'
import { describe, it } from 'node:test'

import { ESLint } from 'eslint'

import defaultConfig, { createReactConfig } from '../index.js'

const dir = import.meta.dirname

describe('@bratislava/eslint-config-react', () => {
  it('default export resolves config for .ts files', async () => {
    const eslint = new ESLint({ overrideConfig: defaultConfig, overrideConfigFile: null })
    await eslint.calculateConfigForFile(join(dir, 'virtual.ts'))
  })

  it('createReactConfig() resolves config for .ts files', async () => {
    const eslint = new ESLint({
      overrideConfig: createReactConfig(),
      overrideConfigFile: null,
    })
    await eslint.calculateConfigForFile(join(dir, 'virtual.ts'))
  })

  it('createReactConfig() resolves config for .tsx files', async () => {
    const eslint = new ESLint({
      overrideConfig: createReactConfig(),
      overrideConfigFile: null,
    })
    await eslint.calculateConfigForFile(join(dir, 'virtual.tsx'))
  })

  it('createReactConfig() accepts ignores option', async () => {
    const eslint = new ESLint({
      overrideConfig: createReactConfig({ ignores: ['src/generated/**'] }),
      overrideConfigFile: null,
    })
    await eslint.calculateConfigForFile(join(dir, 'virtual.tsx'))
  })
})
