---
title: "How to Install dhtmlxGantt"
sidebar_label: "Installation"
---

# How to Install dhtmlxGantt 

You can use the [npm](https://www.npmjs.com/) package manager to install the dhtmlxGantt package into your project.

It's also possible to include the necessary JS/CSS files from CDN.

:::tip Using a frontend framework?
If you're building with React, Angular, or Vue, use the dedicated wrapper package and its installation guide instead of the core library:

- [React Gantt installation](integrations/react/installation.md)
- [Angular Gantt installation](integrations/angular/installation.md)
- [Vue Gantt installation](integrations/vue/installation.md)

The rest of this guide covers the core JavaScript library.
:::

## npm - Evaluation and PRO versions {#npmevaluationandproversions}

The Evaluation and Professional builds are published to the private DHTMLX npm registry under the `@dhx` scope. Point the `@dhx` scope at the registry first:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
~~~

**Professional Evaluation version**

The evaluation build is fully functional but displays a watermark indicating that it runs in evaluation mode. Install it with npm:

~~~bash
npm install @dhx/trial-gantt
~~~

You can also [start an official evaluation](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) on the website. A formal trial grants free technical support for the 30-day evaluation period and includes downloadable offline examples.

**Professional version**

The Professional build is intended for production and requires an active commercial license. After you obtain a license, generate your npm credentials in the [Client's Area](https://dhtmlx.com/clients/) and log in to the registry:

~~~bash
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

Then install the package:

~~~bash
npm install @dhx/gantt
~~~

Access to the private npm is available only while your proprietary Gantt license is active. To keep using the paid `@dhx` packages after your subscription expires, [back them up first](guides/using-packages-after-subscription-expires.md).

## Moving from the trial package to the commercial one

Most projects start on the evaluation package and switch once a commercial license is in place. Both packages share the same API, so the move is mostly mechanical:

1. [Configure the private registry and log in](#npmevaluationandproversions) with your commercial credentials.
2. In `package.json`, replace the `@dhx/trial-gantt` dependency with `@dhx/gantt` (keep the version you need).
3. Update every `@dhx/trial-gantt` reference in your code to `@dhx/gantt` - including the stylesheet import, if your setup imports the CSS separately.
4. Run `npm install` and rebuild.

Search the project for any leftover `@dhx/trial-gantt` mentions - the CSS import is the easiest to forget. See [Uninstall trial version](#uninstall-trial-version) for verifying that no evaluation files remain. Once the watermark is gone and the UI behaves identically, the swap is complete.

## npm - Community edition

You can install the free Community edition of dhtmlxGantt from [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt), by executing the following command line:

~~~html
npm install dhtmlx-gantt
~~~

:::note
Starting from v10, the public `dhtmlx-gantt` package is the **Community edition** under the **MIT license**. Earlier versions of the package (v9.x and below) are the legacy **GPL** edition; GPL v2 still applies to those versions.
:::


## CDN

To include JS/CSS files from CDN, you should set direct links to **dhtmlxgantt.js** and **dhtmlxgantt.css** files:

~~~html
<link rel="stylesheet" href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

You can find the full list of links that you can include from CDN, depending on the version of dhtmlxGantt in a [separate article](guides/cdn-links-list.md).

:::note
For v10 and later, the CDN serves the **Community edition** under the MIT license.
:::

## Download the Package

### Community edition

[Download the package of the free dhtmlxGantt Community edition](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml).

### Legacy GPL versions

The free edition prior to v10 was distributed under the **GPL** license. These versions (v9.x and earlier) remain available and GPL v2 still applies to them; they live in a dedicated branch of the [main GitHub repository](https://github.com/DHTMLX/gantt) but are no longer actively maintained.


### PRO version

If you have the PRO version of the component, you need to go to the [Client Area](https://dhtmlx.com/clients/) and download the PRO package from there.

Independent of the version, unpack the downloaded package into a folder of your project. 
Then include **dhtmlxgantt.js** and **dhtmlxgantt.css** files into a page. Make sure that you set correct relative paths to these files:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~

## Adding PRO Edition into Project

### **Install Pro version**

:::note
Before installing the Pro version of Gantt, you should [uninstall the trial version package](#uninstall-trial-version) (if you've installed it)
:::

The Professional and Evaluation builds are installed from the [private npm registry](#npmevaluationandproversions) described above. If that isn't an option, there are two other ways to add the Pro version:
 
- you can add the Pro version to your project by hand
- you can install the Pro version to your project via npm from a local directory

### Installing the package from a local folder {#installfromlocalfolder}

If case of **npm**, you can install the Pro package from a local folder using  [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) or [`npm link`](https://docs.npmjs.com/cli/link/).
There are step-by-step instructions for both variants:

#### npm install

1. Copy the Gantt package into some local directory.
2. Go to your project directory. 
3. Call `npm install ../gantt-local-package-path`.

#### npm link

1. Copy the Gantt package into some local directory.
2. Call `npm link` in the package folder.
3. Go to your project directory.
4. Call `npm link dhtmlx-gantt`.

To see the difference between the Community and PRO versions of the dhtmlxGantt library, check the related article [Community vs PRO Library Versions](guides/editions-comparison.md).

### **Uninstall trial version** 

The correct way to install the Pro version would be to remove the trial version package:

~~~js
npm uninstall @dhx/trial-gantt
~~~

Then you need to thoroughly check that your applications don't have the *dhtmlxgantt.js* file anywhere.

**For Linux and MacOS**, you can use the following commands in the terminal:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

**For Windows**, you can use the following commands in the command line:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

After that you can install the Pro version of the Gantt chart as described above.
