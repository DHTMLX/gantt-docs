---
sidebar_label: treeDatastore
title: treeDatastore config
description: "一组 treeDatastore 方法的集合"
---

# treeDatastore

### Description

@short: 一组 treeDatastore 方法的集合

@signature: treeDatastore: TreeDatastoreMethods


### Details

**_注意_**，任务（Tasks）和链接（Links）应通过标准的 [Gantt API](api/api-overview.md) 进行更新。直接在 datastore 中更改任务或链接可能导致意外行为。Datastore 主要用于资源或其他自定义对象。

您可以使用 [createDatastore](api/method/createdatastore.md) 方法创建一个新的 datastore。

TreeDatastore 继承自 [Datastore](api/other/datastore.md)，并包含其所有方法。
**treeDatastore** 对象的扩展 API 提供了以下 [方法](#methods) 和 [事件](#events):

### 方法 {#methods}

<ul><li>
  <b>move (sid, tindex, parent): boolean | void</b> - 将一个项目移动到新的位置或父节点
  <ul>
  <li><b><i>sid</i></b> - (<i>string | number</i>) - 要移动的项目标识符</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - 项目将在该分支中的目标索引位置</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - 新父节点的 id。如果提供，<b>tindex</b> 是相对于该父节点分支的索引</li>
  </ul>
  如果被 <b>onBeforeItemMove</b> 取消，返回 <i>false</i>，否则返回 <i>undefined</i>。
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

store.move(6, -1, 2);// 将 'John' 从 'QA' 移动到 'Development'
~~~
<br>
<br>
 <i>treeDatastore.move() 的对应方法是 [gantt.moveTask()](api/method/movetask.md)。</i>
  <br>
  <i>此方法会触发 [onBeforeItemMove](#onBeforeItemMove)、[onAfterItemMove](#onAfterItemMove) 事件，以及所有与 [refresh](api/other/datastore.md#refresh) 方法相关的事件。</i>

</ul>

<ul><li>
  <b>getBranchIndex (id): number</b> - 获取项目在其分支中的索引
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目的标识符</li>
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

store.getBranchIndex(8);
// -> 1
~~~
<br>
<br>
 <i>treeDatastore.getBranchIndex() 的对应方法是 [gantt.getTaskIndex()](api/method/gettaskindex.md)</i>
</ul>


<ul><li>
  <b>hasChild (id): number | void</b> - 判断指定项目是否有子项目
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目的标识符</li>
  </ul>
  如果存在子项目，返回子项目数量（<i>number</i>），否则返回 <i>undefined</i>。

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
 <i>treeDatastore.hasChild() 的对应方法是 [gantt.hasChild()](api/method/haschild.md)。</i>
</ul>

<ul><li>
  <b>getChildren (id): Array&lt;number | string | object&gt;</b> - 获取指定父分支的直接子项目
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 父分支的 id</li>
  </ul>
  返回包含子项目 id 的数组。
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
 <i>treeDatastore.getChildren() 的对应方法是 [gantt.getChildren()](api/method/getchildren.md)。</i>
</ul>

<ul><li>
  <b>isChildOf (childId, parentId): boolean</b> - 判断一个项目是否为另一个项目的子项目
  <ul>
  <li><b><i>childId</i></b> - (<i>string | number</i>) - 潜在子项目的 id</li>
  <li><b><i>parentId</i></b> - (<i>string | number</i>) - 潜在父项目的 id</li>
  </ul>
  如果该项目是指定父项目的子项目，返回 <i>true</i>，否则返回 <i>false</i>。
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
 <i>treeDatastore.isChildOf() 的对应方法是 [gantt.isChildOf()](api/method/ischildof.md)。</i>
</ul>

<ul><li>
  <b>getSiblings (id): Array&lt;number | string | object&gt;</b> - 获取指定项目的兄弟节点（含项目自身）
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目的 id</li>
  </ul>
  返回包含兄弟节点 id 的数组。
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
 <i>treeDatastore.getSiblings() 的对应方法是 [gantt.getSiblings()](api/method/getsiblings.md)。</i>
</ul>

<ul><li>
  <b>getNextSibling (id): number | string | null</b> - 返回同级下一个兄弟节点的 id
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 当前项目的 id</li>
  </ul>
  返回下一个兄弟节点的 id，如果不存在则返回 <i>null</i>。
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
 <i>treeDatastore.getNextSibling() 的对应方法是 [gantt.getNextSibling()](api/method/getnextsibling.md)。</i>
</ul>

<ul><li>
  <b>getPrevSibling (id): number | string | null</b> - 返回同级上一个兄弟节点的 id
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 当前项目的 id</li>
  </ul>
  返回上一个兄弟节点的 id，如果不存在则返回 <i>null</i>。
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
 <i>treeDatastore.getPrevSibling() 的对应方法是 [gantt.getPrevSibling()](api/method/getprevsibling.md)。</i>
</ul>

<ul><li>
  <b>getParent (id): number| string</b> - 返回父项目的 id，如果不存在则返回 0
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目的 id</li>
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
 <i>treeDatastore.getParent() 的对应方法是 [gantt.getParent()](api/method/getparent.md)。</i>
</ul>

<ul><li>
  <b>calculateItemLevel (item): number</b> - 计算项目的嵌套层级
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - 项目对象</li>
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
 <i>treeDatastore.calculateItemLevel() 的对应方法是 [gantt.calculateTaskLevel()](api/method/calculatetasklevel.md)。</i>
</ul>

<ul><li>
        <b>setParent (item, newParentId): void</b> - 通过更新 `parentProperty` 配置（默认为 "item.parent"）指定的属性，为项目分配新的父节点。
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - 项目对象</li>
  <li><b><i>newParentId</i></b> - (<i>string | number | null</i>) - 新父节点的 id</li>
  </ul>
</li></ul>

<ul>

:::note
note
要正确地将项目移动到不同父节点，请使用 **treeDatastore.move()**。**setParent()** 方法仅更新项目的属性，不影响内部树结构。
 
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
 <i>treeDatastore.setParent() 的对应方法是 [gantt.setParent()](api/method/setparent.md)。</i>
</ul>

<ul><li>
  <b>eachItem (callback, parentId): void</b> - 遍历给定项目的所有子项目
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - 对每个项目执行的函数</li>
  <li><b><i>parentId?</i></b> - (<i>string | number</i>) - 起始父节点 id</li>
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
 <i>treeDatastore.eachItem() 的对应方法是 [gantt.eachTask()](api/method/eachtask.md)。</i>
</ul>

<ul><li>
  <b>eachParent (callback, startItem): void</b> - 遍历指定项目的所有父项目
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - 对每个父项目执行的函数</li>
  <li><b><i>startItem</i></b> - (<i>string | number</i>) - 要遍历其父节点的项目 id</li>
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
 <i>treeDatastore.eachParent() 的对应方法是 [gantt.eachParent()](api/method/eachparent.md)。</i>
</ul>

<ul><li>
  <b>open (id): void</b> - 展开指定 id 的分支
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 分支 id</li>
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
 <i>treeDatastore.open() 的对应方法是 [gantt.open()](api/method/open.md)。</i>
<i>此操作会触发 [onItemOpen](#onItemOpen) 事件。</i>
</ul>

<ul><li>
  <b>close (id): void</b> - 折叠指定 id 的分支
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 分支 id</li>
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
 <i>treeDatastore.close() 的对应方法是 [gantt.close()](api/method/close.md)。</i>
  <i>此操作会触发 [onItemClose](#onItemClose) 事件。</i>
</ul>

<ul><li>
  <b>sort (field, desc, parent, silent): void</b> - 对资源 grid 中的项目进行排序
  <ul>
  <li><b><i>field</i></b> - (<i>string | Function</i>) - 要排序的列名或自定义排序函数</li>
  <li><b><i>desc?</i></b> - (<i>boolean</i>) - 排序顺序:<i>true</i> 表示降序，<i>false</i> 表示升序（默认 <i>false</i>）</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - 限制排序到指定父分支的 id</li>
  <li><b><i>silent?</i></b> - (<i>boolean</i>) - 是否跳过排序后的渲染</li>
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

// 切换排序方向并按列名排序资源
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~
<br>

:::note
Sample: [Gantt. 按列排序资源](https://snippet.dhtmlx.com/gypniv9e)
:::

<br><br>
您也可以使用自定义排序函数:

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
Sample: [Gantt. 使用自定义函数排序资源 ](https://snippet.dhtmlx.com/fvjivly5)
:::

<br><br>
 <i>treeDatastore.sort() 的对应方法是 [gantt.sort()](api/method/sort.md)。</i>
</ul>

### 事件 {#events}

<ul id="onBeforeItemMove">
  <li><b>onBeforeItemMove (id, parent, tindex)</b> - 在项目移动到新位置之前触发<ul><li><b><i>id</i></b> - (<i>string | number</i>) - 要移动的项目 id</li><li><b><i>parent</i></b> - (<i>string | number</i>) - 新父节点 id</li><li><b><i>tindex</i></b> - (<i>number</i>) - 在父分支中的目标索引</li></ul>返回 <i>false</i> 可阻止移动，否则返回 <i>true</i>。</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeItemMove", function(id, parent, tindex){
    // 在此处编写您的代码
    return true;
});
~~~
<br>
<br>
 <i>treeDatastore 的 onBeforeItemMove 事件对应 Gantt 的 [onBeforeTaskMove](api/event/onbeforetaskmove.md) 事件。</i>
</ul>

<ul id="onAfterItemMove">
  <li>
  <b>onAfterItemMove (id, parent, tindex)</b> - 项目移动完成后触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 被移动项目的 id</li>
  <li><b><i>parent</i></b> - (<i>string | number</i>) - 新父节点 id</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - 在父分支中的新索引</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterItemMove", function(id, parent, tindex){
    // 在此处编写您的代码
});
~~~
<br>
<br>
 <i>treeDatastore 的 onAfterItemMove 事件对应 Gantt 的 [onAfterTaskMove](api/event/onaftertaskmove.md) 事件。</i>
</ul>

<ul id="onItemOpen">
  <li>
  <b>onItemOpen (id)</b> - 分支展开时触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 分支 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemOpen", function(id){
    // 在此处编写您的代码
});
~~~
<br>
<br>
 <i>treeDatastore 的 onItemOpen 事件对应 Gantt 的 [onTaskOpened](api/event/ontaskopened.md) 事件。</i>
</ul>

<ul id="onItemClose">
  <li>
  <b>onItemClose (id)</b> - 分支折叠时触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 分支 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemClose", function(id){
    // 在此处编写您的代码
});
~~~
<br>
<br>
 <i>treeDatastore 的 onItemClose 事件对应 Gantt 的 [onTaskClosed](api/event/ontaskclosed.md) 事件。</i>
</ul>

### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [datastore](api/other/datastore.md)

### Related Guides
- [资源管理](guides/resource-management.md)

