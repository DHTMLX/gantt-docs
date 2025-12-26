---
title: "작업 그룹화"
sidebar_label: "작업 그룹화"
---

# 작업 그룹화

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다
:::

이 라이브러리는 작업의 어떤 속성이든 기준으로 작업을 구성할 수 있는 **그룹화** 확장 기능을 제공합니다.

<div style="text-align:center;">![grouping_tasks](/img/grouping_tasks.png)</div>

:::note
이 확장 기능을 사용하려면 [gantt.plugins](api/method/plugins.md) 메서드를 통해 활성화하세요.
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
    //여기에 코드를 작성하세요
</body>
</html>
~~~

[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## 작업 그룹화하기  {#groupingtasks}

특정 기준에 따라 작업을 그룹화하려면 [groupBy](api/method/groupby.md) 메서드를 사용하세요:

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

상세 설명:

- **relation_property** - (*필수*) 작업 객체에서 그룹화를 적용할 속성입니다. 예시:

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] /*!*/
};
gantt.groupBy({
    relation_property: "priority", /*!*/
    ...
});
~~~

이 속성을 사용하면 다단계 그룹 구조도 생성할 수 있습니다:

~~~js
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        // 다단계 그룹
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});
~~~  

- **groups** - (*필수*) 그룹(요약) 항목의 배열입니다.

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

중요 참고사항:

1. 각 그룹 객체는 최소 두 개의 속성(그리고 추가적으로 필요한 속성들)을 포함해야 합니다. 각각 그룹의 id와 텍스트 설명으로, 'group_id'와 'group_text' 파라미터에 의해 정의됩니다. 기본값은 *key*와 *label*입니다. 이 파라미터들은 그룹 객체에 존재하는 한, (**"id"는 제외**) 다른 값으로 지정할 수 있습니다.  
:::note
"id" 속성은 사용할 수 없습니다. Gantt는 그룹화 시 가상 그룹 작업을 생성하고, 여기에 'group_id'와 'group_text' 속성을 할당합니다. 즉, 그룹화된 작업에는 기본적으로 'key'와 'label' 속성이 추가됩니다. 각 작업에는 이미 'id'가 있으므로, 이를 변경하면 트리 구조가 손상될 수 있습니다.
:::

2. 그룹 항목은 데이터셋에 'project' 타입의 항목으로 추가되며, 'readonly' 플래그가 활성화됩니다. 이들은 '$virtual' 속성으로 식별할 수 있으며 일반 데이터 항목처럼 처리할 수 있습니다:

~~~js
gantt.templates.task_class="function(start," end, task){
    if(task.$virtual)
    return "summary-bar";
};
~~~

3. 데이터셋 내 원래의 'project' 작업들은 그룹화 모드에서는 표시되지 않지만, API를 통해 접근할 수 있습니다.

- **group_id** - (*선택*) 그룹의 id로 사용할 속성입니다. 기본값은 'key'입니다.  
- **group_text** - (*선택*) 그룹의 라벨로 사용할 속성입니다. 기본값은 'label'입니다.  
- **delimiter** - (*선택*) 여러 리소스가 할당된 작업에 대해 그룹을 자동 생성할 때 사용합니다. 기본값은 ","입니다.  
- **default_group_label** - (<i>string</i>) 기본 그룹의 라벨입니다. 선택 사항이며, 기본값은 'None'입니다.  
- **save_tree_structure** - (<i>boolean</i>) 그룹 내에서 Gantt의 원래 트리 구조를 유지할지 제어합니다. 생략하거나 *false*로 설정하면, 작업이 평면 리스트로 표시됩니다.

참고로, 기본 그룹에는 다른 그룹에 속하지 않은 작업이 포함됩니다. **relation_property**가 <i>string|number</i> 값으로 지정된 작업은 기본 그룹에 포함되지 않습니다.

 

## 작업 그룹 해제하기

그룹화를 해제하려면 [groupBy](api/method/groupby.md) 메서드에 *false*를 인자로 전달하세요:

**현재 그룹화 초기화**
~~~js
gantt.groupBy(false);
~~~

## 그룹 지정에 컬렉션 사용하기

그룹이 페이지 내 여러 컴포넌트에서 공유되는 경우가 많으므로, 중복을 피하기 위해 그룹을 명명된 컬렉션으로 정의할 수 있습니다.

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


## 그룹 내에서 원래 작업 계층 구조 유지하기

기본적으로 그룹화가 활성화되면 Gantt 트리의 원래 계층 구조는 표시되지 않고, 모든 작업이 그룹의 직접 하위로 나타납니다.

그룹 내에서 원래 하위 작업 구조를 유지하려면 **save_tree_structure**를 true로 설정하세요:

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


[Save tree structure when grouping tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)


