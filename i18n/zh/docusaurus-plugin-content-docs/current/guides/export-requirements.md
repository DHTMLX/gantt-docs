---
title: "导出服务 - 独立安装的系统要求"
sidebar_label: "导出服务 - 独立安装的系统要求"
---

# 导出服务 - 独立安装的系统要求

dhtmlxGantt 库允许通过在线导出服务从甘特图导出和导入数据。

另外，也可以通过在本地安装 [export services](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 实现甘特图的导出。为顺利使用导出模块，请确保您的系统满足以下要求:

- PNG/PDF/Excel [导出要求](guides/export-requirements.md#pdfpngexcelfuwu)
- MS Project/Primavera P6 [导入和导出要求](guides/export-requirements.md#msprojectheprimaverap6dedaoruyudaochu) 

## PDF/PNG/Excel 服务

### 概述

导出为 PDF/PNG/Excel 是一个用 JavaScript 开发的跨平台 Node.js 应用。


该应用既提供源代码，也可作为 Docker 镜像获取。

### 系统要求

<table class="dp_table">
  <tr>
  <th><b>硬件</b></th><th><b>操作系统</b></th><th><b>运行环境</b></th>
  </tr>
  <tr>
  <td>- 1 个 CPU 核心（共享虚拟核心即可） - 至少 500MB 内存</td>
  <td>- Linux - Windows - MacOS</td>
  <td>- Node.js v12.03 或更高版本，推荐使用 v18 或 v20 或 - Docker</td>
  </tr>
</table>


## MS Project 和 Primavera P6 的导入与导出

### 概述

导出到 MS Project 是一个基于 .Net Core 框架、用 C# 编写的应用程序，可在 Windows、MacOS 和 Linux 上运行。

源代码可用于在您自己的服务器或任何云服务提供商上部署。
该项目兼容 MS VisualStudio 2022 及更高版本。

### 系统要求

<table class="dp_table">
  <tr>
  <th><b>硬件</b></th><th><b>操作系统</b></th><th><b>运行环境</b></th>
  </tr>
  <tr>
  <td>- 1 个 CPU 核心（共享虚拟核心可用） - 至少 1000MB 内存</td>
  <td>- Windows - MacOS - Linux</td>
  <td>- .NET Core 7.0 或更高版本</td>
  </tr>
</table>
