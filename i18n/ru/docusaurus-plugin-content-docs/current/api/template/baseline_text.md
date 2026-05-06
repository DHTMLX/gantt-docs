---
sidebar_label: baseline_text
title: baseline_text шаблон
description: "задает текст, отображаемый внутри baseline элемента"
---

# baseline_text
:::info
Эта функциональность доступна только в PRO-версии.
:::
### Description

@short: Указывает текст, отображаемый внутри элемента baseline

@signature: baseline_text: (task: Task, baseline: Baseline, index: number) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - объект задачи, связанный с baseline
- `baseline` - (required) *Baseline* - baseline-объект
- `index` - (required) *number* - индекс baseline в массиве baselines задачи

### Returns
- ` text` - (string | number | void) - HTML-содержимое, которое будет внедрено как innerHTML элемента baseline. Шаблон по умолчанию возвращает пустую строку.

### Example

~~~jsx
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

### Related samples
- [Отображение baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [Дополнительные элементы в Timeline](guides/inbuilt-baselines.md)

### Change log
- добавлено в версии v9.0