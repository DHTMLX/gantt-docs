---
title: "导出/导入 Excel，导出 iCal"
sidebar_label: "导出/导入 Excel，导出 iCal"
---

# 导出/导入 Excel，导出 iCal


dhtmlxGantt 库支持将甘特图数据导出为 Excel 和 iCal 格式。同时也支持从 Excel 文件导入数据到甘特图中。

:::note
该导出服务可免费使用，但在 GPL 许可下生成的 Excel/iCal 文件将包含库的水印。
如果您购买了许可证，在支持有效期内（所有 PRO 许可证为 12 个月），导出文件将不包含水印。
:::

您可以在本地计算机上安装多个导出服务，以便将甘特图导出为 Excel 或 iCal 文件。
请注意，这些导出服务未随 Gantt 包一起提供。
更多详情请参阅[相关文档](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)以了解使用条款。

## 在线导出服务限制


:::note
导出服务对处理时间和请求大小有限制。
:::

### 时间限制

如果导出过程超过 20 秒，将会被中止，并显示如下错误:

~~~html
Error: Timeout trigger 20 seconds
~~~

如果有多个用户同时导出甘特图，处理时间可能会比平时更长。但每个用户的导出请求时间是单独计算的。

### 请求大小限制

主 API 端点 **https://export.dhtmlx.com/gantt** 处理所有导出方法（如 *exportToPDF*、*exportToPNG*、*exportToMSProject* 等）。此端点的最大请求大小为 **10 MB**。

还有一个专用 API 端点 **https://export.dhtmlx.com/gantt/project**，用于 [MSProject](guides/export-msproject.md) 和
[Primavera P6](guides/export-primavera.md)
的导出/导入服务（*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*）。该端点最大请求大小为 **40 MB**。

## 使用导出模块


:::note
如需导出大型甘特图，建议使用[独立导出模块](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。
如果您拥有 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 许可证，则该模块免费。否则可以单独[购买](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。
:::

关于 PDF 导出模块的使用详情请参考:[PDF 导出模块](guides/pdf-export-module.md)。该模块支持导出为 PDF、PNG、Excel 和 iCal 格式。

## 导出为 Excel


要将甘特图数据导出为 Excel 文件，请执行以下步骤:

- 通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件:
~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
对于 8.0 之前的 Gantt 版本，请在页面中引入 **https://export.dhtmlx.com/gantt/api.js** 脚本以启用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 使用 [exportToExcel](api/method/exporttoexcel.md) 方法导出甘特图数据:

~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


[Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)
  
  

#### 导出方法的参数

**exportToExcel()** 方法可以接收一个可选对象，包含如下属性:

- **name** - (*string*) 设置导出文件名（含 .xlsx 扩展名）。
- **columns** - (*array*) 配置 Excel 表中的列。每个列对象可包含:
    - **'id'** - (*string,number*) 映射到该列的事件属性
    - **'header'** - (*string*) 列表头文本
    - **'width'** - (*number*) 列宽（像素）
    - **'type'** - (*string*) 列数据类型
- **server** - (*string*) 指定导出请求的 API 端点。如果您本地安装了导出服务可用此参数。默认为 **https://export.dhtmlx.com/gantt**
- **callback** - (*function*) 回调函数，接收包含 *url* 属性的 JSON 对象，用于下载生成的 XLSX 文件
- **visual** - (*boolean*) 是否在导出的 Excel 文件中包含时间线图表。默认为 *false*
- **cellColors** - (*boolean*) 若为 *true*，导出文件中的单元格将包含由 [timeline_cell_class](api/template/timeline_cell_class.md) 模板定义的颜色，导出 *color* 和 *background-color* 样式
- **data** - (*object*) 允许指定要导出的自定义数据源（而非当前甘特图数据）
- **date_format** - (*string*) 定义导出 Excel 文件使用的日期格式。支持格式列表详见[此处](api/method/exporttoexcel.md)。        

**调用导出方法并使用可选属性的示例**
~~~js
gantt.exportToExcel({
    name:"document.xlsx", 
    columns:[
        { id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250, type:"date" }
    ],
    server:"https://myapp.com/myexport/gantt",
    callback: function(res){
        alert(res.url);
    },
    visual:true,
    cellColors:true,
    data:{},
    date_format: "dddd d, mmmm yyyy"
});
~~~

#### 默认日期参数

导出模块期望 **start_date** 和 **end_date** 列为 *Date* 类型，**duration** 列为 *number* 类型。

如果使用了[自定义模板](guides/specifying-columns.md#shujuyingsheyumoban)，请确保返回值与期望类型一致，或在列配置的 **name** 字段中指定不同的属性名。例如:

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

否则，甘特图数据将无法正确导出。[相关示例见此](https://snippet.dhtmlx.com/q1lhyvt3)。

### 为导出设置自定义数据源

如需基于自定义数据集（非当前甘特图数据）导出甘特图，请在 [exportToExcel](api/method/exporttoexcel.md) 方法参数对象中使用 **data** 属性:

~~~js
gantt.exportToExcel({   
    name:"document.xlsx", 
    data:[
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
        {id:2, text:"Task #1", start_date:"02-04-2020",duration:8, parent:1},
        {id:3, text:"Task #2", start_date:"11-04-2020",duration:8, parent:1}
    ]      
});
~~~

:::note
请注意，**data** 参数应为数据对象，而不是 URL 字符串。
:::

### 导出时添加任务颜色

如需在导出的 Excel 文件中包含任务颜色，请将 **visual** 属性设置为 *"base-colors"*:

~~~js
gantt.exportToExcel({
    visual: "base-colors", /*!*/
    cellColors: true
})
~~~


**Related example:** [导出任务颜色](https://snippet.dhtmlx.com/t2znjrfj)


## 从 Excel 导入


由于不支持自动将任意 Excel 列映射到甘特图数据模型，导出服务会将 Excel 文档转换为 JSON 格式的行数组返回。
将该数据转换为甘特图格式需由开发者自行处理。

要转换 Excel 文件，请向导出服务发送如下请求:

- 请求 URL - **https://export.dhtmlx.com/gantt**
- 请求方法 - **POST**
- Content-Type - **multipart/form-data**

请求参数:

- **file** - 要上传的 Excel 文件
- **type** - 设置为 "excel-parse"
- **data** - (*可选*) 包含额外设置的 JSON 字符串

表单示例:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="excel-parse">
    <button type="submit">Get</button>
</form>
~~~

或者，您可以使用[客户端 API](api/method/importfromexcel.md):

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
        console.log(project)
    }
});
~~~


[Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)


这里的 *file* 为 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 对象，代表一个 Excel (xlsx) 文件。

:::note
**gantt.importFromExcel** 需要支持 HTML5 File API。
:::


### 响应

响应为对象数组的 JSON 格式:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

说明:

- 第一行的值作为导入对象的属性名。
- 每一后续行转换为一个独立对象。
- 日期格式为 "%Y-%m-%d %H:%i"。


### 导入设置

- 导入服务要求第一行为包含列名的表头行。
- 默认处理 Excel 文件中的第一个工作表。如需指定其他工作表，可使用 **sheet** 参数（从 0 开始计数）:

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    sheet:2, // 处理第三个工作表
    callback: function (rows) {}
});
~~~


## 导出为 iCal


要将甘特图数据导出为 iCal 字符串，请执行以下步骤:

- 通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件:
~~~js
gantt.plugins({
      export_api: true
});
~~~

- 使用 [exportToICal](api/method/exporttoical.md) 方法导出数据:

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


[Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)


#### 导出方法的参数

[exportToICal()](api/method/exporttoical.md) 方法可以接收一个可选对象，包含如下属性:

- **server** - (*string*) 指定请求的 API 端点。适用于本地导出服务安装。默认为 **https://export.dhtmlx.com/gantt**。
- **name** - (*string*) 允许设置自定义文件名和扩展名，但文件格式仍为 iCal。
  
**调用导出方法并使用可选属性的示例**
~~~js
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

