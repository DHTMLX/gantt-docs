---
sidebar_label: drag_link_class
title: drag_link_class шаблон
description: "задает CSS класс, который будет применяться к всплывающему окну, которое появляется при перетаскивании ссылки"
---

# drag_link_class

### Description

@short: Задает CSS класс, который будет применяться к всплывающему окну, которое появляется при перетаскивании ссылки

@signature: drag_link_class: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) => string | void;

### Parameters

- `from` - (required) *string | number* - идентификатор исходной задачи
- `from_start` - (required) *boolean* - <i>true</i>, если ссылка перетаскивается от начала исходной задачи, <i>false</i> - если от конца задачи
- `to` - (required) *string | number* - идентификатор целевой задачи ('null' или 'undefined', если целевая задача ещё не указана)
- `to_start` - (required) *boolean* - <i>true</i>, если ссылка перетаскивается к началу целевой задачи, <i>false</i> - если <br/> к концу задачи

### Returns
- ` text` - (string | void) - CSS-класс для данного элемента

### Example

~~~jsx
gantt.templates.drag_link_class = function(from, from_start, to, to_start) {
    let add = "";
    if(from && to){
        const allowed = gantt.isLinkAllowed(from, to, from_start, to_start);
        add = (allowed ? "gantt_link_allow" : "gantt_link_deny");
    }
    return `gantt_link_tooltip ${add}`;
};
~~~

### Related Guides
- [Шаблоны зависимостей](guides/dependency-templates.md)