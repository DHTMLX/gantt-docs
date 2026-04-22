---
sidebar_label: importFromExcel
title: importFromExcel method
description: "将 Excel 文件转换为 JSON 格式"
---

# importFromExcel

### Description

@short: 将 Excel 文件转换为 JSON

@signature: importFromExcel: (config: any) =\> void

### Parameters

- `config` - (required) *object* - 一个具有导入文件配置属性的对象

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
- [导入 Excel 文件](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)

### Details

:::note
该方法需要 HTML5 File API 的支持。
:::

:::note
该方法在 **export** 扩展中定义，因此需要激活 [export_api](guides/extensions-list.md#export-service) 插件。请在 [Excel 的导出/导入，导出到 iCal](guides/excel.md#importfromexcel) 文章中查看详细信息。
:::

:::note
如果你使用的 Gantt 版本低于 8.0，请在页面中包含 **https://export.dhtmlx.com/gantt/api.js** 以启用在线导出服务，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

该方法的参数是包含导入文件配置属性的对象：

- **server** - 设置请求的 API 端点。可以与导入服务的本地安装一起使用。默认值为 **https://export.dhtmlx.com/gantt**。
- **data** - 一个 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 实例，应该包含一个 Excel (xlsx) 文件。 
- **callback** - 回调函数。
- **sheet** - 导入服务应返回的文档的工作表编号。

## 响应

响应将包含一个 JSON，其中包含对象数组：

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

其中：

- 第一行的值将用作导入对象的属性名。
- 每一行被序列化为一个独立的对象。
- 日期值以 "%Y-%m-%d %H:%i" 格式序列化。

### Related API
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Excel 的导出/导入，导出到 iCal](guides/excel.md#importfromexcel)