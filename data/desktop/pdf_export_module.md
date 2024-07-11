Export Module for PDF
=======================

In fact, there are 2 export modules with different functionalities:

1. The first export module can export data to PDF, PNG, Excel, and iCal files. It can be installed on any platform as a Node.js application or as a Docker image.

2. The second export module can only import/export MS Project and Primavera files. It is a .NET Core application that you can run inside the dotnet environment 
or inside the docker image.

## Installation guide

First, you need to download and install Node.js. You can find the installation instructions [on their website](https://nodejs.org/en/).

You can download the export module in the Client's Area on the Downloads tab. Check the image below:

![PDF export module download](desktop/pdf_export_module_download.png)

After downloading that file, unpack it somewhere, then open the command line and navigate to the folder with the export module. For example:

~~~
cd C:\export_module
~~~

Then you need to install the modules for the application:

~~~
npm install
~~~

You can [install the components to the computer without graphical interface](#usingserverwithoutgraphicalinterface).

To run on a server with a graphical interface, you can use the following command to start the export module:

~~~
npm start
~~~

To test how it works, you can open the following URL: [http://localhost:3200/test](http://localhost:3200/test).

Or open the main page and click the Test link: [http://localhost:3200](http://localhost:3200).

## Using server without graphical interface

If you plan to use the export module on a headless server, you need to install additional components. Here is the command for the Deb-based distros:

~~~
apt-get install -y xvfb libgtk2.0-0 libgtk-3-0 libgbm-dev 
libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth
~~~

Here is the command for the RPM-based distros:

~~~
yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel 
libnotify-devel GConf2 nss libXScrnSaver alsa-lib
~~~

Then you need to run it with another command:

~~~
npm run start:docker
~~~

or

~~~
xvfb-run node index.js
~~~

## Problem solving

### Old Node.js version

The export module is compatible with the node version 12.03 and newer. If you have an older version, you need to install the older version of Electron:

~~~
npm install electron@6.1
~~~

### Export to PDF never ends

If you use Windows with the custom DPI settings or fonts, there is a bug in the Electron component. To make it work, you need to install an earlier version:

~~~
npm install electron@6.1
~~~

### Export to PDF/PNG doesn't work on Mac M1

The Electron version that is currently used, doesn't have builds for the Darwin-ARM64 architecture. As a workaround, you can try installing Electron 11. 

~~~
npm install electron@11
~~~

The basic export functionality should work, but we didn't check whether all features work correctly with that version:

### Export to PDF doesn't work

There can be different reasons for that. You need to check the error messages.

If you get one of the following errors:

• Failed to get crash dump id

• Electron crashed!

most likely, it means that the export module is working on a headless server. You will need to 
[install the necessary components to use PDF and PNG export](#usingserverwithoutgraphicalinterface). Or you can build a Docker image.

### Using a Docker image

Build the Docker image with the following command:

~~~
docker build -t dhtmlx/scheduler-gantt-export ./
~~~

Run the Docker image using the command below:

~~~
docker run -d -p 3200:80 dhtmlx/scheduler-gantt-export
~~~

3200 is the port on which the docker service will work.

## Change log

### 0.6.3

• Updated the base image for the node.js environment to Node.js 20 for the Docker images

• Optimized the Dockerfile and reduced the Docker image size

### 0.6.2

• Added template for DHTMLX Scheduler 7.0

### 0.6.0

• Changed the endpoint of MS Project / Primavera P6 export service

• Fixed for the Excel export: correct highlight of the timeline cells with the "visual:true" parameter

• Updated packages for building the docker file

### 0.5.9

• Updated the node.js version for the docker image

• Removed unused file in the docker image to fix the security warning

• Fixed the bug when the export doesn't work if we have the formatter in the grid columns

### 0.5.8

• Main page for the export module with the link to test the export module functionality (check the URL in the dropdown before testing it).
Example: [https://export.dhtmlx.com](https://export.dhtmlx.com)

• New feature: [import and export of Gantt for Node.js](desktop/export_nodejs.md)

• Bug fix for the Excel export with the `visual:true` parameter. Now you can export data with several scales, 
different duration units, and tasks don't need to start and end at the beginning of the timeline cells


### 0.5.7

• Improved compatibility with Node.js 14

• Fixes for custom locales

• Added the "init" process for the docker.

### 0.5.6

• Fixed some memory leaks when running on headless servers (without the graphical interface) and in the docker

### 0.5.5

• Improved the work of the application inside the docker image

### 0.5.0

• Switched from PhantomJS to Electron for the PDF and PNG export