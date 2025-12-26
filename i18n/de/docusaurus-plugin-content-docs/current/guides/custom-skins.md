---
title: "Skins-Anpassung"
sidebar_label: "Skins-Anpassung"
---

# Skins-Anpassung

Ab Version 9.0 verwenden Gantt-Skins CSS-Variablen, wodurch Sie die Komponente einfach anpassen und gestalten können.


[Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


Wichtige CSS-Variablen:

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

Alle diese Variablen befinden sich in der Datei **codebase/sources/less/src/themes/variables.less** innerhalb des Pakets.

## Wie man Skins anpasst

Die einfachste Möglichkeit, das Aussehen des Gantt-Diagramms zu verändern, besteht darin, die CSS-Variablen in Ihrem Stylesheet zu überschreiben. Zum Beispiel:

~~~html
<style>
:root {
 /* Skalen */
  --dhx-gantt-scale-background: #8E8E8E;
  --dhx-gantt-base-colors-border-light: #C5C5C5;
  --dhx-gantt-base-colors-border: #DFE0E1;
  --dhx-gantt-scale-color: #FFF;
  --dhx-gantt-base-colors-icons: #00000099;
  
  /* Aufgaben */
  --dhx-gantt-task-background: #3db9d3;
  --dhx-gantt-task-color: #FFFFFF;
  --dhx-gantt-project-background: #6AA84F;
  --dhx-gantt-project-color: #FFFFFF;

  /* Verbindungen */
  --dhx-gantt-link-background: #ffa011;
  --dhx-gantt-link-background-hover: #ffa011;

}
</style>
~~~


[Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


Wenn Sie Variablen auf diese Weise setzen, werden die Standardstile durch Ihre eigenen ersetzt, sodass das Gantt-Diagramm Ihr bevorzugtes Aussehen verwendet.

:::note
Um eine korrekte Vererbung der Werte im gesamten Theme zu gewährleisten, definieren Sie die Variablen auf dem :root-Element.
:::

Wenn Sie diese Styles auf **:root**-Ebene definieren, ist sichergestellt, dass sie im gesamten Komponentenbaum korrekt vererbt werden. So werden alle abhängigen Styles automatisch aktualisiert, wenn Sie eine Variable ändern, von der andere abhängen.

Beispielsweise erbt die Variable `--dhx-gantt-scale-color` vom Haupt-Textfarben-Variable `--dhx-gantt-container-color`.

- Wenn Sie `--dhx-gantt-container-color` auf **:root**-Ebene neu definieren, wird `--dhx-gantt-scale-color` entsprechend angepasst.

~~~html
<style>
:root {
    /* --dhx-gantt-scale-color und andere
  Variablen, die von `--dhx-gantt-container-color` erben,
  werden beeinflusst
  */
  --dhx-gantt-container-color: #222;

}
</style>
~~~

- Wenn Sie jedoch `--dhx-gantt-container-color` weiter unten im DOM, zum Beispiel innerhalb von **.gantt_container**, neu definieren, hat dies keinen Einfluss auf `--dhx-gantt-scale-color`.

~~~html
<style>
.gantt_container {
    /* Nur Elemente, die direkt 
  --dhx-gantt-container-color verwenden, werden beeinflusst
  */
  --dhx-gantt-container-color: #222;
}
</style>
~~~

## Wie man den Quellcode verwendet

dhtmlxGantt enthält Style-Dateien in verschiedenen Formaten:

- **codebase/dhtmlxgantt.css** - eine komprimierte CSS-Datei für Skins, bereit für die Produktion;
- **codebase/sources/dhtmlxgantt.css** - eine lesbare, vorgefertigte CSS-Datei;
- **codebase/sources/less/** - die originalen Less-Dateien für die Gantt-Skins.

Die Less-Dateien sind nützlich, wenn Sie bestehende Skins umfassend anpassen oder einen neuen Skin von Grund auf erstellen möchten.

## Wie man startet

Sie können **codebase/sources/less** wie ein NPM-Paket behandeln. Es enthält zwei Arten von Dateien:

- Stylesheets;
- Dateien mit Mikrovariablen-Deklarationen zur Feinabstimmung der Gantt-Ansicht oder zum Erstellen eines neuen Skins.

## Wie man Skins baut

Führen Sie in **codebase/sources/less/** folgenden Befehl aus:

~~~
> npm install
~~~

Nach Abschluss der Installation können Sie die CSS-Dateien neu erstellen mit:

~~~
> npm run build
~~~

Oder um Änderungen zu überwachen und automatisch neu zu bauen:

~~~
> npm run watch
~~~

Diese Skripte kompilieren die CSS-Dateien aus den Quellen und legen sie im *codebase*-Ordner des Gantt-Pakets ab, wobei die bestehenden Dateien überschrieben werden.

## Struktur

Hier ist die Ordnerstruktur für **less** in Version 9.0 (kann sich in zukünftigen Versionen ändern):

### Bilder

- **./src/imgs** - SVG-Icons, die von allen Skins verwendet werden
- **./src/iconfont** - Icons, die als Webfont vorliegen

### Skin-Definitionen

Die Standardvariablen sind im Skin `terrace` gesetzt, während andere Skins diese Variablen überschreiben und zusätzliche Styles hinzufügen.

- **./src/themes**
  - *./src/themes/variables.less* - gemeinsame Variablen für alle Skins, einschließlich `terrace`
  - *./src/themes/contrast_black* - Variablen für den Kontrast-Schwarz-Skin
  - *./src/themes/contrast_white* - Variablen für den Kontrast-Weiß-Skin
  - *./src/themes/material* - Variablen für den Material-Skin
  - *./src/themes/dark* - Variablen für den Dark-Skin
  - *./src/themes/flat* - Variablen für den Flat-Skin

### Einstiegspunkte für den Skin-Bau

- theme.less
- package.json

## Eigenen Skin erstellen

Um einen neuen Skin zu erstellen, kopieren und benennen Sie einen bestehenden Skin aus **sources/less/src/themes** um. Gehen Sie folgendermaßen vor:

1) Kopieren und benennen Sie eine bestehende Datei um, zum Beispiel:

~~~
-> kopieren:
codebase/sources/less/src/themes/material.less

-> umbenennen in:
codebase/sources/less/src/themes/custom.less
~~~

2) Importieren Sie Ihre neue Datei in **sources/less/src/themes/index.less** wie folgt:

~~~
@import "./custom";
~~~

Fügen Sie dann folgenden Inhalt hinzu:

~~~css
:root[data-gantt-theme='custom'] {
    --dhx-gantt-theme: custom;
    --dhx-gantt-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-gantt-base-colors-primary: #0288D1;

}
~~~

Beachten Sie, dass Skin-Variablen unter `:root` mit dem Attributselektor `data-gantt-theme` definiert werden sollten.

Jedes neue Theme muss die Variable **--dhx-gantt-theme** mit dem Namen des Themes enthalten.

3) Bauen Sie die Skins neu mit:

~~~
npm run build
~~~


:::note
Beachten Sie, dass Gantt je nach verwendetem Skin einige Voreinstellungen für den Kalender anwenden kann. Wenn Sie einen neuen Skin durch Kopieren eines bestehenden erstellen, müssen Sie diese Einstellungen möglicherweise manuell im Gantt anpassen.
:::

## JS-Styling-Einstellungen

Einige Stil-Aspekte des Gantt-Diagramms werden über JavaScript-Konfigurationen und nicht über CSS gesteuert. Beispiele sind:

- [link_line_width](api/config/link_line_width.md)
- [link_radius](api/config/link_radius.md)
- [link_arrow_size](api/config/link_arrow_size.md)
- [scale_height](api/config/scale_height.md)
- [row_height](api/config/row_height.md)

