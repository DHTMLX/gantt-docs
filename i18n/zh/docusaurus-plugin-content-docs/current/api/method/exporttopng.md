---
sidebar_label: exportToPNG
title: exportToPNG method
description: "导出甘特图为 PNG 图片"
---

# exportToPNG

### Description

@short: 导出甘特图为 PNG 图片

@signature: exportToPNG: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 可选，包含导出选项的对象（详见下文）

### Example

~~~jsx
gantt.exportToPNG();

//或
gantt.exportToPNG({
  name: "mygantt.png"
});

//或
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

### Details

:::note
 该方法属于 **export** 扩展，因此请确保已启用 [export_api](guides/extensions-list.md#daochufuwu) 插件。更多信息请参见 [导出为 PDF 和 PNG](guides/export.md) 文章。 
:::

:::note
 对于 8.0 版本之前的 Gantt，需要在页面中引入 **https://export.dhtmlx.com/gantt/api.js** 脚本以使用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

[exportToPNG](api/method/exporttopng.md) 方法接受一个对象参数，包含多个可选属性:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) 导出 PNG 的文件名</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skin</b></td>
  <td>(<i>'terrace', 'skyblue', 'meadow', 'broadway'</i>) 导出甘特图的视觉主题</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>locale</b></td>
  <td>(<i>string</i>) 导出甘特图的语言设置</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string</i>) 导出图表中显示数据范围的开始日期。日期格式遵循 [date_format](api/config/date_format.md) 的设置</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string</i>) 导出图表中显示数据范围的结束日期。日期格式遵循 [date_format](api/config/date_format.md) 的设置</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>data</b></td>
  <td>(<i>object</i>) 提供用于导出图表的自定义数据源</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) 作为页眉添加到导出 PNG 中的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) 作为页脚添加到导出 PNG 中的 HTML 内容</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) 导出请求的 API 端点 URL。适用于本地导出服务。默认值为 <strong>https://export.dhtmlx.com/gantt</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>raw</b></td>
  <td>(<i>boolean</i>) 若为 true，则精确导出甘特图的 markup，包括自定义元素。默认值为 <em>false</em>。[更多详情](guides/export.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>callback</b></td>
  <td>(<i>function</i>) 回调函数，接收包含生成 PNG 下载 URL 的 JSON 对象</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) 额外设置，包括:
  <ul><li><b>width</b> - (<i>number|string</i>) 输出页面的宽度</li><li><b>height</b> - (<i>number|string</i>) 输出页面的高度</li>注意如果设置了 <b>slice_archive</b>，则 <b>width</b> 和 <b>height</b> 会被忽略。<li><b>slice_archive</b> - (<i>boolean|object</i>) 启用分片导出大图并打包成归档文件。如果是对象，则接受 <b>width</b> 和 <b>height</b> 选项。若设置为 true，默认分片大小为 1000×1000。</li><li><b>slice_check</b> - (<i>boolean</i>) 在归档中添加一个 HTML 页面，用于验证所有分片是否正确导出。</li></ul></td>
  </tr>
  </tbody>
</table>

## 分片导出大型甘特图

最大导出尺寸限制为 10000×10000 像素。

你可以通过 **additional_settings** 中的 **width** 和 **height** 属性调整宽高，但如果两者乘积超过 100000000（10000×10000），导出的 PNG 会被裁剪。

若需导出更大图表，可以通过 **additional_settings** 中的 **slice_archive** 选项将图表分片导出并打包成归档:

~~~js
gantt.exportToPNG({
    server: "https://export.dhtmlx.com/beta/gantt",
    additional_settings:{
        //width: 2000,
        //height: 2000,
          slice_archive: {width: 2000, height: 2000},
          slice_check: true,
    }
});
~~~

**示例:** [导出为 PNG 图片](https://snippet.dhtmlx.com/2mprehlx)

你可以通过将 **slice_archive** 设置为带有 *width* 和 *height* 的对象来指定分片大小:

~~~js
slice_archive: {width: 2000, height: 2000}
~~~

或者直接设置为 *true*，使用默认的 1000×1000 分片大小:

~~~js
slice_archive: true
~~~

## 时间限制

:::note
 导出服务对处理时间有限制。 
:::

如果导出时间超过 20 秒，导出将被取消，且会显示以下错误:

~~~html
Error: Timeout trigger 20 seconds
~~~

多个用户同时导出可能会增加处理时间，但每个用户的导出时间是单独计时的。

:::note
 若需导出大型图表，建议使用[独立导出模块](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。该模块随 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 许可证免费提供，或可单独购买[此处](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。 
:::

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [导出为 PDF 和 PNG](guides/export.md)

