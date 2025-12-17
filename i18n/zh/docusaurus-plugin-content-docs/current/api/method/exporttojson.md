---
sidebar_label: exportToJSON
title: exportToJSON method
description: "创建一个包含甘特图结构和数据的 JSON 对象"
---

# exportToJSON

### Description

@short: 创建一个包含甘特图结构和数据的 JSON 对象

@signature: exportToJSON: (config?: any) =\> void

### Parameters

- `config` - (optional) *object* - 可选，包含甘特图配置的对象

### Example

~~~jsx
gantt.exportToJSON({
    name:"gantt.json"
});
~~~

### Details

:::note
 该方法属于 **export** 扩展，因此请确保已启用 [export_api](guides/extensions-list.md#daochufuwu) 插件。
 
:::

:::note
 对于 8.0 版本之前的甘特图，需要在页面中添加 **https://export.dhtmlx.com/gantt/api.js** 来使用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

**config** 对象支持以下选项:

- name - 导出 JSON 文件的文件名
- data - (数组) 要导出的任务列表；如果省略，则导出整个甘特图

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

