---
sidebar_label: getTaskBaselines
title: getTaskBaselines 메서드
description: "데이터스토어에서 특정 작업의 베이스라인 배열을 반환합니다"
---

# getTaskBaselines

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 특정 작업의 베이스라인 배열을 데이터스토어에서 반환합니다

@signature: getTaskBaselines: (taskId: string | number) =\> Baseline[]

### Parameters

- `taskId` - (필수) *string | number* - 작업 ID

### Returns
- ` param` - (Baseline[]) - 베이스라인 객체들의 배열

### Example

~~~jsx
gantt.getTaskBaselines(5); // -> 자세히 보기
~~~

### Related samples
- [타임라인의 추가 요소](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

:::note
**getTaskBaselines** 메서드는 [baselines](api/config/baselines.md) 구성이 비활성화된 경우 사용할 수 없습니다.
:::

다음 속성을 갖는 **baseline** 객체들의 배열을 반환합니다:

- **id** - (*string | number*) - 베이스라인 ID
- **task_id** - (*string | number*) - 베이스라인이 속한 작업의 ID
- **start_date** - (*Date*) - 베이스라인의 시작 날짜
- **duration** - (*number*) - 베이스라인의 기간
- **end_date** - (*Date | number*) - 베이스라인의 종료 날짜
- **[customProperty: string]** - (*any*) - 임의의 사용자 정의 속성
- **className** - (*string | number*) - 이 속성의 값은 Gantt에서 HTML 요소에 대한 커스텀 클래스으로 사용됩니다


예시:

~~~js
[
    {
        task_id: 5,
        id: 1, 
        duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00"
    },
    {
        task_id: 5,
        id: 2, 
        duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00"
    }
]
~~~

### Related Guides
- [타임라인의 추가 요소](guides/inbuilt-baselines.md)

### Change log
- v9.0에서 추가됨