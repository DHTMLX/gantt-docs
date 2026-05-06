---
title: "Скины"
sidebar_label: "Скины"
---

# Скины

dhtmlxGantt предоставляет несколько предопределённых скинов, которые можно использовать, чтобы изменить общий вид диаграммы Ганта:

1. [Terrace (по умолчанию)](guides/skins.md#terraceskin)
2. [Dark](guides/skins.md#darkskin)
3. [Material](guides/skins.md#materialskin)
4. [Contrast Black](guides/skins.md#contrastblackskin) 
5. [Contrast White](guides/skins.md#contrastwhiteskin)
6. [Skyblue](guides/skins.md#skyblueskin) 
7. [Meadow](guides/skins.md#meadowskin)
8. [Broadway](guides/skins.md#broadwayskin)


Начиная с версии 9.0, все скины входят в основной файл **dhtmlxgantt.css**. Скин можно активировать, установив свойство **gantt.skin**:

~~~js
gantt.skin = "dark";
~~~

Или вызвав метод [gantt.setSkin()](api/method/setskin.md):

~~~js
gantt.setSkin("dark");
~~~

В Gantt версии 8.0 и ранее скины определяются в отдельных CSS-файлах. 

### Использование шрифтов

По умолчанию скины импортируют шрифт `Inter` с `https://fonts.googleapis.com`. Подробнее о Google Fonts можно узнать [здесь](https://developers.google.com/fonts).

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
);
~~~

При необходимости вы можете удалить шрифт напрямую из файлов **.less** в папке **codebase/sources/less/**, а затем пересобрать скин, как описано в статье [Решения по настройке скинов](guides/custom-skins.md).

## 'Terrace' skin {#terraceskin}

Чтобы применить скин по умолчанию, подключите файл CSS по умолчанию:


- **dhtmlxgantt.css**


![gantt-default-skin](/img/gantt-default-skin.png)


[Скин по умолчанию](https://docs.dhtmlx.com/gantt/samples/06_skins/01_default.html)


## 'Dark' skin {#darkskin}

Чтобы применить скин 'Dark', подключите файл CSS по умолчанию:

- **dhtmlxgantt.css**

И установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "dark";
~~~

![gantt_dark_skin](/img/gantt_dark_skin.png)


[Темный скин](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)


## 'Material' skin {#materialskin}

Чтобы применить скин 'Material', подключите файл CSS по умолчанию:

- **dhtmlxgantt.css**

И установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "material";
~~~

![gantt_material_skin](/img/gantt_material_skin.png)


[Material theme](https://docs.dhtmlx.com/gantt/samples/06_skins/09_material.html)


Начиная с версии v6.3, импорт шрифта `Roboto` был удалён из скина Material. При необходимости вы можете добавить шрифт `Roboto` вручную, как показано:

~~~js
<link rel="stylesheet" href="'https://fonts.googleapis.com/css?'+
    +'family="Open+Sans|Roboto:regular,medium,thin,bold"'">
~~~


## 'Contrast Black' skin {#contrastblackskin}

Чтобы применить скин 'Contrast Black', подключите файл CSS по умолчанию:

- **dhtmlxgantt.css**

И установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "contrast-black";
~~~

![gantt_contrast_black_skin](/img/gantt_contrast_black_skin.png)

[Тема с высоким контрастом - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


## 'Contrast White' skin {#contrastwhiteskin}

Чтобы применить скин 'Contrast White', подключите файл CSS по умолчанию:

- **dhtmlxgantt.css**

И установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "contrast-white";
~~~

![gantt_contrast_white_skin](/img/gantt_contrast_white_skin.png)

[Тема с высоким контрастом - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)


## 'Skyblue' skin {#skyblueskin}

Чтобы применить скин 'Skyblue', подключите файл CSS по умолчанию:

- **dhtmlxgantt.css**

И установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "skyblue";
~~~

![gantt-skyblue-skin](/img/gantt-skyblue-skin.png)

['Skyblue' скин](https://docs.dhtmlx.com/gantt/samples/06_skins/03_skyblue.html)


## 'Meadow' skin {#meadowskin}

Чтобы применить скин 'Meadow', подключите файл CSS по умолчанию:

- **dhtmlxgantt.css**

И установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "meadow";
~~~




![gantt-meadow-skin](/img/gantt-meadow-skin.png)

['Meadow' скин](https://docs.dhtmlx.com/gantt/samples/06_skins/04_meadow.html)


## 'Broadway' skin {#broadwayskin}

Чтобы применить скин 'Broadway', подключите файл CSS по умолчанию:

- **dhtmlxgantt.css**

И установите скин через свойство **gantt.skin**:

~~~js
gantt.skin = "broadway";
~~~


![gantt-broadway-skin](/img/gantt-broadway-skin.png)

['Broadway' скин](https://docs.dhtmlx.com/gantt/samples/06_skins/05_broadway.html)