# @bratislava/eslint-config

Shareable ESLint configurations for Bratislava projects. Built for ESLint v9 flat config format.

## Packages

This monorepo contains four separate packages:

| Package                           | Description                    | Use Case                      |
| --------------------------------- | ------------------------------ | ----------------------------- |
| `@bratislava/eslint-config`       | Base configuration             | Shared rules for all projects |
| `@bratislava/eslint-config-nest`  | NestJS backend configuration   | NestJS APIs and services      |
| `@bratislava/eslint-config-next`  | Next.js frontend configuration | Next.js applications          |
| `@bratislava/eslint-config-react` | React configuration            | React apps without Next.js    |

Each package only includes dependencies it needs, so you won't install NestJS plugins when using Next.js config.

## Installation

Install only the package you need:

```bash
# For Next.js projects
npm install --save-dev @bratislava/eslint-config-next eslint typescript

# For NestJS projects (requires Node >= 22)
npm install --save-dev @bratislava/eslint-config-nest eslint typescript

# For React projects (without Next.js)
npm install --save-dev @bratislava/eslint-config-react eslint typescript

# For base config only
npm install --save-dev @bratislava/eslint-config eslint typescript
```

## Usage

### NestJS Projects

Create `eslint.config.mjs` in your project root:

```javascript
import { createNestConfig } from "@bratislava/eslint-config-nest";

export default createNestConfig({
  tsconfigRootDir: import.meta.dirname,
  ignores: ["src/generated-clients/*"],
});
```

Or use the default configuration:

```javascript
import nestConfig from "@bratislava/eslint-config-nest";

export default nestConfig;
```

### Next.js Projects

Create `eslint.config.mjs` in your project root:

```javascript
import { createNextConfig } from "@bratislava/eslint-config-next";

export default createNextConfig({
  ignores: ["services/graphql/**"],
});
```

Or use the default configuration:

```javascript
import nextConfig from "@bratislava/eslint-config-next";

export default nextConfig;
```

### React Projects (without Next.js)

Create `eslint.config.mjs` in your project root:

```javascript
import { createReactConfig } from "@bratislava/eslint-config-react";

export default createReactConfig({
  ignores: ["src/generated/**"],
});
```

Or use the default configuration:

```javascript
import reactConfig from "@bratislava/eslint-config-react";

export default reactConfig;
```

## What's Included

### Base Configuration (@bratislava/eslint-config)

- **ESLint recommended** rules
- **TypeScript ESLint** strict and stylistic rules
- **Prettier** integration (disables conflicting rules)
- **Security** plugin for detecting security vulnerabilities
- **No-unsanitized** plugin for preventing XSS
- **SonarJS** plugin for code quality
- **Simple import sort** for consistent import ordering
- **Import** plugin for import/export linting
- **Markdown** linting support

### NestJS Config (@bratislava/eslint-config-nest)

Everything in base, plus:

- **NestJS Typed** plugin for NestJS-specific rules
- **Jest** plugin for test files
- **JSON** linting support
- `no-console: error` (enforces logger usage)
- **Requires Node >= 22** (due to @darraghor/eslint-plugin-nestjs-typed)

### Next.js Config (@bratislava/eslint-config-next)

Everything in base, plus:

- **Next.js** plugin with recommended and Core Web Vitals rules
- **React** and **React Hooks** plugins
- **JSX A11y** for accessibility
- **i18next** plugin for internationalization
- **TanStack Query** plugin
- `no-console: warn`

### React Config (@bratislava/eslint-config-react)

Everything in base, plus:

- **React** and **React Hooks** plugins
- **JSX A11y** for accessibility
- **TanStack Query** plugin
- `no-console: warn`

## Customization

### Extending with Additional Rules

```javascript
import { createNextConfig } from "@bratislava/eslint-config-next";

export default [
  ...createNextConfig(),
  {
    // Your custom rules
    rules: {
      "no-console": "error", // Override to error instead of warn
    },
  },
];
```

### Using Individual Exports from Base

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

All packages require:

- `eslint` >= 9
- `typescript` >= 5

The NestJS package additionally requires Node >= 22.

## Publishing

### Prerequisites

1. npm account with access to `@bratislava` organization
2. 2FA enabled on npm account

### Publishing All Packages

```bash
npm run publish:all
```

### Publishing Individual Package

```bash
npm publish --workspace packages/next
```

## Development

### Testing Locally

Link packages locally before publishing:

```bash
# Install dependencies
npm install

# Link a specific package
cd packages/next
npm link

# In a project that will use it
npm link @bratislava/eslint-config-next
```

### Updating Dependencies

```bash
npm update --workspaces
```

## License

EUPL-1.2

## Contributing

1. Make changes to the configuration files
2. Test in a real project using `npm link`
3. Update version in all package.json files
4. Publish all packages
