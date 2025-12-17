---
sidebar_label: link_description
title: link_description template
description: "задаёт текст, отображаемый в заголовке окна подтверждения удаления связи"
---

# link_description

### Description

@short: Задаёт текст, отображаемый в заголовке окна подтверждения удаления связи

@signature: link_description: (link: any) =\> string;

### Parameters

- `link` - (required) *object* - объект связи

### Returns
- ` text` - (string) - html-текст, который будет отрисован в gantt

### Example

~~~jsx
gantt.templates.link_description = function(link){
    const from = gantt.getTask(link.source);
    const to = gantt.getTask(link.target);
    const types = gantt.config.links;

    const from_start = link.type == types.start_to_start;
    const to_start = link.type == types.finish_to_start ||  
                    link.type == types.start_to_start;
    return `From <b>${from.text}</b> ${(from_start?"Start":"End")}<br/>
To <b>${to.text}</b> ${(to_start ? "Start" : "End")}<br/>`;
};
~~~

### Related Guides
- [Шаблоны связей зависимостей](guides/dependency-templates.md)
