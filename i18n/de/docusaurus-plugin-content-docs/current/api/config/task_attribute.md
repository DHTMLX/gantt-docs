---
sidebar_label: task_attribute
title: task_attribute config
description: "definiert den Namen des Attributs, das verwendet wird, um die ID des HTML-Elements einer Aufgabe anzugeben"
---

# task_attribute

### Description

@short: Definiert den Namen des Attributs, das verwendet wird, um die ID des HTML-Elements einer Aufgabe anzugeben

@signature: task_attribute: string

### Example

~~~jsx
gantt.config.task_attribute = "data-task-id"
~~~

**Default value:** "data-task-id"

### Details

Task HTML-Elemente mit dem Standard-**task_attribute** (*data-task-id*) sehen so aus:

![data_task_id](/img/data_task_id.png)

Das *task_id*-Attribut ist weiterhin enthalten, um die Kompatibilität mit früheren Versionen zu gewährleisten.

### Related API
- [locate](api/method/locate.md)

