---
title: "dhtmlxGantt in Plain JS/HTML"
sidebar_label: "Schnellstart"
---

dhtmlxGantt in Plain JS/HTML
==================

Beim Erstellen einer Anwendung mit dhtmlxGantt besteht der erste Schritt darin, das Gantt-Diagramm einzurichten bzw. einfach gesagt, auf Ihrer Seite darzustellen.

Diese Anleitung beschreibt, wie Sie dhtmlxGantt mit einfachem JavaScript und HTML initialisieren. Informationen zur Integration mit Frontend-Frameworks finden Sie auch in diesen Anleitungen:

<table>
  <tbody style="text-align:center">
  <tr>
  <td>![angular_icon](/img/angular_icon.png)</td>
  <td>![react_icon](/img/react_icon.png)</td>
  <td>![svelte_icon](/img/svelte_icon.png)</td>
  <td>![vue_icon](/img/vue_icon.png)</td>
  </tr>
  <tr>
  <td>[Angular](integrations/angular/howtostart-angular.md)</td>
  <td>[React](integrations/react/quick-start.md)</td>
  <td>[Svelte](integrations/svelte/howtostart-svelte.md)</td>
  <td>[Vue.js](integrations/vue/howtostart-vue.md)</td>
  </tr>
  </tbody>
</table>


Erstellen eines einfachen Gantt-Diagramms
-----------------------

Um ein einfaches Gantt-Diagramm auf einer Seite anzuzeigen, sind drei Schritte notwendig:

1. Fügen Sie die [dhtmlxGantt-Code-Dateien](/guides/initializing-gantt-chart.md#howtoaddganttsourcefilesintoaproject) zu Ihrer Seite hinzu.
2. Erstellen Sie einen DIV-Container, in dem das Diagramm angezeigt werden soll.
3. Initialisieren Sie dhtmlxGantt in diesem Container mit der [init](api/method/init.md) Methode. Diese Methode akzeptiert ein HTML-Containerelement oder dessen ID als Parameter, in dem das Gantt-Diagramm gerendert wird.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
    <div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript"> 
        gantt.init("gantt_here");   /*!*/                        
    </script>
</body>
</html>
~~~

![/init_gantt_front.png](/img/init_gantt_front.png)


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

 
 
Wie man Gantt-Quelldateien zu einem Projekt hinzufügt
------------------------------------------------------------

Je nach Art der Anwendung, die Sie erstellen, gibt es verschiedene Möglichkeiten, die Gantt-Quelldateien zu Ihrem Projekt hinzuzufügen:

- [Dateien mit dem &#60;script&#62;-Tag einbinden](#scripttag)
- [Dateien in ES6/7- und TypeScript-Anwendungen importieren](#moduleimport)
- [Dateien in RequireJS-basierten Anwendungen einbinden](#requirejsimport)


Dateien über das &#60;script&#62;-Tag einbinden
--------------------------------------------

Um dhtmlxGantt zu verwenden, müssen Sie zwei Dateien zu Ihrer Seite hinzufügen:

- **dhtmlxgantt.js**
- **dhtmlxgantt.css**

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<link href="codebase/dhtmlxgantt.css" rel="stylesheet">
~~~

Werfen wir einen kurzen Blick auf die Struktur des dhtmlxGantt-Pakets, um zu sehen, wo sich diese Dateien befinden.

Die Hauptordner und -dateien im dhtmlxGantt-Paket sind:

- <b>sources</b> - Quellcodedateien der Bibliothek, unminifiziert und gut lesbar. Diese dienen hauptsächlich zum Debuggen von Komponenten.
- <b>samples</b> - Beispiel-Codebeispiele.
- <b>codebase</b> - Minifizierte Code-Dateien für den produktiven Einsatz. <b>Sie sollten die Dateien aus diesem Ordner in Ihren Anwendungen verwenden.</b>

Dateien in ES6/7- und TypeScript-Anwendungen importieren
---------------------------------------------

Verwenden Sie diesen Befehl, um die Dateien zu importieren:

~~~js
import { gantt } from 'dhtmlx-gantt';
~~~

Für die Commercial-, Enterprise- oder Ultimate-Versionen verwenden Sie:

~~~js
import { gantt, Gantt } from 'dhtmlx-gantt';
~~~

Verwendung von Gantt mit Vite
--------------------------

Wenn Ihr Projekt Vite verwendet, fügen Sie diese Einstellung zu Ihrer **vite.config.js** Datei hinzu, damit Gantt korrekt eingebunden wird:

**vite.config.js**
~~~js 
optimizeDeps: {
    include: [
        'dhtmlx-gantt',
    ]
}
~~~

### Svelte Production Build

Wenn Sie [Gantt in einer Svelte-App](/integrations/svelte/howtostart-svelte.md) verwenden, fügen Sie Folgendes für den Produktions-Build zur **vite.config.js** Datei hinzu. Ersetzen Sie *gantt_8.0.6_evaluation* durch den Pfad zu Ihrem Gantt-Ordner:

**vite.config.js**
~~~js 
build: {
    commonjsOptions: {
        include: [
            "node_modules",
            "gantt_8.0.6_evaluation/codebase/dhtmlxgantt.js"
        ]
    },
}
~~~

Dateien in eine RequireJS-basierte Anwendung einbinden
------------------------------------------- 

Um dhtmlxGantt-Dateien in einer RequireJS-basierten Anwendung hinzuzufügen, verwenden Sie folgendes Muster:

~~~js
requirejs(["codebase/dhtmlxgantt"], function(dhx){
  var gantt = dhx.gantt;
  var Gantt = dhx.Gantt; // für Enterprise-Builds
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018", 
          duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
          duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
          duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

Die dhtmlxGantt-Bibliothek gibt ein Objekt mit den Feldern `gantt` und `Gantt` zurück (letzteres für Commercial-, Enterprise- oder Ultimate-Versionen) - diese entsprechen den *gantt*- und *Gantt*-Objekten, wie [hier](/guides/multiple-gantts.md) beschrieben.

:::note
Wenn Sie Gantt mit benutzerdefinierten Erweiterungen in RequireJS verwenden, stellen Sie sicher, dass Sie die `shim`-Konfiguration für RequireJS angeben und die Abhängigkeiten der Erweiterungen direkt auf Gantt setzen.
:::

Hier ein Beispiel, wie eine benutzerdefinierte Erweiterungsdatei *custom_tooltip_plugin.js* korrekt konfiguriert wird:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_custom_tooltip": "../custom_tooltip_plugin"
  },
  shim: {
    "ext/dhtmlxgantt_custom_tooltip": ["dhtmlxgantt"]
  }
});
 
requirejs(["dhtmlxgantt"], 
function (dhx) {
  var gantt = dhx.gantt;

  var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
  var today = new Date(2018, 3, 5);
  gantt.addMarker({
    start_date: today,
    css: "today",
    text: "Today",
    title: "Today: " + date_to_str(today)
  });
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018",
          duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
          duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
          duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

Stellen Sie sicher, dass der Modulname für jede Datei innerhalb des Pakets als *relativer Pfad innerhalb des 'codebase'-Ordners* plus *Dateiname* angegeben wird, zum Beispiel:

**Kernbibliothek:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"


Vollbildmodus
---------------------------------

Damit das Gantt-Diagramm im Vollbildmodus in verschiedenen Browsern korrekt angezeigt wird, fügen Sie diesen Stil zu Ihrer Seite hinzu:

~~~html
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

