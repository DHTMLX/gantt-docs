---
title: "导出为 iCal"
sidebar_label: "iCal"
---

# 导出为 iCal

dhtmlxGantt 库允许将甘特图数据导出为 iCal 格式。导出通过导出服务完成：在线导出服务，或 PDF/PNG/Excel [导出模块](guides/export-modules.md)。

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


## 导出方法的参数

[exportToICal()](api/method/exporttoical.md) 方法的参数是一个包含以下属性（可选）的对象：

- **server** - (*string*) 设置请求的 API 端点。可用于本地安装的导出服务。默认值为 `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) 允许为文件指定自定义名称和扩展名，但文件仍将以 iCal 的格式导出。
  
~~~jsx title="Calling the export method with optional properties"
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~