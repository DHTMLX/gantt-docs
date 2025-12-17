---
sidebar_label: prevent_default_scroll
title: prevent_default_scroll config
description: "specifies whether the gantt container should block the mousewheel event, or should it be propagated up to the window element"
---

# prevent_default_scroll

:::warning
The property is deprecated.
:::

### Description

@short: Specifies whether the gantt container should block the mousewheel event, or should it be propagated up to the window element

### Example

~~~jsx
gantt.config.prevent_default_scroll = false;
gantt.init('gantt_here');
~~~

**Default value:** false

### Details

The option is useful in cases when the gantt is inserted in the middle of the page and there is some content outside.

If the option is disabled, the scroll once appeared in the gantt would remain there.
To scroll the other part of the page a user will need to make a click outside of the gantt.

### Change log
- deprecated from v5.0
