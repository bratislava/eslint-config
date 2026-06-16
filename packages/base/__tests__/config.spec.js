import { join } from 'node:path'
import { describe, it } from 'node:test'

import { ESLint } from 'eslint'

import baseConfig from '../index.js'

const dir = import.meta.dirname

describe('@bratislava/eslint-config', () => {
  it('resolves config for .ts files', async () => {
    const eslint = new ESLint({ overrideConfig: baseConfig, overrideConfigFile: null })
    await eslint.calculateConfigForFile(join(dir, 'virtual.ts'))
  })

  it('resolves config for .md files', async () => {
    const eslint = new ESLint({ overrideConfig: baseConfig, overrideConfigFile: null })
    await eslint.calculateConfigForFile(join(dir, 'virtual.md'))
  })
})
