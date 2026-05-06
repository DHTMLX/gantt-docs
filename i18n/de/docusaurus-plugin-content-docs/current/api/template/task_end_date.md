---
sidebar_label: task_end_date
title: task_end_date template
description: "legt das Format der Enddaten von Aufgaben im Lightbox-Fenster fest"
---

# task_end_date

### Description

@short: Legt das Format der Enddaten von Aufgaben im Lightbox-Fenster fest

@signature: task_end_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Text, der im Gantt gerendert wird

### Example

~~~jsx
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};
~~~

### Details

## Festlegung des Formats für inklusive Enddaten

Die Vorlage kann neu definiert werden, um das Erscheinungsbild der Enddaten von Aufgaben im Gantt (z. B. das Enddatum in die Dauer der Aufgaben einzubeziehen) zu ändern.

Beispielsweise betrachten wir eine Aufgabe, die am 2. April 2020 beginnt und einen Tag dauert.

Standardmäßig wird das Enddatum dieser Aufgabe als 3. April 2020 angezeigt (`03-04-2020 00:00:00`):

- [Live-Demo: Standardformat](https://snippet.dhtmlx.com/5/24f73d6ec)

![task_end_date_template_default](/img/task_end_date_template_default.png)

Sie können das Format des Enddatums auf den 2. April 2020 ändern:

- [Live-Demo: Inklusive Enddaten-Format](https://snippet.dhtmlx.com/t1k1rwo7)

![task_end_date_template](/img/task_end_date_template.png)


Um dies zu tun, müssen Sie die **columns**-Konfiguration überschreiben, wie folgt:

~~~js

gantt.config.columns = [
  {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
  {name: "text", label: "Name", tree: true, width: 200, resize: true},
  {name: "start_date", label: "Start", width:80, align: "center", resize: true},
  {name: "end_date", label: "Finish", width:80, align: "center", resize: true},    
  {name:"add"}
];
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};

var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
   if(column === "end_date"){
     return gridDateToStr(new Date(date.valueOf() - 1)); 
   }else{
     return gridDateToStr(date); 
   }
}
gantt.init("gantt_here");

~~~

Für weitere Details zur Formatierung von Enddaten siehe den Artikel [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).

### Related API
- [task_date](api/config/task_date.md)
- [task_date](api/template/task_date.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- [Templates of the Lightbox](guides/lightbox-templates.md)
- [Datenladen](guides/loading.md#taskenddatedisplayampinclusiveenddates)