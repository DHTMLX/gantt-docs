---
sidebar_label: inline_editors_multiselect_open
title: inline_editors_multiselect_open config
description: "控制当多任务选择激活时，是否通过单击任务打开 inline editor"
---

# inline_editors_multiselect_open

### Description

@short: 控制当多任务选择激活时，是否通过单击任务打开 inline editor

@signature: inline_editors_multiselect_open: boolean | undefined

### Example

~~~jsx
gantt.config.inline_editors_multiselect_open = true;

gantt.init("gantt_here");
~~~

**Default value:** undefined

### Details

在使用单选模式时，inline editor 会在点击任务后立即出现。

启用多选时，第一次点击未选中的任务会选中该任务，第二次点击才会打开 inline editor。
如果希望在多选模式下首次点击任务时就打开 inline editor，请将 **inline_editors_multiselect_open** 选项设置为 true。

### Related Guides
- [在网格中进行内联编辑](guides/inline-editing.md)
- [多任务选择](guides/multiselection.md)

### Change log
- added in v7.1.13
