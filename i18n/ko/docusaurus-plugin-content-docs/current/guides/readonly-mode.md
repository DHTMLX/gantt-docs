---
title: "읽기 전용 모드"
sidebar_label: "읽기 전용 모드"
---

읽기 전용 모드
===================================

여기서는 읽기 전용 모드를 두 가지 시나리오로 살펴봅니다:

1. [간트 차트 전체에 대한 읽기 전용 모드](guides/readonly-mode.md#readonlymodefortheentiregantt)
2. [특정 작업에 대한 읽기 전용 모드](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)


## 간트 차트 전체에 대한 읽기 전용 모드 {#readonlymodefortheentiregantt}

간트 차트 전체를 읽기 전용으로 만들려면 [readonly](api/config/readonly.md) 옵션을 *true*로 설정하면 됩니다.

~~~js
gantt.config.readonly = true;

gantt.init("gantt_here");
~~~

읽기 전용 모드는 사용자가 UI를 통해 할 수 있는 기본 동작만 비활성화한다는 점을 기억하세요. 즉, 전체 간트 차트가 잠겨 있으면 사용자는 라이트박스나 인라인 에디터를 열거나, 작업을 드래그하거나, 크기를 조정할 수 없습니다.

하지만 [readonly](api/config/readonly.md) 속성은 API 호출을 통한 동작은 차단하지 않습니다. 따라서 Gantt API를 사용하는 경우, 콜백 함수 내에서 읽기 전용 모드가 활성화되어 있는지 직접 확인해야 합니다. 예를 들어, 커스텀 버튼 클릭으로 작업 추가를 막는 방법은 다음과 같습니다:

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

간트 차트가 읽기 전용이어도 특정 작업이나 링크를 편집 가능하게 하려면, 해당 데이터 객체에 'editable' 속성을 추가하고 *true*로 설정하세요:

![task_editable_property](/img/task_editable_property.png)

~~~js
gantt.config.readonly = true;
var task = gantt.getTask(id).editable = true;
~~~

기본적으로 이 동작은 작업 또는 링크의 'editable' 속성과 연결되어 있습니다. 다른 속성을 사용하고 싶다면 [editable_property](api/config/editable_property.md) 옵션으로 변경할 수 있습니다:

~~~js
gantt.config.editable_property = "property_name";
~~~


## 특정 작업/링크에 대한 읽기 전용 모드 {#readonlymodeforspecifictaskslinks}

특정 작업이나 링크만 읽기 전용으로 만들려면, 해당 데이터 객체에 'readonly' 속성을 추가하고 true로 설정하세요:

~~~js
gantt.getTask(id).readonly = true;
gantt.getLink(id).readonly = true;
~~~

![task_readonly_property](/img/task_readonly_property.png)

:::note
기본적으로, gantt는 작업이나 링크에 이 속성이 true로 설정되어 있으면 읽기 전용으로 만듭니다. 그렇지 않으면 편집 가능합니다.
:::

작업이나 링크가 읽기 전용이면 클릭 또는 더블 클릭에 반응하지 않으며, 드래그하거나 편집할 수 없습니다.

읽기 전용 작업에 대해 라이트박스를 표시하고 싶다면, [gantt.showLightbox(id)](api/method/showlightbox.md)를 수동으로 호출할 수 있습니다:

~~~js
gantt.attachEvent("onTaskDblClick", function(id,e){
    gantt.showLightbox(id)
    return true;
});
~~~

기본적으로 읽기 전용 동작은 작업 또는 링크의 'readonly' 속성과 연결되어 있습니다. 이 속성은 [readonly_property](api/config/readonly_property.md) 옵션으로 변경할 수 있습니다:

~~~js
gantt.config.readonly_property = "property_name";
~~~


"editable_property" 설정 옵션의 세부 사항
---------------------------

'editable_property'는 작업 데이터 객체 자체의 속성을 가리키며, 라이트박스 섹션이나 좌측 그리드의 컬럼이 아닙니다:

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

이 속성을 라이트박스에서 편집 가능하게 하려면, 'editable_property'를 컨트롤이 매핑된 속성과 일치하도록 설정하세요:

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


여러 속성에 따라 이벤트 읽기 전용 설정하기
-----------------------

여러 조건에 따라 이벤트를 편집 가능하게 하려면 다음과 같이 할 수 있습니다:

- [onBeforeLightbox](api/event/onbeforelightbox.md) 및 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 이벤트를 차단하여 편집 가능 여부를 수동으로 제어
- 작업이 로드, 생성, 업데이트될 때마다(즉, [onTaskLoading](api/event/ontaskloading.md), [onTaskCreated](api/event/ontaskcreated.md), [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 사용) 'editable_property'를 동적으로 업데이트

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.editable = task.has_owner && task.editable && task.text;
    return true;
});
~~~

