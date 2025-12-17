---
sidebar_label: resources
title: resources config
description: "определяет дополнительные настройки для resource store"
---

# resources

### Description

@short: Определяет дополнительные настройки для resource store

@signature: resources: boolean | \{ dataprocessor_assignments?: boolean; dataprocessor_resources?: boolean; editable_resource_diagram?: boolean; resource_store?: \{ type?: string; initItem?: ((item: any) =\> any); fetchTasks?: boolean; \}; lightbox_resources?(resourceArray: any): any; \}

### Example

~~~jsx
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
    editable_resource_diagram: true,
    resource_store: {
        type: "treeDataStore",
        fetchTasks: true,
        initItem: function(item) {
            item.parent = item.parent || gantt.config.root_id;
            item[gantt.config.resource_property] = item.parent;
            item.open = true;
            return item;
        }
    },
    lightbox_resources: function selectResourceControlOptions(resources){
        const lightboxOptions = [];
        resources.forEach(function(res) {
            if (!gantt.$resourcesStore.hasChild(res.id)) {
                const copy = gantt.copy(res);
                copy.key = res.id;
                copy.label = res.text;
                lightboxOptions.push(copy);
            }
        });
        return lightboxOptions;
    }
};
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

Настройка **resources** представляет собой объект, включающий несколько опций:

- **dataprocessor_assignments** - (*boolean*) - определяет, отправляются ли изменения назначений ресурсов в DataProcessor как отдельные записи с постоянными ID
- **dataprocessor_resources** - (*boolean*) - управляет отправкой изменений объектов ресурсов в DataProcessor как отдельные записи с постоянными ID
- **editable_resource_diagram** - (*boolean*) - контролирует возможность редактирования назначений ресурсов непосредственно в resource diagram
- **resource_store** - (*object*) - настраивает стандартный resource datastore со следующими свойствами:
    - **_type?_** - (*string*) - необязательный параметр, принимает только фиксированное значение **"treeDataStore"**. При установке этого значения datastore поддерживает иерархические данные с использованием **id** как первичного ключа и **parent** как ссылки на родительский id. Любое другое значение приводит к плоскому списку в datastore.
    - **_initItem?_** - (*Function*): any - необязательный, позволяет предварительную обработку элементов, загружаемых в datastore, полезно для установки значений по умолчанию. Функция принимает:
        - **_item_** - (*any*) - обрабатываемый ресурсный элемент
    - **_fetchTasks?_** - (*boolean*) - необязательный, включает отображение всех задач, назначенных ресурсу, в панели просмотра ресурсов. Работает как для resource diagram, так и для resource histogram.
- **lightbox_resources? (resourceArray): any** - необязательная функция, которая получает все ресурсы и возвращает массив ресурсов для отображения в контроле ресурсов лайтбокса. По умолчанию включаются только ресурсы без подресурсов.
    - **_resourceArray_** - (*any*) - массив объектов ресурсов

### Related Guides
- [Управление ресурсами](guides/resource-management.md)

### Change log
- добавлено в v8.0
