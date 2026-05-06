---
sidebar_label: createDatastore
title: createDatastore method
description: "создает datastore в соответствии с предоставленной конфигурацией"
---

# createDatastore

### Description

@short: Создает datastore в соответствии с предоставленной конфигурацией

@signature: createDatastore: (config: DatastoreConfig) =\> DatastoreMethods & TreeDatastoreMethods

### Parameters

- `config` - (required) *DatastoreConfig* - объект конфигурации datastore

### Returns
- ` datastore` - (datastore & treedatastore) - объект datastore или treedatastore в зависимости от типа

### Example

~~~jsx
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});
~~~

### Related samples
- [Диаграмма Ганта с панелью ресурсов](https://docs.dhtmlx.com/gantt/samples/10_layout/02_resource_panel.html)
- [Диаграмма использования ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Гистограмма ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)

### Details

Configuration object properties:

  
- **name** - (*string*) - произвольное строковое имя datastore. Хранилище данных можно получить по имени с помощью [getDatastore](api/method/getdatastore.md).
- **initItem? (item): any** - необязательный, предобрабатывает элементы, загруженные в datastore. Это хорошее место для установки значений по умолчанию элементов datastore. Функция принимает следующий параметр:
    - **_item_** - (*any*) - ресурсный элемент.
- **type?** - (*string*) - необязательный, принимает только фиксированное значение **"treeDatastore"**. Если указан type:"treeDatastore", хранилище будет поддерживать иерархические данные, где свойство **id** является первичным ключом, а **parent** — ссылкой на родительский id. Любое другое значение приведет к созданию плоского списка datastore.
- **fetchTasks?** - (*boolean*) - необязательный, включает отображение всех задач, назначенных конкретному ресурсу в панели просмотра ресурсов. Эта функциональность работает как для диаграммы ресурсов, так и для типа макета "resource histogram".

### Related API
- [datastore](api/other/datastore.md)
- [treeDatastore](api/other/treedatastore.md)

### Related Guides
- [Макет Ганта](guides/layout-config.md)
- [Управление ресурсами](guides/resource-management.md)