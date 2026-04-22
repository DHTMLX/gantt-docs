---
title: "Skins"
sidebar_label: "Skins"
---

# Skins

dhtmlxGantt bietet mehrere vordefinierte Skins, die Sie verwenden können, um das Gesamterscheinungsbild des Gantt-Diagramms zu verändern:

1. [Terrace (default)](guides/skins.md#terraceskin)
2. [Dark](guides/skins.md#darkskin)
3. [Material](guides/skins.md#materialskin)
4. [Contrast Black](guides/skins.md#contrastblackskin) 
5. [Contrast White](guides/skins.md#contrastwhiteskin)
6. [Skyblue](guides/skins.md#skyblueskin) 
7. [Meadow](guides/skins.md#meadowskin)
8. [Broadway](guides/skins.md#broadwayskin)


Ab Version 9.0 sind alle Skins in der Hauptdatei **dhtmlxgantt.css** gebündelt. Ein Skin kann aktiviert werden, indem die Eigenschaft **gantt.skin** gesetzt wird:

~~~js
gantt.skin = "dark";
~~~

Oder durch Aufruf der [gantt.setSkin()](api/method/setskin.md) Methode:

~~~js
gantt.setSkin("dark");
~~~

In Gantt v8.0 und früheren Versionen werden Skins in separaten CSS-Dateien definiert. 

### Verwendung von Schriftarten

Standardmäßig importieren Skins die Schriftart `Inter` von `https://fonts.googleapis.com`. Erfahren Sie mehr über Google Fonts [hier](https://developers.google.com/fonts).

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
);
~~~

Falls erforderlich, können Sie die Schriftart direkt aus den **.less**-Dateien im Ordner **codebase/sources/less/** entfernen und anschließend den Skin wie im Artikel [Skins Customization](guides/custom-skins.md) beschrieben neu erstellen.

## 'Terrace' skin {#terraceskin}

Um das Standard-Skin anzuwenden, fügen Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

![gantt-default-skin](/img/gantt-default-skin.png)


[Standard-Skin](https://docs.dhtmlx.com/gantt/samples/06_skins/01_default.html)


## 'Dark' skin {#darkskin}

Um das 'Dark' Skin anzuwenden, fügen Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Und setzen Sie die Skin-Eigenschaft über **gantt.skin**:

~~~js
gantt.skin = "dark";
~~~

![gantt_dark_skin](/img/gantt_dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)


## 'Material' skin {#materialskin}

Um das 'Material' Skin anzuwenden, fügen Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Und setzen Sie die Skin-Eigenschaft über **gantt.skin**:

~~~js
gantt.skin = "material";
~~~

![gantt_material_skin](/img/gantt_material_skin.png)


[Material theme](https://docs.dhtmlx.com/gantt/samples/06_skins/09_material.html)


Ab Version 6.3 wurde der Import der Schriftart `Roboto` aus dem Material Skin entfernt. Falls erforderlich, können Sie die Schriftart `Roboto` manuell hinzufügen, wie folgt:

~~~js
<link rel="stylesheet" href="'https://fonts.googleapis.com/css?'+
    +'family="Open+Sans|Roboto:regular,medium,thin,bold"'">
~~~

## 'Contrast Black' skin {#contrastblackskin}

Um das 'Contrast Black' Skin anzuwenden, fügen Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Und setzen Sie die Skin-Eigenschaft über **gantt.skin**:

~~~js
gantt.skin = "contrast-black";
~~~

![gantt_contrast_black_skin](/img/gantt_contrast_black_skin.png)

[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


## 'Contrast White' skin {#contrastwhiteskin}

Um das 'Contrast White' Skin anzuwenden, fügen Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Und setzen Sie die Skin-Eigenschaft über **gantt.skin**:

~~~js
gantt.skin = "contrast-white";
~~~

![gantt_contrast_white_skin](/img/gantt_contrast_white_skin.png)

[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)


## 'Skyblue' skin {#skyblueskin}

Um das 'Skyblue' Skin anzuwenden, fügen Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Und setzen Sie die Skin-Eigenschaft über **gantt.skin**:

~~~js
gantt.skin = "skyblue";
~~~

![gantt-skyblue-skin](/img/gantt-skyblue-skin.png)

['Skyblue' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/03_skyblue.html)


## 'Meadow' skin {#meadowskin}

Um das 'Meadow' Skin anzuwenden, fügen Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Und setzen Sie die Skin-Eigenschaft über **gantt.skin**:

~~~js
gantt.skin = "meadow";
~~~


![gantt-meadow-skin](/img/gantt-meadow-skin.png)

['Meadow' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/04_meadow.html)


## 'Broadway' skin {#broadwayskin}

Um das 'Broadway' Skin anzuwenden, fügen Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Und setzen Sie die Skin-Eigenschaft über **gantt.skin**:

~~~js
gantt.skin = "broadway";
~~~


![gantt-broadway-skin](/img/gantt-broadway-skin.png)

['Broadway' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/05_broadway.html)