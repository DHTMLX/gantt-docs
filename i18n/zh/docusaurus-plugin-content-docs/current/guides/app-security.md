---
title: "应用程序安全"
sidebar_label: "应用程序安全"
---

# 应用程序安全

DHTMLX Gantt 是一个客户端 JavaScript 库，旨在将甘特功能无缝集成到各种网络应用中。因此，我们不会限制 Gantt 的功能能力，这既可以提升应用的安全性，又可能限制可用性。因此，你可以根据项目需求自定义大多数 Gantt 功能。

然而，请记住，DHTMLX Gantt 自身并不提供任何用于保护应用免受诸如 SQL 注入、XSS 和 CSRF 攻击等威胁的手段。因此，确保你项目的安全性取决于你通过提供必要的配置设置来实现。本文中你将找到有关 HTML 清洗的相关信息和建议。

## 基本安全步骤

网络安全是一个复杂的领域，不能仅凭单一步骤来覆盖，我们建议遵循一些实用步骤，覆盖基础内容并有助于减轻最常见的威胁。

**1. 在你的应用中使用内容安全策略（CSP）**

像下面这样简单地添加 CSP 头就能够防止 XSS 代码在你的应用中执行：

~~~
Content-Security-Policy: script-src 'self'
~~~

你的应用可能需要更复杂的策略，但禁用内联脚本执行将防止大量的 XSS 和 CSRF 攻击。

**2. 在保存到数据库之前，在后端对用户输入进行清洗（sanitization）**

当你插入一条新记录时，不要按原样保存值：

~~~
db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent])
~~~

你可能希望确保它们符合预期格式并移除潜在的恶意内容。
如果你使用 Node.js，这可以通过众多可用的库来完成，例如 [DOMPurify](https://www.npmjs.com/package/dompurify)：

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

**3. 在渲染数据之前对 HTML 实体进行转义**

如果你不想让可显示的值在渲染过程中包含将被执行的 HTML 标记，请确保在将数据输入 Gantt 之前对用户可能输入的 HTML 字符进行转义。以下是使用 [validator] 库的示例：

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

**4. 如果你使用 SQL 数据库，避免通过串联字符串值来创建 SQL 查询。请改用参数化查询、ORM 或查询构建器。**

此项涉及 SQL 注入攻击类型。一般而言，你不应在 SQL 查询中使用未经过转义或未验证的用户输入。如果你发现自己在这样做，考虑使用参数化查询重写代码，或使用你所用 SQL 提供商支持的转义函数。

如果你使用 [dhtmlxConnector](integrations/php/howtostart-connector.md) 并按照相关文档中所示为表配置，所有值将自动转义。否则，你将不得不按照你使用的平台的最佳实践，使用安全的 CRUD 实现。入门指南中展示的实现应在 SQL 注入方面是安全的。

**5. 最后但同样重要：咨询网络安全专家并遵循贵公司认可的安全策略**

安全工作从来不是完全完成，但通过执行这些步骤、遵循贵公司的政策并让安全专家对你的工作进行审查，你将避免大多数可能在网络上找到你的威胁。

现在，基础知识已覆盖，我们来看看与 Gantt 相关的内容。

## 客户端的易受攻击的 Gantt 区域

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

## 将对 Gantt 的访问隔离开

在讨论保护 Gantt 的可能措施时，首要任务是将 Gantt 与被破解的组件或被误导的用户（自 XSS 攻击）隔离，防止非法访问。

:::note
如果攻击者获得了应用配置文件（包括 Gantt 配置文件）的访问权限，
任何已采取的 XSS 防护措施都可能失效，因此本场景不在本文讨论范围内。
:::

当应用完全加载并且攻击者能够访问 Gantt 实例对象时，他们几乎可以改变 Gantt 的一切并重新定义所有函数。因此，你需要知道如何在你的项目中对 Gantt 进行隔离。

为此，你需要在一个函数中创建一个独立的 Gantt 实例。这里的目标是让在该函数内运行的代码对外不可访问。

此外，默认情况下 Gantt 会在 *gantt* 对象中创建一个新的实例。重要的是在函数内部使用 *const* 或 *let* 关键字添加一个新变量，以使其在函数外不可访问，并将 Gantt 实例安全地放在该变量中。

~~~js
function addGantt(){
  const gantt = Gantt.getGanttInstance();
}
addGantt()
~~~

你也可以为 Gantt 实例使用不同的名称，以避免与 gantt 对象的混淆：

~~~js
function addGantt(){
  const protectedGantt = Gantt.getGanttInstance();
}
addGantt()
~~~

在确保 Gantt 受到保护，防止未经授权的访问之后，你应关注在 Gantt 图中输入和显示数据。

## 在 Gantt 中输入数据

这是一个敏感区域，网络犯罪分子可能利用它来削弱你应用中的 Gantt 安全性。

数据输入区域被视为 XSS 攻击的主要目标。在我们的 Gantt 组件中，可以通过以下方式更改数据：

- lightbox  
- 行内编辑器  
- 带有自定义元素的模态框  
- 第三方库  
- 资源负载时间线中的资源分配  
- 带有自定义输入元素的附加层  
- 任何使用 Gantt API 允许数据输入的自定义方案（如工具栏或自定义任务编辑表单）

任务对象有 [许多属性](guides/task-properties.md)，具体使用哪些取决于启用的功能。 
可编辑属性越多，输入清洗就越重要。

### 以示例说明

我们准备了一个示例，演示在使用 DHTMLX Gantt 时，通过 HTML 清洗来增强对 XSS 攻击的防护的各种步骤。

**相关示例**：[Example to prevent XSS attacks (security, CSP)](https://snippet.dhtmlx.com/cdy9p0yl)


在本示例中，您可以修改任务名称、调整日期和工期、变更资源分配以及添加文本备注。 
开始日期和工期的更改仅限于 lightbox 和行内编辑器，且两者都明确指定了 **date** 和 **number** 类型。 
在 lightbox 中，只能直接设置工期，日期须从下拉框选择。

这两种界面都不允许插入包含恶意代码的文本。 
如果有人试图通过 DOM 检查器更改元素类型，则会生成无效的日期或工期值。 
这会触发错误，导致 Gantt 无法继续工作，直到页面重新加载。同时，由于图表不会重绘，也不会将数据发送到服务器。

然而，我们对任务名称使用的是 **string** 值类型，这可能成为 XSS 攻击的薄弱点。因此，你需要对输入的值进行清洗。在我们的示例中，你可以看到一种 XSS 攻击的变体以及一种防止它的方法。

![preventing_xss_attack](/img/preventing_xss_attack.png)

在实际项目中，你需要添加所有可能的数据清洗选项。在我们的实现中，我们只是将 "\<" 和 "\>" 符号替换为相应的 HTML 实体 - **`&lt;`** 和 **`&gt;`**。因此，我们排除了在任务文本中显示 HTML 元素的可能性。

上述符号替换在 **sanitizeText()** 函数中实现，如下：

~~~js
function sanitizeText(text){
    // uncomment to test XSS
    // return text

    // prevent XSS by disabling HTML elements
    return text.split("<").join("&lt;").split(">").join("&gt;");
}
~~~

该函数在事件处理程序中被调用：在 lightbox 的 **onLightboxSave** 中，以及在内联编辑器的 **onBeforeSave** 中。

在我们的示例中，你还可以通过自定义内联编辑器或自定义灯箱部分向任务添加文本注释。在这两种情况下，清洗可以在这些自定义对象的函数中实现（在值渲染前、从 DOM 元素获得更改前）：

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

但通过 onLightboxSave 和 onBeforeSave 事件处理程序来控制文本注释的工作更为简单：

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

你也可以在灯箱中进行资源分配。由于 Gantt 并不限于仅允许数字类型的输入，因此也可以使用字符串值，这也带来了 XSS 攻击的可能性。

资源值写入任务的属性中，因此 sanitizeResourceValues() 函数遍历所有这些值并使用 sanitizeText() 对资源分配值进行清洗：

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

sanitizeResourceValues() 会在 onLightboxSave 事件处理程序中被调用：

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new) {
    sanitizeResourceValues(task)
    return true;
});
~~~

*如果你在 Gantt 配置中使用任何其他字符串参数，它们也应进行清洗。*

在我们的示例中，如果你尝试在资源时间线中的资源分配中插入不需要的内容，将只接受数字值。若使用其他值类型，更改将不会被保存。

### 通过第三方工具输入数据

我们的 Gantt 组件提供了多种自定义机会，包括通过第三方表单、工具和库编辑任务的能力。在这种情况下，Gantt API 被用于处理任务。在这种情形下，很难给出关于数据清洗的通用建议，因为一切取决于自定义实现的方式。

在我们的示例中，有一个用于编辑任务名称的自定义表单。该表单还包含用于转义文本的 sanitizeText() 函数：

~~~js
document.body.querySelector("[name='save']").onclick = function(){
    const newTaskName = document.body.querySelector("[name='text']").value;
    task.text = sanitizeText(newTaskName);
    protectedGantt.updateTask(task.id);
}
~~~

这些几乎涵盖了所有数据输入的类别。如果在数据输入到 Gantt 时进行清洗，数据就会被一定程度地过滤。因此，XSS 攻击在 Gantt 图中将无效，且肯定无法到达服务器。

## 在 Gantt 中显示数据

接下来需要提及的易受攻击区域是 Gantt 图中数据的显示。虽然不如数据输入高效，清洗显示数据仍有助于阻止或中断 XSS 攻击链。

例如，如果携带数据的服务器已被攻击，但仍然无法访问 Gantt，则 XSS 攻击将在 Gantt 上被中断。

最安全的做法是对所有显示数据的 Gantt 区域进行清洗。这需要在每个网格列的配置中使用模板。对 [所有可能的模板](api/overview/templates-overview.md) 的使用将有助于防止显示可能导致 XSS 攻击的内容。

然而，对于在 Gantt 图中显示数据的潜在问题，也有一个更简单的解决方案。由于数据可以通过用户输入或从服务器上传到 Gantt 图，我们可以限制这两种数据流。这样就没有机会影响 Gantt 内容并将恶意代码嵌入数据。

在从服务器加载数据时，可以在服务器加载时对任务的属性进行保护。这可以在 onTaskLoading 事件处理程序中完成：

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

还有其他将数据加载到 Gantt 图中的方式。例如，任务对象可能从服务器单独来，并由某个函数进行处理。之后，将新任务添加到 Gantt 图或更新现有任务。在这种情况下，在将数据加载到 Gantt 之前，你需要在该函数内部对任务进行清洗。

看起来可能像这样：

~~~js
let newTask = await loadFromServer(23);
sanitizeTaskProperties(newTask);
gantt.addTask(newTask);
~~~

如果网络犯罪分子诱使用户在某个浏览器中使用元素检查器并将恶意代码插入 Gantt DOM 元素，你无法避免。但同时，所有应用的更改在下一次重新渲染 Gantt 时会丢失，并且不会保存到服务器。

## 服务器端问题

请注意，客户端验证很容易被破坏或完全绕过，因此不能被视为安全手段。它的目的是在输入错误时给用户即时反馈，而无需等待服务器响应，而最终验证应在服务器端完成。后端必须正确验证/转义/清洗传入数据、用户访问规则等。

### SQL 注入

dhtmlxGantt 是一个 100% 客户端组件，因此 SQL 注入必须由开发人员在后端防止。

有两点需要考虑：

- lightbox 没有任何默认验证，如果不处理，会允许用户在可编辑输入中输入任何值
- 你的后端 API 可能被直接通过 PUT/POST 请求调用，其中包含危险值，绕过客户端 UI

因此，你需要在后端实现某种 SQL 注入的转义。如果你使用 [dhtmlxConnector] 并按照相关文档中所示为表配置，所有值将自动转义。否则，你将不得不按照你所使用的平台的最佳实践，使用安全的 CRUD 实现。入门指南中展示的实现应在 SQL 注入方面是安全的。

### CSRF 攻击

请查看[这篇文章](guides/server-side.md#custom-request-headers-and-parameters)，了解为 Gantt 向后端发送的请求添加自定义授权标头的做法。

## 内容安全策略

该库提供了一个特殊配置，允许你调整使用 dhtmlxGantt 创建的应用程序代码，以符合 CSP（内容安全策略）标准。它有助于防止各种代码注入攻击并提高应用的安全性。

[了解将 CSP 标准应用于 dhtmlxGantt 应用的更多信息](api/config/csp.md).