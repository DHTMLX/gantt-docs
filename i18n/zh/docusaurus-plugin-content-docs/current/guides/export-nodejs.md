---
title: "在 Node.js 上导出与导入数据"
sidebar_label: "在 Node.js 上导出与导入数据"
---

# 在 Node.js 上导出与导入数据

您可以导出和导入使用 Node.js 构建的 DHTMLX Gantt 的数据。

:::note
要试用此功能，请下载 [演示示例](https://files.dhtmlx.com/30d/914357ff4315af5d6bfd79e2f4e3f8fb/gantt_node_export_demo.zip)。要运行演示，您需要安装 [gantt-node](guides/using-gantt-on-server.md#terms-of-using) 包。
:::

要为您的项目配置导出/导入，请通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件：

~~~js
gantt.plugins({
    export_api: true
});
~~~

请阅读下文以获取更多细节。

## 导出数据

导出功能应与网页版本的工作方式基本相同，但有一些例外：

- 导出到 Excel 需要在页面上显示时间线，前提是在 gantt 中加载了任务。由于时间线的 DOM 元素在 Node.js 上根本不会被渲染，单独进行 Excel 导出将无法工作，因为 gantt 无法实现与任务在时间线中的定位相关的内部计算。作为替代方案，您需要将已加载的任务指定为导出设置中的 **data** 参数的值：

~~~js
data: gantt.serialize().data
~~~

- 在配置导出时，请指定 **callback** 参数以定义输出文件的目标地址，否则文件将输出到控制台。

## 导入数据

导入功能需要安装额外的 *formData* 组件：

~~~js
npm install form-data
~~~

从 MSP 和 PrimaveraP6 文件导入应与网页版本的工作方式相同。

当导入 Excel 文件时，文件中的数据将以 JSON 格式返回给 Gantt。由于 Excel 的列名称可能是任意的，因此需要将 Excel 文档的列映射到 DHTMLX Gantt 的任务属性。为此，您需要自行开发解决方案。