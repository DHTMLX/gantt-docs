---
title: "선택 컨트롤"
sidebar_label: "선택 컨트롤"
---

# 선택 컨트롤

드롭다운 목록 상자입니다.

![select_control](/img/select_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"priority", type:"select", options: [ /*!*/
        {key:1, label: "High"},                                               /*!*/
        {key:2, label: "Normal"},                                             /*!*/
        {key:3, label: "Low"}                                                 /*!*/
     ]},                                                                      /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.locale.labels.section_priority = "Priority";
~~~

[선택 컨트롤](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)


## Initialization

다음 단계에 따라 라이트박스에 **select** 컨트롤을 추가합니다:

1) 라이트박스 구성에 섹션을 추가합니다:

~~~js
var opts = [
    {key:1, label: "High"},                                            
    {key:2, label: "Normal"},                                         
    {key:3, label: "Low"}                                            
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},      /*!*/                                                                 
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) 섹션에 대한 라벨을 설정합니다:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~

  
  

[선택 컨트롤](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)


## Properties

다음 속성은 주로 **select** 컨트롤에 대해 중요하고 일반적으로 설정됩니다(전체 목록은 [여기](api/config/lightbox.md)를 참조하십시오):

- **name** - (*string*) 섹션 이름 
- **height** - (*number*) 섹션 높이
- **map_to** - (*string*) 섹션에 매핑될 데이터 속성의 이름
- **type** - (*string*) [섹션 컨트롤](guides/default-edit-form.md#lightboxcontrols) 유형
- **focus** - (*boolean*) true로 설정되면 라이트박스를 열 때 해당 섹션에 포커스가 적용됩니다
- **options** - (*array*) 객체 배열. 컨트롤의 선택 옵션을 정의합니다 (*select*, **checkbox** 및 **radio** 컨트롤에 사용됩니다*). 배열의 각 객체는 단일 옵션을 지정하며 다음 속성을 가집니다:
    - **key** - (*string*) 옵션 ID. 이 속성은 태스크 데이터 속성과 비교되어 옵션이 태스크에 할당됩니다
    - **label** - (*string*) 옵션 라벨
- **default_value** - (*any*) 섹션 컨트롤의 기본 값. 입력 값이 정의되지 않은 경우에만 적용됩니다    
- **onchange** - (*function*) 섹션 컨트롤에 대한 ['onChange' 이벤트 핸들러 함수](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)를 지정합니다 


## 데이터를 사용하여 컨트롤 채우기

일반적으로 **select** 컨트롤의 값을 설정하려면 [options](api/config/lightbox.md) 매개변수를 사용합니다:

~~~js
gantt.config.lightbox.sections = [
    { name:"priority",height:22, map_to:"priority",type:"select",
      options: [ 
        {key:1, label: "High"},                                               
        {key:2, label: "Normal"},                                             
        {key:3, label: "Low"}                                                
    ]}                                                                    
];
~~~

[options](api/config/lightbox.md) 매개변수의 항목은 2개의 필수 속성을 가집니다:

- **key** - 옵션 ID
- **label** - 옵션 라벨


## 서버에서 데이터를 사용하여 컨트롤 채우기

서버에서 컨트롤을 채우려면 [options](api/config/lightbox.md) 옵션을 [serverList](api/method/serverlist.md) 메서드가 반환하는 값으로 설정합니다:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", ...},
    { name:"priority",map_to:"priority",type:"select",
        options:gantt.serverList("priority")}, /*!*/
    {name:"category", map_to:"category", type:"select", 
        options:gantt.serverList("category")}, /*!*/
    {name:"time", ...}
];
gantt.init("gantt_here");
gantt.load("/data");
~~~

다음은 **/data** URL의 출력 예시입니다:

~~~js
{
  "tasks":[
    {"id":1,"text":"Project #2","start_date":"01-04-2020","duration":18,"parent":0},
    {"id":2,"text":"Task #1","start_date":"02-04-2020","duration":8,"parent":1},
    {"id":3,"text":"Task #2","start_date":"11-04-2020","duration":8,"parent":1}
  ],
  "links":[
    {"id":1,"source":1,"target":2,"type":"1"},
    {"id":2,"source":2,"target":3,"type":"0"}
  ],
  "collections": { /*!*/
    "priority":[
        {"value":"1","label":"Low"},
        {"value":"2","label":"Medium"},
        {"value":"3","label":"High"}
    ],
    "category":[
        {"value":"1","label":"Simple"},
        {"value":"2","label":"Complex"},
        {"value":"3","label":"Unknown"}
    ]
  }
}
~~~

### Loading options via dhtmlxConnector

다음은 [dhtmlxConnector](integrations/php/howtostart-connector.md) 초기화 예시입니다:

~~~php
//data.php
<?php
    include('connector-php/codebase/gantt_connector.php');
 
    $res = new PDO("mysql:host=localhost;dbname=gantt", "root", "");

    $list = new OptionsConnector($res);
    $list->render_table("priorities","id","id(value),name(label)");
    
    $gantt = new JSONGanttConnector($res);
    $gantt->set_options("priority", $list);
    $gantt->render_links("gantt_links","id","source_task(source),
                    target_task(target),type");    
    $gantt->render_table("gantt_tasks","id","start_date,duration,text,progress,
                    sortorder,parent");
?>
~~~