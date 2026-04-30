---
title: Installing React Gantt
sidebar_label: Installation
description: "How to install the evaluation or commercial version of React Gantt via npm."
---

# Installing React Gantt

React Gantt is available in two distributions: 

1. **Evaluation version** publicly available on npm, includes a trial watermark, and can optionally be paired with a free evaluation period that grants access to technical support.
2. **Professional (commercial) version** available from the private DHTMLX npm repository and intended for production use.

Both packages contain the same API.

## Installing the Evaluation Version (public npm)

The evaluation build is available on npm as [@dhtmlx/trial-react-gantt](https://www.npmjs.com/package/@dhtmlx/trial-react-gantt):

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

Or with Yarn:

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

This build is fully functional, but shows a message indicating that the library is running in evaluation mode.

### Optional: Start a full evaluation period (recommended)

Although the trial package installs without restrictions, you may also start an official evaluation through the website at
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml).

Starting a formal evaluation gives you free technical support during the trial period.

**Downloading offline examples (zip)**

The evaluation form also includes downloadable ZIP containing offline-ready examples.

You can also explore additional examples and demo projects on the official GitHub by checking [React Gantt Demos on GitHub](https://github.com/DHTMLX/?q=react-gantt&type=all&language=&sort=).

## Professional Version (private npm)

The Professional version is used for production applications and includes commercial licensing and full access to technical support.

Once you obtain a commercial license, you can generate your private npm credentials in the [Client's Area](https://dhtmlx.com/clients/).

After generating your login/password, configure npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

Then install the Professional package:

~~~bash
npm install @dhx/react-gantt
~~~

Or, with Yarn:

~~~bash
yarn add @dhx/react-gantt
~~~

## Moving from the trial package to the commercial one

Most projects start on the trial package and switch later, once the prototype is approved and a commercial license is in place. Both packages share the same API, so the move is mostly mechanical: swap the package name, swap the CSS import, and reinstall.

After you've configured the private registry as shown above, update every import in the code:

~~~ts
// before
import Gantt from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

// after
import Gantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
~~~

Search the project for any remaining mentions of `@dhtmlx/trial-react-gantt`, including the CSS import path - that one is the easiest to forget. Replace the dependency in `package.json`, then `npm install` and run the app. If the watermark is gone and the rest of the UI behaves identically, the swap is done.


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

### AI app builders (Lovable and similar)

AI app builders like Lovable run their own build environments, and once you switch to `@dhx/react-gantt`, every `npm install` they run needs to authenticate against `https://npm.dhtmlx.com`.

There are two reasonable paths after the package swap:

- **Keep building in Lovable.** Attach the DHTMLX registry credentials to Lovable's build environment, usually as a secret that gets written into `.npmrc` at install time using the same `${DHTMLX_NPM_TOKEN}` pattern shown above. The exact mechanism for storing build secrets is a Lovable platform concern and may change over time - check current Lovable documentation when you set this up.
- **Move the build to your own CI.** Many teams use Lovable for prototyping and run production builds from Vercel, Netlify, GitHub Actions, or similar, all of which support attaching the npm token as a secret. In that setup the trial-to-commercial swap typically lands as you wire up the deployment pipeline, and Lovable doesn't need credentials because it's no longer doing the install.

If a Lovable build fails with 40x against `npm.dhtmlx.com` and you can't get the secret to land cleanly, the move-to-CI route is the reliable fallback.

## Next Steps

After installation, continue with:

- [](integrations/react/quick-start.md)
- [](integrations/react/overview.md)
- [](integrations/react/state/state-management-basics.md)
- [Framework Guides](/category/framework-integrations/)


