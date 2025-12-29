---
title: "链接属性"
sidebar_label: "链接属性"
---

# 链接属性

本页列出了链接对象可以拥有的所有属性。

如需了解任务对象属性的完整概述，请参阅 [Task Properties](guides/task-properties.md) 文章。

## 必需属性

<table>
  <tbody>
  <tr>
  <th>名称</th><th>类型</th><th>描述</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>链接的唯一标识符</td>
  </tr>
  <tr>
  <td><b class="subproperty">source</b></td>
  <td><i>string | number</i></td>
  <td>依赖关系起始任务的id</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string | number</i></td>
  <td>依赖关系结束任务的id</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>依赖类型。可用选项在 [links](api/config/links.md) 对象中定义。默认情况下，这些值为: <ul> <li><b>"0"</b> - 'finish_to_start'.</li> <li><b>"1"</b> - 'start_to_start'.</li> <li><b>"2"</b> - 'finish_to_finish'.</li> <li><b>"3"</b> - 'start_to_finish'.</li> </ul></td>
  </tr>
  </tbody>
</table>

如果你希望为依赖类型使用不同于默认值（'0','1','2'）的值，可以通过修改 [links](api/config/links.md) 对象中的相关属性进行自定义。例如:

~~~js
gantt.config.links.start_to_start = "start2start";
~~~

请注意，此更改只影响依赖类型的存储方式，不影响其显示方式。

## 可选属性

<table>
  <tbody>
  <tr>
  <th>名称</th><th>类型</th><th>描述</th>
  </tr>
  <tr>
  <td><b class="subproperty">lag</b></td>
  <td><i>number</i></td>
  <td>[任务之间的滞后时间](guides/auto-scheduling.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>将链接标记为[只读](guides/readonly-mode.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>将链接标记为[可编辑](guides/readonly-mode.md)</td>
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

