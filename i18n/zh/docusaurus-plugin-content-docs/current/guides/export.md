---
title: "导出为 PDF 和 PNG"
sidebar_label: "导出为 PDF 和 PNG"
---

# 导出为 PDF 和 PNG


dhtmlxGantt 提供了一个在线导出服务，允许您将甘特图保存为 [PDF](guides/export.md#daochuweipdf) 或 [PNG](guides/export.md#daochuweipng) 文件。

:::note
该服务可免费使用，但导出的 PDF/PNG 文件会在 GPL 许可证下包含库的水印。
如果您购买了许可证，在有效的支持期内（所有 PRO 许可证为 12 个月），导出将不带水印。
:::

您也可以在本地计算机上搭建多种导出服务，实现本地导出甘特图为 PDF 或 PNG。
请注意，导出服务并未随 Gantt 包一同提供--请查阅 [相关文档](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 了解各服务的使用条款。

## 在线导出服务限制


:::note
导出服务对处理时间和请求大小有限制。
:::

### 时间限制

如果导出过程超过 20 秒，将会被终止，并显示如下错误:

~~~html
Error: Timeout trigger 20 seconds
~~~

当多位用户同时导出甘特图时，处理时间可能会变长，但每个用户的请求时间是单独计算的。

### 请求大小限制

通用 API 端点 **https://export.dhtmlx.com/gantt** 处理所有导出方法（*exportToPDF*、*exportToPNG*、*exportToMSProject* 等）。该端点的最大请求大小为 **10 MB**。

还有一个专用 API 端点 **https://export.dhtmlx.com/gantt/project**，用于 [MSProject](guides/export-msproject.md) 和 [Primavera P6](guides/export-primavera.md) 的导出/导入服务（仅限 *exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*）。该端点支持最大 **40 MB** 的请求。

## 使用导出模块


:::note
如需导出大型甘特图，您可以使用 [独立导出模块](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。
如果您拥有 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 许可证，则该模块免费；也可以[单独购买](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。
:::

[查看更多关于 PDF 导出模块的使用详情](guides/pdf-export-module.md)。

## 导出为 PDF


要将甘特图导出为 PDF，请按照以下步骤操作:

- 使用 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件:

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
如果您使用的是 8.0 以下版本的 Gantt，请在页面中引入 **https://export.dhtmlx.com/gantt/api.js** 以启用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 然后调用 [exportToPDF](guides/export.md) 方法导出图表:

~~~html
<input value="Export to PDF" type="button" onclick='gantt.exportToPDF()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## 导出为 PNG


要将甘特图导出为 PNG 图片，请按照以下步骤操作:

- 使用 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件:

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
如果您使用的是 8.0 以下版本的 Gantt，请在页面中引入 **https://export.dhtmlx.com/gantt/api.js** 以启用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 然后调用 [exportToPNG](guides/export.md) 方法导出图表:

~~~html
<input value="Export to PNG" type="button" onclick='gantt.exportToPNG()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


[Export data from Gantt](https://docs.dhtmlx.com/gantt/samples/08_api/06_export.html)


## 导出方法的参数


[exportToPDF](api/method/exporttopdf.md) 和 [exportToPNG](api/method/exporttopng.md) 方法接受包含多种可选属性的对象作为参数:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 指定导出文件的名称</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>string</i>) 设置导出甘特图的 [皮肤](guides/skins.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) 设置导出甘特图中使用的语言</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) 要包含在导出中的数据范围的起始日期。日期格式遵循 [date_format](api/config/date_format.md) 配置</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) 要包含在导出中的数据范围的结束日期。日期格式遵循 [date_format](api/config/date_format.md) 配置</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) 提供自定义数据源，用于导出的甘特图显示</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 为导出的 PDF 图片添加页眉。这里可以使用任意 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 为导出的 PDF 图片添加页脚。这里可以使用任意 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 设置导出请求的 API 端点。如果使用本地导出服务时非常有用。默认值为 <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) 按原样导出所有甘特图标记，包括自定义元素。默认值为 <em>false</em>。[详见下文](guides/export.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) 接收包含下载生成的 PDF/PNG 文件 URL 的 JSON 对象</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) <b>exportToPDF()</b> 方法的额外设置，包括: <ul> <li><b>format</b> - (<i>string</i>) 输出文件格式:<i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) 输出文件的方向，仅在设置了 "format" 时生效</li> <li><b>width</b> - (<i>string | number | "content"</i>) 多页导出时的页面宽度</li> <li><b>height</b> - (<i>string | number | "content"</i>) 多页导出时的页面高度</li> <li><b>merge_pages</b> - (<i>boolean</i>) 启用单文件多页导出；若为 <i>false</i>，需多次导出以覆盖全部甘特数据</li> <li><b>fixed_headers</b> - (<i>boolean</i>) 在每页显示表格和时间线表头；默认 <i>false</i>。仅在 <b>merge_pages</b> 启用时有效</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) <b>exportToPNG()</b> 方法的额外设置，包括: <ul> <li><b>width</b> - (<i>number|string</i>) 输出图片的宽度</li> <li><b>height</b> - (<i>number|string</i>) 输出图片的高度</li> 这些设置在 <b>slice_archive</b> 启用时将被忽略。 <li><b>slice_archive</b> - (<i>boolean|object</i>) 支持将大型甘特图分片导出并打包为归档。如果为对象，可指定 <b>width</b> 和 <b>height</b>。如果仅设置为 <i>true</i>，则默认为 1000×1000。</li> <li><b>slice_check</b> - (<i>boolean</i>) 在归档包中添加 HTML 页面，用于校验所有分片是否导出正确。</li> </ul></td>
  </tr>
  </tbody>
</table>


**调用导出方法并包含可选属性的示例**
~~~js
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

gantt.exportToPNG({
    name:"mygantt.png",
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

##输出文件名

如需自定义导出文件的名称，请在 [exportToPDF/exportToPNG](guides/export.md#daochufangfadecanshu) 参数中设置 **name** 属性:

~~~js
gantt.exportToPDF({
    name:"my_beautiful_gantt.pdf"/*!*/
});
~~~

##输出文件的语言

默认情况下，导出的甘特图使用与页面显示相同的语言。

如需导出为不同语言，请在 [exportToPDF/exportToPNG](guides/export.md#daochufangfadecanshu) 参数中设置 **locale** 属性:

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    locale:"de" /*!*/
});
~~~

## 导出数据


有两种方式指定导出的 PDF 或 PNG 中包含哪些任务:

1. [定义输出数据的日期范围。](#daterange)
2. [为导出提供自定义数据源。](#customdata)

<a id="daterange"></a>

###定义需导出的任务日期范围

要设置导出包含的任务范围，可在 [exportToPDF/exportToPNG](guides/export.md#daochufangfadecanshu) 参数中使用 **start** 和 **end** 属性:

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    start:"01-04-2013",/*!*/
    end:"11-04-2013"/*!*/
});
~~~

:::note
请注意，日期格式由 [date_format](api/config/date_format.md) 配置控制。
:::

<a id="customdata"></a>

### 设置自定义导出数据源

如果希望导出甘特图时使用与当前显示不同的数据集，可在 [exportToPDF/exportToPNG](guides/export.md#daochufangfadecanshu) 方法参数中使用 **data** 属性:

~~~js
gantt.exportToPDF({
    data:{/*!*/
        data:[
            {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
            {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
            {id:3, text:"Task #2", start_date:"11-04-2013",duration:8, parent:1}
        ],
        links:[
            {id:1, source:1, target:2, type:"1"},
            {id:2, source:2, target:3, type:"0"},
            {id:3, source:3, target:4, type:"0"},
            {id:4, source:2, target:5, type:"2"}
        ]
    }
});
~~~

:::note
请注意，**data** 参数必须是包含数据的对象，不能直接传递 URL 作为其值。
:::

##输出甘特图的皮肤

默认情况下，导出的甘特图与页面显示的皮肤一致。

如需在导出的 PNG 或 PDF 文件中应用不同皮肤，请在 [exportToPDF/exportToPNG](guides/export.md#daochufangfadecanshu) 方法参数中设置 **skin** 属性:

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    skin:"material"/*!*/ 
});
~~~

[查看所有可用甘特皮肤列表](guides/skins.md)。


## 输出文件的页眉/页脚

您可以通过在 [exportToPDF/exportToPNG](guides/export.md#daochufangfadecanshu) 方法的参数中使用 **header** 和 **footer** 属性，为导出的 PNG 或 PDF 文件添加页眉或页脚:

:::note
您可以在这些参数中包含任何 HTML。当添加图片时，请确保 "src" 属性使用全局路径。
:::

~~~js
gantt.exportToPDF({
    name:"mygantt.pdf",
    header:"<h1>My company</h1>",/*!*/
    footer:"<h4>Bottom line</h4>"/*!*/
});
~~~


## 输出文件的自定义样式

要自定义导出 Gantt 图表的样式，您可以通过两种方式提供带有 CSS 类的样式表:

- 通过链接外部样式表:

~~~js
gantt.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- 或者通过 'style' 标签直接嵌入样式:

~~~js
gantt.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

请注意，此方法适用于全局可访问的 HTTP 引用。如果您的 CSS 文件托管在内网或本地，可以直接嵌入样式，如下所示:

~~~js
gantt.exportToPDF({
    header:"<style>.tier1{background: red; color:white;}</style>"
});
~~~

:::note
更多示例请参见 [如何在导出的 PDF 文件中添加资源图表或自定义样式](guides/how-to.md#ruhezaidaochudepdfwenjianzhongtianjiaziyuantubiaohuozidingyiyangshi) 文章。
:::

### 为导出功能收集所有样式

有时样式分布在多个文件中且无法公开访问，这使得逐个包含变得不便。您可以收集页面上使用的所有样式，并将其包含在导出的 header 中。

所有样式都可通过 **document.styleSheets** 对象获取。如果样式来自同一域，您可以收集其 CSS 规则并插入到 **header**。示例:

~~~js
const styles = []
for (el in document.styleSheets) {
    try {
        const rules = (document.styleSheets[el]).cssRules;
        for (rule in rules) {
            styles.push(rules[rule].cssText)
        }
    }
    catch (e) { }
}

gantt.exportToPDF({
    raw: true,
    header: "<style>" + styles.join(" ") + "</style>"
});
~~~ 


**Related example:** [Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/osbscj62)


**Related example:** [Export Gantt with resource load diagram to PDF with no need to specify styles](https://snippet.dhtmlx.com/duf5ijuv)


## 导出自定义标记和样式

默认情况下，Gantt 图表根据提供的配置和已加载的数据进行导出，但 [自定义元素](guides/baselines.md) 以及某些模板不会被包含。

要完整导出当前 Gantt 标记（包括所有自定义元素），请在 [exportToPDF/exportToPNG](guides/export.md#daochufangfadecanshu) 方法的参数中设置 **raw:true** 属性。

~~~js
gantt.exportToPDF({
    raw:true
});
~~~

请注意，自定义元素需要 [自定义样式](guides/export.md#shuchuwenjiandezidingyiyangshi) 才能正确显示。

此外，使用此模式会增加 API 请求的大小。大型图表可能会超过在线导出服务的 10MB 限制而导致导出失败。在这种情况下，您需要在本地安装 [导出服务](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 并相应调整请求大小。


请参考 [系统要求](guides/export-requirements.md) 以设置本地导出服务。

## 导出 HTML 元素

将 Gantt 图表导出为 PNG 或 PDF 时，请注意由于安全原因，导出 HTML 元素存在一定限制。

某些 HTML 元素如 `<canvas>`、`<svg>`、`<script>` 以及 *src* 属性中带有 Base64 数据的图片会被限制。但仍有安全方式可导出 SVG 和 Base64 格式的图片:

- 使用 `<img>` 元素，并将 *src* 属性指向 SVG 图片的 URL（适用于 PNG 和 JPG 导出，但不支持 Base64），例如:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- 使用 CSS 样式如 *background* 或 *background-image*，其 `url` 值可指向图片 URL 或 Base64 数据（适用于 PNG、JPG 和 SVG 导出）:

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~


**Related example:** [Exporting safe and insecure HTML elements to PDF](https://snippet.dhtmlx.com/hj6w4dk3?text="gantt")


如果您有导出模块并需要导出在线导出服务器不支持的 HTML 元素，可以联系技术支持获取指导，以修改您的模块解除这些限制。但请注意，这可能会使您的服务器暴露于 XSS 漏洞风险。

