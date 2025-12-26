---
title: "Расширение quickInfo"
sidebar_label: "Расширение quickInfo"
---

# Расширение quickInfo

Более подробная информация о расширении quickInfo доступна в статье [Быстрая информация (Поддержка касаний)](guides/quick-info.md).


Объект *quickInfo* предоставляет следующий API:

## Методы

- <span class="submethod">**show (id): void**</span> - открывает тултип quick info для указанного элемента
    - **_id_** - (*number | string*) - ID задачи
 
~~~js
gantt.ext.quickInfo.show("1");
~~~

- <span class="submethod">**show (x, y): void**</span>  - открывает тултип quick info по заданным координатам
    - **_x_** - (*number | string*) - горизонтальная координата
    - **_y_** - (*number | string*) - вертикальная координата

~~~js
gantt.ext.quickInfo.show(10,30);
~~~

- <span class="submethod">**hide (force): HTMLElement**</span> - закрывает тултип quick info. Если **gantt.config.quick_info_detached** установлен в *false*, тултип исчезнет после короткой анимации. Если передать *true* в качестве аргумента, тултип будет скрыт сразу, без анимации.
    - **_force?_** - (*boolean*) - определяет, скрывается ли тултип мгновенно, без анимации

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");
 
// скрыть тултип с короткой анимацией
gantt.ext.quickInfo.hide();
 
// скрыть тултип мгновенно
gantt.ext.quickInfo.hide(true);
~~~

- <span class="submethod">**setContainer (container): void**</span> - задаёт контейнер, в котором будет отображаться quick info. Если контейнер не указан, QuickInfo будет вставлен в первый доступный узел из: **gantt.$task, gantt.$grid, gantt.$root**
    - **_container_** - (*HTMLElement | string*) - элемент-контейнер или его ID

~~~js
gantt.ext.quickInfo.setContainer(document.body);
gantt.ext.quickInfo.show(1300,100);
~~~

- <span class="submethod">**getNode (): HTMLElement | null**</span> - возвращает HTMLElement тултипа quick info. Возвращает *null*, если тултип ещё не инициализирован

~~~js
const node = gantt.ext.quickInfo.getNode();
~~~

DOM-элемент отображаемого тултипа quick info выглядит следующим образом:

![quick_node](/img/quick_node.png)

- <span class="submethod">**setContent (config): void**</span> - наполняет quick info содержимым
    - **_config?_** - (*object*) - необязательный объект конфигурации для quick info, который может включать:
        - **_taskId?_** - (*string | number*) - необязательно, id задачи, связанной с кнопками действий quick info
        - **_header?_** - (*object*) - необязательно, заголовок формы редактирования во всплывающем окне, который может содержать:
            - **_title?_** - (*string*) - необязательно, заголовок формы редактирования
            - **_date?_** - (*string*) - необязательно, дата формы редактирования
        - **_content?_** - (*string*) - необязательно, содержимое формы редактирования во всплывающем окне
        - **_buttons?_** - (*string[]*) - необязательно, кнопки, отображаемые в форме редактирования
  


Если заголовок и кнопки не заданы, соответствующие секции тултипа quick info будут скрыты.

Пример объекта конфигурации для метода **setContent**:

~~~js
const quickInfo = gantt.ext.quickInfo;
var task = gantt.getTask(10);
quickInfo.show(task.id);
quickInfo.setContent({
    taskId: task.id,
    header: {
        title: gantt.templates.quick_info_title(task.start_date, task.end_date, task),
        date: gantt.templates.quick_info_date(task.start_date, task.end_date, task)
    },
    content: gantt.templates.quick_info_content(task.start_date, task.end_date, task),
    buttons: gantt.config.quickinfo_buttons
});
~~~

Альтернативный вариант,

Можно создать пользовательское всплывающее окно без заголовка и кнопок:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
    content: "my custom html",
    buttons: []
});
~~~
