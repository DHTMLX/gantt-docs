--- 
title: "So installieren Sie dhtmlxGantt"
sidebar_label: "Installation"
---

# So installieren Sie dhtmlxGantt 

Sie können den Paketmanager [npm](https://www.npmjs.com/) verwenden, um das dhtmlxGantt-Paket in Ihr Projekt zu installieren.

Es ist auch möglich, die benötigten JS/CSS-Dateien über ein CDN einzubinden.

:::tip Verwenden Sie ein Frontend-Framework?
Wenn Sie mit React, Angular oder Vue entwickeln, verwenden Sie das jeweilige Wrapper-Paket und dessen Installationsanleitung anstelle der Kernbibliothek:

- [React Gantt-Installation](integrations/react/installation.md)
- [Angular Gantt-Installation](integrations/angular/installation.md)
- [Vue Gantt-Installation](integrations/vue/installation.md)

Der Rest dieser Anleitung behandelt die JavaScript-Kernbibliothek.
:::

## npm - Evaluation und PRO-Versionen {#npmevaluationandproversions}

Die Evaluation- und Professional-Builds werden im privaten DHTMLX-npm-Registry unter dem Scope `@dhx` veröffentlicht. Richten Sie zunächst den Scope `@dhx` auf dieses Registry ein:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
~~~

**Professionelle Evaluationsversion**

Der Evaluation-Build ist voll funktionsfähig, zeigt jedoch ein Wasserzeichen an, das darauf hinweist, dass er im Evaluationsmodus läuft. Installieren Sie ihn mit npm:

~~~bash
npm install @dhx/trial-gantt
~~~

Sie können auch [eine offizielle Evaluation starten](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) auf der Website. Eine formale Testversion gewährt kostenlosen technischen Support für den 30-tägigen Evaluationszeitraum und enthält herunterladbare Offline-Beispiele.

**Professionelle Version**

Der Professional-Build ist für den produktiven Einsatz vorgesehen und erfordert eine aktive kommerzielle Lizenz. Nachdem Sie eine Lizenz erworben haben, generieren Sie Ihre npm-Zugangsdaten im [Kundenbereich](https://dhtmlx.com/clients/) und melden Sie sich im Registry an:

~~~bash
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

Installieren Sie anschließend das Paket:

~~~bash
npm install @dhx/gantt
~~~

Der Zugriff auf das private npm ist nur verfügbar, solange Ihre proprietäre Gantt-Lizenz aktiv ist. Um die kostenpflichtigen `@dhx`-Pakete auch nach Ablauf Ihres Abonnements weiter nutzen zu können, [sichern Sie sie vorher](guides/using-packages-after-subscription-expires.md).

## Wechsel vom Trial-Paket zum kommerziellen Paket

Die meisten Projekte starten mit dem Evaluation-Paket und wechseln, sobald eine kommerzielle Lizenz vorliegt. Beide Pakete teilen sich dieselbe API, sodass der Wechsel größtenteils mechanisch ist:

1. [Konfigurieren Sie das private Registry und melden Sie sich an](#npmevaluationandproversions) mit Ihren kommerziellen Zugangsdaten.
2. Ersetzen Sie in `package.json` die Abhängigkeit `@dhx/trial-gantt` durch `@dhx/gantt` (behalten Sie dabei die benötigte Version bei).
3. Aktualisieren Sie jeden Verweis auf `@dhx/trial-gantt` in Ihrem Code zu `@dhx/gantt` - einschließlich des Stylesheet-Imports, falls Ihr Setup das CSS separat importiert.
4. Führen Sie `npm install` aus und erstellen Sie das Projekt neu.

Durchsuchen Sie das Projekt nach verbliebenen Erwähnungen von `@dhx/trial-gantt` - der CSS-Import wird dabei am leichtesten übersehen. Unter [Trial-Version deinstallieren](#uninstall-trial-version) erfahren Sie, wie Sie überprüfen, dass keine Evaluation-Dateien mehr vorhanden sind. Sobald das Wasserzeichen verschwunden ist und die Benutzeroberfläche sich identisch verhält, ist der Wechsel abgeschlossen.

## npm - Community-Edition

Sie können die kostenfreie Community-Edition von dhtmlxGantt von [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) installieren, indem Sie den folgenden Befehlszeilenbefehl ausführen:

~~~html
npm install dhtmlx-gantt
~~~

:::note
Ab Version 10 ist das öffentliche Paket `dhtmlx-gantt` die **Community-Edition** unter der **MIT-Lizenz**. Frühere Versionen des Pakets (v9.x und niedriger) sind die veraltete **GPL**-Edition; GPL v2 gilt weiterhin für diese Versionen.
:::


## CDN

Um JS/CSS-Dateien von CDN einzubinden, sollten Sie direkte Links zu **dhtmlxgantt.js** und **dhtmlxgantt.css** Dateien festlegen:

~~~html
<link rel="stylesheet" href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

Sie finden die vollständige Liste der Links, die Sie je nach Version von dhtmlxGantt über CDN einbinden können, in einem [separaten Artikel](guides/cdn-links-list.md).

:::note
Für Version 10 und später stellt das CDN die **Community-Edition** unter der MIT-Lizenz bereit.
:::

## Das Paket herunterladen

### Community Edition

[Downloaden Sie das Paket der kostenlosen dhtmlxGantt Community Edition von GitHub](https://github.com/DHTMLX/gantt).

### Veraltete GPL-Versionen

Die kostenlose Edition vor Version 10 wurde unter der **GPL**-Lizenz verteilt. Diese Versionen (v9.x und älter) bleiben verfügbar und GPL v2 gilt weiterhin für sie; sie befinden sich in einem dedizierten Zweig des [Haupt-GitHub-Repositories](https://github.com/DHTMLX/gantt), werden jedoch nicht mehr aktiv gepflegt.


### PRO-Version

Wenn Sie die PRO-Version der Komponente besitzen, gehen Sie in den [Kundenbereich](https://dhtmlx.com/clients/) und laden Sie dort das PRO-Paket herunter.

Unabhängig von der Version entpacken Sie das heruntergeladene Paket in einen Ordner Ihres Projekts. 
Dann binden Sie die Dateien **dhtmlxgantt.js** und **dhtmlxgantt.css** in eine Seite ein. Stellen Sie sicher, dass Sie die korrekten relativen Pfade zu diesen Dateien festlegen:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~

## PRO Edition zum Projekt hinzufügen {#adding-pro-edition-into-project}

### **Pro-Version installieren**

:::note
Bevor Sie die Pro-Version von Gantt installieren, sollten Sie [das Trial-Version-Paket deinstallieren](#uninstall-trial-version) (falls Sie es installiert haben)
:::

Die Professional- und Evaluation-Builds werden über das oben beschriebene [private npm-Registry](#npmevaluationandproversions) installiert. Falls das keine Option ist, gibt es zwei weitere Möglichkeiten, die Pro-Version hinzuzufügen:

- Sie können die Pro-Version manuell zu Ihrem Projekt hinzufügen
- Sie können die Pro-Version über npm aus einem lokalen Verzeichnis in Ihr Projekt installieren

### Installation des Pakets aus einem lokalen Ordner {#installfromlocalfolder}

Im Fall von **npm** können Sie das Pro-Paket aus einem lokalen Ordner installieren, indem Sie  [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) oder [`npm link`](https://docs.npmjs.com/cli/link/) verwenden.
Es gibt Schritt-für-Schritt-Anleitungen für beide Varianten:

#### npm install

1. Kopieren Sie das Gantt-Paket in ein lokales Verzeichnis.
2. Wechseln Sie in Ihr Projektverzeichnis. 
3. Führen Sie `npm install ../gantt-local-package-path` aus.

#### npm link

1. Kopieren Sie das Gantt-Paket in ein lokales Verzeichnis.
2. Führen Sie `npm link` im Paketordner aus.
3. Wechseln Sie in Ihr Projektverzeichnis.
4. Führen Sie `npm link dhtmlx-gantt` aus.

Um den Unterschied zwischen der Community- und PRO-Version der dhtmlxGantt-Bibliothek zu sehen, lesen Sie den entsprechenden Artikel [Community vs PRO Library Versions](guides/editions-comparison.md).

### **Trial-Version deinstallieren** {#uninstall-trial-version}

Die richtige Vorgehensweise, die Pro-Version zu installieren, besteht darin, das Trial-Version-Paket zu entfernen:

~~~js
npm uninstall @dhx/trial-gantt
~~~

Anschließend sollten Sie gründlich prüfen, dass in Ihren Anwendungen keine Datei *dhtmlxgantt.js* vorhanden ist.

**Unter Linux und macOS** können Sie im Terminal die folgenden Befehle verwenden:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

**Unter Windows** können Sie die folgenden Befehle in der Befehlszeile verwenden:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

Danach können Sie die Pro-Version des Gantt-Diagramms wie oben beschrieben installieren.
