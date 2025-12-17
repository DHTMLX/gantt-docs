---
sidebar_label: process_resource_assignments
title: process_resource_assignments config
description: "enables/disables parsing of the resource assignments"
---

# process_resource_assignments

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Enables/disables parsing of the resource assignments

@signature: process_resource_assignments: boolean

### Example

~~~jsx
gantt.config.process_resource_assignments = false;
~~~

**Default value:** true

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

When you [assign resources to the specific time of a task](guides/resource-management.md#resourceassignmenttime), the functionality requires the **process_resource_assignments** property to be enabled.
This is related to the fact, that the property provides parsing of the values from [gantt.config.resource_property](api/config/resource_property.md) of tasks into the internal resource assignment objects. 

As a result, you are be able to manipulate the resource assignments via the DataStore object, for instance to get the necessary assignment object or update it.


But if you only need to assign resources to the tasks without specifying time or duration of the assignment, you can disable parsing of the assignments using the config:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- added in v7.1

