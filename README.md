# @bratislava/eslint-config

Shareable ESLint configurations for Bratislava projects. Built for ESLint v9 flat config format.

## Configurations

This package provides three ESLint configurations:

| Config                            | Description                    | Use Case                   |
| --------------------------------- | ------------------------------ | -------------------------- |
| `@bratislava/eslint-config/nest`  | NestJS backend configuration   | NestJS APIs and services   |
| `@bratislava/eslint-config/next`  | Next.js frontend configuration | Next.js applications       |
| `@bratislava/eslint-config/react` | React configuration            | React apps without Next.js |

## Installation

```bash
npm install --save-dev @bratislava/eslint-config eslint typescript
```

## Usage

### NestJS Projects

Create `eslint.config.mjs` in your project root:

```javascript
import { createNestConfig } from "@bratislava/eslint-config/nest";

export default createNestConfig({
  tsconfigRootDir: import.meta.dirname,
  ignores: ["src/generated-clients/*"],
});
```

Or use the default configuration:

```javascript
import nestConfig from "@bratislava/eslint-config/nest";

export default nestConfig;
```

### Next.js Projects

Create `eslint.config.mjs` in your project root:

```javascript
import { createNextConfig } from "@bratislava/eslint-config/next";

export default createNextConfig({
  ignores: ["services/graphql/**"],
});
```

Or use the default configuration:

```javascript
import nextConfig from "@bratislava/eslint-config/next";

export default nextConfig;
```

### React Projects (without Next.js)

Create `eslint.config.mjs` in your project root:

```javascript
import { createReactConfig } from "@bratislava/eslint-config/react";

export default createReactConfig({
  ignores: ["src/generated/**"],
});
```

Or use the default configuration:

```javascript
import reactConfig from "@bratislava/eslint-config/react";

export default reactConfig;
```

## What's Included

### Base Configuration (shared by all configs)

- **ESLint recommended** rules
- **TypeScript ESLint** strict and stylistic rules
- **Prettier** integration (disables conflicting rules)
- **Security** plugin for detecting security vulnerabilities
- **No-unsanitized** plugin for preventing XSS
- **SonarJS** plugin for code quality
- **Simple import sort** for consistent import ordering

### NestJS Config

Everything in base, plus:

- **NestJS Typed** plugin for NestJS-specific rules
- **Jest** plugin for test files
- **JSON** linting support
- **Markdown** linting support
- `no-console: error` (enforces logger usage)

### Next.js Config

Everything in base, plus:

- **Next.js** plugin with recommended and Core Web Vitals rules
- **React** and **React Hooks** plugins
- **JSX A11y** for accessibility
- **Import** plugin
- **i18next** plugin for internationalization
- **TanStack Query** plugin
- `no-console: warn`

### React Config

Everything in base, plus:

- **React** and **React Hooks** plugins
- **JSX A11y** for accessibility
- **Import** plugin
- **TanStack Query** plugin
- `no-console: warn`

## Customization

### Extending with Additional Rules

```javascript
import { createNestConfig } from "@bratislava/eslint-config/nest";

export default [
  ...createNestConfig({
    tsconfigRootDir: import.meta.dirname,
  }),
  {
    // Your custom rules
    rules: {
      "no-console": "warn", // Override to warn instead of error
    },
  },
];
```

### Using Individual Exports

The base config exports individual rule sets you can use:

```javascript
import {
  typescriptRules,
  eslintRules,
  sonarjsRules,
  simpleImportSortConfig,
} from "@bratislava/eslint-config";
```

## Peer Dependencies

This package requires:

- `eslint` >= 9
- `typescript` >= 5

## Publishing to npm

### Prerequisites

1. Create an npm account at https://www.npmjs.com/signup
2. Create the `@bratislava` organization on npm (or ensure you have publish access)
3. Login to npm CLI:

```bash
npm login
```

### Publishing Steps

1. **Update version** in `package.json`:

```bash
npm version patch  # for bug fixes
npm version minor  # for new features
npm version major  # for breaking changes
```

2. **Publish the package**:

You'll need 2FA setup on your npm account.

```bash
npm publish --access public
```

## Development

### Testing Locally

Link the package locally before publishing:

```bash
# In the eslint-config directory
npm link

# In a project that will use it
npm link @bratislava/eslint-config
```

### Updating Dependencies

```bash
npm update
```

## License

EUPL-1.2

## Contributing

1. Make changes to the configuration files
2. Test in a real project using `npm link`
3. Update version and publish
