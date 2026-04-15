# @bratislava/eslint-config

Base ESLint configuration for Bratislava projects. Built for ESLint v9 flat config format.

Part of a monorepo of shareable ESLint configurations — see the [full repo](https://github.com/bratislava/eslint-config) for NestJS, Next.js, and React variants.

## Installation

```bash
npm install --save-dev @bratislava/eslint-config eslint typescript
```

## Usage

Create `eslint.config.mjs` in your project root:

```javascript
import baseConfig from "@bratislava/eslint-config";

export default baseConfig;
```

Or use individual exports to compose your own config:

```javascript
import {
  baseConfig,
  typescriptRules,
  eslintRules,
  sonarjsRules,
  simpleImportSortConfig,
} from "@bratislava/eslint-config";
```

## What's Included

- **ESLint recommended** rules
- **TypeScript ESLint** strict and stylistic rules
- **Prettier** integration (disables conflicting rules)
- **Security** plugin for detecting security vulnerabilities
- **No-unsanitized** plugin for preventing XSS
- **SonarJS** plugin for code quality
- **Simple import sort** for consistent import ordering
- **Import** plugin for import/export linting
- **Markdown** linting support

## Peer Dependencies

- `eslint` >= 9
- `typescript` >= 5

## Other Packages

| Package                           | Description                    |
| --------------------------------- | ------------------------------ |
| `@bratislava/eslint-config-nest`  | NestJS backend configuration   |
| `@bratislava/eslint-config-next`  | Next.js frontend configuration |
| `@bratislava/eslint-config-react` | React configuration            |

## License

EUPL-1.2
