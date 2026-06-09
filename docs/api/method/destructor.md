---
sidebar_label: destructor
title: destructor method
description: "destroys the gantt instance"
---

# destructor

### Description

@short: Destroys the gantt instance

@signature: destructor: () =\> void

### Example

~~~jsx
const myGantt = Gantt.getGanttInstance();

//destroying a gantt instance
myGantt.destructor();
~~~

### Details

The method destroys a gantt instance and calls the [onDestroy](api/event/ondestroy.md) event.

Calling a destructor will:

- clear the data loaded into a gantt instance
- destroy the [dataProcessor](api/method/dataprocessor.md) (if it is attached to the gantt)
- detach the gantt from DOM
- detach all DOM events attached via the [event](api/method/event.md) and [attachEvent](api/method/attachevent.md) methods

:::note
Starting from v10, multiple Gantt instances are supported in all editions (the free Community edition and the PRO editions). In legacy versions that do not allow creating multiple instances (the GPL edition in v9.x and earlier, or the single-domain Commercial build), calling the gantt destructor will make gantt inaccessible until page reload.
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- [Multiple Charts on a Page](guides/multiple-gantts.md)

### Change log
- added in version 5.1

