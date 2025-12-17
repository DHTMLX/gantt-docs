---
sidebar_label: onTaskRowClick
title: onTaskRowClick event
description: "fires when the user clicks on a row in the table"
---

# onTaskRowClick

### Description

@short: Fires when the user clicks on a row in the table

@signature: onTaskRowClick: (id: string | number, row: HTMLElement) =\> void;

### Parameters

- `id` - (required) *string | number* - the task id
- `row` - (required) *HTMLElement* - an HTML element of the clicked row

### Example

~~~jsx
gantt.attachEvent("onTaskRowClick", function(id,row){
    //any custom logic here
});
~~~
