---
sidebar_label: drag_link
title: drag_link template
description: "определяет текст tooltip, отображаемый при создании новой зависимости (dependency link)"
---

# drag_link

### Description

@short: Определяет текст tooltip, отображаемый при создании новой зависимости (dependency link)

@signature: drag_link: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string;

### Parameters

- `from` - (required) *string | number* - ID исходной задачи
- `from_start` - (required) *boolean* - <i>true</i>, если ссылка перетягивается с начала исходной задачи, <i>false</i> - если с конца
- `to` - (required) *string | number* - ID целевой задачи ('null' или 'undefined', если целевая задача ещё не указана)
- `to_start` - (required) *boolean* - <i>true</i>, если ссылка перетягивается к началу целевой задачи, <i>false</i> - если к концу

### Returns
- ` text` - (string) - HTML текст, который будет отображён в gantt

### Example

~~~jsx
gantt.templates.drag_link = function(from, from_start, to, to_start) {
    const sourceTask = gantt.getTask(from);

    let text = `From:<b> ${sourceTask.text}</b> ${(from_start?"Start":"End")}<br/>`;
    if(to){
        const targetTask = gantt.getTask(to);
        text += `To:<b> ${targetTask.text}</b> ${(to_start?"Start":"End")}<br/>`;
    }
    return text;
};
~~~

### Related Guides
- [Шаблоны связей зависимостей](guides/dependency-templates.md)
