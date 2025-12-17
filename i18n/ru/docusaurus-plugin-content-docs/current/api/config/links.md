---
sidebar_label: links
title: links config
description: "хранит типы зависимостей links"
---

# links

### Description

@short: Хранит типы зависимостей links

@signature: links: \{ finish_to_start?: string | number; start_to_start?: string | number; finish_to_finish?: string | number; start_to_finish?: string | number; \}

### Example

~~~jsx
var type1 = gantt.config.links.finish_to_start;
~~~

**Default value:** \{
  "finish_to_start":"0",
  "start_to_start":"1",
  "finish_to_finish":"2",
  "start_to_finish":"3"
\}

### Details

- **finish_to_start** - (*string | number*) - целевая задача не может начаться до завершения исходной задачи, но может начаться в любое время после этого.
- **start_to_start** - (*string | number*) - целевая задача не может начаться до начала исходной задачи, но может начаться позже.
- **finish_to_finish** - (*string | number*) - целевая задача не может завершиться до завершения исходной задачи, но может завершиться позже.
- **start_to_finish** - (*string | number*) - целевая задача не может завершиться до начала исходной задачи, но может завершиться позже.

### Related Guides
- [Загрузка данных](guides/loading.md#dataproperties)
