---
title: "What's new in PDF Export Module"
sidebar_label: "What's new in PDF Export Module"
---

What's new in PDF Export Module
================================

## 0.7.4

- Fixed background color in the multipage PDF headers and footers
- Fixed PDF and PNG export on old Scheduler versions (4.2-5.1)
- Fixed Scheduler PDF export with watermark

## 0.7.3

- Updated templates for Gantt 9.1

## 0.7.2

- Removed external Google fonts dependency for Gantt 9.0
- Improved PNG export when using the `slice_archive` config
- Improved support for special characters in the filename on Windows
- Improved PDF/PNG export timeout message
- Fixed PDF export with the landscape mode with the `merge_pages` config
- Fixed errors when using HTML in the header and footer parameters in the multipage export
- Fixed PDF and PNG export on Windows when the export module path has spaces
- Fixed the header and footer content zooming in the multipage export
- Fixed the `slice_checker` option when using a custom name in the PNG export
- Fixed PNG export hanging in some scenarios
- Fixed PDF/PNG export cancelling when receiving multiple export requests within the same millisecond on Windows

## 0.7.1

- Excel export: Added support for split tasks in the rendered timeline representation (`visual: true`)
- Excel export: Fixed task rendering when `end_date` is earlier than `start_date` in the rendered timeline representation
- Excel export: Not showing dates of unscheduled tasks

## 0.7.0
  
- Updated Electron version to 29
- Added custom margin support for PDF export
- Added support for footer and header on each page (including a way to specify the page number)
- Added support for A0, A1, A2, and Ledger formats
- Updated templates for Gantt and Scheduler
- The `background-clip: text` and other style rules should work since it is supported by Chrome 122
- Fixed PDF export with complex custom layout
- Fixed partial content export when using the resource panel
- Fixed empty pages in PDF when adding h1, h2 and similar tags in the `header`
- Fixed export hang when using custom data with the `raw: true` and `merge_pages: true` configs
- Fixed the Electron launch on Windows (EINVAL error)

## 0.6.7

- Updated templates for DHTMLX Gantt 9.0 raw export
- Fixes for the sticky scale cells for the `raw` export

## 0.6.6

- Ignore unscheduled tasks when using export to Excel with the 'visual' config
- Added templates for DHTMLX Gantt 9.0

## 0.6.5

- Fixes for DHTMLX Scheduler 7.0 template

## 0.6.4

- Added the multipage export in one PDF file (export the chart for the specified format by chunks, then merge the pages into one file)
- Added the feature to show the grid and timeline headers per page when using the multipage export in one file functionality

## 0.6.3

- Updated the base image for the node.js environment to Node.js 20 for the Docker images
- Optimized the Dockerfile and reduced the Docker image size

## 0.6.2

- Added template for DHTMLX Scheduler 7.0

## 0.6.0

- Changed the endpoint of MS Project / Primavera P6 export service
- Fixed for the Excel export: correct highlight of the timeline cells with the "visual:true" parameter
- Updated packages for building the docker file

## 0.5.9

- Updated the node.js version for the docker image
- Removed unused file in the docker image to fix the security warning
- Fixed the bug when the export doesn't work if we have the formatter in the grid columns

## 0.5.8

- Main page for the export module with the link to test the export module functionality (check the URL in the dropdown before testing it).
Example: [https://export.dhtmlx.com](https://export.dhtmlx.com)
- New feature: [import and export of Gantt for Node.js](guides/export-nodejs.md)
- Bug fix for the Excel export with the `visual:true` parameter. Now you can export data with several scales, 
different duration units, and tasks don't need to start and end at the beginning of the timeline cells

## 0.5.7

- Improved compatibility with Node.js 14
- Fixes for custom locales
- Added the "init" process for the docker.

## 0.5.6

- Fixed some memory leaks when running on headless servers (without the graphical interface) and in the docker

## 0.5.5

- Improved the work of the application inside the docker image

## 0.5.0

- Switched from PhantomJS to Electron for the PDF and PNG export
