---
title: "皮肤（Skins）"
sidebar_label: "皮肤（Skins）"
---

皮肤（Skins）
==============

dhtmlxGantt 提供了多种预设皮肤，可轻松更改甘特图的整体外观:

1. [Terrace（默认）](guides/skins.md#terracepifu)
2. [Dark](guides/skins.md#darkpifu)
3. [Material](guides/skins.md#materialpifu)
4. [Contrast Black](guides/skins.md#contrastblackpifu) 
5. [Contrast White](guides/skins.md#contrastwhitepifu)
6. [Skyblue](guides/skins.md#skybluepifu) 
7. [Meadow](guides/skins.md#meadowpifu)
8. [Broadway](guides/skins.md#broadwaypifu)

从 9.0 版本开始，所有皮肤都包含在主 **dhtmlxgantt.css** 文件中。你可以通过设置 **gantt.skin** 属性来激活某个皮肤:

~~~js
gantt.skin = "dark";
~~~

或者，也可以使用 [gantt.setSkin()](api/method/setskin.md) 方法:

~~~js
gantt.setSkin("dark");
~~~

在 8.0 及更早版本中，皮肤作为独立的 CSS 文件提供。

### 字体使用

默认情况下，皮肤会从 `https://fonts.googleapis.com` 加载 `Inter` 字体。关于 Google Fonts 的更多信息可参考 [此处](https://developers.google.com/fonts)。

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
);
~~~

如有需要，你可以直接从 **codebase/sources/less/** 文件夹下的 **.less** 文件中移除字体导入，然后按照 [스킨 커스터마이제이션](guides/custom-skins.md) 文章中的说明重新构建皮肤。

Terrace 皮肤 
-----------------------------

要使用默认皮肤，只需引入默认 CSS 文件:

- **dhtmlxgantt.css**

![gantt-default-skin](/img/gantt-default-skin.png)


[Default skin](https://docs.dhtmlx.com/gantt/samples/06_skins/01_default.html)


Dark 皮肤 
-----------------------------

要应用 Dark 皮肤，同样引入默认 CSS 文件:

- **dhtmlxgantt.css**

然后通过 **gantt.skin** 属性设置皮肤:

~~~js
gantt.skin = "dark";
~~~

![gantt_dark_skin](/img/gantt_dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)


Material 皮肤
--------------------

要使用 Material 皮肤，依然需要引入默认 CSS 文件:

- **dhtmlxgantt.css**

通过 **gantt.skin** 属性设置皮肤:

~~~js
gantt.skin = "material";
~~~

![gantt_material_skin](/img/gantt_material_skin.png)


[Material theme](https://docs.dhtmlx.com/gantt/samples/06_skins/09_material.html)


从 6.3 版本开始，Material 皮肤不再自动导入 `Roboto` 字体。如有需要，可手动添加 `Roboto` 字体，方式如下:

~~~js
<link rel="stylesheet" href="'https://fonts.googleapis.com/css?'+
    +'family="Open+Sans|Roboto:regular,medium,thin,bold"'">
~~~

Contrast Black 皮肤
--------------------
要使用 Contrast Black 皮肤，同样需引入默认 CSS 文件:

- **dhtmlxgantt.css**

然后通过 **gantt.skin** 属性设置皮肤:

~~~js
gantt.skin = "contrast-black";
~~~

![gantt_contrast_black_skin](/img/gantt_contrast_black_skin.png)

[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


Contrast White 皮肤
---------------------
要应用 Contrast White 皮肤，需引入默认 CSS 文件:

- **dhtmlxgantt.css**

通过 **gantt.skin** 属性设置皮肤:

~~~js
gantt.skin = "contrast-white";
~~~

![gantt_contrast_white_skin](/img/gantt_contrast_white_skin.png)

[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)


Skyblue 皮肤
----------------------------------
要使用 Skyblue 皮肤，需引入默认 CSS 文件:

- **dhtmlxgantt.css**

通过 **gantt.skin** 属性设置皮肤:

~~~js
gantt.skin = "skyblue";
~~~

![gantt-skyblue-skin](/img/gantt-skyblue-skin.png)

['Skyblue' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/03_skyblue.html)


Meadow 皮肤
-----------------------------

要应用 Meadow 皮肤，引入默认 CSS 文件:

- **dhtmlxgantt.css**

通过 **gantt.skin** 属性设置皮肤:

~~~js
gantt.skin = "meadow";
~~~

![gantt-meadow-skin](/img/gantt-meadow-skin.png)

['Meadow' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/04_meadow.html)


Broadway 皮肤
-----------------------------
要应用 Broadway 皮肤，引入默认 CSS 文件:

- **dhtmlxgantt.css**

通过 **gantt.skin** 属性设置皮肤:

~~~js
gantt.skin = "broadway";
~~~

![gantt-broadway-skin](/img/gantt-broadway-skin.png)

['Broadway' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/05_broadway.html)

