---
sidebar_label: container_resize_method
title: container_resize_method config
description: "defines whether the gantt should track resizing of the container at time intervals"
---

# container_resize_method

### Description

@short: Defines whether the gantt should track resizing of the container at time intervals

@signature: container_resize_method: string | undefined

### Example

~~~jsx
gantt.config.container_resize_method = "timeout";
~~~

**Default value:** undefined

### Details

By default, Gantt listens to the "resize" event for the window and for the iframe element placed inside the gantt. Sometimes these events can't be fired (for example, in Salesforce).

If you need Gantt to track resizing of the container at time intervals, set **container_resize_method** to *"timeout"*:

~~~js
gantt.config.container_resize_method = "timeout";
~~~

### Related API
- [container_resize_timeout](api/config/container_resize_timeout.md)

### Change log
- Added in v7.1

