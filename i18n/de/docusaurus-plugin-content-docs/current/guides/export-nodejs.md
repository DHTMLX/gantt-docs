---
title: "Export und Import von Daten in Node.js"
sidebar_label: "Export und Import von Daten in Node.js"
---

# Export und Import von Daten in Node.js

Sie können Daten des DHTMLX Gantt exportieren und importieren, die mit Node.js erstellt wurden.

:::note
Um die Funktionalität auszuprobieren, laden Sie die [demo](https://files.dhtmlx.com/30d/914357ff4315af5d6bfd79e2f4e3f8fb/gantt_node_export_demo.zip) herunter. Um die Demo auszuführen, müssen Sie das [gantt-node](guides/using-gantt-on-server.md#terms-of-using) Paket installieren.
::: 

Um Export und Import für Ihr Projekt zu konfigurieren, aktivieren Sie das <b>export_api</b> Plugin über die [plugins](api/method/plugins.md) Methode:

~~~js
gantt.plugins({
    export_api: true
});
~~~

Lesen Sie die untenstehenden Informationen für weitere Details.

## Daten exportieren

Die Export-Funktionalität sollte genauso funktionieren wie in der Web-Version, mit einigen Ausnahmen:

- Export nach Excel setzt voraus, dass die Zeitleiste auf der Seite angezeigt wird, wenn die Aufgaben in den Gantt geladen sind. Da das DOM-Element der Zeitleiste in Node.js überhaupt nicht gerendert wird, funktioniert der Export nach Excel nicht von alleine, weil der Gantt nicht in der Lage ist, interne Berechnungen im Zusammenhang mit der Position der Aufgaben in der Zeitleiste durchzuführen. Als Workaround müssen Sie die geladenen Aufgaben als Wert des **data**-Parameters in den Exporteinstellungen angeben:

~~~js
data: gantt.serialize().data
~~~

- Beim Konfigurieren des Exports geben Sie den **callback**-Parameter an, um den Endpunkt der Ausgabedatei festzulegen; andernfalls wird die Datei in der Konsole ausgegeben.

## Daten importieren

Die Importfunktionalität benötigt das zusätzliche *formData*-Modul, das installiert werden muss:

~~~js
npm install form-data
~~~

Der Import von MSP- und PrimaveraP6-Dateien funktioniert genauso wie in der Web-Version.

Beim Import einer Excel-Datei werden die Daten der Datei an Gantt im JSON-Format zurückgegeben. Da die Spalten in Excel beliebige Namen haben können, ist es notwendig, die Spalten des Excel-Dokuments auf die Eigenschaften der Aufgaben von DHTMLX Gantt abzubilden. Dafür müssen Sie eine eigene Lösung entwickeln.