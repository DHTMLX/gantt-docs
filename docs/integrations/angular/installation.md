---
title: Installing Angular Gantt
sidebar_label: Installation
description: "How to install the evaluation or professional version of Angular Gantt and wire imports in Angular projects."
---

# Installing Angular Gantt

Angular Gantt is available in two distributions:

1. **Evaluation version** publicly available on npm, includes a trial watermark, and can optionally be paired with a free evaluation period that grants access to technical support.
2. **Professional (commercial) version** available from the private DHTMLX npm repository and intended for production use.

Both packages contain the same API.

## Install The Evaluation Package (Public npm)

The evaluation build is available on npm as [@dhtmlx/trial-angular-gantt](https://www.npmjs.com/package/@dhtmlx/trial-angular-gantt):

- npm:

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

- Yarn:

~~~bash
yarn add @dhtmlx/trial-angular-gantt
~~~

This build is fully functional, but shows a message indicating that the library is running in evaluation mode.

### Optional: Start a full evaluation period (recommended)

Although the trial package installs without restrictions, you may also start an official evaluation through the website at
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-Angular/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-Angular/download.shtml).

Starting a formal evaluation gives you free technical support during the trial period.

**Downloading offline examples (zip)**

The evaluation form also includes downloadable ZIP containing offline-ready examples.

You can also explore additional examples and demo projects on the official GitHub by checking [Angular Gantt Demos on GitHub](https://github.com/DHTMLX/?q=angular-gantt&type=all&language=&sort=).

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
npm install @dhx/angular-gantt
~~~

- Yarn:

~~~bash
yarn add @dhx/angular-gantt
~~~

## Angular Project Requirements

Wrapper peer dependencies currently require:

- `@angular/common >= 19.0.0`
- `@angular/core >= 19.0.0`
- `rxjs >= 6.0.0`


## Import Matrix

Use imports that match the package channel you installed.

| Package | Wrapper import | CSS import |
| --- | --- | --- |
| `@dhtmlx/trial-angular-gantt` | `import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";` | `@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";` |
| `@dhx/angular-gantt` | `import { DhxGanttComponent } from "@dhx/angular-gantt";` | `@import "@dhx/angular-gantt/dist/angular-gantt.css";` |

Add the CSS import in your global Angular styles (for example `src/styles.css`).

This is the recommended default for Angular apps because Gantt styles are library-wide styles and do not need Angular component scoping.

## Global vs Component CSS Import

- **Global import:** import the wrapper CSS path from the matrix above in `src/styles.css` (or register it in `angular.json` `styles`). No special component encapsulation settings are required.
- **Component stylesheet import:** you can import the same CSS in a component `styleUrl`, but then Angular's default `ViewEncapsulation.Emulated` may scope selectors and prevent Gantt internal `.dhx-*` styles/overrides from applying as expected.

If you import Gantt CSS in a component stylesheet or define overrides for internal Gantt classes (for example `.dhx-gantt-root`) in that stylesheet, set:

~~~ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // ...
  encapsulation: ViewEncapsulation.None,
})
export class GanttPageComponent {}
~~~

Use the component import pattern mainly for self-contained demos/examples. For production apps, prefer the global import.

## Standalone vs NgModule Projects

The wrapper supports both Angular styles:

- **Standalone components**: import `DhxGanttComponent` in the component `imports` array.
- **NgModule-based apps**: import `DhxGanttModule` in your Angular module.

Standalone example:

~~~ts
import { Component } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>`,
})
export class GanttPageComponent {
  tasks = [];
  links = [];
}
~~~

NgModule example:

~~~ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DhxGanttModule } from '@dhtmlx/trial-angular-gantt';

@NgModule({
  imports: [BrowserModule, DhxGanttModule],
})
export class AppModule {}
~~~

## Moving from the trial package to the commercial one

Most projects start on the trial package and switch later, once the prototype is approved and a commercial license is in place. Both packages share the same API, so the move is mostly mechanical: swap the package name, swap the CSS import, and reinstall.

After you've configured the private registry as shown above, update every import in the code:

~~~ts
// before
import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";

// after
import { DhxGanttComponent } from "@dhx/angular-gantt";
~~~

And update the CSS import in `src/styles.css`:

~~~css
/* before */
@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";

/* after */
@import "@dhx/angular-gantt/dist/angular-gantt.css";
~~~

Search the project for any remaining mentions of `@dhtmlx/trial-angular-gantt`, including the CSS import path - that one is the easiest to forget. Replace the dependency in `package.json`, then `npm install` and run the app. If the watermark is gone and the rest of the UI behaves identically, the swap is done.

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

- [Quick Start with Angular Gantt](integrations/angular/quick-start.md)
- [Angular Gantt Overview](integrations/angular/overview.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
