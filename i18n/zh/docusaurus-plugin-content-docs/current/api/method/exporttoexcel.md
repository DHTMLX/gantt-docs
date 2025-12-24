---
sidebar_label: exportToExcel
title: exportToExcel method
description: "将甘特图中的数据导出为Excel文件"
---

# exportToExcel

### Description

@short: 将甘特图中的数据导出为Excel文件

@signature: exportToExcel: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 可选，包含导出设置的对象（详情见下文）

### Example

~~~jsx
gantt.exportToExcel({
    name:"document.xlsx", 
    columns:[
        { id:"text",  header:"标题", width:150 },
        { id:"start_date",  header:"开始日期", width:250, type:"date" }
    ],
    server:"https://myapp.com/myexport/gantt",
    callback: function(res){
        alert(res.url);
    },
    visual:true,
    cellColors:true,
    date_format: "dddd d, mmmm yyyy"
});
~~~

### Details

:::note
 此方法属于**export**扩展，请确保已激活[export_api](guides/extensions-list.md)插件。
更多详情请参阅[导出/导入 Excel，导出 iCal](guides/excel.md)文章。
 
:::

:::note
 对于8.0之前的Gantt版本，请在页面中引入**https://export.dhtmlx.com/gantt/api.js**脚本以启用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

**exportToExcel()** 方法接受一个包含若干可选属性的对象:

- **name** - (*string*) 设置输出文件的文件名，需包含".xlsx"扩展名
- **columns** - (*array*) 定义生成Excel表格的列。每个列对象可以包含:
    - **'id'** - (*string,number*) 映射到该列的事件属性
    - **'header'** - (*string*) 列头文本
    - **'width'** - (*number*) 列宽，单位为像素
    - **'type'** - (*string*) 列数据类型
- **server** - (*string*) 导出请求的API端点URL。当使用本地导出服务时非常有用。默认值为 **https://export.dhtmlx.com/gantt**
- **callback** - (*function*) 用于接收生成的XLSX文件URL的回调函数。回调函数将接收一个包含url属性的JSON对象
- **visual** - (*boolean*) 是否在导出的Excel文件中包含时间线图，默认为*false*。详情请参见[如何添加任务颜色](guides/excel.md)
- **cellColors** - (*boolean*) 若为true，导出文件中的单元格将应用由[timeline_cell_class](api/template/timeline_cell_class.md)模板定义的颜色，导出*color*和*background-color*属性
- **data** - (*object*) 指定用于输出甘特图的自定义数据源
- **date_format** - (*string*) 定义导出Excel文档中使用的日期格式。支持以下格式代码:


<table class="my_table">
<tr><td class="version_info">格式代码</td><td class="version_info">输出示例</td></tr>

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

## 默认日期参数

导出模块期望**start_date**和**end_date**列为*Date*类型，**duration**列为*number*类型。

当使用[自定义模板](guides/specifying-columns.md)时，应返回预期类型的值，或在列配置的**name**字段中指定不同的属性。例如:

~~~js

gantt.config.columns = [
    ...
    {name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor},
    {name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor},
    {name: "duration_formatted", /*!*/
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: function(task){ /*!*/
            return formatter.format(task.duration_formatted); /*!*/
        }
    },
    ...
];
~~~

否则，甘特数据将无法正确导出。[参见相关示例](https://snippet.dhtmlx.com/q1lhyvt3)。

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
- [导出/导入 Excel，导出 iCal](guides/excel.md)

