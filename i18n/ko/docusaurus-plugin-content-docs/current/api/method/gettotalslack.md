---
sidebar_label: getTotalSlack
title: getTotalSlack 메서드
description: "작업의 총 여유 시간을 반환합니다"
---

# getTotalSlack

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::


### Description

@short: 작업의 총 여유 시간을 반환합니다

@signature: getTotalSlack: (task?: Task | string | number) =\> any

### Parameters

- `task`- (optional) *Task | string | number* - 선택적이며, 작업 객체 또는 해당 ID

### Returns
- ` total_slack` - (number | object) - 작업의 총 여유 시간 또는, 만약 <i>task</i> 매개변수가 지정되지 않으면, 각 작업의 ID를 키로 하고 해당 작업의 총 여유 시간을 값으로 하는 객체

### Example

~~~jsx
var task = gantt.getTask(7);
gantt.getTotalSlack(task);

gantt.getTotalSlack(7);
~~~

### Related samples
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
이 메서드는 **critical_path** 확장에서 정의되어 있으므로, [critical_path](guides/extensions-list.md#critical-path) 플러그인을 [gantt.plugins](api/method/plugins.md) 메서드를 사용해 활성화해야 합니다. 자세한 내용은 [Critical Path](guides/critical-path.md) 문서를 참조하십시오.
:::

총 여유 시간은 작업의 지속 기간을 늘리거나 타임라인에서 해당 작업을 이동시키되 전체 프로젝트의 종료 시점에 영향을 주지 않는 데 사용할 수 있는 시간의 기간입니다.

### Related API
- [getFreeSlack](api/method/getfreeslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md#gettingfreeandtotalslack)