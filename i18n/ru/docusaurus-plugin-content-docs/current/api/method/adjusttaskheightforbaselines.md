---
sidebar_label: adjustTaskHeightForBaselines
title: adjustTaskHeightForBaselines method
description: "корректирует высоту строки задачи для правильного отображения элементов baseline"
---

# adjustTaskHeightForBaselines

### Description

@short: Корректирует высоту строки задачи для правильного отображения элементов baseline

@signature: adjustTaskHeightForBaselines: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - объект задачи, у которого будет обновлено свойство `row_height`

### Example

~~~jsx
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task);
gantt.render();
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Этот метод обновляет [`row_height`](guides/resizing-rows.md) указанной задачи, чтобы элементы baseline отображались корректно.

Обычно вызов этого метода не требуется. Он используется преимущественно при изменении настроек отображения конфигурации [gantt.config.baselines](api/config/baselines.md) на лету.

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [Дополнительные элементы на временной шкале](guides/inbuilt-baselines.md)

### Change log
- добавлено в версии 9.0

