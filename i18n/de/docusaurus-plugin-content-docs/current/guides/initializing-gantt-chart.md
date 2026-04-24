---
title: "dhtmlxGantt in Plain JS/HTML"
sidebar_label: "Quick Start"
---

import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

# dhtmlxGantt in einfachem JS/HTML

Wenn Sie eine Anwendung mit dhtmlxGantt entwickeln, besteht der erste Schritt darin, das Gantt-Diagramm auf der Seite zu initialisieren bzw. einfach gesagt anzuzeigen.

Diese Anleitung beschreibt die Initialisierung von dhtmlxGantt in reinem JS/HTML. Sie können auch die Anleitungen zur Integration mit Frontend-Frameworks prüfen:


<table>
  <tbody style="text-align:center">
  <tr>
  <td><FrameworkIcon name="angular" className="framework-icon" /></td>
  <td><FrameworkIcon name="react" className="framework-icon" /></td>
  <td><FrameworkIcon name="svelte" className="framework-icon" /></td>
  <td><FrameworkIcon name="vue" className="framework-icon" /></td>
  </tr>
  <tr>
  <td>[Angular](integrations/angular/howtostart-angular.md)</td>
  <td>[React](integrations/react/js-gantt-react.md)</td>
  <td>[Svelte](integrations/svelte/howtostart-svelte.md)</td>
  <td>[Vue.js](integrations/vue/howtostart-vue.md)</td>
  </tr>
  </tbody>
</table>


## Erstellung eines grundlegenden Gantt-Diagramms

Um ein grundlegendes Gantt-Diagramm auf der Seite anzuzeigen, folgen Sie 3 Schritten: 

1. Binden Sie die [dhtmlxGantt-Code-Dateien](guides/initializing-gantt-chart.md#how-to-add-gantt-source-files-into-a-project) auf der Seite ein.
2. Erstellen Sie einen DIV-Container auf der Seite.
3. Initialisieren Sie dhtmlxGantt im neu erstellten Container mit der [init](api/method/init.md) Methode. Als Parameter akzeptiert die Methode einen HTML-Container (oder dessen ID), in dem das Gantt-Diagramm angezeigt wird.

~~~html {10}
<!DOCTYPE html>
<html>
<head>
    <script src="codebase/dhtmlxgantt.js"></script>
    <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
    <div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript"> 
        gantt.init("gantt_here");                         
    </script>
</body>
</html>
~~~

![guides/init_gantt_front.png](/img/init_gantt_front.png)


**Verwandtes Beispiel**: [Grundlegende Initialisierung](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)
 
## Wie man Gantt-Quelldateien zu einem Projekt hinzufügt

Sie können Gantt-Code-Dateien je nach Art der von Ihnen erstellten Anwendung auf verschiedene Weisen in Ihr Projekt einbinden:

- [Dateien über das &#60;script&#62>-Tag einbinden](#include-files-via-the-script-tag)
- [Dateien in ES6/7- und TypeScript-Anwendungen importieren](#moduleimport)
- [Gantt mit Vite verwenden](#using-gantt-with-vite)
- [Svelte-Produktionsbuild](#svelte-production-build)
- [Dateien in eine RequireJS-basierte Anwendung einbinden](#include-files-into-a-requirejs-based-app)


## Dateien über das &#60;script&#62>-Tag einbinden

Für dhtmlxGantt müssen auf der Seite zwei Code-Dateien eingebunden werden:

- **dhtmlxgantt.js**
- **dhtmlxgantt.css**

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<link href="codebase/dhtmlxgantt.css" rel="stylesheet">
~~~

Lassen Sie sich schnell die Struktur des dhtmlxGantt-Pakets anzeigen, um herauszufinden, wo sich die Dateien befinden. 

Hauptordner und Dateien, die das dhtmlxGantt-Paket bilden, sind:

- <b>sources</b> - die Quellcodedateien der Bibliothek. Die Dateien sind nicht minimiert und gut lesbar. Das Paket ist überwiegend dafür gedacht, Bausteine zu debuggen.
- <b>samples</b> - die Code-Beispiele
- <b>codebase</b> - die gepackten Code-Dateien der Bibliothek. Diese Dateien haben eine deutlich geringere Größe und sind für den Einsatz in der Produktion gedacht. <b>In Ihren Apps müssen Sie Dateien aus diesem Ordner verwenden</b>

## Dateien in ES6/7- und TypeScript-Anwendungen importieren {#moduleimport}

Verwenden Sie folgenden Befehl, um Dateien zu importieren:

~~~jsx
import { gantt } from 'dhtmlx-gantt';
~~~

Für die Commercial-, Enterprise- oder Ultimate-Version sieht der Befehl so aus:

~~~jsx
import { gantt, Gantt } from 'dhtmlx-gantt';
~~~

## Gantt mit Vite verwenden

Wenn Sie Vite in Ihrem Projekt verwenden, ist folgende Einstellung für die **vite.config.js**-Datei erforderlich, um sicherzustellen, dass Gantt korrekt in die App eingebunden wird:

~~~jsx title="vite.config.js" 
optimizeDeps: {
    include: [
        'dhtmlx-gantt',
    ]
}
~~~

## Svelte-Produktionsbuild

Wenn Sie [Gantt in einer Svelte-App](integrations/svelte/howtostart-svelte.md) verwenden, müssen Sie die folgende Einstellung in die **vite.config.js**-Datei für den Produktionsbuild aufnehmen, wobei der Ordner *gantt_9.0.14_evaluation* durch den Pfad zu Ihrem Gantt-Ordner ersetzt wird:

~~~jsx title="vite.config.js" 
build: {
    commonjsOptions: {
        include: [
            "node_modules",
            "gantt_9.0.14_evaluation/codebase/dhtmlxgantt.js"
        ]
    },
}
~~~

## Dateien in eine RequireJS-basierte Anwendung einbinden

Um dhtmlxGantt-Dateien in eine RequireJS-basierte Anwendung einzubinden, müssen Sie der untenstehenden Logik folgen, wie im Beispiel gezeigt:

~~~jsx
requirejs(["codebase/dhtmlxgantt"], (dhx) => {
    const gantt = dhx.gantt;
    const Gantt = dhx.Gantt; // für Enterprise-Builds

    gantt.init("gantt_here");
    gantt.parse({
        tasks: [
            { id: 1, text: "Project #2", start_date: "01-04-2025", duration: 18, progress: 0.4, open: true },
            { id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8, progress: 0.6, parent: 1 },
            { id: 3, text: "Task #2", start_date: "11-04-2025", duration: 8, progress: 0.6, parent: 1 }
            ],
        links: [
            { id: 1, source: 1, target: 2, type: "1" },
            { id: 2, source: 2, target: 3, type: "0" }
        ]
    });
});
~~~

Die dhtmlxGantt-Bibliothek gibt ein Objekt mit den Feldern `gantt` und `Gantt` zurück (in kommerziellen, Enterprise- oder Ultimate-Versionen) - Die Objekte *gantt* und *Gantt*, wie unten beschrieben, finden Sie [hier](guides/multiple-gantts.md).

:::note
Wenn Sie Gantt mit benutzerdefinierten Erweiterungen in RequireJS verwenden, sollten Sie die `shim`-Konfiguration für RequireJS angeben und die Abhängigkeiten der Erweiterungen direkt von Gantt aus festlegen.
:::

Das folgende Beispiel demonstriert, wie eine benutzerdefinierte Erweiterungsdatei *custom_tooltip_plugin.js* korrekt gesetzt werden kann:

~~~jsx
requirejs.config({
    paths: {
        "dhtmlxgantt": "../../codebase/dhtmlxgantt",
        "ext/dhtmlxgantt_custom_tooltip": "../custom_tooltip_plugin"
    },
    shim: {
        "ext/dhtmlxgantt_custom_tooltip": ["dhtmlxgantt"]
    }
});
 
requirejs(["dhtmlxgantt"], (dhx) => {
    const gantt = dhx.gantt;

    const date_to_str = gantt.date.date_to_str(gantt.config.task_date);
    const today = new Date();

    gantt.addMarker({
        start_date: today,
        css: "today",
        text: "Today",
        title: `Today: ${date_to_str(today)}`
    });

    gantt.init("gantt_here");
    gantt.parse({
        tasks: [
            { id: 1, text: "Project #2", start_date: "01-04-2025", duration: 18, progress: 0.4, open: true },
            { id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8, progress: 0.6, parent: 1 },
            { id: 3, text: "Task #2", start_date: "11-04-2025", duration: 8, progress: 0.6, parent: 1 }
        ],
        links: [
            { id: 1, source: 1, target: 2, type: "1" },
            { id: 2, source: 2, target: 3, type: "0" }
        ]
    });
});
~~~

Überprüfen Sie, dass der Modulname für jede Datei im Paket als *relativer Pfad innerhalb des 'codebase'-Ordners des Pakets* plus *dem Dateinamen* angegeben ist, z. B.:

**Kernbibliothek:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"


## Vollbildmodus

Um ein Gantt-Diagramm im Vollbildmodus in verschiedenen Browsern korrekt anzuzeigen, definieren Sie den folgenden Stil auf der Seite:

~~~html
<style type="text/css" media="screen">
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
    }
</style>
~~~