---
sidebar_label: getTotalSlack
title: getTotalSlack method
description: "작업의 총 slack을 반환합니다."
---

# getTotalSlack
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 작업의 총 slack을 반환합니다.

@signature: getTotalSlack: (task?: Task | string | number) =\> any

### Parameters

- `task` - (optional) *Task | string | number* -        선택 사항, 작업 객체 또는 작업 ID

### Returns
- ` total_slack` - (number | object) - 작업의 총 slack 값을 반환하거나, <i>task</i> 매개변수가 제공되지 않은 경우 작업 ID와 해당 총 slack 값을 매핑한 객체를 반환합니다.

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
 이 메서드는 **critical_path** 확장의 일부이므로 [gantt.plugins](api/method/plugins.md) 메서드를 통해 [critical_path](guides/extensions-list.md#criticalpath) 플러그인을 활성화해야 합니다. 자세한 내용은 [Critical Path](guides/critical-path.md) 문서를 참조하세요. 
:::


총 slack은 작업 기간을 늘리거나 타임라인 상에서 이동시켜도 전체 프로젝트 완료가 지연되지 않는 시간을 나타냅니다.

### Related API
- [getFreeSlack](api/method/getfreeslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md#gettingfreeandtotalslack)

