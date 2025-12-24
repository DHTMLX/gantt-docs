---
title: "Скины"
sidebar_label: "Скины"
---

# Скины


dhtmlxGantt предлагает разнообразие предустановленных скинов для легкой смены внешнего вида диаграммы Gantt:

1. [Terrace (по умолчанию)](guides/skins.md#terraceskin)
2. [Dark](guides/skins.md#darkskin)
3. [Material](guides/skins.md#materialskin)
4. [Contrast Black](guides/skins.md#contrastblackskin) 
5. [Contrast White](guides/skins.md#contrastwhiteskin)
6. [Skyblue](guides/skins.md#skyblueskin) 
7. [Meadow](guides/skins.md#meadowskin)
8. [Broadway](guides/skins.md#broadwayskin)

Начиная с версии 9.0, все скины включены в основной файл **dhtmlxgantt.css**. Вы можете активировать нужный скин, установив свойство **gantt.skin**:

~~~js
gantt.skin = "dark";
~~~

Также можно использовать метод [gantt.setSkin()](api/method/setskin.md):

~~~js
gantt.setSkin("dark");
~~~

В версиях 8.0 и ниже скины предоставляются как отдельные CSS-файлы.

### Использование шрифтов

По умолчанию скины загружают шрифт `Inter` с `https://fonts.googleapis.com`. Подробнее о Google Fonts читайте [здесь](https://developers.google.com/fonts).

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
);
~~~

При необходимости вы можете удалить импорт шрифта напрямую из файлов **.less**, которые расположены в папке **codebase/sources/less/**, а затем пересобрать скин согласно инструкции в статье [Кастомизация скинов](guides/custom-skins.md).

## Скин 'Terrace' {#terraceskin}


Для использования скина по умолчанию подключите стандартный CSS-файл:


- **dhtmlxgantt.css**

![gantt-default-skin](/img/gantt-default-skin.png)


[Default skin](https://docs.dhtmlx.com/gantt/samples/06_skins/01_default.html)


## Скин 'Dark' {#darkskin}


Чтобы применить скин 'Dark', подключите стандартный CSS-файл:

- **dhtmlxgantt.css**

Затем установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "dark";
~~~

![gantt_dark_skin](/img/gantt_dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)


## Скин 'Material' {#materialskin}


Для использования скина 'Material' подключите стандартный CSS-файл:

- **dhtmlxgantt.css**

Установите скин с помощью свойства **gantt.skin**:

~~~js
gantt.skin = "material";
~~~

![gantt_material_skin](/img/gantt_material_skin.png)


[Material theme](https://docs.dhtmlx.com/gantt/samples/06_skins/09_material.html)


Начиная с версии 6.3, скин Material больше не импортирует шрифт `Roboto` автоматически. При необходимости вы можете добавить шрифт `Roboto` вручную следующим образом:

~~~js
<link rel="stylesheet" href="'https://fonts.googleapis.com/css?'+
    +'family="Open+Sans|Roboto:regular,medium,thin,bold"'">
~~~

## Скин 'Contrast Black' {#contrastblackskin}

Для использования скина 'Contrast Black' подключите стандартный CSS-файл:

- **dhtmlxgantt.css**

Затем установите скин с помощью свойства **gantt.skin**:

~~~js
gantt.skin = "contrast-black";
~~~

![gantt_contrast_black_skin](/img/gantt_contrast_black_skin.png)

[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


## Скин 'Contrast White' {#contrastwhiteskin}

Чтобы применить скин 'Contrast White', подключите стандартный CSS-файл:

- **dhtmlxgantt.css**

Установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "contrast-white";
~~~

![gantt_contrast_white_skin](/img/gantt_contrast_white_skin.png)

[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)


## Скин 'Skyblue' {#skyblueskin}

Для использования скина 'Skyblue' подключите стандартный CSS-файл:

- **dhtmlxgantt.css**

Установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "skyblue";
~~~

![gantt-skyblue-skin](/img/gantt-skyblue-skin.png)

['Skyblue' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/03_skyblue.html)


## Скин 'Meadow' {#meadowskin}


Чтобы применить скин 'Meadow', подключите стандартный CSS-файл:

- **dhtmlxgantt.css**

Установите скин с помощью свойства **gantt.skin**:

~~~js
gantt.skin = "meadow";
~~~


![gantt-meadow-skin](/img/gantt-meadow-skin.png)

['Meadow' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/04_meadow.html)


## Скин 'Broadway' {#broadwayskin}

Чтобы применить скин 'Broadway', подключите стандартный CSS-файл:

- **dhtmlxgantt.css**

Установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "broadway";
~~~


![gantt-broadway-skin](/img/gantt-broadway-skin.png)

['Broadway' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/05_broadway.html)

