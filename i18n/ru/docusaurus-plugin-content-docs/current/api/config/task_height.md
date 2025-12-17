---
sidebar_label: task_height
title: task_height config
description: "управляет высотой task bar в области timeline"
---

# task_height

### Description

@short: Управляет высотой task bar в области timeline

### Example

~~~jsx
gantt.config.task_height = 30;
gantt.init("gantt_here");
~~~

**Default value:** "full"

### Details

:::note
 Свойство **task_height** устарело. Рекомендуется использовать конфигурационное свойство [bar_height](api/config/bar_height.md) вместо него: 
:::

~~~
gantt.config.bar_height = 30;
gantt.init("gantt_here");
~~~

### Change log
- свойство **task_height** было объявлено устаревшим в версии v7.1

