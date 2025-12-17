---
sidebar_label: date_grid
title: date_grid config
description: "legt das Format fest, das für Daten in der Spalte 'Start time' der Tabelle verwendet wird"
---

# date_grid

### Description

@short: Legt das Format fest, das für Daten in der Spalte "Start time" der Tabelle verwendet wird

@signature: date_grid: string

### Example

~~~jsx
gantt.config.date_grid = "%d/%m/%Y";

gantt.init("gantt_here");
~~~

**Default value:** "%Y-%m-%d"

### Details

Um die Einstellung **grid_date** dynamisch zu aktualisieren (z. B. wenn der Benutzer die Locale ändert), können Sie die [grid_date_format](api/template/grid_date_format.md) Vorlage neu definieren:

~~~js
function change_grid_date(){
  gantt.config.date_grid = "%d.%m.%Y";
  gantt.render()
}
gantt.templates.grid_date_format = function(date, column){
  return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

**Verwandtes Beispiel:** [Datum im grid dynamisch ändern](https://snippet.dhtmlx.com/qo5s7lfs)

### Related API
- [date_grid](api/template/date_grid.md)

