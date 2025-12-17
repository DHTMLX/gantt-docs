---
sidebar_label: getFreeSlack
title: getFreeSlack method
description: "작업의 free slack을 반환합니다"
---

# getFreeSlack

### Description

@short: 작업의 free slack을 반환합니다

@signature: getFreeSlack: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` free_slack` - (number) - 작업의 free slack 값

### Example

~~~jsx
const task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~

### Related samples
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
pronote 이 기능은 PRO 에디션에서만 제공됩니다. 
:::

:::note
note 이 메서드는 **critical_path** 확장 기능의 일부이므로, [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 [critical_path](guides/extensions-list.md#criticalpath) 플러그인을 활성화해야 합니다. 자세한 내용은 [Critical Path](guides/critical-path.md) 문서에서 확인할 수 있습니다. 
:::

Free slack은 작업 기간에 추가할 수 있는 시간 또는 타임라인 상에서 작업을 이동시킬 수 있는 시간으로, 이후 연결된 작업에 영향을 주지 않는 시간을 의미합니다.

### Related API
- [getTotalSlack](api/method/gettotalslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md#gettingfreeandtotalslack)

