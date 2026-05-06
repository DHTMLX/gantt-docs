---
title: Installing Vue Gantt
sidebar_label: Installation
description: "How to install the evaluation or professional version of Vue Gantt via npm or yarn."
---

# Installing Vue Gantt

Vue Gantt is available in two distributions:

1. **Evaluation version** publicly available on npm, includes a trial watermark, and can optionally be paired with a free evaluation period that grants access to technical support.
2. **Professional (commercial) version** available from the private DHTMLX npm repository and intended for production use.

Both packages contain the same API.

## Prerequisites

- Vue 3 project (or a project where you plan to add Vue 3)
- Node.js installed
- npm or Yarn available
- DHTMLX private npm access (professional package only)

## Install The Evaluation Package (Public npm)

The evaluation build is available on npm as [@dhtmlx/trial-vue-gantt](https://www.npmjs.com/package/@dhtmlx/trial-vue-gantt):

- npm:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

- Yarn:

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

This build is fully functional, but shows a message indicating that the library is running in evaluation mode.

### Optional: Start a full evaluation period (recommended)

Although the trial package installs without restrictions, you may also start an official evaluation through the website at
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-Vuejs/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-Vuejs/download.shtml).

Starting a formal evaluation gives you free technical support during the trial period.

**Downloading offline examples (zip)**

The evaluation form also includes downloadable ZIP containing offline-ready examples.

You can also explore additional examples and demo projects on the official GitHub by checking [Vue Gantt Demos on GitHub](https://github.com/DHTMLX/?q=vue-gantt&type=all&language=&sort=).

## Install The Professional Package (Private npm)

The Professional version is used for production applications and includes commercial licensing and full access to technical support.

Once you obtain a commercial license, you can generate your private npm credentials in the [Client's Area](https://dhtmlx.com/clients/).

After generating your login/password, configure npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

Then install the Professional package:

- npm:

~~~bash
npm install @dhx/vue-gantt
~~~

- Yarn:

~~~bash
yarn add @dhx/vue-gantt
~~~

## Use The Matching Imports

Use imports that match the package you installed.

| Package | Component import | CSS import |
| --- | --- | --- |
| `@dhtmlx/trial-vue-gantt` | `import VueGantt from "@dhtmlx/trial-vue-gantt";` | `import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";` |
| `@dhx/vue-gantt` | `import VueGantt from "@dhx/vue-gantt";` | `import "@dhx/vue-gantt/dist/vue-gantt.css";` |

## Check Version Requirements

Wrapper peer dependency:

- `vue >= 3.2.25`

## Moving from the trial package to the commercial one

Most projects start on the trial package and switch later, once the prototype is approved and a commercial license is in place. Both packages share the same API, so the move is mostly mechanical: swap the package name, swap the CSS import, and reinstall.

After you've configured the private registry as shown above, update every import in the code:

~~~ts
// before
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

// after
import VueGantt from "@dhx/vue-gantt";
import "@dhx/vue-gantt/dist/vue-gantt.css";
~~~

Search the project for any remaining mentions of `@dhtmlx/trial-vue-gantt`, including the CSS import path - that one is the easiest to forget. Replace the dependency in `package.json`, then `npm install` and run the app. If the watermark is gone and the rest of the UI behaves identically, the swap is done.

### Using the registry from CI or shared build environments

`npm login` works fine on a developer machine, but CI runners and other shared build environments typically can't run an interactive login. For those, generate a non-interactive access token from a logged-in machine:

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

The token is printed once in the terminal output - copy it before closing the session, since it cannot be retrieved later. Then expose it through an `.npmrc` file that the build can read:

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

Set `DHTMLX_NPM_TOKEN` as a secret in the CI provider (GitHub Actions, GitLab, etc.) so the token never gets committed. The same pattern works for Docker builds - inject the token at build time rather than baking it into the image.

If `npm install` fails on CI with a 401 or 403 against `npm.dhtmlx.com`, the secret is either missing, expired, or the `.npmrc` file isn't where npm expects it (the project root is the safest location).

## What To Read Next

- [Quick Start with Vue Gantt](integrations/vue/quick-start.md)
- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
