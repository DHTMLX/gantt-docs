isChildOf
=============
@short:checks whether a task is a child of other task
	

@params:
- childId		string, number	the id of a task that you want to check as a child
- parentId 	string, number	the id of a task that you want to check as a parent


@returns:
- isChild	boolean		<i>true</i>, if the task is a child of the specified parent task. Otherwise, <i>false</i>
@example:
var tasks = {
    "data":[
        {"id":"10", "text":"Project #10", "start_date":"01-04-2019", "duration":3, "order":10,"progress":0.4, "open": true},
        {"id":"1", "text":"Task #1",    "start_date":"02-04-2019", "duration":2,  "order":10,"progress":0.6, "parent":"10"},
        {"id":"2", "text":"Task #2",    "start_date":"01-04-2019", "duration":2,  "order":20,"progress":0.6, "parent":"10"},
        {"id":"3", "text":"Task #3",    "start_date":"05-04-2019", "duration":2,  "order":20,"progress":0.6, "parent":"10"}
    ],
    "links":[]
} 

gantt.isChildOf(2,10); //-> true /*!*/
gantt.isChildOf(2,3); //-> false /*!*/

@template:	api_method
@descr:

