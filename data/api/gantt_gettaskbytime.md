getTaskByTime
=============
@short: returns a collection of tasks which occur during the specified period
	

@params: 
* from	Date	 the start date of the period
* to	Date	 the end date of the period

@returns:
- array		Array &lt;Task&gt;	an array of tasks' objects





@example:
var tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (var i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// or
var tasks = gantt.getTaskByTime();//returns all tasks 


@template:	api_method
@descr:

