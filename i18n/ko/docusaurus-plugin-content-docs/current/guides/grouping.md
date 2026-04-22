---
title: "작업 그룹화"
sidebar_label: "작업 그룹화"
---

# 작업 그룹화

:::info
이 기능은 PRO 버전에서만 사용할 수 있습니다.
:::

라이브러리는 작업의 속성 중 아무 것이나로 작업을 그룹화할 수 있도록 하는 **grouping** 확장을 제공합니다.

<div style="text-align:center;">![grouping_tasks](/img/grouping_tasks.png)</div>

:::note
확장을 사용하기 시작하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용해 활성화하세요.
:::

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({
        grouping: true
    });
    //your code will be here
</body>
</html>
~~~

[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## Grouping tasks {#groupingtasks}

일부 기준에 따라 작업을 그룹화하려면 [groupBy](api/method/groupby.md) 메서드를 사용합니다: 

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] 
};

gantt.groupBy({
    relation_property: "priority",
    groups: [{key:1, label: "High"},{key:2, label: "Normal"},{key:3, label: "Low"}],
    group_id: "key",
    group_text: "label"
});
~~~

다음과 같이: 

- **relation_property** - (*mandatory*) 아이템을 그룹화하는 데 사용될 작업 객체의 속성입니다. 예를 들어:

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] /*!*/
};
gantt.groupBy({
    relation_property: "priority", /*!*/
    ...
});
~~~

속성은 다단계 구조로 그룹을 구성하는 데에도 사용할 수 있습니다:

~~~js
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        //multi level groups
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});
~~~  

- **groups** - (*mandatory*) 요약된 그룹 항목들의 배열입니다. 

~~~js
gantt.groupBy({
    groups: [
        {key:1, label: "High"}, 
        {key:2, label: "Normal"},
        {key:3, label: "Low"}
    ],
    group_id: "key",
    group_text: "label"
});
~~~   

참고:

1. 각 'group' 객체는 최소 2개의 속성(추가 속성은 얼마든지 가능)을 포함해야 합니다: 아이디와 텍스트 설명은 각각 'group_id', 'group_text' 매개변수로 지정됩니다. 기본적으로 이 매개변수들은 *key* 와 *label* 값을 가지며 각각 대응합니다. 이 매개변수들에 대해 다른 값을 사용할 수 있지만(단, "id" 값은 허용되지 않습니다), 그룹 배열에 명시되어 있어야 합니다. 
:::note
"Gantt"가 작업을 그룹화할 때 가상 그룹 작업을 만들고 이 작업들에 'group_id' 및 'group_text' 매개변수를 추가하므로 "id" 값은 허용되지 않습니다.
::: 

2. 그룹 아이템은 데이터 세트에 타입이 'project'이고 'readonly' 속성이 활성화된 항목으로 추가됩니다. 이들은 '$virtual' 속성으로 감지되며 일반 데이터 아이템처럼 처리됩니다:

~~~js
gantt.templates.task_class="function(start," end, task){
    if(task.$virtual)
    return "summary-bar";
};
~~~

3. 원본 데이터 세트의 'project' 작업은 그룹화 모드에서 표시되지는 않지만 API를 통해 접근할 수 있습니다.

- **group_id** - (*optional*) 그룹의 id. 기본값은 'key' 입니다.
- **group_text** - (*optional*) 그룹의 레이블. 기본값은 'label' 입니다.  
- **delimiter** - (*optional*) 다중 자원을 가진 작업에 대해 그룹을 자동으로 생성할 때 사용되는 구분자입니다. 기본값은 ',' 입니다.
- **default_group_label** - (<i>string</i>) 기본 그룹의 이름입니다. 선택 사항입니다. 기본값은 'None' 입니다.
- **save_tree_structure** - (<i>boolean</i>) 그룹 내에서 트리 구조를 저장할지 여부를 정의합니다. 명시되지 않거나 *false*로 설정되면 작업은 플랫 목록 뷰로 표시됩니다.

참고, 기본 그룹은 다른 그룹에 포함되지 않는 작업을 포함합니다. 기본 그룹은 **relation_property**가 문자열|숫자 값으로 지정된 경우에는 해당 작업을 포함하지 않습니다.

## Ungrouping tasks

작업 그룹 해제

작업 그룹화를 초기화하려면 [groupBy](api/method/groupby.md) 메서드를 호출하고 매개변수로 false를 전달하십시오:

~~~js
gantt.groupBy(false);
~~~

## Using collections for specifying groups

일반적으로 그룹은 페이지의 여러 요소에 의해 사용되며 반복을 피하기 위해 그룹을 명명된 컬렉션으로 표시할 수 있습니다.

~~~js
gantt.serverList("priority", [
    {key:1, label: "High"},
    {key:2, label: "Normal"},
    {key:3, label: "Low"}
]);
gantt.groupBy({
    groups: gantt.serverList("priority"),
    relation_property: "priority",
    group_id: "key",
    group_text: "label"
});
~~~

## Keeping original task hierarchy in groups

그룹 모드에서 Gantt 트리의 원래 구조는 기본적으로 표시되지 않으며 모든 작업은 각각의 그룹의 최상위 자식으로 나타납니다.

원래 하위 작업 구조를 그룹 내에서 유지하려면 **save_tree_structure** 설정을 사용하세요:

~~~js
gantt.groupBy({
    groups: [
        { key: 1, label: "Ilona" },
        { key: 2, label: "John" },
        { key: 3, label: "Mike" }
    ],
    relation_property: "owner",
    group_id: "key",
    group_text: "label",
    default_group_label: "Not Assigned",
    save_tree_structure: true /* ! */
});
~~~

[그룹화할 때 트리 구조 저장](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)