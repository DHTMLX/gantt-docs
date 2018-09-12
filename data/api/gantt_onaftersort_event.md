onAfterSort
=============

@todo:
	check 

@short:
	fires after tasks are sorted in the grid

@params:
- field		string,function		the name of the column that the grid was sorted by or a custom sorting function
* desc		boolean	 			the sorting direction: <i>true</i> - descending, <i>false</i> - ascending<br>
* parent	string,number		the id of the parent task, if the tasks were sorted only in the branch of the specified parent

@example:
gantt.attachEvent("onAfterSort",function("text",false){
    // your code here
});

@template:	api_event
@descr:

@relatedapi:
api/gantt_sort.md
api/gantt_sort_config.md
