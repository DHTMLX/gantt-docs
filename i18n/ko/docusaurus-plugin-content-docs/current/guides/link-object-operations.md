---
title: "링크 객체/Id 가져오기"
sidebar_label: "링크 객체/Id 가져오기"
---

# 링크 객체/Id 가져오기

간트 차트에서 링크를 다루려면 링크의 객체나 id를 얻는 방법을 알아야 합니다. 우선,
대부분의 메서드는 링크의 객체(id)를 매개변수로 사용합니다. 둘째, 링크에 대한 커스텀 시나리오는
링크의 객체(id)를 참조하지 않고서는 구현될 수 없습니다.

## 링크 객체 얻기

링크 객체를 얻으려면 [getLink](api/method/getlink.md) 메서드를 사용하세요:

~~~js
gantt.getLink("link1");                //-> {id:"link1", source:1, target:2, type:1}
~~~

## 간트 차트에서 모든 링크 가져오기

차트에 표시된 모든 링크를 가져오려면 [getLinks](api/method/getlinks.md) 메서드를 아래와 같이 사용합니다:

~~~js
var links = gantt.getLinks(); 
~~~

이는 링크 객체의 배열을 반환합니다.

## 특정 작업과 관련된 링크 가져오기

특정 작업과 연관된 링크를 가져오려면 작업 객체의 **$source**, **$target** 속성을 사용하세요.

 이 속성들은 자동으로 생성되며 관련 링크의 아이디를 저장합니다:

- **$source** - 작업에서 나가는 링크
- **$target** - 작업으로 들어오는 링크

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 출발하는 링크의 아이디  /*!*/
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - 들어오는 링크의 아이디   /*!*/
~~~

**task.$source** 와 **task.$target** 는 [동적 속성](guides/loading.md#dataproperties)이며 태스크에 연결된 링크의 아이디를 담고 있습니다. 이 속성들은 데이터베이스에 저장되지 않고 데이터가 로드된 후 동적으로 태스크 객체에 추가됩니다.

~~~js
const task = gantt.getTask(1);
const source = task.$source;
// 태스크에서 나오는 링크들,
// `task #1`은 이러한 관계에서 선행자

source.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: 1, target: targetTaskId, ...}
});

const target = task.$target;
// 태스크로 들어오는 링크들,
// `task #1`은 이러한 관계에서 후속자

target.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: sourceTaskId, target: 1, ...}
});
~~~

## 링크 id 얻기

일반적으로 데이터 세트의 *links* 객체에서 링크의 id를 얻을 수 있습니다. 

~~~js
{
    tasks:[...],
    links:[
        { id:1, source:1, target:2, type:"1"},                       //link's id = 1 /*!*/
        { id:2, source:2, target:3, type:"0"},                       //link's id = 2 /*!*/
        { id:3, source:3, target:4, type:"0"}                        //link's id = 3 /*!*/
    ]
}
~~~


특정 "*target*", "*source*" 또는 "*type*" 값으로 링크의 id를 얻고 싶다면 아래와 같은 방법을 사용하세요:

~~~js
//task id="1"에서 시작하여 task id="2"로 가는 링크를 찾는 예
var links = gantt.serialize().links;                             //returns all links
for(var i="0;i<links.length;" i++){                              //goes over all links
   if ( (links[i].source == 1) && (links[i].target == 2) )
       var linkId = links[i].id;
};
~~~

## 링크 id 변경

현재 링크의 id를 변경하려면 [changeLinkId](api/method/changelinkid.md) 메서드를 사용합니다:
~~~js
gantt.changeLinkId(1274, "link14");          //changes the link id: 1274 -> "link14"
~~~