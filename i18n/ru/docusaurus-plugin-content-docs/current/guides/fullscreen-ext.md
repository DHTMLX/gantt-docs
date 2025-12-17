---
title: "Расширение Fullscreen"
sidebar_label: "Расширение Fullscreen"
---

Расширение Fullscreen
========================

Более подробную информацию о расширении Fullscreen вы можете найти в статье [Полноэкранный режим](guides/fullscreen-mode.md#fullscreenapi). 

 Объект *fullscreen* включает следующий API:

## Методы

- <span class="submethod">**expand (): void**</span> - переводит Gantt в полноэкранный режим

~~~js
gantt.ext.fullscreen.expand();
~~~

- <span class="submethod">**collapse (): void**</span> - выходит из полноэкранного режима и возвращает Gantt к обычному размеру

~~~js
gantt.ext.fullscreen.collapse();
~~~

- <span class="submethod">**toggle (): void**</span> - вызывает метод **collapse()**, если Gantt уже в полноэкранном режиме, или метод **expand()**, если не в полноэкранном

~~~js
gantt.ext.fullscreen.toggle();
~~~

- <span class="submethod">**getFullscreenElement (): HTMLElement**</span> - возвращает DOM-элемент, который будет отображаться в полноэкранном режиме при вызове метода **expand()**

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

По умолчанию метод **getFullscreenElement()** возвращает HTML-контейнер, в котором находится диаграмма Gantt.
