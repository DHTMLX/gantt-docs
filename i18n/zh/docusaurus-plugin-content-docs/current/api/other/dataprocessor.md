---
sidebar_label: dataprocessor
title: dataprocessor config
description: "一组 dataprocessor 方法"
---

# dataprocessor

### Description

@short: 一组 dataprocessor 方法


### Details

您可以通过 [createDataProcessor](api/method/createdataprocessor.md) 方法创建一个新的 DataProcessor 实例。也可以通过较旧的方式，使用 [dataProcessor](api/method/dataprocessor.md) 构造函数来创建实例。<br>
**dataprocessor** 对象包含以下[方法](#methods)和[事件](#events):

### 方法 {#methods}

<ul id="attachEvent">
  <li>
  <b>attachEvent (name, handler, settings): string</b> - 向 DataProcessor API 事件添加一个处理函数
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - 事件名称，大小写不敏感</li>
  <li><b><i>handler</i></b> - (<i>Function</i>) - 事件处理函数</li>
  <li><b><i>settings?</i></b> - (<i>object</i>) - 可选，事件处理函数的设置对象</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    console.log("Updated task:", id);
});
~~~
</ul>

<ul id="detachEvent">
  <li>
  <b>detachEvent (id): void</b> - 根据事件处理函数的 ID 移除之前绑定的事件处理函数
  <ul>
  <li><b><i>id</i></b> - (<i>string</i>) - 事件处理函数的 ID</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
});

const handlerId = dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    console.log("Updated task:", id);
});

// 移除事件监听
dp.detachEvent(handlerId);
~~~
</ul>

<ul id="getState">
  <li>
  <b class="submethod">getState (id): string</b> - 获取指定项的状态（是否已更新）
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项的 ID</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
const status = dp.getState(id);
~~~
</ul>

<ul id="ignore">
  <li>
  <b class="submethod">ignore (code): void</b> - 在不触发 DataProcessor 操作的情况下执行一段代码
  <ul>
  <li><b><i>code</i></b> - (<i>Function</i>) - 数据修改函数</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.ignore(() => {
    // 这里的更改不会被保存
    gantt.addTask({
        id: 10,
        text: "Task #5",
        start_date: "03-02-2025",
        duration: 5
    });
});
~~~

<p>这对于在避免保存更改到服务器时添加或删除数据非常有用。</p>
<i>dp.ignore() 方法的行为类似于 [gantt.silent()](api/method/silent.md)。</i>
</ul>

<ul id="setTransactionMode">
  <li>
  <b class="submethod">setTransactionMode (mode, total): void</b> - 设置数据发送到服务器的方式
  <ul>
  <li><b><i>mode</i></b> - (<i>string</i>) - 发送方式，选项包括 "GET"、"POST"、"REST"、"JSON" 或 "REST-JSON"</li>
  <li><b><i>total</i></b> - (<i>boolean</i>) - 是否一次发送所有数据，还是每条记录单独发送</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.setTransactionMode("POST", true);
~~~

<p>如果您想发送自定义 HTTP 头或额外数据，可以传入一个对象作为第一个参数，包含以下属性:</p>

<ul>
  <li><b><i>mode</i></b> - (<i>string</i>) - 数据发送模式，如 "GET"、"POST"、"REST"、"JSON" 或 "REST-JSON"</li>
  <li><b><i>headers</i></b> - (<i>object</i>) - 请求中包含的头部键值对</li>
  <li><b><i>payload</i></b> - (<i>object</i>) - 与头部一起发送的额外键值对</li>
</ul>
~~~js
dp.setTransactionMode({
    mode: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Language": "fr-FR"
    },
    payload: {
        "user_id": "12"
    }
}, true);
~~~
</ul>

<ul id="setUpdated">
  <li>
  <b class="submethod">setUpdated (rowId, [mode, state]): void</b> - 标记某项为已更新或未更新
  <ul>
  <li><b><i>rowId</i></b> - (<i>string | number</i>) - 项的 ID</li>
  <li><b><i>mode?</i></b> - (<i>boolean</i>) - 可选，<code>true</code>（默认）标记为已更新，<code>false</code>标记为未更新</li>
  <li><b><i>state?</i></b> - (<i>string</i>) - 可选，更新状态名称，默认是 <code>"updated"</code></li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.setUpdated(1);
dp.setUpdated(2, true, "deleted");
~~~
</ul>


### 事件 {#events} 

<ul id="onAfterUpdate">
  <li>
  <b class="submethod">onAfterUpdate (id, action, tid, response): void</b> - 在服务器响应接收并处理后触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 被更新项的 ID</li>
  <li><b><i>action</i></b> - (<i>string</i>) - 响应状态（操作类型）</li>
  <li><b><i>tid</i></b> - (<i>string</i>) - 新 ID（仅插入操作时有效）</li>
  <li><b><i>response</i></b> - (<i>mixed</i>) - 解析后的响应，可能是 XML 节点或 JSON 对象</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        alert(`服务器错误: ${response.message}`);
    }
});
~~~
</ul>

<ul>
<p><b>可能的响应状态包括:</b></p>
<ul>
  <li><code>updated</code></li>
  <li><code>inserted</code></li>
  <li><code>deleted</code></li>
  <li><code>invalid</code></li>
  <li><code>error</code></li>
</ul>
</ul>

<ul id="onBeforeDataSending">
  <li>
  <b class="submethod">onBeforeDataSending (id, state, data): void</b> - 在数据发送到服务器之前触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项的 ID</li>
  <li><b><i>state</i></b> - (<i>string</i>) - 当前状态（操作类型）</li>
  <li><b><i>data</i></b> - (<i>object</i>) - 将要发送的序列化数据</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeDataSending", (id, state, data) => {
    // 发送数据前的自定义逻辑
    return true;
});
~~~
</ul>

<ul>
<p>此事件在每次数据更新请求时触发（在 <code>onBeforeUpdate</code> 之后）。</p>
<p>如果处理函数返回 <code>false</code>，数据将不会被发送到服务器。</p>

<p><b>可能的响应状态:</b></p>
<ul>
  <li><code>updated</code></li>
  <li><code>inserted</code></li>
  <li><code>deleted</code></li>
  <li><code>invalid</code></li>
  <li><code>error</code></li>
</ul>
</ul>

<ul id="onBeforeUpdate">
  <li>
  <b class="submethod">onBeforeUpdate (id, state, data): void</b> - 在记录（或多条记录）更新前触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 项的 ID</li>
  <li><b><i>state</i></b> - (<i>string</i>) - 项的状态（操作类型）</li>
  <li><b><i>data</i></b> - (<i>object</i>) - 将发送到服务器的数据</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeUpdate", (id, state, data) => {
    // 更新前的自定义逻辑
    return true;
});
~~~
</ul>

<ul>
<p>此事件在每条记录更新时触发，并且在 <code>onBeforeDataSending</code> 之前。</p>
<p>返回 <code>false</code> 将阻止数据发送。</p>

<p><b>可能的响应状态:</b></p>
<ul>
  <li><code>updated</code></li>
  <li><code>inserted</code></li>
  <li><code>deleted</code></li>
  <li><code>invalid</code></li>
  <li><code>error</code></li>
</ul>
</ul>

<ul id="onRowMark">
  <li>
  <b class="submethod">onRowMark (id, state, mode, invalid): void</b> - 在标记已更新项之前触发
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - 与错误相关的项的 ID</li>
  <li><b><i>state</i></b> - (<i>string</i>) - 项的状态（操作类型）</li>
  <li><b><i>mode</i></b> - (<i>boolean</i>) - <code>true</code> 表示添加标记，<code>false</code> 表示移除标记</li>
  <li><b><i>invalid</i></b> - (<i>object</i>) - 错误详细信息（如果有）</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onRowMark", (id, state, mode, invalid) => {
    // 标记项之前的自定义逻辑
    return true;
});
~~~
</ul>

<ul>
<p>此事件可以被阻止。返回 <code>false</code> 将阻止该项被标记。</p>
</ul>

### Related API
- [createDataProcessor](api/method/createdataprocessor.md)
- [dataProcessor](api/method/dataprocessor.md)

### Related Guides
- [服务器端集成](guides/server-side.md)

