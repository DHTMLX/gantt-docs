---
title: "Skins"
sidebar_label: "Skins"
---

# Skins


dhtmlxGantt bietet eine Vielzahl vordefinierter Skins, mit denen Sie das Gesamtbild des Gantt-Diagramms einfach anpassen können:

1. [Terrace (Standard)](guides/skins.md#terraceskin)
2. [Dark](guides/skins.md#darkskin)
3. [Material](guides/skins.md#materialskin)
4. [Contrast Black](guides/skins.md#contrastblackskin) 
5. [Contrast White](guides/skins.md#contrastwhiteskin)
6. [Skyblue](guides/skins.md#skyblueskin) 
7. [Meadow](guides/skins.md#meadowskin)
8. [Broadway](guides/skins.md#broadwayskin)

Ab Version 9.0 sind alle Skins in der Hauptdatei **dhtmlxgantt.css** enthalten. Sie können einen Skin aktivieren, indem Sie die Eigenschaft **gantt.skin** setzen:

~~~js
gantt.skin = "dark";
~~~

Alternativ kann die Methode [gantt.setSkin()](api/method/setskin.md) verwendet werden:

~~~js
gantt.setSkin("dark");
~~~

In Version 8.0 und früher werden Skins als separate CSS-Dateien bereitgestellt.

### Verwendung von Schriftarten

Standardmäßig laden die Skins die Schriftart `Inter` von `https://fonts.googleapis.com`. Weitere Informationen zu Google Fonts finden Sie [hier](https://developers.google.com/fonts).

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
);
~~~

Bei Bedarf können Sie den Font-Import direkt aus den **.less**-Dateien im Ordner **codebase/sources/less/** entfernen und anschließend den Skin gemäß den Anweisungen im Artikel [Skins Customization](guides/custom-skins.md) neu erstellen.

## 'Skin Terrace' {#terraceskin}


Um den Standard-Skin zu verwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

![gantt-default-skin](/img/gantt-default-skin.png)


[Default skin](https://docs.dhtmlx.com/gantt/samples/06_skins/01_default.html)


## 'Skin Dark' {#darkskin}


Um den 'Dark'-Skin zu verwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Setzen Sie anschließend den Skin über die Eigenschaft **gantt.skin**:

~~~js
gantt.skin = "dark";
~~~

![gantt_dark_skin](/img/gantt_dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/gantt/samples/06_skins/10_dark.html)


## 'Skin Material' {#materialskin}


Um den 'Material'-Skin zu nutzen, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Setzen Sie den Skin über die Eigenschaft **gantt.skin**:

~~~js
gantt.skin = "material";
~~~

![gantt_material_skin](/img/gantt_material_skin.png)


[Material theme](https://docs.dhtmlx.com/gantt/samples/06_skins/09_material.html)


Ab Version 6.3 importiert der Material-Skin die Schriftart `Roboto` nicht mehr automatisch. Falls erforderlich, können Sie die Schriftart `Roboto` manuell hinzufügen, wie folgt:

~~~js
<link rel="stylesheet" href="'https://fonts.googleapis.com/css?'+
    +'family="Open+Sans|Roboto:regular,medium,thin,bold"'">
~~~

## 'Skin Contrast Black' {#contrastblackskin}

Um den 'Contrast Black'-Skin zu verwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Setzen Sie anschließend den Skin über die Eigenschaft **gantt.skin**:

~~~js
gantt.skin = "contrast-black";
~~~

![gantt_contrast_black_skin](/img/gantt_contrast_black_skin.png)

[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


## 'Skin Contrast White' {#contrastwhiteskin}

Um den 'Contrast White'-Skin zu verwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Setzen Sie den Skin über die Eigenschaft **gantt.skin**:

~~~js
gantt.skin = "contrast-white";
~~~

![gantt_contrast_white_skin](/img/gantt_contrast_white_skin.png)

[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)


## 'Skin Skyblue' {#skyblueskin}

Um den 'Skyblue'-Skin zu verwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Setzen Sie den Skin über die Eigenschaft **gantt.skin**:

~~~js
gantt.skin = "skyblue";
~~~

![gantt-skyblue-skin](/img/gantt-skyblue-skin.png)

['Skyblue' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/03_skyblue.html)


## 'Skin Meadow' {#meadowskin}


Um den 'Meadow'-Skin zu verwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Setzen Sie den Skin über die Eigenschaft **gantt.skin**:

~~~js
gantt.skin = "meadow";
~~~

![gantt-meadow-skin](/img/gantt-meadow-skin.png)

['Meadow' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/04_meadow.html)


## 'Skin Broadway' {#broadwayskin}

Um den 'Broadway'-Skin zu verwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxgantt.css**

Setzen Sie den Skin über die Eigenschaft **gantt.skin**:

~~~js
gantt.skin = "broadway";
~~~

![gantt-broadway-skin](/img/gantt-broadway-skin.png)

['Broadway' skin](https://docs.dhtmlx.com/gantt/samples/06_skins/05_broadway.html)

