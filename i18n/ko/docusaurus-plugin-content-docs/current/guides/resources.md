---
title: "리소스 컨트롤"
sidebar_label: "리소스 컨트롤"
---

리소스 컨트롤
===================

:::info
이 기능은 PRO Edition에만 포함되어 있습니다.
:::

이 컨트롤은 [여러 리소스와 해당 수량을 작업에 할당](guides/resource-management.md#assigningresources)할 수 있도록 설계된 다목적 컨트롤입니다.

![Resources control server options](/img/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name:"owner",height:60, type:"resources", default_value:8},   /*!*/
 {name: "time", type: "duration", map_to: "auto"}
];
~~~


[Assign multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)


또는,

![Resources control options](/img/resources_control2.png)

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources",map_to:"rooms", options:[  /*!*/
        { key: 1, label: "room 1", unit: "hours" },    /*!*/
      { key: 2, label: "room 2", unit: "hours" },   /*!*/
      { key: 3, label: "room 3", unit: "hours" }   /*!*/
    ]  /*!*/
  }       /*!*/
];

gantt.locale.labels.section_rooms = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)


:::note
[여러 리소스를 작업에 할당하는 사용자 지정 컨트롤을 생성](guides/custom-editor.md#customthirdpartyeditor)하는 것도 가능합니다.
:::

초기화
------------

**resources** 컨트롤을 lightbox에 포함하려면 다음 단계를 따르세요:

1. lightbox 설정에 섹션을 추가합니다:

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources" }       /*!*/
];
~~~

2. 섹션에 대한 레이블을 정의합니다:

~~~js
gantt.locale.labels.section_resources = "Rooms";
~~~


[Resources control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/13_resources.html)



속성
-------------

**resources** 컨트롤에 일반적으로 설정되는 주요 속성은 다음과 같습니다 (전체 목록은 [여기](api/config/lightbox.md)에서 확인할 수 있습니다):

- **name** - (*string*) 섹션의 이름
- **map_to** - (*string*) 섹션에 매핑되는 데이터 속성 이름
- **type** - (*string*) [섹션](guides/default-edit-form.md#lightboxcontrols)에 대한 컨트롤 유형
- **options** - (*array*) 컨트롤의 선택 옵션을 정의하는 객체 배열 (*select*, *checkbox*, *radio*, *resources* 컨트롤에서 사용). 각 객체는 다음을 포함합니다:
    - **key** - (*string*) 옵션 id, 작업 데이터 속성과 매칭됨
    - **label** - (*string*) 옵션 레이블
    - **unit** - (*number*) 리소스의 단위
- **focus** - (*boolean*) true이면 lightbox가 열릴 때 섹션에 포커스가 감
- **default_value** - (*any*) 컨트롤의 기본값, 리소스 값이 정의되지 않았을 때 사용. 각 옵션마다 개별 기본값 지정 가능

:::note
기본적으로 리소스 컨트롤은 [resource_property](api/config/resource_property.md)에서 정의된 속성에 매핑되므로, **map_to**를 명시하지 않아도 됩니다.
:::
:::note
기본적으로 리소스 컨트롤은 [리소스 데이터스토어](guides/resource-management.md#workingwithresourceviewpanel)의 `gantt.serverList("resourceOptions")` [컬렉션](api/method/serverlist.md)에서 자동으로 옵션을 불러옵니다. 이 동작을 변경하려면 옵션을 수동으로 지정해야 합니다.
:::

컨트롤에 데이터 채우기
-------------------------------

v8.0부터 리소스 컨트롤은 [리소스 데이터스토어](guides/resource-management.md#workingwithresourceviewpanel)에서 자동으로 옵션을 가져옵니다.

Gantt에서 제공하는 기본 리소스 데이터스토어를 사용할 경우 **options** 파라미터 없이 초기화된 [resource control](guides/resources.md)은 **gantt.serverList("resourceOptions")** 컬렉션에 연결되며, 이 컬렉션은 데이터스토어에서 가져온 리소스로 채워집니다. 코드에서 옵션에 접근하려면 아래와 같이 사용합니다:

~~~js
const options = gantt.serverList("resourceOptions");
~~~

옵션 배열은 데이터스토어에 리소스가 로드되기 전까지 비어 있다는 점에 유의하세요.

또한, 아래와 같이 사용자 지정 옵션 목록으로 이 컬렉션을 업데이트할 수 있습니다:

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

이 컬렉션을 업데이트한 후에 gantt에 리소스를 다시 로드하면, 변경사항이 덮어써질 수 있습니다.

lightbox에 표시될 리소스를 제어하려면 **gantt.config.resources.lightbox_resources** 설정을 재정의하세요:

~~~js
gantt.config.resources = {
    lightbox_resources: function selectResourceControlOptions(resources){
          const lightboxOptions = [];
          resources.forEach(function(res) {
             if (!gantt.$resourcesStore.hasChild(res.id)) {
                const copy = gantt.copy(res);
                copy.key = res.id;
                copy.label = res.text;
                lightboxOptions.push(copy);
             }
          });
          return lightboxOptions;
       }
};
~~~

리소스 데이터스토어를 수동으로 생성하는 경우, 리소스 컨트롤 옵션을 직접 채워야 합니다.

일반적으로 **resources** 컨트롤에 값을 설정하려면 [options](api/config/lightbox.md) 파라미터를 사용하세요:

~~~js
gantt.config.lightbox.sections = [
    { name:"rooms",type:"resources",map_to:"rooms",
        options:[
            { key: 1, label: "room 1", unit: "hours" },
            { key: 2, label: "room 2", unit: "hours" },
            { key: 3, label: "room 3", unit: "hours" }
        ]
    }
];
~~~

[options](api/config/lightbox.md) 배열의 각 항목은 다음을 포함해야 합니다:

- **key** - 옵션 id
- **label** - 옵션 레이블
- **unit** - 리소스의 단위


서버에서 데이터로 컨트롤 채우기
---------------------------------------------

서버에서 데이터를 받아 컨트롤을 채우려면 [options](api/config/lightbox.md) 속성을 [serverList](api/method/serverlist.md) 메서드가 반환하는 값으로 설정하세요:

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name: "resources", type: "resources", map_to: "owner_id", default_value:8,
     options: gantt.serverList("resourceOptions")},
 {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
gantt.load("/data");
~~~


`gantt.serverList("resourceOptions")`의 내용은 [updateCollection](api/method/updatecollection.md) 메서드를 사용하여 옵션이 준비될 때 설정할 수 있습니다:

~~~js
gantt.updateCollection("resourceOptions", [
    { key: 1, label: "room 1", unit: "hours" },
    { key: 2, label: "room 2", unit: "hours" },
    { key: 3, label: "room 3", unit: "hours" }
])
~~~



[Assign multiple resources](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)


