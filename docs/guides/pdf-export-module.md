---
title: "Export Module for PDF"
sidebar_label: "Export Module for PDF"
---

Export Module for PDF
=======================

This export module can export data to PDF, PNG, Excel, and iCal files. It can be installed on any platform as a Node.js application or as a Docker image.

It doesn't include the import/export functionality for the MS Project and Primavera files. If you need such a functionality, you should use 
the [corresponding export module](guides/msp-export-module.md) or our online server.


## Installation guide

First, you need to download and install Node.js. You can find the installation instructions [on their website](https://nodejs.org/en/).

You can download the export module in the Client's Area on the Downloads tab. Check the image below:

![PDF export module download](/img/pdf_export_module_download.png)

After downloading that file, unpack it somewhere, then open the command line and navigate to the folder with the export module. For example:

~~~
cd C:export_module
~~~

Then you need to install the modules for the application:

~~~
npm install
~~~

You can [install the components to the computer without graphical interface](#using-server-without-graphical-interface).

To run on a server with a graphical interface, you can use the following command to start the export module:

~~~
npm start
~~~

To test how it works, you can open the following URL: **http://localhost:3200/test**.

Or open the main page and click the Test link: **http://localhost:3200**.

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

* Failed to get crash dump id

* Electron crashed!

most likely, it means that the export module is working on a headless server. You will need to 
[install the necessary components to use PDF and PNG export](#using-server-without-graphical-interface). Or you can build a Docker image.

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
