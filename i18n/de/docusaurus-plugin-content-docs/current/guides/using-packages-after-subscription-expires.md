---
title: "Verwendung von Paketen nach Ablauf Ihres Abonnements"
sidebar_label: "Nach Ablauf des Abonnements"
description: "Wie Sie die bezahlten DHTMLX @dhx Gantt npm-Pakete nach Ablauf Ihres Abonnements sichern und weiter verwenden."
---

# Verwendung von Paketen nach Ablauf Ihres Abonnements

Die bezahlten Gantt-Pakete - die kommerzielle JavaScript-Bibliothek (`@dhx/gantt`) und die Framework-Wrappers (`@dhx/react-gantt`, `@dhx/angular-gantt`, `@dhx/vue-gantt`) - werden im privaten Registry unter `https://npm.dhtmlx.com` gehostet. Der Zugriff auf dieses Registry ist an Ihr Abonnement gebunden: Wenn es abläuft, können Sie diese Pakete nicht mehr über npm installieren oder erneut installieren.

Die Versionen, auf die Sie gemäß Ihrer Lizenz Anspruch haben, stehen Ihnen weiterhin zur Nutzung zu Verfügung. Um sie auch nach Ablauf des Abonnements weiterhin installieren zu können, erstellen Sie **vor** dem Ablauf Ihres Abonnements ein lokales Backup.

:::tip
Führen Sie dies durch, solange Ihr Abonnement noch aktiv ist – sobald der Zugriff auf `npm.dhtmlx.com` weg ist, können Sie die Pakete nicht mehr herunterladen.
:::

:::note
Dies gilt nur für die bezahlten `@dhx`-Pakete. Die öffentlichen `dhtmlx-gantt` (Community) und `@dhtmlx/trial-*` (Evaluation) Pakete befinden sich im öffentlichen npm-Registry und sind davon nicht betroffen.
:::

## Sicherung Ihrer Pakete

### 1. Installieren Sie die Pakete in ein temporäres Projekt

~~~bash
mkdir dhtmlx-backup
cd dhtmlx-backup
npm init -y
npm install <your-dhtmlx-packages>   # z.B. npm install @dhx/gantt @dhx/react-gantt
~~~

### 2. Paketieren Sie jede Bibliothek

Die installierten Bibliotheken befinden sich in `node_modules/@dhx`. Für jedes Paket, das Sie behalten möchten, führen Sie `npm pack` aus:

~~~bash
cd node_modules/@dhx/<package-name>
npm pack
~~~

Dadurch wird im aktuellen Verzeichnis eine `.tgz`-Datei erzeugt (zum Beispiel `dhx-gantt-9.0.10.tgz`). Kopieren Sie die erzeugten `.tgz`-Dateien an einen sicheren Ort – zum Beispiel in einen Ordner `./lib/` in Ihrem Projekt.

## Verwenden Sie die gesicherten Pakete

Verweisen Sie in der `package.json` Ihres Projekts auf die lokalen `.tgz`-Dateien statt auf das Registry:

~~~json
"dependencies": {
  "@dhx/gantt": "file:./lib/dhx-gantt-9.0.10.tgz"
}
~~~

Dann führen Sie wie gewohnt `npm install` aus. npm löst die Abhängigkeit von der lokalen Datei auf, daher ist kein Zugriff auf das Registry erforderlich.

## Veröffentlichung in Ihrem eigenen privaten Registry

Wenn Sie Ihr eigenes npm-Registry pflegen, können Sie die gesicherten Pakete dort erneut veröffentlichen, anstatt auf lokale Dateien zu verweisen. Extrahieren Sie das Paket in einen neuen Ordner (oder kopieren Sie es aus `node_modules/@dhx/<package-name>`), öffnen Sie dessen `package.json` und setzen Sie `publishConfig` auf Ihr Registry:

~~~json
"publishConfig": {
  "registry": "https://your.registry.example.com"
}
~~~

Dann veröffentlichen Sie es:

~~~bash
npm publish
~~~

## Falls Sie das Backup-Fenster verpasst haben

Wenn Sie das Backup vor Ablauf Ihres Abonnements nicht abschließen können, senden Sie uns eine E-Mail an [info@dhtmlx.com](mailto:info@dhtmlx.com) und wir senden Ihnen die neuesten Versionen, auf die Sie Anspruch haben.