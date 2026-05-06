---
sidebar_label: task_date
title: task_date template
description: "bestimmt das Datumsformat des Labels im Abschnitt 'Zeitabschnitt' der Lightbox"
---

# task_date

### Description

@short: Definiert das Datumsformat, das für das Label im Abschnitt 'Time period' der Lightbox verwendet wird

@signature: task_date: (date: Date) =\> string

### Parameters

- `date` - (erforderlich) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Text, der im Gantt gerendert wird

### Example

~~~jsx
gantt.templates.task_date= function(date){
    return gantt.date.date_to_str(gantt.config.task_date)(date);
};
~~~

### Related API
- [task_date](api/config/task_date.md)

### Related Guides
- [Templates of the Lightbox](guides/lightbox-templates.md)