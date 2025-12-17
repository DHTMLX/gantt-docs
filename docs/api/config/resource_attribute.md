---
sidebar_label: resource_attribute
title: resource_attribute config
description: "changes the name of the attribute that Gantt uses to find which resource the task row in the resource grid/timeline is referring to"
---

# resource_attribute
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Changes the name of the attribute that Gantt uses to find which resource the task row in the resource grid/timeline is referring to

@signature: resource_attribute: string

### Example

~~~jsx
gantt.config.resource_attribute = "data-resource-id";
~~~

**Default value:** data-resource-id

### Details

![resource_attribute](/img/resource_attribute.png)

:::note
Each resource element has the *data-resource-id* attribute that is used to find which a resource the DOM element is attached to. 
:::

:::note
sample: [Resourse_attribute ](https://snippet.dhtmlx.com/5/66401acf0)
:::
