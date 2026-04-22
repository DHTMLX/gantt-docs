---
title: "Экран пустого состояния"
sidebar_label: "Экран пустого состояния"
---

# Экран пустого состояния

Начиная с версии v8.0, библиотека предоставляет возможность отображать пустой экран ("empty state") с элементом-заглушкой в гриде, если данные не загружены в диаграмму Gantt.

![подсказка пустого экрана](/img/empty_screen.png)

По умолчанию элемент-заглушка скрыт. Чтобы показать его, используйте конфигурацию [show_empty_state](api/config/show_empty_state.md):

~~~js
gantt.config.show_empty_state = true;
~~~

[Показать экран пустого состояния](https://docs.dhtmlx.com/gantt/samples/08_api/24_empty_state_screen.html)

## Объект EmptyStateElement

«пустое состояние» поставляется с набором API-методов, предоставляемых расширением [emptyStateElement](guides/empty-state-element-ext.md).

Отображение «пустого состояния» возможно не только когда в диаграмме Gantt не загружены задачи. Вы можете отобразить его также если задачи загружены, но отфильтрованы и не видны на странице. Для этого используйте метод **isEnabled()**:

~~~js
gantt.ext.emptyStateElement.isEnabled = function (){
    return !gantt.getVisibleTaskCount().length;
}
~~~

Если вы хотите отобразить «пустое состояние» в области таймлайна, а не в гриде, используйте метод **getContainer()**:

~~~js
gantt.ext.emptyStateElement.getContainer = function() {
    return gantt.$task_data.closest(".gantt_layout_content");
};
~~~

Чтобы изменить содержимое, отображаемое в «пустом состоянии», применяйте метод **renderContent()**:

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