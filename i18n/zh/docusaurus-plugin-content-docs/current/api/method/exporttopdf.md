---
sidebar_label: exportToPDF
title: exportToPDF method
description: "将甘特图导出为 PDF 文件"
---

# exportToPDF

### Description

@short: 将甘特图导出为 PDF 文件

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 可选，包含导出设置（详见下文）

### Example

~~~jsx
gantt.exportToPDF();
 
//或者
gantt.exportToPDF({
  name: "mygantt.pdf"
});

gantt.exportToPDF({
    name:"mygantt.pdf",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    locale:"en",
    start:"01-04-2013",
    end:"11-04-2013",
    skin:'terrace',
    data:{ },
    server:"https://myapp.com/myexport/gantt",
    raw:true,
    callback: function(res){
        alert(res.url);
    }
});
~~~

### Details

:::note
 此方法属于 **export** 扩展，因此请确保激活了 [export_api](guides/extensions-list.md) 插件。更多信息请参见 [导出为 PDF 和 PNG](guides/export.md) 文章。 
:::

:::note
 对于 8.0 之前的 Gantt 版本，您需要在页面中引入 **https://export.dhtmlx.com/gantt/api.js** 来启用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

[exportToPDF](api/method/exporttopdf.md) 方法接受一个对象参数，包含多种可选属性:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 导出 PDF 的文件名</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) 应用于导出甘特图的主题</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) 设置导出甘特图中使用的语言</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) 定义导出图表中显示数据范围的起始日期。日期格式遵循 [date_format](api/config/date_format.md) 的设置</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) 定义导出图表中显示数据范围的结束日期。日期格式遵循 [date_format](api/config/date_format.md) 的设置</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) 允许指定导出图表的自定义数据源</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 作为导出 PDF 页眉的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 作为导出 PDF 页脚的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 处理导出请求的 API 端点 URL。可用于本地导出服务。默认值为 <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) 如果为 true，则精确导出甘特图的 markup，包括自定义元素。默认为 <em>false</em>。[更多详情](guides/export.md#daochuzidingyibiaojiheyangshi)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) 接收包含下载生成 PDF 文件 URL 的 JSON 对象的回调函数</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 额外设置，可包含:
  <ul><li><b>format</b> - (<i>string</i>) 输出文件格式:<i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li><li><b>landscape</b> - (<i>boolean</i>) 设置纵向或横向打印；仅在指定了 "format" 时生效</li><li><b>width</b> - (<i>string|number|"content"</i>) 页面宽度，导出多页时使用</li><li><b>height</b> - (<i>string|number|"content"</i>) 页面高度，导出多页时使用</li><li><b>merge_pages</b> - (<i>boolean</i>) 启用多页导出为单个文件；为 false 时，需要多次导出以覆盖所有数据</li><li><b>fixed_headers</b> - (<i>boolean</i>) 在每页显示 grid 和 timeline 的表头；默认为 false，且需启用 <b>merge_pages</b></li></ul></td>
  </tr>
  </tbody>
</table>

## 时间限制

:::note
 导出服务有时间限制。 
:::

如果导出时间超过 20 秒，导出过程将被取消，并显示以下错误:

~~~html
Error: Timeout trigger 20 seconds
~~~

如果多个用户同时导出甘特图，可能导致过程比平时更长。但每个用户的导出时间是单独计算的。

:::note
 对于大型图表导出，建议使用[独立导出模块](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。该模块随 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 许可证免费提供，也可单独购买，详见 [这里](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。 
:::

## 多页导出

请注意，导出模块无法:

- 控制分页位置，任务可能被拆分到不同页面
- 在每页显示刻度而不重叠任务
- 在每页显示页眉和页脚而不重叠任务行

这些需要自定义解决方案。以下提供一些示例。

## 自动导出多页到单个文件

若要将多页导出合并为单个文件，可使用在线导出服务（受[时间限制](#timerestrictions)约束）或无时间限制的独立[导出模块](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。
只需在 **additional_settings** 中设置 **merge_pages** 选项:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, /*!*/
        format: "A4"
    }
});
~~~

在线导出服务适合较小甘特图。对于大型图表，数据可能分批导出。此时，您可以[进行多次手动导出](#manual_export)或使用独立导出模块，它能处理所有数据并生成包含所有页面的单一文件。

:::note
Sample: [多页导出到单个文件示例](https://snippet.dhtmlx.com/2qzecnke) 
:::

请注意，多页导出比单页导出耗时更长。为加快速度，可调整缩放级别至周、月或年，减少甘特图宽度和导出时间。

详情请见[相关文章](https://dhtmlx.com/blog/maintenance-release-pdf-export-module-gantt-0-6-4-scheduler-0-6-5-suite-8-3-10-kanban-1-5-12/#:~:text=Multipage%20Export%20in%20One%20PDF%20File)。

### 手动多次导出 {#manual_export}

由于甘特图通常宽度超过标准页面尺寸，导出时每次只捕获最左侧部分。
要导出全部数据，需要多次导出，每次将图表向左移动。

要在导出文件中移动甘特图，可通过 **header** 参数为 **#gantt_here** 添加如下样式规则:

~~~js
const width = 1000;
const height = 1000;
const total_width = gantt.$task_bg.scrollWidth + gantt.$grid.scrollWidth;

for (let i = 0; i < total_width; i += width) {
  gantt.exportToPDF({
    header:`<style>#gantt_here{left:-${i}px;position: absolute;}</style>`,
    //raw: true,
    additional_settings:{
      width: width,
      height: height,
    }
  });
}
~~~

:::note
Sample: [指定大小导出示例 ](https://snippet.dhtmlx.com/zbhc506m) 
:::

如果导出为特定格式如 'A3'，请注意文件格式单位为毫米，而 HTML 尺寸为像素。
您需要将毫米转换为像素作为偏移值:

~~~js
const widthMM = 297;
const width = widthMM / (25.4 inch / 96 PDF PPI);
~~~

:::note
Sample: [指定格式导出示例](https://snippet.dhtmlx.com/qt54zfuw ) 
:::

<br>
**注意:** 如果多页导出只生成一个 PDF 文件，可能是浏览器阻止了弹窗，因为多次导出会同时打开多个弹窗。
请启用弹窗后重试导出。

![blocked_popup](/img/popup_blocked.png)


## 在每页显示 timeline 和 grid 表头

要在导出文件的每一页显示 timeline 和 grid 的表头，请在 **additional_settings** 中启用 **fixed_headers** 选项。
此功能仅在启用 **merge_pages** 时有效:

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true,  /*!*/
        fixed_headers: true,  /*!*/
        format: "A4"
    }
});
~~~

:::note
Sample: [多页导出，每页带表头示例 ](https://snippet.dhtmlx.com/w905ht5t) 
:::

:::note
Sample: [资源面板视图多页导出，每页带表头示例 ](https://snippet.dhtmlx.com/xkmvduu5) 
:::

若不使用配置，例如导出多个文件后手动合并，可使用以下 CSS:

~~~css
.grid_cell .gantt_grid_scale,
.timeline_cell .gantt_task_scale {
  position: fixed;
  top:0;
  z-index:99999;
}
~~~

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [导出为 PDF 和 PNG](guides/export.md)
- [操作指南](guides/how-to.md)

