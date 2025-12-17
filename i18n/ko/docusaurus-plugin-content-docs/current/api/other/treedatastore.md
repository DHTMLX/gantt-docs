---
sidebar_label: treeDatastore
title: treeDatastore config
description: "treeDatastore 메서드들의 모음"
---

# treeDatastore

### Description

@short: TreeDatastore 메서드들의 모음

@signature: treeDatastore: TreeDatastoreMethods

### Example

~~~jsx

~~~

### Details

**_참고_**, Tasks와 Links는 표준 [Gantt API](api/api-overview.md)를 통해 업데이트해야 합니다. datastore 내에서 직접적으로 tasks나 links를 변경하면 예기치 않은 동작이 발생할 수 있습니다. Datastore는 주로 리소스나 기타 커스텀 객체를 위한 용도로 설계되었습니다.

새로운 datastore는 [createDatastore](api/method/createdatastore.md) 메서드를 사용하여 생성할 수 있습니다.

TreeDatastore는 [Datastore](api/other/datastore.md)에서 상속받으며, 모든 메서드를 포함합니다.
**treeDatastore** 객체의 확장된 API는 다음 [메서드](#methods)와 [이벤트](#events)를 제공합니다:

### 메서드 {#methods}

<ul><li>
  	<b>move (sid, tindex, parent): boolean | void</b> - 아이템을 새 위치나 부모로 이동합니다
  <ul>
  	<li><b><i>sid</i></b> - (<i>string | number</i>) - 이동할 아이템의 식별자</li>
  	<li><b><i>tindex</i></b> - (<i>number</i>) - 아이템이 배치될 브랜치 내 목표 인덱스</li>
  	<li><b><i>parent?</i></b> - (<i>string | number</i>) - 새 부모의 id. 제공되면, <b>tindex</b>는 이 부모 브랜치 기준입니다</li>
  </ul>
  <i>onBeforeItemMove</i> 이벤트에서 이동이 취소되면 <i>false</i>를 반환하며, 그렇지 않으면 <i>undefined</i>를 반환합니다.
</li></ul>

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
<br>
<br>
 <i>treeDatastore.move()의 대응 함수는 [gantt.moveTask()](api/method/movetask.md)입니다.</i>
  <br><i>이 메서드는 [onBeforeItemMove](#onBeforeItemMove), [onAfterItemMove](#onAfterItemMove) 이벤트와 [refresh](api/other/datastore.md#refresh) 메서드 관련 모든 이벤트를 발생시킵니다.</i>


<ul><li><b>getBranchIndex (id): number</b> - 아이템이 속한 브랜치 내 인덱스를 가져옵니다<ul><li><b><i>id</i></b> - (<i>string | number</i>) - 아이템 식별자</li>
=</ul></li></ul>

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

store.getBranchIndex(8);
// -> 1
~~~
<br>
<br>
 <i>treeDatastore.getBranchIndex()의 대응 함수는 [gantt.getTaskIndex()](api/method/gettaskindex.md)입니다.</i>
</ul>


<ul><li>
  <b>hasChild (id): number | void</b> - 지정된 아이템이 자식 아이템을 가지고 있는지 확인합니다
  <ul> <li><b><i>id</i></b> - (<i>string | number</i>) - 아이템 식별자</li></ul>
  자식 아이템이 있으면 <i>number</i> (자식 수)를 반환하며, 없으면 <i>undefined</i>를 반환합니다.
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

store.hasChild(1);
// -> true

store.hasChild(9);
// -> false
~~~
<br>
<br>
 <i>treeDatastore.hasChild()의 대응 함수는 [gantt.hasChild()](api/method/haschild.md)입니다.</i>
</ul>

<ul><li>
  <b>getChildren (id): Array&lt;number | string | object&gt;</b> - 지정된 부모 브랜치의 직접 자식 아이템들을 가져옵니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 부모 브랜치의 id</li>
  </ul>
  자식 아이템들의 id 배열을 반환합니다.
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

store.getChildren(3);
// -> [9, 10]

store.getChildren(9);
// -> [0]
~~~
<br>
<br>
 <i>treeDatastore.getChildren()의 대응 함수는 [gantt.getChildren()](api/method/getchildren.md)입니다.</i>
</ul>

<ul><li>
  <b>isChildOf (childId, parentId): boolean</b> - 아이템이 다른 아이템의 자식인지 확인합니다
  <ul>
  <li><b><i>childId</i></b> - (<i>string | number</i>) - 잠재적 자식 아이템의 id</li>
  <li><b><i>parentId</i></b> - (<i>string | number</i>) - 잠재적 부모 아이템의 id</li>
  </ul>
  지정된 부모의 자식이면 <i>true</i>, 아니면 <i>false</i>를 반환합니다.
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

store.isChildOf(9, 3);
// -> true

store.getChildren(9, 2);
// -> false
~~~
<br>
<br>
 <i>treeDatastore.isChildOf()의 대응 함수는 [gantt.isChildOf()](api/method/ischildof.md)입니다.</i>
</ul>

<ul><li>
  <b>getSiblings (id): Array&lt;number | string | object&gt;</b> - 지정된 아이템과 같은 레벨의 형제 아이템들을 포함하여 가져옵니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 아이템의 id</li>
  </ul>
  아이템의 형제 id 배열을 반환합니다.
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

store.getSiblings(1);
// -> [1,2,3,4]

store.getSiblings(6);
// -> [6]
~~~
<br>
<br>
 <i>treeDatastore.getSiblings()의 대응 함수는 [gantt.getSiblings()](api/method/getsiblings.md)입니다.</i>
</ul>

<ul><li>
  <b>getNextSibling (id): number | string | null</b> - 같은 레벨에서 다음 형제 아이템의 id를 반환합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 현재 아이템의 id</li>
  </ul>
  다음 형제 아이템의 id를 반환하며, 없으면 <i>null</i>을 반환합니다.
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

store.getNextSibling(9);
// -> 10

store.getNextSibling(10);
// -> null
~~~
<br>
<br>
 <i>treeDatastore.getNextSibling()의 대응 함수는 [gantt.getNextSibling()](api/method/getnextsibling.md)입니다.</i>
</ul>

<ul><li>
  <b>getPrevSibling (id): number | string | null</b> - 같은 레벨에서 이전 형제 아이템의 id를 반환합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 현재 아이템의 id</li>
  </ul>
  이전 형제 아이템의 id를 반환하며, 없으면 <i>null</i>을 반환합니다.
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

store.getPrevSibling(9);
// -> null

store.getPrevSibling(10);
// -> 9
~~~
<br>
<br>
 <i>treeDatastore.getPrevSibling()의 대응 함수는 [gantt.getPrevSibling()](api/method/getprevsibling.md)입니다.</i>
</ul>

<ul><li>
  <b>getParent (id): number| string</b> - 부모 아이템의 id를 반환하며, 없으면 0을 반환합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 아이템 id</li>
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

store.getParent(9);
// -> 3

store.getParent(1);
// -> 0
~~~
<br>
<br>
 <i>treeDatastore.getParent()의 대응 함수는 [gantt.getParent()](api/method/getparent.md)입니다.</i>
</ul>

<ul><li>
  <b>calculateItemLevel (item): number</b> - 아이템의 중첩 레벨을 계산합니다
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - 아이템 객체</li>
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

store.calculateItemLevel(store.getItem(9));
// -> 1

store.calculateItemLevel(store.getItem(1));
// -> 0
~~~
<br>
<br>
 <i>treeDatastore.calculateItemLevel()의 대응 함수는 [gantt.calculateTaskLevel()](api/method/calculatetasklevel.md)입니다.</i>
</ul>

<ul><li>
        <b>setParent (item, newParentId): void</b> - `parentProperty` 설정(기본값 "item.parent")에 정의된 속성을 업데이트하여 아이템에 새 부모를 할당합니다.
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - 아이템 객체</li>
  <li><b><i>newParentId</i></b> - (<i>string | number | null</i>) - 새 부모의 id</li>
  </ul>
</li></ul>

<ul>

:::note

아이템을 올바르게 다른 부모로 이동하려면 **treeDatastore.move()**를 사용하세요. **setParent()** 메서드는 아이템의 속성만 업데이트하며 내부 트리 구조에는 영향을 주지 않습니다.
 
:::

~~~js
gantt.createDatastore({
    name: gantt.config.resource_store,
    type: "treeDatastore",
    parentProperty: "parent", //
    initItem: function (item) {
        item.parent = item.parent || gantt.config.root_id;
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
<br>
<br>
 <i>treeDatastore.setParent()의 대응 함수는 [gantt.setParent()](api/method/setparent.md)입니다.</i>
</ul>

<ul><li>
  <b>eachItem (callback, parentId): void</b> - 지정된 아이템의 모든 자식들을 순회합니다
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - 각 아이템에 대해 실행할 함수</li>
  <li><b><i>parentId?</i></b> - (<i>string | number</i>) - 시작할 부모 id</li>
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

store.eachItem(function(item){
    console.log(item.text);
});
~~~
<br>
<br>
 <i>treeDatastore.eachItem()의 대응 함수는 [gantt.eachTask()](api/method/eachtask.md)입니다.</i>
</ul>

<ul><li>
  <b>eachParent (callback, startItem): void</b> - 지정된 아이템의 모든 부모 아이템을 순회합니다
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - 각 부모에 대해 실행할 함수</li>
  <li><b><i>startItem</i></b> - (<i>string | number</i>) - 부모를 순회할 아이템의 id</li>
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

store.eachParent(function(item){
    console.log(item.text);
}, 10);
// -> "Sales"
~~~
<br>
<br>
 <i>treeDatastore.eachParent()의 대응 함수는 [gantt.eachParent()](api/method/eachparent.md)입니다.</i>
</ul>

<ul><li>
  <b>open (id): void</b> - 지정된 id의 브랜치를 확장합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 브랜치 id</li>
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

store.open(1);
~~~
<br>
<br>
 <i>treeDatastore.open()의 대응 함수는 [gantt.open()](api/method/open.md)입니다.</i>
<i>이벤트 [onItemOpen](#onItemOpen)을 트리거합니다.</i>
</ul>

<ul><li>
  <b>close (id): void</b> - 지정된 id의 브랜치를 축소합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 브랜치 id</li>
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

store.close(1);
~~~
<br>
<br>
 <i>treeDatastore.close()의 대응 함수는 [gantt.close()](api/method/close.md)입니다.</i>
  <i>이벤트 [onItemClose](#onItemClose)을 트리거합니다.</i>
</ul>

<ul><li>
  <b>sort (field, desc, parent, silent): void</b> - 리소스 그리드의 아이템들을 정렬합니다
  <ul>
  <li><b><i>field</i></b> - (<i>string | Function</i>) - 정렬할 컬럼명 또는 커스텀 정렬 함수</li>
  <li><b><i>desc?</i></b> - (<i>boolean</i>) - 정렬 순서: 내림차순이면 <i>true</i>, 오름차순이면 <i>false</i> (기본값 <i>false</i>)</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - 특정 브랜치 내에서만 정렬할 부모 id</li>
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

// 정렬 방향 토글 및 컬럼 기준 리소스 정렬
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~
<br>

:::note
**Related example:** [Gantt. 컬럼별 리소스 정렬](https://snippet.dhtmlx.com/gypniv9e)
:::

<br><br>
또는 커스텀 정렬 함수를 사용할 수 있습니다:

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

:::note
**Related example:** [Gantt. 커스텀 함수로 리소스 정렬](https://snippet.dhtmlx.com/fvjivly5)
:::

<br><br>
 <i>treeDatastore.sort()의 대응 함수는 [gantt.sort()](api/method/sort.md)입니다.</i>
</ul>

### 이벤트 {#events}

<ul id="onBeforeItemMove">
  <li>
  <b>onBeforeItemMove (id, parent, tindex)</b> - 아이템이 새 위치로 이동되기 전에 발생합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 이동할 아이템의 id</li>
  <li><b><i>parent</i></b> - (<i>string | number</i>) - 새 부모의 id</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - 부모 브랜치 내 목표 인덱스</li>
  </ul>
  이동을 막으려면 <i>false</i>를 반환하고, 그렇지 않으면 <i>true</i>를 반환하세요.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeItemMove", function(id, parent, tindex){
    // 여기에 코드 작성
    return true;
});
~~~
<br>
<br>
 <i>treeDatastore의 onBeforeItemMove 이벤트 대응은 Gantt의 [onBeforeTaskMove](api/event/onbeforetaskmove.md) 이벤트입니다.</i>
</ul>

<ul id="onAfterItemMove">
  <li>
  <b>onAfterItemMove (id, parent, tindex)</b> - 아이템 이동 후에 발생합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 이동된 아이템의 id</li>
  <li><b><i>parent</i></b> - (<i>string | number</i>) - 새 부모의 id</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - 부모 브랜치 내 새 인덱스</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterItemMove", function(id, parent, tindex){
    // 여기에 코드 작성
});
~~~
<br>
<br>
 <i>treeDatastore의 onAfterItemMove 이벤트 대응은 Gantt의 [onAfterTaskMove](api/event/onaftertaskmove.md) 이벤트입니다.</i>
</ul>

<ul id="onItemOpen">
  <li>
  <b>onItemOpen (id)</b> - 브랜치가 확장될 때 발생합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 브랜치 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemOpen", function(id){
    // 여기에 코드 작성
});
~~~
<br>
<br>
 <i>treeDatastore의 onItemOpen 이벤트 대응은 Gantt의 [onTaskOpened](api/event/ontaskopened.md) 이벤트입니다.</i>
</ul>

<ul id="onItemClose">
  <li>
  <b>onItemClose (id)</b> - 브랜치가 축소될 때 발생합니다
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 브랜치 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemClose", function(id){
    // 여기에 코드 작성
});
~~~
<br>
<br>
 <i>treeDatastore의 onItemClose 이벤트 대응은 Gantt의 [onTaskClosed](api/event/ontaskclosed.md) 이벤트입니다.</i>
</ul>

### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [datastore](api/other/datastore.md)

### Related Guides
- [리소스 관리](guides/resource-management.md)

