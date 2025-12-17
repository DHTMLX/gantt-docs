---
sidebar_label: link_description
title: link_description template
description: "specifies the text in the header of the link's 'delete' confirm window"
---

# link_description

### Description

@short: Specifies the text in the header of the link's "delete" confirm window

@signature: link_description: (link: any) =\> string;

### Parameters

- `link` - (required) *object* - the link object

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

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
- [Templates of Dependency Links](guides/dependency-templates.md)
