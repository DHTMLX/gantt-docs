---
sidebar_label: datastore
title: datastore config
description: "datastore 메서드 모음"
---

# datastore

### Description

@short: 데이터스토어 메서드 모음

@signature: datastore: DatastoreMethods

### Details

**_참고_**, 태스크(Task)와 링크(Link)는 공통 [Gantt의 API](api/api-overview.md)를 사용하여 수정해야 합니다. 데이터스토어에서 태스크나 링크를 직접 수정하면 예기치 않은 결과가 발생할 수 있습니다. 데이터스토어는 리소스나 기타 커스텀 객체를 위한 용도로 사용될 것으로 기대됩니다.

새로운 데이터스토어는 [createDatastore](api/method/createdatastore.md) 메서드를 사용하여 생성할 수 있습니다. 
**datastore** 객체는 아래의 [methods](#methods) 및 [events](#events) 를 가집니다:

## Methods

### parse (data): void 
배열에서 데이터를 로드합니다

**Parameters**:
- `data` - (Array\<object\>) - 로드할 데이터

**Example**:
~~~js
gantt.$resourcesStore.parse([
    { id: 1, text: "QA", parent: null },
    { id: 2, text: "Development", parent: null },
    { id: 3, text: "Sales", parent: null },
    { id: 4, text: "Other", parent: null },
    { id: 5, text: "Unassigned", parent: 4 },
    { id: 6, text: "John", parent: 1 },
    { id: 7, text: "Mike", parent: 2 },
    { id: 8, text: "Anna", parent: 2 },
    { id: 9, text: "Bill", parent: 3 },
    { id: 10, text: "Floe", parent: 3 }
]);
~~~

:::note
샘플
[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
:::

 datastore.parse()의 동등한 기능은 [gantt.parse()](api/method/parse.md)입니다.
  
다음 이벤트들([onBeforeParse](#onbeforeparse-data), [onItemLoading](#onitemloading-item), [onParse](#onparse-data), [onStoreUpdated](#onstoreupdated-id-item-action))을 발생시킵니다.

---

### getItem (id)
아이템을 해당 id로 조회합니다

**Parameters**:
- `id` - (string | number) - 아이템의 id

**Returns**: object | void - 아이템 객체

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const resource = store.getItem(resourceId);
~~~

:::note
샘플
[Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
:::

 datastore.getItem()의 동등한 쌍은 [gantt.getTask()](api/method/gettask.md) 및 [gantt.getLink()](api/method/getlink.md)입니다.

---

### updateItem (id, item)
지정된 아이템을 업데이트합니다

**Parameters**:
- `id` - (string | number) - 아이템의 id
- `item` - (object) - 아이템 객체

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const resource = store.getItem(resourceId);
resource.text = "modified";
store.updateItem(resourceId);
// 또는
store.updateItem(resourceId, { text: "modified" });
~~~

 datastore.updateItem()의 동등한 쌍은 [gantt.updateTask()](api/method/updatetask.md) 및 [gantt.updateLink()](api/method/updatelink.md)입니다.

다음 이벤트들([onBeforeUpdate](#onbeforeupdate-id-item), [onAfterUpdate](#onafterupdate-id-item) 및 [onStoreUpdated](#onstoreupdated-id-item))을 발생시킵니다.

---

### removeItem (id)
지정된 아이템을 제거합니다

**Parameters**:
- `id` - (string | number) - 아이템의 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.removeItem(resourceId);
~~~

 datastore.removeItem()의 동등한 쌍은 [gantt.deleteTask()](api/method/deletetask.md) 및 [gantt.deleteLink()](api/method/deletelink.md)입니다.

다음 이벤트들([onBeforeDelete](#onbeforedelete-id-item), [onAfterDelete](#onafterdelete-id-item) 및 [onStoreUpdated](#onstoreupdated-id-item-action))을 발생시킵니다.

---

### isVisible (id)
지정된 아이템이 필터로 보이는지 여부를 확인합니다

**Parameters**:
- `id` - (string | number) - 아이템의 id

**Returns**: boolean - 보이면 true, 그렇지 않으면 false

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
if(store.isVisible(resourceId)){
    console.log(resourceId);
}
~~~

 datastore.isVisible()의 쌍은 [gantt.isTaskVisible()](api/method/istaskvisible.md)입니다.

---

### getVisibleItems ()
보이는 아이템의 배열을 반환합니다

**Returns**: Array\<object\> - 보이는 아이템의 배열

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const items = store.getVisibleItems();
~~~

---

### addItem (item, index)
데이터스토어에 새 아이템을 추가합니다

**Parameters**:
- `item` - (object) - 아이템 객체
- `index` - (number) - 아이템이 추가될 위치(0 이상)

**Returns**: number | string - 아이템의 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemId = store.addItem({
    text: "Unassigned",
    parent:4
});
~~~

 datastore.addItem()의 동등한 쌍은 [gantt.addTask()](api/method/addtask.md) 및 [gantt.addLink()](api/method/addlink.md)입니다.

다음 이벤트들([onBeforeAdd](#onbeforeadd-id-item), [onAfterAdd](#onafteradd-id-item) 및 [onStoreUpdated](#onstoreupdated-id-item-action))을 발생시킵니다.

---

### changeId (oldId, newId)
아이템의 id를 변경합니다

**Parameters**:
- `oldId` - (string | number) - 현재 아이템의 id
- `newId` - (string | number) - 새로운 아이템의 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

const itemId = store.addItem({
    text: "Unassigned",
    parent:4
});

// itemId - 새 아이템의 임시 클라이언트 측 id
// 데이터베이스에 저장되면 새 id로 업데이트합니다:

store.changeId(itemId, "databaseId");
~~~

 datastore.changeId()의 동등한 쌍은 [gantt.changeTaskId()](api/method/changetaskid.md) 및 [gantt.changeLinkId()](api/method/changelinkid.md)입니다.
 
onIdChange 이벤트를 발생시킵니다.

---

### exists (id)
데이터스토어에 지정된 아이템이 존재하는지 확인합니다

**Parameters**:
- `id` - (string | number) - 아이템의 id

**Returns**: boolean - 존재하면 true, 그렇지 않으면 false

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

if(store.exists(resourceId)){
    console.log(resourceId);
}
~~~

 datastore.exists()의 쌍은 [gantt.isTaskExists()](api/method/istaskexists.md) 및 [gantt.isLinkExists()](api/method/islinkexists.md)입니다.

---

### move (sindex, tindex)
아이템을 새로운 위치로 이동합니다

**Parameters**:
- `sindex` - (number) - 현재 위치의 인덱스
- `tindex` - (number) - 아이템이 이동할 목표 위치의 인덱스

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

// 두 아이템을 교환
const idA = 1;
const idB = 5;
const indexA = store.getIndexById(idA);
const indexB = store.getIndexById(idB);
store.move(indexB, indexA);

indexA = store.getIndexById(idA);
store.move(indexA, indexB);
~~~

 datastore.move()의 동등한 쌍은 [gantt.moveTask()](api/method/movetask.md)입니다.
  
onStoreUpdated 이벤트를 호출합니다.

---

### clearAll ()
데이터스토어를 지웁니다

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.clearAll();
~~~

 datastore.clearAll()의 동등한 쌍은 [gantt.clearAll()](api/method/clearall.md)입니다.
  
다음 이벤트들([onClearAll](#onclearall-), [onBeforeStoreUpdate](#onbeforestoreupdate-id-item-action) 및 [onStoreUpdated](#onstoreupdated-id-item-action))을 발생시킵니다.

---

### silent (callback)
API 이벤트를 트리거하지 않고 코드를 실행합니다

**Parameters**:
- `callback` - (Function) - 콜백 함수

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.silent(function(){
    store.eachItem(function(item){
        item.text += " modified";
        store.updateItem(item.id);
    });
});
store.refresh();
~~~

 datastore.silent()의 동등한 쌍은 [gantt.silent()](api/method/silent.md)입니다.

---

### refresh (id)
지정된 레코드의 이벤트를 다시 그리도록 요청하고 필터를 적용합니다

**Parameters**:
- `id` - (string | number) - 선택적, 레코드의 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.refresh(itemId); // 아이템 다시 그리기
store.refresh(); // 모든 아이템 다시 그리기
~~~

 datastore.refresh()의 동등한 쌍은 [gantt.refreshTask()](api/method/refreshtask.md) 및 [gantt.refreshLink()](api/method/refreshlink.md)입니다.
  
다음 이벤트들([onBeforeStoreUpdate](#onbeforestoreupdate-id-item-action), [onBeforeFilter](#onbeforefilter-), [onFilterItem](#onfilteritem-id-item), [onFilter](#onfilter-) 및 [onStoreUpdated](#onstoreupdated-id-item-action))을 발생시킵니다.

---

### count ()
현재 데이터스토어에 로드된 아이템의 수를 반환합니다

**Returns**: number - 아이템 수

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onParse", function(){
    alert(store.count() + " items loaded");
});
~~~

 datastore.count()의 쌍은 [gantt.getTaskCount()](api/method/gettaskcount.md) 및 [gantt.getLinkCount()](api/method/getlinkcount.md)입니다.

---

### countVisible ()
현재 보이는 아이템의 수를 반환합니다

**Returns**: number - 보이는 아이템 수

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
alert(store.countVisible() + " items are visible");
~~~

 datastore.countVisible()의 쌍은 [gantt.getVisibleTaskCount()](api/method/getvisibletaskcount.md)입니다.

---

### eachItem (callback)
데이터스토어의 모든 태스크를 순회합니다

**Parameters**:
- `callback` - (Function) - 콜백 함수

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

let searchItems = [];
store.eachItem(function(item){
    if(!item.value){
        searchItems.push(item);
    }
});
~~~

 datastore.eachItem()의 쌍은 [gantt.eachTask()](api/method/eachtask.md)입니다.

---

### filter ()
필터를 실행하고 보이는 아이템 배열을 업데이트합니다

일반적으로 이 메서드를 직접 호출할 필요가 없으며, store.refresh() 메서드에서 자동으로 호출됩니다.

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.filter();
~~~

---

### sort (field, desc, parent, silent)
리소스 그리드를 정렬합니다

**Parameters**:
- `field` - (string | Function) - 열 이름 또는 커스텀 정렬 함수
- `desc` - (boolean) - 정렬 방향: true - 내림차순, false - 오름차순
- `parent` - (string | number) - 상위 아이템의 id
- `silent` - (boolean) - 재정렬 후 렌더링을 수행할지 여부

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.parse([
    { id: 1, text: "QA", parent: null },
    { id: 2, text: "Development", parent: null },
    { id: 3, text: "Sales", parent: null },
    { id: 4, text: "Other", parent: null },
    { id: 5, text: "Unassigned", parent: 4 },
    { id: 6, text: "John", parent: 1 },
    { id: 7, text: "Mike", parent: 2 },
    { id: 8, text: "Anna", parent: 2 },
    { id: 9, text: "Bill", parent: 3 },
    { id: 10, text: "Floe", parent: 3 }
]);

// 열 기준으로 리소스 그리드 정렬
let resourceSortDirection = false;

function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~

또한 정렬을 위한 커스텀 함수를 정의할 수 있습니다:

~~~js
let resourceSortDirection = false;

function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort(function (resource1, resource2){
        return resource1.id - resource2.id;
    }, resourceSortDirection)
    gantt.render();
}
~~~

 datastore.sort()의 동등한 쌍은 [gantt.sort()](api/method/sort.md)입니다.

---

### getIndexRange (from, to)
지정된 인덱스 사이의 레코드를 반환합니다

**Parameters**:
- `from` - (number) - 시작 레코드의 위치
- `to` - (number) - 끝 레코드의 위치

**Returns**: Array\<object\> - 아이템 배열

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemsInViewPort = store.getIndexRange(5, 10);// 5번째부터 10번째까지 아이템 얻기
~~~

---

### getItems ()
데이터스토어의 모든 레코드를 반환합니다

**Returns**: Array\<object\> - 모든 아이템의 배열

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const items = store.getItems();
~~~ 

 datastore.getItems()의 동등한 쌍은 [gantt.getTaskByTime()](api/method/gettaskbytime.md) 및 [gantt.getLinks()](api/method/getlinks.md)입니다.

---

### getIdByIndex (index)
인덱스로 아이템의 id를 반환합니다

**Parameters**:
- `index` - (number) - 아이템의 위치

**Returns**: string | number | void - 아이템 id 또는 undefined

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstItem = store.getIdByIndex(0);
~~~

 datastore.getIdByIndex()의 동등한 쌍은 [gantt.getTaskByIndex()](api/method/gettaskbyindex.md)입니다.

---

### getIndexById (id)
아이템의 id로 위치(index)를 반환합니다

**Parameters**:
- `id` - (string | number) - 아이템의 id

**Returns**: number - 아이템의 인덱스 또는 찾을 수 없으면 -1

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemIndex = store.getIndexById(5);
~~~

 datastore.getIndexById()의 동등한 쌍은 [gantt.getTaskIndex()](api/method/gettaskindex.md)입니다.

---

### getFirst ()
데이터스토어의 첫 아이템의 id를 반환합니다

**Returns**: string | number | null - 첫 아이템의 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstId = store.getFirst();
~~~

---

### getLast ()
데이터스토어의 마지막 아이템의 id를 반환합니다

**Returns**: string | number | null - 마지막 아이템의 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const lastId = store.getLast();
~~~

---

### getNext (id)
데이터스토어의 다음 아이템의 id를 반환합니다

**Parameters**:
- `id` - (string | number) - 아이템의 id

**Returns**: string | number | null - 다음 아이템의 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstId = store.getFirst();
const secondId = store.getNext(firstId);
~~~

 datastore.getNext()의 동등한 쌍은 [gantt.getNext()](api/method/getnext.md)입니다.

---

### getPrev (id)
데이터스토어의 이전 아이템의 id를 반환합니다

**Parameters**:
- `id` - (string | number) - 아이템의 id

**Returns**: string | number | null - 이전 아이템의 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const prevId = store.getPrev(itemId);
~~~

 datastore.getPrev()의 동등한 쌍은 [gantt.getPrev()](api/method/getprev.md)입니다.

---

### destructor ()
데이터스토어를 비우고 모든 부착된 이벤트 핸들러를 제거합니다

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.destructor();
~~~

 datastore.destructor()의 동등한 쌍은 [gantt.destructor()](api/method/destructor.md)입니다.

---

### attachEvent (name, handler, settings)
DataStore의 내부 이벤트에 핸들러를 연결합니다

**Parameters**:
- `name` - (string) - 이벤트 이름, 대소문자 구분 없음
- `handler` - (Function) - 핸들러 함수
- `settings` - (object) - 선택적, 이벤트 핸들러의 설정 객체

**Returns**: string - 이벤트 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});
~~~

 datastore.attachEvent()의 동등한 쌍은 [gantt.attachEvent()](api/method/attachevent.md)입니다.

---

### callEvent (name, params)
내부 이벤트를 호출합니다

**Parameters**:
- `name` - (string) - 이벤트 이름, 대소문자 구분 없음
- `params` - (Array\<any\>) - 이벤트 관련 데이터의 배열

**Returns**: boolean - 이벤트가 성공적으로 완료되면 true

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.callEvent("CustomEvent", [param1, param2]);
~~~

 datastore.callEvent()의 동등한 쌍은 [gantt.callEvent()](api/method/callevent.md)입니다.

---

### detachEvent (id)
이벤트에서 핸들러를 분리합니다

**Parameters**:
- `id` - (string) - 이벤트의 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const handlerId = store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});

// listener 분리
store.detachEvent(handlerId);
~~~

 datastore.detachEvent()의 동등한 쌍은 [gantt.detachEvent()](api/method/detachevent.md)입니다.

---

## Events

### onItemLoading (item)
데이터 원천에서 아이템이 로드될 때 발생합니다

**Parameters**:
- `item` - (object) - 아이템 객체

**Returns**: boolean - 기본 동작을 방지하려면 false를 반환

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemLoading", function(item){
    if(item.valid){ // 커스텀 속성으로 로딩 시 아이템 필터링
        return true;
    }
    return false;
});
~~~

 onItemLoading 이벤트의 쌍은 datastore의 것이고, Gantt의 [onTaskLoading](api/event/ontaskloading.md) 이벤트와 대응합니다.

---

### onBeforeParse (data)
데이터가 파싱되기 전에 발생합니다

**Parameters**:
- `data` - (Array\<any\>) - 로드된 데이터의 배열

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeParse", function(item){
    console.time("StoreParse");
});
store.attachEvent("onParse", function(item){
    console.timeEnd("StoreParse");
});
~~~

 onBeforeParse 이벤트의 쌍은 Gantt의 [onBeforeParse](api/event/onbeforeparse.md) 이벤트입니다.

---

### onParse (data)
데이터가 파싱된 후 렌더링되기 전 발생

**Parameters**:
- `data` - (Array\<any\>) - 로드된 데이터 배열

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeParse", function(item){
    console.time("StoreParse");
});
store.attachEvent("onParse", function(item){
    console.timeEnd("StoreParse");
});
~~~

 onParse 이벤트의 쌍은 Gantt의 onParse 이벤트입니다.

---

### onBeforeUpdate (id, item)
아이템이 업데이트되기 전에 발생

**Parameters**:
- `id` - (string | number) - 아이템의 id
- `item` - (object) - 업데이트된 아이템 객체

**Returns**: boolean - 기본 동작을 방지하려면 false를 반환

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeUpdate", function(id, item){
    // 여기에 코드 작성
    return true;
});
~~~

 onBeforeUpdate 이벤트의 쌍은 Gantt의 [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md) 및 [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) 이벤트와 대응합니다.

---

### onAfterUpdate (id, item)
아이템이 업데이트된 후 발생

**Parameters**:
- `id` - (string | number) - 아이템의 id
- `item` - (object) - 아이템의 객체

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterUpdate", function(id, item){
    // 여기에 코드 작성
});
~~~

 onAfterUpdate 이벤트의 쌍은 Gantt의 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 및 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 이벤트와 대응합니다.

---

### onBeforeDelete (id, item)
아이템이 삭제되기 전에 발생

**Parameters**:
- `id` - (string | number) - 아이템의 id
- `item` - (object) - 아이템의 객체

**Returns**: boolean - 기본 동작을 방지하려면 false를 반환

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeDelete", function(id, item){
    // 여기에 코드 작성
    return true;
});
~~~

 onBeforeDelete 이벤트의 쌍은 Gantt의 [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) 및 [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) 이벤트와 대응합니다.

---

### onAfterDelete (id, item)
아이템이 삭제된 후 발생

**Parameters**:
- `id` - (string | number) - 아이템의 id
- `item` - (object) - 아이템의 객체

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterDelete", function(id, item){
    // 여기에 코드 작성
});
~~~

 onAfterDelete 이벤트의 쌍은 Gantt의 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 및 [onAfterLinkDelete](api/event/onafterlinkdelete.md) 이벤트와 대응합니다.

---

### onBeforeAdd (id, item)
데이터스토어에 새 아이템이 추가되기 전에 발생

**Parameters**:
- `id` - (string | number) - 아이템의 id
- `item` - (object) - 아이템의 객체

**Returns**: boolean - 기본 동작을 방지하려면 false를 반환

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeAdd", function(id, item){
    // 여기에 코드 작성
    return true;
});
~~~

 onBeforeAdd 이벤트의 쌍은 Gantt의 [onBeforeTaskAdd](api/event/onbeforetaskadd.md) 및 [onBeforeLinkAdd](api/event/onbeforelinkadd.md) 이벤트와 대응합니다.

---

### onAfterAdd (id, item)
데이터스토어에 아이템이 추가된 후 발생

**Parameters**:
- `id` - (string | number) - 아이템의 id
- `item` - (object) - 아이템의 객체

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterAdd", function(id, item){
    // 여기에 코드 작성
});
~~~

 onAfterAdd 이벤트의 쌍은 Gantt의 [onAfterTaskAdd](api/event/onaftertaskadd.md) 및 [onAfterLinkAdd](api/event/onafterlinkadd.md) 이벤트와 대응합니다.

---

### onIdChange (id, newId)
아이템의 id가 변경될 때 발생

**Parameters**:
- `id` - (string | number) - 아이템의 id
- `newId` - (string | number) - 아이템의 새로운 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onIdChange", function(oldId, newId){
    // 여기에 코드 작성
});
~~~

 datastore의 onIdChange 이벤트의 쌍은 Gantt의 [onTaskIdChange](api/event/ontaskidchange.md) 이벤트입니다.

---

### onClearAll ()
데이터스토어에서 모든 아이템이 제거된 후 발생

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onClearAll", function(){
    // 여기에 코드 작성
});
~~~

 datastore의 onClearAll 이벤트의 쌍은 Gantt의 [onClear](api/event/onclear.md) 이벤트입니다.

---

### onBeforeStoreUpdate (id, item, action)
데이터스토어가 새로고침되기 전에 발생

**Parameters**:
- `id` - (string | number | null) - 아이템의 id 또는 null
- `item` - (object | null) - 아이템 객체 또는 null
- `action` - (string | null) - 동작 유형("paint", "move", "add", "delete", null)

**Returns**: boolean - 기본 동작을 방지하려면 false를 반환

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeStoreUpdate", function(id, item, action){
    // 여기에 코드 작성
    return true;
});
~~~

---

### onStoreUpdated (id, item, action)
데이터스토어가 새로고침된 후 발생

**Parameters**:
- `id` - (string | number | null) - 아이템의 id 또는 null
- `item` - (object | null) - 아이템 객체 또는 null
- `action` - (string | null) - 동작 유형("paint", "move", "add", "delete", null)

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onStoreUpdated", function(id, item, action){
    // 여기에 코드 작성
});
~~~

---

### onBeforeFilter ()
필터 적용 전 발생

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeFilter", function(){
    console.time("filtering");
});
store.attachEvent("onFilter", function(){
    console.timeEnd("filtering");
});
~~~

---

### onFilter ()
데이터스토어가 필터링 상태를 업데이트한 후 발생

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeFilter", function(){
    console.time("filtering");
});
store.attachEvent("onFilter", function(){
    console.timeEnd("filtering");
});
~~~

---

### onFilterItem (id, item)
필터링 중 각 아이템에 대해 발생

**Parameters**:
- `id` - (string | number) - 아이템의 id
- `item` - (object) - 아이템 객체

**Returns**: boolean - 아이템을 보이지 않게 표시하려면 false를 반환

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onFilterItem", function(id, item){
    // 여기에 코드 작성
    return true;
});
~~~

 datastore의 onFilterItem 이벤트의 쌍은 Gantt의 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 이벤트입니다.

---

### onDestroy () {#ondestroy}
소멸자(destructor)가 호출된 후 발생

**Example**:
~~~js
const datastore = gantt.createDatastore({
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

## Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [treeDatastore](api/other/treedatastore.md)

## Related Guides
- [Resource Management](guides/resource-management.md)