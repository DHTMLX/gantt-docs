---
sidebar_label: exportToMSProject
title: exportToMSProject method
description: "将甘特图中的数据导出到 MS Project"
---

# exportToMSProject

### Description

@short: 将甘特图中的数据导出到 MS Project

@signature: exportToMSProject: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 可选，一个包含导出设置的对象（详见下文）

### Example

~~~jsx
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

### Details

:::note
 该方法属于 **export** 扩展，因此请确保启用了 [export_api](guides/extensions-list.md) 插件。更多信息请参阅 [从 MS Project 导出与导入](guides/export-msproject.md) 文章。
 
:::

:::note
 对于 8.0 版本之前的 Gantt，请在页面中包含 **https://export.dhtmlx.com/gantt/api.js** 脚本以激活在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

**exportToMSProject()** 方法接受一个包含多个可选属性的对象:

- **name** - (*string*) 导出文件的文件名（默认为 'gantt.xml'）。
- **auto_scheduling** - (boolean) 设置导出项目中任务的调度模式。设为 **true** 表示任务为自动调度，设为 **false** 表示为手动调度（默认）。
- **skip_circular_links** - (boolean) 是否移除循环链接。**true**（默认）表示移除，**false** 表示保留。
- **project** - (object) 允许向导出项目实体添加自定义属性。
- **tasks** - (object) 允许向导出任务项添加自定义属性。
- **data** - (object) 允许指定用于输出甘特图的自定义数据源。**start_date** 和 **end_date** 应使用日期和时间格式（*%d-%m-%Y %H:%i*）。
- **callback** - (function) 用于接收生成的 XML 下载 URL 的回调函数。回调函数参数是一个包含 *url* 属性的 JSON 对象。
- **resources** - (array) 允许将资源列表导出到 MS Project 文件中。
- **server** - (string) 指定导出请求的 API 端点，适用于本地安装的导出服务。默认为 **https://export.dhtmlx.com/gantt**。

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

- **data** - 一个甘特图的 [数据对象](guides/supported-data-formats.md#json)，每个任务包含:*id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*。日期格式为 "%Y-%m-%d %H:%i"。
- **config** - 一个甘特图的 [配置对象](api/overview/properties-overview.md)，包含项目文件中的设置。
- **resources** - 资源对象数组，每个对象包含:\{*id: string, name:string, type:string*\}，代表项目文件中的资源。
- **worktime** - 包含项目日历工作时间设置的对象。

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

