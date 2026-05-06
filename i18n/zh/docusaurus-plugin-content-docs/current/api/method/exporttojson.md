---
sidebar_label: exportToJSON
title: exportToJSON 方法
description: "将甘特图的结构和数据导出为一个 JSON 对象"
---

# exportToJSON

### Description

@short: 将甘特图的结构和数据导出为一个 JSON 对象

@signature: exportToJSON: (config?: any) =\> void

### Parameters

- `config` - object - 可选，是一个包含甘特图配置的对象

### Example

~~~jsx
gantt.exportToJSON({
    name:"gantt.json"
});
~~~

### Details

:::note
本方法在 **export** 扩展中定义，因此需要激活 [export_api](guides/extensions-list.md#export-service) 插件。
:::

:::note
如果您使用的 Gantt 版本低于 8.0，请在页面中包含 `https://export.dhtmlx.com/gantt/api.js` 以启用在线导出服务，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

以下选项可用于 **config** 对象：

- name - 导出的 JSON 文件名称
- data - (array) 要导出的任务列表。如果未指定，将导出整个甘特图

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)