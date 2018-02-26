Creating Multiple Charts on a Page
===================================================

{{pronote
This functionality is available in the Gantt PRO edition (Enterprise license) only. 
}}

Basically, dhtmlxGantt is a static object and the default instance of it continually exists on the page. You may access it via the global **gantt** object at any time. But you can also create a new gantt object if needed.

To create a new instance of dhtmlxGantt, use the following command:

~~~js
// beware, "Gantt" in the command goes with the capital letter
[instanceName] = Gantt.getGanttInstance();
~~~

And then configure  your new instance, initialize it and populate with data, as usual.

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

Integration with dhtmlxLayout
------------------------

A good way to place multiple Gantt charts on the page is using [dhtmlxLayout](http://docs.dhtmlx.com/doku.php?id=dhtmlxlayout:toc). It not only provides a beautiful frame, but also ensures correct interacting with other elements on the page and acting according to the page size changes. 

**To attach a dhtmlxGantt instance to a layout cell**, use the **attachGantt()**  method.
  
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

Destructor of Gantt and DataProcessor instances
------------------------------------

Starting from version 5.1, the dhtmlxGantt object has a api/gantt_destructor.md that can be used to dispose unnecessary instances of the Gantt.

The destructor of the gantt instance can be used as follows:

~~~js
var gantt = Gantt.getGanttInstance();
gantt.destructor();
~~~

The destructor will implement the following tasks:

- clear the data loaded into a gantt instance
- destroy the dataProcessor (if it is attached to the gantt) 
- detach the gantt from DOM
- detach all DOM events attached via the [gantt.event()](api/gantt_event.md) method

Note, that the destructor won't destroy the data stores created by the [gantt.createDatastore()](api/gantt_createdatastore.md) method. 
You have to destroy them manually, like this:

~~~js
// creating a datastore
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});

// destroying the datastore later
resourcesStore.destructor();
~~~

###Using destructor with Angular

Here is an example of using the destructor to dispose a gantt instance while using the Angular framework:

~~~js
@Component({selector: 'app-gantt', template: `...`})
class MyGanttComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Gantt.getInstance();

     // configure and init
  }
  
  ngOnDestroy() {
     this.$gantt.destructor();
     this.$gantt = null;
  }
}
~~~

###Detaching the dataProcessor

Calling the destructor of data processor will clear the dataprocessor instance and detach it from the gantt. For example:

~~~js
var gantt = Gantt.getGanttInstance();
var dp = new gantt.dataProcessor("url");
dp.init(gantt);

// destroys data processor and detaches it from the gantt
dp.destructor();
~~~

{{note 
If you use a package that does not allow creating multiple instances of the gantt object (GPL or Commercial editions), calling the gantt destructor will make the gantt inaccessible until page reload.
}}


@edition: pro
