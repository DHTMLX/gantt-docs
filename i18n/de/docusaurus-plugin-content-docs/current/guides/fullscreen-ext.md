---
title: "Fullscreen-Erweiterung"
sidebar_label: "Fullscreen-Erweiterung"
---

Fullscreen-Erweiterung
========================

Weitere Informationen über die Fullscreen-Erweiterung finden Sie im Artikel [Full Screen Mode](guides/fullscreen-mode.md#fullscreenapi). 

 Das *fullscreen*-Objekt beinhaltet die folgende API:

## Methoden

- <span class="submethod">**expand (): void**</span> - schaltet das Gantt-Diagramm in den Vollbildmodus

~~~js
gantt.ext.fullscreen.expand();
~~~

- <span class="submethod">**collapse (): void**</span> - verlässt den Vollbildmodus und stellt das Gantt-Diagramm auf seine normale Größe zurück

~~~js
gantt.ext.fullscreen.collapse();
~~~

- <span class="submethod">**toggle (): void**</span> - ruft die Methode **collapse()** auf, wenn sich das Gantt-Diagramm aktuell im Vollbildmodus befindet, oder die Methode **expand()**, wenn dies nicht der Fall ist

~~~js
gantt.ext.fullscreen.toggle();
~~~

- <span class="submethod">**getFullscreenElement (): HTMLElement**</span> - gibt das DOM-Element zurück, das im Vollbildmodus angezeigt wird, wenn die Methode **expand()** aufgerufen wird

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

Standardmäßig gibt die Methode **getFullscreenElement()** das HTML-Container-Element zurück, das das Gantt-Diagramm enthält.
