# SvelteKit with Primo
This repo demonstrates how you can serve Primo pages from a SvelteKit application. The magic happens in `hooks.server.js`, where particular routes are intercepted to download and serve a generated Primo page from the project's Github repository (which you would think would affect page speed but the effect seems marginal). With this approach, you could serve all your marketing pages from the same domain as your application, while enabling easy content editing & page building for those pages and a clear separation from the app logic. 

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
