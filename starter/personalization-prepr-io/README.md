---
name: Prepr.io Personalization Starter
slug: edge-functions-personalization-prepr-io
description: Learn how to use visitor's location and UTM tags to personalize content at the edge with Prepr.io.
framework: Next.js
useCase:
  - Starter
  - Edge Middleware
css: Tailwind
deployUrl: https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/starter/personalization-prepr-io&project-name=personalization-prepr-io&repository-name=personalization-prepr-io
demoUrl: https://personalization-nextjs.vercel.app
relatedTemplates:
  - edge-functions-i18n
---

# Personalization with Prepr and Next.js middleware

This example shows how to use the `event.request.geo` object and query parameters to personalize the page.

## Demo

https://personalization-nextjs.vercel.app

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/examples/tree/main/starter/personalization-prepr-io&project-name=personalization-prepr-io&repository-name=personalization-prepr-io)

### Clone and Deploy

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [pnpm](https://pnpm.io/installation), [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
pnpm create next-app --example https://github.com/vercel/examples/tree/main/starter/personalization-prepr-io prepr-personalization
# or
npx create-next-app --example https://github.com/vercel/examples/tree/main/starter/personalization-prepr-io prepr-personalization
# or
yarn create next-app --example https://github.com/vercel/examples/tree/main/starter/personalization-prepr-io prepr-personalization
```

Next, run Next.js in development mode:

```bash
pnpm dev

# or

npm install
npm run dev

# or

yarn
yarn dev
```

To see the personalization based on the visitor's location you need to deploy the app to Vercel.
For this example on local development the US is set as default.

### Create your own page

To create your own page you'll need a [Prepr](https://signup.prepr.io?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples) environment.
Use the option to create a new environment with demo content to get this starter working instantly.

Once that's done, copy the .env.example file in this directory to .env.local (which will be ignored by Git):

```
cp .env.example .env.local
```

Then open .env.local and set the environment variables to match the ones for your Prepr environment.

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=edge-middleware-eap) ([Documentation](https://nextjs.org/docs/deployment)).

## Next steps

- See [Getting started with Personalization](https://docs.prepr.io/optimization-and-personalization/personalized-stack) for an introduction on personalization with Prepr.