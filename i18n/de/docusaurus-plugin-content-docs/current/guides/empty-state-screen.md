---
title: "Leerzustand-Bildschirm"
sidebar_label: "Leerzustand-Bildschirm"
---

# Leerzustand-Bildschirm

Ab Version 8.0 bietet die Bibliothek die Möglichkeit, einen leeren Bildschirm ("Leerzustand") mit dem Platzhalter-Element im Gantt-Gitter anzuzeigen, wenn im Gantt-Diagramm keine Daten geladen sind.

![Tipp zum leeren Bildschirm](/img/empty_screen.png)

Standardmäßig ist das Platzhalter-Element ausgeblendet. Um es anzuzeigen, verwenden Sie die Konfiguration [show_empty_state](api/config/show_empty_state.md):

~~~js
gantt.config.show_empty_state = true;
~~~

[Leeren-Zustand-Bildschirm anzeigen](https://docs.dhtmlx.com/gantt/samples/08_api/24_empty_state_screen.html)


## EmptyStateElement-Objekt

Der Leerzustand kommt mit einer Reihe von API-Methoden, die von der Erweiterung [emptyStateElement](guides/empty-state-element-ext.md) bereitgestellt werden. 

Die Anzeige des Leerzustands ist nicht nur möglich, wenn im Gantt keine Aufgaben geladen sind. Sie können ihn auch anzeigen, wenn die Aufgaben geladen, aber gefiltert sind und auf der Seite nicht sichtbar sind. Verwenden Sie dazu die **isEnabled()**-Methode:

~~~js
gantt.ext.emptyStateElement.isEnabled = function (){
    return !gantt.getVisibleTaskCount().length;
}
~~~


Wenn Sie den Leerzustand im Timeline-Bereich statt im Grid anzeigen möchten, verwenden Sie die **getContainer()**-Methode:

~~~js
gantt.ext.emptyStateElement.getContainer = function() {
    return gantt.$task_data.closest(".gantt_layout_content");
};
~~~

Um den im Leerzustand gerenderten Inhalt zu ändern, wenden Sie die **renderContent()**-Methode an:

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