---
sidebar_label: onAfterSort
title: onAfterSort event
description: "그리드 내 작업들이 정렬된 후에 한 번 트리거됩니다."
---

# onAfterSort

### Description

@short: 그리드 내 작업들이 정렬된 후에 한 번 트리거됩니다.

@signature: onAfterSort: (field: string | GanttCallback, desc?: boolean, parent?: string | number) =\> void;

### Parameters

- `field` - (required) *string | function* - 정렬에 사용된 컬럼 이름 또는 사용자 정의 정렬 함수
- `desc` - (required) *boolean* - 선택 사항으로 정렬 순서를 나타냅니다: <i>true</i>는 내림차순, <i>false</i>는 오름차순<br>
- `parent` - (required) *string | number* - 선택 사항으로, 정렬이 특정 브랜치로 제한된 경우 해당 부모 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onAfterSort",function(field, direction, parent){
    // your code here
});
~~~

### Related API
- [sort](api/method/sort.md)
- [sort](api/config/sort.md)

