---
sidebar_label: datastore
title: datastore config
description: "коллекция методов datastore"
---

# datastore

### Description

@short: Коллекция методов datastore

@signature: datastore: DatastoreMethods


### Details

**_Примечание_**, задачи (Tasks) и связи (Links) следует управлять через стандартный [API Gantt](api/api-overview.md). Прямые изменения задач или связей внутри datastore могут привести к непредвиденным проблемам. Datastore в основном предназначены для ресурсов или других пользовательских объектов.

Вы можете создать новый datastore с помощью метода [createDatastore](api/method/createdatastore.md). <br>
Объект **datastore** предоставляет следующие [методы](#methods) и [события](#events):

### Методы {#methods}

<ul id="parse"><li>
  <b>parse (data): void</b> - загружает данные из массива
  <ul>
  <li><b><i>data</i></b> - (<i>Array&lt;object&gt;</i>) - данные для загрузки</li>
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
 <i>datastore.parse() дополняет [gantt.parse()](api/method/parse.md).</i>
  <br>
 <i>Вызывает события [onBeforeParse](#onBeforeParse), [onItemLoading](#onItemLoading), [onParse](#onParse) и [onStoreUpdated](#onStoreUpdated).</i>
</ul>


<ul id="getItem">
  <li>
  <b>getItem (id): object | void</b> - получает элемент по его id
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
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
 <i>datastore.getItem() соответствует [gantt.getTask()](api/method/gettask.md) и [gantt.getLink()](api/method/getlink.md).</i>
</ul>

<ul id="updateItem">
  <li>
  <b>updateItem (id, item): void</b> - обновляет указанный элемент
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  <li><b><i>item?</i></b> - (<i>object</i>) - объект с обновлёнными свойствами</li>
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
 <i>datastore.updateItem() похож на [gantt.updateTask()](api/method/updatetask.md) и [gantt.updateLink()](api/method/updatelink.md).</i>
<br>
 <i>Вызывает события [onBeforeUpdate](#onBeforeUpdate), [onAfterUpdate](#onAfterUpdate) и [onStoreUpdated](#onStoreUpdated).</i>

</ul>

<ul id="removeItem">
  <li>
  <b>removeItem (id): void</b> - удаляет указанный элемент
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
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
 <i>datastore.removeItem() аналогичен [gantt.deleteTask()](api/method/deletetask.md) и [gantt.deleteLink()](api/method/deletelink.md).</i>
<br>
 <i>Вызывает события [onBeforeDelete](#onBeforeDelete), [onAfterDelete](#onAfterDelete) и [onStoreUpdated](#onStoreUpdated).</i>
</ul>

<ul id="isVisible">
  <li>
  <b>isVisible (id): boolean</b> - определяет, видим ли элемент или скрыт фильтрами
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  </ul>
  Возвращает <i>true</i>, если элемент видим, иначе <i>false</i>.
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
 <i>datastore.isVisible() сравним с [gantt.isTaskVisible()](api/method/istaskvisible.md).</i>
</ul>

<ul id="getVisibleItems">
  <li>
  <b>getVisibleItems (): Array&lt;object&gt;</b> - возвращает массив видимых элементов
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
  <b>addItem (item, index): number | string</b> - добавляет новый элемент в datastore
  <ul><li><b><i>item</i></b> - (<i>object</i>) - объект элемента</li><li><b><i>index?</i></b> - (<i>number</i>) - позиция для вставки элемента (0 или больше)</li></ul>
  Возвращает id добавленного элемента.
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
 <i>datastore.addItem() соответствует [gantt.addTask()](api/method/addtask.md) и [gantt.addLink()](api/method/addlink.md).</i>
<br>
 <i>Вызывает события [onBeforeAdd](#onBeforeAdd), [onAfterAdd](#onAfterAdd) и [onStoreUpdated](#onStoreUpdated).</i>
</ul>

<ul id="changeId">
  <li>
  <b>changeId (oldId, newId): void</b> - обновляет id элемента
  <ul><li><b><i>oldId</i></b> - (<i>string | number</i>) - текущий id элемента</li><li><b><i>newId</i></b> - (<i>string | number</i>) - новый id для присвоения</li></ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

var itemId = store.addItem({
    text: "Unassigned",
    parent:4
});

// itemId - временный клиентский id для нового элемента
// обновите клиент новым id после сохранения в базе данных:

store.changeId(itemId, "databaseId");
~~~
<br>
<br>
 <i>datastore.changeId() похож на [gantt.changeTaskId()](api/method/changetaskid.md) и [gantt.changeLinkId()](api/method/changelinkid.md).</i>
 <br>
 <i>Вызывает событие [onIdChange](#onIdChange).</i>
</ul>


<ul id="exists">
  <li>
  <b>exists (id): boolean</b> - проверяет, существует ли элемент в datastore
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  </ul>
  Возвращает <i>true</i>, если элемент существует, иначе <i>false</i>.
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
 <i>datastore.exists() соответствует [gantt.isTaskExists()](api/method/istaskexists.md) и [gantt.isLinkExists()](api/method/islinkexists.md).</i>
</ul>


<ul id="move">
  <li>
  <b>move (sindex, tindex): void</b> - перемещает элемент на новую позицию
  <ul>
  <li><b><i>sindex</i></b> - (<i>number</i>) - текущий индекс элемента</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - целевой индекс для перемещения</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);

// поменять местами два элемента
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
  <i>datastore.move() дополняет [gantt.moveTask()](api/method/movetask.md).</i>
  <br>
  <i>Вызывает событие [onStoreUpdated](#onStoreUpdated).</i>
</ul>

<ul>
  <li>
  <b>clearAll (): void</b> - очищает datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.clearAll();
~~~
<br>
<br>
 <i>datastore.clearAll() соответствует [gantt.clearAll()](api/method/clearall.md).</i>
  <br>
 <i>Вызывает события [onClearAll](#onClearAll), [onBeforeStoreUpdate](#onBeforeStoreUpdate) и [onStoreUpdated](#onStoreUpdated).</i>

</ul>

<ul id="silent">
  <li>
  <b>silent (callback): void</b> - выполняет код без вызова событий API datastore
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - функция обратного вызова</li>
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
 <i>datastore.silent() дополняет [gantt.silent()](api/method/silent.md).</i>
</ul>

<ul id="refresh">
  <li>
  <b>refresh (id): void</b> - инициирует перерисовку событий указанной записи и применяет фильтры
  <ul>
  <li><b><i>id?</i></b> - (<i>string | number</i>) - необязательно, id записи</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.refresh(itemId); // перерисовка конкретного элемента
store.refresh(); // перерисовка всех элементов
~~~
<br>
<br>
 <i>datastore.refresh() соответствует [gantt.refreshTask()](api/method/refreshtask.md) и [gantt.refreshLink()](api/method/refreshlink.md).</i>
  <br>
 <i>Вызывает события [onBeforeStoreUpdate](#onBeforeStoreUpdate), [onBeforeFilter](#onBeforeFilter), [onFilterItem](#onFilterItem), [onFilter](#onFilter) и [onStoreUpdated](#onStoreUpdated).</i>

</ul>

<ul id="count">
  <li>
  <b>count (): number</b> - возвращает общее количество элементов, загруженных в datastore
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
 <i>datastore.count() соответствует [gantt.getTaskCount()](api/method/gettaskcount.md) и [gantt.getLinkCount()](api/method/getlinkcount.md).</i>
</ul>

<ul id="countVisible">
  <li>
  <b>countVisible (): number</b> - возвращает количество видимых элементов
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
alert(store.countVisible() + " items are visible");
~~~
<br>
<br>
 <i>datastore.countVisible() соответствует [gantt.getVisibleTaskCount()](api/method/getvisibletaskcount.md).</i>
</ul>

<ul id="eachItem">
  <li>
  <b>eachItem (callback): void</b> - перебирает все элементы в datastore
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - функция обратного вызова</li>
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
 <i>datastore.eachItem() соответствует [gantt.eachTask()](api/method/eachtask.md).</i>
</ul>

<ul id="filter">
  <li>
  <b>filter (): void</b> - применяет фильтры и обновляет список видимых элементов
</li>
Обычно этот метод вызывается автоматически через <b>store.refresh()</b>.
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.filter();
~~~
<br>
</ul>

<ul id="sort"><li>
  <b>sort (field, desc, parent, silent): void</b> - сортирует элементы в grid ресурсов
  <ul>
  <li><b><i>field</i></b> - (<i>string | Function</i>) - имя колонки для сортировки или пользовательская функция сортировки</li>
  <li><b><i>desc?</i></b> - (<i>boolean</i>) - направление сортировки: <i>true</i> - по убыванию, <i>false</i> - по возрастанию (по умолчанию <i>false</i>)</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - id родителя, чтобы ограничить сортировку его веткой</li>
  <li><b><i>silent?</i></b> - (<i>boolean</i>) - пропустить перерисовку после сортировки</li>
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

// переключение направления сортировки по колонке
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~
<br>

Или можно использовать пользовательскую функцию сортировки:

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
 <i>datastore.sort() дополняет [gantt.sort()](api/method/sort.md).</i>
</ul>

<ul id="getIndexRange">
  <li>
  <b>getIndexRange (from, to): Array&lt;object&gt;</b> - возвращает элементы в диапазоне индексов
  <ul>
  <li><b><i>from</i></b> - (<i>number</i>) - начальная позиция</li>
  <li><b><i>to</i></b> - (<i>number</i>) - конечная позиция</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var itemsInViewPort = store.getIndexRange(5, 10); // элементы с 5-го по 10-й
~~~
<br>
</ul>

<ul id="getItems">
  <li>
  <b>getItems (): Array&lt;object&gt;</b> - возвращает все элементы в datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var items = store.getItems();
~~~
<br>
<br>
 <i>datastore.getItems() соответствует [gantt.getTaskByTime()](api/method/gettaskbytime.md) и [gantt.getLinks()](api/method/getlinks.md).</i>
</ul>

<ul id="getIdByIndex">
  <li>
        <b>getIdByIndex (index): string | number | void</b> - возвращает id элемента по индексу или `undefined`, если элемента нет
  <ul>
  <li><b><i>index</i></b> - (<i>number</i>) - позиция элемента</li>
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
 <i>datastore.getIdByIndex() соответствует [gantt.getTaskByIndex()](api/method/gettaskbyindex.md).</i>
</ul>

<ul id="getIndexById">
  <li>
        <b>getIndexById (id): number</b> - возвращает индекс элемента по id или `-1`, если не найден
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
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
 <i>datastore.getIndexById() соответствует [gantt.getTaskIndex()](api/method/gettaskindex.md).</i>
</ul>

<ul id="getFirst">
  <li>
  <b>getFirst (): string | number | null</b> - возвращает id первого элемента в datastore
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
  <b>getLast (): string | number | null</b> - возвращает id последнего элемента в datastore
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
  <b>getNext (id): string | number | null</b> - возвращает id следующего за указанным элемента
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id текущего элемента</li>
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
 <i>datastore.getNext() соответствует [gantt.getNext()](api/method/getnext.md).</i>
</ul>

<ul id="getPrev">
  <li>
  <b>getPrev (id): string | number | null</b> - возвращает id предыдущего элемента относительно указанного
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id текущего элемента</li>
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
 <i>datastore.getPrev() соответствует [gantt.getPrev()](api/method/getprev.md).</i>
</ul>

<ul id="destructor">
  <li>
  <b>destructor (): void</b> - очищает datastore и удаляет все обработчики событий; после вызова datastore становится непригоден для использования
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.destructor();
~~~
<br>
<br>
 <i>datastore.destructor() соответствует [gantt.destructor()](api/method/destructor.md).</i>
</ul>


<ul id="attachEvent">
  <li>
  <b>attachEvent (name, handler, settings): string</b> - присоединяет обработчик к внутреннему событию datastore
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - имя события, без учёта регистра</li>
  <li><b><i>handler</i></b> - (<i>Function</i>) - функция-обработчик</li>
  <li><b><i>settings?</i></b> - (<i>object</i>) - необязательный объект настроек для обработчика</li>
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
 <i>datastore.attachEvent() соответствует [gantt.attachEvent()](api/method/attachevent.md).</i>
</ul>

<ul id="callEvent">
  <li>
  <b>callEvent (name, params): boolean</b> - вызывает внутреннее событие
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - имя события, без учёта регистра</li>
  <li><b><i>params</i></b> - (<i>Array&lt;any&gt;</i>) - массив данных, связанных с событием</li>
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
 <i>datastore.callEvent() соответствует [gantt.callEvent()](api/method/callevent.md).</i>
</ul>

<ul id="detachEvent">
  <li>
  <b>detachEvent (id): void</b> - удаляет ранее присоединённый обработчик события
  <ul>
  <li><b><i>id</i></b> - (<i>string</i>) - id обработчика события</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
var handlerId = store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});

// удаление обработчика события
store.detachEvent(handlerId);
~~~
<br>
<br>
 <i>datastore.detachEvent() соответствует [gantt.detachEvent()](api/method/detachevent.md).</i>
</ul>


### События {#events} 

<ul id="onItemLoading">
  <li>
  <b>onItemLoading (item)</b> - вызывается при загрузке элемента из источника данных
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - объект элемента</li>
  </ul>
  Верните <i>false</i>, чтобы отменить стандартное поведение события, иначе <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemLoading", function(item){
    if(item.valid){ // фильтрация элементов при загрузке по пользовательскому свойству
        return true;
    }
    return false;
});
~~~
<br>
<br>
 <i>событие onItemLoading datastore соответствует событию Gantt [onTaskLoading](api/event/ontaskloading.md).</i>
</ul>

<ul id="onBeforeParse">
  <li>
  <b>onBeforeParse (data)</b> - вызывается перед началом парсинга данных
  <ul>
  <li><b><i>data</i></b> - (<i>Array &lt;any&gt;</i>) - загруженный массив данных</li>
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
 <i>событие onBeforeParse datastore соответствует событию Gantt [onBeforeParse](api/event/onbeforeparse.md).</i>
</ul>

<ul id="onParse">
  <li>
  <b>onParse (data)</b> - вызывается после завершения парсинга, но до отрисовки в диаграмме Ганта
  <ul>
  <li><b><i>data</i></b> - (<i>Array &lt;any&gt;</i>) - загруженный массив данных</li>
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
 <i>событие onParse datastore соответствует событию Gantt [onParse](api/event/onparse.md).</i>
</ul>

<ul id="onBeforeUpdate">
  <li>
  <b>onBeforeUpdate (id, item)</b> - вызывается перед обновлением элемента
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  <li><b><i>item</i></b> - (<i>object</i>) - обновлённый объект элемента</li>
  </ul>
  Верните <i>false</i>, чтобы отменить стандартное действие события, иначе <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeUpdate", function(id, item){
    // ваш код здесь
    return true;
});
~~~
<br>
<br>
 <i>событие onBeforeUpdate datastore соответствует событиям Gantt [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md) и [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md).</i>
</ul>

<ul id="onAfterUpdate">
  <li>
  <b>onAfterUpdate (id, item)</b> - вызывается после обновления элемента
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  <li><b><i>item</i></b> - (<i>object</i>) - обновлённый объект элемента</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterUpdate", function(id, item){
    // ваш код здесь
});
~~~
<br>
<br>
 <i>событие onAfterUpdate datastore соответствует событиям Gantt [onAfterTaskUpdate](api/event/onaftertaskupdate.md) и [onAfterLinkUpdate](api/event/onafterlinkupdate.md).</i>
</ul>

<ul id="onBeforeDelete">
  <li>
  <b>onBeforeDelete (id, item)</b> - вызывается перед удалением элемента
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  <li><b><i>item</i></b> - (<i>object</i>) - объект элемента</li>
  </ul>
  Верните <i>false</i>, чтобы отменить стандартное действие события, иначе <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeDelete", function(id, item){
    // ваш код здесь
    return true;
});
~~~
<br>
<br>
 <i>событие onBeforeDelete datastore соответствует событиям Gantt [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) и [onBeforeLinkDelete](api/event/onbeforelinkdelete.md).</i>
</ul>

<ul id="onAfterDelete">
  <li>
  <b>onAfterDelete (id, item)</b> - вызывается после удаления элемента
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  <li><b><i>item</i></b> - (<i>object</i>) - объект элемента</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterDelete", function(id, item){
    // ваш код здесь
});
~~~
<br>
<br>
 <i>событие onAfterDelete datastore соответствует событиям Gantt [onAfterTaskDelete](api/event/onaftertaskdelete.md) и [onAfterLinkDelete](api/event/onafterlinkdelete.md).</i>
</ul>

<ul id="onBeforeAdd">
  <li>
  <b>onBeforeAdd (id, item)</b> - вызывается перед добавлением нового элемента в datastore
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  <li><b><i>item</i></b> - (<i>object</i>) - объект элемента</li>
  </ul>
  Верните <i>false</i>, чтобы отменить стандартное действие события, иначе <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeAdd", function(id, item){
    // ваш код здесь
    return true;
});
~~~
<br>
<br>
 <i>событие onBeforeAdd datastore соответствует событиям Gantt [onBeforeTaskAdd](api/event/onbeforetaskadd.md) и [onBeforeLinkAdd](api/event/onbeforelinkadd.md).</i>
</ul>

<ul id="onAfterAdd">
  <li>
  <b>onAfterAdd (id, item)</b> - вызывается после добавления нового элемента в datastore
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  <li><b><i>item</i></b> - (<i>object</i>) - объект элемента</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterAdd", function(id, item){
    // ваш код здесь
});
~~~
<br>
<br>
 <i>событие onAfterAdd datastore соответствует событиям Gantt [onAfterTaskAdd](api/event/onaftertaskadd.md) и [onAfterLinkAdd](api/event/onafterlinkadd.md).</i>
</ul>

<ul id="onIdChange">
  <li>
  <b>onIdChange (id, newId)</b> - вызывается при изменении id элемента
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - старый id</li>
  <li><b><i>newId</i></b> - (<i>string | number</i>) - новый id</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onIdChange", function(oldId, newId){
    // ваш код здесь
});
~~~
<br>
<br>
 <i>событие onIdChange datastore соответствует событию Gantt [onTaskIdChange](api/event/ontaskidchange.md).</i>
</ul>

<ul id="onClearAll">
  <li>
  <b>onClearAll ()</b> - вызывается после удаления всех элементов из datastore
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onClearAll", function(){
    // ваш код здесь
});
~~~
<br>
 <i>событие onClearAll datastore соответствует событию Gantt [onClear](api/event/onclear.md).</i>
</ul>


<ul id="onBeforeStoreUpdate">
  <li>
  <b>onBeforeStoreUpdate (id, item, action)</b> - вызывается перед обновлением datastore
  <ul>
  <li><b><i>id</i></b> - (<i>string | number | null</i>) - id элемента или null</li>
  <li><b><i>item</i></b> - (<i>object | null</i>) - объект элемента или null</li>
  <li><b><i>action</i></b> - (<i>string | null</i>) - тип действия ("paint", "move", "add", "delete", null)</li>
  </ul>
  Верните <i>false</i>, чтобы отменить стандартное действие события, иначе <i>true</i>.
  <br>
        Это событие означает, что элементы datastore должны быть перерисованы. Значение `null` означает обновление всего datastore.

</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeStoreUpdate", function(id, item, action){
    // ваш код здесь
    return true;
});
~~~
<br>
</ul>


<ul id="onStoreUpdated">
  <li>
  <b>onStoreUpdated (id, item, action)</b> - вызывается после обновления datastore
  <ul>
  <li><b><i>id</i></b> - (<i>string | number | null</i>) - id элемента или null</li>
  <li><b><i>item</i></b> - (<i>object | null</i>) - объект элемента или null</li>
  <li><b><i>action</i></b> - (<i>string | null</i>) - тип действия ("paint", "move", "add", "delete", null)</li>
  </ul>
        Это событие сигнализирует, что элементы datastore должны быть перерисованы. Значение `null` означает обновление всего datastore.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onStoreUpdated", function(id, item, action){
    // ваш код здесь
});
~~~
<br>
</ul>


<ul id="onBeforeFilter">
  <li>
  <b>onBeforeFilter ()</b> - вызывается перед применением фильтров
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
  <b>onFilter ()</b> - вызывается после применения фильтров и обновления видимых элементов
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
        <b>onFilterItem (id, item)</b> - вызывается для каждого элемента при фильтрации; возврат `false` скрывает элемент
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  <li><b><i>item</i></b> - (<i>object</i>) - объект элемента</li>
  </ul>
  Верните <i>false</i>, чтобы скрыть элемент, иначе <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onFilterItem", function(id, item){
    // ваш код здесь
    return true;
});
~~~
<br>
 <i>событие onFilterItem datastore соответствует событию Gantt [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md).</i>
</ul>

<ul id="ondestroy">
  <li>
  <b>onDestroy ()</b> - вызывается после вызова метода destructor() datastore
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
- [Управление ресурсами](guides/resource-management.md)

