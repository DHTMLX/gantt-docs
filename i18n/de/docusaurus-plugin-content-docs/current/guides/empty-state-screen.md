---
title: "Leerer Zustand Bildschirm"
sidebar_label: "Leerer Zustand Bildschirm"
---

Leerer Zustand Bildschirm
=========================

Seit Version 8.0 unterstützt die Bibliothek das Anzeigen eines leeren Bildschirms („Empty State") mit einem Platzhalter-Element im Grid, wenn keine Daten im Gantt-Diagramm geladen sind.

![empty screen tip](/img/empty_screen.png)

Standardmäßig bleibt das Platzhalter-Element verborgen. Um es zu aktivieren, setzen Sie folgende Konfiguration:

~~~js
gantt.config.show_empty_state = true;
~~~


[Show empty state screen](https://docs.dhtmlx.com/gantt/samples/08_api/24_empty_state_screen.html)


## EmptyStateElement Objekt

Die „Empty State"-Funktion bietet verschiedene API-Methoden, die über die [emptyStateElement](guides/empty-state-element-ext.md) Erweiterung verfügbar sind.

Der leere Zustand kann nicht nur angezeigt werden, wenn keine Aufgaben im Gantt geladen sind, sondern auch, wenn Aufgaben zwar geladen, aber herausgefiltert wurden und somit auf der Seite unsichtbar sind. Um dies zu steuern, verwenden Sie die Methode **isEnabled()**:

~~~js
gantt.ext.emptyStateElement.isEnabled = function (){
    return !gantt.getVisibleTaskCount().length;
}
~~~

Wenn Sie den leeren Zustand im Zeitachsenbereich statt im Grid anzeigen möchten, verwenden Sie die Methode **getContainer()**:

~~~js
gantt.ext.emptyStateElement.getContainer = function() {
    return gantt.$task_data.closest(".gantt_layout_content");
};
~~~

Um den angezeigten Inhalt im leeren Zustand anzupassen, überschreiben Sie die Methode **renderContent()**:

~~~js
gantt.ext.emptyStateElement.renderContent = function (container) {
    const placeholderTextElement = `<div class='gantt_empty_state_text'>
    <div class='gantt_empty_state_text_link' data-empty-state-create-task>
       ${gantt.locale.labels.empty_state_text_link}</div>
    <div class='gantt_empty_state_text_description'>
       ${gantt.locale.labels.empty_state_text_description}</div>
    </div>`;
    const placeholderImageElement = "<div class='gantt_empty_state_image'></div>";

    const placeholderContainer = `<div class='gantt_empty_state'>
       ${placeholderImageElement}${placeholderTextElement}</div>`;
    container.innerHTML = placeholderContainer;
}
~~~
