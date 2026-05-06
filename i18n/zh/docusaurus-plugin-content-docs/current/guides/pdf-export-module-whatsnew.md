---
title: "PDF 导出模块的新特性"
sidebar_label: "PDF 导出模块的新特性"
---

PDF 导出模块的新特性
================================

## 0.7.7

- 修复在指定 `format` 参数时，多页面 PDF 导出中 `width` 与 `height` 参数未被忽略的问题
- 修复在启用 `merge_pages` 时，单页导出中出现空白页的问题
- 修复导出完成后临时文件被删除的问题
- 修复复杂布局中的 HTML 对齐问题
- 改进 Gantt PDF 导出的页面尺寸计算
- 添加自动化测试，比较 Gantt 与 Scheduler 的 PDF 与 PNG 导出

## 0.7.6

- 提高对 Gantt 与 Scheduler 的 PDF 与 PNG 导出中 HTML 内容的清理
- 修复远程代码执行与文件读取漏洞

## 0.7.4

- 修复多页面 PDF 的页眉页脚背景颜色
- 修复旧版 Scheduler（4.2-5.1）上的 PDF 与 PNG 导出
- 修复带水印的 Scheduler PDF 导出

## 0.7.3

- 更新 Gantt 9.1 的模板

## 0.7.2

- 移除 Gantt 9.0 对外部 Google 字体的依赖
- 使用 `slice_archive` 配置时改进 PNG 导出
- 提高 Windows 上文件名中对特殊字符的支持
- 改进 PDF/PNG 导出超时信息
- 修复带有 `merge_pages` 配置的横向模式下的 PDF 导出
- 修复在多页导出中 header 与 footer 参数使用 HTML 时的错误
- 修复 Windows 上导出模块路径包含空格时的 PDF 与 PNG 导出
- 修复多页面导出中的 header 和 footer 内容缩放
- 修复在使用 PNG 导出时自定义名称时的 `slice_checker` 选项
- 修复某些场景下 PNG 导出挂起
- 修复在 Windows 上同一毫秒内收到多次导出请求时 PDF/PNG 导出会被取消的问题

## 0.7.1

- Excel 导出：在渲染的时间线表示中增加对分割任务的支持（`visual: true`）
- Excel 导出：当渲染的时间线表示中 `end_date` 早于 `start_date` 时修正任务渲染
- Excel 导出：不显示未安排任务的日期

## 0.7.0
  
- 将 Electron 版本更新到 29
- 增加对 PDF 导出的自定义边距支持
- 增加对每页页脚和页头的支持（包括指定页码的方式）
- 增加对 A0、A1、A2 和 Ledger 格式的支持
- 更新 Gantt 与 Scheduler 的模板
- 由于 Chrome 122 的支持，`background-clip: text` 等样式规则应能工作
- 修复具有复杂自定义布局的 PDF 导出
- 修复在使用资源面板时的部分内容导出
- 修复在 `header` 中添加 `h1`、`h2` 等标签时导致的 PDF 空白页
- 修复在使用带有 `raw: true` 与 `merge_pages: true` 配置的自定义数据时导出挂起的问题
- 修复 Windows 上 Electron 启动时的 EINVAL 错误

## 0.6.7

- 更新 DHTMLX Gantt 9.0 原始导出模板
- 针对 `raw` 导出的黏性刻度单元格的修复

## 0.6.6

- 使用带有 `'visual'` 配置的 Excel 导出时忽略未排程的任务
- 添加 DHTMLX Gantt 9.0 模板

## 0.6.5

- 针对 DHTMLX Scheduler 7.0 模板的修复

## 0.6.4

- 在一个 PDF 文件中添加多页面导出功能（按块将图表导出为指定格式，然后将页面合并成一个文件）
- 增加在使用“一文件多页导出”功能时，按页显示网格和时间线标题的功能

## 0.6.3

- 将 node.js 环境的基础镜像更新为 Node.js 20，用于 Docker 镜像
- 优化 Dockerfile 并减小 Docker 镜像大小

## 0.6.2

- 为 DHTMLX Scheduler 7.0 添加模板

## 0.6.0

- 更改 MS Project / Primavera P6 导出服务的端点
- 修复 Excel 导出在 `visual:true` 参数下对时间线单元格的正确高亮
- 更新构建 Docker 文件所需的依赖包

## 0.5.9

- 更新 Docker 镜像的 Node.js 版本
- 移除 Docker 镜像中未使用的文件以修复安全警告
- 修复如果网格列中有格式化器时导出不起作用的错误

## 0.5.8

- 导出模块主页，包含测试导出模块功能的链接（测试前请检查下拉菜单中的 URL）。
示例: [https://export.dhtmlx.com](https://export.dhtmlx.com)
- 新功能：[Gantt for Node.js 的导入和导出](guides/export-nodejs.md)
- 修复 Excel 导出在 `visual:true` 参数下的问题。现在你可以使用多种比例、不同的持续时间单位导出数据，任务不必从时间线单元格的起始端开始和结束。

## 0.5.7

- 提高对 Node.js 14 的兼容性
- 自定义区域设置的修复
- 为 Docker 增加了 "init" 过程

## 0.5.6

- 在无头服务器（无图形界面）和 Docker 中运行时修复了一些内存泄漏

## 0.5.5

- 提高应用在 Docker 镜像中的运行效果

## 0.5.0

- 将 PDF 与 PNG 导出从 PhantomJS 切换到 Electron