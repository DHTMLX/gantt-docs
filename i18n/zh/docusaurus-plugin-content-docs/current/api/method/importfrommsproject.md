---
sidebar_label: importFromMSProject
title: importFromMSProject 方法
description: "将一个 XML 或 MPP MS Project 文件转换为 JSON"
---

# importFromMSProject

### Description

@short: 将一个 XML 或 MPP MS Project 文件转换为 JSON

@signature: importFromMSProject: (config: any) =\> void

### Parameters

- `config` -（必填）*object* - 包含导入文件配置属性的对象

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
   worktime: {},
   calendars: []
}
~~~

- **data** - (*object*) 一个 gantt [data object](guides/supported-data-formats.md)。每个任务具有以下属性：*id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*。日期将以 "%Y-%m-%d %H:%i" 格式转换为字符串。
- **config** - (*object*) 一个 gantt [configuration](api/overview/properties-overview.md) 对象，包含从项目文件中检索到的设置。
- **resources** - (*array*) 一个对象数组（每个对象具有以下属性： \{*id: string, name: string, type: string, calendar: string*\}），表示项目文件中的资源列表。
- **worktime** - (*object*) 一个包含项目日历工作时间设置的对象。它可以包含以下属性：
    - **id** - (*string | number*) 可选，日历 ID
    - **hours** - (*array*) 一个包含全局工作时间的数组，用于设置任务的开始和结束时间
    - **dates** - (*array*) 一个包含日期的数组，可以包含：
        - 一周的七天（从 0 - 星期日，到 6 - 星期六），其中 1/true 表示工作日，0/false 表示非工作日
        - 其他记录为日期 
- **calendars** - (*array*) 一个包含用于创建新日历的日历配置对象的数组。
    - **calendarConfig** - (*object*) 一个日历配置对象，可以包含以下属性：
      - **id** - (*string | number*) 可选，日历 ID
      - **name** - (*string*) 日历名称
      - **hours** - (*array*) 一个包含全局工作时间的数组，用于设置任务的开始和结束时间
      - **dates** - (*array*) 日期数组，可以包含：
            - 一周的七天（从 0 - 星期日，到 6 - 星期六），其中 1/true 表示工作日，0/false 表示非工作日
            - 其他记录为日期

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)

### Related Guides
- [Export and Import from MS Project](guides/export-msproject.md#import-from-ms-project)