---
title: "MSP 项目导出模块的新功能"
sidebar_label: "MSP 项目导出模块的新功能"
---

MSP 项目导出模块的新功能
===========================================

## 2.3.0.0

- 将 MPXJ 库更新到 12.10.3 版本。
- 开箱即用地支持标准任务类型（Project 和 Milestone）。 Primavera 的 Milestones 具有 `FINISH_MILESTONE` 类型
- 新增对 Primavera 导出中 Start 和 Finish Milestones 的支持
- 新增将全部 11 个 Baselines 导出到 MSP 文件的支持
- 新增对扩展字段的支持，类型包括：Number1-20、Flag1-20、Cost1-10、Date1-10、Start1-10、Finish1-10、Duration1-10、OutlineCode1-10
- 新增使用 Text1-30 属性的确切名称的支持。现在，当你指定别名（"My custom prop"）或字段名（"Text1"）时，它也能工作
- 提升 MSP 文件中受支持的任务属性列表。现在，它们被作为标准属性加载，而不是作为自定义/扩展字段
- 新增对标准资源属性和扩展字段的支持：Number1-20、Flag1-20、Cost1-10、Date1-10、Start1-10、Finish1-10、Duration1-10、OutlineCode1-10
- 新增通过单个属性导入大部分标准资源属性的能力（这样你就不需要逐一列出所有属性）
- 当分配没有单位值时，修复资源导出的问题
- 修复了由于任务属性中的某些值导致的阻止文件导入和导出的各种错误

## 2.2.1.0

- 修复将工作时间配置中的 24 小时制值指定为工作时间（例如，`gantt.setWorkTime({ hours: ["00:00-24:00"] })`）
- 在导入函数的 `projectProperties` 参数中指定 `CalendarUID` 属性时，返回的 Project 日历的问题修复

## 2.2.0.0

- 将 MPXJ 库更新到 12.0.0 版本
- 正确导入在 `taskProperties` 参数中指定的 `Start` 和 `Finish` 属性
- 在 `taskProperties` 参数中指定重复值时，导入修复
- 在 `taskProperties` 参数中指定 `CalendarUID` 属性且某个任务没有日历时，导入修复
- 当 `gantt.config.worktimes` 为空数组时，导出修复
- 使用旧格式指定工作时间设置时，导出修复

## 2.1.1.0

- 将包含日历的属性从 `worktimes` 重命名为 `calendars`
- 新增包含全局日历 ID 的属性
- 为向后兼容性恢复了包含全局日历设置的 `worktime` 属性

## 2.1.0.0

- 新增对导入导出 MSP 和 Primavera 文件（包括资源日历）自定义日历的支持
- 导入文件时，新增从单位获取资源分配值的支持
- 导出文件时，新增为资源分配单位指定自定义值的支持
- 为 Primavera 导出新增 RemainingDuration 属性，以便在没有额外配置的情况下获得相同的结束日期

## 2.0.2.0

- 将 MPXJ 库更新到 11.5.4 版本
- 新增对 Primavera 导入和导出中 Summary (WBS) 任务的自定义属性的支持。当属性具有相同名称时也能工作。若在导出数据时需要对 Summary 任务生效，需要对 **Summary** 属性返回 *true*
- 修复 Baseline 0 未被导入的错误

## 2.0.0.1

- 各种内部优化和导入的 Dockerfile

## 2.0.0.0

- 从 ASP.NET MVC 迁移到 ASP.NET Core。因此，现在可以在 Linux 上以及 Docker 镜像中运行 MSP 导出模块