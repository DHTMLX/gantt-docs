---
title: "Using Packages After Your Subscription Expires"
sidebar_label: "After Subscription Expires"
description: "How to back up and keep using the paid DHTMLX @dhx Gantt npm packages after your subscription ends."
---

# Using Packages After Your Subscription Expires

The paid Gantt packages - the commercial JavaScript library (`@dhx/gantt`) and the framework wrappers (`@dhx/react-gantt`, `@dhx/angular-gantt`, `@dhx/vue-gantt`) - are hosted on the private registry at `https://npm.dhtmlx.com`. Access to that registry is tied to your subscription: once it expires, you can no longer install or reinstall these packages from npm.

The versions you are entitled to under your license remain yours to use. To keep installing them after the subscription ends, make a local backup **before** your subscription expires.

:::tip
Do this while your subscription is still active - once access to `npm.dhtmlx.com` is gone, you can no longer pull the packages down.
:::

:::note
This applies only to the paid `@dhx` packages. The public `dhtmlx-gantt` (Community) and `@dhtmlx/trial-*` (evaluation) packages live on the public npm registry and are not affected.
:::

## Back up your packages

### 1. Install the packages into a temporary project

~~~bash
mkdir dhtmlx-backup
cd dhtmlx-backup
npm init -y
npm install <your-dhtmlx-packages>   # e.g. npm install @dhx/gantt @dhx/react-gantt
~~~

### 2. Pack each library

The installed libraries are in `node_modules/@dhx`. For each package you want to keep, run `npm pack`:

~~~bash
cd node_modules/@dhx/<package-name>
npm pack
~~~

This generates a `.tgz` file in the current directory (for example `dhx-gantt-9.0.10.tgz`). Copy the generated `.tgz` files to a safe location - for example a `./lib/` folder in your project.

## Use the backed-up packages

Reference the local `.tgz` files in your project's `package.json` instead of the registry:

~~~json
"dependencies": {
  "@dhx/gantt": "file:./lib/dhx-gantt-9.0.10.tgz"
}
~~~

Then run `npm install` as usual. npm resolves the dependency from the local file, so no registry access is required.

## Publishing to your own private registry

If you maintain your own npm registry, you can republish the backed-up packages there instead of referencing local files. Extract the package into a new folder (or copy it from `node_modules/@dhx/<package-name>`), open its `package.json`, and point `publishConfig` at your registry:

~~~json
"publishConfig": {
  "registry": "https://your.registry.example.com"
}
~~~

Then publish it:

~~~bash
npm publish
~~~

## If you missed the backup window

If you are unable to complete the backup before your subscription expires, email us at [info@dhtmlx.com](mailto:info@dhtmlx.com) and we'll send you the latest versions you're entitled to.
