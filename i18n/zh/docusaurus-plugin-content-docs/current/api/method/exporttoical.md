---
sidebar_label: exportToICal
title: exportToICal 方法
description: "将甘特图数据导出为 iCal 字符串"
---

# exportToICal

### Description

@short: 将甘特图数据导出为 iCal 字符串

@signature: exportToICal: (_export_?: any) =\> void

### Parameters

- `export` - object - optional, 一个包含导出设置的对象（请参阅详情）

### Example

~~~jsx
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

### Details

:::note
此方法在 **export** 扩展中定义，因此需要激活 [export_api](guides/extensions-list.md#export-service) 插件。请在 [Export/Import for Excel, Export to iCal](guides/excel.md) 文章中阅读详细信息。
~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

**exportToICal()** 方法接受一个可选的对象，包含以下属性:

- **server** - (*string*) 设置请求的 API 端点。可以与导出服务的本地安装一起使用。默认值为 `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) 允许为文件指定自定义名称和扩展名，但文件仍将以 iCal 格式导出。 [查看示例](https://snippet.dhtmlx.com/atbhz9vq).

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Excel 的导出/导入，导出到 iCal](guides/excel.md#export-to-ical)