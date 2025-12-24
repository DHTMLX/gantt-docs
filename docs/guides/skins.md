---
title: "Skins"
sidebar_label: "Skins"
---

# Skins


dhtmlxGantt provides several predefined skins that you can use to change the overall look of the Gantt chart:

1. [Terrace (default)](guides/skins.md#terraceskin)
2. [Dark](guides/skins.md#darkskin)
3. [Material](guides/skins.md#materialskin)
4. [Contrast Black](guides/skins.md#contrastblackskin) 
5. [Contrast White](guides/skins.md#contrastwhiteskin)
6. [Skyblue](guides/skins.md#skyblueskin) 
7. [Meadow](guides/skins.md#meadowskin)
8. [Broadway](guides/skins.md#broadwayskin)


Starting from v9.0, all skins are bundled in the main **dhtmlxgantt.css** file. A skin can be activated by setting the **gantt.skin** property:

~~~js
gantt.skin = "dark";
~~~

Or by calling the [gantt.setSkin()](api/method/setskin.md) method:

~~~js
gantt.setSkin("dark");
~~~

In Gantt v8.0 and earlier skins are defined in separate CSS files. 

### Using fonts

By default, skins import the `Inter` font from `https://fonts.googleapis.com`. Read more about Google Fonts [here](https://developers.google.com/fonts).

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
);
~~~

If necessary, you can remove the font directly from **.less** files in the **codebase/sources/less/** folder 
and then rebuild the skin as described in the [Skins Customization](guides/custom-skins.md) article.

## 'Terrace' skin {#terraceskin}

To apply the default skin, include the default CSS file:


- **dhtmlxgantt.css**

![gantt-default-skin](/img/gantt-default-skin.png)


[Default skin](https://docs.dhtmlx.com/gantt/samples/06_skins/01_default.html)


## 'Dark' skin {#darkskin}

To apply the 'Dark' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "dark";
~~~

![gantt_dark_skin](/img/gantt_dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)


## 'Material' skin {#materialskin}

To apply the 'Material' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "material";
~~~

![gantt_material_skin](/img/gantt_material_skin.png)


[Material theme](https://docs.dhtmlx.com/gantt/samples/06_skins/09_material.html)


Starting from v6.3, the import of `Roboto` font was removed from the Material skin. If necessary, you can add `Roboto` font manually, as in:

~~~js
<link rel="stylesheet" href="'https://fonts.googleapis.com/css?'+
    +'family="Open+Sans|Roboto:regular,medium,thin,bold"'">
~~~

## 'Contrast Black' skin {#contrastblackskin}

To apply the 'Contrast Black' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "contrast-black";
~~~

![gantt_contrast_black_skin](/img/gantt_contrast_black_skin.png)

[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


## 'Contrast White' skin {#contrastwhiteskin}

To apply the 'Contrast White' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "contrast-white";
~~~

![gantt_contrast_white_skin](/img/gantt_contrast_white_skin.png)

[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)


## 'Skyblue' skin {#skyblueskin}

To apply the 'Skyblue' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "skyblue";
~~~

![gantt-skyblue-skin](/img/gantt-skyblue-skin.png)

['Skyblue' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/03_skyblue.html)


## 'Meadow' skin {#meadowskin}

To apply the 'Meadow' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "meadow";
~~~


![gantt-meadow-skin](/img/gantt-meadow-skin.png)

['Meadow' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/04_meadow.html)


## 'Broadway' skin {#broadwayskin}

To apply the 'Broadway' skin, include the default CSS file:

- **dhtmlxgantt.css**

And set the skin via the **gantt.skin** property:

~~~js
gantt.skin = "broadway";
~~~


![gantt-broadway-skin](/img/gantt-broadway-skin.png)

['Broadway' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/05_broadway.html)

