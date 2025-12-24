---
title: "拖动任务及其依赖任务"
sidebar_label: "拖动任务及其依赖任务"
---

# 拖动任务及其依赖任务


有几种方式可以处理将任务与其依赖任务一起移动的情况。

## 使用自动调度扩展


一种选择是使用 [자동 스케줄링](guides/auto-scheduling.md) 扩展。它会根据任务之间的关系自动调度任务。

要启用自动调度，请使用 [gantt.plugins](api/method/plugins.md) 方法:

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

同时，将 **auto_scheduling** 属性设置为 true:

~~~js
gantt.config.auto_scheduling = true;
~~~

## 手动移动任务


### 章节目录

- [获取所有关联任务](#linked_tasks)
- [与主任务同步移动后代任务](#sync)
- [在主任务移动完成后再移动后代任务](#after)


### 核心思路
一种常见的拖动依赖任务的方式是:

- 检测任务正在被移动
- 找到所有依赖任务，并以相同（或调整后）的幅度移动它们

你可以选择以下两种方法之一:

- [与主任务同步移动后代任务](#sync)
- [在主任务移动完成后再移动后代任务](#after)

无论哪种方式，第一步都是获取所有关联任务。


### 获取所有关联任务 {#linked_tasks}

要查找与任务相关的链接，可以使用任务对象上的 **$source** 和 **$target** 属性。
这些属性是自动生成的，包含相关链接的 ID:

- $source - 从该任务出发的链接
- $target - 指向该任务的链接

~~~js
var taskObj = gantt.getTask("t1");
 
var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 外发链接的ID  
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - 入链的ID
~~~

通过这些链接，可以找到依赖的任务。

要收集所有关联任务，可以定义如下迭代器:

~~~js
gantt.eachSuccessor = function(callback, root){
  if(!this.isTaskExists(root))
    return;
  
  // 跟踪已访问的任务，避免死循环
  var traversedTasks = arguments[2] || {};
  if(traversedTasks[root])
    return;
  traversedTasks[root] = true;
  
  var rootTask = this.getTask(root);
  var links = rootTask.$source;
  if(links){
    for(var i="0;" i < links.length; i++){
      var link = this.getLink(links[i]);
      if(this.isTaskExists(link.target) && !traversedTasks[link.target]){
        callback.call(this, this.getTask(link.target));
        
        // 遍历整个依赖分支，不仅仅是第一层
        this.eachSuccessor(callback, link.target, traversedTasks);
      }
    }
  }
};
~~~


### 与主任务同步移动后代任务 {#sync}

在拖动主任务时，可以将其后代任务一起移动。也就是说，用户移动主任务时，所有依赖任务会同步移动。这种方式视觉上流畅，但如果涉及任务较多，可能会影响性能。

#### 第1步

首先，按照[获取所有关联任务](#linked_tasks)中的方法声明迭代器。

#### 第2步

接下来，绑定 [onTaskDrag](api/event/ontaskdrag.md) 事件的处理器。该事件会在每一帧拖动时触发，在此可以移动所有关联任务。

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move){
    var diff = task.start_date - original.start_date;
    gantt.eachSuccessor(function(child){
      child.start_date = new Date(+child.start_date + diff);
      child.end_date = new Date(+child.end_date + diff);
      gantt.refreshTask(child.id, true);
    },id );
  }
  return true;
});
~~~

#### 第3步

最后，当拖动结束，用户释放鼠标时，将子任务的位置对齐到时间刻度。这可以通过 [onAfterTaskDrag](api/event/onaftertaskdrag.md) 事件完成:

~~~js
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move ){
    gantt.eachSuccessor(function(child){
      child.start_date = gantt.roundDate(child.start_date);
      child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
      gantt.updateTask(child.id);
    },id );
  }
});
~~~

除非关联任务数量非常多，否则这种方法效果良好。


### 在主任务移动完成后再移动后代任务 {#after}

另一种方式是，仅在主任务移动完成后才更新其后代任务。这种方式视觉上更简单，性能也更好。

思路是等待拖拽操作完成后，再计算主任务移动了多少天，然后将所有关联任务按此幅度移动。

#### 第1步

首先，按照前文[获取所有关联任务](#linked_tasks)的方法声明迭代器。

#### 第2步

当用户完成拖动时，捕获 [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) 事件。该事件会同时提供被移动任务的原始版本和修改后的版本，可以用来计算日期差。

:::note
注意，此时拖拽操作仍有可能被取消（因为 onBeforeTaskChanged 支持取消，并且你的应用可能有相关处理器），因此此处不会更新依赖任务。
:::

相反，可以将计算出的差值保存在稍后可访问的变量中。

~~~js
var diff = 0;

gantt.attachEvent("onBeforeTaskChanged", function(id, mode, originalTask){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move ){
    var modifiedTask = gantt.getTask(id);
    diff = modifiedTask.start_date - originalTask.start_date;
  }
  return true;
});
~~~

#### 第3步

最后，使用 [onAfterTaskDrag](api/event/onaftertaskdrag.md) 事件，利用之前计算的 *diff* 更新所有依赖任务:

~~~js
//将子任务位置对齐到时间刻度
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      gantt.eachSuccessor(function(child){
        child.start_date = gantt.roundDate(new Date(child.start_date.valueOf() + diff));
        child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
        gantt.updateTask(child.id);
      },id );
    }
});
~~~

完整代码如下:

~~~js
(function(){
  
  var diff = 0;
  
  gantt.attachEvent("onBeforeTaskChanged", function(id, mode, originalTask){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      var modifiedTask = gantt.getTask(id);
      diff = modifiedTask.start_date - originalTask.start_date;
    }
    return true;
  });
  
  //将子任务位置对齐到时间刻度
  gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      gantt.eachSuccessor(function(child){
        child.start_date = gantt.roundDate(new Date(child.start_date.valueOf() + diff));
        child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
        gantt.updateTask(child.id);
      },id );
    }
  });
})();
~~~

@linkclass:hidden

