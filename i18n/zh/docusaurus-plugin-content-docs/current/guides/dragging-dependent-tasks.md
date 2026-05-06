---
title: "将任务及其依赖任务一起拖动"
sidebar_label: "将任务及其依赖任务一起拖动"
---

# 将任务及其依赖任务一起拖动

有多种实现将任务与其依赖任务一起移动的方法。

## 使用 Auto Scheduling 扩展

首先，可以使用 [Auto Scheduling](guides/auto-scheduling.md) 扩展。
它根据任务之间的关系自动为任务排程。

要使用自动排程功能，应通过 [gantt.plugins](api/method/plugins.md) 方法启用它：

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

并将 **auto_scheduling** 属性设置为 true：

~~~js
gantt.config.auto_scheduling = true;
~~~

## 手动移动任务

### 章节内容

- [获取所有链接的任务](#linked_tasks)
- [与主任务同步移动后代任务](#sync)
- [在主任务移动完成后移动后代任务](#after)


### 核心思路
拖动带有依赖关系的任务的常见做法如下：

- 你在检测到任务正在移动时
- 遍历所有依赖任务，并将它们移动到相同的（或不同的，取决于你的需求）距离。

因此，你可以选择以下两种方式之一：

- [与主任务同步移动后代任务](#sync)
- [在主任务移动完成后移动后代任务](#after)

在这两种情况下，首先需要获取所有链接的任务。


### 获取所有链接的任务 {#linked_tasks}

要检索与任务相关的链接，请使用任务对象的 **$source** 与 **$target** 属性。
这些属性是自动生成的，存储相关链接的 id：

- $source - 从该任务引出的链接；
- $target - 进入该任务的链接。

~~~js
var taskObj = gantt.getTask("t1");
 
var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 由该任务引出的链接的 id
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - 进入该任务的链接的 id
~~~

并且可以通过链接获取依赖任务。

因此，要获取链接的任务，我们需要声明一个迭代器：

~~~js
gantt.eachSuccessor = function(callback, root){
  if(!this.isTaskExists(root))
    return;
  
  // 记住我们已经遍历过的任务，以避免无限循环
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
        
        // 迭代整条分支，而不仅仅是第一层依赖
        this.eachSuccessor(callback, link.target, traversedTasks);
      }
    }
  }
};
~~~


### 与主任务同步移动后代任务 {#sync}

后代任务可以在与主任务移动的同步过程中一起移动，即当用户开始移动任务时，所有依赖分支将一起移动。  
这看起来很合适，但缺点是如果同时移动大量任务，可能会出现性能下降。


#### 步骤 1

首先，我们将按照上文所示声明迭代器。


#### 步骤 2

然后，你需要将处理程序附加到 [onTaskDrag](api/event/ontaskdrag.md) 事件。它将在拖放的每一帧调用，我们将在这里移动所有链接的任务。

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

#### 步骤 3

最后，当用户释放鼠标并完成拖放时，我们需要将子项的位置四舍五入以缩放对齐。我们可以使用 [onAfterTaskDrag](api/event/onaftertaskdrag.md) 事件来实现：

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

如果链接的任务不太多，这种方式工作得很好。


### 在主任务移动完成后移动后代任务 {#after}

后代任务可以在用户完成主任务移动后再进行更新。这样结果看起来会更简单，但性能会更好。

实现思路如下：当拖放完成后，检查任务移动了多少距离，并将所有链接的任务移动到相同的数值。

#### 步骤 1

首先，我们将按照上文所示声明迭代器。

#### 步骤 2

当用户释放鼠标并完成拖放时，我们可以捕获 [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) 事件，其中移动任务的修改实例和原始实例都可用，并计算它们之间的日期差值。

:::note
注意，此时拖拽操作仍有可能被取消（因为 onBeforeTaskChanged 支持取消，并且你的应用可能有相关处理器），因此此处不会更新依赖任务。
:::

相反，我们将把计算得到的 diff 值放在同一闭包中的一个变量里，以便稍后访问。

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

#### 步骤 3

最后，我们捕获 [onAfterTaskDrag](api/event/onaftertaskdrag.md) 事件，表明拖放已完成。此时我们可以使用在上一步骤中计算得到的 *diff* 来更新所有依赖任务：

~~~js
//将子项的位置四舍五入以缩放
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

完整代码如下：

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
  
  //将子项的位置四舍五入以缩放
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
