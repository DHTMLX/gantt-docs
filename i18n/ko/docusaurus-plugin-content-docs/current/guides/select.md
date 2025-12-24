---
title: "Select Control"
sidebar_label: "Select Control"
---

# Select Control


드롭다운 리스트 박스입니다.

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


[Select control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)


## 초기화


**select** 컨트롤을 lightbox에 포함하려면 다음과 같이 진행합니다:

1) lightbox 설정에 섹션을 추가합니다:

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

2) 섹션에 라벨을 지정합니다:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~
    
        

[Select control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/12_select.html)



## 속성


아래는 **select** 컨트롤에서 자주 설정되는 주요 속성입니다 (전체 목록은 [여기](api/config/lightbox.md)에서 확인하세요):

- **name** - (*string*) 섹션의 이름
- **height** - (*number*) 섹션의 높이
- **map_to** - (*string*) 섹션에 매핑되는 데이터 속성명
- **type** - (*string*) [section control](guides/default-edit-form.md#lightboxcontrols)의 타입
- **focus** - (*boolean*) *true*일 때 lightbox가 열릴 때 해당 섹션에 포커스가 이동
- **options** - (*array*) select 컨트롤 옵션을 정의하는 객체 배열 (**select**, **checkbox**, **radio** 컨트롤에서 사용). 각 객체는 하나의 옵션을 나타내며 다음을 포함:
    - **key** - (*string*) 옵션 ID, 태스크 데이터 속성과 매칭되어 옵션을 할당
    - **label** - (*string*) 옵션 라벨
- **default_value** - (*any*) 입력 값이 undefined일 때 적용되는 기본 값    
- **onchange** - (*function*) 컨트롤의 ['onChange' 이벤트 핸들러 함수](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)


## 컨트롤에 데이터 채우기


**select** 컨트롤의 값을 설정하려면 [options](api/config/lightbox.md) 파라미터를 사용하세요:

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

[options](api/config/lightbox.md) 배열의 각 항목은 다음 두 속성을 가져야 합니다:

- **key** - 옵션 ID
- **label** - 옵션 라벨


## 서버 데이터로 컨트롤 채우기


서버 데이터로 컨트롤을 채우려면 [options](api/config/lightbox.md) 파라미터에 [serverList](api/method/serverlist.md) 메서드에서 반환된 값을 할당하세요:

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

**/data** 엔드포인트의 응답 예시는 아래와 같습니다:

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

### dhtmlxConnector를 통한 옵션 로딩

아래는 [dhtmlxConnector](integrations/php/howtostart-connector.md) 초기화 예시입니다:

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

