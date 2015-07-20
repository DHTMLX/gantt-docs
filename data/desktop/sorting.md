Sorting Columns
=================================
dhtmlxGantt allows you to sort data in the columns of the grid (on the client side). <br>
There are 2 ways you can provide sorting in the grid:

1. By a single click on the header of a column with the enabled api/gantt_sort_config.md attribute;
2. By api call ( can be called from some event or action, i.e button click or page load ) of the api/gantt_sort.md method.

Sorting by a click on the header
--------------------------------------------
Once the user clicks on the header, the Gantt chart starts to display 
a special control indicating which column the table is currently sorted by and the direction of this sorting (ascending or descending).
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

{{snippet
Sorting  on the button click
}}
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
To apply a custom sorting function to the grid, call the api/gantt_sort.md method with the name of your custom function as the first ( and only) parameter.

A custom sorting function is called for each pair of adjacent values and return 1,-1 or 0:

- **1** - an object with the first value in pair must go before the second one;
- **-1** - the second object goes before the first one;
- **0** - the order of both objects doesn't change.

{{snippet
Using a custom function to sort a Gantt chart
}}
~~~js
<input type='button'  value='Sort by the number of holders' onclick='sortByHolders(direction)'>

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

It's possible to specify a custom sorting rule for each particular column. There are three most common per column sorting scenarios:

- disabling sorting for a column by setting *sort* to false

~~~js
gantt.config.columns[1].sort = false;
~~~

- sorting a column according to the provided sorting functions by setting *sort* to a function

~~~js
gantt.config.columns[1].sort = function(a,b){
	return weird_computation(a,b);
};
~~~

- sorting a column according to the values of a different field of the task by
setting *sort* to that field 

~~~js
gantt.config.columns[1].sort = 'other_field';
~~~
