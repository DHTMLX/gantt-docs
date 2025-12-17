---
sidebar_label: datastore
title: datastore config
description: "一组 datastore 方法的集合"
---

# datastore

### Description

@short: 一组 datastore 方法的集合

@signature: datastore: DatastoreMethods


### Details

**注意**，任务（Tasks）和链接（Links）应通过标准的 [Gantt API](api/api-overview.md) 进行管理。直接在 datastore 中修改任务或链接可能会引发意外问题。datastore 主要用于资源或其他自定义对象的管理。

您可以使用 [createDatastore](api/method/createdatastore.md) 方法创建一个新的 datastore。<br>
**datastore** 对象提供以下 [方法](#methods) 和 [事件](#events):

### 方法 {#methods}

<ul id="parse"><li>
  <b>parse (data): void</b> - 从数组加载数据
  <ul>
  <li><b><i>data</i></b> - (<i>Array&lt;object&gt;</i>) - 要加载的数据</li>
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
 <i>datastore.parse() 补充了 [gantt.parse()](api/method/parse.md)。</i>
  <br>
 <i>会触发 [onBeforeParse](#onBeforeParse)、[onItemLoading](#onItemLoading)、[onParse](#onParse) 和 [onStoreUpdated](#onStoreUpdated) 事件。</i>
</ul>


<ul id="getItem">
  <li>
  <b>getItem (id): object | void</b> - 通过 id 获取项目
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目的 id</li>
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
 <i>datastore.getItem() 类似于 [gantt.getTask()](api/method/gettask.md) 和 [gantt.getLink()](api/method/getlink.md)。</i>
</ul>

<ul id="updateItem">
  <li>
  <b>updateItem (id, item): void</b> - 更新指定项目
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目的 id</li>
  <li><b><i>item?</i></b> - (<i>object</i>) - 包含更新属性的对象</li>
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
 <i>datastore.updateItem() 类似于 [gantt.updateTask()](api/method/updatetask.md) 和 [gantt.updateLink()](api/method/updatelink.md)。</i>
<br>
 <i>会触发 [onBeforeUpdate](#onBeforeUpdate)、[onAfterUpdate](#onAfterUpdate) 和 [onStoreUpdated](#onStoreUpdated) 事件。</i>

</ul>

<ul id="removeItem">
  <li>
  <b>removeItem (id): void</b> - 删除指定项目
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目的 id</li>
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
 <i>datastore.removeItem() 类似于 [gantt.deleteTask()](api/method/deletetask.md) 和 [gantt.deleteLink()](api/method/deletelink.md)。</i>
<br>
 <i>会触发 [onBeforeDelete](#onBeforeDelete)、[onAfterDelete](#onAfterDelete) 和 [onStoreUpdated](#onStoreUpdated) 事件。</i>
</ul>

<ul id="isVisible">
  <li>
  <b>isVisible (id): boolean</b> - 判断指定项目是否可见（未被过滤器隐藏）
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目的 id</li>
  </ul>
  返回 <i>true</i> 表示项目可见，否则为 <i>false</i>。
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
 <i>datastore.isVisible() 类似于 [gantt.isTaskVisible()](api/method/istaskvisible.md)。</i>
</ul>

<ul id="getVisibleItems">
  <li>
  <b>getVisibleItems (): Array&lt;object&gt;</b> - 获取所有可见项目的数组
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
  <b>addItem (item, index): number | string</b> - 向 datastore 添加新项目
  <ul><li><b><i>item</i></b> - (<i>object</i>) - 项目对象</li><li><b><i>index?</i></b> - (<i>number</i>) - 插入位置（0 或更大）</li></ul>
  返回新添加项目的 id。
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
 <i>datastore.addItem() 类似于 [gantt.addTask()](api/method/addtask.md) 和 [gantt.addLink()](api/method/addlink.md)。</i>
<br>
 <i>会触发 [onBeforeAdd](#onBeforeAdd)、[onAfterAdd](#onAfterAdd) 和 [onStoreUpdated](#onStoreUpdated) 事件。</i>
</ul>

<ul id="changeId">
  <li>
  <b>changeId (oldId, newId): void</b> - 更新项目的 id
  <ul><li><b><i>oldId</i></b> - (<i>string | number</i>) - 当前 id</li><li><b><i>newId</i></b> - (<i>string | number</i>) - 新 id</li></ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

var itemId = store.addItem({
    text: "Unassigned",
    parent:4
});

// itemId 是新项目的临时客户端 id
// 保存到数据库后，更新客户端的 id：

store.changeId(itemId, "databaseId");
~~~
<br>
<br>
 <i>datastore.changeId() 类似于 [gantt.changeTaskId()](api/method/changetaskid.md) 和 [gantt.changeLinkId()](api/method/changelinkid.md)。</i>
 <br>
 <i>会触发 [onIdChange](#onIdChange) 事件。</i>
</ul>


<ul id="exists">
  <li>
  <b>exists (id): boolean</b> - 检查指定项目是否存在于 datastore 中
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目的 id</li>
  </ul>
  返回 <i>true</i> 表示存在，否则 <i>false</i>。
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
 <i>datastore.exists() 类似于 [gantt.isTaskExists()](api/method/istaskexists.md) 和 [gantt.isLinkExists()](api/method/islinkexists.md)。</i>
</ul>


<ul id="move">
  <li>
  <b>move (sindex, tindex): void</b> - 将项目移动到新位置
  <ul>
  <li><b><i>sindex</i></b> - (<i>number</i>) - 当前索引</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - 目标索引</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

// 交换两个项目
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
  <i>datastore.move() 对应 [gantt.moveTask()](api/method/movetask.md)。</i>
  <br>
  <i>会触发 [onStoreUpdated](#onStoreUpdated) 事件。</i>
</ul>

<ul>
  <li>
  <b>clearAll (): void</b> - 清空 datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.clearAll();
~~~
<br>
<br>
 <i>datastore.clearAll() 对应 [gantt.clearAll()](api/method/clearall.md)。</i>
  <br>
 <i>会触发 [onClearAll](#onClearAll)、[onBeforeStoreUpdate](#onBeforeStoreUpdate) 和 [onStoreUpdated](#onStoreUpdated) 事件。</i>

</ul>

<ul id="silent">
  <li>
  <b>silent (callback): void</b> - 执行代码时不触发 datastore API 事件
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - 回调函数</li>
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
 <i>datastore.silent() 补充了 [gantt.silent()](api/method/silent.md)。</i>
</ul>

<ul id="refresh">
  <li>
  <b>refresh (id): void</b> - 触发指定记录的事件重绘并应用过滤器
  <ul>
  <li><b><i>id?</i></b> - (<i>string | number</i>) - 可选，记录的 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.refresh(itemId); // 重绘指定项目
store.refresh(); // 重绘所有项目
~~~
<br>
<br>
 <i>datastore.refresh() 对应 [gantt.refreshTask()](api/method/refreshtask.md) 和 [gantt.refreshLink()](api/method/refreshlink.md)。</i>
  <br>
 <i>会触发 [onBeforeStoreUpdate](#onBeforeStoreUpdate)、[onBeforeFilter](#onBeforeFilter)、[onFilterItem](#onFilterItem)、[onFilter](#onFilter) 和 [onStoreUpdated](#onStoreUpdated) 事件。</i>

</ul>

<ul id="count">
  <li>
  <b>count (): number</b> - 返回当前加载到 datastore 中的项目总数
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
 <i>datastore.count() 对应 [gantt.getTaskCount()](api/method/gettaskcount.md) 和 [gantt.getLinkCount()](api/method/getlinkcount.md)。</i>
</ul>

<ul id="countVisible">
  <li>
  <b>countVisible (): number</b> - 返回当前可见项目的数量
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
alert(store.countVisible() + " items are visible");
~~~
<br>
<br>
 <i>datastore.countVisible() 对应 [gantt.getVisibleTaskCount()](api/method/getvisibletaskcount.md)。</i>
</ul>

<ul id="eachItem">
  <li>
  <b>eachItem (callback): void</b> - 遍历 datastore 中的所有项目
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - 回调函数</li>
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
 <i>datastore.eachItem() 对应 [gantt.eachTask()](api/method/eachtask.md)。</i>
</ul>

<ul id="filter">
  <li>
  <b>filter (): void</b> - 应用过滤器并更新可见项目列表
</li>
通常，此方法由 <b>store.refresh()</b> 自动调用。
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.filter();
~~~
<br>
</ul>

<ul id="sort"><li>
  <b>sort (field, desc, parent, silent): void</b> - 对资源 grid 中的项目进行排序
  <ul>
  <li><b><i>field</i></b> - (<i>string | Function</i>) - 用于排序的列名或自定义排序函数</li>
  <li><b><i>desc?</i></b> - (<i>boolean</i>) - 排序方向:<i>true</i> 为降序，<i>false</i> 为升序（默认 <i>false</i>）</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - 限制排序到指定父项的分支</li>
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

// 切换列的排序方向
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~
<br>

或者，您可以提供自定义排序函数:

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
 <i>datastore.sort() 补充了 [gantt.sort()](api/method/sort.md)。</i>
</ul>

<ul id="getIndexRange">
  <li>
  <b>getIndexRange (from, to): Array&lt;object&gt;</b> - 返回指定索引范围内的项目
  <ul>
  <li><b><i>from</i></b> - (<i>number</i>) - 起始位置</li>
  <li><b><i>to</i></b> - (<i>number</i>) - 结束位置</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var itemsInViewPort = store.getIndexRange(5, 10); // 第5到第10个项目
~~~
<br>
</ul>

<ul id="getItems">
  <li>
  <b>getItems (): Array&lt;object&gt;</b> - 返回 datastore 中的所有项目
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var items = store.getItems();
~~~
<br>
<br>
 <i>datastore.getItems() 对应 [gantt.getTaskByTime()](api/method/gettaskbytime.md) 和 [gantt.getLinks()](api/method/getlinks.md)。</i>
</ul>

<ul id="getIdByIndex">
  <li>
        <b>getIdByIndex (index): string | number | void</b> - 返回指定索引处项目的 id，若无则返回 `undefined`
  <ul>
  <li><b><i>index</i></b> - (<i>number</i>) - 项目位置</li>
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
 <i>datastore.getIdByIndex() 对应 [gantt.getTaskByIndex()](api/method/gettaskbyindex.md)。</i>
</ul>

<ul id="getIndexById">
  <li>
        <b>getIndexById (id): number</b> - 返回指定 id 项目的索引，找不到返回 `-1`
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目 id</li>
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
 <i>datastore.getIndexById() 对应 [gantt.getTaskIndex()](api/method/gettaskindex.md)。</i>
</ul>

<ul id="getFirst">
  <li>
  <b>getFirst (): string | number | null</b> - 返回 datastore 中第一个项目的 id
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
  <b>getLast (): string | number | null</b> - 返回 datastore 中最后一个项目的 id
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
  <b>getNext (id): string | number | null</b> - 返回指定项目之后的项目 id
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 当前项目 id</li>
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
 <i>datastore.getNext() 对应 [gantt.getNext()](api/method/getnext.md)。</i>
</ul>

<ul id="getPrev">
  <li>
  <b>getPrev (id): string | number | null</b> - 返回指定项目之前的项目 id
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 当前项目 id</li>
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
 <i>datastore.getPrev() 对应 [gantt.getPrev()](api/method/getprev.md)。</i>
</ul>

<ul id="destructor">
  <li>
  <b>destructor (): void</b> - 清空 datastore 并移除所有事件处理器；调用后 datastore 不可再用
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.destructor();
~~~
<br>
<br>
 <i>datastore.destructor() 对应 [gantt.destructor()](api/method/destructor.md)。</i>
</ul>


<ul id="attachEvent">
  <li>
  <b>attachEvent (name, handler, settings): string</b> - 绑定内部 datastore 事件处理器
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - 事件名称，不区分大小写</li>
  <li><b><i>handler</i></b> - (<i>Function</i>) - 处理函数</li>
  <li><b><i>settings?</i></b> - (<i>object</i>) - 事件处理器的可选设置对象</li>
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
 <i>datastore.attachEvent() 对应 [gantt.attachEvent()](api/method/attachevent.md)。</i>
</ul>

<ul id="callEvent">
  <li>
  <b>callEvent (name, params): boolean</b> - 触发内部事件
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - 事件名称，不区分大小写</li>
  <li><b><i>params</i></b> - (<i>Array&lt;any&gt;</i>) - 事件相关数据数组</li>
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
 <i>datastore.callEvent() 对应 [gantt.callEvent()](api/method/callevent.md)。</i>
</ul>

<ul id="detachEvent">
  <li>
  <b>detachEvent (id): void</b> - 移除之前绑定的事件处理器
  <ul>
  <li><b><i>id</i></b> - (<i>string</i>) - 事件处理器的 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var handlerId = store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});

// 移除事件处理器
store.detachEvent(handlerId);
~~~
<br>
<br>
 <i>datastore.detachEvent() 对应 [gantt.detachEvent()](api/method/detachevent.md)。</i>
</ul>


### 事件 {#events} 

<ul id="onItemLoading">
  <li>
  <b>onItemLoading (item)</b> - 从数据源加载项目时触发
  <ul><li><b><i>item</i></b> - (<i>object</i>) - 项目对象</li></ul>
  返回 <i>false</i> 可阻止默认事件行为，否则返回 <i>true</i>。
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemLoading", function(item){
    if(item.valid){ // 根据自定义属性在加载时过滤项目
        return true;
    }
    return false;
});
~~~
<br>
<br>
 <i>datastore 的 onItemLoading 事件对应 Gantt 的 [onTaskLoading](api/event/ontaskloading.md) 事件。</i>
</ul>

<ul id="onBeforeParse">
  <li>
  <b>onBeforeParse (data)</b> - 数据解析开始前触发
  <ul>
  <li><b><i>data</i></b> - (<i>Array &lt;any&gt;</i>) - 加载的数据数组</li>
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
 <i>datastore 的 onBeforeParse 事件对应 Gantt 的 [onBeforeParse](api/event/onbeforeparse.md) 事件。</i>
</ul>

<ul id="onParse">
  <li>
  <b>onParse (data)</b> - 解析完成但在甘特图渲染前触发
  <ul>
  <li><b><i>data</i></b> - (<i>Array &lt;any&gt;</i>) - 加载的数据数组</li>
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
 <i>datastore 的 onParse 事件对应 Gantt 的 [onParse](api/event/onparse.md) 事件。</i>
</ul>

<ul id="onBeforeUpdate">
  <li>
  <b>onBeforeUpdate (id, item)</b> - 项目更新前触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 更新后的项目对象</li>
  </ul>
  返回 <i>false</i> 可阻止默认事件动作，否则返回 <i>true</i>。
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeUpdate", function(id, item){
    // 你的代码
    return true;
});
~~~
<br>
<br>
 <i>datastore 的 onBeforeUpdate 事件对应 Gantt 的 [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md) 和 [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) 事件。</i>
</ul>

<ul id="onAfterUpdate">
  <li>
  <b>onAfterUpdate (id, item)</b> - 项目更新后触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 更新后的项目对象</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterUpdate", function(id, item){
    // 你的代码
});
~~~
<br>
<br>
 <i>datastore 的 onAfterUpdate 事件对应 Gantt 的 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 和 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 事件。</i>
</ul>

<ul id="onBeforeDelete">
  <li>
  <b>onBeforeDelete (id, item)</b> - 项目删除前触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 项目对象</li>
  </ul>
  返回 <i>false</i> 可阻止默认事件动作，否则返回 <i>true</i>。
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeDelete", function(id, item){
    // 你的代码
    return true;
});
~~~
<br>
<br>
 <i>datastore 的 onBeforeDelete 事件对应 Gantt 的 [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) 和 [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) 事件。</i>
</ul>

<ul id="onAfterDelete">
  <li>
  <b>onAfterDelete (id, item)</b> - 项目删除后触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 项目对象</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterDelete", function(id, item){
    // 你的代码
});
~~~
<br>
<br>
 <i>datastore 的 onAfterDelete 事件对应 Gantt 的 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 和 [onAfterLinkDelete](api/event/onafterlinkdelete.md) 事件。</i>
</ul>

<ul id="onBeforeAdd">
  <li>
  <b>onBeforeAdd (id, item)</b> - 新项目添加到 datastore 前触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 项目对象</li>
  </ul>
  返回 <i>false</i> 可阻止默认事件动作，否则返回 <i>true</i>。
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeAdd", function(id, item){
    // 你的代码
    return true;
});
~~~
<br>
<br>
 <i>datastore 的 onBeforeAdd 事件对应 Gantt 的 [onBeforeTaskAdd](api/event/onbeforetaskadd.md) 和 [onBeforeLinkAdd](api/event/onbeforelinkadd.md) 事件。</i>
</ul>

<ul id="onAfterAdd">
  <li>
  <b>onAfterAdd (id, item)</b> - 新项目添加到 datastore 后触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 项目对象</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterAdd", function(id, item){
    // 你的代码
});
~~~
<br>
<br>
 <i>datastore 的 onAfterAdd 事件对应 Gantt 的 [onAfterTaskAdd](api/event/onaftertaskadd.md) 和 [onAfterLinkAdd](api/event/onafterlinkadd.md) 事件。</i>
</ul>

<ul id="onIdChange">
  <li>
  <b>onIdChange (id, newId)</b> - 项目 id 变更时触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 旧 id</li>
  <li><b><i>newId</i></b> - (<i>string | number</i>) - 新 id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onIdChange", function(oldId, newId){
    // 你的代码
});
~~~
<br>
<br>
 <i>datastore 的 onIdChange 事件对应 Gantt 的 [onTaskIdChange](api/event/ontaskidchange.md) 事件。</i>
</ul>

<ul id="onClearAll">
  <li>
  <b>onClearAll ()</b> - datastore 中所有项目移除后触发
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onClearAll", function(){
    // 你的代码
});
~~~
<br>
 <i>datastore 的 onClearAll 事件对应 Gantt 的 [onClear](api/event/onclear.md) 事件。</i>
</ul>


<ul id="onBeforeStoreUpdate">
  <li>
  <b>onBeforeStoreUpdate (id, item, action)</b> - datastore 刷新前触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number | null</i>) - 项目 id 或 null</li>
  <li><b><i>item</i></b> - (<i>object | null</i>) - 项目对象或 null</li>
  <li><b><i>action</i></b> - (<i>string | null</i>) - 动作类型 ("paint", "move", "add", "delete", null)</li>
  </ul>
  返回 <i>false</i> 可阻止默认事件动作，否则返回 <i>true</i>。
  <br>
        此事件表示 datastore 项目需要重绘。`null` 表示整个 datastore 被更新。

</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeStoreUpdate", function(id, item, action){
    // 你的代码
    return true;
});
~~~
<br>
</ul>


<ul id="onStoreUpdated">
  <li>
  <b>onStoreUpdated (id, item, action)</b> - datastore 刷新后触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number | null</i>) - 项目 id 或 null</li>
  <li><b><i>item</i></b> - (<i>object | null</i>) - 项目对象或 null</li>
  <li><b><i>action</i></b> - (<i>string | null</i>) - 动作类型 ("paint", "move", "add", "delete", null)</li>
  </ul>
        此事件表示 datastore 项目需要重绘。`null` 表示整个 datastore 被更新。
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onStoreUpdated", function(id, item, action){
    // 你的代码
});
~~~
<br>
</ul>


<ul id="onBeforeFilter">
  <li>
  <b>onBeforeFilter ()</b> - 过滤器应用前触发
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
  <b>onFilter ()</b> - 过滤后更新可见项目时触发
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
        <b>onFilterItem (id, item)</b> - 过滤过程中针对每个项目触发；返回 `false` 隐藏该项目
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项目 id</li>
  <li><b><i>item</i></b> - (<i>object</i>) - 项目对象</li>
  </ul>
  返回 <i>false</i> 隐藏项目，否则返回 <i>true</i>。
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onFilterItem", function(id, item){
    // 你的代码
    return true;
});
~~~
<br>
 <i>datastore 的 onFilterItem 事件对应 Gantt 的 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 事件。</i>
</ul>

<ul id="ondestroy">
  <li>
  <b>onDestroy ()</b> - 调用 datastore 的 destructor() 方法后触发
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
- [资源管理](guides/resource-management.md)

