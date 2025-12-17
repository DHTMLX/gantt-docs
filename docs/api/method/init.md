---
sidebar_label: init
title: init method
description: "initializes a dhtmlxGantt inside a container"
---

# init

### Description

@short: Initializes a dhtmlxGantt inside a container

@signature: init: (container: string | HTMLElement, from?: Date, to?: Date) =\> void

### Parameters

- `container` - (required) *string* - | HTMLElement        an HTML container (or its id) where a dhtmlxGantt object will be initialized

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

Using the 2nd and 3rd parameters of the method is a good way to set the boundary values of the time scale:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

Note, that date paremeters of the `gantt.init` method are shortcuts for [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md) configs.
The two code snippets below are equivalent to each other:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

and

~~~js
gantt.config.start_date = new Date(2023, 08, 10);
gantt.config.end_date = new Date(2023, 08, 20);
gantt.init("gantt_here");
~~~

What these configs do is define and limit the displayed date range. Tasks that fall outside that specified range won't be displayed.

Using the date parameters of the `gantt.init` method, as well as [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md) configs will cancel the
[fit_tasks](api/config/fit_tasks.md) setting.

If you want the time scale to be dynamically adjusted according to the date range, you can either skip these parameters or [manage the time range dynamically](guides/configuring-time-scale.md#range).

:::note
This method resets custom layers added to the timeline area via the [addTaskLayer](api/method/addtasklayer.md) and [addLinkLayer](api/method/addlinklayer.md) methods. Therefore, you need to redefine these ones after calling the **gantt.init** method in order for custom layers to be displayed on a page. 
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- [dhtmlxGantt in Plain JS/HTML](guides/initializing-gantt-chart.md)

