---
sidebar_label: groupBy
title: groupBy method
description: "특정 작업 속성을 기준으로 작업을 그룹화합니다."
---

# groupBy
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 특정 작업 속성을 기준으로 작업을 그룹화합니다.

@signature: groupBy: (config: GroupConfig | boolean) =\> void

### Parameters

- `config` - (required) *GroupConfig | boolean* -        그룹화 설정 객체 또는 그룹화를 제거하려면 false

### Example

~~~jsx
// 단일 레벨 그룹화
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
    ],
    group_id: "key",
    group_text: "label",
    save_tree_structure: true
});

// 다중 레벨 그룹화
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        // 중첩 그룹
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});

// 미리 정의된 컬렉션 사용
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

// 그룹화 제거
gantt.groupBy(false);
~~~

### Related samples
- [Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

### Details

:::note
 이 메서드는 **grouping** 확장의 일부이므로, [grouping](guides/extensions-list.md#grouping) 플러그인이 활성화되어 있어야 합니다. 자세한 내용은 [작업 그룹화](guides/grouping.md) 문서를 참조하세요. 
:::


그룹화 설정 객체에는 다음과 같은 속성이 포함됩니다:

- **relation_property** - (*string*) - 항목을 그룹화하는 데 사용되는 작업 속성입니다.
- **groups** - (*СollectionItem[]*) - 그룹(요약) 항목의 배열입니다. 각 항목은 **group_id**와 **group_text**(기본값은 *key*와 *label*)에 지정된 속성을 포함해야 합니다.
- **group_id?** - (*string*) - 선택 사항, 그룹 식별자입니다. 기본값은 'key'입니다.
- **group_text?** - (*string*) - 선택 사항, 그룹 레이블입니다. 기본값은 'label'입니다.
- **delimiter?** - (*string*) - 선택 사항, 여러 리소스를 가진 작업에 대해 자동으로 그룹을 생성할 때 사용됩니다. 기본값은 ","입니다.
- **default_group_label?** - (*string*) - 선택 사항, 기본 그룹의 레이블입니다. 기본값은 'None'입니다.
- **save_tree_structure?** - (*boolean*) - 선택 사항, Gantt가 그룹 내에서 원래 트리 구조를 유지할지 여부를 결정합니다. 생략하거나 *false*로 설정하면 작업이 평면 리스트로 표시됩니다.


참고 사항:

- 각 그룹 객체는 최소 두 개의 속성을 가져야 하며, 각각 'group_id'와 'group_text'로 정의된 id와 텍스트 레이블입니다. 기본값은 *key*와 *label*입니다. "id"를 제외한 다른 이름을 사용할 수 있으며, 그룹 배열에 존재해야 합니다.  
:::note
 "id" 속성은 허용되지 않습니다. Gantt는 가상 그룹 작업을 생성하고 여기에 'group_id'와 'group_text' 속성을 삽입하기 때문입니다. 따라서 그룹화된 작업은 기본적으로 'key'와 'value' 속성을 갖습니다. 각 작업이 이미 'id' 속성을 가지고 있기 때문에 기본 id를 변경하면 트리 구조가 손상될 수 있습니다. 
:::
- 원본 'project' 작업은 그룹화 모드에서 표시되지 않지만 API를 통해 접근할 수 있습니다.
- 그룹 항목은 'readonly' 플래그가 설정된 'project' 유형 작업으로 추가됩니다. 이들은 '$virtual' 속성으로 식별할 수 있으며 일반 작업처럼 처리할 수 있습니다:

~~~js
gantt.templates.task_class=function(start, end, task){
  if(task.$virtual)
    return "summary-bar";
};
~~~

- 기본 그룹은 다른 그룹에 할당되지 않은 작업을 포함합니다. 이는 **relation_property**가 <i>string|number</i> 값으로 지정된 작업을 제외합니다.<br> :::note
sample [Save tree structure when grouping tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html) 
:::

### Related Guides
- [작업 그룹화](guides/grouping.md)

### Change log
- **save_tree_structure** 옵션은 v8.0에서 도입되었습니다.
