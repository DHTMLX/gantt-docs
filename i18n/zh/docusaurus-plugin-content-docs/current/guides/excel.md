---
title: "Excel 的导出/导入，iCal 的导出"
sidebar_label: "Excel 导出/导入，iCal 导出"
---

# Excel 的导出/导入，iCal 的导出

dhtmlxGantt 库允许将甘特图数据导出为 Excel 和 iCal 格式。你也可以从 Excel 文件将数据导入到甘特图中。

:::note
该服务是免费的，但输出的 Excel/iCal 文件在 GPL 许可下会包含本库的水印。若购买许可，在有效的技术支持期内（所有 PRO 许可证为 12 个月），导出的结果将不带水印。
:::

有多种导出服务可用。你可以在本地计算机上安装它们，并将甘特图导出为 Excel 或 iCal。本地导出服务并不包含在 Gantt 包中，请阅读 [相应文章](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 以了解每种服务的使用条款。

## 在线导出服务的限制

:::note
导出服务对时间和请求大小有限制。
:::

### 时间限制

如果处理时间超过 20 秒，导出将被取消，并出现以下错误：

~~~html
Error: Timeout trigger 20 seconds
~~~

若多人同时导出甘特图，处理时间可能比平时长一些。但这也没关系，因为针对某个用户的导出请求所花费的时间是分开统计的。

### 请求大小限制

存在一个通用的 API 端点 `https://export.dhtmlx.com/gantt`，用于所有导出方法（*exportToPDF*、*exportToPNG*、*exportToMSProject* 等）。**最大请求大小为 10 MB**。

另有一个专用端点 `https://export.dhtmlx.com/gantt/project`，专用于 [MSProject](guides/export-msproject.md) 与 
[Primavera P6](guides/export-primavera.md) 的导出/导入服务（仅有 *exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*）。**最大请求大小：40 MB**。

## 使用导出模块

:::note
如果你需要导出较大图表，可以使用一个 [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。 
如果你在 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 授权下获得了 Gantt，导出模块可免费使用，或你也可以 [单独购买模块](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。
:::

[更多关于导出模块用于 PDF 的用法](guides/pdf-export-module.md) 的信息。该导出模块可将数据导出为 PDF、PNG、Excel 及 iCal 文件。

## 导出到 Excel

要将甘特图的数据导出到 Excel 文档，请执行以下操作：

- 要使用导出/导入功能，请通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件：
~~~js
gantt.plugins({
    export_api: true
});
~~~

它允许你使用在线导出服务或本地导出模块。

:::note
如果你使用的 Gantt 版本低于 8.0，需要在页面中包含 `https://export.dhtmlx.com/gantt/api.js` 以启用导出功能，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 调用 [exportToExcel](api/method/exporttoexcel.md) 方法以从 Gantt 图导出数据到 Excel：

~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**相关示例**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**相关示例**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)
  
  

#### 导出方法的参数

**exportToExcel()** 方法的参数是一个包含若干属性的对象（所有属性均为可选）：

- **name** - (*string*) 设置输出文件的名称，扩展名为 '.xlsx' 
- **columns** - (*array*) 允许配置输出的 Excel 工作表列。列对象的属性包括：
    - **'id'** - (*string,number*) 将映射到该列的事件属性
    - **'header'** - (*string*) 列头
    - **'width'** - (*number*) 列宽（像素）
    - **'type'** - (*string*) 列类型
- **server** - (*string*) 设置请求的 API 端点。可用于本地安装的导出服务。默认值为 `https://export.dhtmlx.com/gantt`
- **callback** - (*function*) 如果你希望收到用于下载生成的 XLSX 文件的 URL，可以使用 callback 属性。它会接收一个具有 url 属性的 JSON 对象
- **visual** - (*boolean*) 在导出的 Excel 文档中添加时间线图。默认值为 false
- **cellColors** - (*boolean*) 如果设为 true，导出文档的单元格将具有由 [timeline_cell_class](api/template/timeline_cell_class.md) 模板定义的颜色，导出 color 与 background-color 属性
- **data** - (*object*) 设置在导出的甘特图中展示的自定义数据源
- **date_format** - (*string*) 设置在导出的 Excel 文档中日期的显示格式。你可以在这里看到可用格式代码的完整列表 [这里](api/method/exporttoexcel.md)。        

~~~jsx title="Calling the export method with optional properties" 
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

#### 默认日期参数

导出模块期望 **start_date** 和 **end_date** 列为 *Date* 类型，且 **duration** 列为 *number* 类型。 

在应用 [自定义模板](guides/specifying-columns.md#datamappingandtemplates) 时，必须返回期望类型的值，或在列配置的 **name** 属性中定义不同的值。例如：

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

否则，Gantt 数据将无法导出。 [查看相关示例](https://snippet.dhtmlx.com/q1lhyvt3)。

### 设置自定义数据源进行导出

要使用自定义数据集导出甘特图（即不使用初始甘特图中显示的数据），请在 [exportToExcel](api/method/exporttoexcel.md) 方法的参数中使用 **data** 属性：

~~~js
gantt.exportToExcel({   
    name: "document.xlsx", 
    data: [
        { id: 1, text: "Project #1", start_date: "01-04-2026", duration: 18},
        { id: 2, text: "Task #1", start_date: "02-04-2026", duration: 8, parent: 1},
        { id: 3, text: "Task #2", start_date: "11-04-2026", duration: 8, parent: 1}
    ]      
});
~~~

:::note
请注意，不能将 URL 作为 data 参数的值来使用，只能使用数据对象。
:::

### 导出任务颜色

你可以通过将 exportToExcel 的 **visual** 属性设为 *"base-colors"*，将任务颜色导出到 Excel 文件中：

~~~js
gantt.exportToExcel({
    visual: "base-colors", 
    cellColors: true
})
~~~

**相关示例**: [Export colors of tasks](https://snippet.dhtmlx.com/t2znjrfj)

## 从 Excel 导入 {#importfromexcel}

由于无法将 Excel 文档中的任意列自动映射到甘特图数据模型，导出服务会将文档转换为行数组，并以 JSON 形式返回。将结果文档转换为甘特图数据的工作由最终开发者自行完成。

要转换 Excel 文件，需要向导出服务发送以下请求：

- 请求 URL - `https://export.dhtmlx.com/gantt`
- 请求方法 - **POST**
- 内容类型 - **multipart/form-data**

请求参数为：

- **file** - 一个 Excel 文件
- **type** - "excel-parse"
- **data** - (*optional*) 包含设置的 JSON 字符串

例如：

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="excel-parse">
    <button type="submit">Get</button>
</form>
~~~

或者，你也可以使用 [客户端 API](api/method/importfromexcel.md)：

~~~js
gantt.importFromExcel({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: (project) => {
        console.log(project)
    }
});
~~~


**相关示例**: [Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)


其中 *file* 是一个包含 Excel（xlsx）文件的 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 实例。

:::note
**gantt.importFromExcel** 需要对 HTML5 File API 的支持。
:::


### 响应

响应将包含一个包含对象数组的 JSON：

~~~js
[
   { "Name": "Task Name", "Start": "2026-04-11 10:00", "Duration": 8 },
   ...
]
~~~

其中：

- 第一行的值将被用作导入对象的属性名。
- 每一行都会被序列化为一个单独的对象。
- 日期值将以 "%Y-%m-%d %H:%i" 的格式进行序列化。


### 导入设置

- 导入服务期望导入工作表的第一行是包含列名的标题行。
- 默认情况下，服务返回文档的第一张工作表。若要返回不同的工作表，请使用 **sheet** 参数（基于零的索引）。

~~~js
gantt.importFromExcel({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    sheet: 2, // 打印第三张工作表
    callback: (rows) => {}
});
~~~


## 导出到 iCal

要将甘特图的数据导出为 iCal 字符串，请执行以下操作：

- 要使用在线导出服务，请通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件：

~~~js
gantt.plugins({
    export_api: true
});
~~~

- 调用 [exportToICal](api/method/exporttoical.md) 方法将数据从甘特图导出为 iCal： 

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**相关示例**: [Export data: MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**相关示例**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)


#### 导出方法的参数

[exportToICal()](api/method/exporttoical.md) 方法的参数是一个包含以下属性（可选）的对象：

- **server** - (*string*) 设置请求的 API 端点。可用于本地安装的导出服务。默认值为 `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) 允许为文件指定自定义名称和扩展名，但文件仍将以 iCal 的格式导出。
  
~~~jsx title="Calling the export method with optional properties"
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~