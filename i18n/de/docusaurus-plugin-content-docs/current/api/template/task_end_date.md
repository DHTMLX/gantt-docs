---
sidebar_label: task_end_date
title: task_end_date template
description: "steuert, wie die Enddaten der Tasks im Lightbox angezeigt werden"
---

# task_end_date

### Description

@short: Steuert, wie die Enddaten der Tasks im Lightbox angezeigt werden

@signature: task_end_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - html-Text, der im Gantt angezeigt wird

### Example

~~~jsx
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};
~~~

### Details

## Anpassung des Formats für inklusive Enddaten

Sie können diese Vorlage neu definieren, um zu ändern, wie die Enddaten der Tasks im Gantt dargestellt werden, z. B. um das Enddatum innerhalb der Task-Dauer einzubeziehen.

Betrachten wir zum Beispiel einen Task, der am 2. April 2020 beginnt und einen Tag dauert.

Standardmäßig wird das Enddatum als 3. April 2020 (`03-04-2020 00:00:00`) angezeigt:

- [Live-Demo: Standardformat](https://snippet.dhtmlx.com/5/24f73d6ec)

![task_end_date_template_default](/img/task_end_date_template_default.png)

Es ist möglich, die Anzeige des Enddatums auf den 2. April 2020 zu ändern:

- [Live-Demo: Inklusives Enddatum-Format](https://snippet.dhtmlx.com/t1k1rwo7)

![task_end_date_template](/img/task_end_date_template.png)

Um dies zu erreichen, überschreiben Sie die **columns**-Konfiguration wie folgt:

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

Für weitere Informationen zur Formatierung von Enddaten lesen Sie den Artikel [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).

### Related API
- [task_date](api/config/task_date.md)
- [task_date](api/template/task_date.md)
- [grid_date_format](api/template/grid_date_format.md)

### Related Guides
- ["Vorlagen des Lightbox"](guides/lightbox-templates.md)
- ["Datenladen"](guides/loading.md#taskenddatedisplayampinclusiveenddates)

