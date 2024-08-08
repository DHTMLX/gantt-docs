dhtmlxGantt with Angular
==========================

You should be familiar with the basic concepts and patterns of Angular to use this documentation. If 
you are not, please refer to the [Angular documentation](https://angular.io/docs) for a getting-started tutorial.

DHTMLX Gantt is compatible with Angular. We have prepared code examples of how to use DHTMLX Gantt with Angular. 
To check online samples, please refer to the corresponding [Example on Replit](https://replit.com/@dhtmlx/dhtmlx-gantt-with-angular). 

You can also [check the demo on GitHub](https://github.com/DHTMLX/angular-gantt-demo).

## Creating a project

Before you start to create a new project, install [Angular CLI](https://angular.io/cli) and [Node.js](https://nodejs.org/en/).

~~~
ng new my-angular-gantt-app
~~~

The above command will install all the necessary tools and dependencies, so you don't need any additional commands. 

### Installation of dependencies

After that go to the app directory by running:

~~~
cd my-angular-gantt-app
~~~

Then run the app with one of the following commands:

~~~
yarn start
~~~
or

~~~
npm start
~~~

Now the app should be running on [http://localhost:4200](http://localhost:4200).

![Gantt Angular app running](howtostart_frontend_frameworks/gantt_angular_app_run.png)

## Creating Gantt

Now we should get the DHTMLX Gantt code. Firstly, we need to stop the app by pressing **Ctrl+C** in the command line. Then we can proceed with installing the Gantt package.

## Step 1. Package installation

The PRO versions of the library are available for the **npm/yarn** install from our private repository, please follow 
[this instruction](desktop/install_with_bower.md#npmevaluationandproversions) to gain access to it.

After you've got the Evaluation version of the Gantt, you can install it with the following commands:

- for npm:

~~~
npm install @dhx/trial-gantt
~~~

- for yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Alternatively, since the zip-package of the library is structured as an **npm** module, you can 
[install it from a local folder](desktop/install_with_bower.md#installfromlocalfolder).

## Step 2. Component creation

Now we should create a component to add a Gantt into the application. Let's create the ***gantt*** folder in
the ***src/app/*** directory, add two new files into it and call them ***gantt.component.ts*** and ***gantt.component.css***.

### Importing source files

Open the ***gantt.component.ts*** file and import Gantt source files. Note that:

- if you've installed the Gantt package from a local folder, your import paths will look like this:

{{snippet gantt.component.ts}}
~~~
import { Gantt } from 'dhtmlx-gantt';
~~~

{{snippet gantt.component.css}}
~~~
@import "@dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- if you've chosen to install the trial version, the import paths should be as in:

{{snippet gantt.component.ts}}
~~~
import { Gantt } from '@dhx/trial-gantt';
~~~

{{snippet gantt.component.css}}
~~~
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

In this tutorial we will use the **trial** version of Gantt.

The newly created ***gantt.component.ts*** file inside the ***gantt*** folder will contain the template for the Gantt.
Let's add the following lines of code into it:

{{snippet gantt.component.ts}}
~~~ 
import { Component, ElementRef, OnInit, 
	ViewChild, ViewEncapsulation } from '@angular/core';
import { Gantt, GanttStatic } from "@dhx/trial-gantt";

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'gantt',
	styleUrls: ['./gantt.component.css'],
	template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit {
	@ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
	private _gantt?: GanttStatic;

	ngOnInit() {
		let gantt = Gantt.getGanttInstance();
		gantt.init(this.ganttContainer.nativeElement);

		this._gantt = gantt;
	}
	ngOnDestroy() {
		if (this._gantt) this._gantt.destructor();
	}
}
~~~

In the above code we've used the **ngOnInit()** method of Angular and also specified the **ngOnDestroy()**
method that contains the **gantt.destructor()** call to clear the component when it is no longer needed.

We'll declare Gantt styles in a separate file named ***gantt.component.css***. The default styles can look like this:

{{snippet gantt.component.css}}
~~~
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
.gantt-chart {
	position: relative;
	width: 100%;
	height: 600px;
}
~~~  

## Step 3. Adding Gantt into the app

Now it's time to add the component into our app. Open ***src/app/app.component.ts*** and use Gantt 
Component instead of the default content by inserting the code below:

{{snippet src/app/app.component.ts}}
~~~
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DHTMLX Gantt with Angular';
}
~~~

Then create the ***app.module.ts*** file in the ***src/app/*** directory and insert the *GanttComponent* as provided below: 

{{snippet src/app/app.module.ts}}
~~~
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
 
import { AppComponent } from "./app.component";
import { GanttComponent } from './gantt/gantt.component';
 
@NgModule({
  declarations: [AppComponent, GanttComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
~~~

Open the ***src/app/app.component.html*** file and add the following code instead of the default content:

{{snippet src/app/app.component.html}}
~~~
<gantt></gantt>
~~~

The last step is to open the ***src/main.ts*** file and replace the existing code with the following one:

{{snippet src/main.ts}}
~~~
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
~~~

After that, when we start the app, we should see an empty Gantt on a page: 

![Gantt Angular init](howtostart_frontend_frameworks/gantt_init.png)

## Step 4. Providing Data

To add data loading to the Angular Gantt, you need to add task and link services. But before that, let's define the task and link models.

For creating the task and link models, run the following commands:

~~~
ng generate class models/task --skip-tests
ng generate class models/link --skip-tests
~~~

In the newly created ***task.ts*** file, inside the ***models*** folder, we will add the following lines of code:

{{snippet models/task.ts}}
~~~
export class Task {
    id!: number;
    start_date!: string;
    text!: string;
    progress!: number;
    duration!: number;
    parent!: number;
}
~~~

In the newly created ***link.ts*** file inside the ***models*** folder, we will add the following lines of code:

{{snippet models/link.ts}}
~~~
export class Link {
     id!: number;
    source!: number;
    target!: number;
    type!: string;
}
~~~

Now let's create task and link services. A service is a class that will be responsible for creating a specific task or link.
Services in Angular can be injected by using the Dependency Injection mechanism. They can include data, functions, or some features necessary for the application.
You need to create a data service that will be used to provide the Gantt with tasks and links.

For creating task and link services, run the following commands:

~~~
ng generate service services/task --flat --skip-tests
ng generate service services/link --flat --skip-tests
~~~

Add the following lines of code in the newly created ***task.service.ts*** file inside the ***services*** folder:

{{snippet services/task.service.ts}}
~~~
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable()
export class TaskService {
    get(): Promise<Task[]>{
        return Promise.resolve([
            { id: 1, text: 'Task #1', start_date: '2023-04-15 00:00', 
            	duration: 3, progress: 0.6, parent: 0 },
            { id: 2, text: 'Task #2', start_date: '2023-04-18 00:00', 
            	duration: 3, progress: 0.4, parent: 0 }
        ]);
    }
}
~~~

and add the lines below into the ***link.service.ts*** file in the ***services*** folder:

{{snippet services/link.service.ts}}
~~~
import { Injectable } from '@angular/core';
import { Link } from '../models/link';

@Injectable()
export class LinkService {
    get(): Promise<Link[]> {
        return Promise.resolve([
            { id: 1, source: 1, target: 2, type: '0' }
        ]);
    }
}
~~~

We've added the **@Injectable()** decorator to our service. It marks a class as available for an injector to instantiate. We'll inject it into our component further.

Currently, the **get()** method returns a resolved promise with hard coded data. However, you can load data from the server side and also return a promise.
The Gantt component is supposed to use **TaskService** to get the tasks and **LinkService** to get the links. 
To enable this, let's add our services to the component. First, import the necessary modules in ***gantt.component.ts***:

{{snippet gantt.component.ts}}
~~~
import {TaskService} from "../services/task.service";
import {LinkService} from "../services/link.service";
~~~

You should also specify **TaskService** and **LinkService** as providers in the **@Component** decorator:

{{snippet gantt.component.ts}}
~~~
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
~~~

Now, every time a new *GanttComponent* is initialized, a fresh instance of the services will be created. 
The service should be prepared to be injected into the component. For this purpose, add the following constructor to the **GanttComponent** class:

{{snippet gantt.component.ts}}
~~~
constructor(private taskService: TaskService, private linkService: LinkService) { }
~~~

Modify the **ngOnInit()** function in the following way:

- it should set the data format for loading tasks (XML in this case)
- call the services to get the function and then wait for a response to put the data to the gantt 

{{snippet gantt.component.ts}}
~~~
let gantt = Gantt.getGanttInstance();
gantt.config.date_format = '%Y-%m-%d %H:%i';
gantt.init(this.ganttContainer.nativeElement);

Promise.all([this.taskService.get(), this.linkService.get()])
    .then( ([data, links]) => {
        gantt.parse({ data, links });
    });
this._gantt = gantt;
~~~

The complete code of the ***gantt.components.ts*** file will look like this:

{{snippet gantt.component.ts}}
~~~
import { Component, ElementRef, OnInit, 
	ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LinkService } from '../services/link.service';
import { Gantt, GanttStatic } from "@dhx/trial-gantt";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit {
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
    private _gantt?: GanttStatic;
    constructor(private taskService: TaskService, private linkService: LinkService) { }

    ngOnInit() {
        let gantt = Gantt.getGanttInstance();
        gantt.config.date_format = '%Y-%m-%d %H:%i';
        gantt.init(this.ganttContainer.nativeElement);
        Promise.all([this.taskService.get(), this.linkService.get()])
            .then(([data, links]) => {
				gantt.parse({ data, links });
            });
        this._gantt = gantt;
    }
    ngOnDestroy() {
        if (this._gantt) this._gantt.destructor();
    }
}
~~~

Now, if you reopen the app page, you should see Gantt with tasks:

![Gantt Angular events](howtostart_frontend_frameworks/gantt_angular_tasks.png)

## Step 5. Saving Data

To capture changes made in the Gantt, you can use a [dataProcessor](https://docs.dhtmlx.com/gantt/api__gantt_dataprocessor.html) handler that lets you 
"communicate" with the server-side backend. The handler can be declared either as a function or as a router object. 
dhtmlxGantt accepts a Promise response from the handler, so your Gantt will correctly process the completion of an action. 

You can create a **DataProcessor** via the **createDataProcessor()** API method and capture changes like this:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

If your service changes the task id after creating a new record (which it usually does), make sure that your 
Promise returns an object with **{id: databaseId}** or **{tid: databaseId}** as a result, so that Gantt could 
apply the new database id to the record. Get [more information about the server side](desktop/server_side.md).

Well, Angular Gantt is ready, you are welcome to [check out the full demo on GitHub](https://github.com/DHTMLX/angular-gantt-demo).

## XSS, CSRF and SQL Injection Attacks

Pay attention that Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections or 
XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend.

Check the [Application Security](desktop/app_security.md) article to learn the most vulnerable points of the component and
the measures you can take to improve the safety of your application.

