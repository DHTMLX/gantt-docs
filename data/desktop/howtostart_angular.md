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

There are two options available: you can install the **Pro** package from a local folder, or install the **trial** version using **npm** or **yarn**.

### Installing the package from a local folder

Copy the Gantt package into some local directory inside the project.
In the project directory run the command below replacing *gantt-local-package-path* with the actual path:

~~~
npm install ./gantt-local-package-path
//or
yarn add "./gantt-local-package-path"
~~~

For example:

~~~
npm install ./gantt_8.0.0_enterprise
//or
yarn add "./gantt_8.0.0_enterprise"
~~~

### Installing the trial version via a package manager

To install the trial version of the Gantt, you need to create a file with the *.npmrc* type and add the **&#64;dhx:registry=https://npm.dhtmlx.com/** string into it.

After that you can install the trial version of Gantt using **npm** or **yarn** commands:

- for npm:

~~~
npm install @dhx/trial-gantt
~~~

- for yarn:

~~~
yarn add @dhx/trial-gantt
~~~


![Gantt Angular init](howtostart_frontend_frameworks/gantt_init.png)

![Gantt Angular events](howtostart_frontend_frameworks/gantt_angular_events.png)

![Gantt events](howtostart_frontend_frameworks/gantt_events.png)
