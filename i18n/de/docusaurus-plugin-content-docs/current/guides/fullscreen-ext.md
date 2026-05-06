---
title: "Vollbild-Erweiterung"
sidebar_label: "Vollbild-Erweiterung"
---

# Vollbild-Erweiterung

Lesen Sie Details zur Vollbild-Erweiterung im Artikel zum [Vollbildmodus](guides/fullscreen-mode.md#fullscreen-api).

Das *fullscreen*-Objekt besitzt die folgende API:

## Methoden

- <span class="submethod">**expand (): void**</span> - erweitert das Gantt-Diagramm in den Vollbildmodus

~~~js
gantt.ext.fullscreen.expand();
~~~

- <span class="submethod">**collapse (): void**</span> - kehrt das Gantt aus dem Vollbildmodus in den Normalmodus zurück

~~~js
gantt.ext.fullscreen.collapse();
~~~

- <span class="submethod">**toggle (): void**</span> - ruft die **collapse()**-Methode auf, falls das Gantt auf Vollbild erweitert ist, andernfalls die **expand()**-Methode

~~~js
gantt.ext.fullscreen.toggle();
~~~

- <span class="submethod">**getFullscreenElement (): HTMLElement**</span> - gibt ein DOM-Element zurück, das durch die **expand()**-Methode in den Vollbildmodus erweitert wird.

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

Standardmäßig gibt die **getFullscreenElement()**-Methode einen HTML-Container des Gantt-Diagramms zurück.