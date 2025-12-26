---
title: "emptyStateElement Erweiterung"
sidebar_label: "emptyStateElement Erweiterung"
---

# emptyStateElement Erweiterung

Weitere Informationen zur emptyStateElement-Erweiterung finden Sie im Artikel [Empty State Screen](guides/empty-state-screen.md).

## Methoden

Das Objekt **gantt.ext.emptyStateElement** stellt folgende Methoden zur Verfügung:

- <span class="submethod">**isGanttEmpty (): boolean**</span> - gibt *true* zurück, wenn keine Daten im Gantt-Diagramm geladen sind, andernfalls *false*. Diese Methode hilft dabei zu entscheiden, ob der "Leere Zustand" auf der Seite angezeigt werden soll. Sie kann angepasst werden, falls Sie das Standardverhalten ändern möchten.
- <span class="submethod">**isEnabled (): boolean**</span> - gibt *true* zurück, wenn die [show_empty_state](api/config/show_empty_state.md) Eigenschaft aktiviert ist; andernfalls *false*.
- <span class="submethod">**renderContent (container): void**</span> - fügt HTML-Inhalt in das Empty State Element ein. Diese Methode kann bei Bedarf überschrieben werden.
    - **_container_** - (*HTMLElement*) - das Element, das den Inhalt enthalten wird
- <span class="submethod">**getContainer (): HTMLElement | null**</span> - gibt das DOM-Element zurück, an das der leere Zustand angehängt wird. Standardmäßig wird das Grid-Element zurückgegeben (sodass der "Leere Zustand" im Grid erscheint). Ist das Grid nicht verfügbar, wird das Timeline-Element verwendet (der "Leere Zustand" erscheint dann in der Timeline). Diese Methode kann angepasst werden.
- <span class="submethod">**getNode (): HTMLElement | null**</span> - gibt den DOM-Knoten zurück, der das Empty State Element repräsentiert.
- <span class="submethod">**show (): null | void**</span> - zeigt den "Leeren Zustand" an. Gibt *null* zurück, wenn kein Container für das Empty State Element vorhanden ist. Diese Methode wird automatisch von der Erweiterung aufgerufen.
- <span class="submethod">**hide (): boolean | void**</span> - blendet den "Leeren Zustand" aus. Gibt *false* zurück, wenn der Knoten des Empty State Elements nicht existiert, also nichts ausgeblendet werden kann. Auch diese Methode wird automatisch von der Erweiterung aufgerufen.
- <span class="subproperty">**clickEvents?**</span> - (*Array&lt;string&gt;*) - enthält die IDs der angehängten Event-Handler. Wird durch die Methoden *attachAddTaskEvent* und *detachAddTaskEvents* aktualisiert.
- <span class="submethod">**attachAddTaskEvent (): void**</span> - fügt einen Handler hinzu, der ausgelöst wird, wenn auf das Empty State Element geklickt wird. Standardmäßig wird damit eine neue Aufgabe hinzugefügt.
- <span class="submethod">**detachAddTaskEvents (): void**</span> - entfernt die Handler, die beim Klicken auf das Empty State Element das Hinzufügen einer Aufgabe auslösen.

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

