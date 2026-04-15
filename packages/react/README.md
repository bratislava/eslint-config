# @bratislava/eslint-config-react

ESLint configuration for React projects (without Next.js). Built for ESLint v9 flat config format.

Part of a monorepo of shareable ESLint configurations — see the [full repo](https://github.com/bratislava/eslint-config) for base, NestJS, and Next.js variants.

## Installation

```bash
npm install --save-dev @bratislava/eslint-config-react eslint typescript eslint-plugin-tailwindcss
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

`eslint-plugin-tailwindcss` is a peer dependency — you install the version that matches your project's Tailwind version.

### Tailwind v3

```bash
npm install --save-dev eslint-plugin-tailwindcss
```

No additional configuration needed — the preconfigured rules work out of the box with v3.

### Tailwind v4

```bash
npm install --save-dev eslint-plugin-tailwindcss@beta
```

The beta version might have issues — see the [v4 branch](https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/alpha/v4) for more info.

Tailwind v4 users must include the following settings in their `eslint.config.mjs`:

```javascript
// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createReactConfig } from "@bratislava/eslint-config-react";

export default [
  ...createReactConfig(),
  {
    settings: {
      tailwindcss: {
        // The absolute path pointing to your main Tailwind CSS v4 config file.
        // It must be a `.css` file (v4), not a `.js` file (v3)
        // REQUIRED, default value will not help
        cssConfigPath: dirname(fileURLToPath(import.meta.url)) + "/styles/tailwind.css",

        // Optional, generally not needed in bratislava FE projects:

        // Attributes/props that could contain Tailwind CSS classes...
        // Optional, default values: ["class", "className", "ngClass", "@apply"]
        // attributes: ["..."],

        // Functions/tagFunctions that will be parsed by the plugin.
        // Optional, default values: ["classnames", "clsx", "ctl", "cva", "tv", "tw"]
        // functions: ["..."]
      },
    },
  },
];
```

Additionally, v4 requires an empty `tailwind.config.js` at the project root, otherwise the plugin throws "Cannot resolve default tailwindcss config path" warnings. See [this issue](https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/431) for details.

```javascript
// tailwind.config.js
export default {};
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
- `eslint-plugin-tailwindcss` >= 3.18.3 or >= 4.0.0-0 (beta)
- `typescript` >= 5

## License

EUPL-1.2
