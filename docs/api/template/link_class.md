---
sidebar_label: link_class
title: link_class template
description: "specifies the CSS class that will be applied to a link"
---

# link_class

### Description

@short: Specifies the CSS class that will be applied to a link

@signature: link_class: (link: Link) =\> string | void;

### Parameters

- `link` - (required) *Link* - the link object

### Returns
- ` text` - (string | void) - a CSS class for the item in question

### Example

~~~jsx
gantt.templates.link_class = function(link){
    return "";
};
~~~

### Related Guides
- [Templates of Dependency Links](guides/dependency-templates.md)
