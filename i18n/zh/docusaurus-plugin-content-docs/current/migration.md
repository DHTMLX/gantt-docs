---
title: "从旧版本迁移"
sidebar_label: "从旧版本迁移"
---

# 从旧版本迁移


## 8.0 -> 9.0


v9.0 更新引入了若干重大变更。

### 皮肤切换为 CSS 变量

CSS 皮肤（主题）已完全重构，现在采用 CSS 变量实现。虽然组件的 HTML 结构和 CSS 类名大部分保持不变，但为旧版本 Gantt 编写的 CSS 样式在 v9.0 中可能无法如预期生效。

例如，以下样式用于根据任务优先级着色:

~~~html
<style>
    /* 覆盖边框/进度颜色的通用样式 */
    .gantt_task_line{
        border-color: rgba(0, 0, 0, 0.25);
    }
    .gantt_task_line .gantt_task_progress {
        background-color: rgba(0, 0, 0, 0.25);
    }

    /* 高优先级 */
    .gantt_task_line.high {
        background-color: #03A9F4;
    }
    .gantt_task_line.high .gantt_task_content {
        color: #fff;
    }

    /* 中优先级 */
    .gantt_task_line.medium {
        background-color: #f57730;
    }
    .gantt_task_line.medium .gantt_task_content {
        color: #fff;
    }

    /* 低优先级 */
    .gantt_task_line.low {
        background-color: #e157de;
    }
    .gantt_task_line.low .gantt_task_content {
        color: #fff;
    }
</style>
~~~

从 v9.0 开始，可以使用以下样式实现相同效果:

~~~html
<style>
    /* 高优先级 */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* 中优先级 */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* 低优先级 */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }
</style>
~~~

可在 [스킨 커스터마이제이션](guides/custom-skins.md) 页面查看可用变量。

:::note
迁移时很可能需要更新现有 CSS 以达到所需设计效果。
:::

### 单一 CSS 文件

所有主题现在都集成在一个 **dhtmlxgantt.css** 文件中。

如需激活特定皮肤，请使用 `gantt.skin` 属性:

~~~js
gantt.skin = "material";
~~~

或使用 [setSkin](api/method/setskin.md) 方法:

~~~js
gantt.setSkin("material");
~~~

:::note
请注意，`gantt.setSkin()` 会重新渲染 Gantt。
:::

如果你使用的是 **terrace** 以外的皮肤，迁移步骤如下:

1) 替换皮肤的 CSS 文件为 `dhtmlxgantt.css` 文件:

~~~html
<!-- 旧 -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt_material.css" type="text/css">
<!-- 新 -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt.css" type="text/css">
~~~

2) 在 JavaScript 中启用所需皮肤:

~~~js
gantt.setSkin("material");
gantt.init("gantt_here");
~~~

### 内置基线、截止日期和约束支持

此前，添加基线需要通过 `gantt.addTaskLayer` API 手动实现。从 Gantt 9.0 起，已内置对基线实体、截止日期和任务约束的支持。

如果需要关闭默认设置，手动渲染基线和截止日期，可以使用相关配置项:[baselines](api/config/baselines.md) 与 [deadlines](api/config/deadlines.md):

~~~js
// 禁用内置基线功能
gantt.config.baselines = false;

// 禁用内置截止日期功能
gantt.config.deadlines = false;
~~~

任务约束的内置显示也可通过扩展的 [auto_scheduling](api/config/auto_scheduling.md) 配置关闭:

~~~js
gantt.config.auto_scheduling = {
  enabled: true, 
  show_constraints: false /*!*/
};
~~~

这样会关闭任务约束的默认显示，但仍保留自动调度功能。

### 时间线中的粘性标签

自 v9.0 起，时间刻度标签默认为粘性。即标签在滚动时始终可见，直到自然滚动出视口。在旧版本中，标签居中显示在单元格内，滚动时不会保持可见。

如需恢复旧行为并禁用粘性标签，可将 [scale](guides/configuring-time-scale.md) 对象的 `sticky` 属性设为 false:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: false},
  {unit: "month", step: 1, format: "%F", sticky: false},
  {unit: "day", step:1, format: "%j", sticky: false}
];
~~~

### Promise 实现

**Bluebird** 库已从 Gantt 包中移除。[Promise](api/method/promise.md) 现在使用原生 Promise 实现。

### Lightbox 调整大小

自 v9.0 起，[resizeLightbox](api/method/resizelightbox.md) 方法已弃用并从 Gantt 代码中移除。现在 lightbox 的尺寸调整已自动实现，无需手动调用。
请注意，如果你的配置中包含 **resizeLightbox()** 方法，应将其移除以避免报错。

## 7.1 -> 8.0


### 资源分配

在早期版本的 DHTMLX Gantt 中，资源分配的变更作为任务对象的属性发送到后端，这在某些情况下使后端 API 集成变得更复杂。

从 DHTMLX Gantt v8.0 起，对资源及资源分配的变更可通过 dataProcessor 路由。详见 [Routing CRUD actions of resources and resource assignments](guides/server-side.md#ziyuanjiziyuanfenpeidecrudluyou) 部分。

### 导出服务

自 v8.0 起，导入/导出功能已集成到 gantt 库中。

因此，如果你已在页面中包含 **https://export.dhtmlx.com/gantt/api.js** 以启用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

则需移除该文件，并通过 **gantt.plugins** 方法启用 **export_api** 扩展:

~~~js
gantt.plugins({
    export_api: true
});
~~~

### 已弃用的类名

自 v8.0 起，以下已弃用的类名被移除并替换为新的类名:

- ".dhtmlx-info" -> **".gantt-info"**
- ".dhtmlx-error" -> **".gantt-info"**
- ".dhtmlx_popup_title" -> **".gantt_popup_title"**
- ".dhtmlx_popup_text" -> **".gantt_popup_text"**
- ".dhtmlx_popup_controls" -> **".gantt_popup_controls"**
- ".dhtmlx_ok_button" -> **".gantt_ok_button"**
- ".dhtmlx_click_me_button" -> **".gantt_click_me_button"**
- ".dhtmlx_popup_button" -> **".gantt_popup_button"**
- ".dhtmlx_modal_box" -> **".gantt_modal_box"**
- ".dhtmlx-" + config.type -> **".gantt-" + config.type**
- ".dhtmlx_" + btn.label.toLowerCase() + "_button" -> **".gantt_" + btn.label.toLowerCase() + "_button"**

## 7.0 -> 7.1


7.1 版本未引入任何需要修改现有代码的重大变更。

里程碑渲染方式有细微视觉变化，如有需要可通过代码还原。对于使用资源面板的大型项目，由于资源分配新逻辑，可能会出现性能下降问题，可通过禁用不需要的逻辑进行优化。

### 里程碑

与旧版本相比，里程碑元素的尺寸已更改，使其高度与常规条形一致。

如需让里程碑外观与旧版本一致，可通过 **bar_height** 属性调整里程碑元素高度:

~~~js
{
    id:23, text:"Mediate milestone", start_date:"13-04-2018", 
    type:"milestone", parent:"15", bar_height: 35
}
~~~

### 资源分配

7.1 版本为资源分配增加了复杂逻辑，允许指定资源分配的日期，并可通过 DataStore 操作资源分配。
该更改不会影响现有代码，但可能会对资源计算带来明显性能开销。

如果不需要为任务的特定日期分配资源，可通过 **process_resource_assignments** 配置关闭新功能以提升性能:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### 任务对象的新可选属性

以下任务对象属性现在被 gantt 处理，并影响任务显示:

- "task.row_height"
- "task.bar_height"
- "task.hide_bar"
- "task.rollup"
  
如果你有同名的自定义属性，请重命名以避免冲突。

### 数据解析时的深拷贝

Gantt 在 [v6.3.2](whats-new.md#632) 到 v7.1 期间在数据解析时会深拷贝数据对象。

从 v7.1 起，该功能默认禁用。

可通过设置 [gantt.config.deepcopy_on_parse](api/config/deepcopy_on_parse.md) 为 *true* 启用旧行为:

~~~js
gantt.config.deepcopy_on_parse = true;
~~~

### 已弃用的配置项

自 v7.1 起，**gantt.config.task_height** 属性已弃用。尽管该属性仍可用，且如指定会继续生效，建议使用新的 [gantt.config.bar_height](api/config/bar_height.md) 选项:

~~~js
gantt.config.bar_height = 50;
~~~

## 6.3 -> 7.0


### 扩展和本地化文件

最新的 v7.0 更新在 Gantt 包结构上有两项重要变更:

1) 所有扩展文件现已与 *dhtmlxgantt.js* 文件打包在一起。
因此，如需激活 dhtmlxGantt 提供的任何扩展，需使用 API 调用。

- 如果你已在页面中引入内置包中的扩展文件，例如:

~~~js
<script src="../codebase/dhtmlxgantt.js"></script>
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

或

~~~js
import "dhtmlx-gantt";
import "dhtmlx-gantt/ext/dhtmlxgantt_auto_scheduling";
~~~

则需移除扩展文件，并通过 **gantt.plugins** 方法启用扩展:

~~~js
gantt.plugins({
   auto_scheduling: true
});
~~~

完整扩展列表见 [此处](guides/extensions-list.md)。

- 如果你使用的是修改过的扩展文件或自定义扩展，可像以前一样作为文件引入页面即可正常使用。

- **注意**，**dhtmlxgantt_smart_rendering.js** 和 **dhtmlxgantt_csp.js** 扩展已完全移除，无需手动启用。


2) 所有本地化文件现已集成在 *dhtmlxgantt.js* 文件中。如需启用，可通过 API 调用。

- 如果你在页面中引入了本地化文件，需将其移除，并通过 **gantt.i18n.setLocale** 启用所需语言:

~~~js
gantt.i18n.setLocale("de");
~~~

- 如使用自定义本地化文件，可继续按原方式加载。

### 工作时间默认设置变更

7.0 之前的所有版本，默认工作时间为 8:00 至 17:00，即每天 9 小时。


从 v7.0 起，工作时间为 8:00-12:00, 13:00-17:00，即每天 8 小时。

如需恢复旧设置，请手动设置:

~~~js
gantt.setWorkTime({hours: [8, 17]});
~~~

### 内容安全策略（Content Security Policy）

**ext/dhtmlxgantt_csp.js** 扩展已被移除，不再需要。它已被默认启用的 [csp config](api/config/csp.md) 替代；应将该扩展从 gantt 中移除。

由于 dhtmlxGantt 库新增了 **csp** 属性，所有 Gantt 元素将分配有效的 HTML5 属性，这些属性可在支持 HTML5 doctype 的任何浏览器中使用。


因此，建议将已有属性更新为新的属性:

- "task_id" -> ["data-task-id"](api/config/task_attribute.md)
- "link_id" -> ["data-link-id"](api/config/link_attribute.md)
- "resource_id" -> ["data-resource-id"](api/config/resource_attribute.md)
- "column_index" -> ["data-column-index"](api/config/grid_resizer_column_attribute.md)

不过，旧属性仍包含在标记中，因此如果不更改属性名称，您的代码仍可继续运行。

### 栅格单元格样式

早期，栅格单元格的对齐方式通过 `display:inline-block` 实现。从 v7.0 开始，改为使用 `display:flex`，单元格位于 flex 容器内。

此更改不会影响用户可见的界面（保持完全一致），通常不会引发迁移问题。但如果栅格单元格样式出现回归，可能与此更新有关。

### 移除 "xml_date" 配置和模板，以及 "xml_format" 模板

在 v6.2 已弃用的配置和模板，在 v7.0 被移除，并用新方案替代:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

如果您代码中已定义旧名称，它们仍可继续使用。否则，请使用新版 API。

## 6.2 -> 6.3


### 多任务选择

自 v6.3 起，**ext/dhtmlxgantt_multiselect.js** 扩展自动允许同时水平拖动多个已选任务。
如需禁用该功能，请使用 [drag_multiple](api/config/drag_multiple.md) 属性并将其设为 *false*（默认启用）。

~~~js
gantt.config.drag_multiple = false;
~~~

### Google Roboto 字体不再包含在 Material 皮肤中

在 v6.3 之前，Google [Roboto](https://fonts.google.com/specimen/Roboto) 字体通过 `import` 语句包含在 dhtmlxGantt 的 ['Material' 皮肤](guides/skins.md#materialpifu) 中。
自 v6.3 起，该导入已被移除，因此您需要手动添加 `Roboto` 字体:

~~~html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family="Open+Sans|Roboto:regular,medium,thin,bold"">
~~~

### 与 Require.JS 的配合使用

早期，在基于 RequireJS 的应用中，dhtmlxGantt 库的不同文件可使用任意名称:

~~~js
requirejs.config({
  paths: {
    "gantt": "../../codebase/dhtmlxgantt",
    "tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "marker": "../../codebase/ext/dhtmlxgantt_marker",
    "locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "tooltip": ["gantt"],
    "marker": ["gantt"],
    "locale_de": ["gantt"],
  }
});
requirejs(["gantt", "tooltip", "marker", "locale_de"],
function (dhx) {
  var gantt = dhx.gantt;
 ...
});
~~~

自 6.3 起，模块名称必须根据 dhtmlxGantt 库的文件夹结构固定:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "ext/dhtmlxgantt_critical_path": "../../codebase/ext/dhtmlxgantt_critical_path",
    "locale/locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "ext/dhtmlxgantt_tooltip": ["dhtmlxgantt"],
    "ext/dhtmlxgantt_critical_path": ["dhtmlxgantt"],
    "locale/locale_de": ["dhtmlxgantt"],
  }
});
 
requirejs(["dhtmlxgantt", "ext/dhtmlxgantt_tooltip", "ext/dhtmlxgantt_critical_path", 
            "locale/locale_de"], 
function (dhx) {
  var gantt = dhx.gantt;
...
});
~~~

请确保包内任意文件的模块名为*包中 codebase 文件夹内的相对路径*加*文件名*，例如:

**核心库:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"

**扩展:**

- "ext/dhtmlxgantt_critical_path": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_critical_path"
- "ext/dhtmlxgantt_tooltip": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_tooltip"

**语言包:**

- "locale/locale_de": "./vendor/dhtmlxgantt/locale/locale_de"
- "locale/locale_be": "./vendor/dhtmlxgantt/locale/locale_be"

### 内联编辑器 {#inline_editors}

在 6.3 之前，**date** [内联编辑器](guides/inline-editing.md#bianjiqileixing) 的最小和最大值受时间轴可见日期限制，除非自定义了 min/max。

自 v6.3 起，日期编辑器默认不再有最小和最大值限制。

如需恢复旧行为，可指定动态 **min**/**max** 值:

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

## 6.1 -> 6.2


升级到 v6.2 通常与 v6.1 兼容，无需更改代码。
但部分组件行为已更改（可通过配置恢复旧行为），部分 API 已弃用。

### 智能渲染与静态背景

智能渲染功能已更新并内嵌到组件中。现在主时间线区域和资源面板均支持。所有时间线仅渲染当前可见的行和单元格。

可通过 **smart_rendering** 配置禁用智能渲染，恢复 v6.1 的默认行为:

~~~js
gantt.config.smart_rendering = false;
~~~

**dhtmlxgantt_smart_rendering** 扩展已不再需要，应从 gantt 中移除。该扩展仍包含在包内以防兼容性问题。
如果页面中添加了该扩展，gantt 会回退至 v6.1 的智能渲染模式。

**[static_background](api/config/static_background.md)** 配置的行为也已更新。从 v6.2 起，将渲染 PNG 背景以及通过模板函数附加了 CSS 类的所有单元格。

如需回退到 v6.1 行为，请使用 **static_background_cells** 配置:

~~~js
gantt.config.static_background_cells = false;
~~~

### 时间轴设置

时间轴配置已简化。无需为每个刻度分别指定多个配置项，现在只需用一项配置 [[scales](api/config/scales.md)]，包含多个刻度对象及其设置。

以下时间轴 API 已弃用:

- gantt.config.scale_unit
- gantt.config.step
- gantt.config.date_scale
- gantt.templates.date_scale
- gantt.config.subscales

例如，以下代码:

~~~js
gantt.config.scale_unit = "day"; 
gantt.config.step = 1; 
gantt.config.date_scale = "%d %M"; 
gantt.templates.date_scale = null; 
gantt.config.subscales = [];
~~~

现在应写为:

~~~js
gantt.config.scales = [ { unit:"day", step: 1, format: "%d %M"} ];
~~~

#### task_cell_class 模板重命名

用于定义时间线区域单元格 CSS 类的模板已重命名:

- gantt.templates.task_cell_class → [gantt.templates.timeline_cell_class](api/template/timeline_cell_class.md)

重命名后的模板用法示例:

~~~js
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
 
gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### "xml_date" 配置和模板，以及 "xml_format" 模板重命名

以下为旧 API 的替换方案:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

自 v6.2 起，**xml_date** 配置及 **xml_date** 和 **xml_format** 模板的默认值为 *undefined*。如果未为其赋值，则不会生效。

不过，Gantt 仍会继续支持这些旧名称，因此如果代码中重定义了这些 API，仍可正常工作。例如:

~~~js
// 仍可正常工作
gantt.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

### 移除未使用的 API

**gantt.config.api_date** 配置和 **gantt.templates.api_date** 模板已从 API 移除，因为 gantt 代码内部未使用。如果您的代码中有用到，请重新声明:

~~~js
gantt.config.api_date = "%d-%m-%Y %H:%i";
gantt.templates.api_date = gantt.date.date_to_str(gantt.config.api_date);
~~~

## 6.0 -> 6.1 


### 时间约束和自动调度

**dhtmlxgantt_auto_scheduling.js** 扩展已升级并支持 [任务约束](guides/auto-scheduling.md#timeconstraintsfortasks) 功能。由于此功能会修改自动调度的默认行为，
Gantt 支持兼容模式，可恢复原有行为，在自动调度时不考虑任务约束。

进入兼容模式，请使用以下配置项:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~

### 工具提示显示区域

在6.1版本之前，[工具提示](guides/tooltips.md) 仅显示在甘特图的时间轴区域内。从v6.1版本开始，工具提示的显示不再受限，工具提示会跟随鼠标指针移动。

如有需要，可以在Gantt初始化前，通过以下代码恢复之前的行为:

~~~js
gantt.attachEvent("onGanttReady", function(){
    var tooltips = gantt.ext.tooltips;
     tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

## 5.2 -> 6.0


在6.0版本中，**getSlack()** 方法已废弃。新增了两个方法:

- [getFreeSlack](api/method/getfreeslack.md) - 返回任务的自由时差
- [getTotalSlack](api/method/gettotalslack.md) - 返回任务的总时差

在v[4.0](#3x---40)中标记为废弃的方法在v6.0中已停止工作。**dhtmlx** 对象定义已从 *dhtmlxgantt.js* 中移除。

如果你仍在使用这些已废弃的方法，需要根据下表将其替换为支持的方法。方法的参数和行为没有变化。

<table class="my_table">

<tr><td class="version_info">废弃方法</td><td class="version_info">可用方法</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>


## 3.x -> 4.0


4.0版本对公共API做了一些调整，主要包括:

- 旧版模块以及与dhtmlxSuite模块重叠的模块不再由dhtmlxGantt库定义
- 常用模块，如dhtmlxMessage、dataProcessor、Ajax被移至 **window.gantt** 命名空间，并成为dhtmlxGantt公共API的一部分

v4.x中包含了对旧API的兼容，因此为v3.3及更早版本编写的代码仍可继续使用。但在某些情况下需要做出调整。
通常，除 **window.gantt** 和 **window.Gantt**（仅限企业版）外的所有全局声明都已废弃，并将在5.0版本中移除。

### 废弃的API

有些方法已被废弃。在v4.x中仍可使用，但每次调用时会在控制台发出警告（终端用户不可见）。

![gantt_deprecated_warning](/img/gantt_deprecated_warning.png)

概述:

- dhtmlxMessage模块已从 **window.dhtmlx** 对象移至 **window.gantt** 对象。更多关于消息框的信息见[此处](guides/message-boxes.md)
- dhtmlxDataProcessor 构造函数已从 **window.dataProcessor** 移至 **window.gantt.dataProcessor**
- 工具方法如 **dhtmlx.copy**、**dhtmlx.uid** 和 **dhtmlx.mixin** 已移至 **window.gantt** 对象

如果你正在使用这些方法，升级到v4.0后应用仍可继续正常运行，无需立即调整。但建议后续升级为新版API。

完整的废弃方法列表如下:

<table class="my_table">

<tr><td class="version_info">3.3及以前版本</td><td class="version_info">4.0及以后版本</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>

### 废弃的API

某些方法已被废弃，在v4.x中不再使用。
如果你仍在使用这些方法或对象，需要修改应用代码，或在页面中引入 **dhtmlxgantt_deprecated.js** 文件。

概述:

- **window.dhx4** 不再由 **dhtmlxgantt.js** 定义
- 之前定义在 **window.dhx4** 中的环境变量现在可以通过 **gantt.env** 对象获得
- Ajax模块已从 **dhx4.ajax** 移至 **gantt.ajax**
- 应使用 **gantt.event**、**gantt.eventRemove** 替代 **dhtmlxEvent/dhtmlxDetachEvent**

完整的废弃API列表如下:

<table class="my_table">

<tr><td class="version_info">3.3及以前版本</td><td class="version_info">4.0及以后版本</td></tr>
<tr><td>window.dhtmlxEvent</td><td>gantt.event</td></tr>
<tr><td>window.dhtmlxDetachEvent</td><td>gantt.eventRemove</td></tr>
<tr><td>window.dhx4.isIE</td><td>gantt.env.isIE</td></tr>
<tr><td>window.dhx4.isIE6</td><td>gantt.env.isIE6</td></tr>
<tr><td>window.dhx4.isIE7</td><td>gantt.env.isIE7</td></tr>
<tr><td>window.dhx4.isIE8</td><td>gantt.env.isIE8</td></tr>
<tr><td>window.dhx4.isOpera</td><td>gantt.env.isOpera</td></tr>
<tr><td>window.dhx4.isChrome</td><td>gantt.env.isChrome</td></tr>
<tr><td>window.dhx4.isKHTML</td><td>gantt.env.isKHTML</td></tr>
<tr><td>window.dhx4.isFF</td><td>gantt.env.isFF</td></tr>
<tr><td>window.dhx4.isIPad</td><td>gantt.env.isIPad</td></tr>
</table>


## 2.0 -> 3.0

1) 为避免与dhtmlxScheduler的CSS冲突，dhtmlxGantt中与lightbox相关的类名已全部重命名。
如果你自定义了lightbox的样式，迁移时需将类名更改为对应的新类名。

有两种重命名模式:

- 将 <b>'.dhx_gantt_'</b> 替换为 <b>'.gantt_'</b>（如 .dhx_gantt_duration -> .gantt_duration）
- 将 <b>'.dhx_'</b> 前缀替换为 <b>'.gantt_'</b>（如 .dhx_custom_button -> .gantt_custom_button）

*如果在迁移CSS类名时遇到困难，请参见[完整重命名类列表](guides/migrating-renamedcss.md)。*


2) [buttons_right](api/config/buttons_right.md) 和 [buttons_left](api/config/buttons_left.md) 配置项的默认值做了如下更改:

~~~js
gantt.config.buttons_left = [
        "dhx_save_btn",
        "dhx_cancel_btn"
];
gantt.config.buttons_right = [
        "dhx_delete_btn"
],

-->

gantt.config.buttons_left = [
        "gantt_save_btn",
        "gantt_cancel_btn"
];
gantt.config.buttons_right = [
        "gantt_delete_btn"
];
~~~

旧配置（"dhx_save_btn", "dhx_cancel_btn", "gantt_delete_btn"）仍然可用。此更改不会影响现有行为。

3) 以下功能现在仅在商业版或企业版中提供（GPL版dhtmlxGantt不支持）:

- 在周、月、时间轴视图中隐藏某些天的能力
- 项目、里程碑及其他自定义类型

## 1.0 -> 2.0


1) 多种对象（**GanttProjectInfo**、**GanttTaskInfo**、**GanttChart**、**GanttProject**、**GanttTask**）被统一为一个静态对象--**gantt**。


**gantt** 对象包含一组方法和两个主要属性:[config](api/overview/properties-overview.md) 和 [templates](api/overview/templates-overview.md)。

- [gantt.config](api/overview/properties-overview.md) - 日期、刻度、控件等的配置选项
- [gantt.templates](api/overview/templates-overview.md) - 用于甘特图日期和标签的格式化模板


2) dhtmlxGantt 通过 [init](api/method/init.md) 方法初始化 

  <code> var gantt = new GanttChart()</code> -> <code>gantt.init("gantt_div")</code>。


3) 现在数据以[包含若干强制属性和任意自定义属性的普通对象数组](guides/loading.md#dataproperties)存储，而不再使用GanttProject和GanttTask:

~~~js
{
    data:[
        {id:1, text:"Project #2", start_date:"01-04-2013", duration:18,
    progress:0.4, open: true},
        {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8,
    progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,
    progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:"1"},
        { id:2, source:2, target:3, type:"0"},
        { id:3, source:3, target:4, type:"0"},
        { id:4, source:2, target:5, type:"2"},
  ]
}
~~~


4) [XML格式](guides/supported-data-formats.md#xmldhtmlxgantt20)已更改，但[旧XML格式](guides/supported-data-formats.md#xmldhtmlxganttlt20)仍可[加载](api/method/load.md)。

~~~js
gantt.load("tasks.xml","oldxml");
~~~

[Loading data in Gantt 1.6 format](https://docs.dhtmlx.com/gantt/samples/01_initialization/09_backward_compatibility.html)


5) **设计时对象**:

- **<i>GanttProjectInfo</i>** 对象的方法替换为:
  - addTask  -> [gantt.addTask()](api/method/addtask.md)
  - deleteTask  ->  [gantt.deleteTask()](api/method/deletetask.md)
  - getTaskById  -> [gantt.getTask()](api/method/gettask.md)
- **<i>GanttTaskInfo</i>** 对象的方法替换为:
  - addChildTask -> [gantt.addTask()](api/method/addtask.md)（通过任务对象的 "parent" 属性设置父任务）


6) **运行时对象**:

dhtmlxGantt 2.0 不再区分项目和任务对象类型。现在，任何任务对象都可以有一个父对象和任意数量的子任务。

- **<i>GanttProject</i>**
  - 以前的 getDuration()、getId()、getName()、getPercentCompleted()、getStartDate() 方法，现在通过 **gantt.getTask(projectTaskId).(name_of_property)** 访问
- **<i>GanttTask</i>**
  - 以前的 getDuration()、getId()、getName()、getParentTaskId()、getPercentCompleted()、getPredecessorTaskId()、setDuration(, ) 方法，现在通过 **gantt.getTask(taskId).(name_of_property)** 访问

获取父/子对象的方法列表:

- [getTask](api/method/gettask.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

:::note
父任务的id可通过 **gantt.getTask(task_id).parent** 获取。根元素没有 'parent' 属性。
:::

