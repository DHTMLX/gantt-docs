---
sidebar_label: container_resize_timeout
title: container_resize_timeout config
description: "Legt die Verzögerungszeit (in Millisekunden) fest, bevor das Gantt nach einer Größenänderung des Containers neu gezeichnet wird."
---

# container_resize_timeout

### Description

@short: Legt die Verzögerungszeit (in Millisekunden) fest, bevor das Gantt nach einer Größenänderung des Containers neu gezeichnet wird.

@signature: container_resize_timeout: number

### Example

~~~jsx
gantt.config.container_resize_timeout = 300;
~~~

**Default value:** 20

### Change log
- added in v7.0.11
