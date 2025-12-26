---
title: "Экран пустого состояния"
sidebar_label: "Экран пустого состояния"
---

# Экран пустого состояния

Начиная с версии 8.0, библиотека поддерживает отображение пустого экрана ("пустое состояние") с элементом-заполнителем в гриде, когда в диаграмме Gantt не загружены данные.

![empty screen tip](/img/empty_screen.png)

По умолчанию элемент-заполнитель скрыт. Чтобы включить его, установите следующую настройку:

~~~js
gantt.config.show_empty_state = true;
~~~


[Show empty state screen](https://docs.dhtmlx.com/gantt/samples/08_api/24_empty_state_screen.html)


## Объект EmptyStateElement

Функционал "пустого состояния" предоставляет различные методы API через расширение [emptyStateElement](guides/empty-state-element-ext.md).

Пустое состояние может отображаться не только когда в Gantt не загружено ни одной задачи, но и когда задачи загружены, но отфильтрованы и не видны на странице. Для обработки этой ситуации используйте метод **isEnabled()**:

~~~js
gantt.ext.emptyStateElement.isEnabled = function (){
    return !gantt.getVisibleTaskCount().length;
}
~~~

Если вы хотите показывать пустое состояние в области временной шкалы вместо грида, используйте метод **getContainer()**:

~~~js
gantt.ext.emptyStateElement.getContainer = function() {
    return gantt.$task_data.closest(".gantt_layout_content");
};
~~~

Чтобы настроить содержимое, отображаемое в пустом состоянии, переопределите метод **renderContent()**:

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
