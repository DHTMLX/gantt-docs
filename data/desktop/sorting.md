Sorting Columns
=================================

dhtmlxGantt allows you to sort data in the columns of the grid (on the client side). <br>
There are 2 ways you can provide sorting in the grid:

1. By a single click on the header of a column with the enabled api/gantt_sort_config.md attribute;
2. By the API call (can be called from some event or action, i.e. a button click or a page load) of the api/gantt_sort.md method.

{{note Please note that Gantt can only sort tasks by values from data and doesn't sort values set by the template attribute of a column.}}

Sorting by a click on the header
--------------------------------------------

Once the user clicks on the header, the Gantt chart starts to display a special control indicating which column the table is currently sorted by and the direction of this sorting (ascending or descending).
Each next click on the same header will reverse the sorting direction.

<img src="desktop/gantt_sorting.png"/>

To enable sorting in the Gantt chart, set the api/gantt_sort_config.md property to *true*:

~~~js
gantt.config.sort = true; 
gantt.init("gantt_here");
~~~

{{sample
	07_grid/01_builtin_sorting.html
}}


Programmatic sorting
-----------------------

To sort the grid  on some action or event (i.e. button click or page load), call the api/gantt_sort.md method.

{{snippet  Sorting  on the button click}}
~~~html
<input type='button' value='Sort by task name' onclick='gantt.sort("text", true);'>

<script type="text/javascript" charset="utf-8">
	gantt.init("gantt_here"); 
	gantt.parse(tasks);
</script>
~~~

{{sample
	07_grid/05_sort_api.html
}}


Custom sorting functions
-------------------------------------------------

To apply a custom sorting function to the grid, call the api/gantt_sort.md method with the name of your custom function as the first (and only) parameter.

A custom sorting function is called for each pair of adjacent values and returns 1,-1 or 0:

- **1** - an object with the first value in pair must go before the second one;
- **-1** - the second object goes before the first one;
- **0** - the order of both objects doesn't change.

{{snippet
Using a custom function to sort a Gantt chart
}}
~~~html
<input type='button' value='Sort by the number of holders' 
	   onclick='sortByHolders(direction)'>

<script type="text/javascript" charset="utf-8">
    var direction = false;

    function sortByHolders(direction1){
        direction = !direction;
        gantt.sort(sortHolders);
    };
    function sortHolders(a,b){
         a = a.users.length;
         b = b.users.length;

         if (direction){
            return a>b?1:(a<b?-1:0);
         } else {
            return a>b?-1:(a<b?1:0);
         }
    };
</script>
~~~

{{sample 07_grid/04_custom_sorting.html }}

Per column Grid sorting
-----------------------

It's possible to specify a custom sorting rule for each particular column. There are three most common sorting scenarios per column:

1) disabling sorting for a column by setting *sort* to false

~~~js
gantt.config.columns[1].sort = false;
~~~

2) sorting a column according to the provided sorting functions by setting *sort* to a function

~~~js
gantt.config.columns[1].sort = function(a,b){
	return custom_function(a,b);
};
~~~

A custom sorting function is called for a pair of task objects (a and b) and returns 1,-1 or 0:


- **1** - an object with the first value in pair must go before the second one;
- **-1** - the second object goes before the first one;
- **0** - the order of both objects doesn't change.


3) sorting a column according to the values of a different field of the task by setting *sort* to that field 

~~~js
gantt.config.columns[1].sort = 'other_field';
~~~


Sorting by several fields
---------------------

You can sort the grid of the Gantt chart by several properties (fields) by using a custom sorting function. 
In the following example, data is sorted by the *duration* and *priority* fields:

~~~js
let sortDirection = -1
function customSort() {
    sortDirection *= -1;
    gantt.sort(function (task1, task2) {
        // sort by priority
        if (task1.duration == task2.duration) {
            return (task1.priority - task2.priority) * sortDirection
        }
        // sort by duration
        return (task1.duration - task2.duration) * sortDirection
    });
}
~~~

{{editor	https://snippet.dhtmlx.com/upu86azw		Sort by several properties (fields) with a custom sort function}}

- In case the duration of the tasks is the same, sorting by this field isn't applied, and the tasks are sorted by the *priority* field. 
- If the duration of the tasks is different, the grid will be sorted by the *duration* property.



