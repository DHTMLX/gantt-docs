sort
=============

@short:sorts tasks in the grid
	

@params:
- field		string,function		the name of the column that the  grid will be sorted by or a custom sorting function
* desc		boolean	 			specifies the sorting direction: <i>true</i> - descending sort and <i>false</i> - ascending<br> sort. By default, <i>false</i>
* parent	string,number		the id of the parent task. Specify the parameter if you want to sort tasks only in the branch of the specified parent.
* silent	boolean	 			specifies whether rendering should be invoked after reordering items



@example:
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

@related:
	desktop/sorting.md
@relatedapi:
	api/gantt_sort_config.md
    api/gantt_onaftersort_event.md
@relatedsample:
	07_grid/05_sort_api.html

@template:	api_method
@descr:

