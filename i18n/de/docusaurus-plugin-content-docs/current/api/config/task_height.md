---
sidebar_label: task_height
title: task_height config
description: "Steuert die Höhe der Task-Balken im Timeline-Bereich"
---

# task_height

### Description

@short: Steuert die Höhe der Task-Balken im Timeline-Bereich

### Example

~~~jsx
gantt.config.task_height = 30;
gantt.init("gantt_here");
~~~

**Default value:** "full"

### Details

:::note
 Die **task_height** Eigenschaft ist veraltet. Stattdessen sollten Sie die Konfigurationseigenschaft [bar_height](api/config/bar_height.md) verwenden: 
:::

~~~
gantt.config.bar_height = 30;
gantt.init("gantt_here");
~~~

### Change log
- Die **task_height** Eigenschaft wurde in Version 7.1 als veraltet markiert.

