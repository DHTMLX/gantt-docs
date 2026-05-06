---
sidebar_label: onAfterSort
title: onAfterSort event
description: "그리드에서 작업이 정렬된 후 발생합니다"
---

# onAfterSort

### Description

@short: 그리드에서 작업이 정렬된 후 발생합니다

@signature: onAfterSort: (field: string | GanttCallback, desc?: boolean, parent?: string | number) =\> void;

### Parameters

- `field` - (required) *string | function* - 그리드가 정렬된 열의 이름 또는 커스텀 정렬 함수
- `desc`	- (optional)	*boolean*	 	-	선택적, 정렬 방향: <i>true</i> - 내림차순, <i>false</i> - 오름차순<br/>
- `parent`	- (optional) *string | number*	-	선택적, 지정된 부모의 가지에서만 정렬된 경우의 부모 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onAfterSort",function(field, direction, parent){
    // 여기에 코드 작성
});
~~~

### Related API
- [sort](api/method/sort.md)
- [sort](api/config/sort.md)