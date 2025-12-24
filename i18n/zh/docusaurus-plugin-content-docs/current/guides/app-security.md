---
title: "应用程序安全"
sidebar_label: "应用程序安全"
---

# 应用程序安全


DHTMLX Gantt 是一个客户端 JavaScript 库，可无缝集成 Gantt 功能到各种 Web 应用程序中。 
我们不会通过限制 Gantt 的功能来提升安全性，但这也意味着不会限制其能力。 
这样，您可以根据项目需求自定义大部分 Gantt 功能。

需要注意的是，DHTMLX Gantt 本身并不负责防护诸如 SQL 注入、XSS 和 CSRF 攻击等威胁。 
确保项目安全，取决于您如何配置和保护您的应用程序。 
本文将为您提供关于 HTML 清洗的有用见解和建议。

## 基本安全措施

网络安全是一个广泛且复杂的领域，不可能用一个简单的清单完全覆盖。 
不过，以下实用步骤涵盖了基础内容，有助于降低常见风险。

**1. 在应用程序中使用内容安全策略（CSP）**

添加如下 CSP 头部可以阻止 XSS 脚本在您的应用中运行:

~~~
Content-Security-Policy: script-src 'self'
~~~

您的应用可能需要更详细的策略，但阻止内联脚本执行可以防止许多 XSS 和 CSRF 攻击。

**2. 在后端对用户输入进行清洗后再保存到数据库**

添加新记录时，避免直接原样保存用户输入:

~~~
db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent])
~~~

建议先验证输入格式并清除有害内容。 
例如，在 Node.js 中可以使用 [DOMPurify](https://www.npmjs.com/package/dompurify) 这类库:

~~~js
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

...

db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent]
        .map((input) => DOMPurify.sanitize(input))
~~~

**3. 在渲染数据前对 HTML 实体进行转义**

为了防止显示数据时执行 HTML 标记，务必在将用户输入传递给 Gantt 前转义 HTML 字符。 
可以使用 [validator](https://www.npmjs.com/package/validator) 库实现:

~~~js
const validator = require('validator');
...

// GET /data

Promise.all([
  db.query("SELECT * FROM gantt_tasks"),
  db.query("SELECT * FROM gantt_links")
]).then(results => {
    let tasks = results[0],
        links = results[1];
 
    tasks.forEach((task) => {
        Object.entries(task).forEach(([key, value]) => {
            if(typeof value === "string") {
                task[key] = validator.escape(value); //#!
            }
        });
        task.open = true;
        task.start_date = task.start_date.format("YYYY-MM-DD hh:mm:ss");
    });

    links.forEach((link) => {
        Object.entries(link).forEach(([key, value]) => {
            if(typeof value === "string") {
                link[key] = validator.escape(value); //#!
            }
        });
    });
    
 
    res.send({
        tasks,
        links 
   });
~~~

**4. 如果使用 SQL 数据库，避免通过字符串拼接创建 SQL 查询。应使用参数化查询、ORM 或 Query Builder。**

这样可以防止 SQL 注入攻击。 
切勿在 SQL 查询中直接使用未经转义或未检查的用户输入。 
如果目前代码存在这种情况，请考虑切换到参数化查询或使用 SQL 库提供的转义函数。

**5. 最后但同样重要:请咨询网络安全专家并遵循公司认可的安全策略**

安全是一个持续的过程。 
通过遵循上述步骤、遵守组织政策，并让安全专家审核您的工作，可以最大限度减少常见 Web 威胁。

基础措施介绍完毕后，下面来看一些 Gantt 相关的具体安全注意事项。

## 客户端 Gantt 的易受攻击区域

首先，在客户端添加像 Gantt 这样复杂功能时需要注意以下要点:

- DHTMLX Gantt 运行在客户端，所有从服务器加载的数据都会被原样使用。  
由于数据存储在服务器端，最大风险通常来自那里。但后端防护超出了 DHTMLX Gantt 的范围。 
- 攻击者可能通过 DevTools（自我 XSS 攻击）诱骗用户运行恶意代码，从而绕过安全措施。  
任何粘贴到任务文本中的代码，其行为与通过 DevTools 输入相同。 
- 如果攻击者获取到 Gantt 实例对象的访问权限，任何保护措施都可能被绕过。  
他们可以更改 Gantt 配置并获得完全控制权。

DHTMLX Gantt 中可能存在安全问题的易受攻击区域包括:

- 用户输入并保存的数据  
- 展示的 Gantt 数据（文本和可视元素）  
- 与 Gantt 数据交互的 [自定义 HTML 元素](guides/export.md#daochuhtmlyuansu)  
- 对 Gantt 对象本身的访问

下面我们将详细探讨这些问题。

## 隔离 Gantt 访问

保护 Gantt 的第一步是将其与被攻破的组件或被诱导的用户（自我 XSS）隔离开来。

:::note
如果攻击者获得了应用配置文件（包括 Gantt 配置文件）的访问权限，
任何已采取的 XSS 防护措施都可能失效，因此本场景不在本文讨论范围内。
:::

应用完全加载后，如果攻击者能访问 Gantt 实例对象，就可以修改任何内容并重写函数。 
因此，将 Gantt 隔离在项目内部非常重要。

实现方法是在函数内部创建独立的 Gantt 实例，这样函数内部的代码外部无法访问。

默认情况下，Gantt 会在 *gantt* 对象上创建新实例。 
在您的函数内部，使用 *const* 或 *let* 声明新变量并存储 Gantt 实例，使其在外部作用域不可见。

~~~js
function addGantt(){
  const gantt = Gantt.getGanttInstance();
}
addGantt()
~~~

您也可以使用不同的变量名，以避免与全局 gantt 对象混淆:

~~~js
function addGantt(){
  const protectedGantt = Gantt.getGanttInstance();
}
addGantt()
~~~

在防止非授权访问 Gantt 后，接下来要关注数据在 Gantt 图中的输入和展示方式。

## Gantt 中的数据输入

这是攻击者可能利用的关键领域，可能危及您的 Gantt 安全。

数据输入点是 XSS 攻击的常见目标。 
在 Gantt 组件中，数据可通过以下方式修改:

- lightbox  
- 行内编辑器  
- 带有自定义元素的模态框  
- 第三方库  
- 资源负载时间线中的资源分配  
- 带有自定义输入元素的附加层  
- 任何使用 Gantt API 允许数据输入的自定义方案（如工具栏或自定义任务编辑表单）

任务对象有 [许多属性](guides/task-properties.md)，具体使用哪些取决于启用的功能。 
可编辑属性越多，输入清洗就越重要。

### 示例说明

以下示例演示了在使用 DHTMLX Gantt 时，通过 HTML 清洗提升 XSS 防护的多种方式。


**Related example:** [Example to prevent XSS attacks (security, csp)](https://snippet.dhtmlx.com/cdy9p0yl)


在本示例中，您可以修改任务名称、调整日期和工期、变更资源分配以及添加文本备注。 
开始日期和工期的更改仅限于 lightbox 和行内编辑器，且两者都明确指定了 **date** 和 **number** 类型。 
在 lightbox 中，只能直接设置工期，日期须从下拉框选择。

这两种界面都不允许插入包含恶意代码的文本。 
如果有人试图通过 DOM 检查器更改元素类型，则会生成无效的日期或工期值。 
这会触发错误，导致 Gantt 无法继续工作，直到页面重新加载。同时，由于图表不会重绘，也不会将数据发送到服务器。

然而，任务名称使用的是 **string** 类型，因此可能受到 XSS 攻击。 
因此，输入清洗非常必要。示例中演示了一种 XSS 攻击方式及其防护方法。

![](/img/preventing_xss_attack.png)

在实际项目中，务必做好全面的数据清洗。 
本例中，我们仅将 "\<" 和 "\>" 字符替换为 HTML 实体 **`&lt;`** 和 **`&gt;`**，  
从而防止 HTML 元素在任务文本中被渲染。

此替换操作在 **sanitizeText()** 函数中实现，如下所示:

~~~js
function sanitizeText(text){
    // uncomment to test XSS
    // return text

    // prevent XSS by disabling HTML elements
    return text.split("<").join("&lt;").split(">").join("&gt;");
}
~~~

该函数在事件处理器中调用:lightbox 使用 **onLightboxSave**，行内编辑器使用 **onBeforeSave**。

在本例中，您可以通过自定义行内编辑器或 lightbox 部分为任务添加文本备注。 
可以在这些自定义组件的函数中进行清洗--即在渲染前和从 DOM 元素读取变更前:

~~~js
// for an inline editor:
set_value: function(value, id, column, node){
    node.firstChild.value = sanitizeText(value || "");
},
get_value: function(id, column, node){
    return sanitizeText(node.firstChild.value);
},

// for the lightbox:
set_value: function(node, value, task){
    node.value = sanitizeText(value || "");
},
get_value: function(node, task){
    return sanitizeText(node.value);
},
~~~

不过，更简单的做法是在 **onLightboxSave** 和 **onBeforeSave** 事件处理器中统一处理文本备注清洗:

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new){
    if (task.notes) {
        task.notes = sanitizeText(task.notes);
    }
    return true;
});

protectedGantt.ext.inlineEditors.attachEvent("onBeforeSave", function(state){
    if (state.columnName == "notes") {
        state.newValue = sanitizeText(state.newValue);
    }
    return true;
});
~~~

资源分配也可以在 lightbox 中编辑。由于 Gantt 并未将值限制为 **number** 类型，因此字符串值也是可能的，这可能导致 XSS 攻击。

资源值存储在任务属性中，因此 **sanitizeResourceValues()** 函数会遍历所有资源值并用 **sanitizeText()** 进行清洗:

~~~js
function sanitizeResourceValues(task){
    const resources = task[protectedGantt.config.resource_property];
    if (resources && resources.length) {
        resources.forEach(function (resource) {
               if (typeof resource.value == "string") {
                resource.value = sanitizeText(resource.value);
            }
        })
       }
}
~~~

该函数在 **onLightboxSave** 事件处理器中调用:

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new) {
    sanitizeResourceValues(task)
    return true;
});
~~~

*您在 Gantt 配置中涉及的其他字符串参数也应进行清洗。*

在本例中，如果您尝试在资源时间线的资源分配中输入不合规内容，仅会接受数字值，非数字内容不会被保存。

### 通过第三方工具录入数据

DHTMLX Gantt 提供了广泛的自定义选项，包括通过第三方表单、工具或库编辑任务。 
由于在这些场景下 Gantt API 负责管理任务操作，因此关于数据净化的通用建议较难给出，因为这取决于具体的自定义实现方式。

下例展示了一个用于编辑任务名称的自定义表单，同时使用 **sanitizeText()** 函数对文本进行转义:

~~~js
document.body.querySelector("[name='save']").onclick = function(){
    const newTaskName = document.body.querySelector("[name='text']").value;
    task.text = sanitizeText(newTaskName);
    protectedGantt.updateTask(task.id);
}
~~~

这些方法涵盖了大多数数据录入方式。在数据进入 Gantt 时进行净化，可以有效过滤不安全内容，使 XSS 攻击在 Gantt 图表内失效，并防止恶意数据传递到服务器。

## 在 Gantt 中展示数据

另一个需要关注的方面是数据在 Gantt 图表中的展示方式。 
虽然对展示数据进行净化不如对输入数据净化有效，但它仍有助于阻止或中断 XSS 攻击链。 
例如，如果服务器被攻破但 Gantt 本身未受影响，客户端的净化操作将阻止恶意脚本执行。

最安全的做法是对 Gantt 中所有展示数据的部分都进行净化。 
这涉及在[配置每个网格列时使用模板](guides/specifying-columns.md#shujuyingsheyumoban)，并应用[所有相关模板](api/overview/templates-overview.md)以防止渲染不安全内容。

不过，更简单的方式是控制两大数据来源:用户输入和服务器数据。 
通过净化输入数据，可以降低恶意内容出现在 Gantt 图表中的可能性。

例如，可以在通过 **onTaskLoading** 事件从服务器加载任务时对任务属性进行净化:

~~~js
protectedGantt.attachEvent("onTaskLoading", function (task) {
    task.text = sanitizeText(task.text);
    if (task.notes) {
        task.notes = sanitizeText(task.notes);
    }
    sanitizeResourceValues(task);
    return true;
});
~~~

其他加载数据的方式也可能存在，比如从服务器单独获取任务对象并在添加或更新到 Gantt 前进行处理。 
在这些情况下，净化操作应在处理函数内部、任务被添加前进行:

~~~js
let newTask = await loadFromServer(23);
sanitizeTaskProperties(newTask);
gantt.addTask(newTask);
~~~

如果有人利用浏览器的元素检查器，直接将恶意代码插入到 Gantt 的 DOM 元素中，这是无法防止的。 
但此类更改会在 Gantt 下次重新渲染时丢失，并且不会被保存到服务器。

## 服务器端问题

请注意，客户端校验很容易被绕过或禁用，因此不能依赖其保障安全。 
其主要作用是为不正确的输入提供即时反馈，无需等待服务器响应。 
最终的校验和安全检查必须在服务器端完成。

后端应正确校验、转义和清洗传入数据，强制执行用户访问规则等。

### SQL 注入

由于 dhtmlxGantt 完全在客户端运行，防止 SQL 注入的责任在于后端。

需要注意两点:

- lightbox 不包含默认校验，因此除非自行处理，用户可以在可编辑字段中输入任意值。
- 后端 API 可被直接通过带有恶意值的 PUT/POST 请求调用，从而绕过客户端界面。

因此，后端需要实现 SQL 注入防护。 
如果你使用 [dhtmlxConnector](integrations/php/howtostart-connector.md) 并按照[文档](https://docs.dhtmlx.com/connector__php__basis.html#loadingfromdatabase)配置数据表，值会自动转义。 
否则，应遵循平台推荐的安全 CRUD 实践。[入门指南](integrations/howtostart-guides.md)中展示的实现方式设计上已能安全防御 SQL 注入。

### CSRF 攻击

关于为 Gantt 向后端发送的请求添加自定义授权令牌或头部的信息，请参阅[此文档](guides/server-side.md#zidingyiqingqiutouhecanshu)。

## 内容安全策略

该库包含一个特殊的配置选项，可帮助你的 dhtmlxGantt 应用符合内容安全策略（CSP）标准。 
这能提升安全性，防止多种代码注入攻击。

[了解如何在 dhtmlxGantt 应用中应用 CSP](api/config/csp.md)。

