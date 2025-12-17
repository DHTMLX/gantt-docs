---
sidebar_label: importFromPrimaveraP6
title: importFromPrimaveraP6 method
description: "将 Primavera P6 的 XML 或 XER 文件转换为 JSON 格式"
---

# importFromPrimaveraP6

### Description

@short: 将 Primavera P6 的 XML 或 XER 文件转换为 JSON 格式

@signature: importFromPrimaveraP6: (config: any) =\> void

### Parameters

- `config` - (required) *object* - 包含导入文件配置选项的对象

### Example

~~~jsx
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }                    
            gantt.parse(project.data);
        }
     }
});
~~~

### Related samples
- [Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)

### Details

:::note
ote 该方法需要支持 HTML5 File API。 
:::

:::note
 该方法属于 **export** 扩展的一部分，因此必须启用 [export_api](guides/extensions-list.md#daochufuwu) 插件。更多详情请参见 [从 Primavera P6 导出和导入](guides/export-primavera.md#congprimaverap6daoru) 文章。 
:::

:::note
 对于早于 8.0 版本的 Gantt，需要在页面中引入 **https://export.dhtmlx.com/gantt/api.js** 来启用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

此方法接受一个包含导入文件配置选项的对象:

- **data** - 一个包含 XER 或 XML 项目文件的 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 实例。
- **callback** - 导入完成后调用的回调函数。
- **durationUnit** - 设置预期的持续时间单位（"minute"、"hour"、"day"、"week"、"month"、"year"）。
- **projectProperties** - 需要包含在响应中的项目属性数组。
- **taskProperties** - 需要导入的额外任务属性数组。

## Response

响应将是一个结构如下的 JSON 对象:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - gantt 的 [数据对象](guides/supported-data-formats.md#json)，其中每个任务包含 *id*、*open*、*parent*、*progress*、*start_date*、*text*、*resource* 等属性。日期格式为字符串，格式为 "%Y-%m-%d %H:%i"。
- **config** - gantt 的 [配置](api/overview/properties-overview.md) 对象，包含从项目文件中提取的设置。
- **resources** - 表示项目文件中资源的对象数组，每个对象包含 *id*、*name* 和 *type*。
- **worktime** - 包含项目日历工作时间设置的对象。

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [从 Primavera P6 导出和导入](guides/export-primavera.md)

