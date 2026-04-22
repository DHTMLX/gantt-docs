---
sidebar_label: resources
title: resources config
description: "defines an extra configuration for the resource store"
---

# resources

### Description

@short: Определяет дополнительную конфигурацию для хранилища ресурсов

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
- [Назначение значений ресурсов на конкретные дни](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

Свойство **resources** представляет объект с набором атрибутов:

- **dataprocessor_assignments** - (*boolean*) - определяет, можно ли отправлять изменённые привязки ресурсов в DataProcessor как отдельные записи с постоянными идентификаторами
- **dataprocessor_resources** - (*boolean*) - определяет, можно ли отправлять изменённые объекты ресурсов в DataProcessor как отдельные записи с постоянными идентификаторами
- **editable_resource_diagram** - (*boolean*) - определяет, будут ли привязки ресурсов редактируемыми в диаграмме ресурсов
- **resource_store** - (*object*) - создаёт хранилище ресурсов по умолчанию. Объект включает следующие свойства:
    - **_type?_** - (*string*) - необязателен, принимает только одно фиксированное значение **"treeDatastore"**. Если указан type:"treeDatastore", хранилище будет поддерживать иерархические данные, при этом свойство **id** является первичным ключом, а **parent** — ссылкой на родительский id. Любое другое значение приведёт к созданию плоского списка хранилища.
    - **_initItem?_** - (*Function*): any - необязателен, предобрабатывает элементы, загруженные в хранилище. Это хорошее место для задания значений по умолчанию элементов хранилища. Функция принимает следующий параметр:
        - **_item_** - (*any*) - ресурсный элемент
    - **_fetchTasks?_** - (*boolean*) - необязателен, включает отображение всех задач, назначенных определённому ресурсу, в панели просмотра ресурсов. Эта функциональность работает как для диаграммы ресурсов, так и для типа размещения гистограммы ресурсов.
- **lightbox_resources? (resourceArray): any** - необязательная функция, которая принимает все ресурсы в качестве аргумента и должна возвращать массив ресурсов, которые должны быть доступны в контроле ресурсов светлого окна (lightbox). По умолчанию управление будет заполнено ресурсами, у которых нет под-ресурсов. 
    - **_resourceArray_** - (*any*) - массив ресурсов

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- added in v8.0