---
sidebar_label: exportToMSProject
title: exportToMSProject 方法
description: "将甘特图中的数据导出到 MS Project"
---

# exportToMSProject

### Description

@short: 将甘特图中的数据导出到 MS Project

@signature: exportToMSProject: (_export_?: any) =\> void

### Parameters

- `export`	- object - optional, 一个包含导出设置的对象（请参阅详细信息）

### Example

~~~jsx
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

### Details

:::note
本方法在 **export** 扩展中定义，因此需要激活 [export_api](guides/extensions-list.md#export-service) 插件。请阅读 [MS Project 的导出与导入](guides/export-msproject.md#export-to-ms-project) 文章中的详细信息。
:::

:::note
注：如果你使用的 Gantt 版本低于 8.0，请在页面中包含 `https://export.dhtmlx.com/gantt/api.js` 以启用在线导出服务，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

The **exportToMSProject()** 方法将一个对象作为参数传入，该对象包含若干属性（所有属性均可选）：

- **name** - (*string*) 获取的文件名（默认为 'gantt.xml'）。
- **auto_scheduling** - (*boolean*) 指示导出项目中任务的调度模式。**true** 将任务标记为自动调度，**false** 将任务标记为手动调度（默认状态）。
- **skip_circular_links** - (*boolean*) 指示是否将循环链接移除（true - 将被移除（默认模式），false - 不会被移除）。
- **project** - (*object*) 允许为导出的项目实体设置自定义属性。
- **tasks** - (*object*) 允许为导出的任务项设置自定义属性。
- **data** - (*object*) 允许设置一个自定义数据源，该数据源将在输出的甘特图中呈现。期望在 **start_date** 与 **end_date** 属性中按包含日期与时间的格式指定（*%d-%m-%Y %H:%i*）。
- **callback** - (*function*) 如果你希望接收生成的 XML 的下载链接，可以使用 *callback* 属性。它接收一个包含 *url* 属性的 JSON 对象。
- **resources** - (*array*) 允许将资源列表导出到一个 MS Project 文件中。如果在导出时使用了资源日历，则在 **tasks** 对象中的 **CalendarUID** 属性为某个任务指定 -1。之后，该任务将使用资源日历。
- **server** - (*string*) 请求的 API 端点。可与导出服务的本地安装一起使用。默认值为 `https://export.dhtmlx.com/gantt`。

有关导出设置的详细描述，请查看 [相关设置](guides/export-msproject.md#export-settings) 的详细信息。

### Related API
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [从 MS Project 导出与导入](guides/export-msproject.md)

