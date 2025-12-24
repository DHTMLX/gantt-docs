---
title: "emptyStateElement Extension"
sidebar_label: "emptyStateElement Extension"
---

# emptyStateElement Extension


Более подробную информацию об расширении emptyStateElement вы можете найти в статье [Экран пустого состояния](guides/empty-state-screen.md).

## Методы

Объект **gantt.ext.emptyStateElement** предоставляет следующие методы:

- <span class="submethod">**isGanttEmpty (): boolean**</span> - возвращает *true*, если в диаграмму Gantt не загружены данные, и *false* в противном случае. Этот метод помогает определить, нужно ли отображать "пустое состояние" на странице. Его можно переопределить, если требуется изменить стандартное поведение.
- <span class="submethod">**isEnabled (): boolean**</span> - возвращает *true*, если свойство [show_empty_state](api/config/show_empty_state.md) включено; иначе возвращает *false*.
- <span class="submethod">**renderContent (container): void**</span> - вставляет HTML-контент в элемент пустого состояния. При необходимости этот метод можно переопределить.
    - **_container_** - (*HTMLElement*) - элемент, в который будет добавлен контент
- <span class="submethod">**getContainer (): HTMLElement | null**</span> - возвращает DOM-элемент, в который будет добавлено пустое состояние. По умолчанию возвращает элемент грида (поэтому "пустое состояние" появляется в гриде). Если грид недоступен, возвращает элемент временной шкалы (тогда "пустое состояние" отображается на временной шкале). Этот метод можно переопределить.
- <span class="submethod">**getNode (): HTMLElement | null**</span> - возвращает DOM-узел, представляющий элемент пустого состояния.
- <span class="submethod">**show (): null | void**</span> - отображает "пустое состояние". Возвращает *null*, если контейнер для Empty State Element отсутствует. Этот метод вызывается автоматически расширением.
- <span class="submethod">**hide (): boolean | void**</span> - скрывает "пустое состояние". Возвращает *false*, если узел Empty State Element не существует, то есть нечего скрывать. Этот метод также вызывается автоматически расширением.
- <span class="subproperty">**clickEvents?**</span> -  (*Array&lt;string&gt;*) - содержит идентификаторы присоединённых обработчиков событий. Обновляется методами *attachAddTaskEvent* и *detachAddTaskEvents*.
- <span class="submethod">**attachAddTaskEvent (): void**</span> - добавляет обработчик, который срабатывает при клике по Empty State Element. По умолчанию используется для добавления новой задачи.
- <span class="submethod">**detachAddTaskEvents (): void**</span> - удаляет обработчики, которые были назначены для добавления задачи при клике по Empty State Element.

## Пример

~~~js
gantt.ext.emptyStateElement = {
  isEnabled() {
        return gantt.config.show_empty_state === true;
    },
  isGanttEmpty(){
        return !gantt.getTaskByTime().length;
    },
  renderContent(container){
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
    },

    clickEvents: [],
    attachAddTaskEvent(){
      const id = gantt.attachEvent("onEmptyClick", function(e){
        const domHelpers = gantt.utils.dom;
        const gridPlaceholder = domHelpers.closest(
          e.target, "[data-empty-state-create-task]"
        );
        if (gridPlaceholder){
          gantt.createTask({
            id: gantt.uid(),
            text: "New Task"
          });
        }
      });
      this.clickEvents.push(id);
    },
    detachAddTaskEvents(){
      this.clickEvents.forEach(function(event){
        gantt.detachEvent(event);
      });
      this.clickEvents = [];
    },

    getContainer(){
      if (gantt.$container) {
        const domHelpers = gantt.utils.dom;
        if (gantt.$container.contains(gantt.$grid_data)) {
          return domHelpers.closest(
            gantt.$grid_data, ".gantt_layout_content"
          );
        }
        if (gantt.$container.contains(gantt.$task_data)){
          return domHelpers.closest(
            gantt.$task_data, ".gantt_layout_content"
          );
        }
      }

      return null;
    },

    getNode(){
      const container = this.getContainer();
      if (!container){
        return null;
      }
      const emptyStateElementNode = container.querySelector(
        ".gantt_empty_state_wrapper"
      );
      return emptyStateElementNode;
    },

    show(){
      const container = this.getContainer();
      if (!container && this.isGanttEmpty()){
        return null;
      }

      const wrapper = document.createElement("div");
      wrapper.className = "gantt_empty_state_wrapper";
      wrapper.style.marginTop = (
        gantt.config.scale_height - container.offsetHeight
      ) + "px";
      const oldNodes = gantt.$container.querySelectorAll(
        ".gantt_empty_state_wrapper"
      );
      // for IE11
      Array.prototype.forEach.call(oldNodes, function(node){
        node.parentNode.removeChild(node);
      });

      this.detachAddTaskEvents();
      this.attachAddTaskEvent();

      container.appendChild(wrapper);
      this.renderContent(wrapper);
    },
    hide(){
      const emptyStateElementNode = this.getNode();
      if (emptyStateElementNode){
        emptyStateElementNode.parentNode.removeChild(emptyStateElementNode);
      } else{
        return false;
      }

    },
    init(){ }
  };

  gantt.attachEvent("onDataRender", function() {
    const emptyStateElement = gantt.ext.emptyStateElement;
    if (emptyStateElement.isEnabled() && emptyStateElement.isGanttEmpty()) {
      emptyStateElement.show();
    } else {
      emptyStateElement.hide();
    }
  });
~~~

