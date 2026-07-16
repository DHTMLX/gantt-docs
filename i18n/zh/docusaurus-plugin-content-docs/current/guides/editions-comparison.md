---
title: "Community 与 PRO Library 版本对比"
sidebar_label: "Community 与 PRO Library 版本对比"
---

# Community 与 PRO Library 版本对比

如果您想了解 dhtmlxGantt 库的免费 Community 版与 PRO 版之间的区别，以及 PRO 版带来的额外功能，本指南正是您所需要的。

PRO 版包含 Community 版的所有功能，并且还包含其他有用的特性。下表列出了功能清单，便于对比 dhtmlxGantt 的两个版本。

:::info
从 DHTMLX Gantt v10 起，免费版为在 MIT 许可下分发的 **Community 版**。早前的免费版本（v9.x 及更早版本）采用 **GPL v2** 许可分发，且对这些版本仍然适用。PRO/Commercial 版仍然是单独的付费版本。有关从 GPL 版迁移到 Community 版的详细信息，请参阅迁移指南 [migration guide](migration.md#gpl-to-mit)。
:::

<table>
  <thead>
  <tr>
  <th style="width: 60%;">功能</th>
  <th style="text-align:center;width: 20%;">标准版</th>
  <th style="text-align:center;width: 20%;">PRO 版</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>[50+ locales](guides/localization.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[4 种任务链接类型：finish-to-start、start-to-start、finish-to-finish、start-to-finish](guides/loading.md#dataproperties)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[7 种不同的皮肤](guides/skins.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[在时间刻度上隐藏时间单位的能力](guides/custom-scale.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[可访问性](guides/accessibility.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[将日历分配给项目](guides/working-time.md#assigningcalendartoproject)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[将日历分配给资源](guides/working-time.md#assigningcalendartoresource)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[自动排程](guides/auto-scheduling.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[自动检测任务类型](api/config/auto_types.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[向后计划](guides/loading.md#loadingtaskdates)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[网格中的可配置列](guides/specifying-columns.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[约束控制](guides/constraint.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[符合内容安全策略](guides/content-security-policy.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[在同一页面创建多个甘特图](guides/multiple-gantts.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[关键路径计算](guides/critical-path.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>跨浏览器：IE、FF、Chrome、Safari、Edge</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[可自定义的任务编辑表单（灯箱）](guides/edit-form.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[可定制的时间刻度](guides/dynamic-scale.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[任务持续时间的小数单位](guides/working-time.md#taskdurationindecimalformat)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[水平拖拽多个任务](guides/multiselection.md#multitaskselectionanddragndrop)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[动态加载](guides/dynamic-loading.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[可编辑或只读甘特图](guides/readonly-mode.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[导出为 PDF 和 PNG](guides/export.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[导出到和从 Excel 导入以及导出到 iCal](guides/excel.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[从 MS Project 导出/导入](guides/export-msproject.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[过滤任务](guides/filtering.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[灵活的甘特图布局](guides/layout-config.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>通过 JavaScript API 实现的完整控制</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[全屏模式](guides/fullscreen-mode.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[隐藏/显示网格列](guides/specifying-columns.md#overview)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[网格中的内联编辑](guides/inline-editing.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[键盘导航](guides/keyboard-navigation.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[前置任务编辑器的链接格式化器](guides/inline-editing.md#linkformatter)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[从 XML、JSON 加载](guides/loading.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[单个任务的可编辑性/只读模式管理](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[在时间线区域标记特定时间](guides/highlighting-time-slots.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[材料设计](guides/skins.md#materialskin)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[多任务选择](guides/multiselection.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[可选树视图](guides/tree-column.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[每列网格排序](guides/sorting.md#percolumngridsorting)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[用于创建新任务的占位行](api/config/placeholder_task.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[任务进度百分比着色](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[项目和里程碑任务类型](guides/task-types.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[RTL（从右到左）模式](guides/rtl-mode.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[从 UI 调整网格列和网格本身的大小](guides/specifying-columns.md#resizing)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[资源管理](guides/resource-management.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[丰富的拖放行为以管理任务](guides/dnd.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[通过单击并拖动滚动时间线](guides/extensions-list.md#drag-timeline)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[智能渲染](guides/performance.md#smart-rendering)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[排序列](guides/sorting.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[将任务拆分为子任务](guides/split-tasks.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[对基线、截止日期及其他自定义元素的支持](guides/baselines.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[对自定义任务类型的支持](guides/task-types.md#creating-a-custom-type)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>对触控设备的支持：iOS、Android</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[对未计划任务的支持](guides/unscheduled-tasks.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[任务分组](guides/grouping.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[工具提示](guides/tooltips.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[撤销/重做功能](guides/undo-redo.md)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[WBS 编码计算](guides/specifying-columns.md#wbscode)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[单个任务的工作日和工作时间](guides/working-time.md#multipleworktimecalendars)</td>
  <td style="text-align:center;">❌</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  <tr>
  <td>[jQuery 集成](guides/jquery-integration.md)</td>
  <td style="text-align:center;">✔️</td>
  <td style="text-align:center;">✔️</td>
  </tr>
  </tbody>
</table>