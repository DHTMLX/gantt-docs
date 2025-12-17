---
sidebar_label: scroll_size
title: scroll_size config
description: "set the sizes of the vertical (width) and horizontal (height) scrolls"
---

# scroll_size

### Description

@short: Set the sizes of the vertical (width) and horizontal (height) scrolls

@signature: scroll_size: number

### Example

~~~jsx
gantt.config.scroll_size = 20;

gantt.init("gantt_here");
~~~

**Default value:** 15

### Details

If not specified, Gantt will use the default scrollbar width of the browser since styles of the scrollbar element vary depending on the browser.
