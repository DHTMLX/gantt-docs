---
sidebar_label: drag_link_class
title: drag_link_class template
description: "specifies the CSS class that will be applied to the pop-up that appears when a user drags a link"
---

# drag_link_class

### Description

@short: Specifies the CSS class that will be applied to the pop-up that appears when a user drags a link

@signature: drag_link_class: (from: string | number, from_start: boolean, to: string | number, to_start: boolean) =\> string | void;

### Parameters

- `from` - (required) *string | number* - the id of the source task
- `from_start` - (required) *boolean* - <i>true</i>, if the link is being dragged from the start of the  source task, <i>false</i> - if <br/> from the end of the task
- `to` - (required) *string | number* - the id of the target task( 'null' or 'undefined', if the target task isn't specified yet)
- `to_start` - (required) *boolean* - <i>true</i>, if the link is being dragged to the start of the target task, <i>false</i> - if <br/> to the end of the task

### Returns
- ` text` - (string | void) - a CSS class for the item in question

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
- [Templates of Dependency Links](guides/dependency-templates.md)
