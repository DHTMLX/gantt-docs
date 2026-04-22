---
title: "Skins-Anpassung"
sidebar_label: "Skins-Anpassung"
---

# Skins-Anpassung

Ab Version 9.0 verwenden Gantt-Skins CSS-Variablen, die Sie zur Anpassung und Gestaltung nutzen können.


[Skin dynamisch ändern](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


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

## How to customize skins

Die einfachste Methode, das Erscheinungsbild des Gantt anzupassen, besteht darin, die relevanten CSS-Variablen in Ihrem Stylesheet zu überschreiben. Hier ist ein Beispiel:

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


[Skin dynamisch ändern](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


Durch die eindeutige Definition von Variablen auf diese Weise können Sie die Standardstile neu definieren, sodass Ihre benutzerdefinierten Stile auf den Gantt angewendet werden.

:::note
Für eine korrekte Vererbung der Werte über das gesamte Theme hinweg definieren Sie Variablen im **:root**-Element.
:::

Es ist wichtig, diese Stile im **:root**-Element zu definieren, um eine ordnungsgemäße Vererbung und Anwendung im gesamten Baustein sicherzustellen. Dieser Ansatz stellt sicher, dass, wenn eine von anderen Variablen verwendete Variable neu definiert wird, sie die entsprechenden Stile im gesamten Baustein korrekt beeinflusst.

Zum Beispiel erbt die Variable `--dhx-gantt-scale-color` von der primären Textfarb-Variablen `--dhx-gantt-container-color`.

- Wenn Sie `--dhx-gantt-container-color` auf der **:root**-Ebene neu definieren, stellen Sie sicher, dass sich `--dhx-gantt-scale-color` entsprechend ändert. 

~~~html
<style>
:root {
    /* --dhx-gantt-scale-color und andere
  Variablen, die `--dhx-gantt-container-color` erben,
  werden betroffen sein
  */
  --dhx-gantt-container-color: #222;

}
</style>
~~~

- Wenn Sie `--dhx-gantt-container-color` auf einer unteren Ebene im DOM-Baum neu definieren, z. B. innerhalb von **.gantt_container**, wirkt sich dies nicht auf die Variable `--dhx-gantt-scale-color` aus.

~~~html
<style>
.gantt_container {
    /* nur Elemente, die direkt 
  `use --dhx-gantt-container-color` betroffen sind
  */
  --dhx-gantt-container-color: #222;
}
</style>
~~~


## How to use source codes

dhtmlxGantt wird mit Stil-Dateien in den folgenden Formen geliefert:

- **codebase/dhtmlxgantt.css** - eine vorkompilierte komprimierte CSS-Datei für Skins, einsatzbereit für die Produktion;
- **codebase/sources/dhtmlxgantt.css** - vorkompilierte lesbare CSS-Dateien;
- **codebase/sources/less/** - Quell-Less-Dateien der Gantt-Skins.

Letzteres kann für eine tiefe Anpassung vorhandener Skins oder zum Erstellen eines neuen Skins verwendet werden.

## How to start

Sie können **codebase/sources/less** als NPM-Paket initialisieren. 
Die Quellen enthalten zwei Arten von Dateien: 

- Stylesheets; 
- Dateien mit der Deklaration von Mikro-Variablen, die Sie zum Feinabstimmen der Gantt-Ansicht oder zum Erstellen eines neuen Skins verwenden können.

## How to build skins

In **codebase/sources/less/** ausführen:

~~~
> npm install
~~~

Nach Abschluss der Installation können Sie die CSS-Dateien mit den folgenden Befehlen neu bauen:

~~~
> npm run build
~~~

Oder 

~~~
> npm run watch
~~~

Das Skript baut CSS-Dateien aus den Quellen neu und legt sie in den *codebase*-Ordner des Gantt-Pakets ab, wobei die bestehenden Dateien ersetzt werden.

## Structure

Die Struktur des **less**-Ordners für Version 9.0 (kann sich in künftigen Versionen ändern) ist unten angegeben:

### Images

- **./src/imgs** - SVG-Icons, die von allen Skins verwendet werden
- **./src/iconfont** - Icons vorinstalliert in der Webschrift

### Skin definitions

Die Standard-Variablenmenge ist in der `terrace`-Skin definiert; andere Skins definieren die entsprechenden Variablen neu und fügen Stile hinzu.

- **./src/themes**
  - *./src/themes/variables.less* - Gemeinsame Variablen, die von allen Skins verwendet werden, Skin `terrace`
  - *./src/themes/contrast_black* - Kontrast-Schwarz-Skin-Variablen
  - *./src/themes/contrast_white* - Kontrast-Weiß-Skin-Variablen
  - *./src/themes/material* - Material-Skin-Variablen
  - *./src/themes/dark* - Dunkel-Skin-Variablen
  - *./src/themes/flat* - Flach-Skin-Variablen

### Entry points for building skins

- theme.less
- package.json


## Creating custom skin

Um eine neue Skin zu erstellen, können Sie eine der bestehenden Skins aus dem Ordner **sources/less/src/themes** kopieren und umbenennen. Folgen Sie den Schritten unten:

1) Eine der bestehenden Dateien aus dem Ordner **sources/less/src/themes** kopieren und umbenennen, z. B.:

~~~
-> copy:
codebase/sources/less/src/themes/material.less

-> rename to:
codebase/sources/less/src/themes/custom.less
~~~

2) Die neue Datei in **sources/less/src/themes/index.less** importieren, so:

~~~
@import "./custom";
~~~

Und den Inhalt wie folgt hinzufügen, zum Beispiel:

~~~css
:root[data-gantt-theme='custom'] {
    --dhx-gantt-theme: custom;
    --dhx-gantt-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-gantt-base-colors-primary: #0288D1;

}
~~~

Beachten Sie, dass die Skin-Variablen unter den `:root`-Elementen definiert werden sollten, wobei der Selector `data-gantt-there` verwendet wird.

Eine neue Theme muss die Variable **--dhx-gantt-theme** mit dem Theme-Namen enthalten.

3) Skins neu bauen durch Ausführen von: 

~~~
npm run build
~~~


:::note
Beachten Sie, dass Gantt möglicherweise einige vordefinierte Einstellungen am Kalender basierend auf dem angewendeten Skin vornimmt.
Wenn Sie eine neue Skin durch Kopieren einer bestehenden erstellen, müssen Sie die entsprechenden Einstellungen für den Gantt möglicherweise manuell anwenden.
:::


## JS styling settings

Beachten Sie, dass nicht alle Aspekte des Gantt-Stylings über CSS gesteuert werden; einige Parameter werden aus der JavaScript-Konfiguration definiert, zum Beispiel die folgenden Eigenschaften:

- [link_line_width](api/config/link_line_width.md)
- [link_radius](api/config/link_radius.md)
- [link_arrow_size](api/config/link_arrow_size.md)
- [scale_height](api/config/scale_height.md)
- [row_height](api/config/row_height.md)