---
sidebar_label: drag_link
title: drag_link template
description: "definiert den Tooltip-Text, der angezeigt wird, wenn ein neuer Abhängigkeitslink erstellt wird"
---

# drag_link

### Description

@short: Definiert den Tooltip-Text, der angezeigt wird, wenn ein neuer Abhängigkeitslink erstellt wird

@signature: drag_link: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string;

### Parameters

- `from` - (required) *string | number* - die ID der Quellaufgabe
- `from_start` - (required) *boolean* - <i>true</i>, wenn der Link vom Anfang der Quellaufgabe gezogen wird, <i>false</i>, wenn vom Ende
- `to` - (required) *string,number* - die ID der Zielaufgabe ('null' oder 'undefined', wenn die Zielaufgabe noch nicht angegeben ist)
- `to_start` - (required) *boolean* - <i>true</i>, wenn der Link zum Anfang der Zielaufgabe gezogen wird, <i>false</i>, wenn zum Ende

### Returns
- ` text` - (string) - html-Text, der im Gantt angezeigt wird

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
- ["Vorlagen für Abhängigkeitsverknüpfungen"](guides/dependency-templates.md)
