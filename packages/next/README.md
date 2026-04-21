# @bratislava/eslint-config-next

ESLint configuration for Next.js frontend projects. Built for ESLint v9 flat config format.

Part of a monorepo of shareable ESLint configurations — see the [full repo](https://github.com/bratislava/eslint-config) for base, NestJS, and React variants.

## Installation

```bash
npm install --save-dev @bratislava/eslint-config-next eslint typescript eslint-plugin-better-tailwindcss
```

## Usage

Create `eslint.config.mjs` in your project root:

```javascript
import nextConfig from "@bratislava/eslint-config-next";

export default nextConfig;
```

Or use the factory function for customization:

```javascript
import { createNextConfig } from "@bratislava/eslint-config-next";

export default createNextConfig({
  ignores: ["services/graphql/**"],
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
import { createNextConfig } from "@bratislava/eslint-config-next";

export default [
  ...createNextConfig(),
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
import { prettierBase } from '@bratislava/eslint-config-next'

export default {
  ...prettierBase,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn'],
  // project-specific:
  tailwindStylesheet: './src/pages/globals.css',
}
```

## What's Included

Everything from `@bratislava/eslint-config` (base), plus:

- **Next.js** plugin with recommended and Core Web Vitals rules
- **React** plugin with recommended rules
- **React Hooks** plugin
- **JSX A11y** accessibility rules
- **TanStack Query** plugin
- **Tailwind CSS** class linting
- **i18next** internationalization rules
- Browser and Node.js globals

## Peer Dependencies

- `eslint` >= 9
- `eslint-plugin-better-tailwindcss` >= 4.0.0
- `typescript` >= 5

## License

EUPL-1.2
