---
title: "컬럼 정렬"
sidebar_label: "컬럼 정렬"
---

컬럼 정렬
=================================

dhtmlxGantt는 그리드 컬럼 내 데이터를 클라이언트 측에서 바로 정렬할 수 있는 기능을 제공합니다.


그리드에서 정렬을 활성화하는 방법은 두 가지가 있습니다:

1. [sort](api/config/sort.md) 속성이 활성화된 컬럼 헤더를 한 번 클릭하는 방법
2. [sort](api/method/sort.md) 메서드의 API 호출을 사용하는 방법으로, 버튼 클릭이나 페이지 로드 등 이벤트나 동작에 의해 트리거될 수 있습니다.

:::note
Gantt는 실제 데이터 값에 기반하여 작업을 정렬하며, 컬럼의 template 속성에 의해 생성된 값은 정렬하지 않습니다.
:::

헤더 클릭으로 정렬하기
--------------------------------------------

헤더를 클릭하면, Gantt 차트는 현재 정렬된 컬럼과 정렬 순서(오름차순 또는 내림차순)를 시각적으로 표시합니다. 같은 헤더를 연속으로 클릭하면 정렬 방향이 토글됩니다.

![gantt_sorting](/img/gantt_sorting.png)

Gantt 차트에서 정렬을 활성화하려면, [sort](api/config/sort.md) 속성을 *true*로 설정하세요:

~~~js
gantt.config.sort = true; 
gantt.init("gantt_here");
~~~


[Built-in sorting](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)


프로그래밍 방식으로 정렬하기
-----------------------

버튼 클릭이나 페이지 로드 등 특정 이벤트나 동작에 따라 그리드를 정렬하려면, [sort](api/method/sort.md) 메서드를 사용하세요.

**버튼 클릭 시 정렬**
~~~html
<input type='button' value='Sort by task name' onclick='gantt.sort("text", true);'>

<script type="text/javascript" charset="utf-8">
    gantt.init("gantt_here"); 
    gantt.parse(tasks);
</script>
~~~


[Using sorting methods](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)


커스텀 정렬 함수
-------------------------------------------------

[sort](api/method/sort.md) 메서드의 첫 번째(유일한) 파라미터로 함수명을 전달하여 커스텀 정렬 함수를 적용할 수 있습니다.

이 함수는 인접한 값 쌍마다 호출되며, 1, -1 또는 0을 반환해야 합니다:

- **1** - 첫 번째 객체가 두 번째 객체보다 앞에 와야 함
- **-1** - 두 번째 객체가 첫 번째 객체보다 앞에 와야 함
- **0** - 두 객체의 순서는 변하지 않음

**Gantt 차트에서 커스텀 함수로 정렬하기**
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


[Custom sorting function](https://docs.dhtmlx.com/gantt/samples/07_grid/04_custom_sorting.html)


그리드에서 컬럼별 정렬
-----------------------

각 컬럼별로 개별적인 정렬 규칙을 정의할 수 있습니다. 컬럼별 정렬을 처리하는 세 가지 일반적인 방법은 다음과 같습니다:

1) *sort*를 false로 설정하여 컬럼에서 정렬 비활성화

~~~js
gantt.config.columns[1].sort = false;
~~~

2) *sort*에 커스텀 함수를 할당하여 컬럼을 커스텀 함수로 정렬

~~~js
gantt.config.columns[1].sort = function(a,b){
    return custom_function(a,b);
};
~~~

이 커스텀 함수는 두 개의 작업 객체(a, b)를 받아 1, -1 또는 0을 반환합니다:

- **1** - 첫 번째 객체가 두 번째 객체보다 앞에 와야 함
- **-1** - 두 번째 객체가 첫 번째 객체보다 앞에 와야 함
- **0** - 순서가 변경되지 않음

3) *sort*에 다른 작업 필드명을 지정하여 해당 필드 값 기준으로 컬럼 정렬

~~~js
gantt.config.columns[1].sort = 'other_field';
~~~

