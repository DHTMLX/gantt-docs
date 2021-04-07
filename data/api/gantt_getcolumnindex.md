getColumnIndex
=============

@short:
	returns the index of the column by its name

@params:
- name		string			the name of the column
* excludeHidden		boolean			skip indexes of hidden columns

@returns:
- index		number			the index of the column

@example:

var index = gantt.getColumnIndex("start_date"); // => 1

@template:	api_method
@descr:

If `excludeHidden` parameter is set `true`, the method won't count columns which are [hidden](desktop/specifying_columns.md#visibility) using `hide:true` option of the config:

~~~js
gantt.config.columns = [
    {name: "text", label: "Task name", width: "*", tree: true, resize: true },
    {name: "start_date", label: "Start time" },
    {name: "duration", label: "Duration", width: 60, hide:true  }, /*!*/
    {name: "planned_start", label: "Planned start", hide:true  },  /*!*/
    {name: "planned_end", label: "Planned end", width:80, hide:true  }, /*!*/
    {name: "add", label: "", width: 36 }
];
 
gantt.init("gantt_here");

gantt.getColumnIndex("add"); // => 5 /*!*/
gantt.getColumnIndex("add", true); // => 2 /*!*/
~~~