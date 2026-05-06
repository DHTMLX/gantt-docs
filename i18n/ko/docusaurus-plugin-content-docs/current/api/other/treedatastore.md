---
sidebar_label: treeDatastore
title: treeDatastore 구성
description: "treeDatastore 메서드 모음"
---

# treeDatastore

### Description

@short: treeDatastore 메서드 모음

@signature: treeDatastore: TreeDatastoreMethods


### Details

**_참고_**, Tasks와 Links는 공통 [Gantt API](api/api-overview.md)를 사용하여 수정해야 합니다. datastore에 Tasks나 Links를 직접 수정하면 예기치 않은 결과가 발생할 수 있습니다. Datastores는 리소스나 기타 커스텀 객체를 위한 용도로 사용될 것으로 기대됩니다.


새로운 datastore는 [createDatastore](api/method/createdatastore.md) 메서드를 사용하여 생성할 수 있습니다.


TreeDatastore는 [Datastore](api/other/datastore.md)를 확장하며, 그 모든 메서드를 포함합니다. **treeDatastore** 객체의 확장된 API는 아래의 [methods](#methods)와 [events](#events) 를 제공합니다:


## Methods

- **move (sid, tindex, parent): boolean | void** - 항목을 새로운 위치나 새 부모로 이동시킵니다
    - **_sid_** - (*string \| number*) - 이동할 아이템의 아이디
    - **_tindex_** - (*number*) - 아이템이 이동될 위치의 인덱스(브랜치 내의 인덱스)
    - **_parent?_** - (*string \| number*) - 선택적 부모 아이디. 지정되면 tindex는 '부모' 브랜치의 인덱스를 참조합니다
    - onBeforeItemMove로 작업이 취소되면 false를 반환하고, 그렇지 않으면 undefined를 반환합니다.

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


store.move(6, -1, 2);// 'John'을 'QA'에서 'Development'로 이동
~~~


The twin of treeDatastore.move() is [gantt.moveTask()](api/method/movetask.md).

Calls the onBeforeItemMove, onAfterItemMove events, and all events of the refresh method.


#### **getBranchIndex (id): number** - 브랜치에서 아이템의 인덱스를 반환합니다
- **_id_** - (*string \| number*) - 아이템의 아이디

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


store.getBranchIndex(8);
// -> 1
~~~


The twin of treeDatastore.getBranchIndex() is [gantt.getTaskIndex()](api/method/gettaskindex.md).


- **hasChild (id): number | void** - 지정된 아이템이 자식 아이템을 갖고 있는지 확인합니다
    - **_id_** - (*string \| number*) - 아이템의 아이디
    - 존재하는 경우 자식 작업의 수를 반환하고, 그렇지 않으면 undefined를 반환합니다.

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


store.hasChild(1);
// -> true


store.hasChild(9);
// -> false
~~~


The twin of treeDatastore.hasChild() is gantt.hasChild().


- **getChildren (id): Array\<number \| string \| object\>** - 지정된 부모 브랜치의 1단계 자식 아이템을 반환합니다
    - **_id_** - (*string \| number*) - 부모 브랜치의 아이디
    - Returns an array of children's ids.

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


store.getChildren(3);
// -> [9, 10]


store.getChildren(9);
// -> [0]
~~~


The twin of treeDatastore.getChildren() is gantt.getChildren().


- **isChildOf (childId, parentId): boolean** - childId가 parentId의 자식 아이템인지 확인합니다
    - **_childId_** - (*string \| number*) - 자식으로 확인하고 싶은 아이템의 아이디
    - **_parentId_** - (*string \| number*) - 부모 아이템의 아이디
    - Returns true if the item is a child of the specified parent item, otherwise false.

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


store.isChildOf(9, 3);
// -> true


store.getChildren(9, 2);
// -> false
~~~


The twin of treeDatastore.isChildOf() is [gantt.isChildOf()](api/method/ischildof.md).


- **getSiblings (id): Array\<number \| string \| object\>** - 지정된 아이템의 형제들을 반환합니다(자신 포함)
    - **_id_** - (*string \| number*) - 아이템의 아이디
    - Returns an array with the ids of the item's siblings.

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


store.getSiblings(1);
// -> [1,2,3,4]


store.getSiblings(6);
// -> [6]
~~~


The twin of treeDatastore.getSiblings() is [gantt.getSiblings()](api/method/getsiblings.md).


- **getNextSibling (id): number \| string \| null** - 같은 레벨의 다음 아이템의 아이디를 반환합니다
    - **_id_** - (*string \| number*) - 아이템의 아이디
    - Returns the id of the next sibling or null.

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
store.getNextSibling(9);
// -> 10


store.getNextSibling(10);
// -> null
~~~


The twin of treeDatastore.getNextSibling() is [gantt.getNextSibling()](api/method/getnextsibling.md).


- **getPrevSibling (id): number \| string \| null** - 같은 레벨의 이전 아이템의 아이디를 반환합니다
    - **_id_** - (*string \| number*) - 아이템의 아이디
    - Returns the id of the previous sibling or null.

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
store.getPrevSibling(9);
// -> null


store.getPrevSibling(10);
// -> 9
~~~


The twin of treeDatastore.getPrevSibling() is [gantt.getPrevSibling()](api/method/getprevsibling.md).


- **getParent (id): number \| string** - 아이템의 부모 아이디를 반환하거나 0을 반환합니다
    - **_id_** - (*string \| number*) - 아이템의 아이디

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
store.getParent(9);
// -> 3


store.getParent(1);
// -> 0
~~~


The twin of treeDatastore.getParent() is [gantt.getParent()](api/method/getparent.md).


- **calculateItemLevel (item): number** - 아이템의 중첩 레벨을 계산합니다
    - **_item_** - (*object*) - 아이템의 객체

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
store.calculateItemLevel(store.getItem(9));
// -> 1


store.calculateItemLevel(store.getItem(1));
// -> 0
~~~


The twin of treeDatastore.calculateItemLevel() is [gantt.calculateTaskLevel()](api/method/calculatetasklevel.md).


- **setParent (item, newParentId): void** - 아이템의 부모를 설정합니다. 부모 아이디는 구성의 `parentProperty` 설정에 의해 지정된 속성에 기록되며 기본값으로 "item.parent"에 기록됩니다
    - **_item_** - (*object*) - 아이템의 객체
    - **_newParentId_** - (*string \| number \| null*) - 부모의 아이디

:::note
참고: 다른 부모로 태스크를 이동하려면 **treeDatastore.move()**를 사용하세요. **setParent()** 메서드는 구성에 의해 지정된 속성에 값을 기록하기만 할 뿐 트리의 내부 상태를 업데이트하지 않습니다.
:::

~~~js
gantt.createDatastore({
    name: gantt.config.resource_store,
    type: "treeDatastore",
    parentProperty: "parent", //
    initItem: function (item) {
        item.parent = item.parent \|\| gantt.config.root_id;
        item[gantt.config.resource_property] = item.parent;
        item.open = true;
        return item;
    }
});


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
store.setParent(store.getItem(9), 4);
// -> 3
~~~


The twin of treeDatastore.setParent() is [gantt.setParent()](api/method/setparent.md).


- **eachItem (callback, parentId): void** - 특정 아이템의 모든 자식에 대해 반복합니다
    - **_callback_** - (*Function*) - 콜백 함수
    - **_parentId?_** - (*string \| number*) - 선택적, 부모 아이디

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
store.eachItem(function(item){
    console.log(item.text);
});
~~~


The twin of treeDatastore.eachItem() is [gantt.eachTask()](api/method/eachtask.md).


- **eachParent (callback, startItem): void** - 지정된 아이템의 모든 상위 아이템을 반복합니다
    - **_callback_** - (*Function*) - 콜백 함수
    - **_startItem_** - (*string \| number*) - 시작 아이템의 아이디, 상위 아이템을 순회합니다

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
store.eachParent(function(item){
    console.log(item.text);
}, 10);
// -> "Sales"
~~~


The twin of treeDatastore.eachParent() is [gantt.eachParent()](api/method/eachparent.md).


- **open (id): void** - 지정된 아이디의 브랜치를 엽니다
    - **_id_** - (*string \| number*) - 브랜치 아이디

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
store.open(1);
~~~


The twin of treeDatastore.open() is [gantt.open()](api/method/open.md).

Calls the onItemOpen event.


- **close (id): void** - 브랜치를 닫습니다
    - **_id_** - (*string \| number*) - 브랜치 아이디

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
store.close(1);
~~~


The twin of treeDatastore.close() is [gantt.close()](api/method/close.md).

Calls the onItemClose event.


- **sort (field, desc, parent, silent): void** - 리소스 그리드를 정렬합니다
    - **_field_** - (*string \| Function*) - 리소스 그리드가 정렬될 열의 이름 또는 커스텀 정렬 함수
    - **_desc?_** - (*boolean*) - 선택적이며 정렬 방향을 지정합니다: true - 내림차순, false - 오름차순. 기본값은 false
    - **_parent?_** - (*string \| number*) - 선택적, 부모 아이디. 해당 브랜치에서만 정렬하려면 지정합니다
    - **_silent?_** - (*boolean*) - 선택적이며 재정렬 후 렌더링 여부를 지정합니다

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

// 열로 리소스 그리드를 정렬합니다
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~


:::note
샘플: [Gantt. 열에 따라 리소스 정렬하기 ](https://snippet.dhtmlx.com/gypniv9e )
:::

또는 커스텀 함수로 정렬할 수 있습니다:

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


:::note
샘플: [Gantt. 커스텀 함수로 리소스 정렬하기 ](https://snippet.dhtmlx.com/fvjivly5)
:::

The twin of treeDatastore.sort() is [gantt.sort()](api/method/sort.md).


## Events

- **onBeforeItemMove (id, parent, tindex)** - 아이템이 새로운 위치로 이동하기 전에 발생합니다
    - **_id_** - (*string \| number*) - 이동할 아이템의 아이디
    - **_parent_** - (*string \| number*) - 부모 아이디
    - **_tindex_** - (*number*) - 아이템이 이동될 부모 브랜치의 위치 인덱스
    - 기본 동작의 이벤트를 막으려면 false를 반환하고, 그렇지 않으면 true를 반환합니다.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeItemMove", function(id, parent, tindex){
    // 여기에 코드 작성
    return true;
});
~~~


The twin of the onBeforeItemMove event of treeDatastore is the [onBeforeTaskMove](api/event/onbeforetaskmove.md) event of Gantt.


- **onAfterItemMove (id, parent, tindex)** - 아이템이 새 위치로 이동한 후에 발생합니다
    - **_id_** - (*string \| number*) - 이동할 아이템의 아이디
    - **_parent_** - (*string \| number*) - 부모 아이디
    - **_tindex_** - (*number*) - 아이템이 이동될 부모 브랜치의 위치 인덱스

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterItemMove", function(id, parent, tindex){
    // 여기에 코드 작성
});
~~~


The twin of the onAfterItemMove event of treeDatastore is the [onAfterTaskMove](api/event/onaftertaskmove.md) event of Gantt.


- **onItemOpen (id)** - 브랜치를 열 때 발생합니다
    - **_id_** - (*string \| number*) - 브랜치의 아이디

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemOpen", function(id){
    // 여기에 코드 작성
});
~~~


The twin of the onItemOpen event of treeDatastore is the [onTaskOpened](api/event/ontaskopened.md) event of Gantt.


- **onItemClose (id)** - 브랜치를 닫을 때 발생합니다
    - **_id_** - (*string \| number*) - 브랜치의 아이디

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemClose", function(id){
    // 여기에 코드 작성
});
~~~


The twin of the onItemClose event of treeDatastore is the [onTaskClosed](api/event/ontaskclosed.md) event of Gantt.


### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [datastore](api/other/datastore.md)


### Related Guides
- [Resource Management](guides/resource-management.md)