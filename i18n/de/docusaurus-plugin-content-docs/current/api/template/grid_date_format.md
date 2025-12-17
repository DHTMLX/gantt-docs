---
sidebar_label: grid_date_format
title: grid_date_format template
description: "definiert, wie Daten in Spalten angezeigt werden, die Datumswerte darstellen (gibt die `Date`-Werte zurück)"
---

# grid_date_format

### Description

@short: Definiert, wie Daten in Spalten angezeigt werden, die Datumswerte darstellen (gibt die `Date`-Werte zurück)

@signature: grid_date_format: (date: Date, column?: string) =\> string;

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll
- `column` - (optional) *string* - der Name der Spalte, die die Vorlage ausgelöst hat


### Returns
- ` text` - (string) - html-Text, der im Gantt angezeigt wird

### Example

~~~jsx
gantt.templates.grid_date_format = function(date, column){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

### Details

Diese Template-Funktion wird für alle Aufgaben aufgerufen, außer für jene, die nicht geplant sind.

:::note
 Die **grid_date_format**-Vorlage wird nur von der [date_grid](api/template/date_grid.md) Vorlage verwendet, daher wirken sich Änderungen hier auch auf **grid_date_format** aus. 
:::

### Related API
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- ["Vorlagen des Grids"](guides/table-templates.md)

