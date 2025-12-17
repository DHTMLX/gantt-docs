---
sidebar_label: drag_link
title: drag_link template
description: "specifies the text of tooltips that are displayed when the user creates a new dependency link"
---

# drag_link

### Description

@short: Specifies the text of tooltips that are displayed when the user creates a new dependency link

@signature: drag_link: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string;

### Parameters

- `from` - (required) *string | number* - the id of the source task
- `from_start` - (required) *boolean* - <i>true</i>, if the link is being dragged from the start of the  source task, <i>false</i> - if <br/> from the end of the task
- `to` - (required) *string | number* - the id of the target task( 'null' or 'undefined', if the target task isn't specified yet)
- `to_start` - (required) *boolean* - <i>true</i>, if the link is being dragged to the start of the target task, <i>false</i> - if <br/> to the end of the task

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

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
- [Templates of Dependency Links](guides/dependency-templates.md)
