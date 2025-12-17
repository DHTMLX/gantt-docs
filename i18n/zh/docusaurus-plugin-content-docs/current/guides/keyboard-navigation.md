---
title: "键盘导航"
sidebar_label: "键盘导航"
---

键盘导航
========================

Gantt 图表及其元素可以通过按键或组合键进行访问。本文介绍了 Gantt 的键盘导航基础，包括焦点行为、内置快捷键的使用以及如何自定义快捷键。

## 启用该功能

要在 Gantt 图表中启用键盘导航，请通过 [gantt.plugins](api/method/plugins.md) 方法激活 **keyboard_navigation** 插件。

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

关于 **gantt.ext.keyboardNavigation** API 的详细信息，请参见文章 [키보드 네비게이션 확장](guides/keynav-ext.md)。

键盘导航有两种类型:

- 按任务行导航

通过将 [keyboard_navigation](api/config/keyboard_navigation.md) 属性设置为 *true* 来启用。

- 按任务单元格导航  

通过将 [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md) 属性设置为 *true* 来启用。

## 键盘导航中的焦点行为

### Gantt 上的焦点

按下 Tab 键会像其他标准元素一样将焦点设置到 Gantt 上。获得焦点后，可以使用方向键等在 Gantt 内进行导航。

再次按下 Tab 键，焦点会离开 Gantt，跳转到页面的其他部分。

### 模态窗口上的焦点

当模态窗口（如 lightbox 或确认窗口）打开时，焦点会从 Gantt 转移到模态窗口，并在其中进行表单式导航。关闭窗口后，焦点返回 Gantt。

要将焦点带回 Gantt，请使用 [focus](api/method/focus.md) 方法。当 Gantt 重新获得焦点时，会将其放在内部的活动元素、第一行或最近选中的元素上。

模态窗口中的默认导航操作包括:

- *Enter* - 确认并关闭
- *Escape* - 不保存更改直接关闭

如果焦点位于表单按钮上，按 *Space* 或 *Enter* 会激活该按钮，而不是触发模态窗口的默认操作。


:::note
如果焦点设置在网格单元格或行上，然后点击了 Gantt 内的自定义 HTML 元素，焦点会返回到该单元格或行。

从 v7.1.13 开始，在自定义元素上添加 *'no_keyboard_navigation'* 类，可以防止焦点返回到网格单元格或行。
:::

## 作用域（Scopes）

按键触发的操作取决于上下文（作用域）。可以为 Gantt 图表中的不同元素（作用域）分配不同的快捷键:

- **"gantt"** - 整个 Gantt 图表
- **"taskRow"** - 表示任务的行
- **"taskCell"** - 任务行中的单元格
- **"headerCell"** - 表头中的单元格

如果同一个快捷键被分配给多个作用域，则更具体的作用域优先生效。例如，若快捷键同时分配给 Gantt 和某个元素，则会触发元素的快捷键。

### 添加快捷键

要添加新的键盘快捷键，请使用 [addShortcut](api/method/addshortcut.md) 方法，传入三个参数:

- **shortcut** - (*string*) 快捷键或组合键
- **handler** - (*function*) 当快捷键被触发时调用的函数
- **scope** - (*string*) 可选，处理函数的作用域，默认为 "gantt"

~~~js
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

### 移除快捷键

要从某个作用域移除快捷键，请使用 [removeShortcut](api/method/removeshortcut.md) 方法，传入两个参数:

- **shortcut** - (*string*) 要移除的快捷键或组合键
- **scope** - (*string*) 要移除快捷键的作用域

~~~js
gantt.removeShortcut("shift+w","taskRow");
~~~

### 获取快捷键处理函数

可以通过 [getShortcutHandler](api/method/getshortcuthandler.md) 方法获取某个快捷键的处理函数，参数包括:

- **shortcut** - (*string*) 快捷键或组合键
- **scope** - (*string*) 快捷键所属的作用域

~~~js
var shortcut_handler = gantt.getShortcutHandler("shift+w","taskRow");
~~~

该方法返回处理该快捷键的函数。

## 快捷键语法

快捷键可以包括:

- 修饰键加字符键（如 "ctrl+a"）；
- 修饰键加非字符键（如 "ctrl+space"）；
- 单个字符键（如 "a"）；
- 单个非字符键（如 "space"）

多个快捷键组合可以用逗号分隔，比如 "ctrl+a, ctrl+space"。

### 支持的快捷键按键

- 修饰键:**shift**、**alt**、**ctrl**、**meta**
- 非字符键:**backspace**、**tab**、**enter**、**esc**、**space**、**up**、**down**、**left**、**right**、**home**、**end**、**pageup**、**pagedown**、**delete**、**insert**、**plus**、**f1-f12**

## 已有快捷键

Gantt 图表内置了多种快捷键，便于导航:

### 通用快捷键:

- **Tab** - 聚焦到 Gantt
- **Alt+Up/Down** - 垂直滚动
- **Alt+Left/Right** - 水平滚动
- **Ctrl+Enter** - 新建任务
- **Ctrl+Z** - 撤销上一步操作
- **Ctrl+R** - 重做上一次撤销的操作

### 表头单元格快捷键

- **左/右方向键** - 在表头单元格间移动
- **Home/End** - 跳转到第一/最后一列
- **Down** - 移动到任务行
- **Space/Enter** - 激活表头单元格（如排序）

### 任务行快捷键

- **Up/Down** - 在行间导航
- **PageDown/PageUp** - 跳转到最后/第一个任务
- **Space** - 选择任务
- **Ctrl+Enter** - 新建任务
- **Delete** - 删除选中任务
- **Enter** - 打开 lightbox
- **Ctrl+Left/Right** - 展开/折叠树形结构
- **Shift+Left/Right** - 缩进/减少缩进任务
- **Shift+Down/Up** - 展开/折叠分支


[Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)


:::note
有关如何通过 **Ctrl+C/Ctrl+V** 快捷键实现任务的复制/粘贴，可参见 [相关](guides/how-to.md#ruhefuzhiheniantierenwu) 文章中的示例。
:::

### 任务单元格快捷键

- **上/下/左/右方向键** - 在任务单元格间导航
- **PageDown/PageUp** - 跳转到列的第一个/最后一个单元格
- **Home/End** - 跳转到列的第一个/最后一个单元格
- **Space** - 选择任务
- **Ctrl+Enter** - 新建任务
- **Delete** - 删除选中任务
- **Enter** - 打开 lightbox
- **Ctrl+Left/Right** - 展开/折叠树形结构


[Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)


内置水平时间轴滚动快捷键
--------------------

自 4.2 版本起，Gantt 图表支持通过以下方式进行水平时间轴滚动:

-> **Shift** 键 + **鼠标滚轮移动**。

从 6.3 版本起，可以通过 [horizontal_scroll_key](api/config/horizontal_scroll_key.md) 属性将修饰键从默认的 **Shift** 改为 **Alt** 或 **Meta**:

~~~js
gantt.config.horizontal_scroll_key = "altKey";
~~~

要禁用鼠标滚轮的水平滚动，可将该属性设置为 *false*:

~~~js
gantt.config.horizontal_scroll_key = false;
~~~

