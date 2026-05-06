---
sidebar_label: exportToPDF
title: exportToPDF 方法
description: "将甘特图导出为 PDF 格式"
---

# exportToPDF

### Description

@short: 将甘特图导出为 PDF 格式

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters

- `export`	- object - optional, 带有导出设置的对象（请见详情）

### Example

~~~jsx
gantt.exportToPDF();
 
//或
gantt.exportToPDF({
  name: "mygantt.pdf"
});

gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: { },
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});
~~~

### Details

:::note
该方法在 **export** 扩展中定义，因此您需要激活 [export_api](guides/extensions-list.md#export-service) 插件。请在 [](guides/export.md) 文章中阅读详细信息。
:::

:::note
注：如果您使用的 Gantt 版本低于 8.0，请在页面中包含 `https://export.dhtmlx.com/gantt/api.js` 以启用在线导出服务，例如：

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
			<td>(<i>string</i>) 输出文件的名称</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>skin</b></td>
			<td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) 输出的甘特图的皮肤</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>locale</b></td>
			<td>(<i>string</i>) 设置输出甘特图所使用的语言</td>
		</tr> 
  <tr>
			<td class="webixdoc_links0"><b>start</b></td>
			<td>(<i>string</i>) 设置将出现在输出甘特图中的数据范围的起始日期。日期格式由 [](api/config/date_format.md) 配置定义</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>end</b></td>
			<td>(<i>string</i>) 设置将出现在输出甘特图中的数据范围的结束日期。日期格式由 [](api/config/date_format.md) 配置定义</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>data</b></td>
			<td>(<i>object</i>) 设置将在输出甘特图中展示的自定义数据源</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>header</b></td>
			<td>(<i>string</i>) 指定将添加到输出 PDF 图像中的页眉。请注意，可以在此处使用任意 HTML</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>footer</b></td>
			<td>(<i>string</i>) 指定将添加到输出 PDF 图像中的页脚。请注意，可以在此处使用任意 HTML</td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>server</b></td>
			<td>(<i>string</i>) 设置请求的 API 端点。可与本地安装的导出服务一起使用。默认值为 <strong>https://export.dhtmlx.com/gantt</strong></td>
		</tr>
  <tr>
			<td class="webixdoc_links0"><b>raw</b></td>
			<td>(<i>boolean</i>) 定义将按原样导出所有 Gantt 标记及自定义元素。<em>false</em> 为默认值。 
  	[阅读详情](guides/export.md#exportingcustommarkupandstyles)</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>callback</b></td>
			<td>(<i>function</i>) 如果您希望接收生成的 PDF 文件的下载 URL，可以使用 callback 属性。它接收一个带有 url 属性的 JSON 对象</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>additional_settings</b></td>
			<td>(<i>object</i>) 包含额外设置的对象。该对象可包含以下属性:<ul><li><b>format</b> - (<i>string</i>) 输出文件的格式：<i>"A0", "A1", "A2", "A3", "A4", "A5", "A6", "Legal", "Ledger", "Letter", "Tabloid"</i></li><li><b>landscape</b> - (<i>boolean</i>) 输出文件的纵向或横向方向。仅在指定了 "format" 属性时，此属性才起作用</li><li><b>width</b> - (<i>string|number|"content"</i>) 输出页面的宽度。导出多页时使用该属性</li><li><b>height</b> - (<i>string|number|"content"</i>) 输出页面的高度。导出多页时使用该属性</li><li><b>merge_pages</b> - (<i>boolean</i>) 启用一个文件中的 <a href="#multi-page-export">多页导出</a>；若设置为 <i>false</i>，您将需要多次导出以获取所有甘特数据</li><li><b>fixed_headers</b> - (<i>boolean</i>) 在每一页显示网格和时间轴标题；默认值为 <i>false</i>。只在启用 <b>merge_pages</b> 设置时生效</li><li><b>margins</b> - (<i>object</i>) 输出 PDF 文件的上、下、左、右边距对象。 [参阅详情](guides/export.md#margins-of-the-output-pdf-file)</li><li><b>header</b> - (<i>string</i>) 指定将添加到输出 PDF 文件每一页的页眉。 [参阅详情](guides/export.md#headerfooter-of-the-output-file)</li><li><b>footer</b> - (<i>string</i>) 指定将添加到输出 PDF 文件每一页的页脚。 [参阅详情](guides/export.md#headerfooter-of-the-output-file)</li></ul></td>
		</tr>
  </tbody>
</table>

### Time restrictions

:::note
导出服务有时间限制。 
:::

如果处理时间超过 20 秒，导出将被取消并出现以下错误：

~~~html
Error: Timeout trigger 20 seconds
~~~

如果多人同时导出 Gantt，处理时间可能比平时长。但这没关系，因为来自特定用户的导出请求所花费的时间会单独计数。

:::note
如果需要导出大型图表，您可以使用 [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。导出模块在您获得 Gantt 的 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 许可时免费提供，或者您也可以 [单独购买该模块](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。 
:::


### Multi-page export

请注意，导出模块在技术上无法实现以下功能：

- 控制截断位置（因此任务可能在两页之间被截断）
- 在每页显示刻度线而不覆盖任务
- 在每页显示页眉和页脚而不覆盖任务行

因此，要实现上述功能，您需要应用自定义解决方案。下面给出了一些示例。

#### 在一个文件中自动导出数据

对于在一个文件中进行多页导出，您可以使用在线导出服务（具有 [time restrictions](#time-restrictions) 的限制）或独立的 [export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)（没有限制）。
只需在 **additional_settings** 对象中使用 **merge_pages** 属性即可：

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, 
        format: "A4"
    }
});
~~~

如果图表不太大，导出服务很合适。若图表很大，数据将部分导出。
在这种情况下，您可以 [手动进行多次数据导出](#making-several-data-exports-manually)
或使用导出模块。导出模块将自行导出全部数据，并提供一个包含所有页的文件。 

**相关示例**： [Multi-page export in one file ](https://snippet.dhtmlx.com/2qzecnke)


这种方法的缺点是数据导出所花费的时间要比在单页导出所有数据长。为了在导出甘特数据时花费更少的时间，
你可以改变缩放级别，将数据绘制成周、月或年的形式，这样甘特图的宽度会变小，从而减少导出次数。

在 [相关博客文章](https://dhtmlx.com/blog/maintenance-release-pdf-export-module-gantt-0-6-4-scheduler-0-6-5-suite-8-3-10-kanban-1-5-12/#:~:text=Multipage%20Export%20in%20One%20PDF%20File) 中查看多页导出的一览

#### 手动进行多次数据导出

由于甘特图的大小几乎总是超过标准文档尺寸，因此图表需要多于一页才能放下。
在导出甘特图时，每次都会将最左边部分导出到 PDF 文档中。
因此，要实现多页导出，需要多次导出，并每次向左移动甘特图。

要在导出的文件中移动甘特图，需在 **header** 参数中添加以下样式规则：

~~~js
const width = 1000;
const height = 1000;
const total_width = gantt.$task_bg.scrollWidth + gantt.$grid.scrollWidth;

for (let i = 0; i < total_width; i += width) {
    gantt.exportToPDF({
        header:`<style>#gantt_here{left:-${i}px;position: absolute;}</style>`,
        //raw: true,
        additional_settings: {
            width: width,
            height: height,
        }
    });
}
~~~

**相关示例**： [Export to the file of defined sizes ](https://snippet.dhtmlx.com/zbhc506m)

如果您想将 Gantt 导出为特定格式（例如 'A3'），请注意，文件格式以毫米为单位定义，而 HTML 中的尺寸以像素表示。因此，您需要将毫米单位的位移值转换为像素值。

~~~js
const widthMM = 297;
const width = widthMM / (25.4 inch / 96 PDF PPI);
~~~

**相关示例**： [Export to the file of defined format ](https://snippet.dhtmlx.com/qt54zfuw )

**Note**，如果你导出多页 Gantt 但只得到一个 PDF 文件，说明浏览器阻止了弹出窗口，因为该函数会同时打开它们。
在这种情况下，请启用弹出窗口并重试导出。

![blocked_popup](/img/popup_blocked.png)


#### 在导出的文件中为每一页显示时间线和网格标题

您可以通过在 **additional_settings** 对象中使用 **fixed_headers** 属性，在导出的文件的每一页显示时间线和网格标题。请注意，此功能也仅在启用了 <b>merge_pages</b> 属性时有效：

~~~js
gantt.exportToPDF({
    additional_settings: {
        merge_pages: true, 
        fixed_headers: true,  
        format: "A4"
    }
});
~~~

**相关示例**： [Multi-page export with timeline and grid headers on each page](https://snippet.dhtmlx.com/w905ht5t)

**相关示例**： [Multi-page export with timeline and grid headers on each page for the Resource panel view](https://snippet.dhtmlx.com/xkmvduu5)


如需在不使用该配置的情况下工作，例如您想进行多次导出并手动合并文件，可以使用以下样式：

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

- [Export to PDF and PNG](guides/export.md)
- [How-tos: How to add resource chart or custom styles in the exported PDF file](guides/how-to.md#how-to-add-resource-chart-or-custom-styles-in-the-exported-pdf-file)