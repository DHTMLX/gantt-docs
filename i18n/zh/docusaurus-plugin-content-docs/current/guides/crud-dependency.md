---
title: "添加/更新/删除链接"
sidebar_label: "添加/更新/删除链接"
---

# 添加/更新/删除链接

本节介绍如何操作依赖链接，包括创建、删除和动态更新链接属性。

## 添加新链接

要在甘特图中插入新链接，请使用 [addLink](api/method/addlink.md) 方法:

~~~js
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:"1"
});
~~~

## 更新链接属性

若需动态更改链接的属性，可以使用 [refreshLink](api/method/refreshlink.md) 方法:

~~~js
var links= gantt.config.links;
var link = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}

if (link.type == links.finish_to_start){/*!*/ 
    link.type = links.finish_to_finish;/*!*/ 
    gantt.refreshLink(1); /*!*/ 
}/*!*/ 
~~~

如果你希望一次性刷新甘特图上的所有链接，应使用 [refreshData](api/method/refreshdata.md) 方法:

~~~js
var links= gantt.config.links;

var link1 = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}
var link2 = gantt.getLink(2);//->{id:2,source:4, target:5, type:"0"}

if (link1.type == links.finish_to_finish){/*!*/ 
    gantt.refreshData()/*!*/ 
}/*!*/ 
~~~

:::note
请注意，所有类型的链接依赖均在 [links](api/config/links.md) 对象中定义
:::

## 删除链接

要删除链接，请使用 [deleteLink](api/method/deletelink.md) 方法:

~~~js
gantt.deleteLink(linkId);
~~~

## 从甘特图中移除所有链接

若需清除甘特图中的所有任务和链接，只需调用 [clearAll](api/method/clearall.md) 方法:

~~~js
gantt.clearAll();
~~~

## 通过界面编辑链接值


目前没有内置的界面用于编辑延迟或其他链接属性。如果需要此类界面，需要自行实现。

常见的实现步骤如下:

- 监听 [onLinkDblClick](api/event/onlinkdblclick.md) 事件；
- 阻止默认行为；
- 在事件处理函数中弹出窗口。

弹出窗口可以使用 [内置弹窗](guides/message-boxes.md) 或自定义实现。

下面是一个实现编辑延迟弹窗的示例:

~~~js
(function(){
    var modal;
    var editLinkId;

    function endPopup(){
        modal = null;
        editLinkId = null;
    }
    function cancelEditLink(){
        endPopup();
    }

    function deleteLink(){
        gantt.deleteLink(editLinkId);
        endPopup();
    }

    function saveLink(){
        var link = gantt.getLink(editLinkId);

        var lagValue = modal.querySelector(".lag-input").value;
        if(!isNaN(parseInt(lagValue, 10))){
            link.lag = parseInt(lagValue, 10);
        }

        gantt.updateLink(link.id);
        if(gantt.autoSchedule){
            gantt.autoSchedule(link.source);
        }
        endPopup();
    }
    gantt.attachEvent("onLinkDblClick", function(id,e){
        editLinkId = id;
        var link = gantt.getLink(id);
        var linkTitle = gantt.getTask(link.source).text + " -> " + 
            gantt.getTask(link.target).text;

        modal = gantt.modalbox({
            title: linkTitle,
            text: "<div>" +
                    "<label>Lag <input type='number' class='lag-input' /></label>" +
                "</div>",
            buttons: [
                {label:"Save", value:"save"},
                {label:"Cancel", value:"cancel"},
                {label:"Delete", value:"delete"}
            ],
            width: "500px",
            callback: function(result){
                switch(result){
                    case "save":
                        saveLink();
                        break;
                    case "cancel":
                        cancelEditLink();
                        break;

                    case "delete":
                        deleteLink();
                        break;
                }
            }
        });

        modal.querySelector(".lag-input").value = link.lag || 0;

        return false;
    });
})();
~~~


**Related example:** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)

