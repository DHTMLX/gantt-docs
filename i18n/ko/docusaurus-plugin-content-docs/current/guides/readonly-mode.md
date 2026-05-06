---
title: "읽기 전용 모드" 
sidebar_label: "읽기 전용 모드" 
---

# 읽기 전용 모드

이 부분에서는 읽기 전용 모드를 두 가지 상황의 맥락에서 살펴봅니다:

1. [전체 간트 차트에 대한 읽기 전용 모드](guides/readonly-mode.md#readonlymodefortheentiregantt)
2. [특정 작업에 대한 읽기 전용 모드](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)

## 전체 간트 차트에 대한 읽기 전용 모드 {#readonlymodefortheentiregantt}

전체 간트 차트를 읽기 전용으로 만들려면 [readonly](api/config/readonly.md) 옵션을 *true*로 설정합니다.

~~~js
gantt.config.readonly = true;

gantt.init("gantt_here");
~~~

읽기 전용 모드는 사용자가 UI를 통해 수행할 수 있는 내장 동작에만 영향을 준다는 점을 알아두어야 합니다. 즉, 전체 간트 차트가 비편집 상태일 때 사용자는 라이트박스나 인라인 에디터를 열 수 없고, 작업을 수직 또는 수평으로 드래그-앤-드롭할 수 없으며, 작업의 크기를 조정할 수 없습니다.

그러나 [readonly](api/config/readonly.md) 속성은 API 메서드를 통해 구현된 동작을 차단하지 않습니다. 따라서 Gantt API를 사용하는 경우에는 콜백 함수에서 읽기 전용 모드가 활성화되었는지 수동으로 확인해야 합니다. 예를 들어 커스텀 버튼을 클릭해 작업 추가 기능을 차단하는 방법은 다음과 같습니다:

~~~js
gantt.config.readonly = true;

gantt.config.columns = [
    { name: "text", label: "Task name", width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration", label: "Duration", align: "center" },
    { name: "add", label: "1", width: 44 },
    {
        name: "add_custom", label: "2", width: 44, template: function (task) {
          return "<div class='custom_add' onclick='customAdd(" + task.id + ")';></div>"
        }
    }
];

function customAdd(parentId) { /*!*/
    if (gantt.config.readonly){ /*!*/
        return; /*!*/
    }/*!*/
}/*!*/
~~~

특정 작업/링크를 읽기 전용 간트 차트에서 편집 가능하게 만들려면 데이터 객체에 'editable' 속성을 추가하고 값을 *true*로 설정합니다:

![task_editable_property](/img/task_editable_property.png)

~~~js
gantt.config.readonly = true;
var task = gantt.getTask(id).editable = true;
~~~

기본적으로 위에서 언급한 동작은 작업/링크의 'editable' 속성에 바인딩됩니다. 대상 속성을 변경하려면 [editable_property](api/config/editable_property.md) 구성 옵션을 사용하세요:

~~~js
gantt.config.editable_property = "property_name";
~~~

## 특정 작업/링크에 대한 읽기 전용 모드 {#readonlymodeforspecifictaskslinks}

특정 작업이나 링크를 읽기 전용으로 만들려면 데이터 객체에 'readonly' 속성을 추가하고 값을 true로 설정합니다:

~~~js
gantt.getTask(id).readonly = true;
gantt.getLink(id).readonly = true;
~~~

![task_readonly_property](/img/task_readonly_property.png)

:::note
기본적으로 간트는 이 속성이 음수가 아닌 값인지 여부를 확인한 다음 해당 작업/링크를 읽기 전용으로 만듭니다. 그렇지 않으면 편집 가능 상태를 유지합니다.
:::

읽기 전용인 작업/링크는 클릭이나 더블 클릭에 반응하지 않으며, 드래그(또는 편집)도 불가능합니다.

읽기 전용 작업에 대해 라이트박스를 표시하고 싶다면 [gantt.showLightbox(id)](api/method/showlightbox.md)을 수동으로 호출하면 됩니다:

~~~js
gantt.attachEvent("onTaskDblClick", function(id,e){
    gantt.showLightbox(id)
    return true;
});
~~~

기본적으로 읽기 전용 동작은 작업/링크의 'readonly' 속성에 바인딩되지만, 대상 속성은 [readonly_property](api/config/readonly_property.md) 구성 옵션을 사용하여 변경할 수 있습니다:

~~~js
gantt.config.readonly_property = "property_name";
~~~

## "editable_property" 구성 옵션의 세부 정보

'editable_property'는 라이트박스 섹션이나 왼쪽 그리드의 열이 아니라, 태스크 데이터 객체의 속성을 가리킵니다:

~~~js
{
    tasks:[
        {id:1, text:"Project #2", start_date:"01-04-2020", duration:18,order:10, 
            progress:0.4, parent:0, editable:false},
        {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, order:10, 
            progress:0.6, parent:1, editable:true},
        {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, order:20, 
            progress:0.6, parent:1, editable:true}
    ],
    links:[...]
}
~~~

작업이 라이트박스에서 설정 가능하도록 만들고 싶다면 제어가 매핑된 동일한 속성으로 'editable_property'를 설정해야 합니다:

~~~js
gantt.config.lightbox.sections = [ 
    {
        name:"description", 
        height:38, 
        map_to:"some_property", 
        type:"textarea", 
        focus:true
    },
    ....
]
gantt.config.editable_property = "some_property";
~~~

## 다중 속성에 따라 이벤트를 읽기 전용으로 설정하기

다중 속성 집합을 기준으로 이벤트를 조건부로 편집 가능하도록 만들려면 다음과 같이 할 수 있습니다:

- [onBeforeLightbox](api/event/onbeforelightbox.md) 및 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 이벤트를 차단하는 방식으로 편집 가능 여부를 수동으로 관리합니다
- 작업이 로드되거나 추가되거나 업데이트될 때마다 ('onTaskLoading', 'onTaskCreated', 'onAfterTaskUpdate'를 사용) [editable_property]를 동적으로 업데이트합니다:

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.editable = task.has_owner && task.editable && task.text;
    return true;
});
~~~