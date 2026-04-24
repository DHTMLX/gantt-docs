---
sidebar_label: exportToExcel
title: exportToExcel method
description: "将甘特图中的数据导出到一个 Excel 文档"
---

# exportToExcel

### Description

@short: 将甘特图中的数据导出到一个 Excel 文档

@signature: exportToExcel: (_export_?: any) => void

### Parameters

- `export` - object - optional, 一个带有导出设置的对象（详见下文）

### Example

~~~jsx
gantt.exportToExcel({
    name: "document.xlsx", 
    columns:[
        { id: "text",  header: "Title", width: 150 },
        { id: "start_date",  header: "Start date", width: 250, type: "date" }
    ],
    server: "https://myapp.com/myexport/gantt",
    callback: (res) => {
        alert(res.url);
    },
    visual: true,
    cellColors: true,
    data: { },
    date_format: "dddd d, mmmm yyyy"
});
~~~

### Details

:::note
 此方法属于**export**扩展，请确保已激活[export_api](guides/extensions-list.md)插件。
更多详情请参阅[导出/导入 Excel，导出 iCal](guides/excel.md)文章。
 
:::

:::note
如果你使用的 Gantt 版本低于 8.0，需要在页面中引入 `https://export.dhtmlx.com/gantt/api.js` 以启用在线导出服务，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

The **exportToExcel()** 方法接受一个包含若干属性的对象作为参数（所有属性均为可选）：

- **name** - (*string*) 设置输出文件的名称，扩展名为 '.xlsx' 
- **columns** - (*array*) 允许配置输出的 Excel 工作表的列。列对象的属性包括：
    - **'id'** - (*string,number*) 将映射到列的事件属性
    - **'header'** - (*string*) 列头文本
    - **'width'** - (*number*) 列宽，单位为像素
    - **'type'** - (*string*) 列类型
- **server** - (*string*) 设置请求的 API 端点。可与导出服务的本地安装一起使用。默认值为 `https://export.dhtmlx.com/gantt`
- **callback** - (*function*) 如果你希望接收下载生成的 XLSX 文件的 URL，可以使用 callback 属性。它接收一个包含 url 属性的 JSON 对象
- **visual** - (*boolean*) 将时间轴图添加到导出的 Excel 文档中；默认值为 false。有关如何将任务颜色添加到导出的文件，请参阅 [如何向导出文件添加任务颜色](guides/excel.md#adding-colors-of-tasks-to-export)
- **cellColors** - (*boolean*) 如果设置为 true，导出文档的单元格将具有由 [](api/template/timeline_cell_class.md) 模板定义的颜色，导出的将是 *color* 与 *background-color* 属性
- **data** - (*object*) 设置在导出甘特图中显示的自定义数据源
- **date_format** - (*string*) 设置导出 Excel 文档中日期的显示格式。可以使用以下格式代码：

~~~css
table.my_table {
    width: 70%;
    padding: 0 20px;
}
table.my_table tr td {
    text-align: left;
    vertical-align: middle;
    width: 35%;
    border-bottom: 1px solid grey;
}
table.my_table td.version_info {
    text-align: left;
    font-weight: bold;
}
~~~

格式代码输出：

<table class="my_table">
<tr><td class="version_info">Format code</td><td class="version_info">Output</td></tr>
<tr><td>d</td><td>9</td></tr>
<tr><td>dd</td><td>09</td></tr>
<tr><td>ddd</td><td>Mon</td></tr>
<tr><td>dddd</td><td>Monday</td></tr>
<tr><td>mm</td><td>01</td></tr>
<tr><td>mmm</td><td>Jan</td></tr>
<tr><td>mmmm</td><td>January</td></tr>
<tr><td>mmmmm</td><td>J</td></tr>
<tr><td>yy</td><td>12</td></tr>
<tr><td>yyyy</td><td>2021</td></tr>
<tr><td>mm/dd/yyyy</td><td>01/09/2021</td></tr>
<tr><td>m/d/y</td><td>1/9/21</td></tr>
<tr><td>ddd, mmm d</td><td>Mon, Jan 9</td></tr>
<tr><td>mm/dd/yyyy h:mm AM/PM</td><td>01/09/2021 6:20 PM</td></tr>
<tr><td>dd/mm/yyyy hh:mm:ss</td><td>09/01/2012 16:20:00</td></tr>
</table>

#### Default date parameters

导出模块期望 start_date 与 end_date 列具有 Date 类型，duration 列具有 number 类型。

在应用 [自定义模板](guides/specifying-columns.md#datamappingandtemplates) 时，需返回期望类型的值，或在列配置的 **name** 属性中定义不同的值。例如：

~~~jsx {7,10-12}
gantt.config.columns = [
    ...
    { name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor },
    { name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor },
    { name: "duration_formatted", 
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: (task) => { 
            return formatter.format(task.duration_formatted); 
        }
    },
    ...
];
~~~

否则，Gantt 数据将不会被导出。 [查看相关示例](https://snippet.dhtmlx.com/q1lhyvt3)。

### Related API

- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides

- [Export/Import for Excel, Export to iCal](guides/excel.md)