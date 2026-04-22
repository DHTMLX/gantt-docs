---
sidebar_label: init
title: init method
description: "richtet ein dhtmlxGantt in einem angegebenen Container ein"
---

# init

### Description

@short: Initialisiert ein dhtmlxGantt in einem Container

@signature: init: (container: string | HTMLElement, from?: Date, to?: Date) => void

### Parameters

- `container` - (erforderlich) *string* - | HTMLElement        ein HTML-Container (oder dessen ID), in dem ein dhtmlxGantt-Objekt initialisiert wird

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

Die Verwendung der 2. und 3. Parameter der Methode ist eine gute Möglichkeit, die Grenzwerte des Zeitmaßstabs festzulegen:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

Hinweis: Die Datumsparameter der Methode `gantt.init` sind Abkürzungen für die Configs [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md). Die beiden untenstehenden Code-Beispiele sind einander gleichwertig:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

und

~~~js
gantt.config.start_date = new Date(2023, 08, 10);
gantt.config.end_date = new Date(2023, 08, 20);
gantt.init("gantt_here");
~~~

Was diese Configs bewirken, ist das Definieren und Begrenzen des dargestellten Datumsbereichs. Aufgaben, die außerhalb dieses angegebenen Bereichs liegen, werden nicht angezeigt.

Durch die Datumsparameter der Methode `gantt.init`, sowie die Configs [start_date] und [end_date], wird die Einstellung [fit_tasks] aufgehoben.

Wenn Sie möchten, dass der Zeitmaßstab dynamisch an den Datumsbereich angepasst wird, können Sie entweder diese Parameter weglassen oder den Zeitraum dynamisch verwalten (siehe guides/configuring-time-scale.md#range).

:::note
Diese Methode setzt benutzerdefinierte Layer zurück, die dem Timeline-Bereich über die Methoden [addTaskLayer] und [addLinkLayer] hinzugefügt wurden. Daher müssen Sie diese nach dem Aufruf der Methode **gantt.init** erneut definieren, damit benutzerdefinierte Layer auf der Seite angezeigt werden.
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- [dhtmlxGantt in Plain JS/HTML](guides/initializing-gantt-chart.md)