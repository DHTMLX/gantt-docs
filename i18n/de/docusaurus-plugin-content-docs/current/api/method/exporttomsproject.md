---
sidebar_label: exportToMSProject
title: exportToMSProject method
description: "exportiert Daten aus dem Gantt-Diagramm nach MS Project"
---

# exportToMSProject

### Description

@short: Exportiert Daten aus dem Gantt-Diagramm nach MS Project

@signature: exportToMSProject: (_export_?: any) =\> void

### Parameters

- `export`	- Objekt - optional, ein Objekt mit Export-Einstellungen (siehe Details)

### Example

~~~jsx
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

### Details

:::note
Diese Methode ist in der **export**-Erweiterung definiert, daher müssen Sie das [export_api](guides/extensions-list.md#export-service) Plugin aktivieren. Lesen Sie die Details im Artikel [Export und Import aus MS Project](guides/export-msproject.md#export-to-ms-project).
:::

:::note
Hinweis: Wenn Sie eine Gantt-Version verwenden, die älter als 8.0 ist, müssen Sie die Datei `https://export.dhtmlx.com/gantt/api.js` auf Ihrer Seite einbinden, um den Online-Exportdienst zu aktivieren, z. B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Die **exportToMSProject()** Methode nimmt als Parameter ein Objekt mit einer Reihe von Eigenschaften (alle Eigenschaften sind optional):

- **name** - (*string*) der Dateiname der erzeugten Datei ('gantt.xml' standardmäßig).

- **auto_scheduling** - (*boolean*) gibt den Planungsmodus für Aufgaben im exportierten Projekt an. **true** kennzeichnet Aufgaben als automatisch geplant, **false** als manuell geplant (der Standardzustand).

- **skip_circular_links** - (*boolean*) gibt an, ob zirkuläre Verknüpfungen entfernt werden oder nicht (true – werden entfernt (Standardmodus), false – werden nicht entfernt).

- **project** - (*object*) ermöglicht das Festlegen benutzerdefinierter Eigenschaften für das exportierte Projektobjekt.

- **tasks** - (*object*) ermöglicht das Festlegen benutzerdefinierter Eigenschaften für die exportierten Aufgaben.

- **data** - (*object*) Ermöglicht das Festlegen einer benutzerdefinierten Datenquelle, die im exportierten Gantt-Diagramm dargestellt wird. Es wird erwartet, dass die Eigenschaften **start_date** und **end_date** im Format angegeben werden, das Datum und Uhrzeit umfasst (*%d-%m-%Y %H:%i*).

- **callback** - (*function*) Wenn Sie eine URL zum Herunterladen der generierten XML erhalten möchten, können Sie die Eigenschaft *callback* verwenden. Sie erhält ein JSON-Objekt mit der Eigenschaft *url*.

- **resources** - (*array*) Ermöglicht den Export der Ressourcenliste in eine MS Project-Datei. Falls Ressourcenkalender verwendet werden, müssen Sie -1 für eine Aufgabe in der Eigenschaft CalendarUID während des Exports im **tasks**-Objekt angeben. Dann wird der Ressourcenkalender der Aufgabe verwendet.

- **server** - (*string*) der API-Endpunkt für die Anfrage. Kann mit der lokalen Installation des Export-Dienstes verwendet werden. Der Standardwert ist `https://export.dhtmlx.com/gantt`.

Check the detailed descriptions of the export settings in the [related section](guides/export-msproject.md#export-settings).

### Related API
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export und Import aus MS Project](guides/export-msproject.md#export-to-ms-project)