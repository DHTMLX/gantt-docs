---
title: "emptyStateElement Extension"
sidebar_label: "emptyStateElement Extension"
---

emptyStateElement Extension
======================

Read details about the emptyStateElement extension in the [Empty State Screen](guides/empty-state-screen.md) article.

## Methods

The following methods are available via the **gantt.ext.emptyStateElement** object:

- <span class="submethod">**isGanttEmpty (): boolean**</span> - returns *true* if there is no data loaded into the Gantt chart, otherwise - returns *false*. The extension uses the method to define whether to display the "empty state" on the page. You can redefine the method if you need to change the default behavior.
- <span class="submethod">**isEnabled (): boolean**</span> - returns *true* if the [show_empty_state](api/config/show_empty_state.md) property is enabled, otherwise - returns *false*
- <span class="submethod">**renderContent (container): void**</span> - puts an HTML content into the empty state element. The method can be redefined.
    - **_container_** - (*HTMLElement*) - the container element
- <span class="submethod">**getContainer (): HTMLElement | null**</span> - returns the DOM element where the empty state will be attached to. By default, returns the grid element (the "empty state" will be displayed in the grid). If there is no grid, returns the timeline element (the "empty state" will be displayed in the timeline). The method can be redefined.
- <span class="submethod">**getNode (): HTMLElement | null**</span> - returns the DOM node of the empty state element
- <span class="submethod">**show (): null | void**</span> - displays the "empty state". Returns *null* if there is no container for the Empty State Element.  The extension calls the method by itself
- <span class="submethod">**hide (): boolean | void**</span> - hides the "empty state". Returns *false* if there is no Empty State Element node, so there is nothing to hide.  The extension calls the method by itself
- <span class="subproperty">**clickEvents?**</span> -  (*Array&lt;string&gt;*) - an array with the IDs of the attached handlers. It is modified by the *attachAddTaskEvent* and *detachAddTaskEvents* methods.
- <span class="submethod">**attachAddTaskEvent (): void**</span> - adds the handler that will fire after clicking on the Empty State Element. By default, it is used to add a new task.
- <span class="submethod">**detachAddTaskEvents (): void**</span> - removes the handlers that were used to add a task after clicking on the Empty State Element


## Example

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

