---
title: "键盘导航"
sidebar_label: "键盘导航"
---

# 键盘导航

您可以通过按键或按键组合来访问甘特图及其元素。本篇文章将为您提供关于甘特图键盘导航的特殊性所需的所有信息，包括焦点行为、内置快捷键的使用以及创建自定义快捷键。

## 启用该功能

为了在甘特图中使用键盘导航，需要使用 [gantt.plugins](api/method/plugins.md) 方法启用 **keyboard_navigation** 插件。

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

对 **gantt.ext.keyboardNavigation** 对象的 API 如文中 [键盘导航扩展](guides/keynav-ext.md) 所示。

可用的键盘导航有两种变体：

- 按任务行导航

要启用它，请将 [keyboard_navigation](api/config/keyboard_navigation.md) 属性设置为 *true*。

- 按任务单元格导航

要使用此导航类型，请将 [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md) 属性设置为 *true*。

## Focus 行为在键盘导航过程中

### 甘特图上的焦点

按下 Tab 键时，甘特图获得的焦点与普通元素相同。之后要在甘特图中导航，可以使用箭头键及其他按键。

当第二次按下 Tab 键时，焦点离开甘特图并移动到页面上的其他位置。

### 模态窗口上的焦点

当模态窗口（灯箱、确认窗口）打开时，焦点从甘特图移到该窗口，导航在其中就像在一个简单表单中一样进行。窗口关闭后，焦点返回到甘特图。

要将焦点返回到甘特图，需要使用 [focus](api/method/focus.md) 方法。当甘特图再次获得焦点时，它会将焦点放在内部的活动元素上，或放在第一行，或放在最近选择的元素上。

模态窗口中的默认导航操作如下：

- *Enter* - 确认并关闭
- *Escape* - 关闭且不进行任何更改

如果焦点设置在表单中的某个按钮上，按下 *Space* 或 *Enter* 将调用焦点所在按钮的点击事件，而不是执行该动作。

:::note
你可以在相关的文章 [如何复制粘贴任务](guides/how-to.md#how-to-copy-and-paste-tasks) 中找到通过 **Ctrl+C/Ctrl+V** 组合实现复制/粘贴任务的示例。
:::

## 快捷键作用域 {#shortcutscope}

一个按键触发的动作取决于上下文。这意味着不同的动作可以附加到不同的元素（作用域）。甘特图中有以下上下文元素（作用域）：

- **"gantt"** - 整个甘特图
- **"taskRow"** - 含任务的一行
- **"taskCell"** - 含任务的那一行的一个单元格
- **"headerCell"** - 表头的一个单元格

如果同一快捷键被附加到多个作用域，触发的将是更具体的快捷键。也就是说，如果同一个快捷键同时附加到甘特图和其某个元素，附加到该元素的快捷键将先于附加到整个甘特图的快捷键被调用。

### 新增快捷键

要创建一个新的键盘快捷键，需要使用 [addShortcut](api/method/addshortcut.md) 方法并向其传递三个参数：

- **shortcut** - (*string*) 新的快捷键或按键组合名称
- **handler** - (*function*) 在调用快捷键时将被执行的处理函数
- **scope** - (*string*) 可选，附加处理函数的上下文元素名称；默认值为 "gantt"

~~~js
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

### 移除快捷键

要从某个作用域中移除快捷键，需要使用 [removeShortcut](api/method/removeshortcut.md) 方法。该方法接收两个参数：

- **shortcut** - (*string*) 快捷键名称或按键组合
- **scope** - (*string*) 附加该快捷键的上下文元素名称

~~~js
gantt.removeShortcut("shift+w","taskRow");
~~~

### 获取快捷键处理函数

可以使用 [getShortcutHandler](api/method/getshortcuthandler.md) 方法获取快捷键的处理函数。它接收两个参数：

- **shortcut** - (*string*) 快捷键名称或按键组合
- **scope** - (*string*) 附加该快捷键的上下文元素名称

~~~js
var shortcut_handler = gantt.getShortcutHandler("shift+w","taskRow");
~~~

该方法返回一个函数，表示快捷键调用时的处理程序。

## 快捷键语法 {#shortcutsyntax}

一个键盘快捷键可以由以下按键或按键组合组成：

- 修饰键 + 字符键（"ctrl+a"）
- 修饰键 + 非字符键（"ctrl+space"）
- 字符键（"a"）
- 非字符键（"space"）

一个动作可以有多个按键组合。在这种情况下，所有组合用逗号分隔： "ctrl+a, ctrl+space"。

### 支持在快捷键中使用的按键列表

- 修饰键：**shift**、**alt**、**ctrl**、**meta**；
- 非字符键：**backspace**、**tab**、**enter**、**esc**、**space**、**up**、**down**、**left**、**right**、**home**、**end**、**pageup**、**pagedown**、**delete**、**insert**、**plus**、**f1-f12**。

## 现有快捷键 {#existingshortcuts}

有一组现成的快捷键，您可以用来导航甘特图：

### 通用键盘快捷键：

- **Tab** - 将焦点设置到甘特图
- **Alt+Up/Down** - 纵向滚动甘特图
- **Alt+Left/Right** - 横向滚动甘特图
- **Ctrl+Enter** - 创建新任务
- **Ctrl+Z** - 撤销操作
- **Ctrl+R** - 重做

### 头部单元格的快捷键

- **Left/Right Arrow Keys** - 在表头单元格之间导航
- **Home/End** - 导航到第一列/最后一列
- **Down** - 移动到含任务的行
- **Space/Enter** - 点击表头（例如，用于排序）

### 任务行的快捷键

- **Up/Down** - 在行之间导航
- **PageDown/PageUp** - 导航到第一条/最后一条任务
- **Space** - 选择一个任务
- **Ctrl+Enter** - 创建一个新任务
- **Delete** - 删除所选任务
- **Enter** - 打开灯箱
- **Ctrl+Left/Right** - 展开/折叠树
- **Shift+Left/Right** - 缩进/取消缩进任务
- **Shift+Down/Up** - 展开/折叠分支

[键盘导航](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)

:::note
你可以在相关的文章 [如何复制粘贴任务](guides/how-to.md#how-to-copy-and-paste-tasks) 中找到通过 **Ctrl+C/Ctrl+V** 组合实现复制/粘贴任务的示例。
:::

### 任务单元格的快捷键

- **Up/Down/Left/Right Arrow Keys** - 在任务单元格之间导航
- **PageDown/PageUp** - 导航到列中的第一/最后一个单元格
- **Home/End** - 导航到列中的第一/最后一个单元格
- **Space** - 选择一个任务
- **Ctrl+Enter** - 创建一个新任务
- **Delete** - 删除所选任务
- **Enter** - 打开灯箱
- **Ctrl+Left/Right** - 展开/折叠树

[键盘导航 - 导航单元格](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

## 内置水平时间轴滚动快捷键 {#builtinshortcutforhorizontaltimelinescrolling}

从版本 4.2 开始，甘特图提供了通过以下组合水平滚动时间轴的功能：

- -> Shift 键 + 鼠标滚轮滚动。

从版本 6.3 起，您可以通过 [horizontal_scroll_key](api/config/horizontal_scroll_key.md) 属性，将组合中的默认 Shift 键改为 Alt 键或 Meta 键之一，并使用鼠标滚轮来实现水平滚动：

~~~js
gantt.config.horizontal_scroll_key = "altKey";
~~~

或者通过将 [horizontal_scroll_key](api/config/horizontal_scroll_key.md) 属性设置为 *false* 来禁用水平滚动：

~~~js
gantt.config.horizontal_scroll_key = false;
~~~