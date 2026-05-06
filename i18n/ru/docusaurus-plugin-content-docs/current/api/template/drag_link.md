---
sidebar_label: drag_link
title: drag_link шаблон
description: "задает текст подсказок, отображаемых при создании новой связи зависимости"
---

# drag_link

### Description

@short: Задает текст подсказок, отображаемых при создании новой зависимости связи

@signature: drag_link: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) => string;

### Parameters

- `from` - (обязательно) *string | number* - идентификатор исходной задачи
- `from_start` - (обязательно) *boolean* - <i>true</i>, если перетаскивание ссылки начинается с начала исходной задачи, <i>false</i> - если с конца задачи
- `to` - (обязательно) *string | number* - идентификатор целевой задачи ( 'null' или 'undefined', если целевая задача ещё не указана)
- `to_start` - (обязательно) *boolean* - <i>true</i>, если ссылка перетаскивается к началу целевой задачи, <i>false</i> - если к концу задачи

### Returns
- ` text` - (string) - HTML текст, который будет отображаться на диаграмме Ганта

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
- [Шаблоны зависимостей связей](guides/dependency-templates.md)