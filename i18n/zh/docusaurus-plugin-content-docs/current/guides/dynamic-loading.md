---
title: "按需加载（动态加载）"
sidebar_label: "按需加载（动态加载）"
---

# 按需加载（动态加载）

:::info
此功能仅在 PRO 版中可用
:::

默认情况下，dhtmlxGantt 一次性加载所有数据。当任务数量较多时，可能会带来问题。

在这种情况下，您可以使用动态加载模式，按分支（子项目）逐级加载数据，随着用户打开它们。

## 工作原理

当启用动态加载时， [gantt.load("url")](api/method/load.md) 调用将向指定的 URL 发送一个 GET 请求，期望响应仅包含顶层任务，且所有嵌套分支以关闭状态显示。

当用户单击“展开”图标时，gantt 会自动调用 [load](api/method/load.md) 方法，向服务器发送被单击任务的 id：

~~~js
gantt.load("url?parent_id="123"");
~~~

并期望响应中包含被展开项目的子任务。

:::note
您可以使用 [onBeforeBranchLoading](api/event/onbeforebranchloading.md) 事件来修改请求的 URL，或向其中添加一些额外的参数。
:::

## 启用动态加载 {#enablingdynamicloading}

要在 Gantt 图中启用动态加载，您需要同时处理客户端和服务器端。

- 客户端端（使用 [branch_loading](api/config/branch_loading.md) 选项）：

~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;

gantt.init("gantt_here");

gantt.load("/dynamic_loading");
~~~

- 服务器端：

~~~php
<?php

include ('config.php');

$gantt = new JSONGanttConnector($res, $dbtype);

$parent_id = isset($_GET["parent_id"]) ? $_GET["parent_id"] : 0;

$gantt->mix("open", 0);
$gantt->mix("deep", 1);

$gantt->render_links("gantt_links", "id", "source,target,type");
$gantt->render_table(
    "gantt_tasks",
    "id",
    "start_date,duration,text,progress,parent",
    "", 
    "parent"
);
~~~
  
**相关示例**: [按需加载子任务（分支加载）](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

通常，客户端对显示的数据项的子项没有信息（因为这些子项并未从服务器端加载）。

若要传递此信息，您可以使用一个特殊的数据属性 '$has_child'（可通过 [branch_loading_property](api/config/branch_loading_property.md) 修改）来指示任务的子项数量。

~~~php
function check_children($row){
 global $gantt;
 $task_id = $row->get_value('id');
 $sql = "SELECT COUNT(id) AS has_children FROM gantt_tasks WHERE parent='{$task_id}'";
 $children = $gantt->sql->query($sql);
    
 $child = $gantt->sql->get_next($children);
 $children_qty = $child['has_children'];

 $row->set_userdata('$has_child',$children_qty);
}
$gantt->event->attach("beforeRender","check_children");
~~~

**相关示例**: [按需加载子任务（分支加载）](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


## 动态加载的数据格式 

动态加载的数据格式如下：

~~~js
{
    "tasks":[
    {
        "id":13,
        "start_date":"2020-04-02 00:00:00",
        "duration":10,
        "text":"任务 #1",
        "progress":0.2,
        "parent":12,
        "open":0,
        "$has_child":0
    },
    {
        "id":14,
        "start_date":"2020-04-04 00:00:00",
        "duration":4,
        "text":"任务 #2",
        "progress":0.9,
        "parent":12,
        "open":0,
        "$has_child":4
    }],

    "links":[
        {"id":1,"source":1,"target":2,"type":"0"},
        {"id":2,"source":1,"target":3,"type":"0"},
        {"id":3,"source":1,"target":4,"type":"0"}
    ]

}
~~~

如同常规数据加载所使用的 JSON 一样，这是相同的格式。若要对比，请参阅 [Supported Data Formats](guides/supported-data-formats.md) 文章。

唯一的差异是 **$has_child** 属性，它指示任务是以“叶子”项显示（没有“展开”切换）还是作为可展开的节点显示：

- 如果 *$has_child* 属性被指定且包含一个 ['truthy'](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) 值（非零数字、true、非空字符串等），该项将显示为带有展开/折叠切换的项。展开切换时，将向服务器发送 Ajax 请求；
- 如果 *$has_child* 未指定或包含一个 ['falsy'](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) 值（为零、false、NaN、undefined、空字符串、null），则该项将不带切换按钮，显示为没有子项的任务。

如果请求带有 *parent_id* 参数，响应必须包含该指定 id 的任务的子项；如果未指定 *parent_id*，请求必须包含根级任务：

<table class="dp_table">
  <tr>
  <th><b>操作</b></th><th><b>HTTP 方法</b></th><th><b>URL</b></th><th><b>响应</b></th>
  </tr>
  <tr>
  <td>load root level</td>
  <td>GET</td>
  <td>/loadUrl</td>
  <td>动态加载格式</td>
  </tr>
  <tr>
  <td>load children on the task</td>
  <td>GET</td>
  <td>/loadUrl?parent_id=id</td>
  <td>动态加载格式</td>
  </tr>

</table>

### 动态加载任务

您可以实现任务的动态加载，以便在滚动到最后一个可见任务后加载新的任务。有关更多详细信息，请参阅 [How to load tasks dynamically](guides/how-to.md#how-to-load-tasks-dynamically) 文章。

### 相关 API

- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [onAfterBranchLoading](api/event/onafterbranchloading.md)