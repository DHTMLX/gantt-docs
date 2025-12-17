---
sidebar_label: importFromMSProject
title: importFromMSProject method
description: "将 MS Project 的 XML 或 MPP 格式文件转换为 JSON"
---

# importFromMSProject

### Description

@short: 将 MS Project 的 XML 或 MPP 格式文件转换为 JSON

@signature: importFromMSProject: (config: any) =\> void

### Parameters

- `config` - (required) *object* - 包含导入文件配置设置的对象

### Example

~~~jsx
gantt.importFromMSProject({
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
- [Import MS Project file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_mpp.html)

### Details

:::note
 此方法需要支持 HTML5 File API。 
:::

:::note
 此方法属于 **export** 扩展的一部分，请确保启用 [export_api](guides/extensions-list.md) 插件。更多详情请参见 [从 MS Project 导出与导入](guides/export-msproject.md) 文章。

 
:::

:::note
 对于 8.0 版本之前的 Gantt，请在页面中引入 **https://export.dhtmlx.com/gantt/api.js** 脚本以激活在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

该方法接受一个包含导入文件配置选项的对象:

- **data** - 一个 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 实例，包含 MPP 或 XML 项目文件。
- **callback** - 导入完成后调用的函数。
- **durationUnit** - 指定预期的持续时间单位（"minute"、"hour"、"day"、"week"、"month"、"year"）。
- **projectProperties** - 一个数组，列出要包含在响应中的项目属性。
- **taskProperties** - 一个数组，列出要导入的额外任务属性。

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

- **data** - gantt 的 [数据对象](guides/supported-data-formats.md#json)。每个任务包含属性如 *id*、*open*、*parent*、*progress*、*start_date*、*text*、*resource*。日期格式为字符串，格式为 "%Y-%m-%d %H:%i"。
- **config** - gantt 的 [配置](api/overview/properties-overview.md) 对象，包含从项目文件中提取的设置。
- **resources** - 一个数组，包含项目文件中的资源对象，每个对象具有属性 \{*id:string, name:string, type:string* \}。
- **worktime** - 一个对象，保存项目日历中的工作时间设置。

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)

### Related Guides
- [从 MS Project 导出与导入](guides/export-msproject.md)

