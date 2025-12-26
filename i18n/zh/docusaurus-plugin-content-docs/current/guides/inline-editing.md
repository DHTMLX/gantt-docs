---
title: "在网格中进行内联编辑"
sidebar_label: "在网格中进行内联编辑"
---

# 在网格中进行内联编辑

dhtmlxGantt 提供了两种内容编辑方式:

- 使用 [Lightbox](guides/default-edit-form.md) 编辑表单
- 直接在网格区域内使用内联编辑器

内联编辑允许用户直接在网格中进行更改:创建和更新任务、设置任务之间的依赖关系、定义开始和结束日期或调整持续时间--所有操作都可以通过内置编辑器完成。

![Inline grid editing](/img/inline_grid_editing.png)

要启用内联编辑，你需要:

- 定义编辑器配置列表，并在编辑器对象中使用 **map_to** 属性将编辑器绑定到相应的网格列

~~~js
var textEditor = {type: "text", map_to: "text"};
var dateEditor = {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
    max: new Date(2019, 0, 1)};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};
~~~

- 在列配置中指定 **editor** 属性，为该列分配编辑器

~~~js
gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true, editor: textEditor},
    {name: "start_date", align: "center", resize: true, editor: dateEditor},
    {name: "duration", align: "center", editor: durationEditor},
    {name: "add", width: 44}
];
~~~


[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)


:::note
有关 *inlineEditors* 对象 API 的详细信息，请参阅 [Inline Editors Extension](guides/inline-editors-ext.md) 文章。
:::

此外，还有一段视频教程演示了如何在网格中实现内联编辑。

<iframe width="704" height="400" src="https://www.youtube.com/embed/0rIPrC0GtME" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 编辑器类型

内联编辑器在 [editor_types](api/config/editor_types.md) 配置对象中定义。

系统预定义了几种内联编辑器:

- **text** 编辑器 - 用于如任务名称等文本列
- **number** 编辑器 - 用于如任务持续时间或排序等数值列
- **duration** 编辑器 - 用于持续时间列，特别是在 **map_to: "duration"** 且编辑器类型为 **"duration"** 时:

~~~js
{ type: "duration", map_to: "duration", formatter: formatter }
~~~

当需要指定同时包含数字和 [持续时间单位](api/config/duration_unit.md)（例如:`5 days`）的持续时间时，此编辑器类型非常有用。它默认使用 [Duration Formatter](guides/formatters-ext.md#chixushijiangeshihuaqi)。你也可以自定义其配置或提供 [自定义格式化器](guides/formatters-ext.md#zidingyigeshihuaqi)。

- **date** 编辑器 - 用于编辑如开始和结束日期等日期列
- **select** 编辑器 - 用于从列表中选择选项
- **predecessor** 编辑器 - 用于为当前任务设置前置任务。该编辑器使用 [任务的 WBS 编码](guides/specifying-columns.md#wbsbianma) 来与前置任务建立关联。

~~~js
var editors = {
    text: {type: "text", map_to: "text"},
    start_date: {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
        max: new Date(2019, 0, 1)},
    end_date: {type: "date", map_to: "end_date", min: new Date(2018, 0, 1), 
        max: new Date(2019, 0, 1)},
    duration: {type: "number", map_to: "duration", min:0, max: 100},
    priority: {type:"select", map_to:"priority", options:gantt.serverList("priority")},
    predecessors: {type: "predecessor", map_to: "auto"}
};
~~~


### 日期编辑器中的日期限制 {#dateslimits}

自 v6.3 起，**date** 内联编辑器没有预设的最小或最大值。

如果你希望时间轴上可见的日期动态决定 **date** 内联编辑器的 min 和 max 值（除非自定义了 min/max），可以指定动态的 **min/max** 函数:

~~~js
const dateEditor = {type: "date", map_to: "start_date", 
    min: function(taskId){
      return gantt.getState().min_date
    },
    max: function( taskId ){
      return gantt.getState().max_date
    }
};
~~~

### 支持包含性结束日期的编辑器 {#inclusiveenddate}

当你为任务使用 [包含性结束日期格式](api/template/task_end_date.md)，并希望在网格中正确支持内联编辑时，需要如下特殊的结束日期编辑器:

~~~js
// 包含性结束日期编辑器
// 使用默认编辑器，但重写 set_value/get_value 方法
var dateEditor = gantt.config.editor_types.date;
gantt.config.editor_types.end_date = gantt.mixin({
   set_value: function(value, id, column, node){
        var correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
   },
   get_value: function(id, column, node) {
        var selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
   },
}, dateEditor);

var textEditor = {type: "text", map_to: "text"};
var startDateEditor = {type: "date", map_to: "start_date"};
var endDateEditor = {type: "end_date", map_to: "end_date"};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};

gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", 
        editor: durationEditor, resize: true},
    {name: "start_date", label: "Start", width:140, align: "center", 
        editor: startDateEditor, resize: true},
    {name: "end_date", label: "Finish", width:140, align: "center", 
        editor: endDateEditor, resize: true}
];

// 更新 lightbox 和 grid 模板以显示包含性结束日期
gantt.templates.task_end_date = function(date){
    return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};


var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
    if(column === "end_date"){
        return gridDateToStr(new Date(date.valueOf() - 1)); 
    }else{
        return gridDateToStr(date); 
    }
}
~~~


**Related example:** [包含性结束日期编辑器](https://snippet.dhtmlx.com/ds28tk3c)


有关结束日期格式化的更多信息，请参阅 [任务结束日期显示 & 包含性结束日期](guides/loading.md#taskenddatedisplayampinclusiveenddates) 文章。

### 前置任务编辑器的值格式化 {#linkformatter}

:::note
此功能仅在 PRO 版本中可用。
:::

自 v6.3 起，Gantt 支持在内联编辑器中直接指定链接类型以及滞后/提前量。

要启用此功能，请使用 [Link Formatter](guides/formatters-ext.md#lianjiegeshihuaqi) 模块，并将 *LinksFormatter* 实例传递给 **predecessor** 编辑器:

~~~js
var formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "day", 
    format: "auto"
});
var linksFormatter = gantt.ext.formatters.linkFormatter({durationFormatter: formatter});
 
var editors = {
    text: {type: "text", map_to: "text"},
    start_date: {type: "date", map_to: "start_date", 
                min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)},
    end_date: {type: "date", map_to: "end_date", 
                min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)},
    duration: {type: "duration", map_to: "duration", 
                min:0, max: 100, formatter: formatter},
    priority: {type: "select", map_to: "priority", 
                options:gantt.serverList("priority")},
    predecessors: {type: "predecessor", map_to: "auto", formatter: linksFormatter} /*!*/
};
 
gantt.config.columns = [
    {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
    {name: "text", label: "Name", tree: true, width: 200, editor: editors.text, 
        resize: true},
    {name: "start_date", label: "Start", width:80, align: "center", 
      editor: editors.start_date, resize: true},
    {name: "predecessors", label: "Predecessors",width:80, align: "left", 
      editor: editors.predecessors, resize: true, template: function(task){
            var links = task.$target;
            var labels = [];
            for(var i = 0; i < links.length; i++){
                var link = gantt.getLink(links[i]);
                labels.push(linksFormatter.format(link)); /*!*/
            }
            return labels.join(", ")
        }},
    {name:"add"}
];
~~~


[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)


下面是自定义编辑器的代码示例:

- [简单数值输入](guides/inline-editing.md#zidingyineilianbianjiqi)
- [JQuery Datepicker 输入](guides/inline-editing.md#jquery_datepicker)

## 自定义内联编辑器

你可以通过如下方式定义新的编辑器对象，实现自定义内联编辑器:

~~~js
gantt.config.editor_types.custom_editor = {
  show: function (id, column, config, placeholder) {
    // 当输入框显示时调用，向 placeholder 插入 HTML 标记并初始化编辑器
    var html = "<div><input type='text' name='" + column.name + "'></div>";
       placeholder.innerHTML = html;
  },
  hide: function () {
    // 当输入框隐藏时调用
    // 在此清理复杂编辑器或解绑事件监听
  },
  
  set_value: function (value, id, column, node) {
    // 设置输入值
  },
  
  get_value: function (id, column, node) {
    // 返回输入值
  },
  
  is_changed: function (value, id, column, node) {
    // 在保存/关闭前调用。如果新值与原始值不同则返回 true
    // true 触发保存更改，false 跳过保存 
  },
  
  is_valid: function (value, id, column, node) {
    // 验证输入，返回 false 则放弃更改
    return true/false;
  },

  save: function (id, column, node) {
     // 针对 map_to:auto 的输入。复杂的保存逻辑可写在这里
  },
  focus: function (node) {
  }
}
~~~

方法说明如下:

- <span class="submethod">**show (id, column, config, placeholder): void**</span> - 当内联编辑器打开时触发。在这里添加 DOM 元素并初始化库。参数:
    - **_id_** - (*string | number*) - 任务 ID
    - **_column_** - (*GridColumn*) - 列配置对象
    - **_config_** - (*any*) - 自定义编辑器配置对象
    - **_placeholder_** - (*HTMLElement*) - 内联编辑器 DOM 元素
- <span class="submethod">**hide? (): void**</span> - 可选，编辑器关闭时调用
- <span class="submethod">**set_value (value, id, column, node): void**</span> - 在 **show** 后调用，从任务对象设置值。参数:
    - **_value_** - (*any*) - 任务属性值
    - **_id_** - (*string | number*) - 任务 ID
    - **_column_** - (*GridColumn*) - 列配置对象
    - **_node_** - (*HTMLElement*) - 内联编辑器 DOM 元素
- <span class="submethod">**get_value (id, column, node): any**</span> - 关闭前调用，从编辑器获取值。参数:
    - **_id_** - (*string | number*) - 任务 ID
    - **_column_** - (*GridColumn*) - 列配置对象
    - **_node_** - (*HTMLElement*) - 内联编辑器 DOM 元素
- <span class="submethod">**is_changed? (value, id, column, node): boolean**</span> - 可选，关闭前触发。返回 **true** 保存更改，**false** 取消。参数:
    - **_value_** - (*any*) - 任务属性值
    - **_id_** - (*string | number*) - 任务 ID
    - **_column_** - (*GridColumn*) - 列配置对象
    - **_node_** - (*HTMLElement*) - 内联编辑器 DOM 元素
- <span class="submethod">**is_valid? (value, id, column, node): boolean**</span> - 可选验证方法。返回 **false** 拒绝更改。参数:
    - **_value_** - (*any*) - 任务属性值
    - **_id_** - (*string | number*) - 任务 ID
    - **_column_** - (*GridColumn*) - 列配置对象
    - **_node_** - (*HTMLElement*) - 内联编辑器 DOM 元素
- <span class="submethod">**save? (id, column, node): void**</span> - 可选，适用于 `map_to:auto` 的复杂保存。参数:
    - **_id_** - (*string | number*) - 任务 ID
    - **_column_** - (*GridColumn*) - 列配置对象
    - **_node_** - (*HTMLElement*) - 任务对象
- <span class="submethod">**focus? (node): void**</span> - 可选，编辑器获得焦点时调用。
    - **_node_** - (*HTMLElement*) - 内联编辑器 DOM 元素

可复用编辑器的几个要点:

- 通常，**`get_value`** 只应返回当前编辑器的值而不修改任务对象。如果有效，Gantt 会自动更新任务。
- 使用 **`map_to`** 选项指定编辑器要更新的任务属性，避免在编辑器内部硬编码以便复用。
- 除非需要清理事件或销毁复杂控件，否则 **`hide`** 方法可以为空。
- 建议实现 **`is_changed`** 和 **`is_valid`** 方法:
  - **`is_changed`** 只有在值实际发生变化时才返回 true，以避免不必要的更新。
  - **`is_valid`** 用于阻止无效输入。
- 对于不仅仅是更新属性的编辑器（如内置的 [predecessor editor](guides/inline-editing.md#bianjiqileixing)），应在 **`save`** 方法中实现逻辑，并将 **`map_to`** 设为 *"auto"*。此时 gantt 不会直接修改任务，而是调用 **`save`** 应用更改。

下面是一个简单数值输入编辑器的示例。**`hide`** 方法为空，**`save`** 被省略。

~~~js
var getInput = function(node){
    return node.querySelector("input");
};

gantt.config.editor_types.simpleNumber = {
    show: function (id, column, config, placeholder) {
        var min = config.min || 0,
        max = config.max || 100;

        var html = "<div><input type='number' min='" + min + 
                      "' max='" + max + "' name='" + column.name + "'></div>";
        placeholder.innerHTML = html;
    },
    hide: function () {
      // 无需清理，编辑器移除后无需操作
    },
    set_value: function (value, id, column, node) {
        getInput(node).value = value;
    },
    get_value: function (id, column, node) {
        return getInput(node).value || 0;
    },
    is_changed: function (value, id, column, node) {
        var currentValue = this.get_value(id, column, node);
        return Number(value) !== Number(currentValue);
    },
    is_valid: function (value, id, column, node) {
        return !isNaN(parseInt(value, 10));
    },
    focus: function (node) {
        var input = getInput(node);
        if (!input) {
            return;
        }
        if (input.focus) {
            input.focus();
        }

        if (input.select) {
          input.select();
        }
    }
};
~~~

然后，像内置编辑器一样使用它:

~~~js
var numberEditor = {type: "simpleNumber", map_to: "quantity", min:0, max: 50}; 

gantt.config.columns = [
    ...
    {name: "quantity", label: "Quantity", width: 80, editor: numberEditor, 
        resize: true},
    ...
];
~~~

由于 Gantt 会自动移除编辑器 DOM 元素，这里的 **`hide`** 不需要额外清理。

### editor.hide {#jquery_datepicker}

当在内联编辑器中使用更复杂的控件时，可能需要添加 **`hide`** 方法进行清理。

例如，下面是一个用 jQuery UI 实现的 DatePicker 输入。需要在编辑器从 DOM 移除时销毁 datepicker 控件。

前置条件:

~~~js
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
~~~

编辑器实现:

~~~js
gantt.config.editor_types.custom_datepicker_editor = {
    show: function (id, column, config, placeholder) {
        placeholder.innerHTML = "<div><input type='text' id='datepicker' name='" + 
                                  column.name + "'></div>";
        $("#datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: function(dateStr){
                gantt.ext.inlineEditors.save()
            }
        });
    },
    hide: function (node) {
        $("#datepicker").datepicker( "destroy" );
    },

    set_value: function (value, id, column, node) {
        $("#datepicker").datepicker("setDate", value);
    },

    get_value: function (id, column, node) {
        return $("#datepicker").datepicker( "getDate" );
    },

    is_changed: function (value, id, column, node) {
        return (+$("#datepicker").datepicker( "getDate" ) !== +value);
    },
    is_valid: function (value, id, column, node) {
        return !(isNaN(+$("#datepicker").datepicker( "getDate" )))
    },
    save: function (id, column, node) {
    },
    focus: function (node) {
    }
};

let dateEditor = {
    type: "custom_datepicker_editor",
    map_to: "start_date"
};

gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true, editor: dateEditor},
    {name: "duration", align: "center"},
    {name: "add", width: 44}
];
~~~


**Related example:** [在编辑器中使用 jQuery Datepicker](https://plnkr.co/edit/U3vHJvleRBJ1Js0N?preview)


### editor.save

**`save`** 函数在编辑器需要同时更新任务的多个属性，或需要修改任务以外的对象时非常有用。

在这种情况下，你仍然可以实现 **`get_value`** 用于内置校验，但 gantt 不会尝试直接将编辑器的值应用到任务上，而是会调用 **`save`** 函数。

当调用 **`save`** 后，你需要解析输入值，并通过自定义代码将必要的更改应用到 gantt。**`save`** 方法执行完毕后，Gantt 会触发 [onSave](guides/inline-editors-ext.md#shijianfangfa) 事件。但它不会为已更新的行调用 [gantt.updateTask](api/method/updatetask.md)。

**注意！** 只有在编辑器配置中设置 **`map_to:"auto"`** 时，才会调用 **`save`** 方法:

~~~js
var editors = {
    ...
    predecessors: {type: "predecessor", map_to: "auto"}
};
~~~

一个很好的例子是内置的前置任务编辑器。你可以在相关示例中看到其简化实现:


**Related example:** [Built-in predecessor editor](https://snippet.dhtmlx.com/xz6192wd)


## 内联编辑模式

### 基础内联编辑

此模式假设使用鼠标聚焦单元格，并通过快捷键在单元格间导航:

- Tab - 焦点移动到下一个编辑器
- Shift+Tab - 焦点返回到上一个编辑器


[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)


### 键盘导航模式

在此模式下，使用键盘进行单元格的导航和编辑，支持预设的按键或组合键:

- Enter - 打开或关闭编辑器
- 空格键 - 打开编辑器
- 方向键 - 在单元格间导航
- Shift+右箭头 - 任务右移，变为嵌套任务，上方任务变为项目
- Shift+左箭头 - 项目转为普通任务
- Shift+上箭头 - 折叠任务分支
- Shift+下箭头 - 展开任务分支

要启用编辑时的键盘导航，需要:

- 使用 [gantt.plugins](api/method/plugins.md) 方法激活 **keyboard_navigation** 插件:

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

- 启用 [键盘导航](guides/keyboard-navigation.md) 和单元格导航:

~~~js
gantt.config.keyboard_navigation = true;
gantt.config.keyboard_navigation_cells = true;
~~~

你还可以启用 [placeholder row](api/config/placeholder_task.md)，即在任务列表末尾显示的空行，用户可编辑此行以添加新任务。

~~~js
gantt.config.placeholder_task = true;
~~~

或者，为了在添加新任务后让焦点自动移动到 placeholder task，可使用:

~~~js
gantt.config.placeholder_task = {
    focusOnCreate: true
};
~~~

如有需要，还可以激活 [自动检测任务类型](api/config/auto_types.md):

~~~js
gantt.config.auto_types = true;
~~~


[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)


### 自定义内联编辑

你可以自定义键盘映射--指定编辑器如何打开，并处理编辑器的相关事件（如打开、关闭、开始和结束编辑），方法是创建一个包含这些逻辑的对象，并通过专用方法应用你的映射:

~~~js
var mapping = {
 init: function(inlineEditors){
  // inlineEditor 模块初始化
  // 添加全局监听器，监控编辑开始/结束
 },

 onShow: function(inlineEditors, node){
  // 编辑器已显示
 },

 onHide: function(inlineEditors, node){
  // 编辑器已隐藏
  // 如有需要，清理 onShow 时的更改
 }
};

gantt.ext.inlineEditors.setMapping(mapping);
~~~


[Inline editing - Custom keyboard mapping](https://docs.dhtmlx.com/gantt/samples/07_grid/13_custom_mapping.html)


### 占位任务的自定义映射

假设你在 gantt 中同时使用了键盘导航、内联编辑器和占位任务，以下是两个常见场景。

**场景1.** 输入新占位任务名称并按下 Tab 后，你期望 Gantt 打开该任务的下一个单元格。但实际上，焦点会移动到下方的下一个占位任务，而不会打开内联编辑器。

**场景2.** 输入新占位任务名称后点击下一个单元格，Gantt 会将焦点移动到下一个占位任务，而不是你点击的单元格。

自定义映射可以帮助你指定，内联编辑器应如何响应鼠标和键盘操作。示例:


**Related example:** [Gantt. Custom mapping for placeholder task](https://snippet.dhtmlx.com/xcgiommu)

))

## 输入值校验

在 Grid 中编辑单元格时难免出现错误。

为了防止保存无效值，你应在关闭编辑器前校验输入。可通过以下方式实现:

- 在 [自定义编辑器对象](guides/inline-editing.md#zidingyineilianbianjiqi) 的 **is_valid** 方法中校验
- 使用 [inlineEditors 对象](guides/inline-editors-ext.md) 的 **onBeforeSave** 事件

校验对编辑器行为的影响如下:

如果通过鼠标在 Grid 单元格中打开编辑器:

- 按 Escape 关闭编辑器且不保存更改
- 按 Enter 若值有效则保存并关闭编辑器，否则输入内容被丢弃
- 按 Tab 或点击其他位置时，若值有效则保存并跳转到其他单元格，无效值会被重置且编辑器关闭

:::note
有关客户端或服务端校验的详细信息，请参见 [Validation](guides/validation.md) 文章。
:::

### 防止编辑器关闭

当启用校验时，Gantt 会重置无效输入并关闭编辑器，用户需重新打开单元格以修正值。

一种实用做法是弹出提示，让用户直接修正输入。可通过自定义键盘映射实现，如下:

~~~js
function editAnotherCell(inlineEditors){
  var value = inlineEditors.getValue();
  if(confirm(`does '${value}' look ok to you?`)){
    inlineEditors.save();
  }
}

var mapping = {
  init: function(inlineEditors){
    gantt.attachEvent("onTaskClick", function (id, e) {
      var cell = inlineEditors.locateCell(e.target);
      if (cell && inlineEditors.getEditorConfig(cell.columnName)) {
        if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
        else inlineEditors.startEdit(cell.id, cell.columnName);
        return false;
      }
      return true;
    });
    gantt.attachEvent("onEmptyClick", function () {
      inlineEditors.hide();
      return true;
    });
  },

  onShow: function(inlineEditors, node){

    node.onkeydown = function (e) {
      e = e || window.event;
      if(e.defaultPrevented){
        return;
      }

      var keyboard = gantt.constants.KEY_CODES;

      var shouldPrevent = true;
      switch (e.keyCode) {
        case gantt.keys.edit_save:
          var value = inlineEditors.getValue();
          if(confirm(`does '${value}' look ok to you?`)){
            inlineEditors.save();
          }
          
          break;
        case gantt.keys.edit_cancel:
          inlineEditors.hide();
          break;
        case keyboard.TAB:
          if(e.shiftKey){
            if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
            else inlineEditors.editPrevCell(true);
          }else{
            if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
            else inlineEditors.editNextCell(true);
          }
          break;
        default:
          shouldPrevent = false;
          break;
      }

      if(shouldPrevent){
        e.preventDefault();
      }
    };
  },

  onHide: function(inlineEditors, node){}
};

gantt.ext.inlineEditors.setMapping(mapping);

gantt.init("gantt_here");
~~~


**Related example:** [Custom keyboard mapping](https://snippet.dhtmlx.com/5/5da351260)


## 单击即可打开编辑器

在单选模式下，点击任务会立即打开内联编辑器。

在 [多选模式](guides/multiselection.md) 下，点击未选中的任务会先选中该任务，只有第二次点击才会打开内联编辑器。如果你希望首次点击即打开编辑器，可以启用 [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) 配置:

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

