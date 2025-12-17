---
sidebar_label: sort
title: sort method
description: "sorts tasks in the grid"
---

# sort

### Description

@short: Sorts tasks in the grid

@signature: sort: (field: string | ((task1: Task, task2: Task) => 1 | 0 | -1), desc?: boolean, parent?: string | number, silent?: boolean) =\> void;

### Parameters

- `field`	- (required) *string | SortTasks*	-	the name of the column that the  grid will be sorted by or a custom sorting function
- `desc`	-	(optional) *boolean* -	specifies the sorting direction: <i>true</i> - descending sort and <i>false</i> - ascending<br/> sort. By default, <i>false</i>
- `parent` -	(optional) *string | number*	-	the id of the parent task. Specify the parameter if you want to sort tasks only in the branch of the specified parent.
- `silent` -	(optional) *boolean*	-	specifies whether rendering should be invoked after reordering items

### Example

~~~jsx
<input type='button'  value='Sort by task name' onclick='sortByName()'>
<script>
    var n_direction = false;
    function sortByName(){
        if (n_direction){
            gantt.sort("text",false);
        } else {
            gantt.sort("text",true);
        }
        n_direction = !n_direction;
    };
    gantt.init("gantt_here");
</script>
~~~

### Related samples
- [Using sorting methods](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)

### Details

The custom sorting function takes the **Task** objects as arguments and should return the number (1,0, or -1)

The **parent** parameter is ignored when applying a custom function for sorting. [Check the example](https://snippet.dhtmlx.com/d8li6kq2).

When the **sort()** method is used, Gantt doesn't add any sorting icon (an arrow displaying the sorting direction). In case you need to render a sorting icon, you can add it
manually. [Check the example](https://snippet.dhtmlx.com/5bjavofk).

### Related API
- [sort](api/config/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [Sorting Columns](guides/sorting.md)

