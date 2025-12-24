---
title: "任务属性"
sidebar_label: "任务属性"
---

# 任务属性


本页面提供了任务对象可包含的所有属性的完整列表。

关于 link 对象的全部属性，请参阅 [Link Properties](guides/link-properties.md) 文章。

## 必需属性


这些属性在客户端始终定义。当加载数据时，Gantt 期望任务对象中包含这些属性。如果缺失，Gantt 会自动添加它们。从已加载任务中移除这些属性会导致错误。

<table>
  <tbody>
  <tr>
  <th>名称</th><th>类型</th><th>描述</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>任务的 id，如果未提供则自动生成</td>
  </tr>
  <tr>
  <td><b class="subproperty">start_date</b></td>
  <td><i>Date</i></td>
  <td>任务的计划开始日期。[如果省略，Gantt 会根据 end_date 和 duration 计算。](guides/loading.md) 当设置 <b>unscheduled: true</b> 时，该属性变为可选。</td>
  </tr>
  <tr>
  <td><b class="subproperty">end_date</b></td>
  <td><i>Date</i></td>
  <td>任务的计划完成日期。[如果省略，Gantt 会根据 start_date 和 duration 计算。](guides/loading.md) 当设置 <b>unscheduled: true</b> 时，该属性变为可选。</td>
  </tr>
  <tr>
  <td><b class="subproperty">duration</b></td>
  <td><i>number</i></td>
  <td>任务的持续时间。[如果省略，Gantt 会根据 start_date 和 end_date 计算。](guides/loading.md)</td>
  </tr>
  </tbody>
</table>

## 可选属性


这些属性可以存在也可以不存在。当这些属性可用时，Gantt 的默认逻辑和模板会使用它们。

<table>
  <tbody>
  <tr>
  <th>名称</th><th>类型</th><th>描述</th>
  </tr>
  <tr>
  <td><b class="subproperty">auto_scheduling</b></td>
  <td><i>boolean</i></td>
  <td>指定 Gantt 是否对任务执行自动排程（<i>true</i> 或未指定）或不执行（<i>false</i>）</td>
  </tr>
  <tr>
  <td><b class="subproperty">bar_height</b></td>
  <td><i>number</i></td>
  <td>指定任务在时间轴中 DOM 元素的高度</td>
  </tr>
  <tr>
  <td><b class="subproperty">baselines</b></td>
  <td><i>Baseline[]</i></td>
  <td>包含基线的数组</td>
  </tr>
  <tr>
  <td><b class="subproperty">calendar_id</b></td>
  <td><i>number | string</i></td>
  <td>为任务分配自定义日历的 id。属性名取决于 [calendar_property](https://docs.dhtmlx.com/gantt/api/config/calendar_property) 选项</td>
  </tr>
  <tr>
  <td><b class="subproperty">color</b></td>
  <td><i>string</i></td>
  <td>设置任务在时间轴中的颜色（应用于 <b>gantt_task_line</b> 元素的 <b>background-color</b>）</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_date</b></td>
  <td><i>Date</i></td>
  <td>任务约束的日期，在启用 [带有时间约束的自动排程](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html) 时添加。如果启用 [auto_scheduling_compatibility](https://docs.dhtmlx.com/gantt/api/config/auto_scheduling_compatibility)，则不使用。</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_type</b></td>
  <td><i>string</i></td>
  <td>[指定任务约束类型（"asap"、"alap"、"snet"、"snlt"、"fnet"、"fnlt"、"mso"、"mfo"）](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html#timeconstraintsfortasks)。在启用 [带有时间约束的自动排程](https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html) 时添加。如果启用 [auto_scheduling_compatibility](https://docs.dhtmlx.com/gantt/api/config/auto_scheduling_compatibility)，则不使用。</td>
  </tr>
  <tr>
  <td><b class="subproperty">deadline</b></td>
  <td><i>Date</i></td>
  <td>设置任务的截止日期。设置后，时间轴中会出现[可视指示器](guides/inbuilt-baselines.md#jiezhiriqiyuyueshu)。</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>指定任务是否可以在[只读 Gantt 图](guides/readonly-mode.md)中编辑。属性名取决于 [editable_property](https://docs.dhtmlx.com/gantt/api/config/editable_property) 选项</td>
  </tr>
  <tr>
  <td><b class="subproperty">group_id</b></td>
  <td><i>string | number</i></td>
  <td>任务所属分组的 id。当任务通过 [relation_property](guides/grouping.md) 在 groupBy() 方法中按对象属性分组时添加。</td>
  </tr>
  <tr>
  <td><b class="subproperty">hide_bar</b></td>
  <td><i>boolean</i></td>
  <td>指定任务（type:"task"）或里程碑（type:"milestone") [是否在时间轴中隐藏](guides/milestones.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">key</b></td>
  <td><i>string | number</i></td>
  <td>分组键，当任务通过 [relation_property](guides/grouping.md) 在 groupBy() 中按数组属性分组时添加。 也会添加到带有分组名称的任务（如按优先级分组时为 "High"、"Normal"、"Low"）。[查看示例](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)。</td>
  </tr>
  <tr>
  <td><b class="subproperty">label</b></td>
  <td><i>string</i></td>
  <td>分组标签，添加到带有分组名称的任务（如按优先级分组时为 "High"、"Normal"、"Low"）。[查看示例](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)。</td>
  </tr>
  <tr>
  <td><b class="subproperty">open</b></td>
  <td><i>boolean</i></td>
  <td>指示任务分支是否初始为展开状态以显示子任务。初始化后可通过 [close()](api/method/close.md) 和 [open()](api/method/open.md) 方法切换分支。</td>
  </tr>
  <tr>
  <td><b class="subproperty">parent</b></td>
  <td><i>number | string</i></td>
  <td>父任务的 id。父任务不存在的任务不会被渲染。根任务 id 通过 [root_id](api/config/root_id.md) 配置设置。</td>
  </tr>
  <tr>
  <td><b class="subproperty">progress</b></td>
  <td><i>number</i></td>
  <td>任务的进度值（0 到 1 之间）</td>
  </tr>
  <tr>
  <td><b class="subproperty">progressColor</b></td>
  <td><i>string</i></td>
  <td>设置任务进度条在时间轴中的颜色（应用于 <b>gantt_task_progress</b> 元素的 <b>background-color</b>）</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>指示任务是否应为[只读](guides/readonly-mode.md)。属性名取决于 [readonly_property](api/config/readonly_property.md) 选项</td>
  </tr>
  <tr>
  <td><b class="subproperty">render</b></td>
  <td><i>string</i></td>
  <td>控制子任务的显示方式。 值:<i>"split" | ""</i>。 如果设置为 ["split"](guides/split-tasks.md)，子任务会显示在同一行。当启用 [open_split_tasks](api/config/open_split_tasks.md) 属性时，仅当任务折叠时子任务才渲染为同一行。</td>
  </tr>
  <tr>
  <td><b class="subproperty">resource</b></td>
  <td><i>Array &lt;string&gt;</i></td>
  <td>分配给任务的资源数组。在从 MS Project 或 Primavera 导入数据时添加</td>
  </tr>
  <tr>
  <td><b class="subproperty">rollup</b></td>
  <td><i>boolean</i></td>
  <td>指示任务（type:"task"）或里程碑（type:"milestone") [是否应显示在父项目上](guides/milestones.md)。</td>
  </tr>
  <tr>
  <td><b class="subproperty">row_height</b></td>
  <td><i>number</i></td>
  <td>设置任务所在行的高度</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string</i></td>
  <td>目标任务 id。该属性与 <b>$drop_target</b> 属性一致。 仅在启用 Data Processor 且任务更新并与服务器通信后，才会添加到任务对象中。</td>
  </tr>
  <tr>
  <td><b class="subproperty">text</b></td>
  <td><i>any</i></td>
  <td>任务名称。可根据需要使用不同的属性名。 该属性用于 Gantt 的默认配置。</td>
  </tr>
  <tr>
  <td><b class="subproperty">textColor</b></td>
  <td><i>string</i></td>
  <td>设置任务文本在时间轴中的颜色（应用于 <b>gantt_task_line</b> 元素的 <b>color</b>）</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>任务类型。可用值在 [types](api/config/types.md) 对象中定义: <ul> <li>["task"](guides/task-types.md) - 常规任务（<i>默认</i>）。</li> <li>["project"](guides/task-types.md) - 以最早的子任务开始、最晚的子任务结束的任务。 <i>该类型会忽略 <b>start_date</b>、<b>end_date</b> 和 <b>duration</b> 属性。</i> </li> <li>["milestone"](guides/task-types.md) - 标记重要项目日期的零时长任务。 <i>该类型会忽略 <b>duration</b>、<b>progress</b> 和 <b>end_date</b> 属性。</i></li> </ul></td>
  </tr>
  <tr>
  <td><b class="subproperty">unscheduled</b></td>
  <td><i>boolean</i></td>
  <td>指示任务是否为[未排程](guides/unscheduled-tasks.md)。默认情况下，未排程任务不会显示在时间轴中；而在网格中开始和结束日期会显示为空值。</td>
  </tr>
  </tbody>
</table>

## 动态属性


动态属性由客户端创建，用于表示任务或 link 的当前状态。它们不应保存到数据库中，Gantt 在你的 JSON 或 XML 中包含时会忽略这些属性。

<table>
  <tbody>
  <tr>
  <th>名称</th><th>类型</th><th>描述</th>
  </tr>
  <tr>
  <td><b class="subproperty">[resource_property]</b></td>
  <td><i>string | Array &lt;any&gt;</i></td>
  <td>[该属性可以为任意名称](api/config/resource_property.md)。用于存储与 <i>resourceGrid/Timeline/Histogram/Calendar</i> 相关的资源 id。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_end_date</b></td>
  <td><i>Date</i></td>
  <td>基于其子任务计算的项目任务结束日期。当 "auto_scheduling" 关闭时添加和更新。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_start_date</b></td>
  <td><i>Date</i></td>
  <td>基于其子任务计算的项目任务开始日期。当 "auto_scheduling" 关闭时添加和更新。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$calculate_duration</b></td>
  <td><i>boolean</i></td>
  <td>用于内部计算的系统属性。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$custom_data</b></td>
  <td><i>object</i></td>
  <td>包含在 [importFromMSProject()](api/method/importfrommsproject.md) 和 [importFromPrimaveraP6()](api/method/importfromprimaverap6.md) 导入期间定义的自定义任务属性</td>
  </tr>
  <tr>
  <td><b class="subproperty">$dataprocessor_class</b></td>
  <td><i>string</i></td>
  <td>指示任务是否已更新的系统属性。启用 Data Processor 时添加。如果值为 <i>"updated"</i>，任务文本会以粗体显示在网格中，也可应用自定义 CSS 样式。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$drop_target</b></td>
  <td><i>string</i></td>
  <td>垂直拖拽任务时的目标任务 id。拖拽期间会临时添加该属性。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$effective_calendar</b></td>
  <td><i>string</i></td>
  <td>分配给任务的日历（或资源日历）id。用于内部计算。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$expanded_branch</b></td>
  <td><i>boolean</i></td>
  <td>指示任务是否可见，依据其父分支是否展开。如果有任一父级被折叠，该任务会被隐藏（分割任务/子任务除外）。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$has_child</b></td>
  <td><i>boolean</i></td>
  <td>指示 Gantt 是否应请求从服务器加载一级子任务。用于启用 [branch_loading](api/config/branch_loading.md) 时。属性名取决于 [branch_loading_property](api/config/branch_loading_property.md) 选项。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$index</b></td>
  <td><i>number</i></td>
  <td>任务的全局垂直位置。上下任务被打开或关闭时该值会更新。如果父级被折叠，则该值不代表实际位置。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$level</b></td>
  <td><i>number</i></td>
  <td>任务在层级结构中的深度（从零开始）</td>
  </tr>
  <tr>
  <td><b class="subproperty">$local_index</b></td>
  <td><i>number</i></td>
  <td>任务在其父分支中的垂直位置。该值不会因全局的展开/折叠变化而更新。如果父级被折叠，则该值不代表实际位置。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$new</b></td>
  <td><i>boolean</i></td>
  <td>通过 [createTask()](api/method/createtask.md) 或 "+" 按钮创建新任务时添加。在 lightbox 打开期间存在，保存后移除。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_end</b></td>
  <td><i>boolean</i></td>
  <td><b>必需</b>系统属性，当无法计算 <b>end_date</b>（只设置了 start_date，未设置 duration 或 end_date）时添加。在此情况下，任务无法移动或调整大小。<b>end_date</b> 取决于子任务的结束日期，<b>start_date</b> 保持固定。自动排程关闭。如果同时设置 <b>$no_start</b>，则任务完全依赖于子任务或首个任务的日期。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_start</b></td>
  <td><i>boolean</i></td>
  <td><b>必需</b>系统属性，当无法计算 <b>start_date</b>（只设置了 end_date，未设置 duration 或 start_date）时添加。<b>start_date</b> 取决于子任务或首个任务的开始日期。<b>end_date</b> 保持固定，除非子任务/首个任务的开始日期超过它。自动排程关闭。如果同时设置 <b>$no_end</b>，则任务完全依赖于子任务或首个任务的日期。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$open</b></td>
  <td><i>boolean</i></td>
  <td>系统属性，反映任务当前是否处于展开状态（<i>true</i>）。修改该属性并重绘 Gantt 可展开或折叠任务。也可使用 [open()](api/method/open.md) 或 [close()](api/method/close.md)。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$raw</b></td>
  <td><i>object</i></td>
  <td>包含从 [MS Project](guides/export-msproject.md) 或 [Primavera](guides/export-primavera.md) 导出处理期间导入的原始任务属性名。这些属性在转换为 Gantt 期望的格式之前出现。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_at</b></td>
  <td><i>string | number</i></td>
  <td>渲染[rollup 项](https://docs.dhtmlx.com/gantt/desktop__milestones.html#rolluptasksandmilestones)或[分割任务](https://docs.dhtmlx.com/gantt/desktop__split_tasks.html)的行 id。该临时属性仅在 rollup/分割任务显示期间存在。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_parent</b></td>
  <td><i>number | string</i></td>
  <td>任务渲染时的父级 id（非实际父级）。用于内部及任务分组。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_type</b></td>
  <td><i>string</i></td>
  <td>指示渲染任务类型的临时属性。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$resourceAssignments</b></td>
  <td><i>Array &lt;any&gt;</i></td>
  <td>分配给任务的资源 id 数组（临时）。最准确的数据存储在资源分配存储中。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rollup</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td>[出现在此任务上的任务和里程碑的 id 数组](guides/milestones.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$source</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>必需</b>--[所有从该任务出发的 link id 数组](guides/link-object-operations.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$split_subtask</b></td>
  <td><i>boolean</i></td>
  <td>如果任务是分割任务的子任务（与其他子任务显示在一行），则存在该属性</td>
  </tr>
  <tr>
  <td><b class="subproperty">$target</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>必需</b>--[指向该任务的 link id 数组](guides/link-object-operations.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">$transparent</b></td>
  <td><i>boolean</i></td>
  <td>垂直拖拽期间添加的临时属性，使任务在网格中略带透明效果。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$virtual</b></td>
  <td><i>boolean</i></td>
  <td>对按某些条件分组的任务添加。带有 <b>$virtual: true</b> 的任务在重置分组时会被移除。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$wbs</b></td>
  <td><i>string</i></td>
  <td>任务的 WBS 代码（临时）。在调用 [getWBSCode()](api/method/getwbscode.md) 后添加。如果由于父级或位置变化导致代码变动，请再次调用 [getWBSCode()](api/method/getwbscode.md) 以更新。</td>
  </tr>
  </tbody>
</table>

## 示例

~~~js
const data = {
  tasks: [
    { id: 1, text: "Project #1", start_date: "01-04-2025", duration: 18 },
    { id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8, parent: 1 },
    { id: 3, text: "Task #2", start_date: "11-04-2025", duration: 8, parent: 1 }
  ],
  links: []
};
~~~

