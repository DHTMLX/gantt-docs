---
sidebar_label: inline_editors_date_processing
title: inline_editors_date_processing config
description: "编辑任务的开始或结束日期时，保持任务的持续时间"
---

# inline_editors_date_processing

### Description

@short: 编辑任务的开始或结束日期时，保持任务的持续时间

@signature: inline_editors_date_processing: string | undefined

### Example

~~~jsx
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

**Default value:** undefined

### Details

控制 inline editors 如何处理任务开始和结束日期的更改。
当该设置为 undefined（默认值）时:

- 调整任务的开始日期会保持任务的持续时间不变，将整个任务移动到新的开始时间。
- 更改结束日期会保持开始日期固定，更新持续时间以匹配新的结束日期。

此行为与 6.2 版本之前有所不同。

若要恢复 6.1 版本的行为，请将该选项设置为 **"keepDuration"**:

~~~js
gantt.config.inline_editors_date_processing = "keepDuration";
~~~

这意味着:

- 更改开始日期时，持续时间保持不变，任务相应移动。
- 更改结束日期时，持续时间保持不变，任务移动到新的结束日期。

另一种选项是 **"keepDates"**:

~~~js
gantt.config.inline_editors_date_processing = "keepDates";
~~~

这意味着:

- 更改开始日期时，结束日期保持固定，持续时间相应调整。
- 更改结束日期时，开始日期保持固定，持续时间相应调整。

### Change log
- v6.2 新增，兼容之前版本
