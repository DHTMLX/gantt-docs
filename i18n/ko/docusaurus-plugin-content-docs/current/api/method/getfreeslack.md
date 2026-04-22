---
sidebar_label: getFreeSlack
title: getFreeSlack 메서드
description: "작업의 자유 여유시간을 반환합니다"
---

# getFreeSlack

:::info 
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

### 설명

@short: 작업의 자유 여유시간을 반환합니다

@signature: getFreeSlack: (task: Task) =\> number

### 매개변수

- `task` - (필수) *Task* - 작업의 객체

### 반환값
- ` free_slack` - (number) - 작업의 자유 여유시간

### 예제

~~~jsx
const task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~

### 관련 샘플
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### 세부 정보

:::note
이 메서드는 **critical_path** 확장에 정의되어 있으므로 [critical_path](guides/extensions-list.md#critical-path) 플러그인을 활성화하기 위해 [gantt.plugins](api/method/plugins.md) 메서드를 사용해야 합니다. 자세한 내용은 [Critical Path](guides/critical-path.md) 문서를 참조하십시오.
:::

자유 여유시간은 연결된 다음 작업에 영향을 주지 않으면서 작업의 기간을 늘리거나 타임라인에서 위치를 이동하는 데 사용할 수 있는 시간의 기간입니다.

### 관련 API
- [getTotalSlack](api/method/gettotalslack.md)

### 관련 가이드
- [Critical Path](guides/critical-path.md#gettingfreeandtotalslack)