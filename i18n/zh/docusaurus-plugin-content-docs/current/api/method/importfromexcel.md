---
sidebar_label: importFromExcel
title: importFromExcel method
description: "将 Excel 文件转换为 JSON 格式"
---

# importFromExcel

### Description

@short: 将 Excel 文件转换为 JSON 格式

@signature: importFromExcel: (config: any) =\> void

### Parameters

- `config` - (required) *object* - 包含导入文件配置设置的对象

### Example

~~~jsx
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
        console.log(project)
    }
});
~~~

### Related samples
- [Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)

### Details
:::note
 此方法需要支持 HTML5 File API。 
:::

:::note
 此方法属于 **export** 扩展，因此您需要启用 [export_api](guides/extensions-list.md) 插件。更多详情请参见 [导出/导入 Excel，导出 iCal](guides/excel.md) 文章。 
:::

:::note
 对于 8.0 之前的 Gantt 版本，您必须在页面中包含 **https://export.dhtmlx.com/gantt/api.js** 来使用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

此方法接受一个包含导入文件配置选项的对象:

- **server** - 指定请求的 API 端点。可用于本地安装的导入服务。默认值为 **https://export.dhtmlx.com/gantt**。
- **data** - 一个包含 Excel (xlsx) 文件的 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 实例。
- **callback** - 导入完成后调用的函数。
- **sheet** - 文档中要由导入服务处理的工作表索引号。

## Response

响应返回包含对象数组的 JSON:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

详细说明:

- 第一行的值用作导入对象的属性名。
- 每一行数据转换为一个独立对象。
- 日期格式为 "%Y-%m-%d %H:%i"。

### Related API
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [导出/导入 Excel，导出 iCal](guides/excel.md)

