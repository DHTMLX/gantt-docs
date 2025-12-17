---
title: "dhtmlxGantt with Svelte"
sidebar_label: "Svelte"
---

dhtmlxGantt with Svelte
========================

You should be familiar with the basic concepts and patterns of Svelte to use this documentation. If 
you are not, please refer to the [Svelte documentation](https://svelte.dev/) for a getting-started tutorial.

DHTMLX Gantt is compatible with Svelte. You can check the corresponding example on GitHub: [DHTMLX Gantt with Svelte Demo](https://github.com/DHTMLX/svelte-gantt-demo).

## Creating a project

Before you start to create a new project, install [Vite](https://vite.dev/) (optional) and [Node.js](https://nodejs.org/en/).

To create a Svelte project, we will use Svelte with Vite and run the following command:

~~~
npm create vite@latest
~~~

Check the details in the [related article](https://svelte.dev/docs/svelte/overview).

### Installation of dependencies

Next you should go to the app directory. Let's name our project **gantt-svelte** and choose the **svelte** option, then run:

~~~
cd gantt-svelte
~~~

After that you should install dependencies and run the app. For this, you need to make use of a package manager:

- if you use **yarn**, you need to call the following commands:

~~~
yarn install
yarn dev
~~~

- if you use **npm**, you need to call the following commands:

~~~
npm install
npm run dev
~~~

You should now have your Svelte project running on **http://localhost:5173**.

![Gantt Svelte app running](/img/gantt_svelte_app_run.png)

## Creating Gantt

Now we should get the DHTMLX Gantt code. Firstly, we need to stop the app by pressing **Ctrl+C** in the command line. 
Then we can proceed with installing the Gantt package.

## Step 1. Package installation

The PRO versions of the library are available for the **npm/yarn** install from our private repository, please follow 
[this instruction](guides/installation.md#npmevaluationandproversions) to gain access to it.

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
[install it from a local folder](guides/installation.md#installfromlocalfolder).

## Step 2. Component creation

Now we should create a Svelte component, to add a Gantt into the application. Let's create a new file in the ***src/*** directory and name it ***Gantt.svelte***.

### Importing source files

Open the newly created ***Gantt.svelte*** file and import Gantt source files. Note that:

- if you've installed the Gantt package from a local folder, your import paths will look like this:


~~~js title="Gantt.svelte"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- if you've chosen to install the trial version, the import paths should be as in:

~~~js title="Gantt.svelte"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

In this tutorial we will use the **trial** version of Gantt.

### Setting the container and adding Gantt

To display Gantt on the page, we need to set the container to render the component inside. Check the code below:

~~~html title="Gantt.svelte"
<script>
    import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
    import { onMount } from "svelte";
    import { Gantt } from "@dhx/trial-gantt";
      
    let container;
    onMount(() => {
        let gantt = Gantt.getGanttInstance();
        gantt.init(container);

        return () => {
            gantt.destructor();
        };
    });
</script>

<div bind:this="{container}" style="width: 100%; height: 100%;"></div>
~~~

To make the Gantt container occupy the entire space of the body, you need to remove the default 
styles from the ***app.css*** file located in the ***src/*** folder and add the following one:


~~~css title="src/app.css"
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## Step 3. Adding Gantt into the app

Now it's time to add the component into our app. Open ***src/App.svelte*** and use the Gantt component 
instead of the default content by inserting the code below:


~~~js title="src/App.svelte"
<script>
  import Gantt from "./Gantt.svelte";
</script>

<Gantt/>
~~~

After that, when we start the app, we should see an empty Gantt on a page:

![Gantt Svelte init](/img/gantt_init.png)

## Step 4. Providing Data

To add data into the Gantt, we need to provide a data set. Let's create the ***data.js*** file in the ***src/*** directory and add some data into it:


~~~js title="src/data.js"
export function getData() {
  const tasks = {
    data: [
      {
        id: "10",
        text: "Project #1",
        start_date: "01-04-2025",
        duration: 3,
        order: 10,
        progress: 0.4,
        open: true,
      },
      {
        id: "1",
        text: "Task #1",
        start_date: "01-04-2025",
        duration: 1,
        order: 10,
        progress: 0.6,
        parent: "10",
      },
      {
        id: "2",
        text: "Task #2",
        start_date: "02-04-2025",
        duration: 2,
        order: 20,
        progress: 0.6,
        parent: "10",
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
  };
  return tasks;
}
~~~

We should [pass props (our data)](https://svelte.dev/tutorial/svelte/declaring-props) to the Gantt component in the **App.svelte** file:


~~~html title="App.svelte"
<script>
  import Gantt from "./Gantt.svelte";
  import { getData } from "./data.js";
</script>

<Gantt tasks="{getData()}" />
~~~

And use the props in the **gantt.parse()** method in the Gantt component:

~~~html title="Gantt.svelte"
<script>
    import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
    import { onMount } from "svelte";
    import { Gantt } from "@dhx/trial-gantt";
    
    export let tasks;
    
    let container;
    onMount(() => {
        let gantt = Gantt.getGanttInstance();
        gantt.init(container);
        gantt.parse(tasks);

        return () => {
            gantt.destructor();
        };
    });
</script>

<div bind:this="{container}" style="width: 100%; height: 100%;"></div>
~~~

Now, if you reopen the app page, you should see a Gantt with tasks:

![Gantt tasks](/img/gantt_tasks.png)

## Step 5. Saving Data

To capture changes made in the Gantt, you can use a [dataProcessor](api/method/dataprocessor.md) handler that lets you 
"communicate" with the server-side backend. The handler can be declared either as a function or as a router object. 
dhtmlxGantt accepts a Promise response from the handler, so your Gantt will correctly process the completion of an action. 

You can create a **DataProcessor** via the **createDataProcessor()** API method and capture changes like this:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

If your service changes the task id after creating a new record (which it usually does), make sure that your 
Promise returns an object with **(id: databaseId)** or **(tid: databaseId)** as a result, so that Gantt could 
apply the new database id to the record. Get [more information about the server side](guides/server-side.md).

Well, Svelte Gantt is ready, you are welcome to [check out the full demo on GitHub](https://github.com/DHTMLX/svelte-gantt-demo).

## XSS, CSRF and SQL Injection Attacks

Pay attention that Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections or 
XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend.

Check the [Application Security](guides/app-security.md) article to learn the most vulnerable points of the component and
the measures you can take to improve the safety of your application.
