---
sidebar_label: task_date
title: task_date template
description: "definiert das Datumsformat, das für das Label im Abschnitt 'Time period' der Lightbox verwendet wird"
---

# task_date

### Description

@short: Definiert das Datumsformat, das für das Label im Abschnitt 'Time period' der Lightbox verwendet wird

@signature: task_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - der Datumswert, der formatiert wird

### Returns
- ` text` - (string) - html-Inhalt, der im Gantt angezeigt wird

### Example

~~~jsx
gantt.templates.task_date= function(date){
    return gantt.date.date_to_str(gantt.config.task_date)(date);
};
~~~

### Related API
- [task_date](api/config/task_date.md)

### Related Guides
- ["Vorlagen des Lightbox"](guides/lightbox-templates.md)

