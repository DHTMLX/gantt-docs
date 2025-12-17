---
sidebar_label: sort
title: sort method
description: "그리드 내 작업을 정렬합니다"
---

# sort

### Description

@short: 그리드 내 작업을 정렬합니다

@signature: sort: (field: string | Function, desc?: boolean, parent?: string | number, silent?: boolean) =\> void,

### Parameters

- `field` - (required) *string | SortTasks* -        그리드를 정렬할 열 이름 또는 사용자 정의 정렬 함수
- `desc` - (optional) *boolean* - 정렬 순서를 설정합니다: <i>true</i>는 내림차순, <i>false</i>는 오름차순<br> 기본값은 <i>false</i>입니다
- `parent` - (optional) *string | number* - 부모 작업의 ID입니다. 지정한 부모의 하위 작업만 정렬하려면 이 값을 사용하세요.
- `silent` - (optional) *boolean* - 항목 재정렬 후 렌더링을 트리거할지 여부를 결정합니다

### Example

~~~jsx
<input type='button'  value='작업 이름으로 정렬' onclick='sortByName()'>
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
- [Using sorting methods](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)

### Details

사용자 정의 정렬 함수는 **Task** 객체를 인수로 받고, 숫자(1, 0, 또는 -1)를 반환해야 합니다.

사용자 정의 정렬 함수를 사용할 때는 **parent** 매개변수가 무시됩니다. [예제 보기](https://snippet.dhtmlx.com/d8li6kq2).

**sort()** 메서드를 호출할 때 Gantt는 정렬 방향을 나타내는 화살표 같은 정렬 아이콘을 자동으로 추가하지 않습니다. 정렬 아이콘을 표시하고 싶다면 직접 추가할 수 있습니다. [예제 보기](https://snippet.dhtmlx.com/5bjavofk).

### Related API
- [sort](api/config/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [컬럼 정렬](guides/sorting.md)

