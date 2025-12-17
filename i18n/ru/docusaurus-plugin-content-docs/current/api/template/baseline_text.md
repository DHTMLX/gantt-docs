---
sidebar_label: baseline_text
title: baseline_text template
description: "определяет текст, отображаемый внутри элемента baseline"
---

# baseline_text

### Description

@short: Определяет текст, отображаемый внутри элемента baseline

@signature: baseline_text: (task: Task, baseline: Baseline, index: number) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - объект задачи, связанный с baseline
- `baseline` - (required) *Baseline* - сам объект baseline
- `index` - (required) *number* - позиция baseline в массиве baselines задачи

### Returns
- ` text` - (string | number | void) - HTML-содержимое, которое будет установлено как innerHTML элемента baseline. По умолчанию возвращает пустую строку.

### Example

~~~jsx
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [Дополнительные элементы на временной шкале](guides/inbuilt-baselines.md)

### Change log
- добавлено в версии 9.0

