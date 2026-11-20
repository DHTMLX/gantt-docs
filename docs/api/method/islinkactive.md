---
sidebar_label: isLinkActive
title: isLinkActive method
description: "Checks whether a dependency link is effectively active"
---

# isLinkActive

### Description

@short: Checks whether a dependency link is effectively active

@signature: isLinkActive: (link: Link | string | number) =\> boolean

### Parameters

- `link` - (required) *Link | string | number* - the link object or ID

### Returns

`true` if the link's `active` flag is absent or `true` and both endpoint tasks are effectively
active. Returns `false` for an unknown link ID or a missing endpoint task.

### Example

~~~js
const active = gantt.isLinkActive(linkId);
~~~

### Related Guides

- [Inactive Tasks and Links](guides/inactive-tasks-links.md)

### Change log

- Added in v10.1
