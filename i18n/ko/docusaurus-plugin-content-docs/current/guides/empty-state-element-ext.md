---
title: "emptyStateElement 확장"
sidebar_label: "emptyStateElement 확장"
---

# emptyStateElement 확장

emptyStateElement 확장에 대한 자세한 내용은 [Empty State Screen](guides/empty-state-screen.md) 문서에서 확인할 수 있습니다.

## 메서드

**gantt.ext.emptyStateElement** 객체는 다음과 같은 메서드를 제공합니다:

- <span class="submethod">**isGanttEmpty (): boolean**</span> - Gantt 차트에 데이터가 로드되어 있지 않으면 *true*를 반환하고, 그렇지 않으면 *false*를 반환합니다. 이 메서드는 페이지에 "empty state"를 표시할지 결정할 때 사용됩니다. 기본 동작을 변경하고 싶다면 커스터마이즈할 수 있습니다.
- <span class="submethod">**isEnabled (): boolean**</span> - [show_empty_state](api/config/show_empty_state.md) 속성이 활성화되어 있으면 *true*를 반환하고, 그렇지 않으면 *false*를 반환합니다.
- <span class="submethod">**renderContent (container): void**</span> - empty state 요소에 HTML 콘텐츠를 삽입합니다. 필요에 따라 이 메서드를 오버라이드할 수 있습니다.
    - **_container_** - (*HTMLElement*) - 콘텐츠를 담을 요소
- <span class="submethod">**getContainer (): HTMLElement | null**</span> - empty state가 부착될 DOM 요소를 반환합니다. 기본적으로 grid 요소를 반환하므로 "empty state"가 grid에 나타납니다. grid가 없으면 timeline 요소를 반환하여 "empty state"가 timeline에 표시됩니다. 이 메서드는 커스터마이즈할 수 있습니다.
- <span class="submethod">**getNode (): HTMLElement | null**</span> - empty state 요소를 나타내는 DOM 노드를 반환합니다.
- <span class="submethod">**show (): null | void**</span> - "empty state"를 표시합니다. Empty State Element에 대한 컨테이너가 없으면 *null*을 반환합니다. 이 메서드는 확장에 의해 자동으로 호출됩니다.
- <span class="submethod">**hide (): boolean | void**</span> - "empty state"를 숨깁니다. Empty State Element 노드가 없으면 *false*를 반환하여 숨길 것이 없음을 나타냅니다. 이 메서드 역시 확장에 의해 자동으로 호출됩니다.
- <span class="subproperty">**clickEvents?**</span> -  (*Array&lt;string&gt;*) - 연결된 이벤트 핸들러의 ID를 저장합니다. *attachAddTaskEvent*와 *detachAddTaskEvents* 메서드에 의해 갱신됩니다.
- <span class="submethod">**attachAddTaskEvent (): void**</span> - Empty State Element를 클릭할 때 트리거되는 핸들러를 추가합니다. 기본적으로 새 작업을 추가하는 데 사용됩니다.
- <span class="submethod">**detachAddTaskEvents (): void**</span> - Empty State Element를 클릭하여 작업을 추가하도록 설정된 핸들러를 제거합니다.

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

