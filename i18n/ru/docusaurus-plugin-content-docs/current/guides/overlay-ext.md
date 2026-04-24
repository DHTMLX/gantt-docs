---
title: "Overlay Extension"
sidebar_label: "Overlay Extension"
---

# Расширение оверлей

:::info
Эта функциональность доступна только в версии PRO.
:::

Расширение **оверлей** содержит набор API-методов для упрощения работы с оверлеями. Подробнее об расширении оверлей можно узнать в статье [Пользовательские элементы в области таймлайна](guides/baselines.md#extra-overlay-for-the-chart).

## Методы

Следующие методы доступны через объект **gantt.ext.overlay**:

### addOverlay

- <span class="submethod">**addOverlay (render, id): string | number**</span> - добавляет новый оверлей в диаграмму Gantt и возвращает его id
    - **_render_** - (*Function*): HTMLElement - функция рендера. Принимает на вход контейнер с произвольным содержимым
        - **_container_** - (*HTMLElement*) - контейнер оверлея
    - **_id?_** - (*number | string*) - необязательный, идентификатор оверлея


~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~



### deleteOverlay

- <span class="submethod">**deleteOverlay (id): boolean**</span> - удаляет оверлей по его id
    - **_id_** - (*number | string*) - идентификатор оверлей

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~



### getOverlaysIds 

- <span class="submethod">**getOverlaysIds (): Array&lt;string&gt;**</span> - возвращает массив идентификаторов оверлеев, добавленных на диаграмму

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

- <span class="submethod">**showOverlay (id): void**</span> - отображает оверлей по его идентификатору.
    - **_id_** - (*number | string*) - идентификатор оверлея

~~~js
gantt.ext.overlay.showOverlay(id);
~~~



### hideOverlay

- <span class="submethod">**hideOverlay (id): void**</span> - скрывает оверлей по его идентификатору
    - **_id_** - (*number | string*) - идентификатор оверлея

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~



### isOverlayVisible

- <span class="submethod">**isOverlayVisible (id): boolean**</span> - проверяет видимость указанного оверлея. Возвращает *true*, если оверлей видим.
    - **_id_** - (*number | string*) - идентификатор оверлея

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~