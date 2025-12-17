---
sidebar_label: drag_link_class
title: drag_link_class template
description: "определяет CSS класс, применяемый к всплывающему окну (tooltip), которое показывается, когда пользователь перетаскивает ссылку."
---

# drag_link_class

### Description

@short: Определяет CSS класс, применяемый к всплывающему окну (tooltip), которое показывается, когда пользователь перетаскивает ссылку.

@signature: drag_link_class: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string | void;

### Parameters

- `from` - (required) *string | number* - ID исходной задачи
- `from_start` - (required) *boolean* - <i>true</i>, если ссылка перетаскивается с начала исходной задачи, <i>false</i>, если с конца
- `to` - (required) *string | number* - ID целевой задачи ('null' или 'undefined', если целевая задача ещё не задана)
- `to_start` - (required) *boolean* - <i>true</i>, если ссылка перетаскивается к началу целевой задачи, <i>false</i>, если к концу

### Returns
- ` text` - (string | void) - CSS класс для соответствующего элемента

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
- [Шаблоны связей зависимостей](guides/dependency-templates.md)
