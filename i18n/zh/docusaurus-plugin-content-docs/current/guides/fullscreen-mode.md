---
title: "全屏模式"
sidebar_label: "全屏模式"
---

# 全屏模式

从 3.3 版本开始，库提供了 **fullscreen** 扩展。

该扩展允许组件在支持 FullScreen API 的情况下切换到全屏模式（[支持的浏览器列表](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)）。

<div style="text-align:center;">![full_screen](/img/full_screen.png)</div>

对于旧版浏览器，则会将甘特图拉伸以填满窗口的 100%。

要启用全屏支持，请通过 [gantt.plugins](api/method/plugins.md) 方法激活 **fullscreen** 插件:

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

组件本身不包含内置的 UI 控件用于切换全屏模式，因此你需要自行添加，或者使用以下示例:

~~~js
<input id="fullscreen_button" type="button" value="Toggle Fullscreen"/>

<script>
var button = document.getElementById("fullscreen_button");
     button.addEventListener("click", function(){
          if (!gantt.getState().fullscreen) {
            // 将甘特图切换为全屏
               gantt.expand();
          }
          else {
            // 恢复甘特图为正常大小
               gantt.collapse();
          }
     }, false);
</script>
~~~

点击按钮即可在原始大小和全屏模式之间切换甘特图。


[Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


## API 概览

有两个主要方法用于控制甘特图的显示模式:

- [expand](api/method/expand.md) - 将甘特图切换为全屏模式

~~~js
gantt.expand();
~~~

- [collapse](api/method/collapse.md) - 将甘特图从全屏恢复为正常模式

~~~js
gantt.collapse();
~~~

## 支持的事件

以下事件可用于处理全屏状态的变化:

- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)

~~~js
// 在甘特图切换到全屏之前
gantt.attachEvent("onBeforeExpand",function(){
    // 此处可添加自定义逻辑    
    return true;
});

// 在退出全屏模式之前
gantt.attachEvent("onBeforeCollapse",function(){
    // 此处可添加自定义逻辑    
    return true;
});

// 甘特图已切换到全屏后
gantt.attachEvent("onExpand", function (){
    // 此处可添加自定义逻辑
});

// 甘特图已退出全屏后
gantt.attachEvent("onCollapse", function (){
    // 此处可添加自定义逻辑
});
~~~

## Fullscreen API

[fullscreen](guides/fullscreen-ext.md) 对象提供四个方法，用于管理甘特图及其他元素的全屏行为:

- **expand()** - 将甘特图切换为全屏

~~~js
gantt.ext.fullscreen.expand();
~~~

- **collapse()** - 退出全屏并恢复甘特图为正常大小

~~~js
gantt.ext.fullscreen.collapse();
~~~

- **toggle()** - 在全屏与正常模式之间切换

~~~js
gantt.ext.fullscreen.toggle();
~~~

- **getFullscreenElement()** - 返回调用 **expand()** 时将被扩展为全屏的 DOM 元素

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

默认情况下，**getFullscreenElement()** 返回甘特图的 HTML 容器。你可以重写此方法以在全屏模式下包含其他元素，具体说明见 [此处](guides/fullscreen-mode.md#gantetudaitoubugongjulandequanpingmoshi)。

## 甘特图带头部/工具栏的全屏模式

通过 *fullscreen* 对象的 **getFullscreenElement()** 方法，Gantt API 允许将全屏模式扩展到其他元素:

~~~js
gantt.ext.fullscreen.getFullscreenElement();
~~~

:::note
默认情况下，该方法返回甘特图的 HTML 容器，因此只有甘特图会进入全屏。
:::

如果你希望在全屏时显示甘特图及额外元素（如头部或工具栏），可在页面上创建自定义容器，例如:

~~~html
<div id="myCover">
    <div class="gantt_control">
        <button id="toggle_fullscreen" 
                onclick="gantt.ext.fullscreen.toggle();">toggle fullscreen</button>
    </div>
        <div id="gantt_here"></div>
</div>
~~~

然后重写 **getFullscreenElement()** 方法，使其返回你希望全屏显示的自定义容器:

~~~js
gantt.ext.fullscreen.getFullscreenElement = function() {
    return document.getElementById("myCover");
}
gantt.init("gantt_here");
~~~


[Full Screen with additional elements](https://docs.dhtmlx.com/gantt/samples/02_extensions/26_full_screen_with_additional_elements.html)


## 为什么全屏模式可能无法使用？

fullscreen 扩展仅在甘特图允许切换到全屏时工作。

如果甘特图位于 iframe 中，且:

- 缺少 **allowfullscreen** 属性或 **allow="fullscreen"** 权限
- 或 **allow** 属性未包含 "fullscreen"

则甘特图将无法进入全屏模式（可在我们的代码片段工具中尝试:[Example 1](https://snippet.dhtmlx.com/k72wjyzl), [Example 2](https://snippet.dhtmlx.com/7jdrk6q5)）。

### Salesforce 中的全屏模式

在使用 [Locker Service](https://developer.salesforce.com/docs/atlas.en-us.238.0.lightning.meta/lightning/security_code.htm) 的 Salesforce 应用中，Fullscreen 扩展无法使用，因为 Locker 会阻止元素切换为全屏。

具体来说，该扩展不支持 **Lightning Aura** 或 **Lightning Web Components**，但可能在 **Visualforce** 框架下可用。

你可以通过在配置中添加如下代码片段来测试应用是否支持全屏:

~~~js
console.log("document.body.requestFullscreen", document.body.requestFullscreen)
~~~

如果输出为 `undefined`，则表示全屏被禁用，甘特图无法切换为全屏模式。


:::note
如果在不支持全屏的环境中启用了全屏支持，可能会出现错误，但甘特图会照常运行。
:::

