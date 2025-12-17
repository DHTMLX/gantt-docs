---
sidebar_label: keys
title: keys config
description: "定义甘特图的快捷键"
---

# keys

### Description

@short: 定义甘特图的快捷键

@signature: keys: GanttHotkeys

### Example

~~~jsx
gantt.keys.edit_save = 32;
gantt.init("gantt_here");
~~~

### Details

**keys** 对象包含以下属性:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  属性
  </th>
  <th>
  说明
  </th>
  <th>
  默认值
  </th>
  <th>
  适用视图
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>edit_save</td>
  <td>指定用于确认编辑操作的键盘按键的数字代码（作为点击 lightbox 中"保存"按钮的替代方式）</td>
  <td>13（"Enter"键）</td>
  <td>所有视图</td>
  </tr>
  <tr>
  <td>edit_cancel</td>
  <td>指定用于取消编辑操作的键盘按键的数字代码（作为点击 lightbox 中"取消"按钮的替代方式）</td>
  <td>27（"Escape"键）</td>
  <td>所有视图</td>
  </tr>
  </tbody>
</table>

:::note

注意，所有 **keys** 属性的数据类型均为"number"。
 
:::
