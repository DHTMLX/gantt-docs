Creating Multiple Charts on the Page
===================================================

{{note
This functionality included only in Gantt PRO ( Enterprise license ) 
}}

Basically, dhtmlxGantt is a static object and the default instance of it continually exists on the page -  at any time  you may access the global **gantt** object. But you can also create new gantt object if needed.


To create a new instance of dhtmlxGantt, use the following command:

~~~js
//Beware, "Gantt" in the command goes with the capital letter
[instanceName] = Gantt.getGanttInstance();

~~~


And then configure, initialize and populate with data your new instance, as usual.

Let's take a simple example: 2 Gantt charts, one under another: 


~~~js
function init() {
    gantt1 = Gantt.getGanttInstance();
	gantt1.init("gantt_here");
	gantt1.parse(tasksA);
	
	gantt2 = Gantt.getGanttInstance();
	gantt2.init("gantt_here_2");
	gantt2.parse(tasksB);	
}

~~~



~~~js
<body onload="init();">
	<div id="gantt_here" class="dhx_cal_container" ...>
		...
	</div>
	<br>
	<div id="gantt_here_2" class="dhx_cal_container" ...>
		...
	</div>	
</body>

~~~


##Integration with dhtmlxLayout
A good way to place multiple Gantt charts on the page is using [dhtmlxLayout](http://docs.dhtmlx.com/doku.php?id=dhtmlxlayout:toc). It not only provides a beautiful frame, but also ensures correct interacting with other elements on the page and 
acting according to the page size changes. 

**To attach a dhtmlxGantt instance to a layout cell**, use method **attachGantt()**.
  
  
**Note**, attaching dhtmlxGantt to a cell automatically initializes it. So, configure dhtmlxGantt instance before placing it into the layout.



~~~js
function init() {
	var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

	gantt1 = Gantt.getGanttInstance();
	gantt1.config.min_column_width = 50;
	gantt1.config.scale_height = 90;
	dhxLayout.cells("a").attachGantt(null, null, gantt); /*!*/
	gantt1.parse(tasksA);
		
	gantt2 = Gantt.getGanttInstance();
	gantt2.config.date_grid = "%Y-%m-%d %H:%i";
	gantt2.config.xml_date = "%Y-%m-%d %H:%i:%s";
	dhxLayout.cells("b").attachGantt(null, null, gantt2);/*!*/
	gantt2.parse(tasksB);
}

~~~

@edition: pro
