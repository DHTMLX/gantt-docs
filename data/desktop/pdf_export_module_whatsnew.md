What's new in PDF Export Module
================================

## 0.6.3

• Updated the base image for the node.js environment to Node.js 20 for the Docker images

• Optimized the Dockerfile and reduced the Docker image size

## 0.6.2

• Added template for DHTMLX Scheduler 7.0

## 0.6.0

• Changed the endpoint of MS Project / Primavera P6 export service

• Fixed for the Excel export: correct highlight of the timeline cells with the "visual:true" parameter

• Updated packages for building the docker file

## 0.5.9

• Updated the node.js version for the docker image

• Removed unused file in the docker image to fix the security warning

• Fixed the bug when the export doesn't work if we have the formatter in the grid columns

## 0.5.8

• Main page for the export module with the link to test the export module functionality (check the URL in the dropdown before testing it).
Example: [https://export.dhtmlx.com](https://export.dhtmlx.com)

• New feature: [import and export of Gantt for Node.js](desktop/export_nodejs.md)

• Bug fix for the Excel export with the `visual:true` parameter. Now you can export data with several scales, 
different duration units, and tasks don't need to start and end at the beginning of the timeline cells

## 0.5.7

• Improved compatibility with Node.js 14

• Fixes for custom locales

• Added the "init" process for the docker.

## 0.5.6

• Fixed some memory leaks when running on headless servers (without the graphical interface) and in the docker

## 0.5.5

• Improved the work of the application inside the docker image

## 0.5.0

• Switched from PhantomJS to Electron for the PDF and PNG export