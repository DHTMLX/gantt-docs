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

- `container` - (erforderlich) *string | HTMLElement* -  ein HTML-Container (oder dessen ID), in dem ein dhtmlxGantt-Objekt initialisiert wird

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

Die Verwendung der 2. und 3. Parameter von `init()` ist eine gute Möglichkeit, die Grenzwerte der Zeitachse festzulegen:

~~~js
gantt.init("gantt_here", new Date(2027, 8, 10), new Date(2027, 8, 20));
~~~

Beachten Sie, dass die Datumsparameter von `init()` Abkürzungen für die Konfigurationen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) sind.
Die beiden untenstehenden Code-Schnipsel sind äquivalent zueinander:

~~~js
gantt.init("gantt_here", new Date(2027, 8, 10), new Date(2027, 8, 20));
~~~

und

~~~js
gantt.config.start_date = new Date(2027, 8, 10);
gantt.config.end_date = new Date(2027, 8, 20);
gantt.init("gantt_here");
~~~

Was diese Configs bewirken, ist das Definieren und Begrenzen des dargestellten Datumsbereichs. Aufgaben, die außerhalb dieses angegebenen Bereichs liegen, werden nicht angezeigt.

Die Verwendung der Datumsparameter von `init()`, zusammen mit den Configs [start_date] und [end_date], hebt die Einstellung fit_tasks auf.

Wenn Sie möchten, dass der Zeitmaßstab dynamisch an den Datumsbereich angepasst wird, können Sie entweder diese Parameter weglassen oder den Zeitraum dynamisch verwalten (siehe guides/configuring-time-scale.md#range).

:::note
Diese Methode setzt benutzerdefinierte Layer zurück, die dem Timeline-Bereich über die Methoden [`addTaskLayer()`](api/method/addtasklayer.md) und [`addLinkLayer()`](api/method/addlinklayer.md) hinzugefügt wurden. Daher müssen Sie sie nach dem Aufruf von `init()` erneut definieren, damit benutzerdefinierte Layer auf der Seite angezeigt werden.
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- [dhtmlxGantt in Plain JS/HTML](guides/initializing-gantt-chart.md)