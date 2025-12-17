---
title: "링크 객체/ID 가져오기"
sidebar_label: "링크 객체/ID 가져오기"
---

링크 객체/ID 가져오기
============================================
Gantt 차트에서 링크를 다룰 때, 링크 객체 또는 id에 접근하는 방법을 이해하는 것이 중요합니다. 대부분의 메서드는 입력 파라미터로 링크 객체(또는 id)를 필요로 합니다. 또한, 사용자 정의 링크 관련 시나리오에서도 링크 객체나 id를 참조해야 올바르게 동작합니다.

링크 객체 가져오기
--------------------------
링크 객체를 가져오기 위해서는 [getLink](api/method/getlink.md) 메서드를 사용하세요:

~~~js
gantt.getLink("link1");                //-> {id:"link1", source:1, target:2, type:1}
~~~

Gantt 차트에서 모든 링크 가져오기 
------------------------------------------------
차트에 현재 표시 중인 모든 링크를 얻으려면 [getLinks](api/method/getlinks.md) 메서드를 다음과 같이 사용하세요:

~~~js
var links = gantt.getLinks(); 
~~~

이 메서드는 모든 링크 객체를 포함하는 배열을 반환합니다.

특정 작업과 관련된 링크 가져오기
------------------------------------------
특정 작업과 연결된 링크를 찾으려면, 작업 객체의 **$source** 및 **$target** 속성을 확인하세요.

이 속성들은 자동으로 생성되며 관련 링크의 id를 저장합니다:

- **$source** - 해당 작업에서 시작되는 링크들입니다.
- **$target** - 해당 작업으로 들어오는 링크들입니다.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 해당 작업에서 나가는 링크의 id  /*!*/
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - 해당 작업으로 들어오는 링크의 id  /*!*/
~~~

**task.$source** 및 **task.$target**는 [작업 객체의 동적 속성](guides/loading.md#dataproperties)으로, 작업에 연결된 링크의 id를 포함합니다. 이 속성들은 데이터베이스에 저장되지 않으며, 데이터가 로드될 때 동적으로 작업 객체에 추가됩니다.

~~~js
const task = gantt.getTask(1);
const source = task.$source;
// 작업에서 시작되는 링크들
// `task #1`이 선행 작업이 되는 관계입니다

source.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: 1, target: targetTaskId, ...}
});

const target = task.$target;
// 작업을 향하는 링크들
// `task #1`이 후속 작업이 되는 관계입니다

target.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: sourceTaskId, target: 1, ...}
});
~~~

링크 id 가져오기
--------------------------
일반적으로 링크의 id는 데이터셋의 *links* 객체 안에 있습니다.

~~~js
{
    tasks:[...],
    links:[
        { id:1, source:1, target:2, type:"1"},                       //링크의 id = 1 /*!*/
        { id:2, source:2, target:3, type:"0"},                       //링크의 id = 2 /*!*/
        { id:3, source:3, target:4, type:"0"}                        //링크의 id = 3 /*!*/
    ]
}
~~~





특정 "*target*", "*source*", 또는 "*type*" 값을 가진 링크의 id를 찾으려면 다음과 같은 방법을 사용할 수 있습니다:

~~~js
// id="1인" 작업에서 id="2인" 작업으로 가는 링크를 찾기
var links = gantt.serialize().links;                             // 모든 링크 반환
for(var i="0;" i < links.length; i++){                             // 모든 링크 반복
   if ( (links[i].source == 1) && (links[i].target == 2) )
       var linkId = links[i].id;
};
~~~

링크 id 변경하기
-------------------------------
기존 링크의 id를 업데이트하려면 [changeLinkId](api/method/changelinkid.md) 메서드를 사용하세요:

~~~js
gantt.changeLinkId(1274, "link14");          // 1274에서 "link14"로 링크 id 변경
~~~

