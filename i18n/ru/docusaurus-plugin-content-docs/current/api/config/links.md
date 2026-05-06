---
sidebar_label: links
title: links config
description: "хранит типы зависимостей links"
---

# links

### Description

@short: Хранение типов зависимостей между связями

@signature: links: \{ finish_to_start?: string | number; start_to_start?: string | number; finish_to_finish?: string | number; start_to_finish?: string | number; \}

### Example

~~~jsx
var type1 = gantt.config.links.finish_to_start;
~~~

**Default value:**\{ "finish_to_start":"0", "start_to_start":"1", "finish_to_finish":"2", "start_to_finish":"3" \}

### Details

- **finish_to_start** - (*string | number*) - целевая задача не может начать до окончания исходной задачи (но может начаться позже).
- **start_to_start** - (*string | number*) - целевая задача не может начать до того, как начнется исходная задача (но может начаться позже).
- **finish_to_finish** - (*string | number*) - целевая задача не может завершиться раньше окончания исходной задачи (но может завершиться позже).
- **start_to_finish** - (*string | number*) - целевая задача не может завершиться раньше начала исходной задачи (но может завершиться позже).

### Related Guides
- [Загрузка данных](guides/loading.md#dataproperties)