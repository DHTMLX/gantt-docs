---
title: "emptyStateElement 扩展"
sidebar_label: "emptyStateElement 扩展"
---

# emptyStateElement 扩展

在 [空状态屏幕](guides/empty-state-screen.md) 文章中了解有关 emptyStateElement 扩展的详细信息。

## 方法

以下方法可通过 **gantt.ext.emptyStateElement** 对象使用：

- <span class="submethod">**isGanttEmpty (): boolean**</span> - 当甘特图中没有加载数据时返回 true，否则返回 false。扩展使用该方法来定义是否在页面上显示“空状态”。如果需要更改默认行为，可以重新定义该方法。
- <span class="submethod">**isEnabled (): boolean**</span> - 当 [show_empty_state](api/config/show_empty_state.md) 属性被启用时返回 true，否则返回 false
- <span class="submethod">**renderContent (container): void**</span> - 将 HTML 内容放入空状态元素。该方法可以被重新定义。
    - **_container_** - (*HTMLElement*) - 容器元素
- <span class="submethod">**getContainer (): HTMLElement | null**</span> - 返回将附着空状态的 DOM 元素。默认情况下，返回网格元素（“空状态”将显示在网格中）。如果没有网格，则返回时间线元素（“空状态”将显示在时间线中）。该方法可以被重新定义。
- <span class="submethod">**getNode (): HTMLElement | null**</span> - 返回空状态元素的 DOM 节点
- <span class="submethod">**show (): null | void**</span> - 显示“空状态”。如果没有空状态元素的容器，则返回 null。扩展会自动调用该方法
- <span class="submethod">**hide (): boolean | void**</span> - 隐藏“空状态”。如果没有空状态元素节点，则返回 false，因此没有要隐藏的内容。扩展会自动调用该方法
- <span class="subproperty">**clickEvents?**</span> -  (*Array&lt;string&gt;*) - 一个包含已附加处理程序 ID 的数组。它会被 *attachAddTaskEvent* 与 *detachAddTaskEvents* 方法修改。
- <span class="submethod">**attachAddTaskEvent (): void**</span> - 添加在单击空状态元素后将触发的处理程序。默认情况下，用于添加一个新任务。
- <span class="submethod">**detachAddTaskEvents (): void**</span> - 移除用于在单击空状态元素后添加任务的处理程序


## 示例

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