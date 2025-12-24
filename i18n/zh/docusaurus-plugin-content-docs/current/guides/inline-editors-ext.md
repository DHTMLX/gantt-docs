---
title: "内联编辑器扩展"
sidebar_label: "内联编辑器扩展"
---

# 内联编辑器扩展


您可以在文章 [그리드에서 인라인 편집](guides/inline-editing.md) 中找到关于内联编辑器扩展的更多信息。

 *inlineEditors* 对象提供如下 API:

## 方法

### 操作方法:

- <span class="submethod">**startEdit (taskId, columnName): void**</span> - 为指定的任务和单元格打开编辑器，用映射的值填充，并聚焦编辑器
    - **_taskId_** - (*number | string*) - 任务ID
    - **_columnName_** - (*string*) - 列名
- <span class="submethod">**show (taskId, columnName): void**</span> - 在指定的任务和单元格中打开一个空的编辑器
    - **_taskId_** - (*number | string*) - 任务ID
    - **_columnName_** - (*string*) - 列名
- <span class="submethod">**setValue (): void**</span> - 用任务中的值填充已打开的编辑器
- <span class="submethod">**save (): void**</span> - 保存更改并关闭编辑器
- <span class="submethod">**hide (): void**</span> - 关闭编辑器但不保存更改
- <span class="submethod">**focus (): void**</span> - 聚焦编辑器
- <span class="submethod">**getState (): object**</span> - 返回状态对象 (id: taskId, columnName: columnName, placeholder: HTMLElement)
- <span class="submethod">**getValue (): string**</span> - 返回编辑器当前的值

### 状态方法: 

- <span class="submethod">**isChanged (): boolean**</span> - 判断编辑器当前值是否与初始值不同
- <span class="submethod">**isVisible (): boolean**</span> - 判断编辑器当前是否已打开

### 事件方法:

- <span class="submethod">**attachEvent (name, handler): string**</span> - 给 inlineEditors 对象添加事件处理器
    - **_name_** - (*string*) - 事件名称
    - **_handler_** - (*Function*) - 事件触发时执行的回调函数
- <span class="submethod">**detachEvent (id): void**</span> - 移除之前添加的事件处理器
    - **_id_** - (*string*) - 事件处理器ID

### 导航方法:

- <span class="submethod">**editNextCell (canChangeRow): void**</span> - 保存当前编辑器并移动到下一个单元格
    - **_canChangeRow?_**  - (*boolean*) - 指定是否允许在当前行最后一个单元格后跳转到下一行第一个单元格
- <span class="submethod">**editNextRow (skipReadonly): void**</span> - 保存当前编辑器并在下方任务的同一单元格打开编辑器
    - **_skipReadonly?_**  - (*boolean*) - 如果为 true，跳过只读任务并在下一个可编辑任务中打开编辑器；如果为 false（默认），当下一个任务为只读时关闭编辑器
- <span class="submethod">**editPrevCell (canChangeRow): void**</span> - 保存当前编辑器并移动到上一个单元格
    - **_canChangeRow?_**  - (*boolean*) - 指定是否允许在当前行第一个单元格前跳转到上一行最后一个单元格
- <span class="submethod">**editPrevRow (skipReadonly): void**</span> - 保存当前编辑器并在上方任务的同一单元格打开编辑器
    - **_skipReadonly?_**  - (*boolean*) - 如果为 true，跳过只读任务并在上一个可编辑任务中打开编辑器；如果为 false（默认），当上一个任务为只读时关闭编辑器
- <span class="submethod">**getFirstCell (): string**</span> - 返回网格中第一个可编辑列的名称
- <span class="submethod">**getLastCell (): string**</span> - 返回网格中最后一个可编辑列的名称
- <span class="submethod">**getNextCell (direction): string | null**</span> - 返回下一个可编辑列的名称
    - **_direction_**  - (*number*) - 移动方向:`1` 代表右，`-1` 代表左

### 辅助方法:

- <span class="submethod">**locateCell (node): object | null**</span> - 检查给定 DOM 元素是否为任务单元格，如果是则返回编辑器状态对象: (id: taskId, columnName: columnName)
    - **_node_** - (*HTMLElement*) - HTML 元素

### 鼠标/键盘映射:

- <span class="submethod">**setMapping (mapping): void**</span> - 设置映射配置对象
    - **_mapping_** - (*object*) - 定义映射的对象:
        - **_init_** - (*Function*): void - 初始化映射
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 对象
            - **_grid_** - (*any*) - Grid 布局视图
        - **_onShow_** - (*Function*): void - 当内联编辑器打开时调用
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 对象
            - **_node_** - (*HTMLElement*) - HTML 元素
            - **_grid_** - (*any*) - Grid 布局视图
        - **_onHide_** - (*Function*): void - 当内联编辑器关闭时调用
            - **_inlineEditors_** - (*InlineEditorMethods*) - inlineEditors 对象
            - **_node_** - (*HTMLElement*) - HTML 元素
            - **_grid_** - (*any*) - Grid 布局视图
        - **_destroy_** - (*Function*): void - 清理映射
- <span class="submethod">**getMapping (): object**</span> - 返回当前应用的映射对象

## 事件

### <span class="eventname">onBeforeEditStart</span>

参数:
<span class="eventarguments">

- **_state_** - (*object*) - 编辑器状态对象
    - **_id_** - (*number | string*) - 正在编辑的任务ID
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
    - **_id_** - (*number | string*) - 正在编辑的任务ID
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

当编辑器即将关闭并保存更改时触发

参数:
<span class="eventarguments">

- **_state_** - (*object*) - 编辑器状态对象
    - **_id_** - (*number | string*) - 正在编辑的任务ID
    - **_columnName_** - (*string*) - 列名
    - **_oldValue_** - (*any*) - 编辑器中的初始值
    - **_newValue_** - (*any*) - 编辑器中的当前值，可被修改
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

在任务被编辑器更新后触发

参数:
<span class="eventarguments">

- **_state_** - (*object*) - 编辑器状态对象
    - **_id_** - (*number | string*) - 正在编辑的任务ID
    - **_columnName_** - (*string*) - 列名
    - **_oldValue_** - (*any*) - 编辑器中的初始值
    - **_newValue_** - (*any*) - 编辑器中的当前值
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

在内联编辑器关闭后触发

参数:
<span class="eventarguments">

- **_state_** - (*object*) - 编辑器状态对象
    - **_id_** - (*number | string*) - 正在编辑的任务ID
    - **_columnName_** - (*string*) - 列名
</span>

~~~js
var inlineEditors = gantt.ext.inlineEditors;

inlineEditors.attachEvent("onEditEnd", function(state){
   console.log(state);
   // -> {id: itemId, columnName: columnName};
});
~~~
