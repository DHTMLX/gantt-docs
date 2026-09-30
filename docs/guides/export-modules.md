---
title: "Export Modules"
sidebar_label: "Export Modules"
---

# Export Modules

An export module is an export service that you install on your own server instead of using the online export service at `https://export.dhtmlx.com`. To send export and import requests to your module, set the `server` parameter of the export and import methods to the address of the module:

~~~js
gantt.exportToPDF({
    server: "https://myapp.com/myexport/gantt"
});
~~~

Use an export module when you need to export large charts, export without the limits of the online export service, or keep the project data in your own network. For the list of formats and methods, see [Exporting and Importing Data](guides/export-common.md).

## The two modules

| Module | Built with | Formats | Requirements | Installation | Version history |
|---|---|---|---|---|---|
| PDF/PNG/Excel module | Node.js, also available as a Docker image | PDF, PNG, Excel (export and import), iCal, JSON | [System requirements](guides/export-requirements.md#pdfpngexcel-service) | [Export Module for PDF, PNG, Excel, and iCal](guides/pdf-export-module.md) | [What's new](guides/pdf-export-module-whatsnew.md) |
| MS Project/P6 module | .NET (C#) | MS Project and Primavera P6 (export and import) | [System requirements](guides/export-requirements.md#import-and-export-from-ms-project-and-primavera-p6) | [Export Module for MS Project and Primavera P6](guides/msp-export-module.md) | [What's new](guides/msp-export-module-whatsnew.md) |

You can download both modules in the [Client's Area](https://dhtmlx.com/clients/) on the Downloads tab.

## How the two modules work together {#service-topology}

Each module handles only its own formats:

- The PDF/PNG/Excel module creates PDF, PNG, Excel, iCal, and JSON files and imports Excel files. It cannot convert MS Project and Primavera P6 files. When it receives an MS Project or Primavera P6 request, it forwards the request to an MS Project service.
- The MS Project/P6 module handles only MS Project and Primavera P6 requests. Other requests, for example, `gantt.exportToPDF({server: "msp-module-url"})`, do not work.

| Methods | What the PDF/PNG/Excel module does with the request |
|---|---|
| `exportToPDF()`, `exportToPNG()`, `exportToExcel()`, `importFromExcel()`, `exportToICal()`, `exportToJSON()` | Handles it itself |
| `exportToMSProject()`, `importFromMSProject()`, `exportToPrimaveraP6()`, `importFromPrimaveraP6()` | Forwards it to the address in the `MSP_SERVICE_ENDPOINT` environment variable. The default address is the online service `https://export.dhtmlx.com/msproject` |

:::warning
By default, a PDF/PNG/Excel module on your server sends all MS Project and Primavera P6 data to the online export service at `https://export.dhtmlx.com/msproject`. To keep this data in your network, install the MS Project/P6 module and set `MSP_SERVICE_ENDPOINT` to its address.
:::

You can also send MS Project and Primavera P6 requests to the MS Project/P6 module directly: set the `server` parameter of `exportToMSProject()`, `importFromMSProject()`, `exportToPrimaveraP6()`, and `importFromPrimaveraP6()` to its address.

## Keeping all data inside your network

1. Set the `server` parameter of every export and import method that you use to the address of your module. A method without `server` sends the data to the online export service.
2. If MS Project or Primavera P6 requests go through the PDF/PNG/Excel module, set its `MSP_SERVICE_ENDPOINT` environment variable to the root address of your MS Project/P6 module, for example:

   ~~~
   MSP_SERVICE_ENDPOINT=http://localhost:5128
   ~~~

3. If exports must not contact hosts outside your network, restrict the external resources that the PDF/PNG/Excel module can load while it renders a chart. The `EXPORT_ALLOWED_RESOURCE_HOSTS` and `EXPORT_BLOCK_EXTERNAL_RESOURCES` environment variables do this. The README file of the module describes them.

## License and download

Export modules are not included in the Gantt package. An export module is provided free of charge if you've obtained Gantt under [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) or [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) license, or you can [buy the module separately](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). Read the [corresponding article](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) to learn the terms of using each of them.

After you get a license, download the modules in the Client's Area on the Downloads tab.
