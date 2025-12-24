---
title: "Сортировка столбцов"
sidebar_label: "Сортировка столбцов"
---

# Сортировка столбцов


dhtmlxGantt предоставляет возможность сортировать данные внутри столбцов грида на стороне клиента. 


Есть два способа включить сортировку в гриде:

1. Щелчок по заголовку столбца, для которого включён атрибут [sort](api/config/sort.md);
2. Использование вызова метода [sort](api/method/sort.md), который может быть вызван событием или действием, например, нажатием кнопки или при загрузке страницы.

:::note
Имейте в виду, что Gantt сортирует задачи только по фактическим значениям данных и не сортирует значения, созданные с помощью атрибута template столбца.
:::

## Сортировка по клику на заголовке


При щелчке по заголовку Gantt отображает визуальный индикатор, который показывает, какой столбец отсортирован в данный момент и в каком порядке (по возрастанию или убыванию). Каждый последующий клик по тому же заголовку меняет направление сортировки.

![gantt_sorting](/img/gantt_sorting.png)

Чтобы включить сортировку в Gantt, установите свойство [sort](api/config/sort.md) в *true*:

~~~js
gantt.config.sort = true; 
gantt.init("gantt_here");
~~~


[Built-in sorting](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)


## Программная сортировка


Чтобы отсортировать грид в ответ на определённое событие или действие (например, нажатие кнопки или загрузку страницы), используйте метод [sort](api/method/sort.md).

**Сортировка по нажатию кнопки**
~~~html
<input type='button' value='Sort by task name' onclick='gantt.sort("text", true);'>

<script type="text/javascript" charset="utf-8">
    gantt.init("gantt_here"); 
    gantt.parse(tasks);
</script>
~~~


[Using sorting methods](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)


## Пользовательские функции сортировки


Можно применить пользовательскую функцию сортировки, передав её имя в качестве первого (и единственного) параметра методу [sort](api/method/sort.md).

Эта функция вызывается для каждой пары соседних значений и должна возвращать 1, -1 или 0:

- **1** - первый объект в паре должен идти перед вторым;
- **-1** - второй объект должен идти перед первым;
- **0** - порядок этих объектов не меняется.

**Использование пользовательской функции для сортировки Gantt**
~~~html
<input type='button' value='Sort by the number of holders' 
       onclick='sortByHolders(direction)'>

<script type="text/javascript" charset="utf-8">
    var direction = false;

    function sortByHolders(direction1){
        direction = !direction;
        gantt.sort(sortHolders);
    };
    function sortHolders(a,b){
         a = a.users.length;
         b = b.users.length;

         if (direction){
            return a>b?1:(a<b?-1:0);
         } else {
            return a>b?-1:(a<b?1:0);
         }
    };
</script>
~~~


[Custom sorting function](https://docs.dhtmlx.com/gantt/samples/07_grid/04_custom_sorting.html)


## Сортировка по столбцам в гриде


Можно определить индивидуальные правила сортировки для каждого столбца. Вот три распространённых способа настройки сортировки по столбцам:

1) Отключить сортировку для столбца, установив *sort* в false

~~~js
gantt.config.columns[1].sort = false;
~~~

2) Сортировать столбец с помощью пользовательской функции, установив *sort* в эту функцию

~~~js
gantt.config.columns[1].sort = function(a,b){
    return custom_function(a,b);
};
~~~

Эта пользовательская функция получает два объекта задачи (a и b) и возвращает 1, -1 или 0:


- **1** - первый объект должен идти перед вторым;
- **-1** - второй объект должен идти перед первым;
- **0** - порядок остаётся прежним.


3) Сортировать столбец по значениям другого поля задачи, установив *sort* в имя этого поля

~~~js
gantt.config.columns[1].sort = 'other_field';
~~~

