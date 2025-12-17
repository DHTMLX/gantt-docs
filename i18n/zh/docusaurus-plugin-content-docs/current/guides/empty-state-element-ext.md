---
title: "emptyStateElement 扩展"
sidebar_label: "emptyStateElement 扩展"
---

emptyStateElement 扩展
======================

关于 emptyStateElement 扩展的更多信息，请参阅 [Empty State Screen](guides/empty-state-screen.md) 文章。

## 方法

**gantt.ext.emptyStateElement** 对象提供以下方法:

- <span class="submethod">**isGanttEmpty (): boolean**</span> - 当 Gantt 图中没有加载任何数据时返回 *true*，否则返回 *false*。此方法可帮助判断是否在页面上显示"空状态"。如果需要更改默认行为，可以自定义此方法。
- <span class="submethod">**isEnabled (): boolean**</span> - 如果 [show_empty_state](api/config/show_empty_state.md) 属性已启用，则返回 *true*；否则返回 *false*。
- <span class="submethod">**renderContent (container): void**</span> - 向空状态元素插入 HTML 内容。如有需要，可以重写此方法。
    - **_container_** - (*HTMLElement*) - 用于承载内容的元素
- <span class="submethod">**getContainer (): HTMLElement | null**</span> - 返回将附加空状态的 DOM 元素。默认情况下，返回网格元素（因此"空状态"会显示在网格中）。如果网格不可用，则返回时间轴元素（在时间轴中显示"空状态"）。该方法可以自定义。
- <span class="submethod">**getNode (): HTMLElement | null**</span> - 返回表示空状态元素的 DOM 节点。
- <span class="submethod">**show (): null | void**</span> - 显示"空状态"。如果没有可用的容器用于 Empty State Element，则返回 *null*。此方法由扩展自动调用。
- <span class="submethod">**hide (): boolean | void**</span> - 隐藏"空状态"。如果 Empty State Element 节点不存在，则返回 *false*，表示没有需要隐藏的内容。此方法同样由扩展自动调用。
- <span class="subproperty">**clickEvents?**</span> -  (*Array&lt;string&gt;*) - 存储已绑定事件处理器的 ID。由 *attachAddTaskEvent* 和 *detachAddTaskEvents* 方法进行更新。
- <span class="submethod">**attachAddTaskEvent (): void**</span> - 添加在点击 Empty State Element 时触发的处理器。默认情况下，用于添加新任务。
- <span class="submethod">**detachAddTaskEvents (): void**</span> - 移除点击 Empty State Element 时用于添加任务的处理器。

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

