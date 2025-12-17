---
sidebar_label: init
title: init method
description: "richtet ein dhtmlxGantt in einem angegebenen Container ein"
---

# init

### Description

@short: Richtet ein dhtmlxGantt in einem angegebenen Container ein

@signature: init: (container: string | HTMLElement, from?: Date, to?: Date) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* -        Der HTML-Container (oder dessen ID), in dem das dhtmlxGantt erstellt wird
- `from` - (optional) *Date* - Der Startpunkt der Zeitskala (X-Achse)
- `to` - (optional) *Date* -   	Der Endpunkt der Zeitskala (X-Achse)

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

Die Übergabe des 2. und 3. Arguments an diese Methode ist eine einfache Möglichkeit, die Grenzen der Zeitskala festzulegen:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

Beachte, dass die Datumsparameter in `gantt.init` als Abkürzungen für die Konfigurationen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) dienen.
Die beiden folgenden Beispiele erzielen dasselbe Ergebnis:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

und

~~~js
gantt.config.start_date = new Date(2023, 08, 10);
gantt.config.end_date = new Date(2023, 08, 20);
gantt.init("gantt_here");
~~~

Diese Einstellungen definieren und beschränken den sichtbaren Datumsbereich. Aufgaben außerhalb dieses Bereichs werden nicht angezeigt.

Die Verwendung der Datumsargumente in `gantt.init` oder der Konfigurationen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) überschreibt die Option [fit_tasks](api/config/fit_tasks.md).

Wenn die Zeitskala sich lieber automatisch basierend auf dem Datumsbereich anpassen soll, können diese Parameter weggelassen oder der Zeitbereich [dynamisch gehandhabt](guides/configuring-time-scale.md#range) werden.

:::note
 Diese Methode setzt alle benutzerdefinierten Layer zurück, die über die Methoden [addTaskLayer](api/method/addtasklayer.md) und [addLinkLayer](api/method/addlinklayer.md) im Timeline-Bereich hinzugefügt wurden. Deshalb müssen diese benutzerdefinierten Layer nach dem Aufruf von **gantt.init** erneut angewendet werden, damit sie auf der Seite erscheinen. 
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- ["dhtmlxGantt in Plain JS/HTML"](guides/initializing-gantt-chart.md)

