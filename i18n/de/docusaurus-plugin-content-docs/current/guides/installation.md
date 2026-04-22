--- 
title: "So installieren Sie dhtmlxGantt"
sidebar_label: "Installation"
---

# So installieren Sie dhtmlxGantt 

Sie können [npm](https://www.npmjs.com/), [NuGet](https://www.nuget.org/) oder [Bower](https://bower.io/) Paketmanager verwenden, um das dhtmlxGantt-Paket in Ihr Projekt zu installieren.

Es ist auch möglich, die benötigten JS/CSS-Dateien über ein CDN einzubinden.


## npm - Evaluation und PRO-Versionen {#npmevaluationandproversions}

**Professionelle Evaluationsversion**

Laden Sie das [Test-Gantt-Paket](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) herunter und befolgen Sie die im README-Datei angegebenen Schritte. 
Beachten Sie, dass die Test-Gantt-Version nur 30 Tage verfügbar ist.

**Professionelle Version**

Sie können direkt im [Kundenbereich](https://dhtmlx.com/clients/) auf das private npm zugreifen, indem Sie Ihre Login-Daten und Ihr Passwort für npm generieren. Eine detaillierte Installationsanleitung ist dort ebenfalls verfügbar. Bitte beachten Sie, dass der Zugriff auf das private npm nur aktiv ist, solange Ihre proprietäre Gantt-Lizenz gültig ist.

## npm - Standardversion (kostenlos)

Sie können die Standardversion von dhtmlxGantt aus [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) installieren, indem Sie folgenden Befehl ausführen:

~~~html
npm install dhtmlx-gantt
~~~

:::note
Nur die Standardversion von dhtmlxGantt ist unter [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) verfügbar.
:::


## NuGet

Um dhtmlxGantt über [NuGet](https://www.nuget.org/) zu installieren, führen Sie den folgenden Befehl aus:

~~~html
nuget install DHTMLX.Gantt
~~~

Wenn Sie Microsoft Visual Studio verwenden, führen Sie den folgenden Befehl aus der Package Manager Console aus:

~~~html
install-package DHTMLX.Gantt
~~~


## Bower

Um dhtmlxGantt über [Bower](https://bower.io/) zu installieren, führen Sie den folgenden Befehl aus:

~~~html
bower install gantt
~~~


## CDN

Um JS/CSS-Dateien von CDN einzubinden, sollten Sie direkte Links zu **dhtmlxgantt.js** und **dhtmlxgantt.css** Dateien festlegen:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

Sie finden die vollständige Liste der Links, die Sie je nach Version von dhtmlxGantt über CDN einbinden können, in einem [separaten Artikel](guides/cdn-links-list.md).


## Das Paket herunterladen

### GPL-Version

[Herunterladen des dhtmlxGantt GPL-Pakets](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml). 


### PRO-Version

Wenn Sie die PRO-Version der Komponente besitzen, gehen Sie in den [Kundenbereich](https://dhtmlx.com/clients/) und laden Sie dort das PRO-Paket herunter.

Unabhängig von der Version entpacken Sie das heruntergeladene Paket in einen Ordner Ihres Projekts. 
Dann binden Sie die Dateien **dhtmlxgantt.js** und **dhtmlxgantt.css** in eine Seite ein. Stellen Sie sicher, dass Sie die korrekten relativen Pfade zu diesen Dateien festlegen:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~

## PRO Edition zum Projekt hinzufügen

### **Pro-Version installieren**

:::note
Bevor Sie die Pro-Version von Gantt installieren, sollten Sie das Trial-Version-Paket deinstallieren (falls Sie es installiert haben)
:::

Alle öffentlichen Quellen (CDN, NuGet, Bower und npm) enthalten eine Standardedition der Komponente, die unter der GPL-Lizenz vertrieben wird.

Wir bieten auch unser [privates npm-Registry](#npmevaluationandproversions) an, von dem aus die Professional- und Evaluation-Versionen der Komponente installiert werden können.

Wenn aus irgendeinem Grund die oben beschriebenen Methoden Ihnen nicht zur Verfügung stehen, gibt es zwei mögliche Wege:

- Sie können die Pro-Version manuell zu Ihrem Projekt hinzufügen
- Sie können die Pro-Version über npm aus einem lokalen Verzeichnis in Ihr Projekt installieren

### Installation des Pakets aus einem lokalen Ordner {#installfromlocalfolder}

Im Fall von **npm** können Sie das Pro-Paket aus einem lokalen Ordner installieren, indem Sie  [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) oder [`npm link`](https://docs.npmjs.com/cli/link/) verwenden.
Es gibt Schritt-für-Schritt-Anleitungen für beide Varianten:

### npm install

1. Kopieren Sie das Gantt-Paket in ein lokales Verzeichnis.
2. Wechseln Sie in Ihr Projektverzeichnis. 
3. Führen Sie `npm install ../gantt-local-package-path` aus.

### npm link

1. Kopieren Sie das Gantt-Paket in ein lokales Verzeichnis.
2. Führen Sie `npm link` im Paketordner aus.
3. Wechseln Sie in Ihr Projektverzeichnis.
4. Führen Sie `npm link dhtmlx-gantt` aus.

Um den Unterschied zwischen der Standard- und PRO-Version der dhtmlxGantt-Bibliothek zu sehen, lesen Sie den entsprechenden Artikel [Standard vs PRO Library Versions](guides/editions-comparison.md).

### **Trial-Version deinstallieren**

Die richtige Vorgehensweise, die Pro-Version zu installieren, besteht darin, das Trial-Version-Paket zu entfernen:

~~~js
npm uninstall dhtmlx-gantt
~~~

Anschließend sollten Sie gründlich prüfen, dass in Ihren Anwendungen keine Datei *dhtmlxgantt.js* vorhanden ist.

Unter Linux und macOS können Sie im Terminal die folgenden Befehle verwenden:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

Unter Windows können Sie die folgenden Befehle in der Befehlszeile verwenden:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

Danach können Sie die Pro-Version des Gantt-Diagramms wie oben beschrieben installieren.