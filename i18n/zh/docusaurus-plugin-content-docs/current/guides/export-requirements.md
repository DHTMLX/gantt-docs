--- 
title: "导出服务 - 独立安装的系统要求" 
sidebar_label: "导出服务 - 独立安装的系统要求" 
---

# 导出服务 - 独立安装的系统要求

dhtmlxGantt 库为您提供通过在线服务导出和导入甘特图数据的可能性。

您也可以通过在本地计算机上安装 [export services](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 来导出甘特图。使用导出模块前，您需要确保系统符合以下系统要求：

- PNG/PDF/Excel [导出要求](guides/export-requirements.md#pdfpngexcel-service)
- MS Project/Primavera P6 [导入和导出要求](guides/export-requirements.md#import-and-export-from-ms-project-and-primavera-p6)

## PDF/PNG/Excel Service

### 概述

导出为 PDF/PNG/Excel 是一个基于 JS 的跨平台 Node.js 应用。 

它以源代码和 Docker 镜像的形式分发。

### 系统需求

<table class="dp_table">
  <tr>
  <th><b>硬件</b></th><th><b>操作系统</b></th><th><b>运行时</b></th>
  </tr>
  <tr>
  <td>- 1 个 CPU 内核（共享虚拟核心也可用）- 至少 500MB RAM</td>
  <td>- Linux - Windows - MacOS</td>
  <td>- Node.js v12.03 或更高版本，推荐使用 v18 或 v20，或 - Docker</td>
  </tr>
</table>


## MS Project 与 Primavera P6 的导入与导出

### 概述

导出到 MS Project 是一个用 C# 编写、在 Windows、MacOS、Linux 上运行的 .Net Core Framework 应用程序。

我们可以向您提供可在您自己的服务器或任意云服务提供商上部署的源代码。该源项目与 MS Visual Studio 2022 及以上版本兼容。

### 系统要求

<table class="dp_table">
  <tr>
  <th><b>硬件</b></th><th><b>操作系统</b></th><th><b>运行时</b></th>
  </tr>
  <tr>
  <td>- 1 个 CPU 内核（共享虚拟核心也可用）- 至少 1000MB RAM</td>
  <td>- Windows - MacOS - Linux</td>
  <td>- .NET Core 7.0+</td>
  </tr>
</table>