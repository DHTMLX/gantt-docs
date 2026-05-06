---
title: "emptyStateElement 확장"
sidebar_label: "emptyStateElement 확장"
---

## emptyStateElement 확장

emptyStateElement 확장에 대한 자세한 내용은 [Empty State Screen](guides/empty-state-screen.md) 문서를 참조하세요.

## 메서드

다음 메서드는 **gantt.ext.emptyStateElement** 객체를 통해 사용할 수 있습니다:

- <span class="submethod">**isGanttEmpty (): boolean**</span> - 로드된 데이터가 Gantt 차트에 없으면 *true*를 반환하고, 그렇지 않으면 *false*를 반환합니다. 이 확장은 페이지에 "비어 있는 상태"를 표시할지 여부를 정의하는 데 이 메서드를 사용합니다. 기본 동작을 변경해야 하는 경우 메서드를 재정의할 수 있습니다.
- <span class="submethod">**isEnabled (): boolean**</span> - [show_empty_state](api/config/show_empty_state.md) 속성이 활성화되어 있으면 *true*를 반환하고, 그렇지 않으면 *false*를 반환합니다.
- <span class="submethod">**renderContent (container): void**</span> - 비어 있는 상태 요소에 HTML 콘텐츠를 넣습니다. 이 메서드는 재정의할 수 있습니다.
    - **_container_** - (*HTMLElement*) - 컨테이너 요소
- <span class="submethod">**getContainer (): HTMLElement | null**</span> - 비어 있는 상태가 부착될 DOM 요소를 반환합니다. 기본적으로 그리드 요소를 반환합니다(그리드에 "비어 있는 상태"가 표시됩니다). 그리드가 없으면 타임라인 요소를 반환합니다(타임라인에 "비어 있는 상태"가 표시됩니다). 이 메서드는 재정의할 수 있습니다.
- <span class="submethod">**getNode (): HTMLElement | null**</span> - 비어 있는 상태 요소의 DOM 노드를 반환합니다.
- <span class="submethod">**show (): null | void**</span> - "비어 있는 상태"를 표시합니다. 빈 상태 요소 컨테이너가 없으면 *null*을 반환합니다. 확장 자체에서 이 메서드를 호출합니다.
- <span class="submethod">**hide (): boolean | void**</span> - "비어 있는 상태"를 숨깁니다. 비어 있는 상태 요소 노드가 없으면 숨길 내용이 없으므로 *false*를 반환합니다. 확장 자체에서 이 메서드를 호출합니다.
- <span class="subproperty">**clickEvents?**</span> -  (*Array&lt;string&gt;*) - 첨부된 핸들러의 ID 배열입니다. *attachAddTaskEvent* 및 *detachAddTaskEvents* 메서드에 의해 수정됩니다.
- <span class="submethod">**attachAddTaskEvent (): void**</span> - Empty State Element를 클릭한 후 실행될 핸들러를 추가합니다. 기본적으로 새 작업을 추가하는 데 사용됩니다.
- <span class="submethod">**detachAddTaskEvents (): void**</span> - Empty State Element를 클릭하여 작업을 추가하는 데 사용되었던 핸들러를 제거합니다.

## 예제

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