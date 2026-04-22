---
title: "Расширение Fullscreen"
sidebar_label: "Расширение Fullscreen"
---

# Расширение полноэкранного режима

Подробнее об расширении Fullscreen можно узнать в статье [Полноэкранный режим](guides/fullscreen-mode.md#fullscreen-api).

Объект *fullscreen* имеет следующий API:

## Методы

- <span class="submethod">**expand (): void**</span> - разворачивает Gantt в полноэкранный режим

~~~js
gantt.ext.fullscreen.expand();
~~~

- <span class="submethod">**collapse (): void**</span> - сворачивает Gantt из полноэкранного режима в обычный режим

~~~js
gantt.ext.fullscreen.collapse();
~~~

- <span class="submethod">**toggle (): void**</span> - вызывает метод **collapse()**, если Gantt развёрнут в полноэкранный режим, и метод **expand()** в противном случае

~~~js
gantt.ext.fullscreen.toggle();
~~~

- <span class="submethod">**getFullscreenElement (): HTMLElement**</span> - возвращает DOM-элемент, который будет развёрнут в полноэкранный режим методом **expand()**

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

По умолчанию метод **getFullscreenElement()** возвращает HTML‑контейнер диаграммы Gantt.