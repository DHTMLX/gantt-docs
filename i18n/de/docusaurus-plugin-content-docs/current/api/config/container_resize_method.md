---
sidebar_label: container_resize_method
title: container_resize_method config
description: "Gibt an, ob der Gantt die Größenänderung des Containers in regelmäßigen Zeitintervallen überwachen soll."
---

# container_resize_method

### Description

@short: Gibt an, ob der Gantt die Größenänderung des Containers in regelmäßigen Zeitintervallen überwachen soll.

@signature: container_resize_method: string | undefined

### Example

~~~jsx
gantt.config.container_resize_method = "timeout";
~~~

**Default value:** undefined

### Details

Standardmäßig reagiert der Gantt auf das "resize"-Event des Fensters und des iframes innerhalb des Gantt. Diese Events werden jedoch nicht immer ausgelöst (zum Beispiel in Salesforce-Umgebungen).

Um dem Gantt zu ermöglichen, die Containergröße in regelmäßigen Abständen zu überprüfen, setzen Sie **container_resize_method** auf *"timeout"*:

~~~js
gantt.config.container_resize_method = "timeout";
~~~

### Related API
- [container_resize_timeout](api/config/container_resize_timeout.md)

### Change log
- Hinzugefügt in v7.1

