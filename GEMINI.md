# GEMINI.md

---

title: How to import code components into Webflow
description: Import React components into Webflow with DevLink
hidden: false
subtitle: Import React components into Webflow with DevLink

---

In this quickstart guide, we’ll discuss how to import React components from an external codebase into Webflow using DevLink.

**What you'll accomplish:**

- Set up your development environment
- Declare a Webflow code component with props
- Import your component library to Webflow
- Use your component in a Webflow project

## Before you start

Before running this quickstart, make sure you have:

- A Webflow account with either:
  - a Workspace on a Freelancer, Core, Growth, Agency, or Enterprise plan
  - a Webflow site with a CMS, Business, or Enterprise plan
- A Webflow site where you can test components
- Node.js 20+ and npm 10+ installed
- Basic familiarity with React components and TypeScript

## 1. Setup your development environment

Set up your local development environment to create and share React components.

<Steps>
    <Step title="Setup your React project">
    DevLink is compatible with a wide variety of local setups. To get started, create a new React project. 
    
    **If you're working with an existing repository, you can skip this step.**
    
    ```bash
    npx create-react-app code-components
    cd code-components
    ```

    </Step>

    <Step title="Install the Webflow CLI">
    Install the Webflow CLI and the necessary dependencies to create a code component library.


        ```bash
        npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react

        ```
    </Step>
    <Step title="Create a Webflow configuration file">
    Create a `webflow.json` file in the root of your repository. This file will define the configuration for your code component library.

    ```json title={"webflow.json"}
    {
        "library": {
            "name": "<Your Library Name>",
            "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"]
        }
    }

    ```


    Give your library a name and specify the path to your code component files.

    </Step>
    <Step title="Add an example component to your library">
    In your editor, navigate to your src or components directory. Create a new file called `Badge.tsx`, and paste the following code. In the next step, you'll create a code component definition file to map this component to a Webflow component.

    ```tsx title={"Badge.tsx"}
    import * as React from "react";

    interface BadgeProps {
      text: string;
      variant: 'Light' | 'Dark';
    }

    export const Badge = ({ text, variant }: BadgeProps) => (
      <span
        style={{
          backgroundColor: variant === 'Light' ? '#eee' : '#000',
          borderRadius: '1em',
          color: variant === 'Light' ? '#000' : '#fff',
          display: 'inline-block',
          fontSize: '14px',
          lineHeight: 2,
          padding: '0 1em',
        }}
      >
        {text}
      </span>
    );
    ```

    </Step>

</Steps>

## 2. Define a Webflow code component

Create a code component definition file to map a React component to a Webflow component. In this step, you'll create a `Badge` component with two props mapping to an example `Badge.tsx` component.

<Steps>
    <Step title="Create a code component file">
    In your editor, navigate to the your `src` or components directory where you added your Badge component. Create a new file called `Badge.webflow.tsx`. This file will define how your Badge component appears in Webflow.

    </Step>

    <Step title="Import the React component and Webflow functions">
    Import the necessary dependencies to create your code component: the React component, [prop types](/code-components/reference/prop-types) and the `declareComponent` function.

    ```tsx title={"Badge.webflow.tsx"}
    import { Badge } from './Badge'; // Import your React component here
    import { props } from '@webflow/data-types';
    import { declareComponent } from '@webflow/react';

    ```



    </Step>
    <Step title="Declare the component">
    Declare the code component using the `declareComponent` function.

    ```tsx title={"Badge.webflow.tsx"}
    import { Badge } from './Badge';
    import { props } from '@webflow/data-types';
    import { declareComponent } from '@webflow/react';

    export default declareComponent(Badge, {
        name: 'Badge',
        description: 'A badge with variants',
        group: 'Info',
    });
    ```


    The `declareComponent` function takes two parameters:
    - Your React component (`Badge`)
    - Configuration options:
        - `name`: The name of the component
        - `description?`: A description of the component (optional)
        - `group?`: The group the component belongs to (optional)
        - `props?`: The props of the component, **which we'll define in the next step.** (optional)
        - `options?`: The options of the component, (optional)

    For more information and detailed configuration options for code component imports, see the [component definition reference](/code-components/define-code-component).

    </Step>
    <Step title="Define the component props">
    Add configurable properties that users can edit in the Webflow designer.

    Add a `props` object to the `declareComponent` function. This object defines which properties designers can configure in the Webflow editor, and maps them to appropriate Webflow prop types using the `props` constructor.

    ```tsx title={"Badge.webflow.tsx"}
    import { Badge } from './Badge';
    import { props } from '@webflow/data-types';
    import { declareComponent } from '@webflow/react';

    export default declareComponent(Badge, {
        name: 'Badge',
        description: 'A badge with variants',
        group: 'Info',
        props: {
            text: props.Text({
                name: "Text",
                defaultValue: "Hello World",
            }),
            variant: props.Variant({
                name: "Variant",
                options: ["Light", "Dark"],
                defaultValue: "Light",
            }),
        },
    });
    ```


        This code component defines two props:
        - `text`: A text field for the Badge content
        - `variant`: A dropdown with predefined style options

    </Step>

</Steps>

## 3. Share your library to Webflow

    In your terminal, run the following command to upload your library:

    ```bash
    npx webflow library share
    ```

    The Webflow CLI will:
        - **Authorize your workspace:** The CLI will check for a Workspace authentication token in your `.env` file. If one is not found, the CLI will prompt you to authenticate by opening a browser window to the Workspace authorization page. **Authorize a workspace to continue.**
        - **Bundle your library:** The CLI will bundle your library, and ask you to confirm the components you want to share.
        - **Upload your library to your Workspace**

    For more information and detailed configuration options for bundling and importing React components, see the [bundling and import reference. →](/code-components/bundling-and-import)

## 4. Use the component on your Webflow site

Add your component to the canvas and update the props to customize the component.

<Steps>
    <Step title="Install the library on your Webflow site">
    Install the library on any site in your Workspace to start using your React components.

        1. Open any Webflow site in your workspace.
        2. Open the Libraries panel by pressing "L" or clicking the <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/32px/Resources.png" alt="Resources icon" style={{ display: "inline-block", verticalAlign: "text-bottom", width: 20, height: 20, margin: "0 2px" }} /> icon in the left sidebar.

            <div style={{width:"50%"}}>
                <Frame>
                    <img src="file:76bce20b-c3d4-4341-a5c1-aa3fe25d7f49" alt="Available to install" />
                </Frame>
            </div>

        3. Find your library in the list of available libraries.
        4. Install the library by clicking the **Install** icon next to your library.

    </Step>
    <Step title="Open the Components panel">
    Open the Components panel by pressing "⇧C" or clicking the
    <img src="https://dhygzobemt712.cloudfront.net/Icons/Light/32px/Components.svg" alt="Components icon" style={{ display: "inline-block", verticalAlign: "text-bottom", width: 20, height: 20, margin: "0 2px" }} /> icon in the left sidebar.

    Scroll to the section for the library you just installed. You should see your "Badge" component listed under the "Info" group.

    <Frame  >
        <img src="file:1786d387-a81d-44d4-992f-33f89ee178b9" alt="Components panel" />
    </Frame>


    </Step>
    <Step title="Add the component to your page">

        Click and drag the Badge component from the components panel onto your page. The component will appear with its default text and styling.
    </Step>

    <Step title="Customize the component">
    Customize your component in the Properties panel on the right. You'll see two configurable properties:

    - **Text**: Change the text content of the Badge
    - **Variant**: Select from Light or Dark styling

    <Frame>
        <img src="file:7aaf1923-3aa5-4c09-b688-384fe96b1be9" alt="Badge component" />
    </Frame>

    Try changing the text to "Welcome!" and selecting a different variant to see your component update in real-time.

    </Step>

</Steps>

## Congratulations

You've successfully created and shared a code component library for your Webflow projects! You now know how to:

- Set up a development environment for React components
- Declare a Webflow React component with configurable properties
- Share component libraries to Webflow via DevLink
- Use custom components in your Webflow projects

## Next steps

Now that you've created your first code component, explore these resources to build more advanced components:

### Learn the fundamentals

- [**Define a code component**](/code-components/define-code-component)<br/>
  Learn how code components work and their architecture
- [**Explore prop types**](/code-components/reference/prop-types)<br/>
  Explore all available prop types for creating configurable components
- [**Learn about the Webflow CLI**](/code-components/reference/cli)<br/>
  Learn more about the Webflow CLI commands

### Advanced configuration

- [**Installation and setup**](/code-components/installation)<br/>
  Learn how to configure your existing codebase for component import.
- [**Configure code components to work with popular frameworks and libraries**](/code-components/frameworks-and-libraries)<br/>
  Learn how to use CSS frameworks like **Tailwind CSS**, tools like **Shadcn/UI**, and component libraries like **Material UI** with code components.
- [**Configure bundling and import**](/code-components/bundling-and-import)<br/>
  Explore advanced configuration options for bundling and importing React components.

---

title: Component architecture
slug: component-architecture
description: Learn how code components work internally and their architectural constraints
hidden: false
max-toc-depth: 2
subtitle: Understand the runtime behavior of code components
canonical-url: 'https://developers.webflow.com/code-components/component-architecture'

---

**Code components run as isolated React applications.** Each one mounts in its own [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) container with a separate React root, creating a sandboxed environment that prevents conflicts with the main page or other components.

<Frame>
    <>
        <img src="file:084c669d-1c7d-4297-98f0-ffee61e2848a" alt="Component architecture" className="dark-icon" />
        <img src="file:96316d87-0c15-4b85-a541-2cecdf039f74" alt="Component architecture" className="light-icon" />
    </>
</Frame>

Because of this isolation, each imported React component manages its own dependencies, state, and context. When building, it’s important to consider how your components handle state and communicate with each other.

#### Key concepts

- **Shadow DOM isolation** - Styles and DOM elements are contained.
- **Separate React roots** - No shared state or context between components.
- **Server-side rendering** - SSR provides initial HTML
- **Client-side execution** - All interactivity runs in the browser

This architecture affects how you handle state management, component communication, data fetching, and styling. Use the following patterns to manage these constraints when building your React components for import into Webflow.

## Shadow DOM and React roots

Each code component runs in its own Shadow DOM container with a separate React root. This sandboxed environment prevents conflicts with the main page and other components:

- Your component's styles won't leak to the page
- Page styles won't override your component's styles
- You must explicitly import external styles (site variables, tag selectors, etc.)

**Composing components with slots**

When composing code components using slots, parent and child components may not share state through React context. Each child component renders in its own Shadow DOM container, which isolates component state sharing.

Shadow DOM impacts how you style components as well as your ability to use third-party libraries. To learn more about styling components within the Shadow DOM, see the [styling components guide](/code-components/styling-components) and [frameworks and libraries guide](/code-components/frameworks-and-libraries).

## Server-side rendering (SSR)

Webflow supports server-side rendering (SSR) for code components. SSR generates initial HTML for the component on the server, which can improve perceived performance and SEO. After the page loads, Webflow automatically hydrates the component in the browser so that it becomes fully interactive.

Webflow enables SSR by default, but you can disable it by setting `ssr` to `false` in the component's definition file.

```typescript title="Chart.webflow.tsx"
declareComponent(Component, {
  name: "Chart",
  description: "An interactive chart component",
  group: "Data Visualization",
  options: {
    ssr: false,
  },
});
```

### When to disable SSR

You’ll want to turn off SSR for code components that rely on client-only behavior or that don’t benefit from server-rendered HTML. Common cases include:

- **Browser APIs:** Components that use window, document, `localStorage`, or other APIs not available during SSR.
- **Dynamic or personalized content:** User-specific dashboards, authenticated views, or components that need client data to render correctly.
- **Heavy or interactive UI:** Charts, 3D scenes, maps, or animation-driven elements that would bloat the server-rendered HTML and be re-rendered anyway.
- **Non-deterministic output:** Anything that renders differently on the server vs. client (for example, random numbers, time-based values).

<Tip>
If the HTML output helps with SEO or improves the first paint, keep SSR on. If the component is purely interactive, client-specific, or browser-dependent, disable SSR.
</Tip>

<Warning title="React Server Components are not supported">
React Server Components aren't supported in code components. All code components must use standard React components.
</Warning>

## Communicating between components

Because each code component runs in its own React root, they can’t share React Context or state directly. Instead, use one of the following patterns to manage state across multiple components.

### Sharing state across components

#### URL parameters

Store state in the URL using `URLSearchParams` for shareable, bookmarkable state. This is useful for search queries, filters, navigation state, or pagination.

```tsx title="Filter.tsx"
// Set state
const url = new URL(window.location.href);
url.searchParams.set("filter", "active");
window.history.pushState({}, "", url);

// Read state
const params = new URLSearchParams(window.location.search);
const filter = params.get("filter"); // 'active'
```

#### Browser storage

Use `localStorage` for persistent data or `sessionStorage` for session-only data. Only store non-sensitive information since this data is visible to users.

```tsx title="ThemePreference.tsx"
// localStorage - persists across browser sessions
window.localStorage.setItem(
  "userPreferences",
  JSON.stringify({ theme: "dark" })
);
const prefs = JSON.parse(localStorage.getItem("userPreferences"));

// sessionStorage - cleared when tab closes
window.sessionStorage.setItem("tempData", "value");
```

Best for: user preferences, form data, temporary state.

#### Nano Stores

[Nano stores](https://github.com/nanostores/nanostores) is a lightweight state management library for cross-component communication, and is a useful alternative to React Context for sharing state between components.

<Accordion title="Using Nano Stores">

<Steps>
<Step title="Install Nano Stores">
  In your React project, install Nano Stores by running the following command in your terminal:
  
  ```bash
  npm install nanostores @nanostores/react
  ```
</Step>
<Step title="Create a store">
  A store represents is external shared state: any component can access, modify, or subscribe to it. Create a file to create the store. Use Nano Stores' `atom()` to make a shared, reactive variable.

```tsx title={"Store.tsx"}
import { atom } from "nanostores";

// Shared state store - any component can read/write to this
export const $counter = atom(0);
```

**Note:** This example uses an atomic store with a single value. See the [Nano Stores documentation](https://github.com/nanostores/nanostores) for more information on the different types of stores.
</Step>
<Step title="Read a store in a component">
In your component, subscribe to the store using `useStore()` hook to automatically update when the value changes:

```tsx title={"Counter.tsx"}
import React from "react";

import { useStore } from "@nanostores/react";
import { $counter } from "./store";

// Displays the current count - automatically updates when store changes
export const Counter = () => {
  const count = useStore($counter); // Subscribe to store changes

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <p>Count: {count}</p>
    </div>
  );
};
```

</Step>
<Step title="Update the store from a separate component">
  In the `Clicker` component, update the store using `set()` to change the value:

```tsx title={"Clicker.tsx"}
import React from "react";
import { Button } from "./Button";
import { $counter } from "./Store";

interface ClickerProps {
  text: string;
  variant: "primary" | "secondary";
}

// Button that increments the shared counter when clicked
export const Clicker = ({ text, variant }: ClickerProps) => {
  const clicked = React.useCallback(() => $counter.set($counter.get() + 1), []); // Update shared state
  return <Button text={text} variant={variant} onClick={clicked} />;
};
```

**Note:** This example uses the `useCallback` hook to update the store when the button once it's clicked.
</Step>
</Steps>
</Accordion>

### Custom events

To notify a component of an event or update another component, use [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) to communicate across React components in Webflow:

<CodeBlocks>
  ```tsx title={"ThemeToggle.tsx"}
  import React from 'react';
  
  // Theme toggle component dispatches events
  export const ThemeToggle = () => {
      const handleClick = () => {
        // Dispatch custom event that other components can listen to
        window.dispatchEvent(new CustomEvent('theme-changed', { 
          detail: { theme: 'dark' },
        }));
      };
    
      return <button onClick={handleClick}>Switch to Dark Mode</button>;
    };
    
  ```

```tsx title={"ThemeDisplay.tsx"}
import { useState, useEffect } from "react";

// Theme display component listens for events
export const ThemeDisplay = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme: string }>;
      setTheme(customEvent.detail.theme);
    };

    window.addEventListener("theme-changed", handleThemeChange);
    return () => window.removeEventListener("theme-changed", handleThemeChange);
  }, []);

  return <div>Current theme: {theme}</div>;
};
```

</CodeBlocks>

## Data fetching

Code components support client-side data fetching. This means your React component can request live or real-time data from a public API after it renders in the browser.

To fetch data, use React’s `useEffect` hook when the component mounts:

```tsx title={"MyComponent.tsx"}
import React, { useEffect, useState } from "react";

interface ApiResponse {
  message: string;
}

export const MyComponent = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public-data")
      .then((res) => res.json())
      .then((json: ApiResponse) => setData(json))
      .catch((err) => console.error("Fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return <div>{data.message}</div>;
};
```

### Key considerations

- **Public APIs only:** Never include secrets or sensitive API keys in your component code. All JavaScript runs in the browser and is visible to users.
- **CORS support required:** The API must accept cross-origin requests from your Webflow-hosted site.
- **No environment variables:** `.env` files aren’t supported. If you need to pass configuration values (like endpoint URLs, IDs, or feature flags), provide them as props instead of embedding them directly.

---

title: Styling components
slug: styling-components
description: Learn how to style code components for use in Webflow
hidden: false
max-toc-depth: 2
subtitle: >-
Style your code components using site variables, inherited properties, and tag
selectors.
canonical-url: 'https://developers.webflow.com/code-components/styling-components'

---

Imported components support standard React styling approaches, but with important considerations for Shadow DOM isolation.

## How Shadow DOM affects styling

Code components render in [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), which creates an isolated styling boundary. This means:

- Your component styles won't affect the rest of the page
- Page styles won't affect your component
- You need to explicitly connect to external styles

Rendering components in Shadow DOM prevents style conflicts to ensure your component looks and behaves as expected. However, this also means you need to explicitly connect to external styles like site variables, inherited properties, or tag selectors.

## Adding styles to your code components

To ensure your code components are styled correctly, import your styles directly into your `*.webflow.tsx` file.

```tsx title={"Button.webflow.tsx"}
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import { Button } from "./Button";
// import '../styles/globals.css'; // Import global styles
```

## CSS capabilities

The following table shows which CSS features work within Shadow DOM:

| Feature              | Works in Shadow DOM | How to use                            |
| -------------------- | ------------------- | ------------------------------------- |
| Site variables       | ✅ Yes              | `var(--background-primary, fallback)` |
| Inherited properties | ✅ Yes              | `font-family: inherit`                |
| Tag selectors        | ✅ Yes              | Enable with `applyTagSelectors: true` |
| Site classes         | ❌ No               | Use component-specific classes        |

### Site variables

Reference a site's [variables](https://help.webflow.com/hc/en-us/articles/33961268146323-Variables) in your components:

```css title={"Button.module.css"}
.button {
  color: var(--background-primary, #000);
}
```

To get the exact variable name, click "Copy CSS" in the three-dot menu next to any variable in the Variables panel.

### Inherited properties

CSS properties set to `inherit` work across Shadow DOM boundaries. Your component inherits styles from the parent HTML element:

```css title={"Button.module.css"}
.button {
  color: var(--background-primary, #000);
  font-family: inherit;
}
```

For example, if your component is placed inside a `<div>` with `font-family: sans-serif`, setting `font-family: inherit` in your component will use sans-serif.

### Tag selectors

[Tag selectors](https://help.webflow.com/hc/en-us/articles/33961346359699-HTML-tags) (like `h1`, `p`, `button`) defined in your site's CSS can be automatically applied to your component. Enable this with the `applyTagSelectors` option in your component definition file.

```tsx title={"Button.webflow.tsx"}
import { declareComponent } from "@webflow/react";
import { Button } from "./Button";
// import '../styles/globals.css'; // Import global styles

export default declareComponent(Button, {
  name: "Button",
  options: {
    applyTagSelectors: true,
  },
});
```

## Advanced configuration

## Code components support modern CSS frameworks and libraries, but some require specific configuration for Shadow DOM compatibility. For guidance on using CSS frameworks and component libraries with code components, see the [frameworks and libraries guide](/code-components/frameworks-and-libraries).

title: Installation
slug: installation
description: Learn how to configure your Component Library for code components.
hidden: false
subtitle: Learn how to configure your React project for code components.
canonical-url: 'https://developers.webflow.com/code-components/installation'

---

This reference describes the configuration requirements to setup DevLink in a React project for component imports.

## Setup requirements

### Webflow CLI

Install the Webflow CLI and the necessary dependencies to import React components into Webflow:

```bash
npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react
```

**What you get:**

- `@webflow/webflow-cli` - CLI used to publish components to Webflow
- `@webflow/data-types` - TypeScript definitions for Webflow props
- `@webflow/react` - React utilities for code components

See the [CLI reference](/code-components/reference/cli) for publishing commands.

### `webflow.json`

The `webflow.json` file is used to configure DevLink for component imports. Use this file to define the name of your library and the components that should be included in the library. Additionally, you can specify a custom webpack configuration file to use for [bundling your components.](/code-components/bundling-and-import)

Create or update `webflow.json` in the root of your project with the following configuration:

```json title={"webflow.json"}
{
  "library": {
    "name": "<Your Library Name>",
    "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"],
    "bundleConfig": "./webpack.webflow.js"
  }
}
```

| Field                  | Description                                                 | Required |
| ---------------------- | ----------------------------------------------------------- | -------- |
| `library.name`         | The name of your component library as it appears in Webflow | Yes      |
| `library.components`   | Glob pattern matching your component files                  | Yes      |
| `library.bundleConfig` | Path to a custom webpack configuration file                 | No       |

## Authentication

When importing your component library to Webflow using the `npx webflow library share` command, the Webflow CLI will prompt you to authenticate with Webflow. Once authenticated, DevLink will save the token to your `.env` file.

### Manual authentication

To manually authenticate with Webflow, run the `webflow library share` command with the `--api-token` option and include a [Workspace API token](#workspace-api-token) in the command. This is useful when sharing your component library to a different workspace.

```bash
npx webflow library share --api-token <your-api-token>
```

### Workspace API token

DevLink publishes your component library to a Webflow workspace. To publish to the correct workspace, you must provide a [workspace API token](/data/reference/authentication/workspace-token) for authentication.

<Warning title="Workspace admin required">
  You must be a Workspace Admin to create a Workspace token.
</Warning>

To get your workspace API token:

1. Open your workspace and navigate to **Apps & Integrations.**
2. In the left sidebar. Click **Manage**
3. Scroll to the bottom section labeled **Workspace API Access**
4. Click **Generate API Token** and copy the token.
5. Add the token to your `.env` file.

<Warning title="Security best practices">
  Never commit your `.env` file to version control. Be sure to add `.env` to your `.gitignore` file.
</Warning>

## Next steps

After configuration, you can:

- [Define a code component](/code-components/define-code-component)
- [Publish your library](/code-components/reference/cli)

## Related topics

- [Getting started with code components](/code-components/introduction/quick-start)
- [Webflow CLI reference](/code-components/reference/cli)
- [Workspace API token](/data/reference/authentication/workspace-token)

---

title: Frameworks and libraries
slug: frameworks-and-libraries
description: Learn how to use frameworks and libraries with code components.
hidden: false
subtitle: Learn how to use CSS frameworks and component libraries with code components.
canonical-url: 'https://developers.webflow.com/code-components/frameworks-and-libraries'

---

Code Components work with a wide range of styling approaches, including CSS preprocessors, utility frameworks, and component/style libraries.

Because Code Components render inside a [Shadow DOM](/code-components/component-architecture#shadow-dom-and-react-roots), some tools that inject styles into the global `document.head` need additional configuration to scope styles correctly. Webflow provides utilities for popular CSS-in-JS libraries (e.g. Emotion, styled-components) so they can inject styles directly into the Shadow Root.

Most setups just require a small addition to your [webpack configuration](/code-components/webpack-configuration-overrides) and an import in your component. For CSS-in-JS solutions, you’ll wrap your components in a Shadow DOM provider.

## CSS frameworks

<Accordion title="Tailwind CSS">
To use Tailwind CSS with your code components, configure PostCSS to process Tailwind classes:

<Steps>
  <Step title="Install Tailwind CSS">
    Install Tailwind CSS and its PostCSS plugin:

    ```bash
    npm install tailwindcss @tailwindcss/postcss postcss
    ```

  </Step>

  <Step title="Configure PostCSS">
    Add the Tailwind PostCSS plugin to your `postcss.config.mjs` file:

```mjs title={"postcss.config.mjs"}
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

  </Step>

  <Step title="Import Tailwind styles">
    Import Tailwind in your main CSS file:

```css title={"globals.css"}
@import "tailwindcss";
```

  </Step>

  <Step title="Import styles in your component">
    Import your CSS file in each code component:

```tsx title={"Badge.webflow.tsx"}
import { Badge } from "./Badge";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "./globals.css"; // Import your styles

export default declareComponent(Badge, {
  name: "Badge",
  description: "A badge with variants",
  group: "Info",
  props: {
    text: props.Text({
      name: "Text",
      defaultValue: "Hello World",
    }),
    variant: props.Variant({
      name: "Variant",
      options: ["Light", "Dark"],
      defaultValue: "Light",
    }),
  },
});
```

  </Step>

  <Step title="Use Tailwind classes">
    Now you can use Tailwind utility classes in your components:

```tsx title={"Badge.tsx"}
import * as React from "react";

interface BadgeProps {
  text: string;
  variant: "Light" | "Dark";
}

export const Badge = ({ text, variant }: BadgeProps) => (
  <span
    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
      variant === "Light"
        ? "bg-gray-100 text-gray-800"
        : "bg-gray-800 text-white"
    }`}
  >
    {text}
  </span>
);
```

  </Step>
</Steps>
</Accordion>
<Accordion title="styled-components">
To use styled-components with code components, install the `@webflow/styled-components-utils` package and wrap your component in the `StyledComponentsShadowDomProvider`.

<Steps>
  <Step title="Install the styled-components utility library">
  Install the utility library:

```bash
npm i @webflow/styled-components-utils
```

  <Tip>
    This package requires the following peer dependencies:

    ```bash
    npm i styled-components react react-dom
    ```

  </Tip>
  </Step>

  <Step title="Wrap your component in the Shadow DOM provider">
    In your React component, wrap your component in the `StyledComponentsShadowDomProvider` component:
    
    <CodeBlocks>
      ```tsx title={"Button.tsx"}
      import React from "react";
      import { StyledComponentsShadowDomProvider } from "@webflow/styled-components-utils";
      import styled from "styled-components";
      
      const StyledButton = styled.button`
        background-color: #007bff;
      `;
      
      interface ButtonProps {
        buttonText: string;
      }
      
      export const Button = ({ buttonText }: ButtonProps) => {
        return (
          <StyledComponentsShadowDomProvider>
            <StyledButton>{buttonText}</StyledButton>
          </StyledComponentsShadowDomProvider>
        );
      }
      ```

      ```tsx title={"Button.webflow.tsx"}
      import { declareComponent } from "@webflow/react";
      import { props } from "@webflow/data-types";
      import { Button } from "./Button";

      export default declareComponent(Button, {
        name: "Button",
        description: "A simple button component",
        group: "Forms",
        props: {
          buttonText: props.Text({
            name: "Button Text",
            defaultValue: "Click me"
          })
        },
      });
      ```

    </CodeBlocks>

  </Step>
</Steps>

</Accordion>
<Accordion title="Emotion">
To use Emotion with code components, install the [`@webflow/emotion-utils`](https://www.npmjs.com/package/@webflow/emotion-utils?activeTab=readme) package and wrap your components in the [EmotionCacheShadowDomProvider](https://www.npmjs.com/package/@webflow/emotion-utils?activeTab=readme). The provider automatically detects whether it's running inside a Shadow DOM and configures Emotion's cache accordingly. When inside a Shadow DOM, it injects styles into the Shadow Root; otherwise, it falls back to the document head.

<Steps>
  <Step title="Install the Emotion utility library">
  In your terminal, run the following command to install the Emotion utility package:

```bash
npm i @webflow/emotion-utils
```

  <Tip>
    This package requires the following peer dependencies:

    ```bash
    npm i @emotion/cache @emotion/react react react-dom
    ```

  </Tip>
  </Step>

  <Step title="Wrap your React component in the Shadow DOM provider">
    In your React component, wrap your component in the `EmotionCacheShadowDomProvider` component:

    <CodeBlocks>
      ```tsx title={"Button.tsx"}
      import React from "react";
      import { EmotionCacheShadowDomProvider } from "@webflow/emotion-utils";
      import styled from "@emotion/styled";

      const StyledButton = styled.button`
        background-color: #007bff;
      `;

      interface ButtonProps {
        buttonText: string;
      }

      export const Button = ({ buttonText }: ButtonProps) => {
        return (
          <EmotionCacheShadowDomProvider>
            <StyledButton>{buttonText}</StyledButton>
          </EmotionCacheShadowDomProvider>
        );
      }
      ```

      ```tsx title={"Button.webflow.tsx"}
      import { declareComponent } from "@webflow/react";
      import { props } from "@webflow/data-types";
      import { Button } from "./Button";


      export default declareComponent(Button, {
        name: "Button",
        description: "A simple button component using Emotion",
        group: "Forms",
        props: {
          buttonText: props.Text({
            name: "Button Text",
            defaultValue: "Click me"
          }),
        },
      });
      ```

    </CodeBlocks>

  </Step>

</Steps>
</Accordion>

## Component libraries

<Accordion title="Material UI">
To use Material UI with Emotion, install the [`@webflow/emotion-utils`](https://www.npmjs.com/package/@webflow/emotion-utils?activeTab=readme) package and wrap your components in the [EmotionCacheShadowDomProvider](https://www.npmjs.com/package/@webflow/emotion-utils?activeTab=readme). The provider automatically detects whether it's running inside a Shadow DOM and configures Emotion's cache accordingly. When inside a Shadow DOM, it injects styles into the Shadow Root, otherwise, it falls back to the document head.

  <Steps>
    <Step title="Install the Emotion utility library">
    In your terminal, run the following command to install the Emotion utility package:

    ```bash
    npm i @webflow/emotion-utils
    ```

    <Tip>
      This package requires the following peer dependencies:

      ```bash
      npm i @mui/material @emotion/react @emotion/cache
      ```

    </Tip>

    </Step>

    <Step title="Wrap your component in the Shadow DOM provider">
      In your React component, wrap your component in the `EmotionCacheShadowDomProvider` component:

        <CodeBlocks>
          ```tsx title={"Button.tsx"}
          import React from "react";
          import { Button } from "@mui/material";
          import { EmotionCacheShadowDomProvider } from "@webflow/emotion-utils";

          interface ButtonProps {
            /** Button text content */
            children: React.ReactNode;
            /** Button variant style */
            variant?: "text" | "outlined" | "contained";
            /** Button color */
            color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
            /** Click handler */
            onClick?: () => void;
          }

          /**
           * A customizable button component built on Material-UI
           */
          export const CustomButton = ({
            children,
            variant = "contained",
            color = "primary",
            onClick,
          }: ButtonProps) => {
            return (
              <EmotionCacheShadowDomProvider>
                <Button
                  variant={variant}
                  color={color}
                  onClick={onClick}
                >
                  {children}
                </Button>
              </EmotionCacheShadowDomProvider>
            );
          };

          ```

          ```tsx title={"Button.webflow.tsx"}
          import { declareComponent } from "@webflow/react";
          import { props } from "@webflow/data-types";
          import { CustomButton } from "./Button";

          export default declareComponent(CustomButton, {
            name: "Button",
            description: "A simple button component",
            group: "Forms",
            props: {
              children: props.Text({
                name: "Button Text",
                defaultValue: "Click me"
              }),
              variant: props.Variant({
                name: "Style",
                options: ["text", "outlined", "contained"],
                defaultValue: "contained"
              }),
              color: props.Variant({
                name: "Color",
                options: ["primary", "secondary", "error", "info", "success", "warning"],
                defaultValue: "primary"
              })
            },
          });
          ```

        </CodeBlocks>

    </Step>

  </Steps>

</Accordion>
<Accordion title="Shadcn/UI">
Shadcn/UI is a component library built on Tailwind CSS that provides pre-built, accessible React components. It works with code components but requires path alias configuration. Follow these steps after setting up Tailwind CSS:

<Steps>
  <Step title="Configure path aliases">
    Shadcn/UI uses path aliases that need to be configured in your webpack setup. Add this to your webpack configuration:

```js title={"webpack.webflow.js"}
module.exports = {
  resolve: {
    alias: {
      "@": process.cwd(), // Maps @ to your project root
    },
  },
};
```

    For detailed webpack configuration options, see the [bundling and import guide](/code-components/bundling-and-import).

  </Step>
</Steps>
</Accordion>

## Preprocessors & post-processing

<Accordion title="Sass">
  Configure your project to use Sass with the following steps:

  <Steps>
    <Step title="Install the Sass loaders">
    Install the loaders as development dependencies:

    ```bash
    npm install --save-dev sass sass-loader
    ```
    </Step>
    <Step title="Create a custom webpack configuration">
    Create a `webpack.webflow.js` file to customize the webpack configuration to use the Sass loader:

    ```js title={"webpack.webflow.js"}
    module.exports = {
    module: {
            rules: (currentRules) => {
            const currentCSSRule = currentRules.find(
                (rule) =>
                rule.test instanceof RegExp &&
                rule.test.test("test.css") &&
                Array.isArray(rule.use)
            );
            return [
                ...currentRules,
                {
                test: /\.scss$/,
                use: [...currentCSSRule.use, "sass-loader"],
                },
            ];
            },
        }
    }
    ```

    </Step>
    <Step title="Update your Webflow configuration">
    Update your `webflow.json` file to use the custom webpack configuration:

    ```json title={"webflow.json"}
    {
        "library": {
          "name": "React Components Library",
          "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"],
          "bundleConfig": "./webpack.webflow.js"
        }
      }

    ```

    </Step>
    <Step title="Use Sass in your code component">
    Import Sass in your code component definition file:

    ```tsx title="src/components/Button.webflow.tsx"
    import '../styles/button.scss';

    // Declare the component
    ```
    </Step>

  </Steps>
</Accordion>
<Accordion title="Less">
  Configure your project to use Less with the following steps:

  <Steps>
    <Step title="Install the Less loaders">
    Install the loaders as development dependencies:

    ```bash
    npm install --save-dev less less-loader
    ```
    </Step>
    <Step title="Create a custom webpack configuration">
    Create a `webpack.webflow.js` file to customize the webpack configuration to use the Sass loader:

    ```js title={"webpack.webflow.js"}
    // webpack.webflow.js
    module.exports = {
        module: {
          rules: (currentRules) => {
            const currentCSSRule = currentRules.find(
              (rule) =>
                rule.test instanceof RegExp &&
                rule.test.test("test.css") &&
                Array.isArray(rule.use)
            );

            return [
              ...currentRules,
              {
                test: /\.less$/i,
                use: [...currentCSSRule.use, "less-loader"],
              },
            ];
          },
        },
      };

    ```

    </Step>
    <Step title="Update your Webflow configuration">
    Update your `webflow.json` file to use the custom webpack configuration:

    ```json title={"webflow.json"}
    {
        "library": {
          "name": "React Components Library",
          "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"],
          "bundleConfig": "./webpack.webflow.js"
        }
      }

    ```

    </Step>
    <Step title="Use less in your code component">
    Import less in your code component definition file:

    ```tsx title="src/components/Button.webflow.tsx"
    import '../styles/button.less';

    // Declare the component
    ```
    </Step>

  </Steps>
  </Accordion>

Learn about additional configuration options in the [bundling and import guide](/code-components/bundling-and-import).

## Next steps

- [Declare your code component](/code-components/define-code-component)
- [Style your React component](/code-components/styling-components)
- [Deploy your code component](/code-components/bundling-and-import)

## Troubleshooting

<Accordion title="Errors when sharing to Webflow">
If you're getting errors when sharing to Webflow, try the following:

- Ensure you've installed the Webflow CLI locally within the project. If you have a global installation, try running the command with `npx` to ensure the correct version is being used.
  </Accordion>

---

title: Define a code component
slug: define-code-component
description: Learn about the structure and purpose of code component definition files
hidden: false
max-toc-depth: 3
subtitle: 'Learn how to map React components to Webflow with component definition files. '
canonical-url: 'https://developers.webflow.com/code-components/define-code-component'

---

A code component definition is a file that tells Webflow how to use your React component on the Webflow canvas. It defines which properties designers can configure and how they’ll appear in the designer.

Every code component definition is a `.webflow.tsx` file that uses the `declareComponent` function to define the component.

<CodeBlocks>
```tsx title={"Button.webflow.tsx"}
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from './Button';
// import '../styles/global.css'; // Import global styles

// Declare the component
export default declareComponent(Button, {

// Component metadata
name: "Button",
description: "A button component with a text and a style variant",
group: "Interactive",

// Prop definitions
props: {
text: props.Text({
name: "Button Text",
defaultValue: "Click me"
}),
variant: props.Variant({
name: "Style",
options: ["primary", "secondary"],
defaultValue: "primary"
}),
},
// Optional configuration
options: {
applyTagSelectors: true,
},
});

````

```tsx title={"Button.tsx"}
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  variant: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ text, variant }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type="button"
    >
      {text}
    </button>
  );
};
````

</CodeBlocks>
## File structure and naming

Code component definition files follow specific extension and naming patterns:

- **File extension**: `.webflow.tsx` or `.webflow.ts`
- **Naming pattern**: `ComponentName.webflow.tsx` (where `ComponentName` matches your React component)
- **Location**: Typically alongside your React component file

If you have specific naming needs, you can [configure this pattern in `webflow.json`.](/code-components/installation) It's recommended to create your code component file alongside your React component, adding `.webflow` to the name. For example, `Button.webflow.tsx` for `Button.tsx`.

<Warning title="File names are the unique identifier of your code component">

Renaming a definition file creates a new component and removes the old one from your library. If designers are already using the old component in their projects, those instances will break and need to be manually replaced.

</Warning>

## Imports

Every code component definition file needs to import your React component, Webflow functions, and any styles you want to apply to the component.

```tsx title={"Button.webflow.tsx"}
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { Button } from "./Button";
// import '../styles/global.css'; // Import global styles
```

<Note title="Styling components">
Code components render in Shadow DOM, encapsulating them from the rest of the page, which impacts several CSS capabilities. 
 
 [Learn more about styling components →](/code-components/styling-components).
</Note>

## Declare component

The `declareComponent` function is used to create a code component definition. It takes two arguments:

- The React component
- An object with: Component metadata, prop definitions, and optional configuration

### Component metadata

The metadata properties define how your component appears in the Webflow designer:

```tsx title={"Button.webflow.tsx"}
import { declareComponent } from "@webflow/react";
import { Button } from "./Button";
// import '../styles/global.css'; // Import global styles

// Declare the component
export default declareComponent(Button, {
  // Component metadata
  name: "Button",
  description: "A button component with a text and a style variant",
  group: "Interactive",
});
```

- **`name`**: The name designers see in the component panel
- **`description?`**: Description to provide context for the component's purpose (optional)
- **`group?`**: Organize components into groups in the component panel (optional)

### Prop definitions

The `props` object defines which properties of your React component a designer can edit in Webflow. Declare a prop for each editable property in your React component and provide metadata that will appear in the designer. To see a list of all available prop types and their configuration options, see the [prop types reference. →](/code-components/reference/prop-types)

The below examples show a React component, its corresponding code component definition file, and how it appears in Webflow.

<Tabs>

<Tab title="React component">
    This React component expects a `buttonText` property, and a `variant` property.

```tsx title={"Button.tsx"}
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  variant: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ text, variant }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} type="button">
      {text}
    </button>
  );
};
```

</Tab>

<Tab title="Code component">

This code component definition file declares a `buttonText` and `variant` prop for the `Button` component.

```tsx title={"Button.webflow.tsx"}
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { Button } from "./Button";
// import '../styles/global.css'; // Import global styles

// Declare the component
export default declareComponent(Button, {
  // Component metadata
  name: "Button",
  description: "A button component with a text and a style variant",
  group: "Interactive",

  // Prop definitions
  props: {
    text: props.Text({
      name: "Button Text",
      defaultValue: "Click me",
    }),
    variant: props.Variant({
      name: "Style",
      options: ["primary", "secondary"],
      defaultValue: "primary",
    }),
  },
});
```

</Tab>
    <Tab title="Component in Webflow">

    Once shared with designers, the component will appear in the component panel. And can be added to a page with editable props.
            <div style={{width: "50%", margin: "0 auto"}}>
                <Frame>
                    <img src="file:60382072-ca01-4f0a-88ff-fc7d7c9beb84" alt="Webflow props" />
                </Frame>
            </div>
    </Tab>

</Tabs>

See more examples in the [prop types reference. →](/code-components/reference/prop-types)

### Options

The `options` object is used to configure the component for more advanced use cases. Options accepts the following properties:

| Option              | Type    | Default | Description                                      |
| ------------------- | ------- | ------- | ------------------------------------------------ |
| `applyTagSelectors` | boolean | `false` | Whether to apply tag selectors to the component. |
| `ssr`               | boolean | `true`  | Whether to disable server-side rendering.        |

#### Tag selectors

Styles targeting a tag selector (for example, `h1`, `p`, `button`) can be automatically provided to the Shadow DOM with the `applyTagSelectors` option. This is helpful for styling components with CSS selectors.

[See more about styling components in the styling documentation. →](/code-components/styling-components)

#### Server-side rendering (SSR)

By default, Webflow will load your component on the server. This means that the component will be rendered on the server, but the DOM will be hydrated on the client-side. This is helpful for improving the performance of your component.

You can disable this behavior by setting `ssr` to `false`.

## Best practices

<Accordion title="File naming and organization">

- **Use consistent naming**: `ComponentName.webflow.tsx` for all code component definitions
- **Keep code component definitions close**: Place `.webflow.tsx` files next to their React components

</Accordion>
<Accordion title="Component metadata">

- **Use clear names**: Make it obvious what the component does
- **Add descriptions**: Help designers understand the component's purpose
- **Group logically**: Use groups to organize components in the panel

</Accordion>
<Accordion title="Prop definitions">

- **Provide helpful defaults**: Make components work immediately when added
- **Use descriptive names**: The `name` property appears in the designer
- **Group related props**: Consider how props will appear together in the designer

</Accordion>

## Next steps

Now that you understand code component definitions, you can:

- **[Understand styling](/code-components/styling-components)** - Learn about how to style your components.
- **[Explore prop types](/code-components/reference/prop-types)** - Learn about all available prop types
- **[Configure bundling](/code-components/bundling-and-import)** - Set up your build process
- **[Importing your components](/code-components/bundling-and-import)** - Share your components with designers and other developers

---

title: Bundling and Import
slug: bundling-and-import
description: Learn how to bundle and import your React components into Webflow.
hidden: false
max-toc-depth: 2
subtitle: Understand how Code Components are bundled and imported into Webflow.
canonical-url: 'https://developers.webflow.com/code-components/bundling-and-import'

---

This reference covers bundling your React components and importing them to Webflow.

## Import

Import your components to Webflow using DevLink. DevLink bundles your component files and uploads them to your Workspace as a [shared library](https://help.webflow.com/hc/en-us/articles/33961343551763-Libraries).

Use the following command to import your components to Webflow:

```bash
npx webflow library share
```

### CI/CD pipelines

For automated workflows, add the `--no-input` flag to skip interactive prompts:

```bash
npx webflow library share --no-input
```

**Important:** Add change detection to prevent inadvertently removing components:

- Compare current library state with previous import
- Only share when components have actually changed

For more options, see the [Webflow CLI reference. →](/code-components/reference/cli).

## Bundling

Webflow uses Webpack to bundle your component libraries. During this process, the bundler handles TypeScript compilation, resolves all dependencies and imports, optimizes your code for production, and generates bundles ready for import.

The default configuration handles most use cases automatically. Extend it when you need:

- **Custom CSS processing**
- **Specialized file handling** (SVG, images, fonts)
- **Build optimizations** (tree shaking, code splitting)

To override the default configuration, see the guide on [Webpack configuration overrides](/code-components/bundling-and-import#overriding-the-default-webpack-configuration).

<Note title="Using CSS frameworks and component libraries">
If you're using a CSS framework or component library, you may need to configure your project to handle the framework's CSS. See the [frameworks and libraries guide](/code-components/frameworks-and-libraries) for more information.
</Note>

### Bundle limits

Maximum bundle size: 50MB

## Debugging

This section provides common debugging techniques for troubleshooting the bundling process and resolving configuration issues.

### Disable minification

By default, the bundler minifies your code to reduce file size for production. To troubleshoot issues, you can disable minification in your webpack configuration.

This keeps your bundled code readable and ensures that any errors you see in the **browser's developer console** will have accurate line numbers that map back to your original source code.

```js title={"webpack.webflow.js"}
module.exports = {
  mode: "development",
};
```

<Warning title="Include the Webpack configuration file in your `webflow.json">
When using a custom webpack configuration file, you must include the file in your `webflow.json` file by passing the path to the file in the `bundleConfig` property.

```json
{
  "library": {
    "name": "My Library",
    "components": ["./src/components/**/*.webflow.{js,ts,tsx}"],
    "bundleConfig": "./webpack.webflow.js"
  }
}
```

</Warning>

### CSS modules

CSS Modules scope styles by generating unique class names, preventing conflicts between components.

By default, you must use bracket notation to access CSS classes:

```tsx title={"Button.tsx"}
import * as styles from "./Button.module.css";

export const Button = (text: string) => {
  return <a className={(styles as any)["my-button"]}>{text}</a>;
};
```

To enable dot notation, and to use the default import syntax for CSS modules, update the `css-loader` configuration:

```js title={"webpack.webflow.js"}
module.exports = {
  module: {
    // Override the existing rules to modify CSS processing
    rules: (currentRules) => {
      return currentRules.map((rule) => {
        // Find the rule that handles CSS files
        if (
          rule.test instanceof RegExp &&
          rule.test.test("test.css") &&
          Array.isArray(rule.use)
        ) {
          for (const [index, loader] of rule.use.entries()) {
            // Find the css-loader
            if (typeof loader === "object" && loader?.ident === "css-loader") {
              // Preserve existing options and add a custom configuration
              const options =
                typeof loader.options === "object" ? loader.options : {};
              rule.use[index] = {
                ...loader,
                options: {
                  ...options,
                  modules: {
                    exportLocalsConvention: "as-is", // Use original class names
                    namedExport: false, // ⚠️ Allow dot notation access
                  },
                },
              };
            }
          }
        }
        return rule;
      });
    },
  },
};
```

## Bundle locally

To test and debug your React components locally, you can bundle your library using the Webflow CLI command.

```bash
npx webflow library bundle --public-path http://localhost:4000/
```

The public path is the URL where you can serve your bundled library. The CLI will generate a `dist` folder with your bundled library.

To inspect the final configuration being used by webpack, use the `--debug-bundler` option.

---

title: Webpack Configuration Overrides
subtitle: >-
Customize your webpack configuration for advanced implementation of code
components
slug: webpack-configuration-overrides
description: Customize your webpack configuration for advanccode components
keywords: 'webpack, configuration, customization, code components'

---

This guide covers how to customize your webpack configuration for advanced implementation of code components.

## Overview

The CLI uses an internal webpack configuration optimized for Webflow's requirements, including Module Federation, CSS extraction, TypeScript/React support, and other optimizations. When you need to customize this configuration, you can provide an override configuration file that will be merged with the base configuration.

### Review the default configuration

To view the webpack configuration used to bundle your library, use the `--debug-bundler` flag when running `library` commands:

```shell
npx webflow library bundle --debug-bundler
```

This will output the final merged webpack configuration to help you understand how your overrides are being applied.

## Configuration file setup

<Steps>
    <Step title="Specify the configuration path">

In your [`webflow.json` manifest file](/code-components/installation#webflowjson), add a `bundleConfig` property pointing to your configuration file:

```json title="webflow.json"
{
  "library": {
    "name": "My Library",
    "components": ["./src/components/**/*.webflow.{js,ts,tsx}"],
    "bundleConfig": "./webpack.override.js"
  }
}
```

    </Step>
    <Step title="Create your override configuration">

Create a CommonJS module that exports your webpack configuration overrides, for example:

```javascript title="webpack.override.js"
module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
  },
  // ...other custom configurations go here
};
```

    </Step>

</Steps>

## Configuration API

Your override configuration should follow the standard [Webpack Configuration API](https://webpack.js.org/configuration/) with the following important exceptions and special handling:

### Blocked properties

The following properties are **automatically filtered out** and can't be overridden for security and compatibility reasons:

| Property | Description                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `entry`  | Specifies the entry points for the application bundle. Determines which files webpack starts building the dependency graph from. |
| `output` | Defines how and where webpack emits the bundled files, including output directory and filename patterns.                         |
| `target` | Sets the environment in which the bundle should run (e.g., `web`, `node`). Affects how webpack builds and optimizes the output.  |

If you attempt to override these properties, a warning will be logged and they will be ignored.

### Special property handling

#### Module rules

Instead of providing an array of rules, you must provide a **function** that receives the current rules and returns the modified rules array:

```javascript
module.exports = {
  module: {
    rules: (currentRules) => {
      // Your custom logic adding/modifying loaders goes here
      return modifiedRules;
    },
  },
};
```

#### Plugins

Your custom `plugins` array is merged with the default configuration using `webpack-merge`.

To prevent common build errors, the following plugins are automatically de-duplicated, ensuring only one instance is present in the final configuration:

- `ModuleFederationPlugin`
- `MiniCssExtractPlugin`

## Examples

### Add a new loader

To handle file types that build on existing configurations (like SCSS extending CSS), you can add a new rule that reuses parts of an existing loader chain. This ensures consistency and compatibility.

<Note title="Support for common CSS frameworks">

Code components support popular CSS frameworks and libraries, including Tailwind CSS, styled-components, and Emotion, material UI, shadcn/ui, and more. For detailed guidance on using these frameworks with code components, see the [frameworks and libraries guide](/code-components/frameworks-and-libraries).
</Note>

The example below adds a rule for `.scss` files by finding the existing CSS rule and appending `sass-loader` to it:

```javascript title="webpack.override.js"
module.exports = {
  module: {
    rules: (currentRules) => {
      const currentCSSRule = currentRules.find(
        (rule) =>
          rule.test instanceof RegExp &&
          rule.test.test("test.css") &&
          Array.isArray(rule.use)
      );
      return [
        ...currentRules,
        {
          test: /\.scss$/,
          use: [...currentCSSRule.use, "sass-loader"],
        },
      ];
    },
  },
};
```

### Add a new rule

To process custom file types not handled by the default configuration, add a new rule. The following example adds `markdown-loader` to handle `.md` files:

```javascript title="webpack.override.js"
module.exports = {
  module: {
    rules: (currentRules) => {
      return [
        ...currentRules,
        {
          test: /\.md$/,
          use: ["markdown-loader"],
        },
      ];
    },
  },
};
```

### Extend an existing loader

You can modify the options for an existing loader to customize its behavior. This requires finding the specific rule and then updating its `options` object.

The following example shows how to modify the `css-loader` to change its configuration for CSS Modules:

```javascript title="webpack.override.js"
module.exports = {
  module: {
    // Override the existing rules to modify CSS processing
    rules: (currentRules) => {
      return currentRules.map((rule) => {
        // Find the rule that handles CSS files
        if (
          rule.test instanceof RegExp &&
          rule.test.test("test.css") &&
          Array.isArray(rule.use)
        ) {
          for (const [index, loader] of rule.use.entries()) {
            // Find the css-loader
            if (typeof loader === "object" && loader?.ident === "css-loader") {
              // Preserve existing options and add a custom configuration
              const options =
                typeof loader.options === "object" ? loader.options : {};
              rule.use[index] = {
                ...loader,
                options: {
                  ...options,
                  modules: {
                    exportLocalsConvention: "as-is", // Use original class names
                    namedExport: false, // ⚠️ Allow dot notation access
                  },
                },
              };
            }
          }
        }
        return rule;
      });
    },
  },
};
```

### Add custom plugins

To add custom build-time functionality, provide an array of plugins. This example shows how to add a custom plugin to the configuration:

```javascript title="webpack.override.js"
const MyCustomPlugin = require("./my-custom-plugin");

module.exports = {
  plugins: [
    new MyCustomPlugin({
      option: "value",
    }),
  ],
};
```

### Provide aliases

To create shorter, more convenient import paths, define aliases in the `resolve.alias` object. This example creates an `@` alias that points to the project's root directory:

```javascript title="webpack.override.js"
module.exports = {
  resolve: {
    alias: {
      "@": process.cwd(),
    },
  },
};
```

## Best practices

1. **Use functions for module rules**: Always provide a function for `module.rules` to ensure proper integration with existing rules
2. **Minimal changes**: Only override what you absolutely need to customize
3. **Check for conflicts**: Ensure your custom loaders don't conflict with existing ones

## Troubleshooting

<Accordion title="Configuration not loading">
- Ensure the `bundleConfig` path in your `webflow.json` is correct and relative to your project root.
- Verify your configuration file exports a valid object using `module.exports`.
</Accordion>

<Accordion title="Rules not working">
- Make sure you're providing a function for `module.rules`, not an array.
- Check that your rule matching logic correctly identifies the rules you want to modify.
</Accordion>

<Accordion title="Plugins conflicting">
- Remember that `ModuleFederationPlugin` and `MiniCssExtractPlugin` are automatically de-duplicated.
- Ensure custom plugins don't conflict with the base configuration.
</Accordion>

For more information about webpack configuration options, refer to the [official Webpack documentation](https://webpack.js.org/configuration/).

---

title: Webflow CLI
slug: reference/cli
description: Learn about the Webflow CLI and DevLink.
hidden: false
subtitle: Learn about the Webflow CLI and DevLink.
max-toc-depth: 3
canonical-url: 'https://developers.webflow.com/code-components/reference/cli'

---

The Webflow CLI is the command line interface for developers to interact with Webflow. Use the CLI to manage DevLink by:

- Authenticating with your Webflow workspace or site
- Bundling components into importable libraries
- Exporting components from Webflow
- Importing components into Webflow

You can use the CLI directly in your project or in CI/CD pipelines to automate library imports.

## Installation

The Webflow CLI is available as a package on npm. You can install it to your project with the following command:

    ```bash
    npm i --save-dev @webflow/webflow-cli
    ```

{/_ <!-- vale on --> _/}

## Commands

### Import

To share your library to your Workspace, use the following command:

```bash
npx webflow library share
```

This command will:

- **Authorize your workspace:** The CLI will check for a Workspace authentication token in your `.env` file. If one isn't found, the CLI will prompt you to authenticate by opening a browser window to the Workspace authorization page.
- **Bundle your library:** The CLI will bundle your library, and ask you to confirm the components you want to share.
- **Upload your library to your Workspace**

#### Options

You can use the following options to customize sharing:

| Command Option | Description                                                                                        | Default                                                  |
| -------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `--manifest`   | Provide the path to the `webflow.json` file.                                                       | Scans the current directory for `webflow.json`.          |
| `--api-token`  | Pass a Workspace API token.                                                                        | Uses `WEBFLOW_WORKSPACE_API_TOKEN` from the `.env` file. |
| `--no-input`   | Avoid prompting or doing anything interactive. Useful for CI/CD pipelines.                         | No                                                       |
| `--verbose`    | Display more information for debugging purposes.                                                   | No                                                       |
| `--dev`        | Bundle in development mode for debugging purposes. This will disable minification and source maps. | No                                                       |

### Bundle

Bundle your library locally for debugging and testing. The `share` command automatically bundles your library, but you can use `bundle` for local development.

```bash
npx webflow library bundle --public-path http://localhost:4000/
```

#### Options

| Command Option    | Description                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `--public-path`   | Required. The URL where you can serve your library.                                                |
| `--force`         | Forces the bundler to finish compiling, even if there are warnings.                                |
| `--dev`           | Bundle in development mode for debugging purposes. This will disable minification and source maps. |
| `--debug-bundler` | Print the final configuration being used by webpack.                                               |

### Log

Get the logs with debug information for your last library import.

```bash
npx webflow library log
```

## CI/CD workflows

{/_ <!-- vale on --> _/}

Use the CLI in automated workflows by adding the `--no-input` option to avoid interactive prompts.

**Important:** Implement change detection before sharing to avoid unintentionally removing components:

- Compare current library state with previous import
- Only share when components have actually changed

```bash
npx webflow library share --no-input
```

## Troubleshooting

<Accordion title="Authentication">
If you're having trouble authenticating with your Workspace, try the following:

- Check your `.env` file for the `WEBFLOW_WORKSPACE_API_TOKEN` variable. Be sure to use a Workspace API token, not a Site API token.
- Try running the share command with the `--verbose` flag to see if there is additional information in the output.
  ```bash
  npx webflow library share --verbose
  ```
- If you're still having trouble, try running the share command with the `--api-token` flag to manually pass in your API token.
  ```bash
  npx webflow library share --api-token <your-api-token>
  ```
  </Accordion>

<Accordion title="Prompts for component removal">

If the CLI is warning you that you're about to remove components, it's because the CLI is comparing the current library state with the previous import. Be sure your component name matches the name in the previous . Otherwise, the CLI will create a new component and remove the old one.
</Accordion>

---

title: Define a code component
slug: reference/hooks/declareComponent
description: Use the declareComponent function to create a code component definition
hidden: false
max-toc-depth: 2
canonical-url: >-
https://developers.webflow.com/code-components/reference/hooks/declareComponent

---

## `declareComponent(Component, data)`

The `declareComponent` function is used to create a code component declaration. See the [declare code component guide](/code-components/define-code-component) for more information.

## Syntax

```typescript
declareComponent(Component, data): void;
```

### Parameters

- **`Component`**: The React component to declare
- **`Data`**: An object with: Component metadata, prop definitions, and optional configurations

#### Data object

The `data` object is used to define the component's metadata, prop definitions, and optional configurations. It takes the following properties:

| Property       | Type   | Description                                                                                                                        |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `name`         | string | The name of the component                                                                                                          |
| `description?` | string | A description of the component (optional)                                                                                          |
| `group?`       | string | Group of the component in the component panel (optional)                                                                           |
| `props`        | object | Props for the user to edit in Webflow. See the [prop types reference](/code-components/reference/prop-types) for more information. |
| `options?`     | object | Optional configurations including applying tag selectors, and managing SSR.                                                        |

## Example

```tsx title={"Button.webflow.tsx"}
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { Button } from "./Button";
// import '../styles/global.css'; // Import global styles

// Declare the component
export default declareComponent(Button, {
  // Component metadata
  name: "Button",
  description: "A button component with a text and a style variant",
  group: "Interactive",

  // Prop definitions
  props: {
    text: props.Text({
      name: "Button Text",
      defaultValue: "Click me",
    }),
    variant: props.Variant({
      name: "Style",
      options: ["primary", "secondary"],
      defaultValue: "primary",
    }),
  },
  // Optional configuration
  options: {
    applyTagSelectors: true,
  },
});
```

---

title: Use Webflow Context
slug: reference/hooks/useWebflowContext
description: >-
Access the current Webflow context to understand the rendering environment and
mode.
hidden: false
max-toc-depth: 2
canonical-url: >-
https://developers.webflow.com/code-components/reference/hooks/useWebflowContext

---

## `useWebflowContext()`

Call the `useWebflowContext` hook to get information about the current Webflow environment.

Webflow provides multiple modes to support different parts of the design process including designing, page building, previewing, and publishing. The `useWebflowContext` hook provides information about the current mode and locale to help you adapt your component's behavior and content accordingly.

Use `useWebflowContext` when you need to:

- **Adapt component behavior** depending on the mode, provide placeholders, expanded states, or guidance for designers.
- **Control interactivity** - When in a non-interactive state, provide
- **Handle localization** with locale-specific content and formatting

## Syntax

```typescript
useWebflowContext(): WebflowContext;

// Type definitions
type WebflowContext = {
  mode: WebflowMode;
  interactive: boolean;
  locale: string | null;
};

type WebflowMode =
  | "design"
  | "build"
  | "edit"
  | "preview"
  | "component-preview"
  | "comment"
  | "analyze"
  | "publish";
```

## Returns

**`WebflowContext`** - An object containing the current mode, interactive state, and locale.

### WebflowContext properties

| Property      | Type             | Description                                                                      |
| ------------- | ---------------- | -------------------------------------------------------------------------------- |
| `mode`        | `WebflowMode`    | The current Webflow mode                                                         |
| `interactive` | `boolean`        | Whether the component is in an interactive state                                 |
| `locale`      | `string \| null` | The current ISO string for the current locale, or `null` if the locale isn't set |

## Examples

### Conditional rendering based on interactive state

In this example, the accordion component opens by default in design mode (when not interactive) so designers can see the full content while working.

```tsx title={"interactive.tsx"}
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useWebflowContext } from "@webflow/react";

const MyComponent = ({ text, variant }: { text: string; variant: string }) => {
  const { interactive } = useWebflowContext();

  // Open accordion by default in design mode (when not interactive)
  // so designers can see the full content while working
  return (
    <div>
      <h1>My Component</h1>
      <Accordion defaultExpanded={!interactive}>
        <AccordionSummary
          expandIcon={<span>▼</span>}
          aria-controls="content-section-content"
          id="content-section-header"
        >
          <Typography>Content Section</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This content is visible by default in design mode.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MyComponent;
```

### Locale-aware content

In this example, the component automatically switches to Spanish and French based on the locale.

```tsx title={"locale.tsx"}
import { useWebflowContext } from "@webflow/react";

const LocalizedComponent = () => {
  // Get the current locale
  const { locale } = useWebflowContext();

  //  Get the localized content based on the locale
  const getLocalizedContent = () => {
    switch (locale) {
      case "es":
        return {
          title: "Bienvenido a nuestro sitio",
          description: "Descubre nuestros productos y servicios",
          cta: "Comenzar ahora",
        };
      case "fr":
        return {
          title: "Bienvenue sur notre site",
          description: "Découvrez nos produits et services",
          cta: "Commencer maintenant",
        };
      default:
        return {
          title: "Welcome to our site",
          description: "Discover our products and services",
          cta: "Get started",
        };
    }
  };

  const content = getLocalizedContent();

  //  Render the localized content
  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {content.cta}
      </button>
    </div>
  );
};

export default LocalizedComponent;
```

---

title: Prop Types
slug: reference/prop-types
description: Learn about the different prop types available for code components.
hidden: false
max-toc-depth: 2
subtitle: Define configurable properties to use in the Webflow designer.
canonical-url: 'https://developers.webflow.com/code-components/reference/prop-types'

---

Prop types define the configurable properties that designers can edit in the Webflow designer. When you create a code component, you specify which React component properties to expose to designers, and how they should appear in Webflow.

## Defining props in your code component

In your `declareComponent` function, include a `props` property that maps your React component's properties to Webflow prop types. This tells Webflow:

- Which properties designers can configure.
- How each property should appear in the designer
- Which values are valid for each property
- Default values for each property (for certain prop types)

## Basic usage

```tsx title={"Button.webflow.tsx"}
import { Button } from "./Button";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(Button, {
  name: "Button",
  description: "A button component",
  group: "Interaction",
  props: {
    // Expose the 'text' prop as a text field
    text: props.Text({
      name: "Button text",
      defaultValue: "Hello World!",
    }),

    // Expose the 'variant' prop as a dropdown named 'Style'
    variant: props.Variant({
      name: "Style",
      options: ["primary", "secondary"],
    }),
  },
});
```

## Available prop types

Choose the appropriate prop type based on what you want designers to configure:

### Text and content

- **[Text](/code-components/reference/prop-types/text)** - Single line text input
- **[Rich Text](/code-components/reference/prop-types/rich-text)** - Multi-line text with formatting
- **[Text Node](/code-components/reference/prop-types/text-node)** - Single and Multi-line text that designers can edit on the canvas
- **[Link](/code-components/reference/prop-types/link)** - URL input with validation

### Assets and data

- **[Image](/code-components/reference/prop-types/image)** - Image upload and selection
- **[Number](/code-components/reference/prop-types/number)** - Numeric input with validation
- **[Boolean](/code-components/reference/prop-types/boolean)** - True/false toggle

### Structure and styles

- **[Variant](/code-components/reference/prop-types/variant)** - Dropdown with predefined options
- **[Visibility](/code-components/reference/prop-types/visibility)** - Show/hide controls
- **[Slot](/code-components/reference/prop-types/slot)** - Content areas for other components
- **[ID](/code-components/reference/prop-types/id)** - HTML Element ID

## Prop values

Each prop type returns a value to your React component. For example, `props.Text` returns a string, while `props.Link()` returns an object with `href` and `target` properties.

Most times, you can map the prop values directly. For example, if your React component expects `text` as a string, you can map it to a `props.Text` prop.

However, if your React component expects specific properties from the returned object, you need to create a wrapper component that transforms the data. For example, the `props.Link()` prop type returns the following object:

```tsx title="Link prop value"
{
  href: string;
  target?: "_self" | "_blank" | string;
  preload?: "prerender" | "prefetch" | "none" | string;
}
```

If your React component expects `href` and `target` separately, you need to create a wrapper component that transforms the data:

{/_ <!-- vale off --> _/}
<CodeBlocks>

```tsx title={"Button.webflow.tsx"}
import { props, PropType, PropValues } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import React from "react";
import Button, { ButtonProps } from "./Button";

// Remove href and target from the props to prevent conflicts
type WebflowButtonProps = {
  link: PropValues[PropType.Link];
} & Omit<ButtonProps, "href" | "target">; // Remove buttonText from the props

// Wrapper that destructures the object returned from `props.Link` and passes the href and target to the button component as expected.
const WebflowButton = ({
  link: { href, target },
  ...props
}: WebflowButtonProps) => {
  return <Button href={href} target={target} {...props} />;
};

// Component declaration for Webflow
export default declareComponent(WebflowButton, {
  name: "Button",
  props: {
    buttonText: props.Text({
      name: "Text",
      defaultValue: "Lorem ipsum",
    }),
    link: props.Link({ name: "Link" }),
  },
});
```

```tsx title={"Button.tsx"}
// React component expects href and target separately
interface ButtonProps {
  buttonText: string;
  href: string;
  target: string;
}

export const Button = ({ buttonText, href, target }: ButtonProps) => {
  return (
    <a href={href} target={target}>
      {buttonText}
    </a>
  );
};
```

</CodeBlocks>
{/* <!-- vale on --> */}

This example definition file:

- Imports the `PropType` and `PropValues` types from the `@webflow/data-types` package.
- Defines a link prop for the `Button` component. This will provide a link picker in Webflow and return the `href` and `target` values.
- Adjusts the TypeScript types of the `Button` component to include the `link` object returned from the `props.Link` prop type.
- Wraps the `Button` component in a new component that gets the `href` and `target` values from the `link` object and passes them to the `Button` component as expected.

## Best practices

### Provide helpful defaults

Always set meaningful default values so components work immediately when added to a page. Some prop types have default values built in, like `props.Text` which defaults to an empty string. However, you may want to set a default value in your React component as well.

```tsx
title: props.Text({
  name: 'Button Text',
  defaultValue: 'Click me', // Component works out of the box
}),
```

### Use succinct names

The `name` property appears in the Webflow designer, keep them short and title case. Use descriptions to provide more context.

### Group related props

Consider how props will appear together in the designer. Use the `group` property to group related props together.

```tsx title="Card component"
props: {
  heroTitle: props.Text({ name: 'Hero Title', group: 'Content' }),
  text: props.Text({ name: 'Text', group: 'Button' }),
  style: props.Variant({ name: 'Style', group: 'Button' }),
  size: props.Variant({ name: 'Size', group: 'Button' }),
}
```

## Example: Complete component

Here's how you might define props for a button component:

```tsx title={"Card.webflow.tsx"}
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import Card from "./Card";

export default declareComponent(Card, {
  name: "Card",
  description: "A card component",
  group: "Content",
  props: {
    variant: props.Variant({
      name: "Variant",
      options: ["Horizontal", "Vertical"],
    }),
    title: props.Text({
      name: "Title",
      defaultValue: "Card title",
    }),
    text: props.Text({
      name: "Text",
      defaultValue: "Hello World!",
    }),
    buttonVisible: props.Visibility({
      group: "Button",
      name: "Visibility",
      defaultValue: true,
    }),
    buttonVariant: props.Variant({
      group: "Button",
      name: "Variant",
      options: ["Primary", "Secondary", "Outline"],
    }),
    buttonText: props.Text({
      group: "Button",
      name: "Text",
      defaultValue: "Click me",
    }),
    buttonLink: props.Link({
      group: "Button",
      name: "Link",
    }),
  },
});
```
