---
sidebar_label: exportToPrimaveraP6
title: exportToPrimaveraP6 method
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

### Related samples
- [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

### Details

:::note
 此方法属于 **export** 扩展，因此请确保启用了 [export_api](guides/extensions-list.md#daochufuwu) 插件。更多详情请参阅 [从 Primavera P6 导出和导入](guides/export-primavera.md#daochudaoprimaverap6) 文章。
 
:::

:::note
 对于 8.0 之前的 Gantt 版本，您需要在页面中引入 **https://export.dhtmlx.com/gantt/api.js** 来使用在线导出服务，如下所示:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


**exportToPrimaveraP6()** 方法接受一个包含多个可选属性的对象:

- **name** - (*string*) 导出文件的文件名（默认值为 'gantt.xml'）。
- **auto_scheduling** - (boolean) 定义导出项目中任务的调度模式。设置为 **true** 表示任务为自动调度，**false** 则表示任务为手动调度（默认）。
- **skip_circular_links** - (boolean) 是否移除循环链接。**true** 表示移除（默认），**false** 表示保留。
- **project** - (object) 用于指定导出项目实体的自定义属性。
- **tasks** - (object) 用于设置导出任务项的自定义属性。
- **data** - (object) 允许提供用于输出甘特图的自定义数据源。**start_date** 和 **end_date** 应采用包含日期和时间的格式（*%d-%m-%Y %H:%i*）。
- **callback** - (function) 如果希望获取生成的 XML 文件下载链接，可以使用此属性。回调函数接收一个包含 *url* 的 JSON 对象。
- **resources** - (array) 允许将资源列表导出到 Primavera P6 文件中。
- **server** - (string) 指定导出请求的 API 端点。如果您有本地安装的导出服务，可以使用此属性。默认值为 **https://export.dhtmlx.com/gantt**。

## 响应

响应返回一个结构如下的 JSON 对象:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - 一个甘特图的 [数据对象](guides/supported-data-formats.md#json)。每个任务包含 *id*、*open*、*parent*、*progress*、*start_date*、*text* 和 *resource* 等属性。日期格式为字符串，格式为 "%Y-%m-%d %H:%i"。
- **config** - 一个甘特图的 [配置](api/overview/properties-overview.md) 对象，包含从项目文件中提取的设置。
- **resources** - 一个对象数组，表示项目文件中的资源，每个对象包含 *id*、*name* 和 *type* 属性。
- **worktime** - 一个对象，保存项目日历中的工作时间设置。

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
- [从 Primavera P6 导出和导入](guides/export-primavera.md)

