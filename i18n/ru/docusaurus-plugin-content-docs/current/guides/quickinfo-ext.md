---
title: "Расширение quickInfo"
sidebar_label: "Расширение quickInfo"
---

# Расширение quickInfo

Подробности об расширении quickInfo можно найти в статье [Quick Info (Touch Support)](guides/quick-info.md).

Объект *quickInfo* имеет следующий API:

## Методы

- <span class="submethod">**show (id): void**</span> - отображает всплывающее окно быстрой информации для указанного элемента
    - **_id_** - (*number | string*) - идентификатор задачи

~~~js
gantt.ext.quickInfo.show("1");
~~~

- <span class="submethod">**show (x, y): void**</span>  - отображает окно быстрой информации по заданным координатам
    - **_x_** - (*number | string*) - горизонтальная координата
    - **_y_** - (*number | string*) - вертикальная координата

~~~js
gantt.ext.quickInfo.show(10,30);
~~~

- <span class="submethod">**hide (force): HTMLElement**</span> - скрывает всплывающее окно быстрой информации. Когда **gantt.config.quick_info_detached** установлен в *false*, окно быстрой информации не исчезнет мгновенно, а после короткой анимации. Передача значения *true* в качестве аргумента отменит анимацию и немедленно удалит всплывающее окно.
    - **_force?_** - (*boolean*) - определяет, будет ли всплывающее окно скрыто немедленно без анимации

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");
 
// скрыть всплывающее окно после короткой анимации
gantt.ext.quickInfo.hide();
 
// скрыть всплывающее окно мгновенно
gantt.ext.quickInfo.hide(true);
~~~

- <span class="submethod">**setContainer (container): void**</span> - устанавливает контейнер, в котором будет отображаться быстрая информация. Если не указан пользовательский контейнер, QuickInfo будет размещаться в первом найденном узле: **gantt.$task, gantt.$grid, gantt.$root**
    - **_container_** - (*HTMLElement | string*) - элемент контейнера или его ID

~~~js
gantt.ext.quickInfo.setContainer(document.body);
gantt.ext.quickInfo.show(1300,100);
~~~

- <span class="submethod">**getNode (): HTMLElement | null**</span> - возвращает HTMLElement всплывающего окна быстрой информации. Возвращает *null*, если быстрая информация не инициализирована

~~~js
const node = gantt.ext.quickInfo.getNode();
~~~

Возвращаемый DOM-элемент отображаемой быстрой информации выглядит следующим образом:

![quick_node](/img/quick_node.png)

- <span class="submethod">**setContent (config): void**</span> - помещает содержимое в быструю информацию
    - **_config?_** - (*object*) - необязательно, объект конфигурации быстрой информации, который может включать следующие атрибуты:
        - **_taskId?_** - (*string | number*) - необязательно, идентификатор задачи, к которому будут привязаны кнопки действий быстрой информации
        - **_header?_** - (*object*) - необязательно, заголовок формы поп-ап редактирования, который может включать:
            - **_title?_** - (*string*) - необязательно, заголовок формы поп-ап редактирования
            - **_date?_** - (*string*) - необязательно, дата формы поп-ап редактирования
        - **_content?_** - (*string*) - необязательно, содержимое формы поп-ап редактирования
        - **_buttons?_** - (*string[]*) - необязательно, кнопки, размещаемые в форме поп-ап редактирования

Если ни заголовок, ни кнопки не указаны, соответствующие области всплывающего окна быстрой информации будут скрыты.

Ниже приведён пример того, как может выглядеть объект конфигурации метода **setContent**:

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

или

Вы можете создать настраиваемое всплывающее окно без заголовка и кнопок:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
    content: "my custom html",
    buttons: []
});
~~~