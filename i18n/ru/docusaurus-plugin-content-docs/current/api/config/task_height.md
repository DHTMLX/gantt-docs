---
sidebar_label: task_height
title: конфигурация task_height
description: "устанавливает высоту полос задач на области таймлайна"
---

# task_height

:::warning
Свойство устарело.
:::

### Description

@short: Устанавливает высоту полос задач на области таймлайна

### Example

~~~jsx
gantt.config.task_height = 30;
gantt.init("gantt_here");
~~~

**Default value:** "full"

### Details

:::note
Свойство **task_height** устарело. Вместо него можно использовать конфигурационное свойство [bar_height](api/config/bar_height.md):
:::

~~~
gantt.config.bar_height = 30;
gantt.init("gantt_here");
~~~

### Change log
- свойство **task_height** устарело в версии v7.1