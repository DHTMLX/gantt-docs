---
sidebar_label: sort
title: sort method
description: "сортирует задачи в grid"
---

# sort

### Description

@short: Сортирует задачи в grid

@signature: sort: (field: string | ((task1: Task, task2: Task) => 1 | 0 | -1), desc?: boolean, parent?: string | number, silent?: boolean) =\> void;

### Parameters

- `field` - (required) *string | SortTasks* - название столбца, по которому будет выполняться сортировка grid, или пользовательская функция сортировки
- `desc` - (optional) *boolean* - задаёт направление сортировки: <i>true</i> - нисходящий порядок и <i>false</i> - восходящий. По умолчанию <i>false</i>
- `parent` - (optional) *string | number* - идентификатор родительской задачи. Укажите этот параметр, если хотите сортировать задачи только в ветке указанного родителя.
- `silent` - (optional) *boolean* - указывает, нужно ли вызывать рендеринг после перерасположения элементов

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
- [Использование методов сортировки](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)

### Details

Пользовательная функция сортировки принимает объекты **Task** в качестве аргументов и должна возвращать число (1, 0 или -1).

Параметр **parent** игнорируется при применении пользовательской функции сортировки. [Проверьте пример](https://snippet.dhtmlx.com/d8li6kq2).

Когда метод **sort()** используется, Gantt не добавляет иконку сортировки (стрелку, отображающую направление сортировки). В случае, если вам нужно отрисовать иконку сортировки, вы можете добавить её вручную. [Проверьте пример](https://snippet.dhtmlx.com/5bjavofk).

### Related API
- [sort](api/config/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [Сортировка столбцов](guides/sorting.md)