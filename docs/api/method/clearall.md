---
sidebar_label: clearAll
title: clearAll method
description: "removes all tasks and additional elements (including markers) from the Gantt chart"
---

# clearAll

### Description

@short: Removes all tasks and additional elements (including markers) from the Gantt chart

@signature: clearAll: () =\> void

### Example

~~~jsx
// reloads data in the Gantt chart
gantt.load("url1");

gantt.clearAll(); /*!*/
gantt.load("url2");/*!*/
~~~

### Details

Note, the method invokes the [onClear](api/event/onclear.md) event.

### Related API
- [onClear](api/event/onclear.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)

