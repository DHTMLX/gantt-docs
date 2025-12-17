---
sidebar_label: treeDatastore
title: treeDatastore config
description: "коллекция методов treeDatastore"
---

# treeDatastore

### Description

@short: Коллекция методов treeDatastore

@signature: treeDatastore: TreeDatastoreMethods


### Details

**_Примечание_**, задачи (Tasks) и связи (Links) следует обновлять через стандартный [API Gantt](api/api-overview.md). Прямое изменение задач или связей внутри datastore может привести к непредсказуемому поведению. Datastore в основном предназначены для ресурсов или других пользовательских объектов.

Вы можете создать новый datastore с помощью метода [createDatastore](api/method/createdatastore.md).

TreeDatastore наследует все методы от [Datastore](api/other/datastore.md).
Расширенный API объекта **treeDatastore** предоставляет следующие [методы](#methods) и [события](#events):

### Методы {#methods}

<ul><li>
  <b>move (sid, tindex, parent): boolean | void</b> - перемещает элемент на новую позицию или к новому родителю
  <ul>
  <li><b><i>sid</i></b> - (<i>string | number</i>) - идентификатор перемещаемого элемента</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - целевой индекс внутри ветки, куда будет помещен элемент</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - id нового родителя. Если указан, <b>tindex</b> считается относительно этой родительской ветки</li>
  </ul>
  Возвращает <i>false</i>, если перемещение отменено событием <b>onBeforeItemMove</b>, иначе возвращает <i>undefined</i>.
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

store.move(6, -1, 2);// перемещает 'John' из 'QA' в 'Development'
~~~
<br>
<br>
 <i>Аналогом treeDatastore.move() является [gantt.moveTask()](api/method/movetask.md).</i>
  <br>
  <i>Этот метод вызывает события [onBeforeItemMove](#onBeforeItemMove), [onAfterItemMove](#onAfterItemMove) и все события, связанные с методом [refresh](api/other/datastore.md#refresh).</i>

</ul>

<ul><li>
  <b>getBranchIndex (id): number</b> - возвращает индекс элемента внутри его ветки
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - идентификатор элемента</li>
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
 <i>Аналогом treeDatastore.getBranchIndex() является [gantt.getTaskIndex()](api/method/gettaskindex.md)</i>
</ul>


<ul><li>
  <b>hasChild (id): number | void</b> - проверяет, есть ли у указанного элемента дочерние элементы
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - идентификатор элемента</li>
  </ul>
  Возвращает <i>число</i> дочерних элементов, если они есть, или <i>undefined</i>, если дочерних элементов нет.

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
 <i>Аналогом treeDatastore.hasChild() является [gantt.hasChild()](api/method/haschild.md).</i>
</ul>

<ul><li>
  <b>getChildren (id): Array&lt;number | string | object&gt;</b> - возвращает прямых дочерних элементов указанной родительской ветки
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id родительской ветки</li>
  </ul>
  Возвращает массив с id дочерних элементов.
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
 <i>Аналогом treeDatastore.getChildren() является [gantt.getChildren()](api/method/getchildren.md).</i>
</ul>

<ul><li>
  <b>isChildOf (childId, parentId): boolean</b> - проверяет, является ли элемент дочерним для другого элемента
  <ul>
  <li><b><i>childId</i></b> - (<i>string | number</i>) - id потенциального дочернего элемента</li>
  <li><b><i>parentId</i></b> - (<i>string | number</i>) - id потенциального родителя</li>
  </ul>
  Возвращает <i>true</i>, если элемент является дочерним для указанного родителя; иначе <i>false</i>.
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
 <i>Аналогом treeDatastore.isChildOf() является [gantt.isChildOf()](api/method/ischildof.md).</i>
</ul>

<ul><li>
  <b>getSiblings (id): Array&lt;number | string | object&gt;</b> - возвращает siblings указанного элемента, включая сам элемент
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
  </ul>
  Возвращает массив с id siblings элемента.
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
 <i>Аналогом treeDatastore.getSiblings() является [gantt.getSiblings()](api/method/getsiblings.md).</i>
</ul>

<ul><li>
  <b>getNextSibling (id): number | string | null</b> - возвращает id следующего sibling на том же уровне
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id текущего элемента</li>
  </ul>
  Возвращает id следующего sibling или <i>null</i>, если его нет.
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
 <i>Аналогом treeDatastore.getNextSibling() является [gantt.getNextSibling()](api/method/getnextsibling.md).</i>
</ul>

<ul><li>
  <b>getPrevSibling (id): number | string | null</b> - возвращает id предыдущего sibling на том же уровне
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id текущего элемента</li>
  </ul>
  Возвращает id предыдущего sibling или <i>null</i>, если его нет.
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
 <i>Аналогом treeDatastore.getPrevSibling() является [gantt.getPrevSibling()](api/method/getprevsibling.md).</i>
</ul>

<ul><li>
  <b>getParent (id): number| string</b> - возвращает id родительского элемента или 0, если родителя нет
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id элемента</li>
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
 <i>Аналогом treeDatastore.getParent() является [gantt.getParent()](api/method/getparent.md).</i>
</ul>

<ul><li>
  <b>calculateItemLevel (item): number</b> - определяет уровень вложенности элемента
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - объект элемента</li>
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
 <i>Аналогом treeDatastore.calculateItemLevel() является [gantt.calculateTaskLevel()](api/method/calculatetasklevel.md).</i>
</ul>

<ul><li>
        <b>setParent (item, newParentId): void</b> - назначает новый родительский элемент, обновляя свойство, указанное в конфиге `parentProperty` (по умолчанию "item.parent").
  <ul>
  <li><b><i>item</i></b> - (<i>object</i>) - объект элемента</li>
  <li><b><i>newParentId</i></b> - (<i>string | number | null</i>) - id нового родителя</li>
  </ul>
</li></ul>

<ul>

:::note

Для корректного перемещения элемента к другому родителю используйте **treeDatastore.move()**. Метод **setParent()** только обновляет свойство элемента и не влияет на внутреннюю структуру дерева.
 
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
 <i>Аналогом treeDatastore.setParent() является [gantt.setParent()](api/method/setparent.md).</i>
</ul>

<ul><li>
  <b>eachItem (callback, parentId): void</b> - перебирает всех детей указанного элемента
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - функция, которая будет вызвана для каждого элемента</li>
  <li><b><i>parentId?</i></b> - (<i>string | number</i>) - id родителя, с которого начинать перебор</li>
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
 <i>Аналогом treeDatastore.eachItem() является [gantt.eachTask()](api/method/eachtask.md).</i>
</ul>

<ul><li>
  <b>eachParent (callback, startItem): void</b> - перебирает всех родителей указанного элемента
  <ul>
  <li><b><i>callback</i></b> - (<i>Function</i>) - функция, вызываемая для каждого родителя</li>
  <li><b><i>startItem</i></b> - (<i>string | number</i>) - id элемента, для которого перебираются родители</li>
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
 <i>Аналогом treeDatastore.eachParent() является [gantt.eachParent()](api/method/eachparent.md).</i>
</ul>

<ul><li>
  <b>open (id): void</b> - раскрывает ветку с указанным id
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id ветки</li>
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
 <i>Аналогом treeDatastore.open() является [gantt.open()](api/method/open.md).</i>
<i>Это вызывает событие [onItemOpen](#onItemOpen).</i>
</ul>

<ul><li>
  <b>close (id): void</b> - сворачивает ветку с указанным id
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id ветки</li>
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
 <i>Аналогом treeDatastore.close() является [gantt.close()](api/method/close.md).</i>
  <i>Это вызывает событие [onItemClose](#onItemClose).</i>
</ul>

<ul><li>
  <b>sort (field, desc, parent, silent): void</b> - сортирует элементы в resource grid
  <ul>
  <li><b><i>field</i></b> - (<i>string | Function</i>) - имя колонки для сортировки или пользовательская функция сортировки</li>
  <li><b><i>desc?</i></b> - (<i>boolean</i>) - порядок сортировки: <i>true</i> - по убыванию, <i>false</i> - по возрастанию (по умолчанию <i>false</i>)</li>
  <li><b><i>parent?</i></b> - (<i>string | number</i>) - id родителя, чтобы ограничить сортировку определенной веткой</li>
  <li><b><i>silent?</i></b> - (<i>boolean</i>) - пропустить рендеринг после сортировки</li>
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

// переключение направления сортировки и сортировка ресурсов по колонке
var resourceSortDirection = false;
function sortResources(){
    resourceSortDirection = !resourceSortDirection;
    gantt.getDatastore("resource").sort("text", resourceSortDirection)
    gantt.render();
}
~~~
<br>

:::note
Sample: [Gantt. Сортировка ресурсов по колонке](https://snippet.dhtmlx.com/gypniv9e) 
:::

<br><br>
Альтернативно, можно использовать пользовательскую функцию сортировки:

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
Sample: [Gantt. Сортировка ресурсов по пользовательской функции](https://snippet.dhtmlx.com/fvjivly5) 
:::
<br><br>
 <i>Аналогом treeDatastore.sort() является [gantt.sort()](api/method/sort.md).</i>
</ul>

### События {#events}

<ul id="onBeforeItemMove">
  <li>
  <b>onBeforeItemMove (id, parent, tindex)</b> - вызывается перед перемещением элемента на новую позицию
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id перемещаемого элемента</li>
  <li><b><i>parent</i></b> - (<i>string | number</i>) - id нового родителя</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - целевой индекс внутри ветки родителя</li>
  </ul>
  Верните <i>false</i> чтобы отменить перемещение, иначе <i>true</i>.
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onBeforeItemMove", function(id, parent, tindex){
    // ваш код здесь
    return true;
});
~~~
<br>
<br>
 <i>Аналогом события onBeforeItemMove treeDatastore является событие [onBeforeTaskMove](api/event/onbeforetaskmove.md) Gantt.</i>
</ul>

<ul id="onAfterItemMove">
  <li>
  <b>onAfterItemMove (id, parent, tindex)</b> - вызывается после перемещения элемента
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id перемещенного элемента</li>
  <li><b><i>parent</i></b> - (<i>string | number</i>) - id нового родителя</li>
  <li><b><i>tindex</i></b> - (<i>number</i>) - новый индекс внутри ветки родителя</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onAfterItemMove", function(id, parent, tindex){
    // ваш код здесь
});
~~~
<br>
<br>
 <i>Аналогом события onAfterItemMove treeDatastore является событие [onAfterTaskMove](api/event/onaftertaskmove.md) Gantt.</i>
</ul>

<ul id="onItemOpen">
  <li>
  <b>onItemOpen (id)</b> - вызывается при раскрытии ветки
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id ветки</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemOpen", function(id){
    // ваш код здесь
});
~~~
<br>
<br>
 <i>Аналогом события onItemOpen treeDatastore является событие [onTaskOpened](api/event/ontaskopened.md) Gantt.</i>
</ul>

<ul id="onItemClose">
  <li>
  <b>onItemClose (id)</b> - вызывается при сворачивании ветки
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - id ветки</li>
  </ul>
</li>
</ul>

<ul>
~~~js
var store = gantt.getDatastore(gantt.config.resource_store);
store.attachEvent("onItemClose", function(id){
    // ваш код здесь
});
~~~
<br>
<br>
 <i>Аналогом события onItemClose treeDatastore является событие [onTaskClosed](api/event/ontaskclosed.md) Gantt.</i>
</ul>

### Related API
- [createDatastore](api/method/createdatastore.md)
- [getDatastore](api/method/getdatastore.md)
- [datastore](api/other/datastore.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md)

