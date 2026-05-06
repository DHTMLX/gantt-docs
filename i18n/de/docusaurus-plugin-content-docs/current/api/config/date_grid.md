---
sidebar_label: date_grid
title: date_grid Konfiguration
description: "legt das Datumsformat in der 'Startzeit'-Spalte der Tabelle fest"
---

# date_grid

### Description

@short: Legt das Datumsformat in der "Startzeit"-Spalte der Tabelle fest

@signature: date_grid: string

### Example

~~~jsx
gantt.config.date_grid = "%d/%m/%Y";

gantt.init("gantt_here");
~~~

**Default value:** "%Y-%m-%d"

### Details

Um die **grid_date**-Konfiguration dynamisch zu ändern (z. B. nachdem der Benutzer die Locale-Sprache ändert), müssen Sie die [grid_date_format](api/template/grid_date_format.md) Vorlage neu definieren:

~~~js
function change_grid_date(){
  gantt.config.date_grid = "%d.%m.%Y";
  gantt.render()
}
gantt.templates.grid_date_format = function(date, column){
  return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

**Zugehöriges Beispiel:** [Datum im Grid dynamisch ändern](https://snippet.dhtmlx.com/qo5s7lfs)

### Related API
- [date_grid](api/template/date_grid.md)