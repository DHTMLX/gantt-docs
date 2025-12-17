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

## Next Steps

After installation, continue with:

- [](integrations/react/quick-start.md)
- [](integrations/react/overview.md)
- [](integrations/react/state/state-management-basics.md)
- [Framework Guides](/category/framework-integrations/)


