---
sidebar_label: sort
title: sort method
description: "сортирует задачи в grid"
---

# sort

### Description

@short: Сортирует задачи в grid

@signature: sort: (field: string | Function, desc?: boolean, parent?: string | number, silent?: boolean) =\> void,

### Parameters

- `field` - (required) *string | SortTasks* -        имя колонки, по которой выполняется сортировка grid, или пользовательская функция сортировки
- `desc` - (optional) *boolean* - устанавливает порядок сортировки: <i>true</i> - по убыванию, <i>false</i> - по возрастанию<br> по умолчанию <i>false</i>
- `parent` - (optional) *string | number* - ID родительской задачи. Используйте этот параметр, если хотите сортировать задачи только внутри ветки указанного родителя.
- `silent` - (optional) *boolean* - определяет, будет ли триггериться рендеринг после перестановки элементов

### Example

~~~jsx
<input type='button'  value='Sort by task name' onclick='sortByName()'>
<script>
    var n_direction = false;
    function sortByName(){
        if (n_direction){
            gantt.sort("text",false);
        } else {
            gantt.sort("text",true);
        }
        n_direction = !n_direction;
    };
    gantt.init("gantt_here");
</script>
~~~

### Related samples
- [Using sorting methods](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)

### Details

Пользовательская функция сортировки принимает объекты **Task** в качестве аргументов и должна возвращать число (1, 0 или -1).

При использовании пользовательской функции сортировки параметр **parent** игнорируется. [Смотрите пример](https://snippet.dhtmlx.com/d8li6kq2).

При вызове метода **sort()** Gantt не добавляет никаких иконок сортировки (например, стрелок, указывающих направление сортировки). Если вы хотите отображать иконку сортировки, её нужно добавить вручную. [Смотрите пример](https://snippet.dhtmlx.com/5bjavofk).

### Related API
- [sort](api/config/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [Сортировка столбцов](guides/sorting.md)

