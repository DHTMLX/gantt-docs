---
sidebar_label: container_resize_method
title: container_resize_method Konfiguration
description: "Definiert, ob der Gantt die Größenänderung des Containers in Zeitabständen verfolgen soll"
---

# container_resize_method

### Description

@short: Legt fest, ob der Gantt die Größenänderung des Containers in Zeitabständen verfolgen soll

@signature: container_resize_method: string | undefined

### Example

~~~jsx
gantt.config.container_resize_method = "timeout";
~~~

**Default value:** undefined

### Details

By default, Gantt listens to the "resize" event for the window and for the iframe element placed inside the gantt. Sometimes these events can't be fired (for example, in Salesforce).

Wenn Sie möchten, dass Gantt die Größenänderung des Containers in Zeitabständen verfolgt, setzen Sie **container_resize_method** auf *"timeout"*:

~~~js
gantt.config.container_resize_method = "timeout";
~~~

### Related API
- [container_resize_timeout](api/config/container_resize_timeout.md)

### Change log
- Hinzugefügt in v7.1