---
title: "行内编辑器扩展"
sidebar_label: "行内编辑器扩展"
---

# 行内编辑器扩展

请参阅文章 [Inline Editing in Grid](guides/inline-editing.md) 了解关于 Inline Editors Extension 的详细信息。

The *inlineEditors*对象具备以下 API：

## 方法

### 操作：

- <span class="submethod">**startEdit (taskId, columnName): void**</span> - 在指定的任务/单元格中打开一个编辑器，设置映射的值并将浏览器焦点放在编辑器上
    - **_taskId_** - (*number | string*) - 任务 ID
    - **_columnName_** - (*string*) - 列名
- <span class="submethod">**show (taskId, columnName): void**</span> - 在指定的任务/单元格中打开一个空编辑器
    - **_taskId_** - (*number | string*) - 任务 ID
    - **_columnName_** - (*string*) - 列名
- <span class="submethod">**setValue (): void**</span> - 用任务中的值填充已打开的编辑器
- <span class="submethod">**save (): void**</span> - 保存修改并隐藏编辑器
- <span class="submethod">**hide (): void**</span> - 隐藏编辑器但不保存修改
- <span class="submethod">**focus (): void**</span> - 将浏览器焦点放在编辑器上
- <span class="submethod">**getState (): object**</span> - 获取状态对象（id: taskId, columnName: columnName, placeholder: HTMLElement）
- <span class="submethod">**getValue (): string**</span> - 获取编辑器当前值

### 状态：

- <span class="submethod">**isChanged (): boolean**</span> - 检查当前编辑器的值是否与初始值不同
- <span class="submethod">**isVisible (): boolean**</span> - 检查编辑器是否已打开

### 事件：

- <span class="submethod">**attachEvent (name, handler): string**</span> - 为 inlineEditors 对象附加事件处理程序
    - **_name_** - (*string*) - 事件处理程序的名称
    - **_handler_** - (*Function*) - 事件触发时将被调用的函数
- <span class="submethod">**detachEvent (id): void**</span> - 从事件中分离一个处理程序（此前通过 attachEvent() 方法附加）
    - **_id_** - (*string*) - 已附加的事件处理程序的标识

### 导航：

- <span class="submethod">**editNextCell (canChangeRow): void**</span> - 保存当前编辑器并将编辑器移动到下一个单元格
    - **_canChangeRow?_**  - (*boolean*) - 指定在当前单元格的末尾后，是否可以将编辑器移动到下一行的第一格
- <span class="submethod">**editNextRow (skipReadonly): void**</span> - 保存当前编辑器并在同一单元格的任务下方打开一个编辑器
    - **_skipReadonly?_**  - (*boolean*) - 指定是否跳过只读任务，在第一可编辑任务的单元格中打开编辑器。参数默认 false，若下一任务为只读则关闭编辑器。
- <span class="submethod">**editPrevCell (canChangeRow): void**</span> - 保存当前编辑器并将编辑器移动到上一个单元格
    - **_canChangeRow?_**  - (*boolean*) - 指定在到达当前行的第一格后，是否可以将编辑器移动到上一行的最后一格
- <span class="submethod">**editPrevRow (skipReadonly): void**</span> - 保存当前编辑器并在上一任务的同一单元格中打开编辑器
    - **_skipReadonly?_**  - (*boolean*) - 指定是否跳过只读任务，在第一个可编辑任务的单元格中打开编辑器。默认 false 时如果前一个任务是只读的会关闭编辑器。
- <span class="submethod">**getFirstCell (): string**</span> - 获取网格中第一个可编辑列的名称
- <span class="submethod">**getLastCell (): string**</span> - 获取网格中最后一个可编辑列的名称
- <span class="submethod">**getNextCell (direction): string | null**</span> - 返回下一个可编辑列的名称
    - **_direction_**  - (*number*) - 指定应在何种方向遍历下一列。`1` - 向右，`-1` - 向左

### Helpers:

- <span class="submethod">**locateCell (node): object | null**</span> - 检查提供的 DOM 元素是否为任务单元格对象，并在是时返回编辑器状态对象：(id: taskId, columnName: columnName)
    - **_node_** - (*HTMLElement*) - HTML 元素

### 鼠标/键盘映射：

- <span class="submethod">**setMapping (mapping): void**</span> - 设置映射对象
    - **_mapping_** - (*object*) - 一个包含映射配置的对象：
        - **_init_** - (*Function*): void - 用于初始化映射的方法
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 对象
            - **_grid_** - (*any*) - Grid 布局视图
        - **_onShow_** - (*Function*): void - 当 inline editor 打开时将调用的方法
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 对象
            - **_node_** - (*HTMLElement*) - HTML 元素
            - **_grid_** - (*any*) - Grid 布局视图
        - **_onHide_** - (*Function*): void - 当 inline editor 关闭时将调用的方法
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 对象
            - **_node_** - (*HTMLElement*) - HTML 元素
            - **_grid_** - (*any*) - Grid 布局视图
        - **_destroy_** - (*Function*): void - 销毁映射的方法
- <span class="submethod">**getMapping (): object**</span> - 返回当前应用的映射对象


## 事件

### <span class="eventname">onBeforeEditStart</span>

参数:
<span class="eventarguments">

- **_state_** - (*object*) - 编辑器状态对象
    - **_id_** - (*number | string*) - 被编辑任务的 id
    - **_columnName_** - (*string*) - 列名
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
   return true;
});
~~~

### <span class="eventname">onEditStart</span>

参数:
<span class="eventarguments">

- **_state_** - (*object*) - 编辑器状态对象
    - **_id_** - (*number | string*) - 被编辑任务的 id
    - **_columnName_** - (*string*) - 列名
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditStart", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~

### <span class="eventname">onBeforeSave</span>

在编辑器即将关闭并保存修改时触发

参数:
<span class="eventarguments">

- **_state_** - (*object*) - 编辑器状态对象
    - **_id_** - (*number | string*) - 被编辑任务的 id
    - **_columnName_** - (*string*) - 列名
    - **_oldValue_** - (*any*) - 编辑器的初始值
    - **_newValue_** - (*any*) - 编辑器当前的值，可能被修改
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onBeforeSave", function(state){
   console.log(state);
   // -> { id: itemId, 
   //      columnName: columnName, 
   //      oldValue: value, 
   //      newValue: value
   //    };
   return true;
});
~~~

### <span class="eventname">onSave</span>

在任务从编辑器中更新后触发

参数:
<span class="eventarguments">

- **_state_** - (*object*) - 编辑器状态对象
    - **_id_** - (*number | string*) - 被编辑任务的 id
    - **_columnName_** - (*string*) - 列名
    - **_oldValue_** - (*any*) - 编辑器的初始值
    - **_newValue_** - (*any*) - 编辑器当前的值
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onSave", function(state){
   console.log(state);
   // -> { id: itemId, 
   //      columnName: columnName, 
   //      oldValue: value, 
   //      newValue: value
   //    };
});
~~~

### <span class="eventname">onEditEnd</span>

在内联编辑器被隐藏之后触发

参数:
<span class="eventarguments">

- **_state_** - (*object*) - 编辑器状态对象
    - **_id_** - (*number | string*) - 被编辑任务的 id
    - **_columnName_** - (*string*) - 列名
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditEnd", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~