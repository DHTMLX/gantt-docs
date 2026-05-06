---
sidebar_label: task_height
title: task_height config
description: "setzt die Höhe der Task-Balken im Timeline-Bereich"
---

# task_height

:::warning
Die Eigenschaft ist veraltet.
::: 

### Description

@short: Setzt die Höhe der Task-Balken im Timeline-Bereich

### Example

~~~jsx
gantt.config.task_height = 30;
gantt.init("gantt_here");
~~~

**Standardwert:** "full"

### Details

:::note
Die **task_height**-Eigenschaft ist veraltet. Stattdessen können Sie die [bar_height](api/config/bar_height.md) Konfigurations-Eigenschaft verwenden: 
:::

~~~
gantt.config.bar_height = 30;
gantt.init("gantt_here");
~~~

### Change log
- Die **task_height**-Eigenschaft wurde in v7.1 veraltet.