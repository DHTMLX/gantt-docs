---
sidebar_label: link_description
title: link_description template
description: "Legt den Text fest, der im Header des Bestätigungsfensters für das Löschen eines Links angezeigt wird"
---

# link_description

### Description

@short: Legt den Text fest, der im Header des Bestätigungsfensters für das Löschen eines Links angezeigt wird

@signature: link_description: (link: any) =\> string;

### Parameters

- `link` - (required) *object* - Das Link-Objekt

### Returns
- ` text` - (string) - HTML-Text, der im Gantt gerendert wird

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
- ["Vorlagen für Abhängigkeitsverknüpfungen"](guides/dependency-templates.md)
