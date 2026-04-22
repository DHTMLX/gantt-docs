--- 
title: "皮肤"
sidebar_label: "皮肤"
---

# 皮肤

dhtmlxGantt 提供了多种预定义皮肤，您可以用它们来改变甘特图的整体外观：

1. [Terrace (default)](guides/skins.md#terraceskin)
2. [Dark](guides/skins.md#darkskin)
3. [Material](guides/skins.md#materialskin)
4. [Contrast Black](guides/skins.md#contrastblackskin) 
5. [Contrast White](guides/skins.md#contrastwhiteskin)
6. [Skyblue](guides/skins.md#skyblueskin) 
7. [Meadow](guides/skins.md#meadowskin)
8. [Broadway](guides/skins.md#broadwayskin)


从 v9.0 开始，所有皮肤都打包在主文件 **dhtmlxgantt.css** 中。可以通过设置 **gantt.skin** 属性来激活皮肤：

~~~js
gantt.skin = "dark";
~~~

或通过调用 [gantt.setSkin()](api/method/setskin.md) 方法：

~~~js
gantt.setSkin("dark");
~~~

在 Gantt v8.0 及更早版本中，皮肤在独立的 CSS 文件中定义。

### 使用字体

默认情况下，皮肤从 `https://fonts.googleapis.com` 导入 `Inter` 字体。有关 Google 字体的更多信息，请参阅这里。

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
);
~~~

如有需要，您可以直接从 **codebase/sources/less/** 文件夹中的 **.less** 文件中移除该字体，然后按照 [Skins Customization](guides/custom-skins.md) 文章中所述重新构建皮肤。

## 'Terrace' skin {#terraceskin}

要应用默认皮肤，请包含默认的 CSS 文件：


- **dhtmlxgantt.css**

![gantt-default-skin](/img/gantt-default-skin.png)


[默认皮肤](https://docs.dhtmlx.com/gantt/samples/06_skins/01_default.html)


## 'Dark' skin {#darkskin}

要应用 'Dark' 皮肤，请包含默认的 CSS 文件：

- **dhtmlxgantt.css**

并通过 **gantt.skin** 属性设置皮肤：

~~~js
gantt.skin = "dark";
~~~

![gantt_dark_skin](/img/gantt_dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)


## 'Material' skin {#materialskin}

要应用 'Material' 皮肤，请包含默认的 CSS 文件：

- **dhtmlxgantt.css**

并通过 **gantt.skin** 属性设置皮肤：

~~~js
gantt.skin = "material";
~~~

![gantt_material_skin](/img/gantt_material_skin.png)


[Material theme](https://docs.dhtmlx.com/gantt/samples/06_skins/09_material.html)


从 v6.3 开始，Material 皮肤中已移除了 `Roboto` 字体的导入。如有需要，可以按如下方式手动添加 `Roboto` 字体：

~~~js
<link rel="stylesheet" href="'https://fonts.googleapis.com/css?'+
    +'family="Open+Sans|Roboto:regular,medium,thin,bold"'">
~~~


## 'Contrast Black' skin {#contrastblackskin}

要应用 'Contrast Black' 皮肤，请包含默认的 CSS 文件：

- **dhtmlxgantt.css**

并通过 **gantt.skin** 属性设置皮肤：

~~~js
gantt.skin = "contrast-black";
~~~

![gantt_contrast_black_skin](/img/gantt_contrast_black_skin.png)

[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


## 'Contrast White' skin {#contrastwhiteskin}

要应用 'Contrast White' 皮肤，请包含默认的 CSS 文件：

- **dhtmlxgantt.css**

并通过 **gantt.skin** 属性设置皮肤：

~~~js
gantt.skin = "contrast-white";
~~~

![gantt_contrast_white_skin](/img/gantt_contrast_white_skin.png)

[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)


## 'Skyblue' skin {#skyblueskin}

要应用 'Skyblue' 皮肤，请包含默认的 CSS 文件：

- **dhtmlxgantt.css**

并通过 **gantt.skin** 属性设置皮肤：

~~~js
gantt.skin = "skyblue";
~~~

![gantt-skyblue-skin](/img/gantt-skyblue-skin.png)

['Skyblue' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/03_skyblue.html)


## 'Meadow' skin {#meadowskin}

要应用 'Meadow' 皮肤，请包含默认的 CSS 文件：

- **dhtmlxgantt.css**

并通过 **gantt.skin** 属性设置皮肤：

~~~js
gantt.skin = "meadow";
~~~




![gantt-meadow-skin](/img/gantt-meadow-skin.png)

['Meadow' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/04_meadow.html)


## 'Broadway' skin {#broadwayskin}

要应用 'Broadway' 皮肤，请包含默认的 CSS 文件：

- **dhtmlxgantt.css**

并通过 **gantt.skin** 属性设置皮肤：

~~~js
gantt.skin = "broadway";
~~~




![gantt-broadway-skin](/img/gantt-broadway-skin.png)

['Broadway' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/05_broadway.html)