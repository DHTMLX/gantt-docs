---
sidebar_label: bar_height
title: bar_height config
description: "задает высоту полос задач на временной шкале"
---

# bar_height

### Description

@short: Устанавливает высоту полос задач на временной шкале

@signature: bar_height: number | string

### Example

~~~jsx
gantt.config.bar_height = 30;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** "full"

### Related API
- [getTaskBarHeight](api/method/gettaskbarheight.md)

### Related Guides
- [Resizing Rows in Grid](guides/resizing-rows.md)

### Change log
- добавлено в v7.1