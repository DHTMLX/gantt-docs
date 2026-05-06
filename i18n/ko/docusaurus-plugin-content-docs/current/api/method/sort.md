---
sidebar_label: sort
title: sort method
description: "그리드 내 작업을 정렬합니다"
---

# sort

### Description

@short: 그리드에서 작업을 정렬합니다

@signature: sort: (field: string | ((task1: Task, task2: Task) => 1 | 0 | -1), desc?: boolean, parent?: string | number, silent?: boolean) => void;

### Parameters

- `field`	- (required) *string | SortTasks*	-	그리드가 정렬될 열의 이름 또는 커스텀 정렬 함수
- `desc`	-	(optional) *boolean* -	정렬 방향을 지정합니다: <i>true</i> - 내림차순 및 <i>false</i> - 오름차순<br/> 정렬. 기본값은 <i>false</i>
- `parent` -	(optional) *string | number*	-	상위 작업의 ID. 지정하면 지정된 상위의 브랜치에 속한 작업들만 정렬합니다.
- `silent` -	(optional) *boolean*	-	재정렬 후 렌더링이 호출되어야 하는지 여부를 지정합니다.

### Example

~~~jsx
<input type='button'  value='Sort by task name' onclick='sortByName()'>
<script>
    var n_direction = false;
    function sortByName(){
        if (n_direction){
            gantt.sort("text",false);
        } else {
            gantt.sort("text",true);
        }
        n_direction = !n_direction;
    };
    gantt.init("gantt_here");
</script>
~~~

### Related samples
- [정렬 메서드 사용](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)

### Details

사용자 정의 정렬 함수는 **Task** 객체를 인수로 받고, 숫자(1, 0, 또는 -1)를 반환해야 합니다.

사용자 정의 정렬 함수를 사용할 때는 **parent** 매개변수가 무시됩니다. [예제 보기](https://snippet.dhtmlx.com/d8li6kq2).

**sort()** 메서드를 호출할 때 Gantt는 정렬 방향을 나타내는 화살표 같은 정렬 아이콘을 자동으로 추가하지 않습니다. 정렬 아이콘을 표시하고 싶다면 직접 추가할 수 있습니다. [예제 보기](https://snippet.dhtmlx.com/5bjavofk).

### Related API
- [sort](api/config/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [컬럼 정렬](guides/sorting.md)