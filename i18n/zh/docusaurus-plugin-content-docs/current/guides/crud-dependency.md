--- 
title: "添加/更新/删除链接" 
sidebar_label: "添加/更新/删除链接" 
---

# 添加/更新/删除链接

在本章中，您将学习如何对依赖链接执行基本操作：创建或删除链接，以及动态更新链接的属性。


## 添加新链接

要向甘特图添加新链接，请使用 [addLink](api/method/addlink.md) 方法：

~~~js
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:"1"
});
~~~

## 动态更新链接的属性

要动态更新一个链接对象的某个属性，请使用 [refreshLink](api/method/refreshlink.md) 方法：

~~~js
var links= gantt.config.links;
var link = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}

if (link.type == links.finish_to_start){/*!*/ 
    link.type = links.finish_to_finish;/*!*/ 
    gantt.refreshLink(1); /*!*/ 
}/*!*/ 
~~~

注意，要一次性更新甘特图中的所有链接，请使用 [refreshData](api/method/refreshdata.md) 方法：

~~~js
var links= gantt.config.links;

var link1 = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}
var link2 = gantt.getLink(2);//->{id:2,source:4, target:5, type:"0"}

if (link1.type == links.finish_to_finish){/*!*/ 
    gantt.refreshData()/*!*/ 
}/*!*/ 
~~~

:::note
注：所有类型的链接依赖关系都存储在 [links](api/config/links.md) 对象中
:::

## 删除一个链接

要删除链接，请使用 [deleteLink](api/method/deletelink.md) 方法：

~~~js
gantt.deleteLink(linkId);
~~~

## 从甘特图中移除所有链接

要从甘特图清除所有任务和链接，请调用 [clearAll](api/method/clearall.md) 方法：


~~~js
gantt.clearAll();
~~~

## 从 UI 编辑链接的值

没有内置的界面供用户编辑链接的延迟（lag）或其他属性。因此如果你需要这样的界面，必须手动实现。

一种常见方法如下所示：

- 捕捉 [onLinkDblClick](api/event/onlinkdblclick.md) 事件； 
- 取消默认处理程序； 
- 从事件处理程序中显示一个弹出窗口。

在最后一步，您可以使用 [built-in popups ](guides/message-boxes.md) 或实现自定义解决方案。

下面是一个编辑 lag 弹出窗口实现的示例代码：

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

