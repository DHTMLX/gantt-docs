Initialization
==================

When you develop an application with dhtmlxGantt, the first thing you need is to initialize or, simply speaking, to display the Gantt chart on the page.

To display a basic Gantt on the page, follow 3 steps: 

1. Include the [dhtmlxGantt code files](#howtoaddganttsourcefilesintotheproject) on the page.
2. Create a DIV container on the page.
3. Initialize dhtmlxGantt in the newly created container with the api/gantt_init.md method. As a parameter the method takes an HTML container (or its id)  that the Gantt chart will be  displayed in.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
    <div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript"> 
        gantt.init("gantt_here");   /*!*/                        
    </script>
</body>
</html>
~~~

![desktop/init_gantt_front.png](desktop/init_gantt_front.png)

{{sample
	01_initialization/01_basic_init.html
}}
 
 
How to add Gantt source files into a project
------------------------------------------------------------

You can add Gantt code file into your project in several ways, depending on the type of an application you create:

- [Include files via the &#60;script&#62; tag](#scripttag)
- [Import files into ES6/7 and TypeScript apps](#moduleimport)
- [Include files into a RequireJS-based app](#requirejsimport)


Include files via the &#60;script&#62; tag
--------------------------------------------

The dhtmlxGantt requires including 2 code files on the page:

- **dhtmlxgantt.js**
- **dhtmlxgantt.css**

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<link href="codebase/dhtmlxgantt.css" rel="stylesheet">
~~~

Let's quickly explore the structure of the dhtmlxGantt package to find out where to look for the files. 

Main folders and files that make up the dhtmlxGantt package are:

- <b>sources</b> - the source code files of the library. The files are not minified and easy-to-read. The package is mostly intended to be used for components' debugging.
- <b>samples</b> - the code samples.
- <b>docs</b> - the full documentation of the component.
- <b>codebase</b> - the packed code files of the library. These files have much smaller size and intended to be used in production. <b>In your apps you need to use files from this folder.</b>

Import files into ES6/7 and TypeScript apps
---------------------------------------------

Use the following command to import files:

~~~js
import { gantt } from 'dhtmlx-gantt';
~~~

For the Enterprise version the command look like this:

~~~js
import { gantt, Gantt } from 'dhtmlx-gantt';
~~~

React example
------------------

An example of importing dhtmlxGantt files into a React-based app:

~~~js
import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
 
export default class Gantt extends Component {
  componentDidUpdate() {
    gantt.render();
  }
  componentDidMount() {
    gantt.init(this.ganttContainer);
    gantt.parse(this.props.tasks);
  }
 
  render() {
    return (
      <div
        ref={(input) => { this.ganttContainer = input }}
        style={{ width: '100%', height: '100%' }}
      ></div>
    );
  }
}
~~~

Angular example
-----------------

An example of importing dhtmlxGantt files into an Angular-based app:

~~~js
import {Component,ElementRef,OnInit,ViewChild,ViewEncapsulation} from '@angular/core';
import {TaskService} from '../services/task.service';
import {LinkService} from '../services/link.service';
import {Task} from '../models/task';
import {Link} from '../models/link';
 
 
import { gantt, Gantt } from 'dhtmlx-gantt';
 
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit {
    @ViewChild('gantt_here') ganttContainer: ElementRef;
 
    constructor(private taskService: TaskService, private linkService: LinkService) { }
 
    ngOnInit() {
        gantt.config.xml_date = '%Y-%m-%d %H:%i';
        gantt.init(this.ganttContainer.nativeElement);
        Promise.all([this.taskService.get(), this.linkService.get()])
            .then(([data, links]) => {
                gantt.parse({ data, links });
            });
    }
}
~~~

Include files into a RequireJS-based app
------------------------------------------- 

To include dhtmlxGantt files into a RequireJS-based app, you need to follow the logic shown in the example below:

~~~js
requirejs(["codebase/dhtmlxgantt"], function(dhx){
  var gantt = dhx.gantt;
  var Gantt = dhx.Gantt;// for Enterprise builds
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018", 
      	duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
      	duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
      	duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

The dhtmlxGantt library will return an object with fields `gantt` and `Gantt` (in Enterprise versions) - the *gantt* and *Gantt* objects described [here](desktop/multiple_gantts.md).

{{note  When using Gantt with extensions in RequireJS, you should specify the `shim` config for RequireJS and directly set the dependency of extensions from Gantt in it.}}

The example below demonstrates how dependencies for *dhtmlxgantt_tooltip.js* and *dhtmlxgantt_critical_path.js* extensions are set in the correct way:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "ext/dhtmlxgantt_critical_path": "../../codebase/ext/dhtmlxgantt_critical_path",
  },
  shim: {
    "ext/dhtmlxgantt_tooltip": ["dhtmlxgantt"],
    "ext/dhtmlxgantt_critical_path": ["dhtmlxgantt"],
  }
});
 
requirejs(["dhtmlxgantt", "ext/dhtmlxgantt_tooltip", "ext/dhtmlxgantt_critical_path"], 
function (dhx) {
  var gantt = dhx.gantt;
 
  var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
  var today = new Date(2018, 3, 5);
  gantt.addMarker({
    start_date: today,
    css: "today",
    text: "Today",
    title: "Today: " + date_to_str(today)
  });
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018",
      	duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
      	duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
      	duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

Check that the module name for any file inside the package is specified as *a relative path inside the 'codebase' folder of the package* plus *the filename*, for instance:

**core library:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"

**extensions:**

- "ext/dhtmlxgantt_critical_path": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_critical_path"
- "ext/dhtmlxgantt_tooltip": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_tooltip"

**locales:**

- "locale/locale_de": "./vendor/dhtmlxgantt/locale/locale_de"
- "locale/locale_be": "./vendor/dhtmlxgantt/locale/locale_be"

Full screen mode
---------------------------------

To correctly display a Gantt chart in the full-screen mode in different browsers, define the following style on the page:

~~~html
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~


