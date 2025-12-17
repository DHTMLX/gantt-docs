---
sidebar_label: datastore
title: datastore config
description: "datastore 메서드 모음"
---

# datastore

### Description

@short: Datastore 메서드 모음

@signature: datastore: DatastoreMethods

### Details

**_참고_**, Tasks와 Links는 표준 [Gantt API](api/api-overview.md)를 통해 관리해야 합니다. datastore 내에서 직접적으로 tasks나 links를 변경하면 예기치 않은 문제가 발생할 수 있습니다. datastore는 주로 리소스나 기타 커스텀 객체를 위한 용도로 설계되었습니다.

[createDatastore](api/method/createdatastore.md) 메서드를 사용하여 새로운 datastore를 생성할 수 있습니다. <br>
**datastore** 객체는 다음과 같은 [메서드](#methods)와 [이벤트](#events)를 제공합니다:

### 메서드 {#methods}

<ul id="parse"><li>
  <b>parse (data): void</b> - 배열로부터 데이터를 로드합니다.
  <ul>
  <li><b><i>data</i></b> - (<i>Array&lt;object&gt;</i>) - 로드할 데이터</li>
  </ul></li>
</ul>

<ul>
~~~js
gantt.$resourcesStore.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);
~~~
<br>
:::note
sample
[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
 
:::
<br>

<br>
 <i>datastore.parse()는 [gantt.parse()](api/method/parse.md)를 보완합니다.</i>
  <br>
 <i>[onBeforeParse](#onBeforeParse), [onItemLoading](#onItemLoading), [onParse](#onParse), 그리고 [onStoreUpdated](#onStoreUpdated) 이벤트를 트리거합니다.</i>
</ul>


<ul id="getItem">
  <li>
  <b>getItem (id): object | void</b> - id로 항목을 조회합니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var resource = store.getItem(resourceId);
~~~
<br>
:::note
sample
[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
 
:::
<br>
<br>
 <i>datastore.getItem()은 [gantt.getTask()](api/method/gettask.md) 및 [gantt.getLink()](api/method/getlink.md)와 대응됩니다.</i>
</ul>

<ul id="updateItem">
  <li>
  <b>updateItem (id, item): void</b> - 지정한 항목을 업데이트합니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  <li><b><i>item?</i></b> - (<i>object</i>) - 업데이트할 속성을 가진 객체</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var resource = store.getItem(resourceId);
resource.text = "modified";
store.updateItem(resourceId);
// or
store.updateItem(resourceId, { text: "modified" });
~~~
<br>
<br>
 <i>datastore.updateItem()은 [gantt.updateTask()](api/method/updatetask.md) 및 [gantt.updateLink()](api/method/updatelink.md)와 유사합니다.</i>
<br>
 <i>[onBeforeUpdate](#onBeforeUpdate), [onAfterUpdate](#onAfterUpdate), 그리고 [onStoreUpdated](#onStoreUpdated) 이벤트를 트리거합니다.</i>

</ul>

<ul id="removeItem">
  <li>
  <b>removeItem (id): void</b> - 지정한 항목을 삭제합니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.removeItem(resourceId);
~~~
<br>
<br>
 <i>datastore.removeItem()은 [gantt.deleteTask()](api/method/deletetask.md) 및 [gantt.deleteLink()](api/method/deletelink.md)와 병행됩니다.</i>
<br>
 <i>[onBeforeDelete](#onBeforeDelete), [onAfterDelete](#onAfterDelete), 그리고 [onStoreUpdated](#onStoreUpdated) 이벤트를 트리거합니다.</i>
</ul>

<ul id="isVisible">
  <li>
  <b>isVisible (id): boolean</b> - 필터에 의해 지정한 항목이 보이는지 숨겨졌는지 판별합니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  </ul>
  항목이 보이면 <i>true</i>, 그렇지 않으면 <i>false</i>를 반환합니다.
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
if(store.isVisible(resourceId)){
    console.log(resourceId);
}
~~~
<br>
<br>
 <i>datastore.isVisible()는 [gantt.isTaskVisible()](api/method/istaskvisible.md)와 비교할 수 있습니다.</i>
</ul>

<ul id="getVisibleItems">
  <li>
  <b>getVisibleItems (): Array&lt;object&gt;</b> - 보이는 항목들의 배열을 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var items = store.getVisibleItems();
~~~
<br>
</ul>


<ul id="addItem">
  <li>
  <b>addItem (item, index): number | string</b> - datastore에 새 항목을 추가합니다.
  <ul><li><b><i>item</i></b> - (<i>object</i>) - 항목 객체</li><li><b><i>index?</i></b> - (<i>number</i>) - 항목이 삽입될 위치 (0 이상)</li></ul>
  추가된 항목의 id를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var itemId = store.addItem({
    text: "Unassigned",
    parent:4
});
~~~
<br>
<br>
 <i>datastore.addItem()은 [gantt.addTask()](api/method/addtask.md) 및 [gantt.addLink()](api/method/addlink.md)에 대응됩니다.</i>
<br>
 <i>[onBeforeAdd](#onBeforeAdd), [onAfterAdd](#onAfterAdd), 그리고 [onStoreUpdated](#onStoreUpdated) 이벤트를 트리거합니다.</i>
</ul>

<ul id="changeId">
  <li>
  <b>changeId (oldId, newId): void</b> - 항목의 id를 업데이트합니다.
  <ul><li><b><i>oldId</i></b> - (<i>string | number</i>) - 현재 id</li><li><b><i>newId</i></b> - (<i>string | number</i>) - 새로 할당할 id</li></ul>
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

var itemId = store.addItem({
    text: "Unassigned",
    parent:4
});

// itemId는 새 항목에 대한 임시 클라이언트 측 id입니다.
// 데이터베이스에 저장된 후 클라이언트에 새 id를 업데이트하세요:

store.changeId(itemId, "databaseId");
~~~
<br>
<br>
 <i>datastore.changeId()는 [gantt.changeTaskId()](api/method/changetaskid.md) 및 [gantt.changeLinkId()](api/method/changelinkid.md)와 유사합니다.</i>
 <br>
 <i>[onIdChange](#onIdChange) 이벤트를 트리거합니다.</i>
</ul>


<ul id="exists">
  <li>
  <b>exists (id): boolean</b> - 지정한 항목이 datastore에 존재하는지 확인합니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  </ul>
  항목이 존재하면 <i>true</i>, 그렇지 않으면 <i>false</i>를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

if(store.exists(resourceId)){
    console.log(resourceId);
}
~~~
<br>
<br>
 <i>datastore.exists()는 [gantt.isTaskExists()](api/method/istaskexists.md) 및 [gantt.isLinkExists()](api/method/islinkexists.md)에 대응됩니다.</i>
</ul>


<ul id="move">
  <li>
  <b>move (sindex, tindex): void</b> - 항목을 새 위치로 이동합니다.
  <ul>
  <li><b><i>sindex</i></b> - (<i>number</i>) - 현재 인덱스</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - 이동할 대상 인덱스</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

// 두 항목 위치 교환
var idA = 1;
var idB = 5;
var indexA = store.getIndexById(idA);
var indexB = store.getIndexById(idB);
store.move(indexB, indexA);

indexA = store.getIndexById(idA);
store.move(indexA, indexB);
~~~
<br>
<br>
  <i>datastore.move()는 [gantt.moveTask()](api/method/movetask.md)와 연동됩니다.</i>
  <br>
  <i>[onStoreUpdated](#onStoreUpdated) 이벤트를 트리거합니다.</i>
</ul>

<ul>
  <li>
  <b>clearAll (): void</b> - datastore를 비웁니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.clearAll();
~~~
<br>
<br>
 <i>datastore.clearAll()은 [gantt.clearAll()](api/method/clearall.md)에 대응됩니다.</i>
  <br>
 <i>[onClearAll](#onClearAll), [onBeforeStoreUpdate](#onBeforeStoreUpdate), 그리고 [onStoreUpdated](#onStoreUpdated) 이벤트를 트리거합니다.</i>

</ul>

<ul id="silent">
  <li>
  <b>silent (callback): void</b> - datastore API 이벤트를 트리거하지 않고 코드를 실행합니다.
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - 콜백 함수</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.silent(function(){
    store.eachItem(function(item){
        item.text += " modified";
        store.updateItem(item.id);
    });
});
store.refresh();
~~~
<br>
<br>
 <i>datastore.silent()는 [gantt.silent()](api/method/silent.md)를 보완합니다.</i>
</ul>

<ul id="refresh">
  <li>
  <b>refresh (id): void</b> - 지정한 레코드의 이벤트를 다시 그리며 필터를 적용합니다.
  <ul>
  <li><b><i>id?</i></b> - (<i>string | number</i>) - 선택적, 레코드의 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.refresh(itemId); // 특정 항목 다시 그리기
store.refresh(); // 모든 항목 다시 그리기
~~~
<br>
<br>
 <i>datastore.refresh()는 [gantt.refreshTask()](api/method/refreshtask.md) 및 [gantt.refreshLink()](api/method/refreshlink.md)에 대응됩니다.</i>
  <br>
 <i>[onBeforeStoreUpdate](#onBeforeStoreUpdate), [onBeforeFilter](#onBeforeFilter), [onFilterItem](#onFilterItem), [onFilter](#onFilter), 그리고 [onStoreUpdated](#onStoreUpdated) 이벤트를 트리거합니다.</i>

</ul>

<ul id="count">
  <li>
  <b>count (): number</b> - 현재 datastore에 로드된 항목 총 개수를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onParse", function(){
    alert(store.count() + " items loaded");
});
~~~
<br>
<br>
 <i>datastore.count()는 [gantt.getTaskCount()](api/method/gettaskcount.md) 및 [gantt.getLinkCount()](api/method/getlinkcount.md)에 대응됩니다.</i>
</ul>

<ul id="countVisible">
  <li>
  <b>countVisible (): number</b> - 현재 보이는 항목 수를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
alert(store.countVisible() + " items are visible");
~~~
<br>
<br>
 <i>datastore.countVisible()는 [gantt.getVisibleTaskCount()](api/method/getvisibletaskcount.md)에 대응됩니다.</i>
</ul>

<ul id="eachItem">
  <li>
  <b>eachItem (callback): void</b> - datastore 내 모든 항목을 순회합니다.
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - 콜백 함수</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

var searchItems = [];
store.eachItem(function(item){
    if(!item.value){
        searchItems.push(item);
    }
});
~~~
<br>
<br>
 <i>datastore.eachItem()는 [gantt.eachTask()](api/method/eachtask.md)에 대응됩니다.</i>
</ul>

<ul id="filter">
  <li>
  <b>filter (): void</b> - 필터를 적용하고 보이는 항목 목록을 업데이트합니다.
</li>
보통 이 메서드는 <b>store.refresh()</b>에 의해 자동으로 호출됩니다.
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.filter();
~~~
<br>
</ul>

<ul id="sort"><li>
  <b>sort (field, desc, parent, silent): void</b> - 리소스 grid의 항목을 정렬합니다.
  <ul>
  <li><b><i>field</i></b> - (<i>string | Function</i>) - 정렬할 컬럼명 또는 커스텀 정렬 함수</li>
  <li><b><i>desc?</i></b> - (<i>boolean</i>) - 정렬 방향: <i>true</i>는 내림차순, <i>false</i>는 오름차순 (기본값은 <i>false</i>)</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - 정렬을 제한할 부모 항목의 id</li>
  <li><b><i>silent?</i></b> - (<i>boolean</i>) - 정렬 후 렌더링을 건너뛸지 여부</li>
  </ul>
</li></ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    {id: 1, text: "QA", parent:null},
    {id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);

// 컬럼별 정렬 방향 토글
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~
<br>

또는 커스텀 정렬 함수를 제공할 수 있습니다:

~~~js
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort(function (resource1, resource2){
        return resource1.id - resource2.id;
    }, resourceSortDirection)
    gantt.render();
}
~~~
<br>
 <i>datastore.sort()는 [gantt.sort()](api/method/sort.md)를 보완합니다.</i>
</ul>

<ul id="getIndexRange">
  <li>
  <b>getIndexRange (from, to): Array&lt;object&gt;</b> - 지정한 인덱스 범위 내의 항목들을 반환합니다.
  <ul>
  <li><b><i>from</i></b> - (<i>number</i>) - 시작 위치</li>
  <li><b><i>to</i></b> - (<i>number</i>) - 종료 위치</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var itemsInViewPort = store.getIndexRange(5, 10); // 5번째부터 10번째 항목들
~~~
<br>
</ul>

<ul id="getItems">
  <li>
  <b>getItems (): Array&lt;object&gt;</b> - datastore의 모든 항목을 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var items = store.getItems();
~~~
<br>
<br>
 <i>datastore.getItems()는 [gantt.getTaskByTime()](api/method/gettaskbytime.md) 및 [gantt.getLinks()](api/method/getlinks.md)에 대응됩니다.</i>
</ul>

<ul id="getIdByIndex">
  <li>
        <b>getIdByIndex (index): string | number | void</b> - 주어진 인덱스의 항목 id를 반환하며, 없으면 `undefined`를 반환합니다.
  <ul>
  <li><b><i>index</i></b> - (<i>number</i>) - 항목 위치</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var firstItem = store.getIdByIndex(0);
~~~
<br>
<br>
 <i>datastore.getIdByIndex()는 [gantt.getTaskByIndex()](api/method/gettaskbyindex.md)에 대응됩니다.</i>
</ul>

<ul id="getIndexById">
  <li>
        <b>getIndexById (id): number</b> - id로 항목의 인덱스를 반환하며, 없으면 `-1`을 반환합니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var itemIndex = store.getIndexById(5);
~~~
<br>
<br>
 <i>datastore.getIndexById()는 [gantt.getTaskIndex()](api/method/gettaskindex.md)에 대응됩니다.</i>
</ul>

<ul id="getFirst">
  <li>
  <b>getFirst (): string | number | null</b> - datastore 내 첫 번째 항목의 id를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var firstId = store.getFirst();
~~~
<br>
<br>
</ul>

<ul id="getLast">
  <li>
  <b>getLast (): string | number | null</b> - datastore 내 마지막 항목의 id를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var lastId = store.getLast();
~~~
<br>
</ul>

<ul id="getNext">
  <li>
  <b>getNext (id): string | number | null</b> - 지정한 항목 다음 항목의 id를 반환합니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 현재 항목 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var firstId = store.getFirst();
var secondId = store.getNext(firstId);
~~~
<br>
<br>
 <i>datastore.getNext()는 [gantt.getNext()](api/method/getnext.md)에 대응됩니다.</i>
</ul>

<ul id="getPrev">
  <li>
  <b>getPrev (id): string | number | null</b> - 지정한 항목 이전 항목의 id를 반환합니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 현재 항목 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var prevId = store.getPrev(itemId);
~~~
<br>
<br>
 <i>datastore.getPrev()는 [gantt.getPrev()](api/method/getprev.md)에 대응됩니다.</i>
</ul>

<ul id="destructor">
  <li>
  <b>destructor (): void</b> - datastore를 초기화하고 모든 이벤트 핸들러를 제거합니다; 이후 datastore는 사용할 수 없습니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.destructor();
~~~
<br>
<br>
 <i>datastore.destructor()는 [gantt.destructor()](api/method/destructor.md)에 대응됩니다.</i>
</ul>


<ul id="attachEvent">
  <li>
  <b>attachEvent (name, handler, settings): string</b> - 내부 datastore 이벤트에 핸들러를 연결합니다.
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - 이벤트 이름, 대소문자 구분 없음</li>
  <li><b><i>handler</i></b> - (<i>Function</i>) - 핸들러 함수</li>
  <li><b><i>settings?</i></b> - (<i>object</i>) - 이벤트 핸들러에 대한 선택적 설정 객체</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});
~~~
<br>
<br>
 <i>datastore.attachEvent()는 [gantt.attachEvent()](api/method/attachevent.md)에 대응됩니다.</i>
</ul>

<ul id="callEvent">
  <li>
  <b>callEvent (name, params): boolean</b> - 내부 이벤트를 트리거합니다.
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - 이벤트 이름, 대소문자 구분 없음</li>
  <li><b><i>params</i></b> - (<i>Array&lt;any&gt;</i>) - 이벤트 관련 데이터 배열</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.callEvent("CustomEvent", [param1, param2]);
~~~
<br>
<br>
 <i>datastore.callEvent()는 [gantt.callEvent()](api/method/callevent.md)에 대응됩니다.</i>
</ul>

<ul id="detachEvent">
  <li>
  <b>detachEvent (id): void</b> - 이전에 연결한 이벤트 핸들러를 제거합니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string</i>) - 이벤트 핸들러의 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var handlerId = store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});

// 이벤트 핸들러 제거
store.detachEvent(handlerId);
~~~
<br>
<br>
 <i>datastore.detachEvent()는 [gantt.detachEvent()](api/method/detachevent.md)에 대응됩니다.</i>
</ul>


### 이벤트 {#events} 

<ul id="onItemLoading">
  <li>
  <b>onItemLoading (item)</b> - 데이터 소스에서 항목이 로드될 때 트리거됩니다.
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - 항목 객체</li>
  </ul>
  기본 이벤트 동작을 중지하려면 <i>false</i>를 반환하고, 그렇지 않으면 <i>true</i>를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemLoading", function(item){
    if(item.valid){ // 커스텀 속성을 기반으로 로드 중 항목 필터링
        return true;
    }
    return false;
});
~~~
<br>
<br>
 <i>datastore의 onItemLoading 이벤트는 Gantt의 [onTaskLoading](api/event/ontaskloading.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="onBeforeParse">
  <li>
  <b>onBeforeParse (data)</b> - 데이터 파싱 시작 전에 트리거됩니다.
  <ul>
  <li><b><i>data</i></b> - (<i>Array &lt;any&gt;</i>) - 로드된 데이터 배열</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeParse", function(item){
    console.time("StoreParse");
});
store.attachEvent("onParse", function(item){
    console.timeEnd("StoreParse");
});
~~~
<br>
<br>
 <i>datastore의 onBeforeParse 이벤트는 Gantt의 [onBeforeParse](api/event/onbeforeparse.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="onParse">
  <li>
  <b>onParse (data)</b> - 파싱 완료 후, Gantt 차트 렌더링 전에 트리거됩니다.
  <ul>
  <li><b><i>data</i></b> - (<i>Array &lt;any&gt;</i>) - 로드된 데이터 배열</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeParse", function(item){
    console.time("StoreParse");
});
store.attachEvent("onParse", function(item){
    console.timeEnd("StoreParse");
});
~~~
<br>
<br>
 <i>datastore의 onParse 이벤트는 Gantt의 [onParse](api/event/onparse.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="onBeforeUpdate">
  <li>
  <b>onBeforeUpdate (id, item)</b> - 항목이 업데이트되기 전에 트리거됩니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 업데이트된 항목 객체</li>
  </ul>
  기본 이벤트 동작을 중지하려면 <i>false</i>를 반환하고, 그렇지 않으면 <i>true</i>를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeUpdate", function(id, item){
    // 여기에 코드 작성
    return true;
});
~~~
<br>
<br>
 <i>datastore의 onBeforeUpdate 이벤트는 Gantt의 [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md) 및 [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="onAfterUpdate">
  <li>
  <b>onAfterUpdate (id, item)</b> - 항목이 업데이트된 후 트리거됩니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 업데이트된 항목 객체</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterUpdate", function(id, item){
    // 여기에 코드 작성
});
~~~
<br>
<br>
 <i>datastore의 onAfterUpdate 이벤트는 Gantt의 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 및 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="onBeforeDelete">
  <li>
  <b>onBeforeDelete (id, item)</b> - 항목이 삭제되기 전에 트리거됩니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 항목 객체</li>
  </ul>
  기본 이벤트 동작을 중지하려면 <i>false</i>를 반환하고, 그렇지 않으면 <i>true</i>를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeDelete", function(id, item){
    // 여기에 코드 작성
    return true;
});
~~~
<br>
<br>
 <i>datastore의 onBeforeDelete 이벤트는 Gantt의 [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) 및 [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="onAfterDelete">
  <li>
  <b>onAfterDelete (id, item)</b> - 항목이 삭제된 후 트리거됩니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 항목 객체</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterDelete", function(id, item){
    // 여기에 코드 작성
});
~~~
<br>
<br>
 <i>datastore의 onAfterDelete 이벤트는 Gantt의 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 및 [onAfterLinkDelete](api/event/onafterlinkdelete.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="onBeforeAdd">
  <li>
  <b>onBeforeAdd (id, item)</b> - datastore에 새 항목이 추가되기 전에 트리거됩니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 항목 객체</li>
  </ul>
  기본 이벤트 동작을 중지하려면 <i>false</i>를 반환하고, 그렇지 않으면 <i>true</i>를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeAdd", function(id, item){
    // 여기에 코드 작성
    return true;
});
~~~
<br>
<br>
 <i>datastore의 onBeforeAdd 이벤트는 Gantt의 [onBeforeTaskAdd](api/event/onbeforetaskadd.md) 및 [onBeforeLinkAdd](api/event/onbeforelinkadd.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="onAfterAdd">
  <li>
  <b>onAfterAdd (id, item)</b> - datastore에 새 항목이 추가된 후 트리거됩니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 항목 객체</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterAdd", function(id, item){
    // 여기에 코드 작성
});
~~~
<br>
<br>
 <i>datastore의 onAfterAdd 이벤트는 Gantt의 [onAfterTaskAdd](api/event/onaftertaskadd.md) 및 [onAfterLinkAdd](api/event/onafterlinkadd.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="onIdChange">
  <li>
  <b>onIdChange (id, newId)</b> - 항목의 id가 변경될 때 트리거됩니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 이전 id</li>
  <li><b><i>newId</i></b> - (<i>string | number</i>) - 새 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onIdChange", function(oldId, newId){
    // 여기에 코드 작성
});
~~~
<br>
<br>
 <i>datastore의 onIdChange 이벤트는 Gantt의 [onTaskIdChange](api/event/ontaskidchange.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="onClearAll">
  <li>
  <b>onClearAll ()</b> - datastore의 모든 항목이 제거된 후 트리거됩니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onClearAll", function(){
    // 여기에 코드 작성
});
~~~
<br>
 <i>datastore의 onClearAll 이벤트는 Gantt의 [onClear](api/event/onclear.md) 이벤트에 대응됩니다.</i>
</ul>


<ul id="onBeforeStoreUpdate">
  <li>
  <b>onBeforeStoreUpdate (id, item, action)</b> - datastore가 갱신되기 전에 트리거됩니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number | null</i>) - 항목 id 또는 null</li>
  <li><b><i>item</i></b> - (<i>object | null</i>) - 항목 객체 또는 null</li>
  <li><b><i>action</i></b> - (<i>string | null</i>) - 작업 유형 ("paint", "move", "add", "delete", null)</li>
  </ul>
  기본 이벤트 동작을 중지하려면 <i>false</i>를 반환하고, 그렇지 않으면 <i>true</i>를 반환합니다.
  <br>
        이 이벤트는 datastore 항목의 재페인팅 필요를 알립니다. `null` 값은 전체 datastore가 업데이트됨을 의미합니다.

</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeStoreUpdate", function(id, item, action){
    // 여기에 코드 작성
    return true;
});
~~~
<br>
</ul>


<ul id="onStoreUpdated">
  <li>
  <b>onStoreUpdated (id, item, action)</b> - datastore가 갱신된 후 트리거됩니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number | null</i>) - 항목 id 또는 null</li>
  <li><b><i>item</i></b> - (<i>object | null</i>) - 항목 객체 또는 null</li>
  <li><b><i>action</i></b> - (<i>string | null</i>) - 작업 유형 ("paint", "move", "add", "delete", null)</li>
  </ul>
        이 이벤트는 datastore 항목의 재페인팅 필요를 알립니다. `null` 값은 전체 datastore가 업데이트됨을 의미합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onStoreUpdated", function(id, item, action){
    // 여기에 코드 작성
});
~~~
<br>
</ul>


<ul id="onBeforeFilter">
  <li>
  <b>onBeforeFilter ()</b> - 필터가 적용되기 전에 트리거됩니다.
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeFilter", function(){
    console.time("filtering");
});
store.attachEvent("onFilter", function(){
    console.timeEnd("filtering");
});
~~~
<br>
</ul>

<ul id="onFilter">
  <li>
  <b>onFilter ()</b> - 필터링 후 보이는 항목이 업데이트된 후 트리거됩니다.
  </li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeFilter", function(){
    console.time("filtering");
});
store.attachEvent("onFilter", function(){
    console.timeEnd("filtering");
});
~~~
<br>
</ul>

<ul id="onFilterItem">
  <li>
        <b>onFilterItem (id, item)</b> - 필터링 중 각 항목에 대해 트리거됩니다; `false`를 반환하면 항목이 숨겨집니다.
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 항목의 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 항목 객체</li>
  </ul>
  항목을 숨기려면 <i>false</i>를 반환하고, 그렇지 않으면 <i>true</i>를 반환합니다.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onFilterItem", function(id, item){
    // 여기에 코드 작성
    return true;
});
~~~
<br>
 <i>datastore의 onFilterItem 이벤트는 Gantt의 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 이벤트에 대응됩니다.</i>
</ul>

<ul id="ondestroy">
  <li>
  <b>onDestroy ()</b> - datastore의 destructor() 메서드 호출 후 트리거됩니다.
</li>
</ul>
<ul>
~~~js
var datastore = gantt.createDatastore({
    name: gantt.config.resource_store,
    type: "treeDatastore",
    initItem: function (item) {
        item.parent = item.parent || gantt.config.root_id;
        item[gantt.config.resource_property] = item.parent;
        item.open = true;
        return item;
    }
});

datastore.attachEvent("onDestroy", function(){
    alert("free custom resources");
});

datastore.destructor();
~~~
<br>
</ul>

### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- [리소스 관리](guides/resource-management.md)

