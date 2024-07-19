dhtmlxGantt with React
======================

You should be familiar with the basic concepts and patterns of [React](https://react.dev/) to use this documentation. If
you are not, please refer to the [React documentation](https://reactjs.org/docs/getting-started.html) for a getting-started tutorial.

DHTMLX Gantt is compatible with React. We have prepared code examples of how to use DHTMLX Gantt with React. 
To check online samples, please refer to the corresponding [Example on Replit](https://replit.com/@dhtmlx/dhtmlx-gantt-with-react). 

You can also [check the demo on GitHub](https://github.com/DHTMLX/react-gantt-demo). 

## Creating a project

Before you start to create a new project, install [Node.js](https://nodejs.org/en/).

You can create a basic React project using the following command:

~~~
npx create-vite my-react-gantt-app --template react
~~~

### Installation of dependencies

Next you should go to the app directory. Let's call our project **my-react-gantt-app** and run:

~~~
cd my-react-gantt-app
~~~

After that you should install dependencies and start the dev server. For this, you need to make use of a package manager:

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

You should now have your React project running on [http://localhost:5173](http://localhost:5173).

![Gantt React app running](howtostart_frontend_frameworks/gantt_react_app_run.png)

## Creating Gantt

Now we should get the DHTMLX Gantt code. Firstly, we need to stop the app by pressing **Ctrl+C** in 
the command line. Then we can proceed with installing the Gantt package.

## Step 1. Package installation

There are two options available: you can install the **Pro** package from a local folder, or install the **trial**
version using **npm** or **yarn**.

### Installing the package from a local folder

Copy the Gantt package into some local directory inside the project.
In the project directory run the command below replacing *gantt-local-package-path* with the actual path:

~~~
npm install ./gantt-local-package-path
// or
yarn add "./gantt-local-package-path"
~~~

For example:

~~~
npm install ./gantt_8.0.0_enterprise
// or
yarn add "./gantt_8.0.0_enterprise"
~~~

### Installing the trial version via a package manager

To install the trial version of the Gantt, you need to create a file with the *.npmrc* type and add the **&#64;dhx:registry=https://npm.dhtmlx.com/** string into it.

After that, you can install the trial version of Gantt using **npm** or **yarn** commands:

- for npm:

~~~
npm install @dhx/trial-gantt
~~~

- for yarn:

~~~
yarn add @dhx/trial-gantt
~~~

## Step 2. Component creation

Now we should create a React component, to add a Gantt into the application. Let's create the ***Gantt.jsx*** file in the ***src/*** directory.

### Importing source files

Open the newly created ***Gantt.jsx*** file and import Gantt source files. Note that:

- if you've installed the Gantt package from a local folder, your import paths will look like this:

{{snippet Gantt.jsx}}
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- if you've chosen to install the trial version, the import paths should be as in:

{{snippet Gantt.jsx}}
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

In this tutorial, we will use the **trial** version of Gantt.

### Setting the container and adding Gantt

To display Gantt on the page, we need to set the container to render the component inside. The ***Gantt.jsx*** file should contain the following code:

{{snippet Gantt.jsx}}
~~~
import { useEffect, useRef } from "react";
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView() {
  let container = useRef();

  useEffect(() => {
    let gantt = Gantt.getGanttInstance();
    gantt.init(container.current);

    return () => {
      gantt.destructor();
      container.current.innerHTML = "";
    };
  }, []);

  return <div ref={container} style={{ width: "100%", height: "100%" }}></div>;
}
~~~

## Step 3. Adding Gantt into the app

Now it's time to add the component into our app. Open ***src/app.jsx*** and use the Gantt component instead of the default content by inserting the code below:

{{snippet src/app.jsx}}
~~~
import Gantt from "./Gantt";

function App() {
  return <Gantt/>;
}

export default App;
~~~

To make the Gantt container occupy the entire space of the body, you need to remove the default 
styles from the ***index.css*** file located in the ***src/*** folder and add the following one:

{{snippet src/index.css}}
~~~
html,
body,
#root {
  height: 100%;
  padding: 0;
  margin: 0;
}
~~~

After that, when we start the app, we should see an empty Gantt on a page:

![Gantt React init](howtostart_frontend_frameworks/gantt_init.png)

## Step 4. Providing Data

To add data into the Gantt, we need to provide a data set. Let's create the ***data.js*** file in the ***src/*** directory and add some data into it:

{{snippet src/data.js}}
~~~
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

We should [pass props (our data)](https://react.dev/learn/passing-props-to-a-component) to a Gantt component in ***App.jsx***:

{{snippet App.jsx}}
~~~
import Gantt from "./Gantt";
import { getData } from "./data.js";

function App() {
  return <Gantt tasks={getData()} />;
}

export default App;
~~~

And use the props in the **gantt.parse()** method in the Gantt component:

{{snippet Gantt.jsx}}
~~~
import { useEffect, useRef } from "react";
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView(props) {
  let container = useRef();

  useEffect(() => {
    let gantt = Gantt.getGanttInstance();
    gantt.init(container.current);
    gantt.parse(props.tasks);

    return () => {
      gantt.destructor();
      container.current.innerHTML = "";
    };
  }, []);

  return <div ref={container} style={{ width: "100%", height: "100%" }}></div>;
}
~~~

Now, if you reopen the app page, you should see a Gantt with tasks:

![Gantt tasks](howtostart_frontend_frameworks/gantt_tasks.png)

## Step 5. Saving Data

To capture changes made in the Gantt, you can use a [dataProcessor](https://docs.dhtmlx.com/gantt/api__gantt_dataprocessor.html) handler that lets you 
"communicate" with the server-side backend. The handler can be declared either as a function or as a router object. 
Gantt accepts a Promise response from the handler, so Gantt will correctly process the completion of an action. 

You can create a **DataProcessor** via the **createDataProcessor()** API method and capture changes like this:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

If your service changes the task id after creating a new record (which it usually does), make sure that your 
Promise returns an object with **{id: databaseId}** or **{tid: databaseId}** as a result, so that Gantt could 
apply the new database id to the record. Get [more information about the server side](desktop/server_side.md).

Well, React Gantt is ready, you are welcome to [check out the full demo on GitHub](https://github.com/DHTMLX/react-gantt-demo).

## XSS, CSRF and SQL Injection Attacks

Pay attention that Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections or 
XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend.

Check the [Application Security](desktop/app_security.md) article to learn the most vulnerable points of the component and
the measures you can take to improve the safety of your application.