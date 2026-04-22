---
title: "emptyStateElement Erweiterung"
sidebar_label: "emptyStateElement Erweiterung"
---

# emptyStateElement Erweiterung

Lesen Sie Details zur emptyStateElement-Erweiterung im Artikel zum [Empty State Screen](guides/empty-state-screen.md).

## Methoden

Folgende Methoden stehen über das Objekt **gantt.ext.emptyStateElement** zur Verfügung:

- <span class="submethod">**isGanttEmpty (): boolean**</span> - gibt *true* zurück, wenn keine Daten in das Gantt-Diagramm geladen sind, ansonsten *false*. Die Erweiterung verwendet diese Methode, um zu definieren, ob der "empty state" auf der Seite angezeigt werden soll. Sie können die Methode neu definieren, falls Sie das Standardverhalten ändern möchten.
- <span class="submethod">**isEnabled (): boolean**</span> - gibt *true* zurück, wenn die [show_empty_state](api/config/show_empty_state.md) Eigenschaft aktiviert ist, ansonsten - *false*
- <span class="submethod">**renderContent (container): void**</span> - setzt HTML-Inhalt in das Empty-State-Element. Die Methode kann neu definiert werden.
    - **_container_** - (*HTMLElement*) - das Container-Element
- <span class="submethod">**getContainer (): HTMLElement | null**</span> - gibt das DOM-Element zurück, an das der leere Zustand angehängt wird. Standardmäßig wird das Grid-Element zurückgegeben (der "empty state" wird im Grid angezeigt). Falls kein Grid vorhanden ist, wird das Timeline-Element zurückgegeben (der "empty state" wird in der Timeline angezeigt). Die Methode kann neu definiert werden.
- <span class="submethod">**getNode (): HTMLElement | null**</span> - gibt den DOM-Knoten des Empty-State-Elements zurück
- <span class="submethod">**show (): null | void**</span> - zeigt den "empty state" an. Gibt *null* zurück, wenn kein Container für das Empty State Element vorhanden ist. Die Erweiterung ruft die Methode selbst auf
- <span class="submethod">**hide (): boolean | void**</span> - versteckt den "empty state". Gibt *false* zurück, wenn es keinen Empty-State-Element-Knoten gibt, sodass nichts zu verstecken ist. Die Erweiterung ruft die Methode selbst auf
- <span class="subproperty">**clickEvents?**</span> -  (*Array&lt;string&gt;*) - ein Array mit den IDs der angehängten Handler. Es wird durch die Methoden *attachAddTaskEvent* und *detachAddTaskEvents* verändert.
- <span class="submethod">**attachAddTaskEvent (): void**</span> - fügt den Handler hinzu, der nach dem Klicken auf das Empty-State-Element ausgelöst wird. Standardmäßig wird er verwendet, um eine neue Aufgabe hinzuzufügen.
- <span class="submethod">**detachAddTaskEvents (): void**</span> - entfernt die Handler, die verwendet wurden, um nach dem Klicken auf das Empty-State-Element eine Aufgabe hinzuzufügen


## Beispiel

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