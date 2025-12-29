---
sidebar_label: getTaskBaselines
title: getTaskBaselines method
description: "특정 작업과 연관된 베이스라인 배열을 데이터스토어에서 가져옵니다."
---

# getTaskBaselines
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 특정 작업과 연관된 베이스라인 배열을 데이터스토어에서 가져옵니다.

@signature: getTaskBaselines: (taskId: string | number) =\> Baseline[]

### Parameters

- `taskId` - (required) *string | number* -    작업의 고유 식별자

### Returns
- ` param` - (Baseline[]) - 베이스라인 객체들을 포함하는 배열

### Example

~~~jsx
gantt.getTaskBaselines(5); // -> 자세한 내용 확인
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

:::note
 **getTaskBaselines** 메서드는 [baselines](api/config/baselines.md) 설정이 비활성화된 경우 작동하지 않습니다. 
:::

이 메서드는 다음 속성을 가진 **baseline** 객체들의 배열을 반환합니다:

- **id** - (*string | number*) - 고유 베이스라인 ID
- **task_id** - (*string | number*) - 이 베이스라인이 연결된 작업의 ID
- **start_date** - (*Date*) - 베이스라인 시작일
- **duration** - (*number*) - 베이스라인 기간
- **end_date** - (*Date | number*) - 베이스라인 종료일
- **[customProperty: string]** - (*any*) - 추가로 정의된 커스텀 속성


예시는 다음과 같습니다:

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
- v9.0에 추가됨

