---
title: "PDF 导出模块更新日志"
sidebar_label: "PDF 导出模块更新日志"
---

# PDF 导出模块更新日志


## 0.6.6

* 使用 'visual' 配置导出到 Excel 时，现在会忽略未排程的任务。

* 增加了 DHTMLX Gantt 9.0 的模板。

## 0.6.5

* 调整了 DHTMLX Scheduler 7.0 的模板。

## 0.6.4

* 在单个 PDF 文件中引入了多页导出功能（图表会根据指定格式分块导出，然后将页面合并为一个文件）。

* 在单文件多页导出时，新增了在每页显示表格和时间轴标题的选项。

## 0.6.3

* Docker 镜像中用于 Node.js 环境的基础镜像已更新至 20 版本。

* 优化了 Dockerfile，减小了 Docker 镜像的体积。

## 0.6.2

* 新增了 DHTMLX Scheduler 7.0 的模板。

## 0.6.0

* 更改了 MS Project / Primavera P6 导出服务的 endpoint。

* 修复了 Excel 导出时在使用 "visual:true" 参数下无法正确高亮时间轴单元格的问题。

* 更新了用于构建 Docker 文件的软件包。

## 0.5.9

* 升级了 Docker 镜像中的 Node.js 版本。

* 从 Docker 镜像中移除了未使用的文件，以解决安全警告。

* 修复了当 grid 列中存在 formatter 时导出失败的问题。

## 0.5.8

* 为导出模块添加了主页，并提供了测试功能的链接（测试前请确保在下拉菜单中检查 URL）。
示例: [https://export.dhtmlx.com](https://export.dhtmlx.com)

* 引入了新功能:[Gantt for Node.js 的导入和导出](guides/export-nodejs.md)。

* 修复了与 `visual:true` 参数相关的 Excel 导出 bug，实现了多重刻度、不同工期单位以及任务无需严格对齐时间轴单元格边界的导出。

## 0.5.7

* 增强了对 Node.js 14 的兼容性。

* 修复了自定义本地化相关的问题。

* 为 Docker 添加了 "init" 进程。

## 0.5.6

* 解决了在无图形界面服务器（headless servers）和 Docker 环境下的内存泄漏问题。

## 0.5.5

* 提升了应用在 Docker 镜像中的整体性能。

## 0.5.0

* 用 Electron 替换了 PhantomJS 用于 PDF 和 PNG 的导出。
