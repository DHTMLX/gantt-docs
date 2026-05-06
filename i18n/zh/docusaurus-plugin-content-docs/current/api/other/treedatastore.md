---
sidebar_label: treeDatastore
title: treeDatastore config
description: "一组 treeDatastore 方法"
---


# treeDatastore

### Description

@short: 一组 treeDatastore 方法

@signature: treeDatastore: TreeDatastoreMethods


### Details

**_注意_**，任务（Tasks）和链接（Links）应通过标准的 [Gantt API](api/api-overview.md) 进行更新。直接在 datastore 中更改任务或链接可能导致意外行为。Datastore 主要用于资源或其他自定义对象。

您可以使用 [createDatastore](api/method/createdatastore.md) 方法创建一个新的 datastore。

TreeDatastore 繼承自 [Datastore](api/other/datastore.md)，並擁有其所有方法。

**treeDatastore** 物件的擴充 API 提供以下[方法](#methods)和[事件](#events)：


## Methods

- **move (sid, tindex, parent): boolean | void** - 将项移动到新位置或新父级
    - **_sid_** - (*string \| number*) - 要移动的项的 id
    - **_tindex_** - (*number*) - 项将移动到的位置的索引（分支中的索引）
    - **_parent?_** - (*string \| number*) - 可选，父项 id。如果指定，tindex 将指向在 'parent' 分支中的索引
    - 当使用 onBeforeItemMove 取消操作时返回 false，否则返回 undefined。

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


store.move(6, -1, 2);// 将 'John' 从 'QA' 移动到 'Development'
~~~


treeDatastore.move() 的对等方法是 [gantt.moveTask()](api/method/movetask.md).

调用 onBeforeItemMove、onAfterItemMove 事件，以及 refresh 方法的所有事件。


#### **getBranchIndex (id): number** - 返回项在分支中的索引
- **_id_** - (*string \| number*) - 要查询的项的 id

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


treeDatastore.getBranchIndex() 的对等方法是 [gantt.getTaskIndex()](api/method/gettaskindex.md).


- **hasChild (id): number | void** - 检查指定项是否有子项
    - **_id_** - (*string \| number*) - 项的 id
    - 如果存在子任务，则返回子任务数量，否则返回 undefined。

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


treeDatastore.hasChild() 的对等方法是 gantt.hasChild().


- **getChildren (id): Array\<number \| string \| object\>** - 返回指定父分支的第一层子项
    - **_id_** - (*string \| number*) - 父分支的 id
    - 返回子项的 id 数组。

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


treeDatastore.getChildren() 的对等方法是 [gantt.getChildren()](api/method/getchildren.md).


- **isChildOf (childId, parentId): boolean** - 检查某项是否是另一项的子项
    - **_childId_** - (*string \| number*) - 要检查是否为子项的项的 id
    - **_parentId_** - (*string \| number*) - 要检查是否为父项的项的 id
    - 如果该项是指定父项的子项，则返回 true；否则返回 false。

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


treeDatastore.isChildOf() 的对等方法是 [gantt.isChildOf()](api/method/ischildof.md).


- **getSiblings (id): Array\<number \| string \| object\>** - 返回指定项的同级项（包括自身）
    - **_id_** - (*string \| number*) - 项的 id
    - 返回包含该项同级项 id 的数组。

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


treeDatastore.getSiblings() 的对等方法是 [gantt.getSiblings()](api/method/getsiblings.md).


- **getNextSibling (id): number \| string \| null** - 返回同一层级中的下一个项的 id
    - **_id_** - (*string \| number*) - 项的 id
    - 返回下一个同级项的 id 或 null。

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


treeDatastore.getNextSibling() 的对等方法是 [gantt.getNextSibling()](api/method/getnextsibling.md).


- **getPrevSibling (id): number \| string \| null** - 返回同一层级中的前一个项的 id
    - **_id_** - (*string \| number*) - 项的 id
    - 返回前一个同级项的 id 或 null。

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


treeDatastore.getPrevSibling() 的对等方法是 [gantt.getPrevSibling()](api/method/getprevsibling.md).


- **getParent (id): number \| string** - 返回父项的 id，若无父项则返回 0
    - **_id_** - (*string \| number*) - 项的 id

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


treeDatastore.getParent() 的对等方法是 [gantt.getParent()](api/method/getparent.md).


- **calculateItemLevel (item): number** - 计算项的嵌套层级
    - **_item_** - (*object*) - 项的对象

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


treeDatastore.calculateItemLevel() 的对等方法是 [gantt.calculateTaskLevel()](api/method/calculatetasklevel.md).


- **setParent (item, newParentId): void** - 为一个项设置父项。父项的 id 将写入配置中 `parentProperty` 指定的属性，默认值为 "item.parent"
    - **_item_** - (*object*) - 项的对象
    - **_newParentId_** - (*string \| number \| null*) - 父项的 id

:::note
使用 **treeDatastore.move()** 将任务移动到不同的父项。**setParent()** 方法只是将值写入配置中指定的属性，它不会更新树的内部状态。
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


treeDatastore.setParent() 的对等方法是 [gantt.setParent()](api/method/setparent.md).


- **eachItem (callback, parentId): void** - 遍历指定项的所有子项
    - **_callback_** - (*Function*) - 回调函数
    - **_parentId?_** - (*string \| number*) - 可选，父项的 id

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


treeDatastore.eachItem() 的对等方法是 [gantt.eachTask()](api/method/eachtask.md).


- **eachParent (callback, startItem): void** - 遍历指定项的所有父项
    - **_callback_** - (*Function*) - 回调函数
    - **_startItem_** - (*string \| number*) - 要遍历其父项的项的 id

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


treeDatastore.eachParent() 的对等方法是 [gantt.eachParent()](api/method/eachparent.md).


- **open (id): void** - 打开指定 id 的分支
    - **_id_** - (*string \| number*) - 分支的 id

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


treeDatastore.open() 的对等方法是 [gantt.open()](api/method/open.md).

调用 onItemOpen 事件。


- **close (id): void** - 关闭指定 id 的分支
    - **_id_** - (*string \| number*) - 分支的 id

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


treeDatastore.close() 的对等方法是 [gantt.close()](api/method/close.md).

调用 onItemClose 事件。


- **sort (field, desc, parent, silent): void** - 对资源网格中的项进行排序
    - **_field_** - (*string \| Function*) - 资源网格将按其排序的列名，或自定义排序函数
    - **_desc?_** - (*boolean*) - 可选，指定排序方向：true - 降序，false - 升序。默认值为 false
    - **_parent?_** - (*string \| number*) - 可选，父项的 id。仅在该分支中排序
    - **_silent?_** - (*boolean*) - 可选，指定重新排序后是否应调用渲染

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


// 通过某列对资源网格排序
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~


:::note
sample: [Gantt. Sorting resources by the column ](https://snippet.dhtmlx.com/gypniv9e )
:::


或者你也可以为排序定义一个自定义函数：


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
samle: [Gantt. Sorting resources by a custom function ](https://snippet.dhtmlx.com/fvjivly5)
:::


treeDatastore.sort() 的对等方法是 [gantt.sort()](api/method/sort.md).


## Events

- **onBeforeItemMove (id, parent, tindex)** - 在项被移动到新位置之前触发
    - **_id_** - (*string \| number*) - 要移动的项的 id
    - **_parent_** - (*string \| number*) - 父项的 id
    - **_tindex_** - (*number*) - 项将在父分支中的新位置的索引
    - 返回 false 以阻止事件的默认动作，否则为 true。

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeItemMove", function(id, parent, tindex){
    // 你的代码在这里
    return true;
});
~~~


treeDatastore.onBeforeItemMove 事件的对等事件是 Gantt 的 [onBeforeTaskMove](api/event/onbeforetaskmove.md)。


- **onAfterItemMove (id, parent, tindex)** - 在项移动到新位置后触发
    - **_id_** - (*string \| number*) - 要移动的项的 id
    - **_parent_** - (*string \| number*) - 父项的 id
    - **_tindex_** - (*number*) - 项将在父分支中的新位置的索引

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterItemMove", function(id, parent, tindex){
    // 你的代码在这里
});
~~~


treeDatastore.onAfterItemMove 事件的对等事件是 Gantt 的 [onAfterTaskMove](api/event/onaftertaskmove.md)。


- **onItemOpen (id)** - 打开某个分支时触发
    - **_id_** - (*string \| number*) - 分支的 id

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemOpen", function(id){
    // 你的代码在这里
});
~~~


treeDatastore.onItemOpen 事件的对等事件是 Gantt 的 [onTaskOpened](api/event/ontaskopened.md)。


- **onItemClose (id)** - 关闭某个分支时触发
    - **_id_** - (*string \| number*) - 分支的 id

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemClose", function(id){
    // 你的代码在这里
});
~~~


treeDatastore.onItemClose 事件的对等事件是 Gantt 的 [onTaskClosed](api/event/ontaskclosed.md)。


### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [datastore](api/other/datastore.md)


### Related Guides
- [Resource Management](guides/resource-management.md)