---
title: "Exportieren und Importieren von Daten auf Node.js"
sidebar_label: "Exportieren und Importieren von Daten auf Node.js"
---

# Exportieren und Importieren von Daten auf Node.js

Es ist möglich, Daten mit DHTMLX Gantt unter Verwendung von Node.js zu exportieren und zu importieren.

:::note
Um diese Funktion auszuprobieren, können Sie das [Demo](https://files.dhtmlx.com/30d/914357ff4315af5d6bfd79e2f4e3f8fb/gantt_node_export_demo.zip) herunterladen. Für das Ausführen des Demos ist die Installation des [gantt-node](guides/using-gantt-on-server.md#termsofusing) Pakets erforderlich.
:::

Um Export/Import in Ihrem Projekt einzurichten, aktivieren Sie das <b>export_api</b> Plugin wie im [plugins](api/method/plugins.md) Guide beschrieben:

~~~js
gantt.plugins({
      export_api: true
});
~~~
Weitere Details finden Sie unten.

## Daten exportieren

Der Export funktioniert ähnlich wie in der Webversion, mit einigen Unterschieden:

- Für den Export nach Excel muss die Zeitleiste auf der Seite sichtbar sein, wenn Aufgaben in das Gantt geladen wurden. Da das DOM-Element der Zeitleiste unter Node.js nicht gerendert wird, funktioniert der Export nach Excel standardmäßig nicht korrekt, da das Gantt keine internen Berechnungen für die Aufgabenpositionierung auf der Zeitleiste durchführen kann. Um dies zu umgehen, sollten Sie die geladenen Aufgaben als **data**-Parameter in den Exporteinstellungen übergeben:

~~~js
data: gantt.serialize().data
~~~

- Beim Einrichten des Exports stellen Sie sicher, dass Sie den **callback**-Parameter angeben, um zu definieren, wohin die Ausgabedatei gesendet werden soll. Ohne diesen Parameter wird die Datei in die Konsole ausgegeben.

## Daten importieren

Für den Import ist die Installation des *formData* Pakets erforderlich:

~~~js
npm install form-data
~~~


Der Import aus MSP- und PrimaveraP6-Dateien funktioniert genauso wie in der Webversion.

Beim Importieren von Excel-Dateien werden die Daten als JSON-Format an Gantt zurückgegeben. Da Excel-Spalten beliebige Namen haben können, müssen Sie eine eigene Zuordnung von den Excel-Spalten zu den Task-Eigenschaften von DHTMLX Gantt erstellen.

