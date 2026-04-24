---
title: "链接属性"
sidebar_label: "链接属性"
---

# 链接属性

在本页面，你将看到链接对象可能包含的所有属性的完整列表。

任务对象的完整属性列表请参阅 [任务属性](guides/task-properties.md) 文章。


## 必填属性

<table>
  <tbody>
  <tr>
  <th>名称</th><th>类型</th><th>描述</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>链接的 id</td>
  </tr>
  <tr>
  <td><b class="subproperty">source</b></td>
  <td><i>string | number</i></td>
  <td>依赖关系将从该任务的 id 开始</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string | number</i></td>
  <td>依赖关系将以该任务的 id 结束</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>依赖类型。可用值存储在 [links](api/config/links.md) 对象中。默认值为：<ul> <li><b>"0"</b> - 'finish_to_start'.</li> <li><b>"1"</b> - 'start_to_start'.</li> <li><b>"2"</b> - 'finish_to_finish'.</li> <li><b>"3"</b> - 'start_to_finish'.</li> </ul></td>
  </tr>
  </tbody>
</table>

如果你想以除了默认值 ('0','1','2') 之外的方式存储依赖类型，可以修改 [links](api/config/links.md) 对象的相关属性的值。举例：

~~~js
gantt.config.links.start_to_start = "start2start";
~~~

注意，这些值仅影响依赖类型的存储方式，而不影响可视化的行为。 

## 可选属性

<table>
  <tbody>
  <tr>
  <th>名称</th><th>类型</th><th>描述</th>
  </tr>
  <tr>
  <td><b class="subproperty">lag</b></td>
  <td><i>number</i></td>
  <td>[任务的滞后时间](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>可以将链接标记为 [只读](guides/readonly-mode.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>可以将链接标记为 [可编辑](guides/readonly-mode.md#details-of-the-editable_property-config-option)</td>
  </tr>
  </tbody>
</table>

## 示例

~~~js
var data = {
    tasks: [
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
         {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
         {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:2, target:3, type:"0"}
    ]
};
~~~