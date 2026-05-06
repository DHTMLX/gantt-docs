---
title: "导出为 PDF 和 PNG"
sidebar_label: "导出为 PDF 和 PNG"
---

# 导出为 PDF 和 PNG

dhtmlxGantt 提供一个在线导出服务，允许您将甘特图导出为 [PDF](guides/export.md#export-to-pdf) 或 [PNG](guides/export.md#export-to-png) 格式。

:::note
该服务是免费的，但输出的 PDF/PNG 文件将包含基于 GPL 许可的库水印。
如果您购买许可证，导出的结果在有效支持期内（所有 PRO 许可证为 12 个月）将不包含水印。
:::

有多种导出服务可用。您可以在本地计算机上安装它们，并将甘特图导出为 PDF 或 PNG。本地导出服务并不包含在 Gantt 包中，
请阅读 [相应的文章](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 以了解每种服务的使用条款。

## 在线导出服务的限制

:::note
导出服务有时间与请求大小的限制。
:::

### 时间限制

如果处理时间超过 20 秒，导出将被取消，并出现以下错误：

~~~html
Error: Timeout trigger 20 seconds
~~~

如果多人同时导出甘特图，处理时间可能比平时长一些。但没关系，因为来自特定用户的导出请求所花费的时间将单独计数。

### 请求大小限制

有一个通用的 API 端点 `https://export.dhtmlx.com/gantt`，用于所有导出方法（*exportToPDF*、*exportToPNG*、*exportToMSProject* 等）。**最大请求大小为 10 MB**。

还有一个单独的 API 端点 `https://export.dhtmlx.com/gantt/project`，专门用于 [MSProject](guides/export-msproject.md) 与  
[Primavera P6](guides/export-primavera.md) 的导出/导入服务（仅限 *exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*）。**最大请求大小：40 MB**。

## 使用导出模块

:::note
如果您需要导出较大的图表，可以使用一个 [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。
如果您是通过 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 许可获取 Gantt，则导出模块免费提供，或者您也可以 [单独购买该模块](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。
:::

[Read more on the usage of the export module for PDF](guides/pdf-export-module.md).

## Export to PDF

要将甘特图导出为 PDF 文档，请执行以下步骤：

- 要使用导出/导入功能，请通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件：

~~~js
gantt.plugins({
    export_api: true
});
~~~

它允许您使用在线导出服务或本地导出模块。

:::note
如果您使用的 Gantt 版本低于 8.0，需要在页面中包含 `https://export.dhtmlx.com/gantt/api.js` 以启用导出功能，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 调用 [exportToPDF](api/method/exporttopdf.md) 方法将甘特图导出为 PDF：

~~~html
<input value="Export to PDF" type="button" onclick='gantt.exportToPDF()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~

**相关示例**： [Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)

## Export to PNG

要将甘特图导出为 PNG 图像，执行以下步骤：

- 要使用在线导出服务，请通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件：

~~~js
gantt.plugins({
    export_api: true
});
~~~

:::note
如果您使用的 Gantt 版本低于 8.0，需要在页面中包含 `https://export.dhtmlx.com/gantt/api.js` 以启用在线导出服务，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 调用 [exportToPNG](api/method/exporttopng.md) 方法将甘特图导出为 PNG：

~~~html
<input value="Export to PNG" type="button" onclick='gantt.exportToPNG()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~

**相关示例**： [Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)

## 导出方法的参数

[exportToPDF](api/method/exporttopdf.md) 与 [exportToPNG](api/method/exporttopng.md) 方法接收一个对象作为参数，该对象包含若干属性（所有属性均为可选）：

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 输出文件的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>string</i>) 输出甘特图的 [skin](guides/skins.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) 设置输出甘特图所使用的语言</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) 设置将要在输出甘特图中显示的数据范围的起始日期。日期格式由 [date_format](api/config/date_format.md) 配置定义</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) 设置将要在输出甘特图中显示的数据范围的结束日期。日期格式由 [date_format](api/config/date_format.md) 配置定义</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) 设置将在输出甘特图中显示的自定义数据源</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 指定将添加到输出 PDF 图像的页眉。注意，您可以在此处使用任意 HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 指定将添加到输出 PDF 图像的页脚。注意，您可以在此处使用任意 HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 设置请求的 API 端点。可与导出服务的本地安装一起使用。默认值为 <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) 定义将按原样导出所有 Gantt 标记与自定义元素。<em>false</em> 作为默认值。 <a href="#exportingcustommarkupandstyles">在下文阅读详情</a></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) 如果您希望接收生成的 PDF/PNG 文件的下载 URL，可以使用 callback 属性。它接收一个带有 url 属性的 JSON 对象</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 一个包含 <b>exportToPDF()</b> 方法的附加设置的对象。该对象可包含以下属性：<ul> <li><b>format</b> - (<i>string</i>) 输出文件的格式： <i>"A0", "A1", "A2", "A3", "A4", "A5", "A6", "Legal", "Ledger", "Letter", "Tabloid"</i></li> <li><b>landscape</b> - (<i>boolean</i>) 输出文件的纵向或横向。仅在指定了 "format" 属性时生效。</li> <li><b>width</b> - (<i>string | number | "content"</i>) 输出页面的宽度。该属性在导出多页时使用。 </li> <li><b>height</b> - (<i>string | number | "content"</i>) 输出页面的高度。该属性在导出多页时使用。</li> <li><b>merge_pages</b> - (<i>boolean</i>) 启用在一个文件中的多页导出；若设为 <i>false</i>，需要多次导出以获取全部甘特数据</li> <li><b>fixed_headers</b> - (<i>boolean</i>) 启用在每页上显示网格和时间线标题；默认 <i>false</i>。仅在启用 <b>merge_pages</b> 设置时生效</li> <li><b>margins</b> - (<i>object</i>) 输出 PDF 文件的上、下、左、右边距对象。<a href="#margins-of-the-output-pdf-file">下面的详细信息请参阅</a></li> <li><b>header</b> - (<i>string</i>) 指定将添加到每一页输出 PDF 文件的页眉。<a href="#headerfooter-of-the-output-file">下面的详细信息请参阅</a></li> <li><b>footer</b> - (<i>string</i>) 指定将添加到每一页输出 PDF 文件的页脚。<a href="#headerfooter-of-the-output-file">下面的详细信息请参阅</a></li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 一个包含 <b>exportToPNG()</b> 方法的附加设置的对象。该对象可包含以下属性：<ul> <li><b>width</b> - (<i>number|string</i>) 输出页面的宽度</li> <li><b>height</b> - (<i>number|string</i>) 输出页面的高度</li> 仅当指定 <b>slice_archive</b> 时，<b>width</b> 和 <b>height</b> 参数将被忽略。 <li><b>slice_archive</b> - (<i>boolean|object</i>) 允许将大型图表分块保存并在存档中获取。作为对象时，该属性接受 <b>width</b> 和 <b>height</b> 选项。如果未定义块大小（即 slice_archive: true），则默认大小为 1000×1000。 </li> <li><b>slice_check</b> - (<i>boolean</i>) 在存档中添加一个 HTML 页面。该页面让您检查所有分块是否已正确导出。</li> </ul></td>
  </tr>
  </tbody>
</table>

~~~js title="调用导出方法时的可选属性"
gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: {},
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});

gantt.exportToPNG({
    name: "mygantt.png",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    locale: "en",
    start: "01-04-2026",
    end: "11-04-2026",
    skin: "terrace",
    data: {},
    server: "https://myapp.com/myexport/gantt",
    raw: true,
    callback: (res) => {
        alert(res.url);
    }
});
~~~

## 输出文件的名称

要为输出文件设置自定义名称，请在 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 方法的参数中使用 **name** 属性：

~~~js
gantt.exportToPDF({
    name: "my_beautiful_gantt.pdf"
});
~~~

## 输出文件的语言

默认情况下，Gantt 图将以页面显示的语言导出。

要为输出文件设置自定义语言，请在 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 方法的参数中使用 **locale** 属性：

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    locale: "de"
});
~~~

## 要导出的数据

要设置应在输出 PDF 或 PNG 文件中显示的任务，请使用以下任一方式：

1. <a href="#daterange">指定输出数据的日期范围。</a>
2. <a href="#customdata">指定输出的自定义数据源。</a>

<a id="daterange"></a>

### 指定输出任务的日期范围

要设置将在输出文档中显示的任务范围，请在 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 方法的参数中使用 **start**、**end** 属性：

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    start: "01-04-2026",
    end: "11-04-2026"
});
~~~

:::note
请注意，日期格式由 [date_format](api/config/date_format.md) 配置定义。
:::

### 设置用于导出的自定义数据源 {#customdata}

要使用自定义数据集导出 Gantt 图（即不使用初始甘特图中显示的数据），请在 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 方法的参数中使用 **data** 属性：

~~~js {2}
gantt.exportToPDF({
    data: {
        tasks: [
            { id: 1, text: "Project #1", start_date: "01-04-2026", duration: 18 },
            { id: 2, text: "Task #1", start_date: "02-04-2026", duration: 8, parent: 1 },
            { id: 3, text: "Task #2", start_date: "11-04-2026", duration: 8, parent: 1 }
        ],
        links: [
            { id: 1, source: 1, target: 2, type: "1" },
            { id: 2, source: 2, target: 3, type: "0" },
            { id: 3, source: 3, target: 4, type: "0" },
            { id: 4, source: 2, target: 5, type: "2" }
        ]
    }
});
~~~

:::note
请注意，不能将某些 URL 作为 data 参数的值，只能传递一个数据对象。
:::

## 输出甘特图的皮肤

默认情况下，Gantt 图将使用与页面显示相同的皮肤导出。

要为输出的 PNG 或 PDF 文件设置不同的皮肤，请在 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 方法的参数中使用 **skin** 属性：

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    skin: "material"
});
~~~

[Check the full list of available Gantt skins](guides/skins.md).

## 输出文件的页眉/页脚

要为输出的 PNG 或 PDF 文件添加页眉/页脚，请在 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 方法的参数中使用 **header**/**footer** 属性：

:::note
请注意，在设置参数时可以使用任意 HTML。在指定图片时，请记得将全局路径设为 src 属性的值。
:::

~~~js
gantt.exportToPDF({
    name: "mygantt.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>"
});
~~~

### 每页的输出 PDF 文件的头尾 {#headerfooterforeachpage}

要为输出 PDF 文件的每一页添加页眉/页脚，请在 exportToPDF 方法的 **additional_settings** 对象中使用 **header**/**footer** 属性。

您可以在 header/footer 属性中通过使用 class="pageNumber" 的元素来指定当前页的页码，通过 class="totalPages" 的元素来指定总页数：

~~~js
gantt.exportToPDF({
    additional_settings: {
        format: "A4",
        // 正确的边距对呈现页眉/页脚是必要的
        margins: {
            top: 10,
            bottom: 10,
            left: 0.1,
            right: 1
        },
        header: "Each page header",
        footer: 'Page: <span class="pageNumber"></span>/<span class="totalPages"></span>'
    }
});
~~~

请注意，只有在指定了 [margins](#margins-of-the-output-pdf-file) 且有足够的空间正确显示页眉/页脚时，这些设置才会生效。否则，页眉/页脚将被渲染在甘特图之外。对于普通文本行，建议将边距设为 10 的最小值。

## 输出 PDF 文件的边距

要为输出 PDF 文件添加边距，请在 [exportToPDF](guides/export.md#parameters-of-the-export-methods) 方法的 **additional_settings** 对象中使用 **margins** 属性。该属性同时适用于单页导出和 [multipage export](api/method/exporttopdf.md#multi-page-export)。

边距设置的数值以数字表示：

~~~js
gantt.exportToPDF({
    additional_settings: {
        margins: {
            top: 5,
            bottom: 10,
            left: 2,
            right: 2
        },
    },
});
~~~

如果未指定某些边距设置，则将被忽略。

默认单位为毫米，但您也可以通过设置 <b>unit: "inch"</b> 将边距单位改为英寸：

~~~js {8}
gantt.exportToPDF({
    additional_settings: {
        margins: {
            top: 5,
            bottom: 10,
            left: 2,
            right: 2,
            unit: "inch"
        },
    },
});
~~~

## 输出文件的自定义样式 {#customstylefortheoutputfile}

若要为甘特图应用自定义样式，请提供包含自定义 CSS 类的样式表：

- 通过链接：

~~~js
gantt.exportToPDF({
    name: "calendar.pdf",
    header: '<link rel="stylesheet" href="http://mysite.com/custom.css">'
});
~~~

- 或通过 'style' 标签：

~~~js
gantt.exportToPDF({
    name: "calendar.pdf",
    header: '<style>... custom css classes here ...</style>'
});
~~~

注意，上述方案适用于全局 HTTP 引用。如果您的 CSS 类位于内联网/本地环境中，您可以像下面这样将所有样式嵌入：

~~~js
gantt.exportToPDF({
    header: "<style>.tier1{background: red; color:white;}</style>"
});
~~~

:::note
如需更多示例，请参阅 [How to add resource chart or custom styles in the exported PDF file](guides/how-to.md#how-to-add-resource-chart-or-custom-styles-in-the-exported-pdf-file) 文章。
:::

### 收集导出函数所需的所有样式

有时样式写在不同的文件中，公开访问受限，逐个包含它们的样式很不方便。现在有一种将所有样式一并收集以用于导出的方法。

所有样式都存储在 HTML 页面上的 document.styleSheets 对象中。如果使用来自同一站点的 style 或 link 元素，则可以将它们全部收集起来，然后在 header 中指定。请看下面的示例：

~~~js
const styles = [];

for (const styleSheet of document.styleSheets) {
    try {
        const rules = styleSheet.cssRules;

        for (const rule of rules) {
            styles.push(rule.cssText);
        }
    } catch (error) {
        // 忽略无法读取的样式表
    }
}

gantt.exportToPDF({
    raw: true,
    header: "<style>" + styles.join(" ") + "</style>"
});
~~~

**相关示例**： [Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/osbscj62)

**相关示例**： [Export Gantt with resource load diagram to PDF with no need to specify styles](https://snippet.dhtmlx.com/duf5ijuv)

## 导出自定义标记和样式 {#exportingcustommarkupandstyles}

默认情况下，甘特图会基于指定的配置和加载的数据进行导出，而 [custom elements](guides/baselines.md) 及某些模板不会导出。若要原样导出整个甘特图标记及所有自定义元素，可以在 [exportToPDF/exportToPNG](guides/export.md#parameters-of-the-export-methods) 方法的参数中设置 <b>raw: true</b>。

~~~js
gantt.exportToPDF({
    raw: true
});
~~~

请注意，自定义元素需要提供 [custom styles](guides/export.md#customstylefortheoutputfile) 以确保正确显示。

请注意，使用此模式会增加 API 请求的大小。大型图表可能超过在线导出的 10MB 限制，可能无法以此方式导出。在这种情况下，您需要安装一个 [export service](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 并增大请求规模。

请查看 [system requirements](guides/export-requirements.md) 以在本地安装导出服务。

## 导出 HTML 元素

在将甘特图导出为 PNG 与 PDF 格式时，请注意导出 HTML 元素的限制，因为这些元素可能不够安全。

有些 HTML 元素并不完全允许导出，例如 `<canvas>`、`<svg>`、`<script>` 以及其 src 属性包含 Base64 图像的图片。然而，在 SVG 与 Base64 格式中仍有安全的导出图像方式：

- 您可以使用一个 `<img>` 元素，其 src 属性包含 SVG 格式的图像 URL（适用于 PNG 与 JPG 格式，不适用于 Base64 格式），例如：

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- 您可以使用样式元素，如背景（background）或 background-image，并将 url 属性指定为图片链接，或将 Base64 格式的图像作为其值（适用于 PNG/JPG/SVG 格式）

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

**相关示例**： [Exporting safe and insecure HTML elements to PDF](https://snippet.dhtmlx.com/hj6w4dk3?text="gantt")

如果您有一个导出模块，并且需要导出在线导出服务器不支持的 HTML 元素，您可以提交支持请求，获取关于在模块中进行的修改以移除限制的说明。不过，请注意，这样您的服务器将易受 XSS 攻击。