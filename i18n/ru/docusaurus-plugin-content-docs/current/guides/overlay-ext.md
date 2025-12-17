---
title: "Overlay Extension"
sidebar_label: "Overlay Extension"
---

Overlay Extension
======================

:::note
Эта функция доступна только в редакции PRO
:::

Расширение **overlay** предоставляет набор API-методов, которые упрощают работу с оверлеями. Для получения более подробной информации обратитесь к статье [Пользовательские элементы в области временной шкалы](guides/baselines.md#extraoverlayforthechart).

Методы
------------

Следующие методы доступны через объект **gantt.ext.overlay**:

### addOverlay

- <span class="submethod">**addOverlay (render, id): string | number**</span> - добавляет новый оверлей в Gantt и возвращает его id
    - **_render_** - (*Function*): HTMLElement - функция, отвечающая за рендеринг. В качестве параметра получает контейнер с пользовательским содержимым
        - **_container_** - (*HTMLElement*) - контейнер для оверлея
    - **_id?_** - (*number | string*) - необязательный параметр, задаёт идентификатор оверлея

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~

### deleteOverlay

- <span class="submethod">**deleteOverlay (id): boolean**</span> - удаляет оверлей по его id
    - **_id_** - (*number | string*) - идентификатор оверлея

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

### getOverlaysIds 

- <span class="submethod">**getOverlaysIds (): Array&lt;string&gt;**</span> - возвращает массив с идентификаторами оверлеев, добавленных в диаграмму

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

### refreshOverlay

- <span class="submethod">**refreshOverlay (id): void**</span> - перерисовывает указанный оверлей.
    - **_id_** - (*number | string*) - идентификатор оверлея

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

### showOverlay

- <span class="submethod">**showOverlay (id): void**</span> - делает оверлей видимым по его id.
    - **_id_** - (*number | string*) - идентификатор оверлея

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

### hideOverlay

- <span class="submethod">**hideOverlay (id): void**</span> - скрывает оверлей по его id
    - **_id_** - (*number | string*) - идентификатор оверлея

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

### isOverlayVisible

- <span class="submethod">**isOverlayVisible (id): boolean**</span> - определяет, видим ли указанный оверлей. Возвращает *true*, если оверлей видим.
    - **_id_** - (*number | string*) - идентификатор оверлея

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~
