import { join } from 'node:path'
import { describe, it } from 'node:test'

import { ESLint } from 'eslint'

import defaultConfig, { createNextConfig } from '../index.js'

const dir = import.meta.dirname

describe('@bratislava/eslint-config-next', () => {
  it('default export resolves config for .ts files', async () => {
    const eslint = new ESLint({ overrideConfig: defaultConfig, overrideConfigFile: null })
    await eslint.calculateConfigForFile(join(dir, 'virtual.ts'))
  })

  it('createNextConfig() resolves config for .ts files', async () => {
    const eslint = new ESLint({
      overrideConfig: createNextConfig(),
      overrideConfigFile: null,
    })
    await eslint.calculateConfigForFile(join(dir, 'virtual.ts'))
  })

  it('createNextConfig() resolves config for .tsx files', async () => {
    const eslint = new ESLint({
      overrideConfig: createNextConfig(),
      overrideConfigFile: null,
    })
    await eslint.calculateConfigForFile(join(dir, 'virtual.tsx'))
  })

  it('createNextConfig() accepts ignores option', async () => {
    const eslint = new ESLint({
      overrideConfig: createNextConfig({ ignores: ['services/graphql/**'] }),
      overrideConfigFile: null,
    })
    await eslint.calculateConfigForFile(join(dir, 'virtual.tsx'))
  })
})
