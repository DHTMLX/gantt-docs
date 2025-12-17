---
sidebar_label: getConnectedGroup
title: getConnectedGroup method
description: "returns all tasks and links that a task is connected with"
---

# getConnectedGroup

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Returns all tasks and links that a task is connected with

@signature: getConnectedGroup: (id?: string | number) =\> any

### Parameters
- `name` - (optional) *string | number* - the id of a task

### Returns
- ` connections` - (object) - an object with tasks and links a task is connected with

### Example

~~~jsx
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~

### Details

Without parameters, the method returns all groups of tasks and links that make connections.

:::note
 The method requires the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin to be included on the page. 
:::

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)
