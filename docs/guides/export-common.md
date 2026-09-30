---
title: "Exporting and Importing Data"
sidebar_label: "Exporting and Importing Data"
---

# Exporting and Importing Data

dhtmlxGantt can export a chart to PDF, PNG, Excel, iCal, MS Project, Primavera P6, and JSON files, and import data from Excel, MS Project, and Primavera P6 files. All file export and import goes through an export service: either the online export service hosted by DHTMLX, or an [export module](guides/export-modules.md) that you install on your own server.

In this documentation:

- **export service** is the software that converts Gantt data to a file or a file to Gantt data;
- **online export service** is the instance of the export service that DHTMLX runs at `https://export.dhtmlx.com`;
- **export module** is an export service that you install and run yourself.

## What you can export and import

| Format | Export | Import | Methods | Export module | Guide |
|---|---|---|---|---|---|
| PDF | Yes | - | [exportToPDF()](api/method/exporttopdf.md) | PDF/PNG/Excel module | [PDF and PNG](guides/export.md) |
| PNG | Yes | - | [exportToPNG()](api/method/exporttopng.md) | PDF/PNG/Excel module | [PDF and PNG](guides/export.md) |
| Excel | Yes | Yes | [exportToExcel()](api/method/exporttoexcel.md), [importFromExcel()](api/method/importfromexcel.md) | PDF/PNG/Excel module | [Excel](guides/excel.md) |
| iCal | Yes | - | [exportToICal()](api/method/exporttoical.md) | PDF/PNG/Excel module | [iCal](guides/ical.md) |
| MS Project | Yes | Yes | [exportToMSProject()](api/method/exporttomsproject.md), [importFromMSProject()](api/method/importfrommsproject.md) | MS Project/P6 module | [MS Project](guides/export-msproject.md) |
| Primavera P6 | Yes | Yes | [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md), [importFromPrimaveraP6()](api/method/importfromprimaverap6.md) | MS Project/P6 module | [Primavera P6](guides/export-primavera.md) |
| JSON file | Yes | - | [exportToJSON()](api/method/exporttojson.md) | PDF/PNG/Excel module | - |
| JSON or XML in the page | Yes | - | [serialize()](api/method/serialize.md) | not needed, runs in the browser | [JSON and XML](guides/serialization.md) |

To export and import data on the server side, see [Export and Import Data on Node.js](guides/export-nodejs.md).

## How export works

1. You enable the `export_api` plugin with the [plugins](api/method/plugins.md) method and call an export or import method, for example, `gantt.exportToPDF()`.
2. The method sends the Gantt data to an export service in a POST request.
3. The export service creates the file, or reads the imported file.
4. The browser receives the file. For import, the `callback` function of the method receives the data. For export, a `callback` function can receive a URL of the generated file instead.

By default, all methods send requests to the online export service at `https://export.dhtmlx.com/gantt`. To send them to another export service, for example, to your own export module, set the `server` parameter of the method:

~~~js
gantt.exportToPDF({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## Online export service or your own install

- **Watermark.** The online export service is free, but the PDF and PNG files that it creates contain a watermark unless you have a valid license. See [License and watermark](#license-and-watermark).
- **Limits.** The online export service has time and request size limits. See [Online export service limits](#service-limits). An export module that you install has the limits that you configure.
- **Data location.** The online export service processes your data on DHTMLX servers. With export modules, you can keep the data in your network. See [How the two modules work together](guides/export-modules.md#service-topology).
- **Setup.** The online export service needs no setup. An export module needs a server: Node.js or Docker for the PDF/PNG/Excel module, .NET for the MS Project/P6 module. See [Export Modules](guides/export-modules.md).

## Online export service limits {#service-limits}

:::note
The online export service has time and request size restrictions.
:::

### Time limits

If the process takes more than 20 seconds, the export will be canceled and the following error will occur:

~~~html
Error: Timeout trigger 20 seconds
~~~

If several people export Gantt at the same time, the process can take more time than usual. But that's fine because the time which is spent for export request from a specific user is counted separately.

### Limits on request size

There is a common API endpoint `https://export.dhtmlx.com/gantt` which serves for all export methods (*exportToPDF*, *exportToPNG*, *exportToMSProject*, etc.). **Max request size is 10 MB**.

There is also a separate API endpoint `https://export.dhtmlx.com/gantt/project` specific for the MS Project and Primavera P6 export/import services (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* only). **Max request size: 40 MB**. See how to use it for [MS Project](guides/export-msproject.md#limits-on-request-size-and-import-of-large-files) and [Primavera P6](guides/export-primavera.md#limits-on-request-size-and-import-of-large-files).

## License and watermark

:::note
The online export service is free, but the output PDF and PNG files will contain the library's watermark.
To export without the watermark you need a valid license - the result of export will be available without a watermark
during the valid support period (12 months for all PRO licenses).
:::

Export modules are not included in the Gantt package. An export module is provided free of charge if you've obtained Gantt under [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) or [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) license, or you can [buy the module separately](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210). Read the [corresponding article](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) to learn the terms of using each of them.
