---
sidebar_label: onAfterSort
title: onAfterSort event
description: "fires after tasks are sorted in the grid"
---

# onAfterSort

### Description

@short: Fires after tasks are sorted in the grid

@signature: onAfterSort: (field: string | GanttCallback, desc?: boolean, parent?: string | number) =\> void;

### Parameters

- `field` - (required) *string | function* - the name of the column that the grid was sorted by or a custom sorting function
- `desc`	- (optional)	*boolean*	 	-		optional, the sorting direction: <i>true</i> - descending, <i>false</i> - ascending<br/>
- `parent`	- (optional) *string | number*	-	optional, the id of the parent task, if the tasks were sorted only in the branch of the specified parent

### Example

~~~jsx
gantt.attachEvent("onAfterSort",function(field, direction, parent){
    // your code here
});
~~~

### Related API
- [sort](api/method/sort.md)
- [sort](api/config/sort.md)

