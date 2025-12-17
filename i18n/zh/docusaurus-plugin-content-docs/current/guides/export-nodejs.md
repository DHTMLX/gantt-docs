---
title: "在 Node.js 上导出和导入数据"
sidebar_label: "在 Node.js 上导出和导入数据"
---

在 Node.js 上导出和导入数据
=============================

在使用 Node.js 时，可以通过 DHTMLX Gantt 实现数据的导出和导入。

:::note
若要体验此功能，您可以下载[示例](https://files.dhtmlx.com/30d/914357ff4315af5d6bfd79e2f4e3f8fb/gantt_node_export_demo.zip)。运行该示例需要安装 [gantt-node](guides/using-gantt-on-server.md#shiyongtiaokuan) 包。
:::

要在您的项目中设置导出/导入功能，请按照 [plugins](api/method/plugins.md) 指南中所述激活 <b>export_api</b> 插件:

~~~js
gantt.plugins({
      export_api: true
});
~~~
更多详细信息请参见下文。

导出数据
----------------

导出功能与 Web 版本类似，但有一些区别:

- 如果要导出为 Excel 文件，要求页面上时间线可见，并且 gantt 已加载任务。由于在 Node.js 上不会渲染时间线的 DOM 元素，因此默认情况下无法正常导出为 Excel，因为 gantt 无法对任务在时间线上的位置进行内部计算。为了解决这个问题，您需要在导出设置中通过 **data** 参数传递已加载的任务:

~~~js
data: gantt.serialize().data
~~~

- 在设置导出时，请务必指定 **callback** 参数，用于定义输出文件的发送位置。如果未设置该参数，文件将被输出到控制台。

导入数据
----------------

导入功能需要安装 *formData* 包:

~~~js
npm install form-data
~~~


从 MSP 和 PrimaveraP6 文件导入与 Web 版本操作方式相同。

当从 Excel 文件导入时，数据会以 JSON 格式返回给 Gantt。由于 Excel 列名可以是任意的，您需要自行创建从 Excel 列到 DHTMLX Gantt 任务属性的映射关系。

