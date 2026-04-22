---
sidebar_label: treeDatastore
title: treeDatastore конфигурация
description: "набор методов treeDatastore"
---

# treeDatastore

### Description

@short: Набор методов treeDatastore

@signature: treeDatastore: TreeDatastoreMethods

### Details

**_Note_**, что задачи и связи следует изменять, используя общий [API of Gantt](api/api-overview.md). Изменение задач или связей напрямую в datastore может привести к непредвиденным результатам. Datastores предназначены для использования с ресурсами или другими настраиваемыми объектами.

Новый datastore можно создать с помощью метода [createDatastore](api/method/createdatastore.md).

TreeDatastore расширяет [Datastore](api/other/datastore.md) и имеет все его методы. Расширенный API объекта **treeDatastore** предоставляет следующие [методы](#methods) и [события](#events):

## Methods

- **move (sid, tindex, parent): boolean | void** - перемещает элемент в новую позицию или к новому родителю
    - **_sid_** - (*string \| number*) - идентификатор элемента, который нужно переместить
    - **_tindex_** - (*number*) - индекс позиции, в которую элемент будет перемещён (индекс внутри ветви)
    - **_parent?_** - (*string \| number*) - необязательный идентификатор родителя. Если указан, tindex будет ссылаться на индекс в ветке 'parent'
    - Возвращает false, если действие отменено с помощью onBeforeItemMove; возвращает undefined в противном случае.

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


store.move(6, -1, 2);// перемещаем 'John' из 'QA' в 'Development'
~~~

Близнецом метода treeDatastore.move() является [gantt.moveTask()](api/method/movetask.md).

Вызывает события onBeforeItemMove, onAfterItemMove и все события метода refresh.


#### **getBranchIndex (id): number** - возвращает индекс элемента в ветке
- **_id_** - (*string \| number*) - идентификатор элемента

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

Близнецом treeDatastore.getBranchIndex() является [gantt.getTaskIndex()](api/method/gettaskindex.md).


- **hasChild (id): number | void** - проверяет, имеет ли указанный элемент дочерние элементы
    - **_id_** - (*string \| number*) - идентификатор элемента
    - Возвращает количество дочерних задач (если существуют), или undefined.

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

Близнецом treeDatastore.hasChild() является gantt.hasChild().


- **getChildren (id): Array\<number \| string \| object\>** - возвращает дочерние элементы указанной ветки первого уровня
    - **_id_** - (*string \| number*) - идентификатор родительской ветви
    - Возвращает массив идентификаторов дочерних элементов.

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

Близнецом treeDatastore.getChildren() является gantt.getChildren().


- **isChildOf (childId, parentId): boolean** - проверяет, является ли элемент ребенком другого элемента
    - **_childId_** - (*string \| number*) - идентификатор элемента, который нужно проверить как ребенка
    - **_parentId_** - (*string \| number*) - идентификатор элемента, который нужно проверить как родителя
    - Возвращает true, если элемент является ребенком указанного родителя. В противном случае false.

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

Близнецом treeDatastore.isChildOf() является [gantt.isChildOf()](api/method/ischildof.md).


- **getSiblings (id): Array\<number \| string \| object\>** - возвращает соседей указанного элемента (включая самого элемент)
    - **_id_** - (*string \| number*) - идентификатор элемента
    - Возвращает массив идентификаторов соседей элемента.

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

Близнецом treeDatastore.getSiblings() является [gantt.getSiblings()](api/method/getsiblings.md).


- **getNextSibling (id): number \| string \| null** - возвращает идентификатор следующего элемента на том же уровне
    - **_id_** - (*string \| number*) - идентификатор элемента
    - Возвращает идентификатор следующего соседа или null.

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

Близнецом(treeDatastore.getNextSibling()) является [gantt.getNextSibling()](api/method/getnextsibling.md).


- **getPrevSibling (id): number \| string \| null** - возвращает идентификатор предыдущего элемента на том же уровне
    - **_id_** - (*string \| number*) - идентификатор элемента
    - Возвращает идентификатор предыдущего соседа или null.

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

Близнецом treeDatastore.getPrevSibling() является [gantt.getPrevSibling()](api/method/getprevsibling.md).


- **getParent (id): number \| string** - возвращает идентификатор родительского элемента или 0
    - **_id_** - (*string \| number*) - идентификатор элемента

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

Близнецом treeDatastore.getParent() является [gantt.getParent()](api/method/getparent.md).


- **calculateItemLevel (item): number** - вычисляет уровень вложенности элемента
    - **_item_** - (*object*) - объект элемента

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

Близнецом treeDatastore.calculateItemLevel() является [gantt.calculateTaskLevel()](api/method/calculatetasklevel.md).


- **setParent (item, newParentId): void** - устанавливает родителя для элемента. Идентификатор родителя будет записан в свойство, указанное в конфигурации `parentProperty`, по умолчанию "item.parent"
    - **_item_** - (*object*) - объект элемента
    - **_newParentId_** - (*string \| number \| null*) - идентификатор родителя

:::note
Используйте **treeDatastore.move()** для перемещения задачи в другого родителя. Метод **setParent()** записывает значение в свойство, указанное в конфигурации, и не обновляет внутреннее состояние дерева.
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


Близнецом treeDatastore.setParent() является [gantt.setParent()](api/method/setparent.md).


- **eachItem (callback, parentId): void** - итерация по всем дочерним элементам указанного элемента
    - **_callback_** - (*Function*) - функция обратного вызова
    - **_parentId?_** - (*string \| number*) - необязательно, идентификатор родителя

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

Близнецом treeDatastore.eachItem() является [gantt.eachTask()](api/method/eachtask.md).


- **eachParent (callback, startItem): void** - итерация по всем родительским элементам указанного элемента
    - **_callback_** - (*Function*) - функция обратного вызова
    - **_startItem_** - (*string \| number*) - идентификатор элемента, родительский элемент которого следует перебирать

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


Близнецом treeDatastore.eachParent() является [gantt.eachParent()](api/method/eachparent.md).


- **open (id): void** - открывает ветку с указанным id
    - **_id_** - (*string \| number*) - идентификатор ветки

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

Близнецом treeDatastore.open() является [gantt.open()](api/method/open.md).

Вызывает событие onItemOpen.


- **close (id): void** - закрывает ветку с указанным id
    - **_id_** - (*string \| number*) - идентификатор ветки

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

Близнецом treeDatastore.close() является [gantt.close()](api/method/close.md).

Вызывает событие onItemClose.


- **sort (field, desc, parent, silent): void** - сортирует элементы в ресурc-grid
    - **_field_** - (*string \| Function*) - имя столбца, по которому будет происходить сортировка сетки ресурсов, либо пользовательская функция сортировки
    - **_desc?_** - (*boolean*) - необязательно, задаёт направление сортировки: true — убыванию, false — возрастанию. По умолчанию false
    - **_parent?_** - (*string \| number*) - необязательный идентификатор родителя. Укажите, чтобы сортировать только в этой ветке
    - **_silent?_** - (*boolean*) - необязательно, указывает, следует ли вызывать отрисовку после перемещения элементов

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
 

// отсортировать сетку ресурсов по колонке
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~

:::note
пример: [Gantt. Sorting resources by the column ](https://snippet.dhtmlx.com/gypniv9e )
:::

или можно определить пользовательскую функцию сортировки:

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
пример: [Gantt. Sorting resources by a custom function ](https://snippet.dhtmlx.com/fvjivly5)
:::

Близнецом treeDatastore.sort() является [gantt.sort()](api/method/sort.md).


## Events

- **onBeforeItemMove (id, parent, tindex)** - срабатывает перед перемещением элемента в новую позицию
    - **_id_** - (*string \| number*) - идентификатор элемента
    - **_parent_** - (*string \| number*) - идентификатор родителя
    - **_tindex_** - (*number*) - индекс позиции в ветке родителя, в которую перемещается элемент
    - Вернуть false, чтобы предотвратить выполнение действия по умолчанию события, иначе true.

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeItemMove", function(id, parent, tindex){
    // ваш код здесь
    return true;
});
~~~

Близнецом события onBeforeItemMove treeDatastore является событие [onBeforeTaskMove](api/event/onbeforetaskmove.md) в Gantt.


- **onAfterItemMove (id, parent, tindex)** - срабатывает после перемещения элемента в новую позицию
    - **_id_** - (*string \| number*) - идентификатор элемента
    - **_parent_** - (*string \| number*) - идентификатор родителя
    - **_tindex_** - (*number*) - индекс позиции в ветке родителя, в которую перемещается элемент

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterItemMove", function(id, parent, tindex){
    // ваш код здесь
});
~~~

Близнецом события onAfterItemMove treeDatastore является [onAfterTaskMove](api/event/onaftertaskmove.md) в Gantt.


- **onItemOpen (id)** - срабатывает при открытии ветки
    - **_id_** - (*string \| number*) - идентификатор ветки

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemOpen", function(id){
    // ваш код здесь
});
~~~

Близнецом события onItemOpen treeDatastore является событие [onTaskOpened](api/event/ontaskopened.md) в Gantt.


- **onItemClose (id)** - срабатывает при закрытии ветки
    - **_id_** - (*string \| number*) - идентификатор ветки

~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemClose", function(id){
    // ваш код здесь
});
~~~

Близнецом события onItemClose treeDatastore является событие [onTaskClosed](api/event/ontaskclosed.md) в Gantt.


### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [datastore](api/other/datastore.md)


### Related Guides
- [Resource Management](guides/resource-management.md)