---
sidebar_label: datastore
title: datastore config
description: "набор методов datastore"
---

# datastore

### Description

@short: Набор методов datastore

@signature: datastore: DatastoreMethods

### Details

**_Note_**, that Tasks и Links следует изменять, используя общий [API of Gantt](api/api-overview.md). Изменение задач или ссылок напрямую в datastore может привести к непредвиденным результатам. Datastores ожидается использовать для ресурсов или других настраиваемых объектов.

Новый datastore можно создать с помощью метода [createDatastore](api/method/createdatastore.md). 
Объект **datastore** обладает следующими [methods](#methods) и [events](#events):

## Methods

### parse (data): void 
Загружает данные из массива

**Parameters**:
- `data` - (Array\<object\>) - данные для загрузки

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
sample
[Диаграмма загрузки ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
:::

Аналог datastore.parse() — [gantt.parse()](api/method/parse.md).

Вызвает события [onBeforeParse](#onbeforeparse-data), [onItemLoading](#onitemloading-item), [onParse](#onparse-data) и [onStoreUpdated](#onstoreupdated-id-item-action).

---

### getItem (id)
Возвращает элемент по его id

**Parameters**:
- `id` - (string | number) - id элемента

**Returns**: object | void - объект элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const resource = store.getItem(resourceId);
~~~

:::note
sample
[Диаграмма загрузки ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
:::

Двойники datastore.getItem() — [gantt.getTask()](api/method/gettask.md) и [gantt.getLink()](api/method/getlink.md).

---

### updateItem (id, item)
Обновляет указанный элемент

**Parameters**:
- `id` - (string | number) - id элемента
- `item` - (object) - объект элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const resource = store.getItem(resourceId);
resource.text = "modified";
store.updateItem(resourceId);
// or
store.updateItem(resourceId, { text: "modified" });
~~~

Двойники datastore.updateItem() — [gantt.updateTask()](api/method/updatetask.md) и [gantt.updateLink()](api/method/updatelink.md).

Вызвает события [onBeforeUpdate](#onbeforeupdate-id-item), [onAfterUpdate](#onafterupdate-id-item) и [onStoreUpdated](#onstoreupdated-id-item-action).

---

### removeItem (id)
Удаляет указанный элемент

**Parameters**:
- `id` - (string | number) - id элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.removeItem(resourceId);
~~~

Двойники datastore.removeItem() — [gantt.deleteTask()](api/method/deletetask.md) и [gantt.deleteLink()](api/method/deletelink.md).

Вызвает события [onBeforeDelete](#onbeforedelete-id-item), [onAfterDelete](#onafterdelete-id-item) и [onStoreUpdated](#onstoreupdated-id-item-action).

---

### isVisible (id)
Проверяет, видим ли указанный элемент или скрыт через фильтры

**Parameters**:
- `id` - (string | number) - id элемента

**Returns**: boolean - true, если видим, иначе false

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
if(store.isVisible(resourceId)){
    console.log(resourceId);
}
~~~

Двойник datastore.isVisible() — [gantt.isTaskVisible()](api/method/istaskvisible.md).

---

### getVisibleItems ()
Возвращает массив видимых элементов

**Returns**: Array\<object\> - массив видимых элементов

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const items = store.getVisibleItems();
~~~

---

### addItem (item, index)
Добавляет новый элемент в datastore

**Parameters**:
- `item` - (object) - объект элемента
- `index` - (number) - позиция, на которую элемент будет добавлен (0 и далее)

**Returns**: number | string - id элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemId = store.addItem({
    text: "Unassigned",
    parent:4
});
~~~

Двойники datastore.addItem() — [gantt.addTask()](api/method/addtask.md) и [gantt.addLink()](api/method/addlink.md).

Вызвает события [onBeforeAdd](#onbeforeadd-id-item), [onAfterAdd](#onafteradd-id-item) и [onStoreUpdated](#onstoreupdated-id-item-action).

---

### changeId (oldId, newId)
Изменяет id элемента

**Parameters**:
- `oldId` - (string | number) - текущее id элемента
- `newId` - (string | number) - новый id элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

const itemId = store.addItem({
    text: "Unassigned",
    parent:4
});

// itemId - временный client-side id нового элемента
// после сохранения в базу данных обновите клиент с новым id:

store.changeId(itemId, "databaseId");
~~~

Двойники datastore.changeId() — [gantt.changeTaskId()](api/method/changetaskid.md) и [gantt.changeLinkId()](api/method/changelinkid.md).

Вызвает событие [onIdChange](#onidchange-id-newid).

---

### exists (id)
Проверяет, существует ли указанный элемент в datastore

**Parameters**:
- `id` - (string | number) - id элемента

**Returns**: boolean - true, если существует, иначе false

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

if(store.exists(resourceId)){
    console.log(resourceId);
}
~~~

Двойники datastore.exists() — [gantt.isTaskExists()](api/method/istaskexists.md) и [gantt.isLinkExists()](api/method/islinkexists.md).

---

### move (sindex, tindex)
Перемещает элемент в новую позицию

**Parameters**:
- `sindex` - (number) - индекс текущей позиции элемента
- `tindex` - (number) - индекс позиции, куда элемент будет перемещён

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);

// обмен двумя элементами
const idA = 1;
const idB = 5;
const indexA = store.getIndexById(idA);
const indexB = store.getIndexById(idB);
store.move(indexB, indexA);

indexA = store.getIndexById(idA);
store.move(indexA, indexB);
~~~

Двойник datastore.move() — [gantt.moveTask()](api/method/movetask.md).

Вызвает событие [onStoreUpdated](#onstoreupdated-id-item-action).

---

### clearAll ()
Очищает datastore

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.clearAll();
~~~

Двойник datastore.clearAll() — [gantt.clearAll()](api/method/clearall.md).

Вызвает события [onClearAll](#onclearall-), [onBeforeStoreUpdate](#onbeforestoreupdate-id-item-action) и [onStoreUpdated](#onstoreupdated-id-item-action).

---

### silent (callback)
Выполняет код без вызова API-событий datastore

**Parameters**:
- `callback` - (Function) - функция обратного вызова

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

Двойник datastore.silent() — [gantt.silent()](api/method/silent.md).

---

### refresh (id)
Сигнализирует повторную отрисовку событий указанной записи, выполняет фильтры

**Parameters**:
- `id` - (string | number) - необязательно, id записи

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.refresh(itemId); // повторно рисует элемент
store.refresh(); // повторно рисует все элементы
~~~

Двойники datastore.refresh() — [gantt.refreshTask()](api/method/refreshtask.md) и [gantt.refreshLink()](api/method/refreshlink.md).

Вызвает события [onBeforeStoreUpdate](#onbeforestoreupdate-id-item-action), [onBeforeFilter](#onbeforefilter-), [onFilterItem](#onfilteritem-id-item), [onFilter](#onfilter-) и [onStoreUpdated](#onstoreupdated-id-item-action).

---

### count ()
Возвращает количество элементов, загруженных в datastore

**Returns**: number - количество элементов

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onParse", function(){
    alert(store.count() + " items loaded");
});
~~~

Двойники datastore.count() — [gantt.getTaskCount()](api/method/gettaskcount.md) и [gantt.getLinkCount()](api/method/getlinkcount.md).

---

### countVisible ()
Возвращает количество видимых элементов

**Returns**: number - количество видимых элементов

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
alert(store.countVisible() + " items are visible");
~~~

Двойник datastore.countVisible() — [gantt.getVisibleTaskCount()](api/method/getvisibletaskcount.md).

---

### eachItem (callback)
Итерирует по всем элементам datastore

**Parameters**:
- `callback` - (Function) - функция обратного вызова

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

Двойник datastore.eachItem() — [gantt.eachTask()](api/method/eachtask.md).

---

### filter ()
Запускает фильтры и обновляет видимый массив элементов

Обычно этот метод вызывать не нужно, он вызывается автоматически из store.refresh().

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.filter();
~~~

---

### sort (field, desc, parent, silent)
Сортирует элементы в grid ресурсов

**Parameters**:
- `field` - (string | Function) - имя колонки или функция пользовательской сортировки
- `desc` - (boolean) - задаёт направление сортировки: true - по убыванию, false - по возрастанию
- `parent` - (string | number) - id родительского элемента
- `silent` - (boolean) - задаёт, следует ли вызывать рендеринг после переупорядочивания

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

// сортировать grid ресурсов по колонке
let resourceSortDirection = false;

function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~

или можно определить пользовательскую функцию сортировки:

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

Двойник datastore.sort() — [gantt.sort()](api/method/sort.md).

---

### getIndexRange (from, to)
Возвращает записи между указанными индексами

**Parameters**:
- `from` - (number) - позиция начальной записи
- `to` - (number) - позиция конечной записи

**Returns**: Array\<object\> - массив элементов

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemsInViewPort = store.getIndexRange(5, 10);// получить элементы с 5-й по 10-ю
~~~

---

### getItems ()
Returns all records of the datastore

**Returns**: Array\<object\> - массив всех элементов

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const items = store.getItems();
~~~

The twins of datastore.getItems() are [gantt.getTaskByTime()](api/method/gettaskbytime.md) and [gantt.getLinks()](api/method/getlinks.md).

---

### getIdByIndex (index)
Возвращает id элемента по его индексу

**Parameters**:
- `index` - (number) - позиция элемента

**Returns**: string | number | void - id элемента или undefined

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstItem = store.getIdByIndex(0);
~~~

Двойник datastore.getIdByIndex() — [gantt.getTaskByIndex()](api/method/gettaskbyindex.md).

---

### getIndexById (id)
Возвращает индекс элемента по его id

**Parameters**:
- `id` - (string | number) - id элемента

**Returns**: number - индекс элемента или -1 если не найден

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const itemIndex = store.getIndexById(5);
~~~

Двойник datastore.getIndexById() — [gantt.getTaskIndex()](api/method/gettaskindex.md).

---

### getFirst ()
Возвращает id первого элемента datastore

**Returns**: string | number | null - id первого элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstId = store.getFirst();
~~~

---

### getLast ()
Возвращает id последнего элемента datastore

**Returns**: string | number | null - id последнего элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const lastId = store.getLast();
~~~

---

### getNext (id)
Возвращает id следующего элемента datastore

**Parameters**:
- `id` - (string | number) - id элемента

**Returns**: string | number | null - id следующего элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const firstId = store.getFirst();
const secondId = store.getNext(firstId);
~~~

Двойник datastore.getNext() — [gantt.getNext()](api/method/getnext.md).

---

### getPrev (id)
Возвращает id предыдущего элемента datastore

**Parameters**:
- `id` - (string | number) - id элемента

**Returns**: string | number | null - id предыдущего элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const prevId = store.getPrev(itemId);
~~~

Двойник datastore.getPrev() — [gantt.getPrev()](api/method/getprev.md).

---

### destructor ()
Очищает datastore и удаляет все подключенные обработчики событий

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.destructor();
~~~

Двойник datastore.destructor() — [gantt.destructor()](api/method/destructor.md).

---

### attachEvent (name, handler, settings)
Прикрепляет обработчик к внутреннему событию DataStore

**Parameters**:
- `name` - (string) - имя события, без учёта регистра
- `handler` - (Function) - функция обработчика
- `settings` - (object) - необязательно, объект с настройками для обработчика

**Returns**: string - id события

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});
~~~

Двойник datastore.attachEvent() — [gantt.attachEvent()](api/method/attachevent.md).

---

### callEvent (name, params)
Вызывает внутреннее событие

**Parameters**:
- `name` - (string) - имя события, без учёта регистра
- `params` - (Array\<any\>) - массив данных, связанных с событием

**Returns**: boolean - true, если событие выполнено успешно

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.callEvent("CustomEvent", [param1, param2]);
~~~

Двойник datastore.callEvent() — [gantt.callEvent()](api/method/callevent.md).

---

### detachEvent (id)
Открепляет обработчик от события

**Parameters**:
- `id` - (string) - id события

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
const handlerId = store.attachEvent("onAfterSelect", function(id){
    gantt.refreshData();
});

// detach a listener
store.detachEvent(handlerId);
~~~

Двойник datastore.detachEvent() — [gantt.detachEvent()](api/method/detachevent.md).

---

## Events

### onItemLoading (item)
Срабатывает, когда элемент загружается из источника данных

**Parameters**:
- `item` - (object) - объект элемента

**Returns**: boolean - вернуть false, чтобы предотвратить действие по умолчанию

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemLoading", function(item){
    if(item.valid){ // фильтр элементов при загрузке по пользовательскому свойству
        return true;
    }
    return false;
});
~~~

Двойник события onItemLoading datastore — [onTaskLoading](api/event/ontaskloading.md) события Gantt.

---

### onBeforeParse (data)
Срабатывает до начала разбора данных

**Parameters**:
- `data` - (Array\<any\>) - массив данных, которые были загружены

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

Двойник события onBeforeParse datastore — [onBeforeParse](api/event/onbeforeparse.md) события Gantt.

---

### onParse (data)
Срабатывает после разбора данных, но до их отрисовки

**Parameters**:
- `data` - (Array\<any\>) - массив загруженных данных

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

Двойник события onParse datastore — событие onParse Gantt.

---

### onBeforeUpdate (id, item)
Срабатывает перед обновлением элемента

**Parameters**:
- `id` - (string | number) - id элемента
- `item` - (object) - новый (обновлённый) объект элемента

**Returns**: boolean - вернуть false, чтобы предотвратить действие по умолчанию

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeUpdate", function(id, item){
    // ваш код здесь
    return true;
});
~~~

Двойники onBeforeUpdate datastore — [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md) и [onBeforeLinkUpdate](api/event/onbeforelinkupdate.md) события Gantt.

---

### onAfterUpdate (id, item)
Срабатывает после обновления элемента

**Parameters**:
- `id` - (string | number) - id элемента
- `item` - (object) - объект элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterUpdate", function(id, item){
    // ваш код здесь
});
~~~

Двойники onAfterUpdate datastore — [onAfterTaskUpdate](api/event/onaftertaskupdate.md) и [onAfterLinkUpdate](api/event/onafterlinkupdate.md) события Gantt.

---

### onBeforeDelete (id, item)
Срабатывает перед удалением элемента

**Parameters**:
- `id` - (string | number) - id элемента
- `item` - (object) - объект элемента

**Returns**: boolean - вернуть false, чтобы предотвратить действие по умолчанию

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeDelete", function(id, item){
    // ваш код здесь
    return true;
});
~~~

Двойники onBeforeDelete datastore — [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) и [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) события Gantt.

---

### onAfterDelete (id, item)
Срабатывает после удаления элемента

**Parameters**:
- `id` - (string | number) - id элемента
- `item` - (object) - объект элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterDelete", function(id, item){
    // ваш код здесь
});
~~~

Двойники onAfterDelete datastore — [onAfterTaskDelete](api/event/onaftertaskdelete.md) и [onAfterLinkDelete](api/event/onafterlinkdelete.md) события Gantt.

---

### onBeforeAdd (id, item)
Срабатывает перед добавлением нового элемента в datastore

**Parameters**:
- `id` - (string | number) - id элемента
- `item` - (object) - объект элемента

**Returns**: boolean - вернуть false, чтобы предотвратить действие по умолчанию

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeAdd", function(id, item){
    // ваш код здесь
    return true;
});
~~~

Двойники onBeforeAdd datastore — [onBeforeTaskAdd](api/event/onbeforetaskadd.md) и [onBeforeLinkAdd](api/event/onbeforelinkadd.md) события Gantt.

---

### onAfterAdd (id, item)
Срабатывает после добавления элемента в datastore

**Parameters**:
- `id` - (string | number) - id элемента
- `item` - (object) - объект элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterAdd", function(id, item){
    // ваш код здесь
});
~~~

Двойники onAfterAdd datastore — [onAfterTaskAdd](api/event/onaftertaskadd.md) и [onAfterLinkAdd](api/event/onafterlinkadd.md) события Gantt.

---

### onIdChange (id, newId)
Срабатывает, когда изменяется id элемента

**Parameters**:
- `id` - (string | number) - id элемента
- `newId` - (string | number) - новый id элемента

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onIdChange", function(oldId, newId){
    // ваш код здесь
});
~~~

Двойник onIdChange datastore — [onTaskIdChange](api/event/ontaskidchange.md) событие Gantt.

---

### onClearAll ()
Срабатывает после удаления всех элементов из datastore

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onClearAll", function(){
    // ваш код здесь
});
~~~

Двойник onClearAll datastore — [onClear](api/event/onclear.md) событие Gantt.

---

### onBeforeStoreUpdate (id, item, action)
Срабатывает перед обновлением datastore

**Parameters**:
- `id` - (string | number | null) - id элемента или null
- `item` - (object | null) - объект элемента или null
- `action` - (string | null) - тип действия ("paint", "move", "add", "delete", null)

**Returns**: boolean - вернуть false, чтобы предотвратить действие по умолчанию

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeStoreUpdate", function(id, item, action){
    // ваш код здесь
    return true;
});
~~~

---

### onStoreUpdated (id, item, action)
Срабатывает после обновления datastore

**Parameters**:
- `id` - (string | number | null) - id элемента или null
- `item` - (object | null) - объект элемента или null
- `action` - (string | null) - тип действия ("paint", "move", "add", "delete", null)

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onStoreUpdated", function(id, item, action){
    // ваш код здесь
});
~~~

---

### onBeforeFilter ()
Срабатывает перед применением фильтра

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
Срабатывает после обновления состояния фильтрации datastore

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
Срабатывает для каждого элемента во время фильтрации

**Parameters**:
- `id` - (string | number) - id элемента
- `item` - (object) - объект элемента

**Returns**: boolean - вернуть false, чтобы пометить элемент как не видимый

**Example**:
~~~js
const store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onFilterItem", function(id, item){
    // ваш код здесь
    return true;
});
~~~

Двойник onFilterItem datastore — [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) событие Gantt.

---

### onDestroy () {#ondestroy}
Срабатывает после вызова метода destructor()

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