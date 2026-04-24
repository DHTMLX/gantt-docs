---
sidebar_label: task_attribute
title: task_attribute Konfiguration
description: "legt den Namen des Attributs fest, der die ID des HTML-Elements der Aufgabe angibt"
---

# task_attribute

### Description

@short: Legt den Namen des Attributs fest, der die ID des HTML-Elements der Aufgabe angibt

@signature: task_attribute: string

### Example

~~~jsx
gantt.config.task_attribute = "data-task-id"
~~~

**Default value:** "data-task-id"

### Details

![data_task_id](/img/data_task_id.png)

HTML-Elemente von Aufgaben mit dem Standard **task_attribute** (*data-task-id* ) sehen so aus:

Das Attribut *task_id* ist enthalten, um die Abwärtskompatibilität mit früheren Versionen zu gewährleisten.

### Related API
- [locate](api/method/locate.md)