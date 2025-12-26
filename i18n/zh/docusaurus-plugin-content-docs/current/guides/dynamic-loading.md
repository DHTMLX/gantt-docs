---
title: "动态加载（按需加载）"
sidebar_label: "动态加载（按需加载）"
---

# 动态加载（按需加载）

:::info
此功能仅在 PRO 版本中提供
:::

默认情况下，dhtmlxGantt 会一次性加载所有数据，这在处理大量任务时可能会带来挑战。

在这种情况下，可以使用动态加载模式，按分支（子项目）逐级加载数据，随着用户的展开操作逐步显示。

## 工作原理 {#enablingdynamicloading}

当[启用](#enablingdynamicloading)动态加载后，调用 [gantt.load("url")](api/method/load.md) 会向指定的 URL 发送 GET 请求，期望响应中仅包含顶层任务，所有嵌套分支初始均为关闭状态。

当用户点击展开图标时，gantt 会自动调用 [load](api/method/load.md) 方法，并将被点击任务的 id 发送给服务器:

~~~js
gantt.load("url?parent_id="123"");
~~~

服务器需返回被展开项的子任务数据。

:::note
可以使用 [onBeforeBranchLoading](api/event/onbeforebranchloading.md) 事件来修改请求的 URL 或添加额外参数。
:::

## 启用动态加载

<span id="enabledynload">要在 Gantt 图中启用动态加载</span>，需要进行客户端和服务器端的配置。

- 客户端（使用 [branch_loading](api/config/branch_loading.md) 选项）:

~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;

gantt.init("gantt_here");

gantt.load("/dynamic_loading");
~~~

- 服务器端:

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
  

[Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


通常，客户端并不知道已显示数据项的子项信息，因为这些子项最初并未从服务器加载。

为了解决这个问题，可以使用特殊的数据属性 `$has_child`（可通过 [branch_loading_property](api/config/branch_loading_property.md) 自定义），用于指示某个任务的子元素数量。

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


[Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


## 动态加载的数据格式 

动态加载的数据格式如下所示:

~~~js
{
    "tasks":[
    {
        "id":13,
        "start_date":"2020-04-02 00:00:00",
        "duration":10,
        "text":"Task #1",
        "progress":0.2,
        "parent":12,
        "open":0,
        "$has_child":0
    },
    {
        "id":14,
        "start_date":"2020-04-04 00:00:00",
        "duration":4,
        "text":"Task #2",
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

这与常规数据加载所用的 JSON 格式一致，详细对比请参见 [지원되는 데이터 형식](guides/supported-data-formats.md) 文章。

主要区别在于 **$has_child** 属性，它决定任务是否作为"叶子"项（没有"展开"切换按钮）或可展开节点显示:

- 如果 *$has_child* 属性存在且为['truthy'](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) 值（如非零数字、true 或非空字符串），该项会显示展开/收起切换按钮。展开时会触发 Ajax 请求到服务器；
- 如果 *$has_child* 属性不存在或为['falsy'](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) 值（如 0、false、NaN、undefined、空字符串或 null），该项不会显示切换按钮，表示其没有子任务。

如果请求中包含 *parent_id* 参数，响应应包含该 id 任务的子任务；如果未包含 *parent_id*，则响应应包含根级任务:

<table class="dp_table">
  <tr>
  <th><b>操作</b></th><th><b>HTTP 方法</b></th><th><b>URL</b></th><th><b>响应</b></th>
  </tr>
  <tr>
  <td>加载根级任务</td>
  <td>GET</td>
  <td>/loadUrl</td>
  <td>[动态加载数据格式](#dynamicloadingformatofdata)</td>
  </tr>
  <tr>
  <td>加载任务的子任务</td>
  <td>GET</td>
  <td>/loadUrl?parent_id=id</td>
  <td>[动态加载数据格式](#dynamicloadingformatofdata)</td>
  </tr>

</table>

## 动态加载任务

任务的动态加载也可以通过滚动到最后一个可见任务时自动加载新任务来实现。更多详情请参见 [How to load tasks dynamically](guides/how-to.md) 文章。

