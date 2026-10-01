---
title: "导出模块"
sidebar_label: "导出模块"
---

# 导出模块

导出模块是你安装在自己服务器上的导出服务，用来代替 `https://export.dhtmlx.com` 的在线导出服务。若要将导出和导入请求发送到你的模块，请将导出和导入方法的 `server` 参数设置为该模块的地址：

~~~js
gantt.exportToPDF({
    server: "https://myapp.com/myexport/gantt"
});
~~~

当你需要导出较大的图表、在不受在线导出服务限制的情况下导出，或将项目数据保留在自己的网络内时，请使用导出模块。有关格式和方法的列表，请参阅[数据导出与导入](guides/export-common.md)。

## 两个模块

| 模块 | 构建技术 | 格式 | 要求 | 安装 | 版本历史 |
|---|---|---|---|---|---|
| PDF/PNG/Excel 模块 | Node.js，也提供 Docker 镜像 | PDF、PNG、Excel（导出和导入）、iCal、JSON | [系统要求](guides/export-requirements.md#pdfpngexcel-service) | [用于 PDF、PNG、Excel 和 iCal 的导出模块](guides/pdf-export-module.md) | [新功能](guides/pdf-export-module-whatsnew.md) |
| MS Project/P6 模块 | .NET (C#) | MS Project 和 Primavera P6（导出和导入） | [系统要求](guides/export-requirements.md#import-and-export-from-ms-project-and-primavera-p6) | [用于 MS Project 和 Primavera P6 的导出模块](guides/msp-export-module.md) | [新功能](guides/msp-export-module-whatsnew.md) |

你可以在[客户端区域](https://dhtmlx.com/clients/)的 Downloads 选项卡中下载这两个模块。

## 两个模块如何协同工作 {#service-topology}

每个模块只处理它自己的格式：

- PDF/PNG/Excel 模块创建 PDF、PNG、Excel、iCal 和 JSON 文件，并导入 Excel 文件。它无法转换 MS Project 和 Primavera P6 文件。当它收到 MS Project 或 Primavera P6 请求时，会将该请求转发到 MS Project 服务。
- MS Project/P6 模块只处理 MS Project 和 Primavera P6 请求。其他请求，例如 `gantt.exportToPDF({server: "msp-module-url"})`，将无法工作。

| 方法 | PDF/PNG/Excel 模块对请求的处理方式 |
|---|---|
| `exportToPDF()`、`exportToPNG()`、`exportToExcel()`、`importFromExcel()`、`exportToICal()`、`exportToJSON()` | 自行处理 |
| `exportToMSProject()`、`importFromMSProject()`、`exportToPrimaveraP6()`、`importFromPrimaveraP6()` | 将其转发到 `MSP_SERVICE_ENDPOINT` 环境变量中的地址。默认地址是在线服务 `https://export.dhtmlx.com/msproject` |

:::warning
默认情况下，你服务器上的 PDF/PNG/Excel 模块会将所有 MS Project 和 Primavera P6 数据发送到 `https://export.dhtmlx.com/msproject` 的在线导出服务。若要将这些数据保留在你的网络内，请安装 MS Project/P6 模块，并将 `MSP_SERVICE_ENDPOINT` 设置为它的地址。
:::

你也可以将 MS Project 和 Primavera P6 请求直接发送到 MS Project/P6 模块：将 `exportToMSProject()`、`importFromMSProject()`、`exportToPrimaveraP6()` 和 `importFromPrimaveraP6()` 的 `server` 参数设置为它的地址。

## 将所有数据保留在你的网络内

1. 将你所使用的每个导出和导入方法的 `server` 参数设置为你的模块的地址。未设置 `server` 的方法会将数据发送到在线导出服务。
2. 如果 MS Project 或 Primavera P6 请求经由 PDF/PNG/Excel 模块，请将其 `MSP_SERVICE_ENDPOINT` 环境变量设置为你的 MS Project/P6 模块的根地址，例如：

   ~~~
   MSP_SERVICE_ENDPOINT=http://localhost:5128
   ~~~

3. 如果导出不得访问你网络之外的主机，请限制 PDF/PNG/Excel 模块在渲染图表时可以加载的外部资源。`EXPORT_ALLOWED_RESOURCE_HOSTS` 和 `EXPORT_BLOCK_EXTERNAL_RESOURCES` 环境变量可以实现这一点。模块的 README 文件对它们进行了说明。

## 许可证和下载

导出模块不包含在 Gantt 包中。如果你是通过 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 许可获取 Gantt，则导出模块免费提供，或者你也可以[单独购买该模块](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。请阅读[相应文章](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)以了解每个模块的使用条款。

获得许可证后，请在客户端区域的 Downloads 选项卡中下载这些模块。