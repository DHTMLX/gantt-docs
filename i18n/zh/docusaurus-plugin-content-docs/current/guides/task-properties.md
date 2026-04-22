--- 
title: "任务属性"
sidebar_label: "任务属性"
---

# 任务属性

在本页你将找到任务对象可能包含的全部属性的完整列表。

链接对象的完整属性列表请参阅 [Link Properties](guides/link-properties.md) 文章。


## 必需属性

这些属性在客户端总是会被定义。Gantt 期望在数据加载时在任务对象中指定这些属性，但如果未指定，Gantt 将自动添加它们。
如果在已加载的任务中移除了其中一个属性，Gantt 将开始抛出错误。

<table>
  <tbody>
  <tr>
  <th>名称</th><th>类型</th><th>描述</th>
  </tr>
  <tr>
  <td><b class="subproperty">id</b></td>
  <td><i>string | number</i></td>
  <td>任务的唯一标识符；若未设置则自动生成</td>
  </tr>
  <tr>
  <td><b class="subproperty">start_date</b></td>
  <td><i>Date</i></td>
  <td>任务计划开始的日期。[数据加载](guides/loading.md#loadingtaskdates) 如果未指定，Gantt 将基于 <b>end_date</b> 与 <b>duration</b> 属性来计算。当设置 <b>unscheduled: true</b> 时，该属性将变为可选。</td>
  </tr>
  <tr>
  <td><b class="subproperty">end_date</b></td>
  <td><i>Date</i></td>
  <td>任务计划完成的日期。[数据加载](guides/loading.md#loadingtaskdates) 如果未指定，Gantt 将基于 <b>start_date</b> 与 <b>duration</b> 属性来计算。当设置 <b>unscheduled: true</b> 时，该属性将变为可选。</td>
  </tr>
  <tr>
  <td><b class="subproperty">duration</b></td>
  <td><i>number</i></td>
  <td>任务持续时间。[数据加载](guides/loading.md#loadingtaskdates) 如果未指定，Gantt 将基于 <b>start_date</b> 与 <b>end_date</b> 属性进行计算。</td>
  </tr>
  </tbody>
</table>


## 可选属性

这些属性可能定义也可能不定义。如果定义了这些属性，Gantt 的默认逻辑和模板将使用它们。

<table>
  <tbody>
  <tr>
  <th>名称</th><th>类型</th><th>描述</th>
  </tr>
  <tr>
  <td><b class="subproperty">auto_scheduling</b></td>
  <td><i>boolean</i></td>
  <td>定义 Gantt 是否应对任务进行自动排程（为 <i>true</i> 或未指定）还是不进行（为 <i>false</i>）</td>
  </tr>
  <tr>
  <td><b class="subproperty">bar_height</b></td>
  <td><i>number</i></td>
  <td>设置时间线区域中任务的 DOM 元素高度</td>
  </tr>
  <tr>
  <td><b class="subproperty">baselines</b></td>
  <td><i>Baseline[]</i></td>
  <td>包含基线的数组</td>
  </tr>
  <tr>
  <td><b class="subproperty">calendar_id</b></td>
  <td><i>number | string</i></td>
  <td>设置分配给任务的自定义日历的 ID。属性的名称取决于 [calendar_property](api/config/calendar_property.md) 选项的值</td>
  </tr>
  <tr>
  <td><b class="subproperty">color</b></td>
  <td><i>string</i></td>
  <td>设置任务在时间线区域中的颜色（即为任务的 <b>gantt_task_line</b> 元素设置背景颜色）</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_date</b></td>
  <td><i>Date</i></td>
  <td>任务约束日期。当启用带时间约束的自动排程时，该属性会添加到任务对象中。若启用 <i>auto_scheduling_compatibility</i>，则此属性不被使用。</td>
  </tr>
  <tr>
  <td><b class="subproperty">constraint_type</b></td>
  <td><i>string</i></td>
  <td>[任务约束类型（"asap", "alap", "snet", "snlt", "fnet", "fnlt", "mso", "mfo"）](guides/auto-scheduling.md#timeconstraintsfortasks)。在启用带时间约束的自动排程时会将其添加到任务对象。若启用 <i>auto_scheduling_compatibility</i>，则此属性不被使用。</td>
  </tr>
  <tr>
  <td><b class="subproperty">deadline</b></td>
  <td><i>Date</i></td>
  <td>为任务指定截止日期。在设置此属性时，时间线中会显示一个可视化指示器。</td>
  </tr>
  <tr>
  <td><b class="subproperty">editable</b></td>
  <td><i>boolean</i></td>
  <td>定义在只读甘特图中任务是否可以 [editable](guides/readonly-mode.md#readonlymodefortheentiregantt)。属性名称取决于 [editable_property](api/config/editable_property.md) 选项的值</td>
  </tr>
  <tr>
  <td><b class="subproperty">group_id</b></td>
  <td><i>string | number</i></td>
  <td>分组的组标识符。当用于分组任务的属性（在 groupBy() 的 [relation_property](guides/grouping.md#groupingtasks) 中）被指定为对象时，任务将按某个标准分组并附加该值。</td>
  </tr>
  <tr>
  <td><b class="subproperty">hide_bar</b></td>
  <td><i>boolean</i></td>
  <td>定义任务（type:"task"）或里程碑（type:"milestone"）是否应在时间线区域隐藏</td>
  </tr>
  <tr>
  <td><b class="subproperty">key</b></td>
  <td><i>string | number</i></td>
  <td>分组的键。当用于分组任务的属性（在 groupBy() 方法中的 [relation_property]）被指定为数组时，将该键添加到按某标准分组的任务中。也会添加到带有分组名称的任务上（例如，当你按优先级分组任务时，对应“High”、“Normal”、“Low”这类任务将带有该键）。[查看示例](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)。</td>
  </tr>
  <tr>
  <td><b class="subproperty">label</b></td>
  <td><i>string</i></td>
  <td>分组的标签。它被添加到具有分组名称的任务上（例如，如果你按优先级分组任务，带有 "High"、"Normal"、"Low" 名称的任务将带有该属性。 [查看示例](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)）。</td>
  </tr>
  <tr>
  <td><b class="subproperty">open</b></td>
  <td><i>boolean</i></td>
  <td>指定任务分支是否初始展开（显示子任务）。要在 Gantt 初始化后关闭/打开该分支，请使用相关方法：[close()](api/method/close.md) 和 [open()](api/method/open.md)</td>
  </tr>
  <tr>
  <td><b class="subproperty">parent</b></td>
  <td><i>number | string</i></td>
  <td>父任务的 ID。如果指定的父不存在，则该任务不会在 Gantt 中渲染。根任务的 ID 由 root_id 配置指定。</td>
  </tr>
  <tr>
  <td><b class="subproperty">progress</b></td>
  <td><i>number</i></td>
  <td>任务的进度（0 到 1 之间）</td>
  </tr>
  <tr>
  <td><b class="subproperty">progressColor</b></td>
  <td><i>string</i></td>
  <td>时间线区域中任务进度的颜色（即为任务进度的 <b>gantt_task_progress</b> 元素设置背景颜色）</td>
  </tr>
  <tr>
  <td><b class="subproperty">readonly</b></td>
  <td><i>boolean</i></td>
  <td>定义在只读模式下任务是否必须处于 [readonly](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)。属性名称取决于 [readonly_property](api/config/readonly_property.md) 选项的值</td>
  </tr>
  <tr>
  <td><b class="subproperty">render</b></td>
  <td><i>string</i></td>
  <td>定义子任务的显示方式。取值：<i>"split" | ""</i>。若设置为 ["split"]，子任务将显示在一行中。此外，如果启用 [open_split_tasks](api/config/open_split_tasks.md) 属性，只有当任务处于折叠状态时，子任务才会在一行中呈现。</td>
  </tr>
  <tr>
  <td><b class="subproperty">resource</b></td>
  <td><i>Array &lt;string&gt;</i></td>
  <td>分配给任务的资源 ID 的数组。导入 MS Project/Primavera 数据时会将其添加到任务对象中</td>
  </tr>
  <tr>
  <td><b class="subproperty">rollup</b></td>
  <td><i>boolean</i></td>
  <td>定义任务（type:"task"）或里程碑（type:"milestone"）是否应出现在父级项目中</td>
  </tr>
  <tr>
  <td><b class="subproperty">row_height</b></td>
  <td><i>number</i></td>
  <td>设置任务行的高度</td>
  </tr>
  <tr>
  <td><b class="subproperty">target</b></td>
  <td><i>string</i></td>
  <td>目标任务的 ID。该属性显示与 <b>$drop_target</b> 属性相同的值。仅在启用 Data Processor、任务更新后并将数据发送到服务器时才将该属性添加到任务对象中。</td>
  </tr>
  <tr>
  <td><b class="subproperty">text</b></td>
  <td><i>any</i></td>
  <td>任务的名称。如有需要，你可以为此属性使用任何其他名称。该属性在 Gantt 的不同部分的默认配置中使用。</td>
  </tr>
  <tr>
  <td><b class="subproperty">textColor</b></td>
  <td><i>string</i></td>
  <td>时间线区域中任务文本的颜色（即为任务的 <b>gantt_task_line</b> 元素设置文本颜色）</td>
  </tr>
  <tr>
  <td><b class="subproperty">type</b></td>
  <td><i>string</i></td>
  <td>任务类型。可用值存储在 types 对象中：<ul> <li>["task"](guides/task-types.md#regular-tasks) - 常规任务（<i>默认值</i>）。</li> <li>["project"](guides/task-types.md#project-tasks) - 当其最早子任务开始时开始、当其最近的子任务结束时结束的任务。对于此类任务，<b>start_date</b>、<b>end_date</b>、<b>duration</b> 属性将被忽略。</li> <li>["milestone"](guides/task-types.md#milestones) - 用于标记项目重要日期的零持续时间任务。<i>对于此类任务，<b>duration</b>、<b>progress</b>、<b>end_date</b> 属性将被忽略。</i></li> </ul></td>
  </tr>
  <tr>
  <td><b class="subproperty">unscheduled</b></td>
  <td><i>boolean</i></td>
  <td>定义任务是否必须为 [unscheduled](guides/unscheduled-tasks.md)。默认情况下，未排程的任务不会在时间线区域显示，网格中将显示空值而非开始和结束日期。</td>
  </tr>
  </tbody>
</table>


## 动态属性

动态属性在客户端创建，表示任务或链接的当前状态。若在 JSON/XML 中定义，它们不应保存到数据库，Gantt 将忽略这些属性。


<table>
  <tbody>
  <tr>
  <th>名称</th><th>类型</th><th>描述</th>
  </tr>
  <tr>
  <td><b class="subproperty">[resource_property]</b></td>
  <td><i>string | Array &lt;any&gt;</i></td>
  <td>[resource_property](api/config/resource_property.md) 该属性可以具有任意其他名称。该属性用于存储与 <i>resourceGrid/Timeline/Histogram/Calendar</i> 相关联的资源 ID。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_end_date</b></td>
  <td><i>Date</i></td>
  <td>来自子任务的项目任务的自动计算结束日期。当 <i>"auto_scheduling"</i> 被禁用时，新增并更新。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$auto_start_date</b></td>
  <td><i>Date</i></td>
  <td>来自子任务的项目任务的自动计算开始日期。当 <i>"auto_scheduling"</i> 被禁用时，新增并更新。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$calculate_duration</b></td>
  <td><i>boolean</i></td>
  <td>在内部计算中使用的系统属性。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$custom_data</b></td>
  <td><i>object</i></td>
  <td>包含在 [importFromMSProject()](api/method/importfrommsproject.md) 与 [importFromPrimaveraP6()](api/method/importfromprimaverap6.md) 方法中定义的自定义任务属性的对象</td>
  </tr>
  <tr>
  <td><b class="subproperty">$dataprocessor_class</b></td>
  <td><i>string</i></td>
  <td>一个系统属性，定义任务是否已更新。当启用 Data Processor 时将其添加到任务对象中。如果该属性值为 <i>"updated"</i>，任务的文本将在网格中加粗，但你可以通过 CSS 自定义样式。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$drop_target</b></td>
  <td><i>string</i></td>
  <td>目标任务的 ID。拖动任务垂直移动时添加到任务对象中的临时属性。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$effective_calendar</b></td>
  <td><i>string</i></td>
  <td>分配给任务的日历（或资源日历）的 ID。一个在内部计算中使用的系统属性。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$expanded_branch</b></td>
  <td><i>boolean</i></td>
  <td>显示任务是否可见的系统属性，取决于其父级是否展开。若至少一个父级是折叠的，任务将不可见。只有拆分任务（子任务）除外。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$has_child</b></td>
  <td><i>boolean</i></td>
  <td>定义 Gantt 是否应向服务器发送请求以加载任务的第一层子任务。当启用 [branch_loading](api/config/branch_loading.md) 属性时使用。属性名称取决于 [branch_loading_property](api/config/branch_loading_property.md) 选项的值。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$index</b></td>
  <td><i>number</i></td>
  <td>任务的全局垂直位置。它绑定到任务并在下面或上面的任务展开/收起时改变。如果任务的父级被折叠，该属性不会显示任务的实际位置。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$level</b></td>
  <td><i>number</i></td>
  <td>任务在任务层级中的级别（从零开始编号）</td>
  </tr>
  <tr>
  <td><b class="subproperty">$local_index</b></td>
  <td><i>number</i></td>
  <td>分支中的任务的垂直位置（在父级之下）。它不绑定到任务本身，且在分支内向上/向下展开时不会像全局那样改变。若任务的父级被折叠，该属性不会显示任务的实际位置。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$new</b></td>
  <td><i>boolean</i></td>
  <td>通过 [createTask](api/method/createtask.md) 方法或通过“+”按钮创建的新任务将添加此属性。打开灯箱时会将该属性添加到任务对象中，保存任务后移除。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_end</b></td>
  <td><i>boolean</i></td>
  <td><b>必需</b>，一个系统属性，添加到任务对象。如果无法计算 <b>end_date</b>（在加载了 <b>start_date</b> 但没有 <b>duration</b> 或 <b>end_date</b> 时），其值为 <i>True</i>。在这种情况下，你不能移动或调整任务大小。<b>end_date</b> 属性将取决于子任务的 <b>end_date</b>（如有）。<b>start_date</b> 属性将固定不变。对这类任务，自动排程将不起作用。如果启用 <b>$no_start</b> 属性，该任务将完全依赖于其子任务的日期或第一个任务的日期。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$no_start</b></td>
  <td><i>boolean</i></td>
  <td><b>必需</b>，一个系统属性，添加到任务对象。当无法计算 <b>start_date</b>（加载了 <b>end_date</b> 但没有 <b>duration</b> 或 <b>start_date</b> 时）时，其值为 <i>True</i>。<b>start_date</b> 属性将取决于子任务（如有）或第一个任务的开始日期。<b>end_date</b> 属性将固定且只有当子任务/第一任务的开始日期大于任务的结束日期时才会改变。对这类任务，自动排程将不起作用。如果启用 <b>$no_end</b> 属性，该任务将完全依赖于其子任务的日期或第一个任务的日期。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$open</b></td>
  <td><i>boolean</i></td>
  <td>一个系统属性，指示任务当前是否已打开（<i>true</i>）。如果你更改此属性的值并重新绘制 Gantt，它将打开或关闭该任务。要更改任务状态，也可以应用 [open](api/method/open.md) 或 [close](api/method/close.md) 方法。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$raw</b></td>
  <td><i>object</i></td>
  <td>一个包含从 [MS Project](guides/export-msproject.md) / [Primavera](guides/export-primavera.md) 导出到导出模块（导出服务器）时的原始任务属性名称的对象。该属性在文件转换为 JSON 格式但在转换为 Gantt 期望的名称和格式之前出现在 <b>$raw</b> 对象中。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_at</b></td>
  <td><i>string | number</i></td>
  <td>在页面上渲染的 rollup 项 / split 任务所处行的 ID。只有在任务正在页面上渲染时，该对象中才会出现此临时属性。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_parent</b></td>
  <td><i>number | string</i></td>
  <td>在其下方渲染任务的父级的 ID（不是任务的真实父级的 ID）。此属性在内部计算和任务分组中使用。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rendered_type</b></td>
  <td><i>string</i></td>
  <td>已渲染任务的类型（一个临时属性）。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$resourceAssignments</b></td>
  <td><i>Array &lt;any&gt;</i></td>
  <td>分配给任务的资源ID数组（临时属性）。但真正的数据存储在资源分配的存储中，而不在此属性中。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$rollup</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td>在当前任务上出现的任务和里程碑的 ID 数组</td>
  </tr>
  <tr>
  <td><b class="subproperty">$source</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>必需</b>，一个包含来自任务的所有链接的 ID 的数组（参见 guides/link-object-operations.md#getting-the-links-related-to-a-certain-task）。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$split_subtask</b></td>
  <td><i>boolean</i></td>
  <td>若任务是拆分任务的子任务，将出现（与其他子任务排在同一行）</td>
  </tr>
  <tr>
  <td><b class="subproperty">$target</b></td>
  <td><i>Array &lt;string | number&gt;</i></td>
  <td><b>必需</b>，一个包含进入任务的链接的目标 ID 的数组（参见 guides/link-object-operations.md#getting-the-links-related-to-a-certain-task）。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$transparent</b></td>
  <td><i>boolean</i></td>
  <td>在垂直拖拽时添加到任务对象的临时属性。由于该属性，任务在网格中垂直拖拽时会显得略微透明。</td>
  </tr>
  <tr>
  <td><b class="subproperty">$virtual</b></td>
  <td><i>boolean</i></td>
  <td>将其添加到按某些标准分组的任务中。重设分组后，带有 <b>$virtual: true</b> 的任务将被移除</td>
  </tr>
  <tr>
  <td><b class="subproperty">$wbs</b></td>
  <td><i>string</i></td>
  <td>任务的 WBS 代码（一个临时属性）。应用 [getWBSCode](api/method/getwbscode.md) 方法后，它会被添加到任务对象中。如果代码的值发生变化（父级或位置变化），需要再次调用 [getWBSCode](api/method/getwbscode.md) 以获取更新后的代码值。</td>
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