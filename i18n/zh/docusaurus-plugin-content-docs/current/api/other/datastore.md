---
sidebar_label: datastore
title: datastore config
description: "一组 datastore 方法"
---

# datastore

### Description

@short: 一组 datastore 方法

@signature: datastore: DatastoreMethods

### Details

**_Note_**，任务（Tasks）和链接（Links）应使用 Gantt 的通用 [API of Gantt](api/api-overview.md) 进行修改。直接在 datastore 中修改任务或链接可能会产生意外结果。Datastores 预计用于资源或其他自定义对象。

可以使用 [createDatastore](api/method/createdatastore.md) 方法创建一个新的 datastore。 
**datastore** 对象具有以下 [methods](#methods) 与 [events](#events)：

## Methods

### parse (data): void 
从数组加载数据

**Parameters**:
- `data` - (Array\<object\>) - 需要加载的数据

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
示例
[资源使用示意图](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
:::

 datastore.parse() 的另一种写法是 [gantt.parse()](api/method/parse.md)。
  
调用 [onBeforeParse](#onbeforeparse-data) 、 [onItemLoading](#onitemloading-item) 、 [onParse](#onparse-data) 和 [onStoreUpdated](#onstoreupdated-id-item-action) 事件。

---

### getItem (id)
按 id 返回项

**Parameters**:
- `id` - (string | number) - 项的 id

**Returns**: object | void - 项对象

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const resource = store.getItem(resourceId);
~~~

:::note
示例
[资源加载示意图](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
:::

 datastore.getItem() 的同义方法是 [gantt.getTask()](api/method/gettask.md) 与 [gantt.getLink()](api/method/getlink.md)。
  
---

### updateItem (id, item)
更新指定的项

**Parameters**:
- `id` - (string | number) - 项的 id
- `item` - (object) - 项的新对象

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const resource = store.getItem(resourceId);
resource.text = "modified";
store.updateItem(resourceId);
// 或
store.updateItem(resourceId, { text: "modified" });
~~~

 datastore.updateItem() 的同义方法是 [gantt.updateTask()](api/method/updatetask.md) 与 [gantt.updateLink()](api/method/updatelink.md)。

调用 [onBeforeUpdate](#onbeforeupdate-id-item)、 [onAfterUpdate](#onafterupdate-id-item) 与 [onStoreUpdated](#onstoreupdated-id-item-action) 事件。

---

### removeItem (id)
删除指定项

**Parameters**:
- `id` - (string | number) - 项的 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.removeItem(resourceId);
~~~

 datastore.removeItem() 的同义方法是 [gantt.deleteTask()](api/method/deletetask.md) 与 [gantt.deleteLink()](api/method/deletelink.md)。

调用 [onBeforeDelete](#onbeforedelete-id-item)、 [onAfterDelete](#onafterdelete-id-item) 与 [onStoreUpdated](#onstoreupdated-id-item-action) 事件。

---

### isVisible (id)
检查指定项是否通过筛选可见

**Parameters**:
- `id` - (string | number) - 项的 id

**Returns**: boolean - 若可见则返回 true，否则返回 false

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
if(store.isVisible(resourceId)){
    console.log(resourceId);
}
~~~

 datastore.isVisible() 的同义方法是 [gantt.isTaskVisible()](api/method/istaskvisible.md)。

---

### getVisibleItems ()
返回当前可见的项数组

**Returns**: Array\<object\> - 可见项的数组

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const items = store.getVisibleItems();
~~~

---

### addItem (item, index)
向数据存储中添加新项

**Parameters**:
- `item` - (object) - 项对象
- `index` - (number) - 项将被添加到的位置（0 或更大）

**Returns**: number | string - 项的 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemId = store.addItem({
    text: "Unassigned",
    parent:4
});
~~~

 datastore.addItem() 的同义方法是 [gantt.addTask()](api/method/addtask.md) 与 [gantt.addLink()](api/method/addlink.md)。

调用 [onBeforeAdd](#onbeforeadd-id-item)、 [onAfterAdd](#onafteradd-id-item) 与 [onStoreUpdated](#onstoreupdated-id-item-action) 事件。
 
---

### changeId (oldId, newId)
更改项的 id

**Parameters**:
- `oldId` - (string | number) - 当前项的 id
- `newId` - (string | number) - 新的项的 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

const itemId = store.addItem({
    text: "Unassigned",
    parent:4
});

// itemId - 新项的临时客户端 id
// 一旦项保存到数据库 —— 使用新 id 来更新客户端:

store.changeId(itemId, "databaseId");
~~~

 datastore.changeId() 的同义方法是 [gantt.changeTaskId()](api/method/changetaskid.md) 与 [gantt.changeLinkId()](api/method/changelinkid.md)。

 调用 [onIdChange](#onidchange-id-newid) 事件。

---

### exists (id)
检查数据存储中是否存在指定项

**Parameters**:
- `id` - (string | number) - 项的 id

**Returns**: boolean - 若存在则返回 true，否则返回 false

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

if(store.exists(resourceId)){
    console.log(resourceId);
}
~~~

 datastore.exists() 的同义方法是 [gantt.isTaskExists()](api/method/istaskexists.md) 与 [gantt.isLinkExists()](api/method/islinkexists.md)。

---

### move (sindex, tindex)
将项移动到新位置

**Parameters**:
- `sindex` - (number) - 当前项的位置索引
- `tindex` - (number) - 将要移动到的位置的索引

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

// 交换两项
const idA = 1;
const idB = 5;
const indexA = store.getIndexById(idA);
const indexB = store.getIndexById(idB);
store.move(indexB, indexA);

indexA = store.getIndexById(idA);
store.move(indexA, indexB);
~~~

 datastore.move() 的同义方法是 [gantt.moveTask()](api/method/movetask.md)。

 调用 [onStoreUpdated](#onstoreupdated-id-item-action) 事件。

---

### clearAll ()
清空数据存储

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.clearAll();
~~~

 datastore.clearAll() 的同义方法是 [gantt.clearAll()](api/method/clearall.md)。

 调用 [onClearAll](#onclearall-)、 [onBeforeStoreUpdate](#onbeforestoreupdate-id-item-action) 与 [onStoreUpdated](#onstoreupdated-id-item-action) 事件。

---

### silent (callback)
在不触发数据存储 API 事件的情况下执行代码

**Parameters**:
- `callback` - (Function) - 回调函数

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

 datastore.silent() 的同义方法是 [gantt.silent()](api/method/silent.md)。

---

### refresh (id)
触发指定记录的事件重绘，并运行筛选

**Parameters**:
- `id` - (string | number) - 可选，记录的 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.refresh(itemId); // 重绘一个项
store.refresh(); // 重绘所有项
~~~

 datastore.refresh() 的同义方法是 [gantt.refreshTask()](api/method/refreshtask.md) 与 [gantt.refreshLink()](api/method/refreshlink.md)。

 调用 [onBeforeStoreUpdate](#onbeforestoreupdate-id-item-action)、 [onBeforeFilter](#onbeforefilter-)、 [onFilterItem](#onfilteritem-id-item)、 [onFilter](#onfilter-) 与 [onStoreUpdated](#onstoreupdated-id-item-action) 事件。

---

### count ()
返回当前加载到数据存储中的项数量

**Returns**: number - 项的数量

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onParse", function(){
    alert(store.count() + " items loaded");
});
~~~

 datastore.count() 的同义方法是 [gantt.getTaskCount()](api/method/gettaskcount.md) 与 [gantt.getLinkCount()](api/method/getlinkcount.md)。

---

### countVisible ()
返回当前可见的项数量

**Returns**: number - 可见项的数量

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
alert(store.countVisible() + " items are visible");
~~~

 datastore.countVisible() 的同义方法是 [gantt.getVisibleTaskCount()](api/method/getvisibletaskcount.md)。

---

### eachItem (callback)
遍历数据存储中的所有项

**Parameters**:
- `callback` - (Function) - 回调函数

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

 datastore.eachItem() 的同义方法是 [gantt.eachTask()](api/method/eachtask.md)。

---

### filter ()
运行筛选并更新可见项数组

通常，你不需要调用此方法，它会在 store.refresh() 时自动调用。

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.filter();
~~~

---

### sort (field, desc, parent, silent)
在资源网格中对项进行排序

**Parameters**:
- `field` - (string | Function) - 列名称或自定义排序函数
- `desc` - (boolean) - 指定排序方向：true - 降序，false - 升序
- `parent` - (string | number) - 父项的 id
- `silent` - (boolean) - 指定排序后是否应调用渲染

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

// 按列对资源网格进行排序
let resourceSortDirection = false;

function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~

或者你也可以定义自定义排序函数：

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

 datastore.sort() 的同义方法是 [gantt.sort()](api/method/sort.md)。

---

### getIndexRange (from, to)
返回指定索引之间的记录

**Parameters**:
- `from` - (number) - 开始记录的位置
- `to` - (number) - 结束记录的位置

**Returns**: Array\<object\> - 项的数组

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemsInViewPort = store.getIndexRange(5, 10);// 取得第5到第10项
~~~

---

### getItems ()
返回数据存储的所有记录

**Returns**: Array\<object\> - 所有项的数组

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const items = store.getItems();
~~~

 datastore.getItems() 的同义方法是 [gantt.getTaskByTime()](api/method/gettaskbytime.md) 与 [gantt.getLinks()](api/method/getlinks.md)。

---

### getIdByIndex (index)
按索引返回项的 id

**Parameters**:
- `index` - (number) - 项的位置

**Returns**: string | number | void - 项的 id 或 undefined

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstItem = store.getIdByIndex(0);
~~~

 datastore.getIdByIndex() 的同义方法是 [gantt.getTaskByIndex()](api/method/gettaskbyindex.md)。

---

### getIndexById (id)
按 id 返回项的索引

**Parameters**:
- `id` - (string | number) - 项的 id

**Returns**: number - 项的索引，若未找到则返回 -1

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemIndex = store.getIndexById(5);
~~~

 datastore.getIndexById() 的同义方法是 [gantt.getTaskIndex()](api/method/gettaskindex.md)。

---

### getFirst ()
返回数据存储中第一项的 id

**Returns**: string | number | null - 第一项的 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstId = store.getFirst();
~~~

---

### getLast ()
返回数据存储中最后一项的 id

**Returns**: string | number | null - 最后一项的 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const lastId = store.getLast();
~~~

---

### getNext (id)
返回数据存储中下一项的 id

**Parameters**:
- `id` - (string | number) - 项的 id

**Returns**: string | number | null - 下一项的 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstId = store.getFirst();
const secondId = store.getNext(firstId);
~~~

 datastore.getNext() 的同义方法是 [gantt.getNext()](api/method/getnext.md)。

---

### getPrev (id)
返回数据存储中上一项的 id

**Parameters**:
- `id` - (string | number) - 项的 id

**Returns**: string | number | null - 上一项的 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const prevId = store.getPrev(itemId);
~~~

 datastore.getPrev() 的同义方法是 [gantt.getPrev()](api/method/getprev.md)。

---

### destructor ()
清空数据存储并移除所有附加的事件处理程序

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.destructor();
~~~

 datastore.destructor() 的同义方法是 [gantt.destructor()](api/method/destructor.md)。

---

### attachEvent (name, handler, settings)
将处理程序附加到 DataStore 的内部事件上

**Parameters**:
- `name` - (string) - 事件名称，大小写不敏感
- `handler` - (Function) - 处理函数
- `settings` - (object) - 可选，包含事件处理程序设置的对象

**Returns**: string - 事件 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});
~~~

 datastore.attachEvent() 的同义方法是 [gantt.attachEvent()](api/method/attachevent.md)。

---

### callEvent (name, params)
调用内部事件

**Parameters**:
- `name` - (string) - 事件名称，大小写不敏感
- `params` - (Array\<any\>) - 与事件相关的数据数组

**Returns**: boolean - 若事件成功完成返回 true

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.callEvent("CustomEvent", [param1, param2]);
~~~

 datastore.callEvent() 的同义方法是 [gantt.callEvent()](api/method/callevent.md)。

---

### detachEvent (id)
从事件中分离一个处理程序

**Parameters**:
- `id` - (string) - 事件的 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const handlerId = store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});

// detach a listener
store.detachEvent(handlerId);
~~~

 datastore.detachEvent() 的同义方法是 [gantt.detachEvent()](api/method/detachevent.md)。

---

## Events

### onItemLoading (item)
在从数据源加载项时触发

**Parameters**:
- `item` - (object) - 项的对象

**Returns**: boolean - 返回 false 以阻止默认操作

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemLoading", function(item){
    if(item.valid){ // 根据自定义属性在加载时筛选
        return true;
    }
    return false;
});
~~~

 datastore.onItemLoading 事件的同义事件是 Gantt 的 [onTaskLoading](api/event/ontaskloading.md) 事件。

---

### onBeforeParse (data)
在数据开始解析之前触发

**Parameters**:
- `data` - (Array\<any\>) - 被加载的数据数组

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

 datastore.onBeforeParse 事件的同义事件是 Gantt 的 [onBeforeParse](api/event/onbeforeparse.md) 事件。

---

### onParse (data)
在数据被解析后但在呈现之前触发

**Parameters**:
- `data` - (Array\<any\>) - 被加载的数据数组

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

 datastore.onParse 事件的同义事件是 Gantt 的 [onParse](api/event/onparse.md)。

---

### onBeforeUpdate (id, item)
在项被更新之前触发

**Parameters**:
- `id` - (string | number) - 项的 id
- `item` - (object) - 项的新对象

**Returns**: boolean - 返回 false 以阻止默认行为

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeUpdate", function(id, item){
    // 在此处编写你的代码
    return true;
});
~~~

 datastore.onBeforeUpdate 事件的同义方法是 [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md) 与 [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) 事件。

---

### onAfterUpdate (id, item)
在项更新之后触发

**Parameters**:
- `id` - (string | number) - 项的 id
- `item` - (object) - 项的对象

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterUpdate", function(id, item){
    // 在此处编写你的代码
});
~~~

 datastore.onAfterUpdate 事件的同义方法是 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 与 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 事件。

---

### onBeforeDelete (id, item)
在项被删除之前触发

**Parameters**:
- `id` - (string | number) - 项的 id
- `item` - (object) - 项的对象

**Returns**: boolean - 返回 false 以阻止默认操作

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeDelete", function(id, item){
    // 在此处编写你的代码
    return true;
});
~~~

 datastore.onBeforeDelete 事件的同义方法是 [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) 与 [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) 事件。

---

### onAfterDelete (id, item)
在项被删除之后触发

**Parameters**:
- `id` - (string | number) - 项的 id
- `item` - (object) - 项的对象

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterDelete", function(id, item){
    // 在此处编写你的代码
});
~~~

 datastore.onAfterDelete 事件的同义方法是 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 与 [onAfterLinkDelete](api/event/onafterlinkdelete.md) 事件。

---

### onBeforeAdd (id, item)
在数据存储中添加新项之前触发

**Parameters**:
- `id` - (string | number) - 项的 id
- `item` - (object) - 项的对象

**Returns**: boolean - 返回 false 以阻止默认操作

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeAdd", function(id, item){
    // 在此处编写你的代码
    return true;
});
~~~

 datastore.onBeforeAdd 事件的同义方法是 [onBeforeTaskAdd](api/event/onbeforetaskadd.md) 与 [onBeforeLinkAdd](api/event/onbeforelinkadd.md) 事件。

---

### onAfterAdd (id, item)
在数据存储中添加项后触发

**Parameters**:
- `id` - (string | number) - 项的 id
- `item` - (object) - 项的对象

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterAdd", function(id, item){
    // 在此处编写你的代码
});
~~~

 datastore.onAfterAdd 事件的同义方法是 [onAfterTaskAdd](api/event/onaftertaskadd.md) 与 [onAfterLinkAdd](api/event/onafterlinkadd.md) 事件。

---

### onIdChange (id, newId)
当项的 id 被改变时触发

**Parameters**:
- `id` - (string | number) - 项的 id
- `newId` - (string | number) - 项的新 id

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onIdChange", function(oldId, newId){
    // 在此处编写你的代码
});
~~~

 datastore.onIdChange 事件的同义方法是 [onTaskIdChange](api/event/ontaskidchange.md) 事件。

---

### onClearAll ()
在数据存储中的所有项被删除后触发

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onClearAll", function(){
    // 在此处编写你的代码
});
~~~

 datastore.onClearAll 事件的同义方法是 Gantt 的 [onClear](api/event/onclear.md) 事件。

---

### onBeforeStoreUpdate (id, item, action)
在数据存储被刷新之前触发

**Parameters**:
- `id` - (string | number | null) - 项的 id 或 null
- `item` - (object | null) - 项对象或 null
- `action` - (string | null) - 操作类型（"paint"、"move"、"add"、"delete"、null）

**Returns**: boolean - 返回 false 以阻止默认动作

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeStoreUpdate", function(id, item, action){
    // 在此处编写你的代码
    return true;
});
~~~

---

### onStoreUpdated (id, item, action)
在数据存储已刷新后触发

**Parameters**:
- `id` - (string | number | null) - 项的 id 或 null
- `item` - (object | null) - 项对象或 null
- `action` - (string | null) - 操作类型（"paint"、"move"、"add"、"delete"、null）

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onStoreUpdated", function(id, item, action){
    // 在此处编写你的代码
});
~~~

---

### onBeforeFilter ()
在应用筛选之前触发

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
在数据存储更新筛选状态后触发

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
在筛选过程中对每一项触发

**Parameters**:
- `id` - (string | number) - 项的 id
- `item` - (object) - 项的对象

**Returns**: boolean - 返回 false 以将项标记为不可见

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onFilterItem", function(id, item){
    // 在此处编写你的代码
    return true;
});
~~~

 datastore.onFilterItem 事件的同义方法是 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 事件。

---

### onDestroy () {#ondestroy}
在 destructor() 方法被调用后触发

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