---
sidebar_label: onGridHeaderClick
title: onGridHeaderClick event
description: "fires when the user clicks on the grid's header"
---

# onGridHeaderClick

### Description

@short: Fires when the user clicks on the grid's header

@signature: onGridHeaderClick: (name: string, e: Event) =\> boolean;

### Parameters

- `name` - (required) *string* - the name attribute of the column which header the user clicks on
- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onGridHeaderClick", function(name, e){
    //any custom logic here
    return true;
});
~~~

### Details

Returning false will cancel the default handler (adding a new task on the "plus" button click or sorting a column)
