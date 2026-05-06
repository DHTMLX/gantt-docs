---
sidebar_label: adjustTaskHeightForBaselines
title: adjustTaskHeightForBaselines method
description: "регулирует высоту строки задачи для корректного отображения элементов базовых линий"
---

# adjustTaskHeightForBaselines

### Description

@short: Регулирует высоту строки задачи для корректного отображения элементов базовых линий

@signature: adjustTaskHeightForBaselines: (task: Task) => void

### Parameters

- `task` - (обязательный) *Task* - объект задачи, у которого будет скорректировано значение `row_height`

### Example

~~~jsx
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task);
gantt.render();
~~~

### Related samples
- [Отображение базовых линий](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Этот метод изменяет значение [`row_height`](guides/resizing-rows.md) предоставленной задачи, чтобы обеспечить корректное отображение элементов базовых линий. 

Как правило, вызывать этот метод напрямую не требуется. Он необходим только в случае динамического изменения настроек отображения конфигурации [gantt.config.baselines](api/config/baselines.md).

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [Extra Elements in Timeline](guides/inbuilt-baselines.md)

### Change log
- добавлено в версии v9.0