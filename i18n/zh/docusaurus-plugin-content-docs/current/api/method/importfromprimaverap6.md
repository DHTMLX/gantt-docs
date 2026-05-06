---
sidebar_label: importFromPrimaveraP6
title: importFromPrimaveraP6 method
description: "将 XML 或 XER Primavera P6 文件转换为 JSON"
---

# importFromPrimaveraP6

### Description

@short: 将 XML 或 XER Primavera P6 文件转换为 JSON

@signature: importFromPrimaveraP6: (config: any) => void

### Parameters

- `config` - (required) *object* - 一个包含导入文件配置属性的对象

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

### Details

:::note
该方法需要 HTML5 File API 的支持。
:::

:::note
该方法在 **export** 扩展中定义，因此需要激活 [export_api](guides/extensions-list.md#export-service) 插件。请在 [Export/Import for Excel, Export to iCal](guides/excel.md#importfromexcel) 文章中阅读详情。
:::

:::note
如果您使用的 Gantt 版本早于 8.0，请在页面中包含 **https://export.dhtmlx.com/gantt/api.js** 以启用在线导出服务，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

该方法的参数是一个包含导入文件配置属性的对象：

- **data** - (*object*) 一个 gantt [data object](guides/supported-data-formats.md)。每个任务具有以下属性：*id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*。日期以 "%Y-%m-%d %H:%i" 格式字符串化。
- **callback** - (*function*) 回调函数。
- **durationUnit** - (*string*) 设置期望的持续单位（"minute", "hour", "day", "week", "month", "year"）。
- **projectProperties** - (*array*) 指定应放入响应中的项目属性数组。
- **taskProperties** - (*array*) 指定要导入的附加任务属性数组。

请在 [相关部分](guides/export-primavera.md#import-settings) 查看导入设置的详细描述。

## Response

响应将包含以下结构的 JSON：

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {},
    calendars: []
}
~~~

- **data** - (*object*) 一个 gantt [data object](guides/supported-data-formats.md)。每个任务具有以下属性：*id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*。日期以 "%Y-%m-%d %H:%i" 格式字符串化。
- **config** - (*object*) 一个 gantt [configuration](api/overview/properties-overview.md) 对象，包含从项目文件检索到的设置。
- **resources** - (*array*) 一个包含对象的数组（每个对象具有以下属性：\{*id: string, name: string, type: string, calendar: string*\}，表示项目文件中的资源列表）。
- **worktime** - (*object*) 一个包含来自项目日历的工作时间设置的对象。它可能包含以下属性：
    - **id** - (*string | number*) 可选，日历 ID
    - **hours** - (*array*) 包含全局工作时段的数组，设定任务的开始和结束小时
    - **dates** - (*array*) 一个日期数组，可能包含：
        - 周内的 7 天（从 0 - 周日，到 6 - 周六），其中 1/true 表示工作日，0/false 表示非工作日
        - 其他记录是日期
- **calendars** - (*array*) 一个包含创建新日历的日历配置对象的数组。 
    - **calendarConfig** - (*object*) 一个日历配置对象，可能包含以下属性：
      - **id** - (*string | number*) 可选，日历 ID
      - **name** - (*string*) 日历名称
      - **hours** - (*array*) 包含全局工作时段的数组，设置任务的开始和结束时间
      - **dates** - (*array*) 一个日期数组，可能包含：
            - 周内的 7 天（从 0 - 周日，到 6 - 周六），其中 1/true 表示工作日，0/false 表示非工作日
            - 其他记录是日期

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)
- [importFromExcel](api/method/importfromexcel.md)

### Related Guides
- [Export and Import from Primavera P6](guides/export-primavera.md#import-from-primavera-p6)