---
title: "Расширение emptyStateElement"
sidebar_label: "Расширение emptyStateElement"
---

# Расширение emptyStateElement

Подробнее об расширении emptyStateElement в статье [Экран пустого состояния](guides/empty-state-screen.md).

## Методы

Следующие методы доступны через объект **gantt.ext.emptyStateElement**:

- <span class="submethod">**isGanttEmpty (): boolean**</span> - возвращает *true*, если данные не загружены в диаграмму Gantt, иначе - возвращает *false*. Расширение использует этот метод для определения того, следует ли отображать на странице пустое состояние. Вы можете переопределить метод, если нужно изменить поведение по умолчанию.
- <span class="submethod">**isEnabled (): boolean**</span> - возвращает *true*, если свойство [show_empty_state](api/config/show_empty_state.md) включено, иначе - возвращает *false*
- <span class="submethod">**renderContent (container): void**</span> - помещает HTML-контент в элемент пустого состояния. Метод может быть переопределён.
    - **_container_** - (*HTMLElement*) - элемент контейнера
- <span class="submethod">**getContainer (): HTMLElement | null**</span> - возвращает DOM-элемент, к которому будет прикреплено пустое состояние. По умолчанию возвращает элемент грида (пустое состояние будет отображаться в гриде). Если грида нет, возвращает элемент таймлайна (пустое состояние будет отображаться в таймлайне). Метод может быть переопределён.
- <span class="submethod">**getNode (): HTMLElement | null**</span> - возвращает DOM-узел элемента пустого состояния
- <span class="submethod">**show (): null | void**</span> - отображает «пустое состояние». Возвращает *null*, если для Элемента пустого состояния нет контейнера. Расширение вызывает метод самостоятельно
- <span class="submethod">**hide (): boolean | void**</span> - скрывает «пустое состояние». Возвращает *false*, если узла элемента пустого состояния нет, поэтому скрывать нечего. Расширение вызывает метод самостоятельно
- <span class="subproperty">**clickEvents?**</span> -  (*Array&lt;string&gt;*) - массив с идентификаторами подключённых обработчиков. Он изменяется методами *attachAddTaskEvent* и *detachAddTaskEvents*
- <span class="submethod">**attachAddTaskEvent (): void**</span> - добавляет обработчик, который будет срабатывать после клика по Элементу пустого состояния. По умолчанию используется для добавления новой задачи.
- <span class="submethod">**detachAddTaskEvents (): void**</span> - удаляет обработчики, которые использовались для добавления задачи после клика по Элементу пустого состояния

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

