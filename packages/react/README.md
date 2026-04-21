# @bratislava/eslint-config-react

ESLint configuration for React projects (without Next.js). Built for ESLint v9 flat config format.

Part of a monorepo of shareable ESLint configurations — see the [full repo](https://github.com/bratislava/eslint-config) for base, NestJS, and Next.js variants.

## Installation

```bash
npm install --save-dev @bratislava/eslint-config-react eslint typescript eslint-plugin-better-tailwindcss
```

## Usage

Create `eslint.config.mjs` in your project root:

```javascript
import reactConfig from "@bratislava/eslint-config-react";

export default reactConfig;
```

Or use the factory function for customization:

```javascript
import { createReactConfig } from "@bratislava/eslint-config-react";

export default createReactConfig({
  ignores: ["src/generated/**"],
});
```

## Tailwind CSS

`eslint-plugin-better-tailwindcss` is a peer dependency. It supports both Tailwind v3 and v4 without separate beta versions.

```bash
npm install --save-dev eslint-plugin-better-tailwindcss
```

The recommended ruleset works out of the box, but you should configure the path to your Tailwind entry file:

```javascript
// eslint.config.mjs
import { createReactConfig } from "@bratislava/eslint-config-react";

export default [
  ...createReactConfig(),
  {
    settings: {
      "better-tailwindcss": {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: "src/global.css",
        // tailwindcss 3: the path to the tailwind config file (eg: `tailwind.config.js`)
        tailwindConfig: "tailwind.config.js"
      }
    },
  },
];
```

## Prettier

`prettierBase` is re-exported from this package. Spread it in your `prettier.config.mjs` and add project-specific options:

```js
// prettier.config.mjs
import { prettierBase } from '@bratislava/eslint-config-react'

export default {
  ...prettierBase,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn'],
  // project-specific:
  tailwindStylesheet: './src/styles/globals.css',
}
```

## What's Included

Everything from `@bratislava/eslint-config` (base), plus:

- **React** plugin with recommended rules
- **React Hooks** plugin
- **JSX A11y** accessibility rules
- **TanStack Query** plugin
- **Tailwind CSS** class linting
- Browser globals and JSX support

## Peer Dependencies

- `eslint` >= 9
- `eslint-plugin-better-tailwindcss` >= 4.0.0
- `typescript` >= 5

## License

EUPL-1.2
