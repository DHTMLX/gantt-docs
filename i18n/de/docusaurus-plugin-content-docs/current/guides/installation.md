---
title: "So installieren Sie dhtmlxGantt"
sidebar_label: "Installation"
---

# So installieren Sie dhtmlxGantt


dhtmlxGantt kann Ihrem Projekt über Paketmanager wie [NuGet](https://www.nuget.org/), [Bower](https://bower.io/) oder [npm](https://www.npmjs.com/) hinzugefügt werden.

Alternativ können Sie die benötigten JS- und CSS-Dateien direkt von einem CDN einbinden.

## npm - Evaluierungs- und PRO-Versionen {#npmevaluationandproversions}


**Professional Evaluation Version**

Sie können das [Testpaket von Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) herunterladen und den Anweisungen in der README-Datei folgen. Beachten Sie, dass die Testversion nur 30 Tage lang gültig ist.

**Professional Version**

Der Zugang zum privaten npm-Registry von DHTMLX ist über den [Kundenbereich](https://dhtmlx.com/clients/) möglich, indem Sie Ihren npm-Login und Ihr Passwort generieren. Dort finden Sie auch eine ausführliche Installationsanleitung. Beachten Sie, dass der Zugriff auf das private npm nur solange gewährt wird, wie Ihre proprietäre Gantt-Lizenz aktiv ist.

## npm - Standard Free Version {#npmstandardfreeversion}


Die Standardversion von dhtmlxGantt kann von [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) mit folgendem Befehl installiert werden:

~~~html
npm install dhtmlx-gantt
~~~

:::note
Nur die Standardversion von Gantt ist unter [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) verfügbar
:::

## NuGet {#nuget}


Um dhtmlxGantt mit [NuGet](https://www.nuget.org/) hinzuzufügen, führen Sie folgenden Befehl aus:

~~~html
nuget install DHTMLX.Gantt
~~~

Wenn Sie mit Microsoft Visual Studio arbeiten, können Sie es über die Package Manager Console installieren mit:

~~~html
install-package DHTMLX.Gantt
~~~

## Bower


Sie können dhtmlxGantt über [Bower](https://bower.io/) installieren, indem Sie folgenden Befehl ausführen:

~~~html
bower install gantt
~~~

## CDN


Um dhtmlxGantt über ein CDN einzubinden, verlinken Sie direkt die Dateien **dhtmlxgantt.js** und **dhtmlxgantt.css**:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

Eine vollständige Liste der CDN-Links, abhängig von der dhtmlxGantt-Version, finden Sie im [separaten Artikel](guides/cdn-links-list.md).

## Paket herunterladen {#downloadthepackage}


### GPL-Version

Sie können die GPL-Version von dhtmlxGantt herunterladen [hier](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml).

### PRO-Version

Wenn Sie eine PRO-Lizenz besitzen, laden Sie das PRO-Paket aus dem [Kundenbereich](https://dhtmlx.com/clients/) herunter.

Nach dem Herunterladen entpacken Sie das Paket in einen Ordner innerhalb Ihres Projekts. Binden Sie dann die Dateien **dhtmlxgantt.js** und **dhtmlxgantt.css** in Ihre Seite ein und achten Sie darauf, dass die relativen Pfade korrekt gesetzt sind:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~

## PRO Edition zum Projekt hinzufügen {#addingproeditionintoproject}


### **Pro-Version installieren**

:::note
Wenn Sie zuvor die Testversion installiert haben, wird empfohlen, diese vor der Installation der Pro-Version zu [deinstallieren](#uninstalltrialversion).
:::

Die öffentlich verfügbaren Quellen (CDN, NuGet, Bower und npm) bieten die Standardedition von dhtmlxGantt an, die unter GPL lizenziert ist.

Für die Professional- und Evaluierungsversionen können Sie unser [privates npm-Registry](#npmevaluationandproversions) verwenden.

Wenn diese Optionen nicht geeignet sind, gibt es zwei Alternativen:

- Die Pro-Version manuell zu Ihrem Projekt hinzufügen
- Die Pro-Version über npm aus einem lokalen Verzeichnis installieren

### Paket aus einem lokalen Ordner installieren 

Wenn Sie **npm** verwenden, kann das Pro-Paket aus einem lokalen Ordner mit [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) oder [`npm link`](https://docs.npmjs.com/cli/link/) installiert werden. Nachfolgend finden Sie Anleitungen für beide Methoden:

### npm install

1. Kopieren Sie das Gantt-Paket in ein lokales Verzeichnis.
2. Navigieren Sie in Ihr Projektverzeichnis.
3. Führen Sie `npm install ../gantt-local-package-path` aus.

### npm link

1. Kopieren Sie das Gantt-Paket in ein lokales Verzeichnis.
2. Führen Sie `npm link` im Paketordner aus.
3. Wechseln Sie in Ihr Projektverzeichnis.
4. Führen Sie `npm link dhtmlx-gantt` aus.

Einen Vergleich zwischen der Standard- und PRO-Version von dhtmlxGantt finden Sie im zugehörigen Artikel [Standard vs PRO Library Versions](guides/editions-comparison.md).

### **Testversion deinstallieren** (#uninstalltrialversion)

Vor der Installation der Pro-Version sollten Sie das Testpaket entfernen:

~~~js
npm uninstall dhtmlx-gantt
~~~

Stellen Sie sicher, dass keine *dhtmlxgantt.js*-Dateien mehr in Ihrer Anwendung vorhanden sind.

Unter **Linux und MacOS** können Sie mit folgenden Befehlen suchen:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

Unter **Windows** verwenden Sie im Kommandozeilenfenster folgende Befehle:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

Nachdem Sie die Entfernung bestätigt haben, können Sie mit der Installation der Pro-Version wie oben beschrieben fortfahren.
