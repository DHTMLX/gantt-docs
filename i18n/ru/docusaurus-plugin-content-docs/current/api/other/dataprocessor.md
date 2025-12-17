---
sidebar_label: dataprocessor
title: dataprocessor config
description: "набор методов dataprocessor"
---

# dataprocessor

### Description

@short: Набор методов dataprocessor


### Details

Вы можете создать новый экземпляр DataProcessor с помощью метода [createDataProcessor](api/method/createdataprocessor.md). Также существует более старый способ создания экземпляра через конструктор [dataProcessor](api/method/dataprocessor.md). <br>
Объект **dataprocessor** включает следующие [методы](#methods) и [события](#events):

### Методы {#methods}

<ul id="attachEvent">
  <li>
  <b>attachEvent (name, handler, settings): string</b> - добавляет обработчик к событию API DataProcessor
  <ul>
  <li><b><i>name</i></b> - (<i>string</i>) - имя события, регистронезависимое</li>
  <li><b><i>handler</i></b> - (<i>Function</i>) - функция, обрабатывающая событие</li>
  <li><b><i>settings?</i></b> - (<i>object</i>) - необязательный объект настроек для обработчика события</li>
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
    console.log("Обновленная задача:", id);
});
~~~
</ul>

<ul id="detachEvent">
  <li>
  <b>detachEvent (id): void</b> - удаляет ранее добавленный обработчик события по его ID
  <ul>
  <li><b><i>id</i></b> - (<i>string</i>) - ID обработчика события</li>
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
    console.log("Обновленная задача:", id);
});

// удаляем обработчик события
dp.detachEvent(handlerId);
~~~
</ul>

<ul id="getState">
  <li>
  <b class="submethod">getState (id): string</b> - получает состояние конкретного элемента (обновлен или нет)
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - ID элемента</li>
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
  <b class="submethod">ignore (code): void</b> - выполняет блок кода без вызова действий DataProcessor
  <ul>
  <li><b><i>code</i></b> - (<i>Function</i>) - функция, изменяющая данные</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.ignore(() => {
    // изменения здесь не будут сохранены
    gantt.addTask({
        id: 10,
        text: "Задача #5",
        start_date: "03-02-2025",
        duration: 5
    });
});
~~~

<p>Это полезно для добавления или удаления данных, когда вы хотите избежать сохранения этих изменений на сервере.</p>
<i>Метод dp.ignore() работает аналогично [gantt.silent()](api/method/silent.md).</i>
</ul>

<ul id="setTransactionMode">
  <li>
  <b class="submethod">setTransactionMode (mode, total): void</b> - задает способ отправки данных на сервер
  <ul>
  <li><b><i>mode</i></b> - (<i>string</i>) - метод отправки, варианты: "GET", "POST", "REST", "JSON" или "REST-JSON"</li>
  <li><b><i>total</i></b> - (<i>boolean</i>) - определяет, отправлять ли все данные сразу или по отдельности для каждой записи</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.setTransactionMode("POST", true);
~~~

<p>Если вы хотите отправлять кастомные HTTP-заголовки или дополнительные данные с запросами, можно передать объект в качестве первого параметра с такими свойствами:</p>

<ul>
  <li><b><i>mode</i></b> - (<i>string</i>) - режим отправки данных, например "GET", "POST", "REST", "JSON" или "REST-JSON"</li>
  <li><b><i>headers</i></b> - (<i>object</i>) - пары ключ-значение заголовков для включения в запрос</li>
  <li><b><i>payload</i></b> - (<i>object</i>) - дополнительные пары ключ-значение, отправляемые вместе с заголовками</li>
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
  <b class="submethod">setUpdated (rowId, [mode, state]): void</b> - помечает элемент как обновленный или нет
  <ul>
  <li><b><i>rowId</i></b> - (<i>string | number</i>) - ID элемента</li>
  <li><b><i>mode?</i></b> - (<i>boolean</i>) - необязательный параметр, <code>true</code> (по умолчанию) для пометки как обновленного, <code>false</code> для снятия пометки</li>
  <li><b><i>state?</i></b> - (<i>string</i>) - необязательный, имя состояния обновления, по умолчанию <code>"updated"</code></li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.setUpdated(1);
dp.setUpdated(2, true, "deleted");
~~~
</ul>


### События {#events} 

<ul id="onAfterUpdate">
  <li>
  <b class="submethod">onAfterUpdate (id, action, tid, response): void</b> - срабатывает после получения и обработки ответа сервера
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - ID обновленного элемента</li>
  <li><b><i>action</i></b> - (<i>string</i>) - статус ответа (тип операции)</li>
  <li><b><i>tid</i></b> - (<i>string</i>) - новый ID (только для операций вставки)</li>
  <li><b><i>response</i></b> - (<i>mixed</i>) - разобранный ответ, либо XML-узел, либо JSON-объект</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        alert(`Ошибка сервера: ${response.message}`);
    }
});
~~~
</ul>

<ul>
<p><b>Возможные статусы ответа:</b></p>
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
  <b class="submethod">onBeforeDataSending (id, state, data): void</b> - срабатывает непосредственно перед отправкой данных на сервер
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - ID элемента</li>
  <li><b><i>state</i></b> - (<i>string</i>) - текущее состояние элемента (тип операции)</li>
  <li><b><i>data</i></b> - (<i>object</i>) - сериализованные данные, которые будут отправлены</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeDataSending", (id, state, data) => {
    // Пользовательская логика перед отправкой данных
    return true;
});
~~~
</ul>

<ul>
<p>Это событие вызывается для каждого запроса обновления данных (после <code>onBeforeUpdate</code>).</p>
<p>Если обработчик возвращает <code>false</code>, данные не будут отправлены на сервер.</p>

<p><b>Возможные статусы ответа:</b></p>
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
  <b class="submethod">onBeforeUpdate (id, state, data): void</b> - срабатывает перед обновлением записи (или записей)
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - ID элемента</li>
  <li><b><i>state</i></b> - (<i>string</i>) - состояние элемента (тип операции)</li>
  <li><b><i>data</i></b> - (<i>object</i>) - данные, которые будут отправлены на сервер</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onBeforeUpdate", (id, state, data) => {
    // Пользовательская логика перед обновлением
    return true;
});
~~~
</ul>

<ul>
<p>Это событие вызывается для каждой обновляемой записи и перед <code>onBeforeDataSending</code>.</p>
<p>Возврат <code>false</code> здесь остановит отправку данных.</p>

<p><b>Возможные статусы ответа:</b></p>
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
  <b class="submethod">onRowMark (id, state, mode, invalid): void</b> - срабатывает перед пометкой обновленного элемента
  <ul>
  <li><b><i>id</i></b> - (<i>string | number</i>) - ID элемента, связанного с ошибкой</li>
  <li><b><i>state</i></b> - (<i>string</i>) - состояние элемента (тип операции)</li>
  <li><b><i>mode</i></b> - (<i>boolean</i>) - <code>true</code> для добавления пометки, <code>false</code> для удаления</li>
  <li><b><i>invalid</i></b> - (<i>object</i>) - детали ошибки, если есть</li>
  </ul>
  </li>
</ul>

<ul>
~~~js
dp.attachEvent("onRowMark", (id, state, mode, invalid) => {
    // Пользовательская логика перед пометкой элемента
    return true;
});
~~~
</ul>

<ul>
<p>Это событие можно заблокировать. Возврат <code>false</code> остановит пометку элемента.</p>
</ul>

### Related API
- [createDataProcessor](api/method/createdataprocessor.md)
- [dataProcessor](api/method/dataprocessor.md)

### Related Guides
- [Интеграция с серверной стороной](guides/server-side.md)

