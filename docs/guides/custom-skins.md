---
title: "Skins Customization"
sidebar_label: "Skins Customization"
---

Skins Customization
========================

Starting from v9.0 Gantt skins use CSS variables that you can use for customization and styling.


[Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


Key CSS Variables:

~~~css
:root {
    --dhx-gantt-theme: terrace;
    --dhx-gantt-font-family: Inter, Helvetica, Arial, sans-serif;
    --dhx-gantt-font-size: 14px;


    --dhx-gantt-base-colors-white: #FFFFFF;
    --dhx-gantt-base-colors-select: #EFF3FF;
    --dhx-gantt-base-colors-hover-color: #e0e0e0;
    --dhx-gantt-base-colors-border-light: #F0F0F0;
    --dhx-gantt-base-colors-border: #DFE0E1;

    --dhx-gantt-base-colors-icons: #A1A4A6;
    --dhx-gantt-base-colors-disabled: #E9E9E9;
    --dhx-gantt-base-colors-select: #E0E5F3;
    --dhx-gantt-base-colors-text-light: #555D63;
    --dhx-gantt-base-colors-text-base: #23272A;
    --dhx-gantt-base-colors-text-on-fill: rgba(255, 255, 255, 0.90);
    --dhx-gantt-base-colors-background: #FFFFFF;
    --dhx-gantt-base-colors-background-alt: #F2F2F2;

    --dhx-gantt-base-colors-primary: #537CFA;
    --dhx-gantt-base-colors-warning: #FAB936;
    --dhx-gantt-base-colors-error: #E3334E;
    --dhx-gantt-base-colors-success: #1BC297;

    --dhx-gantt-container-background: var(--dhx-gantt-base-colors-background);
    --dhx-gantt-container-color: var(--dhx-gantt-base-colors-text-base);
    --dhx-gantt-offtime-background: var(--dhx-gantt-base-colors-background-alt);

    --dhx-gantt-scale-background: var(--dhx-gantt-container-background);
    --dhx-gantt-scale-border-vertical: 1px solid var(--dhx-gantt-base-colors-border-light);
    --dhx-gantt-scale-border-horizontal: 1px solid var(--dhx-gantt-base-colors-border);

    --dhx-gantt-scale-color: var(--dhx-gantt-base-colors-text-light);

    --dhx-gantt-grid-body-background: transparent;
    --dhx-gantt-grid-scale-background: var(--dhx-gantt-scale-background);
    --dhx-gantt-grid-scale-color: var(--dhx-gantt-scale-color);
    --dhx-gantt-grid-scale-border-vertical: var(--dhx-gantt-scale-border-vertical);
    --dhx-gantt-timeline-scale-background: var(--dhx-gantt-scale-background);
    --dhx-gantt-timeline-scale-color: var(--dhx-gantt-scale-color);
    --dhx-gantt-timeline-scale-border-vertical:  var(--dhx-gantt-scale-border-vertical);

    /* tasks */


    --dhx-gantt-task-blue: linear-gradient(180deg, #527CFF 0%, #9751FC 100%);
    --dhx-gantt-task-green: linear-gradient(180deg, #12D979 0%, #1ECDEB 100%);
    --dhx-gantt-task-violet: linear-gradient(180deg, #D071EF 0%, #EE71D5 100%);
    --dhx-gantt-task-yellow: linear-gradient(180deg, #FFB725 0%, #FFBB25 31.25%, #FAEA27 100%);

    --dhx-gantt-task-background: var(--dhx-gantt-task-blue);
    --dhx-gantt-task-border: none;
    --dhx-gantt-task-color: var(--dhx-gantt-base-colors-text-on-fill);
    --dhx-gantt-project-color: var(--dhx-gantt-task-color);
    --dhx-gantt-task-line-text: var(--dhx-gantt-container-color);

    --dhx-gantt-task-row-border: 1px solid var(--dhx-gantt-base-colors-border);
    --dhx-gantt-task-row-background: var(--dhx-gantt-container-background);
    --dhx-gantt-task-row-background--odd: var(--dhx-gantt-container-background);

    --dhx-gantt-project-background: var(--dhx-gantt-task-green);
    --dhx-gantt-milestone-background: var(--dhx-gantt-task-violet);

    --dhx-gantt-task-marker-color: var(--dhx-gantt-task-background);

    --dhx-gantt-popup-background: var(--dhx-gantt-container-background);
    --dhx-gantt-popup-color: var(--dhx-gantt-container-color);

    --dhx-gantt-tooltip-background: var(--dhx-gantt-base-colors-text-base);
    --dhx-gantt-tooltip-color: var(--dhx-gantt-container-background);

    --dhx-gantt-link-background: var(--dhx-gantt-base-colors-icons);
    --dhx-gantt-link-background-hover: var(--dhx-gantt-base-colors-icons-hover);
    --dhx-gantt-link-critical-background: var(--dhx-gantt-base-colors-error);

}

~~~

All variables can be found in the **codebase/sources/less/src/themes/variables.less** file of the package.

How to customize skins
-----------------

The easiest method to customize the Gantt's appearance is by overriding the relevant CSS variables in your stylesheet. Here's an example:

~~~html
<style>
:root {
 /* scales */
  --dhx-gantt-scale-background: #8E8E8E;
  --dhx-gantt-base-colors-border-light: #C5C5C5;
  --dhx-gantt-base-colors-border: #DFE0E1;
  --dhx-gantt-scale-color: #FFF;
  --dhx-gantt-base-colors-icons: #00000099;
  
  /* tasks */
  --dhx-gantt-task-background: #3db9d3;
  --dhx-gantt-task-color: #FFFFFF;
  --dhx-gantt-project-background: #6AA84F;
  --dhx-gantt-project-color: #FFFFFF;

  /* links */
  --dhx-gantt-link-background: #ffa011;
  --dhx-gantt-link-background-hover: #ffa011;

}
</style>
~~~


[Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


By defining variables in this manner, you can redefine the default styles, ensuring that your custom styles are applied to the Gantt.

:::note
For correct inheritance of values across the entire theme, define variables at the :root element.
:::

It's important to define these styles at the **:root** element to ensure proper inheritance and application throughout the component. This approach guarantees that when a variable utilized by other variables is redefined, it correctly influences related styles across the component.

For instance, the variable `--dhx-gantt-scale-color` inherits from the primary text color variable `--dhx-gantt-container-color`.

- If you redefine `--dhx-gantt-container-color` at the **:root** level, you ensure that `--dhx-gantt-scale-color` reflects this change. 

~~~html
<style>
:root {
    /* --dhx-gantt-scale-color and other
  variables that inherit `--dhx-gantt-container-color`
  will be affected
  */
  --dhx-gantt-container-color: #222;

}
</style>
~~~

- If you redefine `--dhx-gantt-container-color` at a lower level in the DOM tree, such as within **.gantt_container**, it won't affect the `--dhx-gantt-scale-color` variable.

~~~html
<style>
.gantt_container {
    /* only elements that directly 
  use --dhx-gantt-container-color will be affected
  */
  --dhx-gantt-container-color: #222;
}
</style>
~~~


How to use source codes
------------

dhtmlxGantt is shipped with style files in the following forms:

- **codebase/dhtmlxgantt.css** - a prebuilt compressed CSS file for skins, ready for production use;
- **codebase/sources/dhtmlxgantt.css** - prebuilt readable CSS files;
- **codebase/sources/less/** - source less files of the Gantt skins.

The latter can be used for deep customization of existing skins or for creating a new skin.

How to start
------------

You can initialize **codebase/sources/less** as an NPM package. 
The sources will contain two types of files: 

- style sheets; 
- files with micro variables declaration which you can use for fine-tuning the gantt view or for creating a new skin.

How to build skins
--------------------

In **codebase/sources/less/** run:

~~~
> npm install
~~~

After install is completed, you can rebuild CSS files using the following commands:

~~~
> npm run build
~~~

Or 

~~~
> npm run watch
~~~

The script will rebuild CSS files from sources and put them into the *codebase* folder of the gantt package, replacing the existing ones.

Structure
------------

The structure of the **less** folder for version 9.0 (may be changed in future versions) is given below:

### Images

- **./src/imgs** - svg icons used by all skins
- **./src/iconfont** - icons prebuilt into the web font

### Skin definitions

The default set of variables is defined in the `terrace` skin, other skins redefine the corresponding variables and add styles.

- **./src/themes**
  - *./src/themes/variables.less* - common variables used by all skins, `terrace` skin
  - *./src/themes/contrast_black* - contrast black skin variables
  - *./src/themes/contrast_white* - contrast white skin variables
  - *./src/themes/material* - material skin variables
  - *./src/themes/dark* - dark skin variables
  - *./src/themes/flat* - flat skin variables

### Entry points for building skins

- theme.less
- package.json


Creating custom skin
-------------------

In order to create a new skin, you can copy and rename one of the existing skins from the **sources/less/src/themes** folder. Follow the steps below:

1) Copy and rename one of the existing files from the **sources/less/src/themes** folder, e.g.:

~~~
-> copy:
codebase/sources/less/src/themes/material.less

-> rename to:
codebase/sources/less/src/themes/custom.less
~~~

2) Import the new file in **sources/less/src/themes/index.less**, like this:

~~~
@import "./custom";
~~~

And add the content as in:

~~~css
:root[data-gantt-theme='custom'] {
    --dhx-gantt-theme: custom;
    --dhx-gantt-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-gantt-base-colors-primary: #0288D1;

}
~~~

Note that the skin variables should be defined under the `:root` elements, using the `data-gantt-there` selector.

A new theme must include the **--dhx-gantt-theme** variable with the theme name.

3) Rebuild skins by running: 

~~~
npm run build
~~~


:::note
Note that Gantt may apply some predefined settings to the calendar based on the applied skin.
When you create a new skin by copying an existing one, you may need to apply the corresponding settings to the Gantt manually.
:::


JS styling settings
---------------------

Note that not all aspects of Gantt styling are controlled from CSS, some parameters are defined from the JavaScript configuration, for example the following properties:

- [link_line_width](api/config/link_line_width.md)
- [link_radius](api/config/link_radius.md)
- [link_arrow_size](api/config/link_arrow_size.md)
- [scale_height](api/config/scale_height.md)
- [row_height](api/config/row_height.md)

