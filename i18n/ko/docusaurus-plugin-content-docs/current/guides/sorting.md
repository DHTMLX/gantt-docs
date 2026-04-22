---
title: "컬럼 정렬"
sidebar_label: "컬럼 정렬"
---

# 컬럼 정렬

dhtmlxGantt는 클라이언트 측에서 그리드의 열에 있는 데이터를 정렬할 수 있습니다.

그리드에서 정렬을 제공하는 방법은 두 가지가 있습니다:

1. 활성화된 [sort](api/config/sort.md) 속성을 가진 열의 헤더를 한 번 클릭하는 방법;
2. [sort](api/method/sort.md) 메서드를 API로 호출하는 방법(일부 이벤트나 동작에서 호출될 수 있습니다. 예: 버튼 클릭 또는 페이지 로드).

:::note
참고: Gantt는 데이터의 값으로만 작업을 정렬할 수 있으며 열의 템플릿 속성으로 설정된 값을 정렬하지는 않습니다.
:::

## 헤더를 클릭해 정렬하기

사용자가 헤더를 클릭하면 Gantt 차트는 현재 어떤 열로 정렬되었는지와 이 정렬의 방향(오름차순 또는 내림차순)을 표시하는 특수 컨트롤을 표시하기 시작합니다. 같은 헤더를 계속 클릭하면 정렬 방향이 반전됩니다.

![gantt_sorting](/img/gantt_sorting.png)

Gantt 차트에서 정렬을 활성화하려면 [sort](api/config/sort.md) 속성을 *true*로 설정합니다:

~~~js
gantt.config.sort = true; 
gantt.init("gantt_here");
~~~

[내장 정렬](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)

## 프로그래밍 방식으로 정렬하기

그리드를 특정 동작이나 이벤트에서 정렬하려면 [sort](api/method/sort.md) 메서드를 호출합니다.

**버튼 클릭으로 정렬하기**
~~~html
<input type='button' value='Sort by task name' onclick='gantt.sort("text", true);'>

<script type="text/javascript" charset="utf-8">
    gantt.init("gantt_here"); 
    gantt.parse(tasks);
</script>
~~~

[정렬 메서드 사용 예제](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)

## 사용자 정의 정렬 함수

그리드에 사용자 정의 정렬 함수를 적용하려면 [sort](api/method/sort.md) 메서드를 첫 번째 매개변수로 사용자 정의 함수의 이름을 넘겨 호출합니다.

사용자 정의 정렬 함수는 인접한 값의 쌍마다 호출되며 1, -1 또는 0을 반환합니다:

- **1** - 쌍의 첫 번째 값이 있는 객체가 두 번째 값보다 앞에 와야 함;
- **-1** - 두 번째 객체가 첫 번째 객체보다 앞에 와야 함;
- **0** - 두 객체의 순서는 변경되지 않음.

**사용자 정의 함수를 이용해 Gantt 차트를 정렬하기**
~~~html
<input type='button' value='Sort by the number of holders' 
       onclick='sortByHolders(direction)'>

<script type="text/javascript" charset="utf-8">
    var direction = false;

    function sortByHolders(direction1){
        direction = !direction;
        gantt.sort(sortHolders);
    };
    function sortHolders(a,b){
         a = a.users.length;
         b = b.users.length;

         if (direction){
            return a>b?1:(a<b?-1:0);
         } else {
            return a>b?-1:(a<b?1:0);
         }
    };
</script>
~~~

[커스텀 정렬 함수 예제](https://docs.dhtmlx.com/gantt/samples/07_grid/04_custom_sorting.html)

## 열별 그리드 정렬 {#percolumngridsorting}

특정 열에 대해 서로 다른 정렬 규칙을 지정하는 것이 가능합니다. 열별로 가장 일반적으로 사용되는 정렬 시나리오는 세 가지가 있습니다:

1) 열 정렬 비활성화: *sort*를 false로 설정

~~~js
gantt.config.columns[1].sort = false;
~~~

2) 제공된 정렬 함수에 따라 열 정렬: *sort*를 함수로 설정

~~~js
gantt.config.columns[1].sort = function(a,b){
    return custom_function(a,b);
};
~~~

사용자 정의 정렬 함수는 작업 객체 쌍(a, b)에 대해 호출되며 1, -1 또는 0을 반환합니다:

- **1** - 쌍의 첫 번째 값이 있는 객체가 두 번째 값보다 앞에 와야 함;
- **-1** - 두 번째 객체가 첫 번째 객체보다 앞에 와야 함;
- **0** - 두 객체의 순서는 변경되지 않음.

3) 작업의 다른 필드 값에 따라 열 정렬: *sort*를 해당 필드로 설정

~~~js
gantt.config.columns[1].sort = 'other_field';
~~~

## 여러 필드로 정렬하기

커스텀 정렬 함수를 사용하여 Gantt 차트의 그리드를 여러 속성(필드)으로 정렬할 수 있습니다. 아래 예제에서는 데이터가 *duration* 및 *priority* 필드로 정렬됩니다:

~~~js
let sortDirection = -1
function customSort() {
    sortDirection *= -1;
    gantt.sort(function (task1, task2) {
        // 우선순위로 정렬
        if (task1.duration == task2.duration) {
            return (task1.priority - task2.priority) * sortDirection
        }
        // 지속 시간(duration)으로 정렬
        return (task1.duration - task2.duration) * sortDirection
    });
}
~~~

[여러 속성(필드)으로 커스텀 정렬 함수로 정렬](https://snippet.dhtmlx.com/upu86azw)

- 작업의 duration이 같은 경우 이 필드로의 정렬은 적용되지 않으며 작업은 *priority* 필드로 정렬됩니다.
- 작업의 duration이 다르면 그리드는 *duration* 속성으로 정렬됩니다.