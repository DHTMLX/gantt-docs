---
sidebar_label: grid_date_format
title: grid_date_format Vorlage
description: "bestimmt das Format von Datumsangaben in den Spalten, die Datumswerte anzeigen (gibt die `Date`-Werte zurück)"
---

# grid_date_format

### Description

@short: Gibt das Format der Datumswerte in den Spalten an, die Datumswerte anzeigen (die `Date`-Werte zurückgeben)

@signature: grid_date_format: (date: Date, column?: string) =\> string;

### Parameters

- `date` - (erforderlich) *Date* - das Datum, das formatiert werden muss
- `column` - (optional) *string* - der Name der Spalte, die die Vorlage aufgerufen hat

### Returns
- `text` - (string) - HTML-Text, der im Gantt gerendert wird

### Example

~~~jsx
gantt.templates.grid_date_format = function(date, column){
    return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

### Details

Die Template-Funktion wird für alle Aufgaben aufgerufen, außer den ungeplanten.

:::note
Die **grid_date_format**-Vorlage wird nur von der [date_grid](api/template/date_grid.md) Vorlage verwendet, daher, wenn Sie Änderungen daran vornehmen, wird **grid_date_format** beeinflusst.
:::

### Related API
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [Vorlagen des Grids](guides/table-templates.md)

