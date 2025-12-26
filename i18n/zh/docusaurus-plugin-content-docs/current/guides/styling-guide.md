---
title: "使用甘特图样式"
sidebar_label: "使用甘特图样式"
---

# 使用甘特图样式

dhtmlxGantt 提供了丰富的选项来自定义其外观。你可以[应用预定义的皮肤以更改甘特图的整体外观](guides/skins.md)，也可以针对任务、连接线、时间刻度、网格等各个元素进行样式调整。

本指南汇总了对甘特图各部分进行样式设置的一般说明，帮助你更轻松地查阅文档。关于每个具体元素的详细信息，请参考相关文档。

## 网格样式

网格区域的样式可通过相关的 [그리드의 템플릿](guides/table-templates.md) 进行修改。

### 网格列标题

你可以使用 [grid_header_class](api/template/grid_header_class.md) 模板为网格列标题应用自定义样式。例如，可以这样更改特定标题的背景色:

~~~js
<style>
      .updColor{
        background-color:#ffeb8a!important;
      }
</style>
~~~

~~~js
gantt.templates.grid_header_class = function(columnName, column){
  if(columnName == 'duration' ||columnName == 'text')
    return "updColor";
};
~~~

![styling_columns_headers](/img/styling_columns_headers.png)


**Related example:** [Styling Headers of Grid Columns](https://snippet.dhtmlx.com/j01gqhtj)


### 网格标题中的自定义元素

你可以在网格标题中添加自定义元素，如按钮、图标或输入框。只需在 [**gantt.config.columns**](api/config/columns.md) 配置项中，将元素的 HTML 作为 **label** 属性的值即可:

~~~js
gantt.config.columns = [
  {name:"add", label:"", width:50, align:"left" },
  {name:"text", label:"<div class='searchEl'>Task name <input id='search' type='text'"+   /*!*/
      "placeholder='Search tasks...'></div>", width:250, tree:true},                          /*!*/
    // other columns
];
~~~

以下是搜索功能的实现方式:

~~~js 
var inputEl = document.getElementById('search');

inputEl.oninput = function(){
  gantt.refreshData();
}

function hasSubstr(parentId){
  var task = gantt.getTask(parentId);
  if(task.text.toLowerCase().indexOf(inputEl.value.toLowerCase() ) !== -1)
    return true;

  var child = gantt.getChildren(parentId);
  for (var i = 0; i < child.length; i++) {
    if (hasSubstr(child[i]))
      return true;
  }
  return false;
}

gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
  if (hasSubstr(id))
    return true;
  
      return false;
});
~~~

![custom_elements_grid_header](/img/custom_elements_grid_header.png)


**Related example:** [Custom Elements in Grid Header](https://snippet.dhtmlx.com/8jilpcrg)


#### 网格标题中的图标和图片

要在标题中包含图片或图标，可以通过 **label** 属性将其插入单元格的内部 HTML:

~~~js
var textLabel = [
    "<div class='gantt-text-label'>"+
    "<img src='http://docs.dhtmlx.com/scheduler/assets/index/icon1.png'>"+
    "<span>Text</span>" +
    "</div>"
].join("");

gantt.config.columns = [
    {name: "text", label:textLabel,tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true},
    {name: "duration", align: "center"},
    {name: "add", width: 44}
];
~~~


**Related example:** [Images in Grid Header: Columns Config](https://snippet.dhtmlx.com/5/55086fc42)


另外，也可以通过 CSS 的 **.gantt_grid_head_<columnName>** 选择器为标题单元格设置样式:

~~~css
.gantt_grid_head_text  {
    background-image:url('http://docs.dhtmlx.com/scheduler/assets/index/icon1.png');
    background-repeat:no-repeat;  
}
~~~

![custom_elements_grid_header_image](/img/custom_elements_grid_header_image.png)


**Related example:** [Images in Grid Header:CSS](https://snippet.dhtmlx.com/5/e13d18a10)


### 网格标题中的多行文本

请参考 [如何在网格单元格/标题中显示多行内容](guides/how-to.md#ruhezaiwanggedanyuangebiaotouzhongxianshiduoxingwenben) 部分的示例。

### 网格行的背景色

你可以通过 [grid_row_class](api/template/grid_row_class.md) 模板为包含任务的所有或特定网格行设置自定义背景色。例如，修改特定行的背景色:

~~~js
<style>
  .updColor{
      background-color:#ffeb8a!important;  
  }
</style>
~~~

~~~js
gantt.templates.grid_row_class = function(start, end, task){
 if(task.id == 12)
    return "updColor";
};
~~~

![grid_row_bg](/img/grid_row_bg.png)


**Related example:** [Coloring Grid Rows](https://snippet.dhtmlx.com/y0dbph4x)


### 网格行悬停时的颜色

要在鼠标悬停时高亮显示网格行，可以应用如下样式规则:

~~~js
.gantt_grid_data .gantt_row.odd:hover, .gantt_grid_data .gantt_row:hover,
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected{
    background-color: cyan; 
}
~~~

![grid_row_hover_color](/img/grid_row_hover_color.png)


**Related example:** [Coloring Grid Rows on Hover](https://snippet.dhtmlx.com/730ig4ck)


### 自定义网格列 {#customizationgridcolumns}

dhtmlxGantt 允许你通过 [**gantt.config.columns**](api/config/columns.md) 配置项的 **template** 属性自定义网格列的默认外观。

**template** 属性是一个接收数据项对象并返回最终内容的函数。这样你可以实现几乎任何内容的自定义。例如，可以更改网格行的文本颜色，或在网格列中使用自定义元素。

#### 网格行文本颜色

要根据任务优先级为任务设置不同的文本颜色，可以这样做:

~~~js
gantt.config.columns="["
    {name:"text",       label:"Task name",  tree:true, width:230, template:myFunc },   /*!*/
    {name:"start_date", label:"Start time", align: "center" },
    {name:"duration",   label:"Duration",   align: "center" }
];

function myFunc(task){
    if(task.priority ==1)
        return "<div class='important'>"+task.text+" ("+task.users+") </div>";
    return task.text+" ("+task.users+")";
};
~~~

![columns_text_color](/img/columns_text_color.png)


[Template for tree nodes](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)


#### 网格列中的自定义元素

要在网格列中添加按钮或输入框等自定义元素，只需将元素的 HTML 作为该列的 **template** 属性:

~~~js
var colContent = function (task) {
    return ('<i class="fa gantt_button_grid gantt_grid_edit fa-pencil"'+
                'onclick="clickGridButton(' + task.id + ', 'edit')"></i>' +
            '<i class="fa gantt_button_grid gantt_grid_add fa-plus"'+
                'onclick="clickGridButton(' + task.id + ', 'add')"></i>' +
            '<i class="fa gantt_button_grid gantt_grid_delete fa-times"'+
                'onclick="clickGridButton(' + task.id + ', 'delete')"></i>');
};

gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true},
    {name: "duration", align: "center"},
    {name: "buttons", label: colHeader, width: 75, template: colContent}  /*!*/
];
~~~

![custom_elements_grid_columns](/img/custom_elements_grid_columns.png)


[Custom Buttons in a Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/07_custom_buttons.html)


#### 网格列中过长文本省略显示

Gantt 会自动缩短网格行中过长的文本。

自 7.0 版本起，你可以通过重定义相关 CSS 类 **.gantt_tree_content**，用省略号截断网格行中超长内容:

~~~js
<style>
.gantt_tree_content {
    overflow:hidden;
    text-overflow: ellipsis;
}
</style>

gantt.init("gantt_here");
~~~

![truncate_text](/img/truncate_text.png)


**Related example:** [Truncate long text with ellipsis](https://snippet.dhtmlx.com/d82twxd8)


#### 网格单元格中的多行文本

请参见 [如何在网格单元格/标题中显示多行内容](guides/how-to.md#ruhezaiwanggedanyuangebiaotouzhongxianshiduoxingwenben) 部分的示例。

## 时间刻度样式

时间刻度的样式通过相关的 [时间线区域模板](guides/timeline-templates.md) 控制。

### 刻度行

你可以使用 **scale_row_class** 模板为刻度行设置样式。例如，设置背景色:

~~~js
<style>
  .updColor{
      background-color:#ffeb8a!important      
  }
</style>
~~~

~~~js
gantt.templates.scale_row_class = function(scale){           
    return "updColor";
}
~~~

![color_scale_row](/img/color_scale_row.png)
 

**Related example:** [Styling Row of the Scale](https://snippet.dhtmlx.com/7ngm6yzk)


### 刻度单元格

你也可以通过 **scale_cell_class** 模板为特定刻度单元格设置样式。例如，高亮时间线区域中的周末:

~~~js
gantt.templates.scale_cell_class = function(date){
    if(date.getDay()==0||date.getDay()==6){
        return "updColor";
    }
};
~~~

![styling_scale_cells](/img/styling_scale_cells.png)


**Related example:** [Styling Separate Cells on the Scale](https://snippet.dhtmlx.com/emdjgwln)


更多细节请参见 [스케일 설정하기](guides/configuring-time-scale.md) 和 [타임 슬롯 하이라이트하기](guides/highlighting-time-slots.md)。

### 子刻度

可以通过 [scales](api/config/scales.md) 属性的 **css** 属性为刻度分配新样式。例如，单独为周末着色:

~~~js
<style type="text/css">
    .weekend{
        background: #F0DFE5 !important;
    }
</style>
~~~

~~~js
var daysStyle = function(date){
    var dateToStr = gantt.date.date_to_str("%D");
    if (dateToStr(date) == "Sun"||dateToStr(date) == "Sat")  return "weekend";

    return "";
};

gantt.config.scales = [
    {unit:"day", format:"%D", css:daysStyle }
];
~~~

![styling_subscale](/img/styling_subscale.png)


[Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)


## 任务样式

任务的样式可以通过相应的 [时间线区域模板](guides/timeline-templates.md) 进行自定义。

### 任务条

你可以重定义 [task_class](api/template/task_class.md) 模板来更新任务样式。详见 [Tasks Coloring](guides/colouring-tasks.md)

~~~js
gantt.templates.task_class = function(start, end, task){return "";};
~~~

![coloring_tasks](/img/coloring_tasks.png)


[Task styles](https://docs.dhtmlx.com/gantt/samples/04_customization/04_task_styles.html)


模板支持动态样式。例如，可以根据任务进度动态更改颜色:

~~~js
gantt.templates.task_class = function(start,end,task){
    if(task.progress > 0.5){
        return "";
    }else{
        return "important";
    }
};
~~~

![dynamic_styling](/img/dynamic_styling.png)


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


### 任务条文本

[task_text](api/template/task_text.md) 模板支持任务条文本的内联样式:

~~~js
gantt.templates.task_text = function(start, end, task){
  if(task.id == 12)
    return "<span style='color:red'>"+task.text+"</span>";
  
  return task.text;
};
~~~

![inline_styling_task_text](/img/inline_styling_task_text.png)


**Related example:** [Inline Styling of the Task Text](https://snippet.dhtmlx.com/us1g45wg)


#### 多行文本

请参考 [示例](https://snippet.dhtmlx.com/55uy7ibo) 和 [如何在网格单元格/标题中显示多行内容](guides/how-to.md#ruhezaiwanggedanyuangebiaotouzhongxianshiduoxingwenben) 部分。

### 任务条中的自定义元素

也可以通过 [task_text](api/template/task_text.md) 模板在任务条中添加自定义元素。例如，插入按钮:

~~~js
gantt.templates.task_text = function(start, end, task){  
  return task.text+" <button>Text</button>";    
};
~~~

![custom_elements_task_bars](/img/custom_elements_task_bars.png)


**Related example:** [Custom Elements in Task Bars](https://snippet.dhtmlx.com/fahpyr58)


### 通过任务对象属性设置样式

你可以通过在任务对象配置中添加额外属性自定义任务颜色。可用属性有:**color**、**textColor** 和 **progressColor**。

~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, color:"red"},
     {id:2, text:"Task #1", start_date:"02-04-2013", 
        duration:8, color:"blue", parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getTask(1).color = "red"
~~~

更多信息请参见 [Tasks Coloring](guides/colouring-tasks.md) 相关部分。

### 通过弹窗（lightbox）样式化任务条

你可以设置一组预定义颜色，并将其作为选项包含在 lightbox 配置中。这样可以为任务分配文本或背景颜色:

~~~js
var colors = [
    {key:"", label:"Default"},
    {key:"#4B0082",label:"Indigo"},
    {key:"#FFFFF0",label:"Ivory"},
    {key:"#F0E68C",label:"Khaki"}
    // more colors
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"color", type:"select", options:colors},
    {name:"textColor", height:22, map_to:"textColor", type:"select", options:colors},
    {name:"time", type:"duration", map_to:"auto"}
];
~~~

![task_style_property](/img/task_style_property.png)


[Specify inline colors for Tasks and Links](https://docs.dhtmlx.com/gantt/samples/04_customization/16_inline_task_colors.html)


### 时间线区域的行

[task_row_class](api/template/task_row_class.md) 模板允许你更改甘特图任务后方时间线行的颜色。

~~~js
gantt.templates.task_row_class = function(start, end, task){
  if(task.id == 12)
      return "updColor";
};
~~~

![styling_timeline_row](/img/styling_timeline_row.png)


**Related example:** [Styling Rows of the Timeline Area](https://snippet.dhtmlx.com/33jfmwsp)


[Custom tree formatting](https://docs.dhtmlx.com/gantt/samples/04_customization/02_custom_tree.html)


### 高亮时间线单元格

你可以基于星期几高亮特定时间线单元格，使用 **timeline_cell_class** 模板。该模板函数会遍历所有单元格，并为选中的单元格应用 CSS 类。例如，可以这样高亮周末:

~~~js
<style>
    .weekend{
        background: #f4f7f4;
    }    
</style>
~~~

~~~js
gantt.templates.timeline_cell_class = function(item,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend"
    }
};
~~~

![styling_timeline_cells](/img/styling_timeline_cells.png)


[Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)


更多信息请参见 [타임 슬롯 하이라이트하기](guides/highlighting-time-slots.md) 文章。

### 显示外部元素（基线、截止线等）

:::note
此功能仅在 PRO 版本中可用。
:::

你可以在甘特图中添加额外元素，如基线或截止标记。为此，请使用 [addTaskLayer](api/method/addtasklayer.md) 方法创建新的显示层，并在其中添加自定义元素。该方法接受一个函数，该函数接收任务对象，并返回用于显示的 DOM 元素，或者返回 *false* 以隐藏该任务的元素:

~~~js
gantt.addTaskLayer(function myNewElement(task) {
    var el = document.createElement('div');
    // your code
    return el;
});
~~~

此类外部元素示例包括:

- 基线

![show_baselines](/img/show_baselines.png)


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


- 截止线

![show_deadlines](/img/show_deadlines.png)


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


更多详情请参见 [타임라인 영역의 커스텀 요소](guides/baselines.md) 文章。

### 任务的工具提示

工具提示为显示任务详情提供了一种简洁方式。

![default_task_tooltip](/img/default_task_tooltip.png)

默认情况下，当你启用 [tooltip](guides/extensions-list.md#gongjutishi) 插件时，任务会显示工具提示。

#### 自定义工具提示文本

要自定义工具提示文本，请使用 [tooltip_text](api/template/tooltip_text.md) 模板:

~~~js
gantt.templates.tooltip_text = function(start,end,task){
    return "<b>Task:</b> "+task.text+"

<b>Duration:</b> " + task.duration;
};
~~~

更多关于工具提示的信息可参见 [Gantt 요소의 툴팁](guides/tooltips.md) 文章。

## 链接样式化

你可以使用 [의존성 링크 템플릿](guides/dependency-templates.md) 资源自定义依赖链接的外观。

### 依赖链接的线条

[link_class](api/template/link_class.md) 模板允许你更改依赖线的颜色。

~~~js
gantt.templates.link_class = function(link){
    return "";
};
~~~

![coloring_links](/img/coloring_links.png)


[Link styles](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)


更多信息可参见 [링크 색상 및 스타일링](guides/colouring-lines.md) 文章。

### 通过链接对象属性设置链接颜色

你也可以通过在链接对象中添加 **color** 属性来定义依赖链接的自定义颜色:

~~~js
var tasks = {
  data:[
     // tasks configuration
  ],
  links:[
     {id:1, source:1, target:2, type:"1", color:"red"}, 
     {id:2, source:2, target:3, type:"0", color:"blue"}
  ]
};
 
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getLink(2).color = "blue";
~~~

更多详情请参见 [링크 색상 및 스타일링](guides/colouring-lines.md) 部分。

### 悬停时的链接颜色

你可以通过 CSS 在鼠标悬停时更改链接颜色:

~~~js
.gantt_task_link:hover .gantt_line_wrapper div{
    box-shadow: 0 0 5px 0 yellowgreen;
    background: yellowgreen
}
  
.gantt_task_link:hover .gantt_link_arrow_left,
.gantt_task_link:hover .gantt_link_arrow_right{
    border-left-color: yellowgreen !important;
    border-right-color: yellowgreen !important;
}
~~~


**Related example:** [Link color on hover](https://snippet.dhtmlx.com/z3friavt)


![link_hover_color](/img/link_hover_color.png)

更多详情请参见 [링크 색상 및 스타일링](guides/colouring-lines.md) 文章。

### 依赖链接的弹窗

[drag_link_class](api/template/drag_link_class.md) 模板允许你自定义在拖动任务间依赖线时显示的弹窗样式。例如，你可以调整弹窗的背景和文本颜色:

~~~js
<style>
  .gantt_link_tooltip{color:red; background-color:yellow} 
</style> 
~~~

~~~js
gantt.templates.drag_link_class = function(from, from_start, to, to_start) {
    return "gantt_link_tooltip" ;
};
~~~

![styling_link_popup](/img/styling_link_popup.png)


**Related example:** [Styling the Popup of Dependency Link](https://snippet.dhtmlx.com/7o5f261z)


更多信息请参见 [의존성 링크 템플릿](guides/dependency-templates.md) 文章。

### 从界面编辑链接值

虽然有用于编辑和样式化任务条的 lightbox，但没有内置的界面用于编辑链接。不过，你可以按照
[专门文章](guides/crud-dependency.md#tongguojiemianbianjilianjiezhi) 中的方法自行构建界面。

![link_edit_ui](/img/link_edit_ui.png)


**Related example:** [Custom UI for Editing Link Values](https://snippet.dhtmlx.com/2208ic0t)


## 快速信息弹窗样式化

快速信息弹窗的样式通过 ['Quick Info' 확장(터치 지원)의 템플릿](guides/touch-templates.md) 模板控制。

你可以使用 [quick_info_class](api/template/quick_info_class.md) 模板为弹窗编辑表单应用样式。例如，为特定任务的快速信息弹窗设置样式:

~~~js
<style>
  .updColor{
      background-color:#ffeb8a!important;
  }
  .updColor .gantt_cal_qi_title{
      background-color:#ffeb8a!important;
  }
</style>
~~~

~~~js
gantt.templates.quick_info_class = function(start, end, task){ 
  if(task.id == "12")
    return "updColor";
  
      return ""
};
~~~

![styling_quick_info](/img/styling_quick_info.png)


**Related example:** [Styling Quick Info Popup](https://snippet.dhtmlx.com/b92gyqwu)

