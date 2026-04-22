---
sidebar_label: exportToPrimaveraP6
title: exportToPrimaveraP6 方法
description: "将甘特图中的数据导出到 Primavera P6"
---

# exportToPrimaveraP6

### Description

@short: 将甘特图中的数据导出到 Primavera P6

@signature: exportToPrimaveraP6: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 可选，包含导出设置的对象（详见下文）

### Example

~~~jsx
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

### Related Samples
- [导出数据：MS Project、PrimaveraP6、Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

### Details

:::note
此方法在 **export** 扩展中定义，因此您需要激活 [export_api](guides/extensions-list.md#export-service) 插件。请在 [从 Primavera P6 导出与导入](guides/export-primavera.md#exporttoprimaverap6) 文章中查看详细信息。
 
:::

:::note
如果您使用的 Gantt 版本低于 8.0，请在页面中包含 `https://export.dhtmlx.com/gantt/api.js` 以启用在线导出服务，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::


**exportToPrimaveraP6()** 方法接收一个包含若干属性的对象作为参数（所有属性均为可选）：

- **name** - (*string*) 获取的文件名（默认为 'gantt.xml'）。
- **auto_scheduling** - (*boolean*) 指示导出项目中任务的排程模式。**true** 将任务标记为自动排程，**false** 将任务标记为手动排程（默认状态）。
- **skip_circular_links** - (*boolean*) 指示是否删除循环链接（true - 将被删除（默认模式），false - 不会被删除）。
- **project** - (*object*) 允许为导出的项目信息设置自定义属性。
- **tasks** - (*object*) 允许为导出的任务项设置自定义属性。
- **data** - (*object*) 允许设置一个自定义数据源，该数据源将显示在输出的甘特图中。期望在格式中指定 **start_date** 和 **end_date** 属性，格式包含日期和时间 (*%d-%m-%Y %H:%i*)。
- **callback** - (*function*) 如果你想接收下载生成的 XML 的 URL，可以使用 *callback* 属性。它会接收一个包含 *url* 属性的 JSON 对象。
- **resources** - (*array*) 允许将资源列表导出到 Primavera P6 文件中。如果在导出期间使用资源日历，需要在导出的任务对象（在 **tasks** 对象中）中的 **CalendarUID** 属性为任务指定 -1。这样该任务将使用资源日历。
- **server** - (*string*) 请求的 API 端点。可用于带本地安装的导出服务。默认值为 `https://export.dhtmlx.com/gantt`。

请检查在 [相关部分](guides/export-primavera.md#export-settings) 中对导出设置的详细描述。

### Related API
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [从 Primavera P6 导出与导入](guides/export-primavera.md#exporttoprimaverap6)