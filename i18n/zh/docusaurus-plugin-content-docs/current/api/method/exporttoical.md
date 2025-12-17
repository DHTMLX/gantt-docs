---
sidebar_label: exportToICal
title: exportToICal method
description: "将甘特图数据导出为iCal格式的字符串"
---

# exportToICal

### Description

@short: 将甘特图数据导出为iCal格式的字符串

@signature: exportToICal: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 可选，一个包含导出设置的对象（详情见下文）

### Example

~~~jsx
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

### Details

:::note
 此方法属于**export**扩展，因此需要启用[export_api](guides/extensions-list.md)插件。更多细节请参见[导出/导入 Excel，导出 iCal](guides/excel.md)文章。 
:::

**exportToICal()** 方法接受一个可选的对象，包含以下属性:

- **server** - (*string*) 指定导出请求的API端点。当使用本地安装的导出服务时可用。默认端点为 **https://export.dhtmlx.com/gantt**；
- **name** - (*string*) 允许设置自定义文件名和扩展名，但文件仍以iCal格式导出。[示例请见此处](https://snippet.dhtmlx.com/atbhz9vq)。

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
- [导出/导入 Excel，导出 iCal](guides/excel.md#daochuweiical)

