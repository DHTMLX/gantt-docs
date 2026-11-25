---
title: "数据导出与导入"
sidebar_label: "数据导出与导入"
---

# 数据导出与导入

dhtmlxGantt 可以将图表导出为 PDF、PNG、Excel、iCal、MS Project、Primavera P6 和 JSON 文件，并可以从 Excel、MS Project 和 Primavera P6 文件导入数据。所有文件的导出和导入都通过导出服务完成：要么是由 DHTMLX 托管的在线导出服务，要么是你安装在自己服务器上的[导出模块](guides/export-modules.md)。

在本文档中：

- **导出服务**是将 Gantt 数据转换为文件、或将文件转换为 Gantt 数据的软件；
- **在线导出服务**是 DHTMLX 在 `https://export.dhtmlx.com` 运行的导出服务实例；
- **导出模块**是由你自己安装并运行的导出服务。

## 可以导出和导入的内容

| 格式 | 导出 | 导入 | 方法 | 导出模块 | 指南 |
|---|---|---|---|---|---|
| PDF | 是 | - | [exportToPDF()](api/method/exporttopdf.md) | PDF/PNG/Excel 模块 | [PDF 和 PNG](guides/export.md) |
| PNG | 是 | - | [exportToPNG()](api/method/exporttopng.md) | PDF/PNG/Excel 模块 | [PDF 和 PNG](guides/export.md) |
| Excel | 是 | 是 | [exportToExcel()](api/method/exporttoexcel.md)、[importFromExcel()](api/method/importfromexcel.md) | PDF/PNG/Excel 模块 | [Excel](guides/excel.md) |
| iCal | 是 | - | [exportToICal()](api/method/exporttoical.md) | PDF/PNG/Excel 模块 | [iCal](guides/ical.md) |
| MS Project | 是 | 是 | [exportToMSProject()](api/method/exporttomsproject.md)、[importFromMSProject()](api/method/importfrommsproject.md) | MS Project/P6 模块 | [MS Project](guides/export-msproject.md) |
| Primavera P6 | 是 | 是 | [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md)、[importFromPrimaveraP6()](api/method/importfromprimaverap6.md) | MS Project/P6 模块 | [Primavera P6](guides/export-primavera.md) |
| JSON 文件 | 是 | - | [exportToJSON()](api/method/exporttojson.md) | PDF/PNG/Excel 模块 | - |
| 页面中的 JSON 或 XML | 是 | - | [serialize()](api/method/serialize.md) | 不需要，在浏览器中运行 | [JSON 与 XML](guides/serialization.md) |

若要在服务器端导出和导入数据，请参阅[在 Node.js 上导出和导入数据](guides/export-nodejs.md)。

## 导出的工作原理

1. 你通过 [plugins](api/method/plugins.md) 方法启用 `export_api` 插件，并调用导出或导入方法，例如 `gantt.exportToPDF()`。
2. 该方法通过 POST 请求将 Gantt 数据发送到导出服务。
3. 导出服务创建文件，或读取导入的文件。
4. 浏览器接收文件。对于导入，该方法的 `callback` 函数会接收数据。对于导出，`callback` 函数可以改为接收所生成文件的 URL。

默认情况下，所有方法都会将请求发送到 `https://export.dhtmlx.com/gantt` 的在线导出服务。若要将请求发送到其他导出服务，例如你自己的导出模块，请设置方法的 `server` 参数：

~~~js
gantt.exportToPDF({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## 在线导出服务或自行安装

- **水印。** 在线导出服务是免费的，但除非你拥有有效的许可证，否则它生成的 PDF 和 PNG 文件会包含水印。请参阅[许可证和水印](#license-and-watermark)。
- **限制。** 在线导出服务对时间和请求大小有限制。请参阅[在线导出服务的限制](#service-limits)。你自行安装的导出模块的限制由你来配置。
- **数据位置。** 在线导出服务在 DHTMLX 的服务器上处理你的数据。使用导出模块时，你可以将数据保留在自己的网络内。请参阅[两个模块如何协同工作](guides/export-modules.md#service-topology)。
- **设置。** 在线导出服务无需任何设置。导出模块需要一台服务器：PDF/PNG/Excel 模块需要 Node.js 或 Docker，MS Project/P6 模块需要 .NET。请参阅[导出模块](guides/export-modules.md)。

## 在线导出服务的限制 {#service-limits}

:::note
在线导出服务对时间和请求大小有限制。
:::

### 时间限制

如果处理时间超过 20 秒，导出将被取消，并出现以下错误：

~~~html
Error: Timeout trigger 20 seconds
~~~

如果多人同时导出甘特图，处理时间可能比平时长一些。但没关系，因为来自特定用户的导出请求所花费的时间是单独计数的。

### 请求大小限制

有一个通用的 API 端点 `https://export.dhtmlx.com/gantt`，用于所有导出方法（*exportToPDF*、*exportToPNG*、*exportToMSProject* 等）。**最大请求大小为 10 MB**。

另有一个单独的 API 端点 `https://export.dhtmlx.com/gantt/project`，专用于 MS Project 和 Primavera P6 的导出/导入服务（仅限 *exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*）。**最大请求大小：40 MB**。请参阅如何将其用于 [MS Project](guides/export-msproject.md#limits-on-request-size-and-import-of-large-files) 和 [Primavera P6](guides/export-primavera.md#limits-on-request-size-and-import-of-large-files)。

## 许可证和水印 {#license-and-watermark}

:::note
在线导出服务是免费的，但输出的 PDF 和 PNG 文件将包含库的水印。
要在导出时不带水印，你需要一个有效的许可证——在有效支持期内（所有 PRO 许可证为 12 个月），导出的结果将不带水印。
:::

导出模块不包含在 Gantt 包中。如果你是通过 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 许可获取 Gantt，则导出模块免费提供，或者你也可以[单独购买该模块](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。请阅读[相应文章](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)以了解每个模块的使用条款。