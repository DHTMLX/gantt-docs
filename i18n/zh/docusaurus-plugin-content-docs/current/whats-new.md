---
title: "更新日志"
sidebar_label: "更新日志"
---

# 更新日志

如果您当前使用的 dhtmlxGantt 版本低于 2.0，请查阅 [](migration.md) 获取升级详情。

## 9.0.11

<span class='release_date'>2025年5月27日。Bug 修复版本</span>

### 修复

- 修复 [mergeCalendars](api/method/mergecalendars.md) 合并 `customWeeks` 值不正确的问题
- 修复当 [column](guides/specifying-columns.md#wbsbianma) `name` 包含空格时，在 `onrender` 函数中抛出错误的问题
- 修复启用 [S-Curve Overlay](guides/baselines.md#weitubiaotianjiaewaifugaiceng) 时，点击拖动 [Timeline](guides/extensions-list.md#gaojituofang) 后 Gantt 仍保持只读模式的问题
- 修复使用 [Resource calendar](guides/resource-management.md) 且 [Resources](guides/resource-management.md#ziyuanshitumianban) 区域在 [Lightbox](guides/default-edit-form.md) 的 duration 区域下方时，任务持续时间被重置为 `0` 的问题
- 修复在 **React StrictMode** 下，Gantt 显示 "This is a Trial version" 警告时引发的控制台错误
- 修复当 [gantt.config.baselines.render_mode](api/config/baselines.md#rendermode) 被禁用时，[adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) 函数未重新计算行高的问题
- 修复在 Salesforce 环境中 [隐藏](api/config/show_chart.md) Timeline 时任务无法显示的问题
- 修复当 [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) 配置被禁用时，日历未从父任务继承的问题
- 修复 [ReactGantt](integrations/react.md) 在 groupBy 模式下重新渲染时滚动位置重置的问题

### 更新

- 向 [gantt.env](api/other/env.md) 添加 `isSalesforce` 标志
- 向 [React Gantt](integrations/react.md) 添加 `groupTasks` 属性

## 9.0.10

<span class='release_date'>2025年4月22日。Bug 修复版本</span>

### 修复

- 修复阻止在 [Lightbox](guides/default-edit-form.md) 中更改 `parent` 字段值的问题
- 修复在 Firefox 88 及以上版本中使用鼠标滚轮时滚动速度过快的问题
- 修复当子任务未调度且缺少日期参数时无法拖动 [project tasks](guides/task-types.md#xiangmurenwu) 的问题
- 确保在使用 [open](api/method/open.md) 或 [close](api/method/close.md) 方法时，[gantt.render()](api/method/render.md) 不会在 [gantt.silent](api/method/silent.md) 操作期间被意外调用
- 修复当 [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) 事件返回 `false` 时，[project tasks](guides/task-types.md#xiangmurenwu) 未重新绘制的问题
- 确保任务进度条在需要时能覆盖任务的全部宽度
- 移除只读任务链接中的无效 WAI-ARIA 属性，以提升 [无障碍性](guides/accessibility.md#waiariashuxing)
- 修复任务条调整器在任务条高度变化后未自适应的问题

## 9.0.9

<span class='release_date'>2025年4月16日。Bug 修复版本</span>

### 更新

- [React Gantt](integrations/react.md) 示例已添加至 Commercial、Enterprise、Ultimate 及 Evaluation 套件

### 修复

- 修复调用 [resetLayout](api/method/resetlayout.md) 方法后鼠标滚轮缩放失效的问题
- 修复在 [Timeline](guides/configuring-time-scale.md) 或 [Grid](guides/specifying-columns.md) 视图中点击展开/收起按钮后，[Quick Info](guides/quick-info.md) 弹窗出现的问题
- 修复未初始化 grid 视图时销毁 Gantt 报错的问题
- 修复启用 [Undo extension](guides/undo-redo.md) 时加载带有不存在父任务的任务报错的问题
- 修复 [click_drag](guides/extensions-list.md#gaojituofang) 扩展在触摸设备上无法使用的问题
- 提升触摸设备上 grid 滚动的响应速度

## 9.0.7

<span class='release_date'>2025年3月27日。Bug 修复版本</span>

### 修复

- 修复在启用 [keyboard_navigation](guides/keyboard-navigation.md) 时，无 grid 的情况下点击 timeline 任务报错的问题
- 修正包含 [placeholder task](api/config/placeholder_task.md) 的已排序任务的 [WBS code](guides/specifying-columns.md#wbsbianma) 计算
- 解决在折叠任务或 [调整 grid 大小](guides/layout-config.md#morenbuju) 后，资源 timeline 的刻度单元消失的问题
- 确保在 [`gantt.silent`](api/method/silent.md) 函数内部同时添加父子任务时任务顺序正确
- 在编辑 [resource cells](guides/resource-management.md#resourcecellvalue) 后保持焦点
- 防止点击任务时 Gantt 滚动到 grid 的最左侧
- 在 [group](api/method/groupby.md) 模式下添加新任务时保留 `group` 属性
- 修复 [markers](guides/markers.md) 在 timeline 初始禁用时未显示的问题
- 避免在布局配置初始未显示 chart 时出现重复的 [markers](guides/markers.md)
- 修复 [拖动 timeline](api/config/drag_timeline.md) 后拖动手柄（链接、进度、任务调整）消失的问题
- 确保 [predecessor inline editor](guides/inline-editors-ext.md#predecessoreditor) 在链接 id 类型为数字时正常工作
- 防止重复渲染 `gantt_marker_area` 元素
- 修复 `changeTaskId` 操作下的 [undo](guides/undo-redo.md) 功能

## 9.0.6

<span class='release_date'>2025年3月18日。Bug 修复版本</span>

### 修复

- 修复 [lightbox](guides/default-edit-form.md) 按钮在 Gantt 重新初始化前未反映当前语言环境的问题
- 解决删除部分加载的任务链接时报错的问题
- 防止在将 `parent` 属性类型从数字更改为字符串后，任务错误地移动到分支底部
- 通过调整靠近滚动条的调整器改善滚动条行为
- 确保在 [gantt.batchUpdate](api/method/batchupdate.md) 内添加任务时，[resource assignments](guides/resource-management.md#ziyuanfenpei) 保持不变
- 修复 [infinite scale](guides/configuring-time-scale.md#wuxiangundong) 拖拽操作导致任务消失的问题
- 确保多次解析数据后 [lightbox](guides/default-edit-form.md) 能正确显示资源名称
- 修复在使用 [duration_step](api/config/duration_step.md) 配置时，[`getClosestWorkTime`](api/method/getclosestworktime.md) 计算日期不正确的问题
- 允许取消 [onColumnDragMove](api/config/reorder_grid_columns.md) 事件
- 修复试用版在 Lightning Web Components (LWC) 下无法运行的兼容性问题
- 解决影响 [resource panel](guides/resource-management.md#ziyuanshitumianban) 的 `fetchTasks` 和 [deepcopy_on_parse](api/config/deepcopy_on_parse.md) 配置相关问题
- 修正 Gantt 初始化时字体图标的显示

## 9.0.5

<span class='release_date'>2025年2月28日。Bug 修复版本</span>

- 修复在 [Resource Grid](guides/resource-management.md#ziyuanshitumianban) 调整行高时报错的问题
- 确保 [Time control](guides/time.md#shuxing) 的 **year_range** 属性指定的区间包含最后一年
- 修正受 `line-height` CSS 样式影响的链接箭头位置
- 修复加载 [collections](guides/supported-data-formats.md#daijihedejson) 且无 `links` 数组时报错的问题
- 解决 `gantt.config.baselines` 为 falsy 但未显式设置为 `false` 时的问题
- 修复调用 [resetLayout](api/method/resetlayout.md) 后 [click_drag](guides/extensions-list.md#gaojituofang) 不工作的问题
- 确保启用 [keyboard_navigation](guides/keyboard-navigation.md) 时，选中子任务不会显示在父任务之上
- 修复任务 ID 含单引号时的键盘导航问题
- 修正 [calculateEndDate](api/method/calculateenddate.md) 在持续时间为负时的行为
- 解决加载带有 [baselines](guides/inbuilt-baselines.md) 且无活动 timeline 的数据集时报错的问题
- 确保即使任务超出图表时间范围，grid 单元格也能获得焦点
- 修复在 [inline editor](guides/inline-editors-ext.md) 部分删除日期值时报错的问题
- 修复启用 `fetchTasks` 时，筛选后 [resource panel](guides/resource-management.md#ziyuanshitumianban) 显示异常的问题

## 9.0.4

<span class='release_date'>2024年12月3日。Bug 修复版本</span>

- 修复无法通过 [inline editor](guides/inline-editors-ext.md) 更改 [SNET constraint](guides/auto-scheduling.md#renwudeshijianyueshu) 日期的问题
- 修复在 [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) 配置被禁用时，具有单一 [resource assignment](guides/resource-management.md#ziyuanfenpei) 的任务返回全局 [calendar](guides/working-time.md) 而非资源日历的问题
- 修复在 [reinitializing](api/method/init.md) Gantt 或 [resetting the layout](api/method/resetlayout.md) 后，通过 inline editor 更改开始日期时的 [constraint](guides/auto-scheduling.md#renwudeshijianyueshu) 日期问题
- 修复在未指定容器的情况下，结合 [gantt.plugins](api/method/plugins.md) 某些配置与 [gantt.getGanttInstance](guides/multiple-gantts.md) 方法使用时报脚本错误的问题
- 修复启用 [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md) 配置且任务被 [grouped](api/method/groupby.md) 时 Gantt 停止工作的问题
- 确保拖动任务后 Gantt 能保留任务的 [constraint](guides/auto-scheduling.md#renwudeshijianyueshu)

## 9.0.3

<span class='release_date'>2024年11月19日。Bug 修复版本</span>

- 修复 [Quick Info](guides/quick-info.md) 弹窗样式的回归问题
- 解决 PostCSS 因使用 'start'/'end' 而非 'flex-start'/'flex-end' 引发的构建警告
- 防止通过 lightbox 更新时 [resource assignment](guides/resource-management.md#ziyuanfenpei) 被移除
- 修复在 [resource_cell_value](api/template/resource_cell_value.md) 中，启用 [resource_render_empty_cells](api/config/resource_render_empty_cells.md) 时非工作日任务数组为空的问题
- 修正点击 [lightbox](guides/default-edit-form.md) 区域内嵌按钮时报错的问题
- 确保 [resource panel](guides/resource-management.md#ziyuanshitumianban) 与 [zoom levels](guides/zooming.md#neizhisuofangmokuai) 保持同步
- 防止 [Inline Editors](guides/inline-editors-ext.md) 事件在 [reinitializing](api/method/init.md) Gantt 或 [resetting the layout](api/method/resetlayout.md) 后丢失
- 修复 [redoing](guides/undo-redo.md) 更改后未恢复展开状态的问题

## 9.0.2

<span class='release_date'>2024年11月11日。Bug 修复版本</span>

### 修复

- 修复了当通过[任务对象属性](guides/colouring-tasks.md#zairenwuduixiangshuxingzhongzhidingyangshi)指定任务颜色时，导致任务边框和进度样式错误的回归问题
- 恢复了 [marker_class](api/template/marker_class.md) 模板的功能
- 恢复了 lightbox 的 [textarea](guides/textarea.md) 区块缺失的 classname
- 修正了 [deadlines](guides/inbuilt-baselines.md#jiezhiriqiyuyueshu) 显示在任务行之外且未完全居中的问题
- 确保鼠标悬停时，链接显示在其他链接之上
- 修复了通过 [parse](api/method/parse.md) 方法加载 [baseline](guides/inbuilt-baselines.md) 时，基线日期未被计算的问题
- 修正了常规视图和 [RTL](guides/rtl-mode.md) 视图下 [constrains](guides/inbuilt-baselines.md#jiezhiriqiyuyueshu) 的位置
- 防止在链接拆分任务的部分时出现不必要的链接循环
- 修复了 [Quick Info](guides/quick-info.md) 在 [detached mode](api/config/quick_info_detached.md) 下由于宽度增加和硬编码样式未隐藏的问题
- 更新了 [Export API](api/method/exporttoexcel.md)，支持导出 Excel 时的树形缩进
- 解决了启用 [multiselect_one_level](api/config/multiselect_one_level.md) 且选择了其他树级任务时，无法选择任务的问题
- 恢复了 TypeScript 环境下 [export_api](api/method/exporttopdf.md) 插件的功能
- 更新了类型定义

## 9.0.1


<span class='release_date'>2024年10月21日。Bug修复版本</span>

### 修复

- 修复了启用 [smart_rendering](api/config/smart_rendering.md) 时，拖动链接位置错误的回归问题
- 修复了 [lightbox](guides/default-edit-form.md) 的 [Resource Control](guides/resources.md) 超出容器范围的回归问题
- 修正了自定义 CSS 高亮最后一行时，[time scale](guides/configuring-time-scale.md) 单元格底部边框缺失的问题
- 修复了禁用 [smart_scales](api/config/smart_scales.md) 时 [sticky labels](guides/configuring-time-scale.md#nianxingbiaoqian) 行为不正确的问题
- 解决了右键点击后 Gantt 继续[垂直拖动](api/config/order_branch.md)任务的问题
- 修复了调用 [resetLayout](api/method/resetlayout.md) 后，[S-Curve Overlay](guides/baselines.md#weitubiaotianjiaewaifugaiceng) 插件功能失效的问题
- 防止 [predecessor editor](guides/inline-editing.md#bianjiqileixing) 创建重复链接

## <b>9.0</b>


<span class='release_date'>2024年10月17日。重大更新</span>

[在博客上查看本次发布](https://dhtmlx.com/blog/dhtmlx-gantt-9-0/)

### 重大变更

本次更新对 Gantt 包的结构和功能行为做出了一些更改。请务必查看
[迁移说明](migration.md#80---90) 以确保平稳过渡。

### 新功能

- 使用 CSS 变量的[皮肤自定义](guides/custom-skins.md)
- 新增[暗色皮肤](guides/skins.md#darkpifu)
- 内置支持 [baselines](guides/inbuilt-baselines.md)
- 现在支持[手动安排的汇总任务](guides/custom-projects-dates.md)
- [时间刻度的粘性标签](guides/configuring-time-scale.md#nianxingbiaoqian)

### 更新

- 更新了 [Terrace skin](guides/skins.md#terracepifu)
- 新增了 [deadlines](guides/inbuilt-baselines.md#jiezhiriqiyuyueshu) 的默认显示
- 新增了 [task constraints](guides/inbuilt-baselines.md#taskconstraints) 的默认显示
- [皮肤源文件](guides/custom-skins.md) 现已包含在包内
- [Undo 插件](guides/undo-redo.md) 增加了 `setUndoStack` 和 `setRedoStack` 方法，用于管理撤销/重做栈
- 支持通过 npm [安装 Gantt 专业版](guides/installation.md)
- [Bluebird Promise](api/method/promise.md) 库已从核心库**移除**
- 针对高分辨率屏幕的缩放与小屏幕响应做了多项改进
- 更新了类型定义

### 修复

- 修复了当父任务高度较大时里程碑链接位置错误的问题
- 解决了[自动调度](guides/auto-scheduling.md)期间取消某任务自动调度时报错的问题
- 确保 [split tasks](guides/split-tasks.md) 正确显示在拆分父任务行内
- 修正了当子任务链接延迟为0时，[Auto Scheduling](guides/auto-scheduling.md#summaryscheduling) 项目的调度问题
- 修复了具有不同行高的 [split tasks](guides/split-tasks.md) 的链接位置错误
- 确保 Gantt 能正确自动调度具有两级任务的项目
- 修复了当任务超出指定日期范围时，[resource_cell_value](guides/resource-management.md#resourcecellvalue) 未返回固定日期"assignments"的问题

## 8.0.11


<span class='release_date'>2024年10月8日。Bug修复版本</span>

### 修复

- 修复了当右侧有[列宽调整器](guides/specifying-columns.md#diaozhengliekuan)时，Grid 与 Timeline 联动滚动的问题
- 防止在添加 [Time section](guides/time.md) 时，[lightbox](guides/default-edit-form.md) 自动切换为 [wide_form](api/config/wide_form.md) 模式
- 确保 [number editor](guides/inline-editing.md) 遵循 min 和 max 属性，防止输入超出范围的值
- 修复了在 [Resource Panel](guides/resource-management.md) 显示任务时，使用 [gantt.batchUpdate](api/method/batchupdate.md) 方法删除任务会报错的问题
- 修正了 Salesforce 环境下 [lightbox](guides/default-edit-form.md) 居中定位的问题
- 修复了由于 [row_height](api/config/row_height.md) 设置导致 [键盘导航](guides/keyboard-navigation.md) 停止响应的问题
- 修正了某些场景下项目 [Auto Scheduling](guides/auto-scheduling.md) 日期错误的问题，现在只需一次自动调度即可获得准确结果
- 解决了当页面上有 [Resource Histogram](guides/resource-management.md#ziyuanshitumianban) 时，[键盘导航](guides/keyboard-navigation.md) 的问题
- 修复了在调用 [gantt.getGanttInstance](guides/multiple-gantts.md) 并传递配置参数时，触摸设备初始化报错的问题
- [gantt.load](api/method/load.md) 方法已从 Node.js 版本中移除
- 修复了自定义 [getVisibleRange](api/method/addtasklayer.md) 函数时 Gantt 抛出错误的问题
- 解决了启用 [键盘导航](guides/keyboard-navigation.md) 时，更新任务后 Gantt 自动滚动到该任务的回归问题
- 确保点击表头排序图标时，[grid sorting](api/config/sort.md) 能正常工作
- 修复了启用 [drag_timeline](api/config/drag_timeline.md) 时任务重绘不一致的问题

## 8.0.10


<span class='release_date'>2024年8月23日。Bug修复版本</span>

### 修复

- 修复了第二个 [Calendar](guides/working-time.md) 的日期设置未被[合并](guides/working-time.md#mergingcalendars)的问题"
- 修复了启用["hide empty"](guides/resources.md) 选项时，[资源](guides/resource-management.md) 未被分配的问题
- 修复了 [getLightboxSection](api/method/getlightboxsection.md) 方法在 [Resource Section](guides/resources.md) 未修改任何值前返回 `null` 的问题
- 修复了当任务开始于最小日期之前但结束在显示日期范围内时，[Resource Histogram](guides/resource-management.md#ziyuanshitumianban) 的模板未被调用的问题
- 修复了更改任务 [type](guides/typeselect.md) 后，[Resource Assignments](guides/resource-management.md) 未保存的问题
- 修复了 lightbox 中 [project] 任务 [type](guides/typeselect.md) 未设置的问题
- 修复了合并日历的 [worktime settings](guides/working-time.md) 被当作周末处理的问题
- 修复了当任务在不同日期有 [Resource Assignments](guides/resource-management.md) 时，[按资源分组](api/method/groupby.md) 失败的问题
- 修复了使用 [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 事件过滤没有子任务的 [split tasks](guides/split-tasks.md#shaixuanchaifenrenwu) 时导致的错误
- 修复了[拖动带有子任务的项目](api/config/drag_project.md)后，[Resource Assignments](guides/resource-management.md) 未更新的问题

## 8.0.9


<span class='release_date'>2024年6月18日。Bug修复版本</span>

### 修复

- 解决了多次使用[键盘快捷键](guides/keyboard-navigation.md)缩进或减少缩进后任务消失的问题
- 修复了垂直滚动 Gantt 后无法重新打开 [Inline editor](guides/inline-editing.md) 的问题
- 修复了 [DataProcessor](guides/server-side.md#ziyuanjiziyuanfenpeidecrudluyou) 忽略 [gantt.createDataProcessor](api/method/createdataprocessor.md) 方法中自定义 header 的问题
- 修复了当 [onBeforeLightbox](api/event/onbeforelightbox.md) 处理函数在创建新任务时返回 `false` 时任务显示异常的问题
- 修复了启用 [timeline_placeholder](api/config/timeline_placeholder.md) 配置时，[markers](guides/markers.md) 高度错误的问题
- 修复了 [Formatter](guides/formatters-ext.md) 仅支持拉丁字符的问题
- 修复了[垂直拖动](api/config/order_branch.md)父任务后任务消失的问题
- 修复了启用 [smart_rendering](api/config/smart_rendering.md) 时，[键盘快捷键](guides/keyboard-navigation.md) 滚动功能异常的问题
- 修复了解析后 [Resource Assignments](guides/resource-management.md) 对象中的自定义属性未被包含的问题
- 更新了 TypeScript 类型定义

## 8.0.8


<span class='release_date'>2024年5月31日。Bug修复版本</span>

### 修复

- 修复了 [Undo extension](guides/undo-redo.md) 在批量操作时跳过部分操作的问题
- 修复了从 [gantt.silent](api/method/silent.md) 函数中调用 [gantt.deleteLink](api/method/deletelink.md) 时发生的脚本错误
- 修复了当两个连接任务有不同 [calendars](guides/working-time.md) 时，[Auto Scheduling](guides/auto-scheduling.md) 行为异常的问题
- 修复了创建[循环链接](api/method/iscircularlink.md)后发生的脚本错误
- 修复了销毁带有可编辑 [Resource Panel](guides/resource-management.md) 的 Gantt 后发生的脚本错误
- 修复了部分浏览器下 [tooltip](guides/tooltips.md) 消失的问题

## 8.0.7


<span class='release_date'>2024年5月16日。Bug修复版本</span>

### 修复

- 修复了在 SalesForce 的试用版本中出现的脚本错误
- 现在，在时间线中拖动任务后，[[onAfterTaskUpdate](api/event/onaftertaskupdate.md)](api/event/onaftertaskupdate.md) 事件会在 [自动调度](guides/auto-scheduling.md) 事件之前触发
- 修复了在启用 [多选](guides/multiselection.md) 扩展时，与已选任务交互时重复触发事件的问题
- 修复了当图表中的第一个任务未包含日期时发生的脚本错误
- 为了更好地识别，在 [lightbox](guides/default-edit-form.md) 的 section 元素上添加了 section 名称作为类名
- 修复了在启用 [自动调度](guides/auto-scheduling.md) 时，无法通过 [lightbox](guides/default-edit-form.md) 取消任务调度的问题
- 修复了在滚动甘特图时，[[resize_rows](api/config/resize_rows.md)](api/config/resize_rows.md) 标记定位的问题
- 阻止了已关联的 [未调度任务](guides/unscheduled-tasks.md) 的 [自动调度](guides/auto-scheduling.md)
- 修复了在禁用智能渲染时，添加 [Rollup](guides/milestones.md#huizongrenwuhelichengbei) 任务导致甘特图崩溃的问题
- 修复了在触摸设备上拖动 [拆分任务](guides/split-tasks.md) 的问题
- 修复了在 [未调度任务](guides/unscheduled-tasks.md) 上使用 [isCriticalTask](api/method/iscriticaltask.md)、[getFreeSlack](api/method/getfreeslack.md) 和 [getTotalSlack](api/method/gettotalslack.md) 方法时发生的错误
- 修复了当关联的项目仅包含 [未调度](guides/unscheduled-tasks.md) 子任务时发生的错误

## 8.0.6


<span class='release_date'>2023年9月25日。Bug 修复版本</span>

### 修复

- 对 [WAI-ARIA 属性](guides/accessibility.md#waiariashuxing) 的使用进行了增强和修正，以提升无障碍性
- 修复了启用 [`grid_elastic_columns`](api/config/grid_elastic_columns.md) 配置后，重绘导致表格宽度缩小的问题
- 默认的 [`undo_steps`](guides/undo-redo.md#peizhichexiaogongneng) 数量从 10 增加到 100
- [导出 API 客户端](guides/extensions-list.md#daochufuwu) 现已集成到 Gantt 的 GPL 版本中，以前仅包含在 PRO 版本中
- 在 [Node.js 版本的 Gantt](guides/using-gantt-on-server.md) 中增加对 https 导出 [服务器端点](guides/export.md#daochufangfadecanshu) 的支持

## 8.0.5


<span class='release_date'>2023年9月1日。Bug 修复版本</span>

### 修复

- 修复了通过 [gantt.getGanttInstance](guides/multiple-gantts.md) 配置启用扩展时错误警告的问题
- 修复了在启用 [skip_off_time](api/config/skip_off_time.md) 配置时，[gantt.exportToExcel()](api/method/exporttoexcel.md) 工作不正确的问题
- 改进了 [Samples Viewer](https://docs.dhtmlx.com/gantt/samples/) 的体验

## 8.0.4


<span class='release_date'>2023年7月31日。Bug 修复版本</span>

### 修复

- 修复了 [DataProcessor](guides/server-side.md#ziyuanjiziyuanfenpeidecrudluyou) 未跟踪 [资源数据存储](guides/resource-management.md#shiyongziyuanshitumianban) 变更的问题
- 解决了在禁用 [process_resource_assignments](api/config/process_resource_assignments.md) 配置后拖动任务发生的错误
- 修复了以分钟为单位减去日期时，[gantt.calculateEndDate](api/method/calculateenddate.md) 工作不正确的问题
- 对含有 [可见性分组](guides/layout-config.md#kejianxingfenzu) 的布局进行了小幅性能提升

## 8.0.3


<span class='release_date'>2023年6月14日。Bug 修复版本</span>

### 修复

- 提升了 [资源面板](guides/resource-management.md) 的性能
- 修复了带有 [负时滞](guides/auto-scheduling.md#shezhirenwuzhijiandezhihouhetiqianshijian) 任务的 [自由时差](guides/critical-path.md#huoquziyoufudonghezongfudong) 计算不正确的问题
- 修复了进度为 100% 任务的 [关键路径](guides/critical-path.md) 计算不正确的问题

## 8.0.2


<span class='release_date'>2023年5月31日。Bug 修复版本</span>

### 修复

- 修复了使用 [LinkFormatters](guides/formatters-ext.md#lianjiegeshihuaqi) 时 [导出](guides/export-common.md) 出现的错误
- 修复了 [撤销扩展](guides/undo-redo.md) 与 [资源及资源分配](guides/resource-management.md) 配合使用时工作不正确的问题
- 更新了类型定义
- 提升了 [Rollup](guides/milestones.md#huizongrenwuhelichengbei) 任务渲染的性能
- 提升了 [拆分任务](guides/split-tasks.md) 渲染的性能
- 其他性能优化

## 8.0.1


<span class='release_date'>2023年3月30日。Bug 修复版本</span>

### 修复

- 修复了未打开 [lightbox](guides/default-edit-form.md) 时调用 [gantt.showCover()](api/method/showcover.md) 抛出的错误
- 修复了 [拆分任务](guides/split-tasks.md) 的回归问题，导致在时间轴外显示拆分任务时脚本错误
- 修复了 [gantt.addLinkLayer()](api/method/addlinklayer.md) 方法的回归问题
- 修复了当 [工作时间设置](guides/working-time.md#quanjushezhi) 包含分钟部分时，[自动调度](guides/auto-scheduling.md) 与 [MSO、FNET 和 FNLT 约束](guides/auto-scheduling.md#renwudeshijianyueshu) 配合使用不正确的问题
- 修复了滚动时 [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 事件的工作问题

## <b>8.0</b>


<span class='release_date'>2023年3月20日。重大更新</span>

[在博客中查看本次发布](https://dhtmlx.com/blog/dhtmlx-gantt-8-0/)

### 重大变更

请查阅 [迁移指南](migration.md#71---80)，以跟进最新版本。

### 新功能

- 资源管理更新:
    - 资源和资源分配现在可以[与数据一起加载](guides/supported-data-formats.md#json)
    - 可通过 [DataProcessor](guides/server-side.md#ziyuanjiziyuanfenpeidecrudluyou) 捕获资源和资源分配的变更
    - 使用 [资源面板](guides/resource-management.md#shiyongziyuanshitumianban) 所需的样板代码减少
- 分组任务功能现在可以保留组内原始甘特树结构:
    - [groupBy()](api/method/groupby.md) 方法新增 **save_tree_structure** 参数
- [空状态界面](guides/empty-state-screen.md):
    - 新增 [show_empty_state](api/config/show_empty_state.md) 属性
    - 新增 [emptyStateElement 扩展](guides/empty-state-element-ext.md)
- 时间线背景网格可扩展至整个容器:
    - 新增 [timeline_placeholder](api/config/timeline_placeholder.md) 属性
- Rollup 项和拆分任务的改进:
    - 可为单独的 [rollup 项](guides/milestones.md#dulihuizongxiangdeyangshishezhi) 和 [拆分任务](guides/split-tasks.md#yangshi) 设置样式
    - 可[隐藏项目任务中的所有 rollup 项](guides/milestones.md#yincangrenwuhelichengbei)
    - 可控制 rollup 项的显示位置（新增 [onBeforeRollupTaskDisplay](api/event/onbeforerolluptaskdisplay.md) 事件）
    - 可[过滤拆分任务](guides/split-tasks.md#shaixuanchaifenrenwu)（新增 [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 事件）
    - 拆分任务显示性能优化
- 仅在后端确认后删除项目的能力:
    - [dataProcessor 配置对象](api/method/createdataprocessor.md) 新增 **deleteAfterConfirmation** 参数
- 自动调度与约束计算更新:
    - 任务现在可以从父项目继承约束类型:
        - 新增 [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md) 属性
- 关键路径、时差与自动调度的改进:
    - 关键路径、时差和自动调度算法现在可利用任务进度:
        - 新增 [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md) 属性
     - [总时差](guides/critical-path.md#huoquziyoufudonghezongfudong) 现在可为项目计算
     - 关键路径计算性能大幅提升
- [getTaskBy()](api/method/gettaskby.md) 方法现在允许选择 'project' 任务:
    - [getTaskBy()](api/method/gettaskby.md) 方法新增 **types** 参数
- 可在时间线单元格中插入任意 HTML 内容:
    - 新增 [timeline_cell_content](api/template/timeline_cell_content.md) 模板
- 导出 API 已包含在 [gantt.plugins](guides/extensions-list.md#daochufuwu) 中，无需额外添加 JS 文件。详情请查阅 [迁移指南](migration.md#71---80)

### 更新

- 更新了 TypeScript 类型定义

### 修复

- 修复了使用分钟 [duration_unit](api/config/duration_unit.md) 和自定义 [工作时间](guides/working-time.md#quanjushezhi) 设置时的 [工期计算](guides/working-time.md) 问题
- 修复了时差计算的各种问题
- 修复了启用 [时差计算](guides/critical-path.md#huoquziyoufudonghezongfudong) 时数据加载出现的脚本错误
- [setWorkTime](api/method/setworktime.md) 方法现在支持为 customWeeks 内的日期设置规则
- 修复了智能渲染导致甘特图中出现空白的问题
- 修复了在某些行具有 [自定义高度](guides/resizing-rows.md#shezhixinggao) 时，[表格中的行垂直重新排序](guides/reordering-tasks.md) 工作不正确的问题
- 修复了启用 [多选](guides/multiselection.md) 扩展时，[内联编辑器](guides/inline-editing.md) 工作不正确的问题
- 修复了当 [gantt.config.quick_info_detached](api/config/quick_info_detached.md) 配置为 `false` 时，[Quick Info](guides/quick-info.md) 弹窗显示不正确的问题
- 修正了 [内联编辑器](guides/inline-editing.md#zidingyineilianbianjiqi) 接口 `is_valid` 函数的参数。该函数现在接收列对象
- 确保在 [gantt.groupBy](guides/grouping.md) 激活时创建任务，任务的 `parent` 属性能被正确保存
- 修复了在启用 [占位任务](api/config/placeholder_task.md) 和 [键盘导航](guides/keyboard-navigation.md) 时出现的意外垂直滚动问题
- 修复了 [DataProcessor](guides/server-side.md) 在 [自动调度](guides/auto-scheduling.md) 后导致部分变更未同步到后端的问题
- 修复了 [表格中的行垂直重新排序](guides/reordering-tasks.md) 允许任务行被拖拽到甘特图外部的问题
- 修复了 [资源面板](guides/resource-management.md#ziyuanshitumianban) 中行的 `odd` CSS 类顺序不正确的问题

## 7.1.13


<span class='release_date'>2022年11月4日。Bug 修复版本</span>

### 修复

- 修复了 [gantt.addLinkLayer()](api/method/addlinklayer.md) 方法与 [smart_rendering](api/config/smart_rendering.md) 属性配合使用时工作不正确的问题
- 修复了在不同 [时间刻度](guides/configuring-time-scale.md) 下，[S-Curve Overlay](guides/baselines.md#weitubiaotianjiaewaifugaiceng) 显示异常的问题
- 修复了启用 [grid_elastic_columns](api/config/grid_elastic_columns.md) 属性时，[网格列调整大小](guides/specifying-columns.md#diaozhengliekuan) 的问题
- 修复了使用 [键盘导航](guides/keyboard-navigation.md) 删除任务后，甘特图垂直滚动条位置被重置的问题
- 修复了 [treeDatastore.move()](api/other/treedatastore.md) 方法的异常行为
- 修复了 [gantt.parse()](api/method/parse.md) 方法的问题，现在数据集中的 [额外集合](guides/supported-data-formats.md#daijihedejson) 可通过 [gantt.serverList()](api/method/serverlist.md) 方法获取
- 修复了 [gantt.groupBy()](api/method/groupby.md) 方法在分组后会重置选中状态的问题
- 修复了与 Vue.js v3.x 的兼容性问题
- 修复了在指定任务未包含 'constraint_date' 时，[gantt.getConstraintLimitations()](api/method/getconstraintlimitations.md) 方法抛出脚本错误的问题
- 修复了与 SalesForce Web Security 的兼容性问题
- 修复了启用 [键盘导航](guides/keyboard-navigation.md#jianpandaohangzhongdejiaodianxingwei) 后，点击甘特图容器外部会重新聚焦到甘特图的问题
- [德语本地化](guides/localization.md#qiyongyuyanhuanjing) 已更新
- 现在在多选模式下，单击任务即可打开内联编辑器（新增 [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) 属性）

## 7.1.12


<span class='release_date'>2022年6月16日。Bugfix 版本</span>

### 修复

- 修复了 [gantt.isWorkTime()](api/method/isworktime.md) 方法在 "week" 时间单位下的异常行为
- 修复了通过 [gantt.silent()](api/method/silent.md) 方法添加任务和链接后未能渲染的问题
- 修复了某些情况下数据加载后出现 "Task not found" 错误提示的问题
- 修复了 [gantt.changeLightboxType()](api/method/changelightboxtype.md) 方法导致旧 lightbox 元素残留在 DOM 中的问题
- 修复了夏令时/冬令时切换后，任务重叠时任务结束日期计算不正确的问题
- 修复了使用单元格编辑器编辑资源值时，[资源面板](guides/resource-management.md#ziyuanshitumianban) 消失的问题
- 修复了当 [Gantt 布局](guides/layout-config.md) 包含 ["resourceGrid"/"resourceTimeline"](guides/resource-management.md#ziyuanshitumianban) 视图但未包含 "grid"/"timeline" 视图时发生的脚本错误
- 修复了当 Gantt 布局包含 [资源面板](guides/resource-management.md#ziyuanshitumianban) 时，[autosize](api/config/autosize.md) 配置项的异常行为
- 修复了 [拆分任务](guides/split-tasks.md) 的 [lightbox](guides/default-edit-form.md)，现在双击拆分任务时应正常显示 lightbox

## 7.1.11


<span class='release_date'>2022年4月27日。Bugfix 版本</span>

### 修复

- 修复了压缩 Gantt 文件的 sourcemaps
- 修复了应用 [autosize = 'y'](api/config/autosize.md) 时，[标记](guides/markers.md) 位置不正确的问题
- 修复了当 Gantt 容器有额外 margin 或垂直偏移时，[tooltip](guides/tooltips.md) 及其他元素位置不正确的问题
- 修复了编辑资源分配第一单元格后，[可编辑资源图表](guides/resource-management.md) 行顺序变化的问题
- 修复了在某些情况下展开或折叠任务后，[smart rendering](api/config/smart_rendering.md) 异常的问题
- 修复了激活 [click_drag](guides/extensions-list.md#gaojituofang) 和 [drag_timeline](guides/extensions-list.md#tuodongshijianzhou) 扩展时，[onBeforeDrag](guides/advanced-dnd.md) 事件未能阻止默认操作的问题
- 修复了为 [资源分配存储](guides/resource-management.md#ziyuanfenpei) 调用 [changeId()](api/other/datastore.md) 方法时抛出的脚本错误
- 默认 [Gantt 布局](guides/layout-config.md#morenbuju) 的滚动条现在无需固定 **scrollVer**/**scrollHor** 名称即可正常工作
- [拆分任务](guides/split-tasks.md) 现在在 [选中](api/config/select_task.md) 时会像常规任务一样获得 'gantt_selected' 类

## 7.1.10


<span class='release_date'>2022年3月16日。Bugfix 版本</span>

### 修复

- 修复了如果 [项目任务](guides/task-types.md#xiangmurenwu) 没有子任务且指定了 `start_date` 参数时，Gantt 未渲染任务的问题
- 修复了当任务 ID 为非数字值或超过16位的数字字符串时，[拖拽调整任务行高度](guides/resizing-rows.md#tongguotuozhuaidiaozhengxinggao) 异常的问题
- 修复了 [可见性分组](guides/layout-config.md#kejianxingfenzu) 导致网格与时间刻度大小不同步的 [复杂布局](guides/layout-config.md) 问题
- 修复了同时横向拖拽多个任务后，任务日期异常的问题
- 修复了在禁用 [auto-update mode](https://docs.dhtmlx.com/api__dataprocessor_setupdatemode.html) 时，[dataProcessor](guides/server-side.md) 未能从不同数据存储发送全部更新的问题
- 修复了 [milestone](guides/milestones.md) 与 [FF link](api/config/links.md) 配合使用时会被移动到下一天的问题
- 修复了在使用 [后向计划](guides/auto-scheduling.md#qianxianghouxiangjihua) 并将 [project_end](api/config/project_end.md) 设为非工作时间时，里程碑 `end_date` 计算不正确的问题
- 修复了如果 HTML 元素显示在 gantt 上方，任务重新排序异常的问题
- 修复了 [unsetWorkTime()](api/method/unsetworktime.md) 方法在日历中移除日期/天配置后未能立即生效的问题
- 修复了 [clearAll()](api/method/clearall.md) 方法在启用 [multiselect](guides/extensions-list.md#duorenwuxuanze) 扩展时未能清除选中任务的问题
- 修复了在应用 [exportToExcel()](api/method/exporttoexcel.md) 方法并设置 `visual: true` 参数且 [duration_unit](api/config/duration_unit.md) 配置为 'hour' 时出现的错误

## 7.1.9


<span class='release_date'>2022年1月10日。Bugfix 版本</span>

### 修复

- 修复了在 "year" 刻度下拖拽项目后，[子任务对齐](guides/dynamic-scale.md) 异常的问题
- 修复了在 ["month"](api/config/scales.md) 刻度下，[拖拽带子任务的项目](api/config/drag_project.md) 后项目持续时间变化的问题
- 修复了 [自动排程](guides/auto-scheduling.md) 中，[约束类型](guides/auto-scheduling.md#renwudeshijianyueshu) 在更改任务持续时间后从 "ASAP" 变为 "SNET" 的问题
- 修复了启用 [schedule_from_end](api/config/schedule_from_end.md) 时，通过内联编辑器更改开始和结束日期后，[后向计划](guides/auto-scheduling.md#qianxianghouxiangjihua) 异常的问题
- 现在可以在只读模式下为只读任务打开 lightbox [只读任务的 lightbox](guides/readonly-mode.md#tedingrenwulianjiedezhidumoshi)
- 现在无法通过 lightbox 编辑只读任务
- 修复了在 [只读模式下可编辑任务](guides/readonly-mode.md#zhenggegantetudezhidumoshi) 无法打开 lightbox 的问题（出现在 v6.3.1）
- 修复了通过 [show_chart](api/config/show_chart.md) 隐藏时间轴后，网格列调整大小的问题
- 修复了更改 [project_start](api/config/project_start.md) 和 [project_end](api/config/project_end.md) 的值后，[自动排程](guides/auto-scheduling.md) 无法取消的问题
- 修复了 gantt 会为禁用自动排程的任务分配约束的问题
- 修复了当任务日期范围超过10年且[未指定年份选择器范围](guides/duration.md)时，lightbox 定义年份范围的问题
- 修复了如果有3个或以上垂直视图附加了水平滚动条，加载 Gantt 后会抛出脚本错误的问题
- 修复了在为无链接的任务设置 [ASAP 约束](guides/auto-scheduling.md#renwudeshijianyueshu) 并启用 [strict mode](api/config/auto_scheduling_strict.md) 后，[onBeforeTaskAutoSchedule](api/event/onbeforeautoschedule.md) 事件工作不正确的问题
- 修复了在 Next.js 项目中运行 Gantt 压缩版本时出现的错误
- 修复了在空容器中初始化 [gantt 实例](guides/multiple-gantts.md#ganteshilipeizhi) 后，Gantt 宽度变化的问题

## 7.1.8


<span class='release_date'>2021年11月30日。Bugfix 版本</span>

### 修复

- 修复了在启用 [资源直方图](guides/resource-management.md#ziyuanshitumianban) 和 [fit_tasks](api/config/fit_tasks.md) 配置时，[gantt.groupBy](guides/grouping.md) 方法抛出脚本错误的问题
- 修复了 [撤销扩展](guides/undo-redo.md) 在 [垂直排序回退](guides/reordering-tasks.md) 时未能将更新发送 [到服务器](guides/server-side.md) 的问题
- 修复了 [导出到 MS Project](guides/export-msproject.md) 模块在某些情况下自定义属性导出时返回 `Unknown error` 的问题
- 修复了 [gantt.silent](api/method/silent.md) 方法未能阻止 [gantt.changeTaskId](api/method/changetaskid.md) 触发 API 事件和重绘的问题
- 修复了 [gantt.undo](api/config/undo.md) 方法未能恢复回退项原始垂直位置的问题
- 修复了 [资源分配表单](guides/resources.md) 异常，导致 gantt 用自动生成的值替换用户自定义的 [资源分配](guides/resource-management.md#ziyuanfenpei) id 的问题
- 修复了 [gantt.changeTaskId](api/method/changetaskid.md) 在受影响任务包含嵌套项时，嵌套级别计算错误的问题

## 7.1.7


<span class='release_date'>2021年10月5日。Bugfix 版本</span>


### 修复

- 修复了[总浮动](api/method/gettotalslack.md)值计算不正确的问题
- 提升了[总浮动](guides/critical-path.md#huoquziyoufudonghezongfudong)计算的性能
- 修复了[Material](guides/skins.md#materialpifu)皮肤下[lightbox](guides/edit-form.md)的样式问题
- 修复了[Zoom 插件](guides/zooming.md#neizhisuofangmokuai)的问题，该问题导致在[gantt.init](api/method/init.md)之后调用[zoom.init](guides/zoom.md)方法无法生效
- 修复了将[inherit_calendar](guides/working-time.md#weixiangmufenpeirili)配置与[gantt.groupBy](guides/grouping.md)方法一起使用时产生的脚本错误
- 修复了在激活[placeholder task](api/config/placeholder_task.md)时，通过[gantt.batchUpdate](api/method/batchupdate.md)添加任务会抛出脚本错误的问题
- 修复了允许[placeholder task](api/config/placeholder_task.md)被排序、重新排序或接受子任务的问题
- 修复了[网格列](guides/specifying-columns.md)尺寸不正确的问题
- 修复了[列大小调整器](guides/specifying-columns.md#diaozhengliekuan)与[列重新排序](api/config/reorder_grid_columns.md)冲突导致的列大小调整异常

## 7.1.6


<span class='release_date'>2021年8月23日. Bugfix 版本</span>

### 修复

- 修复了启用[schedule_from_end](api/config/schedule_from_end.md)时，[auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)配置项工作不正确的问题
- 修复了列的[onrender](api/config/columns.md)回调导致自定义元素在快速滚动网格时消失的问题
- 修复了 v7.1.5 引入的回归问题，该问题导致在复杂布局下调整网格单元格大小后，网格行消失
- 修复了[size/visibility groups](guides/layout-config.md#kejianxingfenzu)工作不正确的问题，该问题导致复杂布局下列宽未同步
- 优化了在小容器中渲染 gantt 时网格的显示效果

## 7.1.5


<span class='release_date'>2021年7月22日. Bugfix 版本</span>

### 修复

- 修复了在["marker"模式](guides/reordering-tasks.md#tishengdashujujixiadexingneng)下，当 gantt 行高不一致时，任务垂直排序不正确的问题
- 修复了在部分布局下，[show_grid](api/config/show_grid.md) 和 [show_chart](api/config/show_chart.md) 配置被禁用时，时间轴和网格尺寸异常的问题
- 为网格表头单元格添加了 `data-column-name` 和 `data-column-index` 属性
- 修复了在[gantt 重新初始化](api/method/init.md)并[移除所有列](guides/specifying-columns.md#gaishu)后，网格显示不正确的问题
- 修复了资源面板配置会覆盖 Vue.js 应用中[gantt 主配置](guides/common-configuration.md#ganttconfigduixiang)的问题
- 现在可以通过修改传递给[资源布局](guides/layout-config.md#shitudepeizhihemoban)的配置对象，动态修改[资源面板](guides/resource-management.md#ziyuanshitumianban)的配置

## 7.1.4


<span class='release_date'>2021年6月30日. Bugfix 版本</span>

### 修复

- 修复了[unsetWorkTime](api/method/unsetworktime.md) 工作不正确导致受影响日期工时异常的问题
- 修复了在[Resource histogram](guides/resource-management.md#ziyuanshitumianban)滚动时，当 [resource_render_empty_cells](api/config/resource_render_empty_cells.md) 设置为 false 且 [smart_rendering](api/config/smart_rendering.md) 启用时抛出的脚本错误
- 修复了[Inline Editors](guides/inline-editors-ext.md)模块的 `editNextRow` 和 `editPrevRow` 方法工作不正确的问题
- 修复了[Quick Info](guides/extensions-list.md#kuaisuxinxi) 弹窗点击网格"添加"按钮后仍然显示的问题
- 修复了[ASAP 约束](guides/auto-scheduling.md#renwudeshijianyueshu)未能将任务移动到项目最早日期的问题
- 修复了[Inline Editors](guides/inline-editors-ext.md)无法通过内联编辑器编辑[约束](guides/auto-scheduling.md#renwudeshijianyueshu)的问题
- 修复了[键盘导航](guides/keyboard-navigation.md)的"滚动到可见"逻辑导致任务条已可见时仍然滚动的问题
- 修复了启用[click_drag](guides/extensions-list.md#gaojituofang)扩展时鼠标移出容器产生的脚本错误
- 优化了 Gantt [auto_types](api/config/auto_types.md) 配置项的性能

## 7.1.3


<span class='release_date'>2021年5月25日. Bugfix 版本</span>

### 修复

- 修复了通过[onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)事件隐藏任务后，调用[gantt.moveTask](api/method/movetask.md) 抛出脚本错误的问题
- 修复了在最新版 Firefox 浏览器中滚动速度异常的问题
- 优化了[工时计算](guides/working-time.md)的性能

## 7.1.2


<span class='release_date'>2021年4月26日. Bugfix 版本</span>

### 修复

- 显著提升了[资源面板](guides/resource-management.md#ziyuanshitumianban)的性能
- 修复了在[gantt.load](api/method/load.md)进行中调用[gantt.destructor](api/method/destructor.md)时抛出的脚本错误
- 修复了更改任务 id 时[分割任务](guides/split-tasks.md)行为异常的问题
- 修复了 Angular 下鼠标滚轮滚动异常的问题

## 7.1.1


<span class='release_date'>2021年4月19日. Bugfix 版本</span>

### 修复

- 修复了[click_drag](guides/extensions-list.md#gaojituofang)插件的回归问题
- 修复了设置[gantt.config.csp](api/config/csp.md)为 "auto" 模式时抛出的 Security Violation 错误
- 修复了构建设置导致 v7.1.0 包含 ES6 语法的问题，库再次兼容 ES5
- 修复了启用[gantt.config.reorder_grid_columns](api/config/reorder_grid_columns.md)配置时，调整网格列宽抛出脚本错误的问题
- 更新了 TypeScript 类型定义
- 为[datastore](api/other/datastore.md)添加了[onDestroy](api/other/datastore.md#ondestroy)事件
- 优化了大量[任务日历](guides/working-time.md#weirenwufenpeirili)场景下的性能
- 优化了[资源分配计算](guides/resource-management.md#guanliziyuanfenpei)在[batchUpdate](api/method/batchupdate.md)和[autoScheduling](guides/auto-scheduling.md)过程中的性能

## 7.1


<span class='release_date'>2021年4月8日. 小版本更新</span>

[在博客中查看本次发布](https://dhtmlx.com/blog/dhtmlx-gantt-7-1-part-time-resource-assignment-rollup-tasks/)
### 重大变更

本次更新对组件部分内容进行了调整。虽然此次更新不需要修改现有代码，但请务必查阅[迁移文档](migration.md#70---71)。

### 新功能

- [可为任务指定具体日期分配资源](guides/resource-management.md#resourceassignmenttime)
- 新增[gantt.getTaskAssignments()](api/method/gettaskassignments.md)方法
- 通过新的[gantt.config.process_resource_assignments](api/config/process_resource_assignments.md)和[gantt.updateTaskAssignments()](api/method/updatetaskassignments.md) Gantt API，[管理资源分配](guides/resource-management.md#guanliziyuanfenpei)
- [汇总任务与里程碑](guides/milestones.md#huizongrenwuhelichengbei)
- [可在时间轴区域隐藏任务条与里程碑](guides/milestones.md#yincangrenwuhelichengbei)
- [可为不同时间段设置不同工作时间](guides/working-time.md#rules_for_periods)
- [可为网格中的单独行设置高度](guides/resizing-rows.md#shezhixinggao)
- [可通过拖拽调整网格行高](guides/resizing-rows.md#tongguotuozhuaidiaozhengxinggao)
- 可通过[gantt.getTaskBarHeight()](api/method/gettaskbarheight.md)方法获取任务 DOM 元素高度
- 新增事件:[onBeforeRowResize](api/event/onbeforerowresize.md)、[onRowResize](api/event/onrowresize.md)、[onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)、[onAfterRowResize](api/event/onafterrowresize.md)
- 网格单元格渲染到 DOM 时新增[onrender](guides/specifying-columns.md#xuanranhouxiugaidanyuange)回调
- 任务层自定义元素渲染到 DOM 时新增[onrender](api/method/addtasklayer.md)回调

### 修复

- 修复了在资源视图中资源已分配值时，垂直排序任务异常的问题
- 修复了任务未从时间轴单元格起始点开始时，"resource_cell_value" 未被调用且资源标记未渲染的问题
- 修复了删除数据存储中已存在 id 的任务时导致 Gantt 不工作的问题
- 修复了即使 "root_id" 参数已设置，将 0 作为任务 id 时抛出脚本错误的问题
- 修复了 Salesforce 环境下调整器监听器不生效的问题
- 修复了多次应用[全屏扩展](guides/fullscreen-ext.md)及其方法时出现的脚本错误
- 修复了多次添加[键盘导航扩展](guides/keynav-ext.md)后导致网格导航失效的问题
- 修复了[Inline Editors](guides/inline-editing.md)在通过[hide:true](guides/specifying-columns.md#liekejianxing)属性隐藏列后，无法在该列之后的单元格打开编辑器的问题

## 7.0.13


<span class='release_date'>2021年2月15日. Bugfix 版本</span>

### 修复

- 修复了动态更改[布局配置](guides/layout-config.md#bujuzidingyi)并使用[gantt.addTaskLayer](api/method/addtasklayer.md)时抛出的脚本错误
- 修复了使用 `fetchTasks` 选项时，[资源直方图](guides/resource-management.md#ziyuanshitumianban)初始内部高度异常的问题
- 修复了[前置任务编辑器](guides/inline-editing.md#bianjiqileixing)编辑值导致删除现有关联的问题
- 修复了通过[gantt.addTask](api/method/addtask.md)和[gantt.parse](api/method/parse.md)方法添加[非唯一 ID 任务](guides/task-object-operations.md)时 Gantt 工作异常的问题
- 优化了启用[auto_types](api/config/auto_types.md)和[drag_project](api/config/drag_project.md)配置时的拖拽性能
- 优化了[duration_unit](api/config/duration_unit.md)设为 "day" 时，[工时计算](guides/working-time.md)的性能

## 7.0.12


<span class='release_date'>2021年1月14日. Bugfix 版本</span>

### 修复

- 修复了在大型项目中[垂直拖放](guides/reordering-tasks.md)的一些小问题
- 修复了在使用[autosize](api/config/autosize.md)配置时容器尺寸不正确的问题
- [键盘导航](guides/keyboard-navigation.md)现在可以正确配合网格的横向滚动使用
- Layout 的 [HTML 视图](guides/layout-config.md#htmlzuoweineibushitu) 现在支持外部[滚动条](guides/layout-config.md#gundongtiao)
- 修复了在布局中添加了[附加网格](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html) 后，[重新排序任务](guides/reordering-tasks.md) 导致网格状态异常的问题
- 修复了在选中资源的情况下清空并重新加载[资源面板](guides/resource-management.md)后出现的脚本错误
- 新增可在 lightbox 的 [time](guides/time.md) 部分禁用当所选开始日期大于结束日期时自动修正结束日期的功能
- 修复了[Duration Formatter](guides/formatters-ext.md) 默认配置中的拼写错误
- 修复了在显示[弹出消息](guides/message-boxes.md#jibendanchuxiaoxi)时销毁 gantt（[destroyed](api/method/destructor.md)）会抛出脚本错误的问题
- 修复了在[RTL](guides/rtl-mode.md)模式下，网格和时间线横向滚动条初始位置异常的问题
- 修复了 lightbox 的异常表现:如果未在 lightbox 配置中添加[typeselect](guides/typeselect.md) 控件，任务类型选择不会被保存
- 修复了调用 [gantt.resetLayout()](api/method/resetlayout.md) 方法后，[标记](guides/markers.md)消失的问题
- 修复了在大型项目中使用 [drag_project](api/config/drag_project.md) 配置时的性能问题
- 修复了在配置中添加自定义按钮时，[只读](guides/readonly-mode.md)模式下无法显示 [QuickInfo](api/method/showquickinfo.md) 弹窗的问题

## 7.0.11


<span class='release_date'>2020年11月11日。Bugfix 修复版本</span>

### 更新

- 新增 [container_resize_timeout](api/config/container_resize_timeout.md) 配置，用于调整容器尺寸变化后 Gantt 重绘前的延迟
- 新增 [wheel_scroll_sensitivity](api/config/wheel_scroll_sensitivity.md) 配置，用于调整鼠标滚轮滚动 gantt 的速度

### 修复

- 修复了在使用不同工作日历时[自动调度](guides/auto-scheduling.md)的 bug
- 修复了 [placeholder](api/config/placeholder_task.md) 任务与[自动调度](guides/auto-scheduling.md)的冲突
- 修复了启用 [sort](api/config/sort.md) 时的多余重绘
- 修复了[内联编辑器](guides/inline-editing.md)和可滚动网格中，点击后内联编辑器失去焦点的问题
- 修复了用户点击 [Quick Info](guides/extensions-list.md#kuaisuxinxi) 弹窗时 Gantt 自动关闭弹窗的问题

## 7.0.10


<span class='release_date'>2020年9月22日。Bugfix 修复版本</span>

### 修复

- 修复了 [垂直调整器](guides/layout-config.md#morenbuju) 的异常表现（v7.0.9 中出现的回归问题）
- 防止在 Android Chrome 上任务垂直重排时出现意外页面刷新（下拉刷新）
- 修复了在移动端 Firefox 上创建链接时触发的脚本错误
- 修复了在启用 [multiselect](api/config/multiselect.md) 配置但未激活 [multiselect](guides/extensions-list.md#duorenwuxuanze) 插件时任务选择异常的问题
- 改进了 [内联编辑器](guides/inline-editing.md) 中 HTML select 控件的表现
- 修复了在关联任务使用不同[工作日历](guides/working-time.md)时，[自动调度](guides/auto-scheduling.md)的异常表现
- [gantt.plugins](api/method/plugins.md) 方法不会激活值为 `false` 的插件
- 修复了[内联编辑器](guides/inline-editing.md)与[键盘导航](guides/keyboard-navigation.md)的冲突
- 修复了双击时[内联编辑器](guides/inline-editing.md)自动关闭的问题

## 7.0.9


<span class='release_date'>2020年8月27日。Bugfix 修复版本</span>

### 修复

- 修复了在添加[自定义数据存储](api/method/createdatastore.md)后第二次[初始化](api/method/init.md) Gantt 时的脚本错误
- 修复了在使用 [FF 和 SS 链接](api/config/links.md) 及源/目标任务使用[不同工作日历](guides/working-time.md#duogongzuoshijianrili)时，[自动调度](guides/auto-scheduling.md)的异常表现
- 修复了当 [duration_unit](api/config/duration_unit.md) 设置为 "minute" 且开始时间为非工作日中间时，[工作时间计算](guides/working-time.md)异常的问题
- 修复了 iPadOS v13.6 上 Safari iPad 的触控支持
- 修复了移动设备上 [Lightbox](guides/default-edit-form.md) 模态遮罩的尺寸问题
- 修复了部分浏览器中 [lightbox 按钮](guides/custom-button.md) 的显示异常
- 修复了 [gantt.i18n](api/other/i18n.md) 模块中意大利语和葡萄牙语的本地化支持
- 修复了 [Lightbox](guides/default-edit-form.md) 的 [Parent 控件](guides/parent.md) 在任务分配到根级别时的异常表现
- 修复了在 iframe 中初始化 gantt 时的脚本错误
- 修复了在禁用 [undo](api/config/undo.md) 配置时，[redo](api/config/redo.md) 配置的异常表现

## 7.0.8


<span class='release_date'>2020年7月24日。Bugfix 修复版本</span>

### 修复

- 修复了 Android/iOS 设备上的触控支持问题
- 修复了 v7.0.6 出现的创建链接和 [gantt.isLinkAllowed](api/method/islinkallowed.md) 方法的回归问题
- 修复了在 [gantt.getGanttInstance](guides/multiple-gantts.md) 中使用 'locale' 参数时抛出的脚本错误
- 修复了同时使用[键盘导航](guides/extensions-list.md#jianpandaohang)和[Quick Info](guides/extensions-list.md#kuaisuxinxi) 扩展时，[gantt.destructor](api/method/destructor.md) 抛出的脚本错误

## 7.0.7


<span class='release_date'>2020年7月17日。Bugfix 修复版本</span>

- 修复了 [gantt.Promise](api/method/promise.md) 类型定义中的语法错误

## 7.0.6


<span class='release_date'>2020年7月16日。Bugfix 修复版本</span>

### 修复

- 修复了在[拖放](guides/dnd.md)操作时触控设备上触发的脚本错误
- 修复了在用数字值定义[链接类型](api/config/links.md)时，[自动调度](guides/auto-scheduling.md)扩展的异常表现
- 减少了[资源直方图](guides/resource-management.md#ziyuanshitumianban)的多余重绘次数
- 提升了任务[分组](guides/grouping.md)扩展的性能
- 修复了触控设备上资源时间线无法滚动的问题
- 修复了使用"隐藏空资源"按钮时，[资源控件](guides/resource-management.md)的异常表现
- 修复了 [gantt.Promise](api/method/promise.md) 类型定义中的返回类型

## 7.0.5


<span class='release_date'>2020年6月19日。Bugfix 修复版本</span>

### 更新

- 当 [duration_unit](api/config/duration_unit.md) 配置为 "hour" 时，[工作时间计算](guides/working-time.md) 性能提升
- 当 [duration_unit](api/config/duration_unit.md) 配置为 "minute" 时，[工作时间计算](guides/working-time.md) 性能提升
- [`Gantt.getGanttInstance`](guides/multiple-gantts.md#ganteshilipeizhi) 配置对象中可指定工作日历

## 7.0.4


<span class='release_date'>2020年6月4日。Bugfix 修复版本</span>

### 修复

- 移除了 autosize 模式下 gantt 大小的 10000px 限制，允许[打印](api/method/exporttopdf.md)更大的图表
- 现在[拖放](guides/dnd.md)操作在用户松开鼠标时，无论鼠标是否在 gantt 容器内均可结束
- 更新了[葡萄牙语语言包](guides/localization.md)
- 修复了 [gantt.columnIndexByDate](api/method/columnindexbydate.md) 类型定义中的返回类型
- 修复了在 [拖放](guides/dnd.md) 过程中 Gantt 实例[被销毁](api/method/destructor.md)时触发的脚本错误
- 修复了当 [duration_unit](api/config/duration_unit.md) 设置为 "minute" 且[最后一个工作时间区间](api/method/setworktime.md)在 23:00 后结束时，[end_date](api/method/calculateenddate.md)/[duration](api/method/calculateduration.md) 计算不正确的问题
- 修复了[分组扩展](guides/grouping.md)在用户修改任何任务时导致分组自动展开的问题
- 修复了 [dataProcessor.setTransactionMode](guides/server-side.md#jishushuoming) 的第二个参数在第一个参数为对象时被忽略的问题
- 修复了 [Gantt 重绘](api/method/render.md) 后，激活的[内联编辑器](guides/inline-editing.md)消失的问题
- 修复了 [static_background](api/config/static_background.md) 扩展导致点击空白单元格被识别为点击任务元素的问题
- Gantt 现在会在[拆分任务](guides/split-tasks.md)拖放过程中动态重绘任务之间的链接
- 修复了在 [node.js 包](guides/using-gantt-on-server.md)中，[gantt.addTask](api/method/addtask.md) 抛出的脚本错误
- 修复了在 [node.js 包](guides/using-gantt-on-server.md)中，[gantt.destructor](api/method/destructor.md) 抛出的脚本错误

## 7.0.3


<span class='release_date'>2020年5月14日。Bugfix 修复版本</span>

### 修复

- 修复了 [setWorkTime 方法](api/method/setworktime.md) 的回归问题，在为特定日期设置工作时间时导致脚本错误
- 修复了 Gantt 在 [SalesForce Lightning Web Component](https://github.com/DHTMLX/salesforce-gantt-demo) 中使用时，[键盘导航](guides/keyboard-navigation.md)扩展的异常表现

## 7.0.2


<span class='release_date'>2020年4月30日。Bugfix 修复版本</span>

### 修复

- 修复了当 [gantt.config.csp](api/config/csp.md) 设置为 true 时，[日期格式化器](api/other/date.md) 的异常表现
- 修复了在创建[多个 Gantt 实例](guides/multiple-gantts.md)时，[click_drag](guides/extensions-list.md#gaojituofang) 和 [drag_timeline](guides/extensions-list.md#tuodongshijianzhou) 扩展的回归问题
- 修复了从 [dataProcessor 路由函数](guides/server-side.md#zidingyiluyou)返回错误状态后，任务行元素的 css 类不正确的问题
- 修复了[内联编辑器](guides/inline-editing.md)在 Shadow DOM 中的异常表现

## 7.0.1


<span class='release_date'>2020年4月16日。Bugfix 修复版本</span>

### 修复

- 极大提升了[任务工时计算（以工作分钟为单位）](guides/working-time.md)的性能
- 修复了 [Tooltip](guides/tooltips.md) 和 [Undo](guides/undo-redo.md) 扩展的回归问题，该问题导致在创建多个 Gantt 实例时工作不正确
- 修复了[网格列重新排序](api/config/reorder_grid_columns.md)的问题，该问题在拖拽过程中鼠标指针移动到网格边缘时会导致时间轴滚动
- 修复了[将列拖拽到网格右侧边界后列位置不正确](api/config/reorder_grid_columns.md)的问题
- [dataProcessor custom router](guides/server-side.md#zidingyiluyou) 现在能正确处理被拒绝的 Promise
- 修复了 [smart rendering](guides/performance.md#zhinengxuanran) 的回归问题，该问题导致部分链接不可见
- [Split tasks](guides/split-tasks.md) 现在不仅显示一级子任务，还显示所有嵌套子任务
- 修复了 [split tasks](guides/split-tasks.md) 与 smart rendering 联用时，在分割任务类型为 'task' 时出现的问题
- 修复了 [split tasks](guides/split-tasks.md) 的问题，该问题导致 gantt 未能计算嵌套在分割任务中的 'project' 任务的工期
- 修复了在 [RTL 模式](guides/rtl-mode.md) 下打开[内联编辑器](guides/inline-editing.md)后占位符位置不正确的问题

## <b>7.0</b>


<span class='release_date'>2020年4月7日. 重大更新</span>

[查看博客中的版本评述](https://dhtmlx.com/blog/dhtmlx-gantt-7-0-node-js-server-module-merging-multiple-calendars-reordering-grid-columns-drag-n-drop-new-customization-options/)
### 重大变更

本次更新带来了多个 API 方法的变动。请查阅 [迁移指南](migration.md#63---70) 以跟进最新版本。

### 新功能

- 支持在 [Node.js 中创建 Gantt 实例](guides/using-gantt-on-server.md)
- 增加了 [grid_elastic_columns](api/config/grid_elastic_columns.md) 配置项，用于在整个网格调整大小时调整列宽
- [支持通过拖拽重新排序网格列](api/config/reorder_grid_columns.md)
- [QuickInfo](guides/quick-info.md) 扩展现在支持通过 [gantt.ext.quickInfo 对象的方法](guides/quickinfo-ext.md) 手动控制弹窗
- 支持在[网格列中长文本省略显示](guides/styling-guide.md#customizationgridcolumns)
- 新增 [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) 配置和 [mergeCalendars](api/method/mergecalendars.md) 方法，[支持自动和手动合并多个日历](guides/working-time.md#mergingcalendars)
- 新增 [getResourceCalendar](api/method/getresourcecalendar.md) 方法
- 支持[以分钟为单位设置工作时间](guides/working-time.md#quanjushezhi)

### 更新

- 本地化文件已从包中移除，新增了适用于 Gantt 图本地化的 [新 API](api/other/i18n.md)
- 所有扩展现在需通过 [plugins](api/method/plugins.md) 方法激活
- `Gantt.getGanttInstance` 现在在创建新 Gantt 实例时[可接收配置对象](guides/multiple-gantts.md#ganteshilipeizhi)
- CSP 扩展已从包中移除，[CSP 模式默认启用](api/config/csp.md)
- [attachEvent](api/method/attachevent.md) 方法新增第三个参数 settings 对象
- [setWorkTime](api/method/setworktime.md) 方法的工作时间设置格式简化
- 默认工作时间由 8:00-17:00 改为 8:00-12:00, 13:00-17:00
- [gantt.config.resource_calendars](api/config/resource_calendars.md) 配置格式简化
- 文档中新增 [비디오 가이드](guides/video-guides.md)

### 修复

- 修复了隐藏再显示列后列宽发生变化的 bug
- 修复了通过 `multiselect` 配置禁用多选扩展后无法选择任何任务的 bug
- 修复了 `gantt.sort` 对开始日期相同的任务排序不正确的问题
- 修复了在 Web Component 中初始化 Gantt 时，链接拖拽的问题

## 6.3.7


<span class='release_date'>2020年2月12日. Bugfix 版本</span>

### 修复

- 显著提升了图表和资源面板的 smart rendering 性能

## 6.3.6


<span class='release_date'>2020年2月10日. Bugfix 版本</span>

### 修复

- 修复了 [gantt.resetLayout](api/method/resetlayout.md) 的回归问题，该问题导致脚本报错
- 修复了 [QuickInfo 弹窗](https://docs.dhtmlx.com/gantt/desktop__extensions_list.html#quickinfo ) 在某些情况下显示在 [资源面板](https://docs.dhtmlx.com/gantt/desktop__resource_management.html#resourceviewpanel) 后面的问题
- 修复了 [gantt.getShortcutHandler](api/method/getshortcuthandler.md) 方法抛出的脚本错误
- 修复了 [tooltip.show(x, y)](https://docs.dhtmlx.com/gantt/desktop__tooltips_ext.html) 方法抛出的脚本错误
- [gantt.getTaskNode](api/method/gettasknode.md) 现在能为 [split tasks](https://docs.dhtmlx.com/gantt/desktop__split_tasks.html) 返回正确的 HTML 元素
- 修复了在某些布局配置下指定 [visibility groups](https://docs.dhtmlx.com/gantt/desktop__layout_config.html#visibilitygroups) 时，[水平滚动条](https://docs.dhtmlx.com/gantt/desktop__specifying_columns.html#horizontalscrollbar) 不显示的问题

## 6.3.5


<span class='release_date'>2020年1月31日. Bugfix 版本</span>

### 修复

- 修复了任务[分组](guides/grouping.md)后拖拽任意任务会导致垂直滚动位置重置的问题
- 修复了当 [drag_timeline](api/config/drag_timeline.md) 配置为 `null` 时发生的脚本错误
- 修复了启用 [static_background](api/config/static_background.md) 和 [static_background_cells](api/config/static_background_cells.md) 且禁用 [smart_rendering](api/config/smart_rendering.md) 时，高亮单元格位置不正确的问题
- 修复了 [onAfterBranchLoading](api/event/onafterbranchloading.md) 事件未被调用的问题
- 修复了当 [task_height](api/config/task_height.md) 小于 [row_height](api/config/row_height.md) 时，[smart rendering](guides/performance.md#zhinengxuanran) 工作不正确的问题

### 更新

- 新增了[用于在更改配置后重建 Gantt 布局的公共方法](api/method/resetlayout.md)

## 6.3.4


<span class='release_date'>2019年12月27日. Bugfix 版本</span>

### 修复

- 修复了关闭 [smart rendering](guides/performance.md#zhinengxuanran) 后 [资源负载图](guides/resource-management.md#ziyuanshitumianban) 崩溃的问题
- 修复了自定义任务属性名为 "unit" 时，Gantt 会将其视为工期单位并在任务拖拽后错误地倍增工期的问题
- 修复了启用 [autosize](api/config/autosize.md) 配置时，[Tooltip](guides/tooltips.md) 位置不正确的问题
- 修复了同时启用 [scrollable](guides/specifying-columns.md#shuipinggundongtiao) 属性和 [autofit](api/config/autofit.md) 配置时，网格单元格对齐行为异常的问题
- 现在已阻止在时间轴中的任务与网格中的 [placeholder](api/config/placeholder_task.md) 创建链接
- 修复了 [自动调度扩展](guides/auto-scheduling.md) 的 bug，该 bug 导致当任务存在[约束类型 (SNET/FNET/SNLT/FNLT)](guides/auto-scheduling.md#renwudeshijianyueshu) 且未指定日期或日期无效时，Gantt 卡死

## 6.3.3


<span class='release_date'>2019年12月18日. Bugfix 版本</span>

### 修复

- 修复了[网格调整大小](guides/specifying-columns.md#diaozhengliekuan)行为异常导致时间轴不可用的问题
- [gantt.parse](api/method/parse.md) 现在能在父任务在子任务之后加载时正确更新项目树
- 修复了与 SalesForce Lightning Aura 组件框架的兼容性（评估版）
- 修复了 SalesForce 环境下 [Tooltip](guides/tooltips.md) 位置不正确的问题
- 修复了当 gantt 容器设置垂直 margin 时 [Tooltip](guides/tooltips.md) 位置不正确的问题
- 为 gantt 内部元素添加了缺失的 [WAI-ARIA](guides/accessibility.md#waiariashuxing) 属性
- 修复了 [min_duration](api/config/min_duration.md) 配置项工作不正确的问题
- 修复了 [link formatters](guides/formatters-ext.md#lianjiegeshihuaqi) 在自定义 [gantt 实例](guides/multiple-gantts.md) 下工作不正确的问题

## 6.3.2


<span class='release_date'>2019年12月10日. Bugfix 版本</span>

### 修复

- 修复了在启用 [click-drag 功能](guides/advanced-dnd.md) 时调用 [gantt.destructor](api/method/destructor.md) 发生的脚本错误
- [gantt.parse](api/method/parse.md) 不再修改传入的参数数据对象，而是进行深拷贝

### 更新

- TypeScript 类型定义已更新
- 新增了 [onBeforeBranchLoading](api/event/onbeforebranchloading.md) 和 [onAfterBranchLoading](api/event/onafterbranchloading.md) 公共事件，方便在[动态加载](guides/dynamic-loading.md)请求时修改 url 或动态参数
- 新增了在初始化后更改 [dataProcessor](guides/server-side.md) url 的公共方法

## 6.3.1


<span class='release_date'>2019年11月29日. Bugfix 版本</span>

### 修复

- 修复了 [smart rendering](api/method/addtasklayer.md#zidingyitucengdezhinengxuanran) 回归问题，该问题导致部分链接未被渲染
- 修复了在启用[只读模式](guides/readonly-mode.md)时，仍可通过[键盘导航](guides/keyboard-navigation.md)修改和创建新任务的 bug
- 修复了 [全屏扩展](guides/fullscreen-mode.md) 的显示问题，该问题导致全屏模式下部分页面元素覆盖 gantt
- 修复了 [drag-timeline 扩展](guides/extensions-list.md#tuodongshijianzhou) 会重置 [readonly config](guides/readonly-mode.md) 值的 bug

## 6.3


<span class='release_date'>2019年11月14日. 小版本更新</span>

[查看博客中的版本评述](https://dhtmlx.com/blog/dhtmlx-gantt-chart-6-3-decimal-durations-link-formatting-drag-n-drop-multiple-tasks-even-smarter-rendering/)
### 重大变更

本次更新带来了多个 API 方法的变动。请查阅 [迁移指南](migration.md#62---63) 以跟进最新版本。

### 新功能

- [支持以小数单位指定任务工期](guides/working-time.md#shijinzhigeshiderenwugongqi)
- [支持通过鼠标点击并拖动滚动时间轴](guides/extensions-list.md#tuodongshijianzhou)
- [支持水平拖拽多个任务](guides/multiselection.md#duorenwuxuanzeyutuozhuai)


### 更新

- 支持在[时间刻度](guides/configuring-time-scale.md#fanwei)的显式 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 范围之外[显示任务](api/config/show_tasks_outside_timescale.md)
- 新增 [task_end_date](api/template/task_end_date.md) 模板，用于格式化任务的结束日期
- 支持将自定义操作添加到 [撤销](guides/undo-redo.md#chexiaochongzuodaimazhongjinxingdegenggai) 堆栈中
- 支持将自定义图层连接到[智能渲染](api/method/addtasklayer.md#zidingyitucengdezhinengxuanran)
- **前置任务**的[内联编辑器](guides/inline-editing.md)现在支持链接的格式化值
- 移除了日期[内联编辑器](migration.md#inline_editors)输入值的默认限制
- 支持为[全屏扩展](guides/fullscreen-mode.md)指定根节点
- 支持通过 `shiftKey`+`mousewheel` 更改或禁用[水平滚动](api/config/horizontal_scroll_key.md)
- Roboto 字体已从 [Material 皮肤](guides/skins.md#materialpifu)中移除，需手动引入

### 修复

- 修复关闭[智能渲染](guides/performance.md#zhinengxuanran)时[资源直方图](guides/resource-management.md#ziyuanshitumianban)崩溃的问题
- 修复与 r.js 压缩器的兼容性问题
- 修复[键盘导航](guides/keyboard-navigation.md)与[内联编辑器](guides/inline-editing.md)之间的各种冲突
- 修复从[自定义路由](guides/server-side.md#zidingyiluyou)顺序修改任务和链接时 [DataProcessor](guides/server-side.md#zidingyiluyou) 状态不正确的问题
- 现在在调用[自定义路由](guides/server-side.md#zidingyiluyou)的 **delete** 时也会传递正确的任务/链接数据对象

## 6.2.7


<span class='release_date'>2019年10月11日。Bugfix 版本</span>

### 修复

- 修复在[复杂布局](guides/resource-management.md#ziyuanshitumianban)中[带有水平滚动的表格](guides/specifying-columns.md#shuipinggundongtiao)垂直调整大小的问题
- 修复当[刻度步长](guides/configuring-time-scale.md#shijianbuchang)大于 1 时，[资源直方图](guides/resource-management.md#ziyuanshitumianban)工作异常的问题
- 修复调用 [gantt.parse](api/method/parse.md) 后，收起分支的 bug（源自 [v6.2.4](#624)）

## 6.2.6


<span class='release_date'>2019年9月19日。Bugfix 版本</span>

### 修复

- 修复 [v6.2 智能渲染](#62) 的回归问题，在某些情况下，重新初始化([init](api/method/init.md)) Gantt 后任务垂直位置不正确
- 修复 [QuickInfo 弹窗](guides/extensions-list.md#kuaisuxinxi) 未显示在[未排期任务](guides/unscheduled-tasks.md)上的问题
- 修复 Gantt Ultimate 版本下扩展文件的异常

## 6.2.5


<span class='release_date'>2019年9月12日。Bugfix 版本</span>

### 修复

- 修复在 [拖动带有子任务的项目](api/config/drag_project.md)后，[onBeforeTaskChanged](api/event/onbeforetaskchanged.md) 事件处理器中子任务初始值不正确的问题
- 修复启用[自动任务类型](api/config/auto_types.md)时，[分组](guides/grouping.md)扩展异常
- 修复在 [onTaskLoading](api/event/ontaskloading.md) 事件处理器返回 *false* 后脚本报错的问题
- 为 [gantt.load](api/method/load.md) 和 [gantt.parse](api/method/parse.md) 抛出的异常添加更清晰的错误信息

## 6.2.4


<span class='release_date'>2019年9月5日。Bugfix 版本</span>

### 修复

- 修复使用 [parse](api/method/parse.md) 方法更新数据后，任务分支被收起的问题
- 修复[资源视图](guides/resource-management.md#ziyuanshitumianban)中[智能渲染](guides/performance.md#zhinengxuanran)异常的问题
- 修复导致 [缩放模块](guides/zooming.md) 在每次 [重新初始化](api/method/init.md) Gantt 时重复绑定 DOM 事件处理器的问题

## 6.2.3


<span class='release_date'>2019年8月29日。Bugfix 版本</span>

### 修复

- 修复在 IE11 和 MS Edge 浏览器中 [约束控制](guides/auto-scheduling.md#renwudeshijianyueshu)异常的问题
- 修复 [全屏模式](guides/fullscreen-mode.md) 下 Gantt 元素尺寸异常的问题
- 修复在 [全屏模式](guides/fullscreen-mode.md) 下 [onExpand](api/event/onexpand.md) 和 [onCollapse](api/event/oncollapse.md) 事件未被调用的问题
- 当鼠标指针靠近屏幕左右边缘时，修正 [Tooltip](guides/tooltips.md) 的位置
- 打开 [Lightbox](guides/default-edit-form.md) 时，[Tooltip](guides/tooltips.md) 现在会被隐藏
- 滚动图表时，[Tooltip](guides/tooltips.md) 现在会被隐藏
- 修复 [Tooltip](guides/tooltips.md) 在鼠标指针在两个匹配同一选择器的元素间移动时未更新的问题
- 修复 [getTaskBy](api/method/gettaskby.md) 当第二参数为 `null` 或 `0` 时异常的问题
- 修复 [WBS](api/method/getwbscode.md) 列在[Gantt 排序](guides/sorting.md)后未更新的问题
- 修复 [Material 皮肤](guides/skins.md#materialpifu)下 [static_background](api/config/static_background.md) 显示异常的问题

## 6.2.2


<span class='release_date'>2019年8月13日。Bugfix 版本</span>

### 更新

- 新增 [gantt.license](api/other/license.md) 属性
- 新增 [onLinkCreated](api/event/onlinkcreated.md) API 事件，用于新建链接，类似于新建任务的 [onTaskCreated](api/event/ontaskcreated.md) 功能
- 当使用 [onBeforeTaskMove](api/event/onbeforetaskmove.md) 阻止操作时，[moveTask](api/method/movetask.md) 返回 `false`

### 修复

- 修复在用户创建[新链接](guides/dependencies.md)时，调用 [render](api/method/render.md) 方法导致链接线消失的问题
- 修复[标记](guides/markers.md)开始日期早于[时间刻度](guides/configuring-time-scale.md#fanwei)最小日期时未显示的问题
- 修复 Gantt 初始化时 [gantt.config.show_chart = false](api/config/show_chart.md) 配置下[标记](guides/markers.md)未显示的问题
- 修复用户更改[任务类型](guides/typeselect.md)时，[lightbox](guides/default-edit-form.md) 的模态遮罩层消失的问题
- 修复[键盘导航预设](https://docs.dhtmlx.com/gantt/desktop__keyboard_navigation.html#comment-4488512513)中的问题，即即使通过 [onBeforeTaskMove](api/event/onbeforetaskmove.md) 取消操作后，**Shift+左箭头**快捷键仍然触发 [onAfterTaskUpdate](api/event/onaftertaskupdate.md)

## 6.2.1


<span class='release_date'>2019年8月7日。Bugfix 版本</span>

### 修复

- 修复 [点击拖动功能](guides/advanced-dnd.md) 在 IE11 下的兼容性问题
- 修复在资源视图下，用户尝试向空图表添加新任务时报错的问题
- 修复 [分组](guides/grouping.md) 扩展导致新任务分配错误分组值的问题
- 修复 [键盘导航](guides/keyboard-navigation.md) 扩展在 Alt+方向键快捷键下抛出脚本错误的问题
- [资源管理](guides/resource-management.md) 中的筛选功能现在忽略大小写
- 任务拖动和拖放现在可在任意 gantt 元素的 mouseup 时完成
- 修复保存[未排期任务](guides/unscheduled-tasks.md)后脚本报错的问题

## 6.2


<span class='release_date'>2019年7月16日。小版本更新</span>

[在博客中查看本次发布](https://dhtmlx.com/blog/dhtmlxgantt-6-2-minor-update-boosting-gantt-chart-performance-zooming-mouse-wheel-much/)

### 重大变更

本次更新带来了多个 API 方法的变更。请查阅 [迁移](migration.md#61---62) 文章以跟进最新版本。

### 新功能

- 支持[拖放创建和选择任务](guides/advanced-dnd.md)
- 支持鼠标滚轮[平滑缩放](guides/zooming.md)
- 支持[展开/收起拆分任务](guides/split-tasks.md#zhankaiyushouqichaifenrenwu)（PRO）

### 更新

- 图表和资源面板性能大幅提升
- 通过[内联编辑器](guides/inline-editing.md)更改任务的开始/结束日期会相应修改任务工期
- [设置时间线刻度](guides/configuring-time-scale.md)流程简化
- 新的[缩放](guides/zoom.md)和[刻度](api/config/scales.md) API

### 修复

- 渲染后多任务高亮会重置
- 从数据处理器处理器销毁 Gantt 时脚本报错

## 6.1.7


<span class='release_date'>2019年6月27日。Bugfix 版本</span>

### 修复

- 修复 [getClosestWorkTime](api/method/getclosestworktime.md) 行为异常
- 修复 [切换时间线可见性](api/config/show_chart.md) 后 [autoscroll](api/config/autoscroll.md) 异常的问题
- 修复 [多选扩展](guides/multiselection.md) 导致选中任务在重绘后高亮丢失的问题
- 修复[垂直拖放](guides/reordering-tasks.md)后，启用[智能渲染](guides/performance.md#zhinengxuanran)和[键盘导航](guides/keyboard-navigation.md)扩展时脚本错误
- 修复当部分表格列[隐藏](guides/specifying-columns.md#liekejianxing)时，用户尝试用 `Tab` 键切换[内联编辑器](guides/inline-editing.md)导致的异常
- 修复阻止[lightbox](guides/edit-form.md)和[内联编辑器](guides/inline-editing.md)覆盖[约束日期](guides/auto-scheduling.md#renwudeshijianyueshu)时的异常行为

## 6.1.6


<span class='release_date'>2019年5月14日。Bugfix 版本</span>

### 修复

- 修复在第二次调用 [init](api/method/init.md) 后，[QuickInfo 弹窗](guides/extensions-list.md#kuaisuxinxi)的[点击处理器](api/config/quickinfo_buttons.md)无效的问题
- 修复设置 [show_chart](api/config/show_chart.md) 为 false 时，[QuickInfo 弹窗](guides/extensions-list.md#kuaisuxinxi)未显示的问题
- 修复[垂直拖放](guides/reordering-tasks.md)后，[dataProcessor 路由](guides/server-side.md#zidingyiluyou)的 `action` 参数不正确的问题
- 修复 [createTask](api/method/createtask.md) 忽略 `index` 参数的问题

## 6.1.5


<span class='release_date'>2019年4月25日。Bugfix 版本</span>

### 修复

- 修复在 [show_chart](api/config/show_chart.md) 配置禁用后，第二次调用 [init](api/method/init.md) 脚本报错的问题
- 修复 [marker 模式](guides/reordering-tasks.md#tishengdashujujixiadexingneng)下[垂直拖放](guides/reordering-tasks.md)占位符位置不正确的问题

## 6.1.4


<span class='release_date'>2019年4月18日。Bugfix 版本</span>

### 修复

- 修复在 IE 浏览器下 [重新初始化](api/method/init.md) gantt 时脚本报错的问题
- 修复调用 [gantt.destructor](api/method/destructor.md) 时，[Tooltip 扩展](guides/tooltips.md)行为异常
- 修复在 [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md) 模式下，表格包含[隐藏列](guides/specifying-columns.md#liekejianxing)时，[内联编辑器](guides/inline-editing.md)异常
- 修复 [Undo](guides/undo-redo.md) 扩展在重做新建任务时未恢复所有属性的问题
- 修复 GPL 版本在第二次调用 [gantt.init](api/method/init.md) 时脚本报错的问题

## 6.1.3


<span class='release_date'>2019年4月15日。Bugfix 版本</span>


### 修复

- [gantt.createTask](api/method/createtask.md)/[gantt.addTask](api/method/addtask.md) 现在应使用 [root_id](api/config/root_id.md) 配置值，而不是硬编码的 0 作为 id
- 针对 `minute` 和 `hour` [duration units](api/config/duration_unit.md) 的 [工作时间计算](guides/working-time.md) 性能提升
- 在 [智能渲染](guides/performance.md#zhinengxuanran) 模式下渲染大量任务列表时小幅提升性能
- 确保当用户在 [内联编辑器](guides/inline-editing.md) 内选择文本时，不会启动 [垂直拖放](guides/reordering-tasks.md)
- 修复在 IE 浏览器中 [甘特图重新初始化](api/method/init.md) 时的脚本错误
- 修复在图表中删除最后一个任务后，`cell` 模式下 [键盘导航](guides/keyboard-navigation.md) 引起的脚本错误
- 确保 Gantt 在销毁或重新初始化后清理自动生成的 [静态背景](api/config/static_background.md) 样式元素
- 当启用 [只读模式](guides/readonly-mode.md) 时，确保 [内联编辑器](guides/inline-editing.md) 不处于激活状态
- 修复当启用 `sort` 配置时，在 [键盘导航](guides/keyboard-navigation.md) 的 `cell` 模式下网格表头单元格选择不正确的问题
- 修复 [auto_types](api/config/auto_types.md) 配置的回归，导致添加新任务时无法自动更改类型
- 修复当 [onTaskDblClick](api/event/ontaskdblclick.md) 返回 `false` 时，会同时阻止 [onLinkDblClick](api/event/onlinkdblclick.md) 的问题
- 修复从 JSON 数据解析 [约束日期](guides/auto-scheduling.md#renwudeshijianyueshu) 时的脚本错误
- 修复在启用 [skip_off_time](api/config/skip_off_time.md) 配置时，任务和 [标记](guides/markers.md) 位置不正确的问题
- 修复通过 [拖放](guides/reordering-tasks.md) 重新排序任务后 [标记](guides/markers.md) 高度不正确的问题
- 新任务会获得 `progress` 属性的初始值
- 修复在 [marker](guides/reordering-tasks.md#tishengdashujujixiadexingneng) 模式下垂直拖放后任务位置不正确的问题
- 修复当启用 [资源面板](guides/resource-management.md#ziyuanshitumianban) 时，调用 [gantt.destructor](api/method/destructor.md) 引起的脚本错误
- 修复在 [typeselect](guides/typeselect.md) 区块中显示空行的问题
- 修复在 [id 变更](api/method/changetaskid.md) 后任务无法被识别为 [关键路径](guides/critical-path.md) 一部分的错误

## 6.1.2


<span class='release_date'>2019年3月26日。Bug 修复版本</span>

### 更新

- [键盘导航](guides/keyboard-navigation.md):新增获取活动单元格的方法

### 修复

- 修复新建数据存储覆盖原有数据存储后 [资源面板](guides/resource-management.md#ziyuanshitumianban) 工作不正确的问题
- 修复 [dataProcessor](guides/server-side.md) POST 模式下查询参数值不正确的问题
- 修复未指定方向调用 [gantt.getClosestWorkTime](api/method/getclosestworktime.md) 时结果不正确的问题
- 修复英文语言包无法覆盖之前添加的语言包的问题
- 修复在网格中使用 [gantt.undo](api/config/undo.md) 和缩进操作时的脚本错误
- 修复 SalesForce 兼容性:SF 中新的 resize 监听器失效，现已添加回退方案

## 6.1.1


<span class='release_date'>2019年3月5日。Bug 修复版本</span>

### 修复

- 为 [资源 lightbox 控件](guides/resources.md) 添加缺失的本地化选项
- 修复 [gantt.destructor](api/method/destructor.md) 与 dataProcessor 一起使用时的脚本错误
- 修复 [gantt.destructor](api/method/destructor.md) 与 [资源面板](guides/resource-management.md#ziyuanshitumianban) 一起使用时的脚本错误
- 修复 [tooltip 扩展](guides/tooltips.md) 的文件大小
- 修复在链接元素上双击时意外调用 [onTaskDblClick](api/event/ontaskdblclick.md) 事件的问题
- 修复当 [lightbox](api/config/lightbox.md) 打开时调用 [gantt.init](api/method/init.md) 导致 [lightbox](api/config/lightbox.md) 遮罩卡住的问题
- 修复在 [全屏模式](guides/fullscreen-mode.md) 下 [lightbox](api/config/lightbox.md) 与 [tooltip 扩展](guides/tooltips.md) 的相关问题

## 6.1


<span class='release_date'>2019年2月21日。小版本更新</span>

[博客发布回顾](https://dhtmlx.com/blog/dhtmlxgantt-6-1-time-constraints-backward-scheduling-s-curve/)

### 新功能

- [为甘特图添加覆盖层的能力](guides/baselines.md#weitubiaotianjiaewaifugaiceng)（PRO）
- [任务时间约束](guides/auto-scheduling.md#renwudeshijianyueshu)（PRO）
- [反向排程](guides/auto-scheduling.md#backwardscheduling)（PRO）
- TypeScript 类型定义已加入包内

### 更新

- 可为 dhtmlxGantt [所有元素创建提示](guides/tooltips.md#weibutongyuansutianjiagongjutishi)
- [dataProcessor 路由选项](guides/server-side.md#zidingyiluyou)
- [项目级工作日历](guides/working-time.md#weixiangmufenpeirili)（PRO）
- 支持以 ES6 模块方式 [导入 dhtmlxGantt](guides/initializing-gantt-chart.md#moduleimport)

## 6.0.7


<span class='release_date'>2019年1月16日。Bug 修复版本</span>

### 修复

- 减少了 [资源图表](guides/resource-management.md#ziyuanshitumianban) 多余的重绘次数
- 修复删除任务后 [资源图表](guides/resource-management.md#ziyuanshitumianban) 的脚本错误
- 修复退出全屏模式时 [全屏扩展](guides/fullscreen-mode.md) 的脚本错误
- 修复当在页面上多个甘特图之间拖动链接时，链接拖放状态不正确。甘特图间创建链接不被支持
- 修复使用 [键盘导航](guides/keyboard-navigation.md) 删除 [多选任务](guides/multiselection.md) 后的脚本错误
- 修复 [内联编辑器](guides/inline-editing.md) 的默认映射。内联编辑器不应阻止任务单元格的快捷键

## 6.0.4


<span class='release_date'>2018年12月27日。Bug 修复版本</span>

### 修复

- 修复在 `order_branch='marker'` 模式下任务垂直拖放后位置不正确的问题
- 修复删除包含已选任务的子树后脚本错误
- 修复包含资源过滤器的 lightbox 保存/取消时的脚本错误

## 6.0.2


<span class='release_date'>2018年12月6日。Bug 修复版本</span>

### 修复

- 修复在将 Gantt 导入 Vue.js 项目时出现 `ReferenceError: getResourceAssignments is not defined`
- 修复通过资源表单分配资源后删除任务时的脚本错误
- 修复第二次调用 `gantt.init` 后资源图表的脚本错误
- 修复在使用标记扩展时切换时间线可见性的脚本错误
- 修复当任务树包含循环引用时，`gantt.parse` 导致页面卡死的问题，现在会抛出脚本错误

## <b>6.0</b>


<span class='release_date'>2018年11月5日。重大版本更新</span>

[博客发布回顾](https://dhtmlx.com/blog/dhtmlxgantt-6-0-major-update-advanced-resource-management/)

### 功能

- [为任务分配多个资源](guides/resource-management.md#ziyuanfenpei)（PRO 版本）
- [按多个资源分组任务](guides/resource-management.md#pinghengziyuanfuzai)（PRO 版本）
- [资源直方图](guides/resource-management.md#ziyuanshitumianban)，用于展示资源负载图之外的资源分布（PRO 版本）
- 在 [关键路径计算](guides/critical-path.md) 时 [获取任务的自由/总缓冲时间](guides/critical-path.md#huoquziyoufudonghezongfudong)（PRO 版本）
- [从 Excel 导入项目](guides/excel.md#congexceldaoru)
- ["REST-JSON" DataProcessor 模式](guides/server-side.md#restjson)，可在任意服务端平台处理复杂记录
- 当容器大小变化时自动调整大小

### 配置

- lightbox 中的 [资源控件](guides/resources.md)，用于为任务分配资源（PRO 版本）
- "branch" 模式下 [任务重排序性能提升](guides/reordering-tasks.md#tishengdashujujixiadexingneng)
- [auto_types](api/config/auto_types.md) 配置的性能更新（PRO 版本）

### API

- [order_branch](api/config/order_branch.md) 配置的 "marker" 模式，加快分支内任务重排序
- [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) 事件，可与 [order_branch](api/config/order_branch.md) 配置的 "marker" 模式配合使用
- 用于处理缓冲时间的 [getTotalSlack](api/method/gettotalslack.md) / [getFreeSlack](api/method/getfreeslack.md) 方法，替代 getSlack() 方法（PRO）
- [importFromExcel](api/method/importfromexcel.md) 方法
- [groupBy](api/method/groupby.md) 方法中的 *delimiter* 选项，用于分组资源

## 5.2


<span class='release_date'>2018年7月6日。小版本更新</span>

[博客发布回顾](https://dhtmlx.com/blog/dhtmlxgantt-5-2/)

### 功能

- [网格内联编辑](guides/inline-editing.md)
- [任务拆分](guides/split-tasks.md)（PRO 版本）
- 更新了 [键盘导航](guides/keyboard-navigation.md#yiyoukuaijiejian)
- [自动排程](guides/auto-scheduling.md) 性能提升

### 配置

- [自动设置任务类型](api/config/auto_types.md)（PRO 版本）
- [使用占位行](api/config/placeholder_task.md) 创建新任务
- lightbox 的 [复选框](guides/checkbox.md) 和 [单选按钮](guides/radio.md) 控件
- 更新了 [内容安全策略](guides/content-security-policy.md) 扩展

### API

- [撤销](guides/undo-redo.md) 和 [自动排程](guides/auto-scheduling.md) 扩展的新方法和事件

## 5.1


<span class='release_date'>2018年2月27日。小版本更新</span>

[博客发布回顾](https://dhtmlx.com/blog/dhtmlxgantt-5-1-resource-management-rtl-mode-and-more/)

### 功能

- [资源管理](guides/resource-management.md)（PRO 版本）
- [RTL 模式](guides/rtl-mode.md)
- [网格横向滚动](guides/specifying-columns.md#shuipinggundongtiao) 及 [其他布局改进](guides/layout-config.md)
- [Gantt 与 DataProcessor 实例的析构函数](guides/multiple-gantts.md#gantthedataprocessorshilidexigouhanshu)

### 配置

- [可为网格列设置最小/最大宽度](guides/specifying-columns.md#kuandu)
- [可拖动项目及其子任务](guides/dnd.md#tuodongxiangmushitongshituodongqizirenwu)（PRO 版本）
- [导出方法的扩展参数](guides/export-common.md)

### API

- [多任务选择](guides/multiselection.md) 扩展的 [API 事件](guides/multiselection.md#apishijian) 已更新

### 修复

- 修复智能渲染模式下的键盘导航相关问题

## <b>5.0</b>


<span class='release_date'>2017年12月12日。重大版本更新</span>

[博客发布回顾](https://dhtmlx.com/blog/large-scale-update-dhtmlxgantt-version-5-0/)

### 功能

- [灵活的甘特图布局](guides/layout-config.md)
- [与 REST API 的服务端集成](guides/server-side.md)。另请参阅 [各服务端平台教程](integrations/howtostart-guides.md)

### 样式

- 新的 ["Material" 皮肤](guides/skins.md#materialpifu)

## 4.2


<span class='release_date'>2017年8月17日。小版本更新</span>

[博客发布回顾](https://dhtmlx.com/blog/dhtmlxgantt-4-2-manage-working-days-hours-individual-tasks/)

### 功能

- [任务和资源级别的工作时间日历](guides/working-time.md#duogongzuoshijianrili)
- [WBS 代码（大纲编号）计算](guides/specifying-columns.md#wbsbianma)
- [拖放操作的自动滚动](guides/dnd.md#tuodongrenwushizidonggundong)
- [新增波斯语（法尔西语）本地化](guides/localization.md#yudingyiyuyanhuanjing)

### 配置

- 新增用于键盘导航快捷键的 [getter 函数](api/method/getshortcuthandler.md)
- 新增用于级联删除嵌套任务和链接的 [配置项](api/config/cascade_delete.md)
- 新增 [按住 Shift 并滚动鼠标滚轮可水平滚动时间轴](guides/keyboard-navigation.md#neizhishuipingshijianzhougundongkuaijiejian) 的功能
- 更新德语和意大利语本地化
- Gantt 皮肤中的 GIF 图片已替换为 PNG 格式

## 4.1


<span class='release_date'>2016年9月1日. 小型更新</span>

[查看博客中的发布评述](https://dhtmlx.com/blog/dhtmlxgantt-4-1-full-accessibility-support/)

### 功能

- [键盘导航](guides/keyboard-navigation.md)
- [WAI-ARIA 支持](guides/accessibility.md#waiariashuxing)
- [高对比度主题](guides/accessibility.md#highcontrastthemes)
- 更新了 [自动调度](guides/auto-scheduling.md) 和 [关键路径](guides/critical-path.md) 计算（PRO 版本）

### 配置

- 针对 [工作时间计算](guides/working-time.md) 和 [时间刻度渲染](guides/performance.md) 的性能提升
- 新增用于取消工作时间设置的 [公共方法](api/method/unsetworktime.md)
- 新增 [QuickInfo 弹窗的 API 事件](api/overview/events-overview.md)
- 新增 [克罗地亚语本地化](guides/localization.md#yudingyiyuyanhuanjing)
- 更新 [土耳其语本地化](guides/localization.md#yudingyiyuyanhuanjing)

## <b>4.0</b>


<span class='release_date'>2015年12月1日. 重大更新</span>

### 功能

- 针对大型数据集的 [智能渲染](guides/performance.md#zhinengxuanran)
- [撤销/重做](guides/undo-redo.md) 扩展

### 配置

- [关键路径计算](guides/critical-path.md) -- 支持 [链接的滞后/提前时间](guides/auto-scheduling.md#shezhirenwuzhijiandezhihouhetiqianshijian)（PRO 版本）
- 更新西班牙语和中文 [本地化](guides/localization.md#yudingyiyuyanhuanjing)

### API

- 公共 API 改进 -- 提供用于 [ajax](https://docs.dhtmlx.com/api__refs__dhtmlxajax.html)， [环境变量](api/other/env.md) 的公共辅助函数
- [公共 API 清理](migration.md#3x---40) -- 移除了多余的全局对象，解决了与 dhtmlxSuite 的冲突
- 新增用于 [弹窗消息](guides/message-boxes.md) 的公共辅助函数

## 3.3


<span class='release_date'>2015年7月21日. 小型更新</span>

### 功能

- 依赖项 [自动调度](guides/auto-scheduling.md) 功能（PRO 版本）
- [全屏模式](guides/fullscreen-mode.md)
- 支持 [未排定任务](guides/unscheduled-tasks.md)
- [反向计划](guides/loading.md#renwuriqidejiazai)

### 配置

- 初步支持 [内容安全策略](guides/content-security-policy.md)
- 可指定 [每列的表格排序](guides/sorting.md#anliedandushezhipaixuguize) 设置
- 改进分支排序功能 -- [跨层级拖放](guides/reordering-tasks.md)

### API

- [用于 ajax 加载/保存的 REST 模式](guides/server-side.md)

## 3.2


<span class='release_date'>2015年3月18日. 小型更新</span>

### 功能

- [任务分组](guides/grouping.md)（PRO 版本）
- [多任务选择](guides/multiselection.md)
- [数据导出为 iCal 和 Excel 格式](guides/excel.md)
- [工作时间和关键路径计算的主要性能提升](guides/performance.md)

### 配置

- [可设置 Lightbox 年份选择器范围](guides/time.md#mapping)

### API

- [用于管理任务重新排序时可用目标位置的事件](guides/reordering-tasks.md#xianzhituofangweizhi)
- [用于管理加载流程的事件](guides/loading.md#shijianliucheng)
- 新增示例、方法和事件

## 3.1


<span class='release_date'>2014年10月25日. 小型更新</span>

### 功能

- 支持在触控设备上拖动任务

### 配置

- [更改了刻度上首尾任务的默认偏移量](api/config/scale_offset_minimal.md)

### Bug 修复

- 展开/收起任务树时，工具提示行为不正确
- Gantt 初始化期间 API 事件的顺序问题
- 清空或重新初始化 Gantt 时垂直标记行为不正确

## <b>3.0</b>


<span class='release_date'>2014年9月11日. 重大更新</span>

### 配置

- [可将"时间"和"持续时间"控件映射到自定义日期属性](guides/time.md#mapping)

### 功能

- [动态加载](guides/dynamic-loading.md)（PRO 版本）
- [可通过拖放调整列和整个表格的大小](guides/specifying-columns.md)
- [可动态隐藏/显示列](guides/specifying-columns.md#visibility)（PRO 版本）
- [可在时间线区域显示附加元素](guides/baselines.md)（PRO 版本）
- [支持关键路径](guides/critical-path.md)（PRO 版本）
- [只读模式的新功能](guides/readonly-mode.md)
- [今天及其他垂直标记](guides/markers.md)
- [可完全自定义不同任务类型（项目、里程碑等）的渲染方式](guides/baselines.md)（PRO 版本）
- [通过特殊数据属性为任务设置样式](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
- [通过特殊数据属性为链接设置样式](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)

### API

- [新的树相关方法](guides/task-tree-operations.md)

## 2.1


<span class='release_date'>2014年3月28日. 小型更新</span>

### 全局

- 更新本地化
- 修复了许多 bug

### 配置

- [为不同任务类型自定义 Lightbox 配置](guides/task-types.md#specificlightboxpertasktype)
- [非线性刻度，支持从刻度中跳过时间](guides/custom-scale.md)（PRO 版本）

### 功能

- [里程碑](guides/milestones.md) 和 [项目](guides/task-types.md#xiangmurenwu) 支持（PRO 版本）
- [可按工作日/小时而非日历时间计算任务持续时间](guides/working-time.md)
- [支持同一页面上多个 Gantt 图](guides/multiple-gantts.md)（PRO 版本）

### API

- 新增更多配置、方法和事件

## <b>2.0</b>


<span class='release_date'>2013年10月18日. 重大更新</span>

### 全局

- [jQuery 集成](guides/jquery-integration.md)
- 主要性能提升
- [即用型 PHP 集成](guides/server-side.md)

### 配置

- [可配置的多行刻度](guides/configuring-time-scale.md)
- [可配置的多列表格，支持可选排序和拖放](guides/reordering-tasks.md)
- [可配置的弹出表单用于编辑任务](guides/edit-form.md)
- [所有文本元素都可通过模板定义](guides/common-configuration.md#gantttemplatesduixiang)
- [所有日期字符串均可配置](guides/common-configuration.md#ganttconfigduixiang)
- [所有文本标签均可本地化](guides/localization.md)

### 样式

- [默认皮肤更换为"terrace"](guides/skins.md#terraceskin)
- [新增 3 种皮肤](guides/skins.md)
- [条形可选配内置调整器](api/config/drag_resize.md)
- [可选的任务创建 UI](guides/overview.md)
- [可根据自定义规则为垂直线和水平线着色](guides/highlighting-time-slots.md)

### 功能

- [支持从 JSON 加载和序列化](guides/supported-data-formats.md#json)
- [支持使用简化的 XML 格式加载和序列化](guides/supported-data-formats.md#xmldhtmlxgantt20)
- [三种任务链接类型](api/config/links.md)
- Gantt 图支持触控设备

### API

- [新增大量事件](api/overview/events-overview.md)
- 新增 [模板](api/overview/templates-overview.md) 和 [配置选项](api/overview/properties-overview.md)
- [API 简化，统一为单一 Gantt 对象而非多个对象](migration.md)
