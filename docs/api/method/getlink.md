---
sidebar_label: getLink
title: getLink method
description: "returns the dependency link object by the specified id"
---

# getLink

### Description

@short: Returns the dependency link object by the specified id

@signature: getLink: (id: string | number) =\> Link

### Parameters

- `id` - (required) *string | number* -    the link id

### Returns
- `link` - (Link) - the link object

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});
gantt.getLink(1);// -> {id:1, source:1, target:2, type:1}
~~~

### Details

For information about how to get all links connected to a specific task, see the [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task) article.
