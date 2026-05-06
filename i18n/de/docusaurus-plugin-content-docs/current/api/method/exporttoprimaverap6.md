--- 
sidebar_label: exportToPrimaveraP6
title: exportToPrimaveraP6 method
description: "Exportiert Daten aus dem Gantt-Diagramm nach Primavera P6"
---

# exportToPrimaveraP6

### Description

@short: Exportiert Daten aus dem Gantt-Diagramm nach Primavera P6

@signature: exportToPrimaveraP6: (_export_?: any) =\> void

### Parameters

- `export`	- (*Objekt*) optional, ein Objekt mit Export-Einstellungen (siehe Details)

### Example

~~~jsx
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

### Related Samples
- [Datenexport: MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

### Details

:::note
Diese Methode ist in der **export**-Erweiterung definiert, daher müssen Sie das [export_api](guides/extensions-list.md#export-service) Plugin aktivieren. Lesen Sie die Details im Artikel [Export und Import von Primavera P6](guides/export-primavera.md#exporttoprimaverap6).
 
::: 

:::note
Wenn Sie eine Gantt-Version älter als 8.0 verwenden, müssen Sie `https://export.dhtmlx.com/gantt/api.js` in Ihre Seite einbinden, um den Online-Export-Service zu aktivieren, z. B.:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


Die **exportToPrimaveraP6()**-Methode nimmt als Parameter ein Objekt mit mehreren Eigenschaften (alle Eigenschaften sind optional):

- **name** - (*string*) der Name der erhaltenen Datei ('gantt.xml' standardmäßig).
- **auto_scheduling** - (*boolean*) gibt den Planungsmodus für Aufgaben im exportierten Projekt an. **true** kennzeichnet Aufgaben als automatisch geplant, **false** als manuell geplant (Standardzustand).
- **skip_circular_links** - (*boolean*) gibt an, ob zirkuläre Verknüpfungen entfernt werden oder nicht (true – werden entfernt (Standardmodus), false – bleiben erhalten).
- **project** - (*object*) Ermöglicht das Festlegen benutzerdefinierter Eigenschaften für das exportierte Projekt-Objekt.
- **tasks** - (*object*) Ermöglicht das Festlegen benutzerdefinierter Eigenschaften für die exportierten Aufgaben.
- **data** - (*object*) Ermöglicht das Festlegen einer benutzerdefinierten Datenquelle, die im exportierten Gantt-Diagramm dargestellt wird. Es wird erwartet, dass die Eigenschaften **start_date** und **end_date** im Format angegeben werden, das Datum und Uhrzeit umfasst (*%d-%m-%Y %H:%i*).
- **callback** - (*function*) Falls Sie eine URL zum Download der generierten XML-Datei erhalten möchten, kann die Eigenschaft *callback* verwendet werden. Sie erhält ein JSON-Objekt mit der Eigenschaft *url*.
- **resources** - (*array*) Ermöglicht den Export der Ressourcenliste in eine Primavera P6-Datei. Wenn Ressourcenkalender verwendet werden, muss während des Exports -1 für eine Aufgabe in der Eigenschaft **CalendarUID** angegeben werden (im **tasks**-Objekt). Dann verwendet die Aufgabe den Ressourcenkalender.
- **server** - (*string*) der API-Endpunkt für die Anfrage. Kann mit der lokalen Installation des Export-Services verwendet werden. Der Standardwert ist `https://export.dhtmlx.com/gantt`.

Prüfen Sie die detaillierten Beschreibungen der Export-Einstellungen im [verwandten Abschnitt](guides/export-primavera.md#export-settings).

### Related API
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export and Import from Primavera P6](guides/export-primavera.md#exporttoprimaverap6)