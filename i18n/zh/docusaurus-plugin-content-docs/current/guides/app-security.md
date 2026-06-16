---
title: "应用程序安全"
sidebar_label: "应用程序安全"
---

# 应用程序安全

DHTMLX Gantt 是一个客户端 JavaScript 库，旨在将甘特图功能无缝集成到各种网络应用程序中。因此，我们并不限制 Gantt 的功能能力，这些能力本来可以提升应用的安全性，但同时也会降低可用性。因此，您可以根据项目需求自定义大多数 Gantt 功能。

然而，请记住，DHTMLX Gantt 本身并不提供任何防护应用程序免受诸如 SQL 注入、XSS 和 CSRF 攻击等威胁的手段。由此，确保项目安全取决于您通过提供必要的配置设置来实现。在本文中，您将找到关于 HTML 清洗（sanitization）的一些相关信息和建议。

## 基本安全步骤

尽管网络安全是一个复杂的学科，无法用单一步骤来覆盖，我们建议采用一些实用的步骤来覆盖基础并帮助缓解最常见的威胁。

**1. 在应用程序中使用内容安全策略 (CSP)**

只需使用如下较为简单的 CSP 头，即可防止 XSS 代码在应用中执行：

~~~
Content-Security-Policy: script-src 'self'
~~~

您的应用可能需要更复杂的策略，但禁用内联脚本执行将防止大量的 XSS 与 CSRF 攻击。

**2. 在后端对用户输入进行清洗再保存到数据库**

当您插入新记录时，不要按原样保存值：

~~~
db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent])
~~~

您可能希望确保它们符合预期格式，并移除潜在的恶意内容。如果您使用 Node.js，可以使用大量可用的库来实现，例如 [DOMPurify](https://www.npmjs.com/package/dompurify)：

~~~
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

...

db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
    + " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent]
        .map((input) => DOMPurify.sanitize(input)))
~~~

**3. 在呈现数据之前转义 HTML 实体**

如果不希望可显示的值在渲染时执行 HTML 标记，请确保在将数据传入 Gantt 之前对用户输入的 HTML 字符进行转义。以下是使用 [validator](https://www.npmjs.com/package/validator) 库的示例：

~~~
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

**4. 如果使用 SQL 数据库，请避免通过拼接字符串值来创建 SQL 查询。请改用参数化查询、ORM 或查询构建器。**

此项涉及 SQL 注入攻击。通常情况下，您不应在 SQL 查询中使用未转义或未验证的用户输入。如果发现自己在这样做，请考虑改用参数化查询，或使用您所使用的 SQL 提供者支持的转义函数。

**5. 最后但同样重要：咨询网络安全专家并遵循贵公司认可的安全策略**

安全工作永远不可能完全完成，但通过实现这些步骤、遵循贵公司的政策并让安全专家对您的工作进行审查，您将避免在网络上遇到的大多数威胁。

现在，在基础知识得到覆盖后，我们来谈谈与 Gantt 相关的内容。

## 客户端易受攻击的 Gantt 区域

首先，在客户端集成像 Gantt 这样的复杂功能时，需要强调三点：

- DHTMLX Gantt 是一个客户端库，因此从服务器加载的所有数据都会以原始形式进入 Gantt。由于数据集保存在服务器端，应用的主要威胁来自那里。但保护后端超出了 DHTMLX Gantt 的范畴。
- 网络犯罪分子可能通过 DevTools 使用自我 XSS 攻击来诱导最终用户执行一些恶意代码，从而绕过任何安全机制。粘贴到任务文本中的任意代码，其效果与使用 DevTools 相同。
- 如果攻击者获得对 Gantt 实例对象的访问，任何防护措施都将失效。在这种情况下，攻击者可以以任意方式修改 Gantt 的配置并完全控制它。

现在我们进入 Gantt 可能出现安全问题的易发区域清单：

- 由最终用户输入并保存的数据
- 显示在 Gantt 上的数据（文本内容、各种可视元素）
- [自定义 HTML 元素](guides/export.md#exporting-html-elements) 与 Gantt 数据交互的部分
- 对 Gantt 对象的访问

下面对这些潜在问题进行实际考量。

## 对 Gantt 的访问隔离

在讨论保护 Gantt 的可能措施时，首要任务是将 Gantt 与通过其他破解组件或误导性用户（自 XSS 攻击）获得的非法访问隔离开来。

:::note
如果攻击者获得应用的配置文件（包括 Gantt 的配置文件）的访问权限，已采取的对 XSS 攻击的防护措施可能会无效，因此我们不考虑这种情况。
:::

当应用程序完全加载并且攻击者访问到 Gantt 实例对象时，他们可以几乎改动 Gantt 的所有内容并重新定义所有函数。因此，您应该知道如何在项目中对 Gantt 进行隔离。

为此，您需要在一个函数中创建一个独立的 Gantt 实例。这里的目标是使在函数内运行的代码在函数外不可访问，并将 Gantt 实例安全地放在该变量中。

~~~js
function addGantt(){
  const gantt = Gantt.getGanttInstance();
}
addGantt()
~~~

您也可以为 Gantt 实例使用不同的名称，以避免与 gantt 对象混淆：

~~~js
function addGantt(){
  const protectedGantt = Gantt.getGanttInstance();
}
addGantt()
~~~

在确保 Gantt 受到防护避免被未授权访问之后，您应关注在 Gantt 图中输入与显示数据。

## 在 Gantt 中输入数据

这是一个敏感点，网络犯罪分子可能利用它来破坏应用中的 Gantt 安全性。

数据输入区域被视为 XSS 攻击的主要目标。在我们的 Gantt 组件中，可以通过以下方式修改数据：

- lightbox
- 内联编辑器
- 带自定义元素的模态框
- 第三方库
- 资源加载时间线中的资源分配
- 其他层（若其中具有可输入数据的自定义元素）
- 任何使用 Gantt API 且需要数据输入的自定义解决方案（如工具栏或自定义编辑任务的表单）

任务对象具有 [许多不同的参数](guides/task-properties.md)，根据启用的功能使用。可编辑的参数越多，输入数据时需要清洗的参数就越多。

### 以示例说明

我们准备了一个示例，演示在使用 DHTMLX Gantt 时通过 HTML 清洗来增强对 XSS 攻击的保护的各个步骤。

**相关示例**：[示例以防止 XSS 攻击（安全性，CSP）](https://snippet.dhtmlx.com/cdy9p0yl)

在示例中，您可以编辑任务名称、修改日期与持续时间、修改资源分配，并添加文本注释。只能通过 lightbox 和内联编辑器改变开始日期与持续时间。在内联编辑器中，日期和数字类型是显式指定的。在 lightbox 中，您只能指定持续时间，日期必须从下拉列表中选择。

在这两种情况下，无法向这些 UI 元素插入包含恶意代码的文本。如果您尝试通过 DOM 元素检查器更改元素类型，您将获得日期或持续时间的无效值。这将导致错误，并且在页面重新加载之前，Gantt 无法继续工作。同时，数据不会发送到服务器，因为不会重新绘制。

不过，我们在任务名称中使用的是字符串值类型，这对 XSS 攻击来说是一个薄弱点。因此，您需要对输入的值进行清洗。在我们的示例中，您只能看到 XSS 攻击的一种变体以及一种防止它的方法。

![](/img/preventing_xss_attack.png)

在实际项目中，您需要添加所有可能的数据清洗选项。在我们的示例中，我们简单地将 "\<" 与 "\>" 符号替换为相应的 HTML 实体 - **`&lt;`** 与 **`&gt;`**。因此，任务文本中就不会显示 HTML 元素。

上述符号替换在 **sanitizeText()** 函数中实现，如下所示：

~~~js
function sanitizeText(text){
    // 取消注释以测试 XSS
    // return text

    // 通过禁用 HTML 元素来防止 XSS
    return text.split("<").join("&lt;").split(">").join("&gt;");
}
~~~

该函数在事件处理程序中被调用：在 lightbox 的 **onLightboxSave** 和内联编辑器的 **onBeforeSave** 中。

在我们的示例中，您还可以使用自定义内联编辑器或自定义 lightbox 部分为任务添加文本注释。在两种情况下，清洗可以在这些自定义对象的函数中实现（在渲染值和从 DOM 元素获取更改之前）：

~~~js
// 对于一个内联编辑器:
set_value: function(value, id, column, node){
    node.firstChild.value = sanitizeText(value || "");
},
get_value: function(id, column, node){
    return sanitizeText(node.firstChild.value);
},

// 对于 lightbox:
set_value: function(node, value, task){
    node.value = sanitizeText(value || "");
},
get_value: function(node, task){
    return sanitizeText(node.value);
},
~~~

但使用 onLightboxSave 和 onBeforeSave 事件处理程序来控制文本备注的处理会更简单： 

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

您也可以在 lightbox 中进行资源分配。由于 Gantt 不仅限于 **number** 类型，仍然可以使用字符串值，这也为 XSS 攻击提供了机会。

资源值写入任务的属性中，因此 **sanitizeResourceValues()** 函数会遍历所有这些值并使用 **sanitizeText()** 对资源分配的值进行清洗：

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

**sanitizeResourceValues()** 在 **onLightboxSave** 事件处理中被调用：

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new) {
    sanitizeResourceValues(task)
    return true;
});
~~~

*如果在您的 Gantt 配置中使用其他字符串参数，它们也应进行清洗。*

在我们的示例中，如果您尝试将不需要的内容插入资源时间线中的资源分配中，只有数值会被接受。若使用其他值类型，则更改不会被保存。

### 通过第三方工具输入数据

我们的 Gantt 组件提供了大量自定义选项，其中包括借助第三方表单、工具和库来编辑任务的能力。在这种情况下，Gantt API 用于处理任务。在此类场景中，给出关于数据清洗的通用建议较困难，因为一切都取决于自定义实现的方式。

在我们的示例中，有一个用于编辑任务名称的自定义表单。该表单还包含用于转义文本的 **sanitizeText()** 函数：

~~~js
document.body.querySelector("[name='save']").onclick = function(){
    const newTaskName = document.body.querySelector("[name='text']").value;
    task.text = sanitizeText(newTaskName);
    protectedGantt.updateTask(task.id);
}
~~~

这些几乎涵盖了所有数据输入的类别。如果在将数据输入到 Gantt 时进行了清洗，那么数据就像经过过滤一样。因此 XSS 攻击在 Gantt 图中将无效，且当然无法到达服务器。

## 在 Gantt 中显示数据

接下来需要提及的易受攻击区域是在 Gantt 图中显示数据。尽管对数据输入时的清洗更有效，但对显示数据进行清洗仍有助于阻止或中断 XSS 攻击链。例如，如果向服务器提交数据但无法访问 Gantt，XSS 攻击也会在 Gantt 上被中断。

最安全的做法是对所有显示数据的 Gantt 区域进行清洗。这假设在每个网格列的配置中使用模板（参见 guides/specifying-columns.md#datamappingandtemplates）。使用 [所有可能的模板](api/overview/templates-overview.md) 将有助于防止显示包含潜在 XSS 攻击的内容。

不过，对于在 Gantt 图中显示数据的潜在问题，有一种更简单的解决方案。由于数据可以通过用户输入或服务器上传到 Gantt，我们可以限制这两种数据流。这样就没有机会影响 Gantt 的内容并在数据中嵌入恶意代码。

可以在从服务器加载任务时保护任务属性。可以在 **onTaskLoading** 事件处理程序中完成：

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

还有其他方式将数据加载到 Gantt 图中。例如，任务对象可能从服务器单独到来并被某些函数处理。之后，将新任务添加到 Gantt 场景中，或更新现有任务。在这种情况下，您需要在该函数内部对任务进行清洗，然后再将数据加载到 Gantt。

可能是这样的：

~~~js
let newTask = await loadFromServer(23);
sanitizeTaskProperties(newTask);
gantt.addTask(newTask);
~~~

如果网络犯罪分子诱使用户在给定的网页浏览器中使用元素检查器并将恶意代码插入 Gantt 的 DOM 元素，那么您无法避免这种情况。但同时，所有应用的更改在下次重新渲染 Gantt 时将丢失，也不会保存到服务器。

## 服务器端的问题

请注意，客户端验证很容易被破坏或完全绕过，因此不能作为安全手段来依赖。它的目的是在用户输入错误时给出即时反馈，而无需等待服务器响应，而最终的验证应在服务器端完成。

后端必须对传入的数据、用户访问规则等进行正确的验证/转义/清理。

### SQL 注入

dhtmlxGantt 是一个 100% 客户端组件，因此 SQL 注入必须由后端开发人员来防护。

有两点需要考虑：

- lightbox 没有任何默认验证，如果不处理，可能允许用户在可编辑输入中输入任意值
- 你的后端 API 可能被手动通过 PUT/POST 请求调用，包含危险值，从而绕过客户端 UI

因此，您需要在后端实现某种 SQL 注入的转义。如果您使用 [dhtmlxConnector](integrations/php/howtostart-connector.md) 并按照相关文档中的表配置示例进行设置，所有值将自动转义。否则，您需要使用符合所用平台的安全 CRUD 实现。请参阅 [howtostart 指南](integrations/howtostart-guides.md) 中的实现，以确保在 SQL 注入方面是安全的。

### CSRF 攻击

请查看 [本文章](guides/server-side.md#custom-request-headers-and-parameters)，了解如何为 Gantt 向后端发送的请求添加自定义授权令牌的请求头和参数。

## 内容安全策略

该库提供了一个特殊配置，允许您调整使用 dhtmlxGantt 创建的应用程序代码以符合 CSP（Content Security Policy，内容安全策略）标准。它有助于防止各种代码注入攻击并提高应用的安全性。

[了解将 CSP 标准应用到 dhtmlxGantt 应用程序中的更多信息](api/config/csp.md)。

## 框架包装 XSS 保护

从 v10.0 起，React、Vue 和 Angular 包装将处理由用户提供的模板函数返回的字符串值，以确保来自模板的 HTML 默认为安全——即使它嵌套了未清洗的任务/事件数据。覆盖范围包括：

- 通过 `templates` prop 传递的函数
- `config.columns[].template` 函数
- `config.scales[].format` 函数

行为由 `htmlTemplatePolicy` 组件属性控制：

| 策略 | 行为 |
| --- | --- |
| `"basic-sanitize"`（默认） | 对返回的 HTML 进行白名单清洗：保留安全的格式（`b`、`i`、`span`、`div`、`mark` 等）、`class`、有限的一组内联样式、`data-*` 属性、`contenteditable` 以及具有安全 `src` 的 `img`。 `<script>`、内联事件处理程序（`on*`）以及危险 URL（`javascript:`、`vbscript:`、非图片的 `data:`）将被移除。 |
| `"escape"` | 将字符串作为文本渲染——HTML 标签将显示为可见字符。（内置模板如网格树图标仍然会被清洗，因此网格会正确呈现。） |
| `"unsafe-html"` | 原样渲染字符串，不进行处理——v10 之前的行为，相当于 `dangerouslySetInnerHTML`。仅在输出完全受信任时使用。 |
| `{ mode: "sanitize", sanitize }` | 将工作委托给自定义清洗器，例如 [DOMPurify](https://github.com/cure53/DOMPurify)，让您在不将其作为包装依赖项的情况下清洗丰富的 HTML。 |

`"basic-sanitize"` 是一个小型、无依赖的清洗器，适用于简单的格式、标签、颜色和图片——并非完整的通用清洗器。对于任意丰富的 HTML，优先返回模板中的框架节点（详见下文）或接入专用的清洗器。

### 返回框架节点（推荐用于丰富标记）

渲染自定义标记的最安全方式，是从模板返回一个框架元素，而不是 HTML 字符串。React/Vue/Angular 默认为对插值值进行转义，因此不涉及 HTML 清洗：

~~~tsx
<ReactGantt
  templates={{
    task_text: (start, end, task) => <span className="task-label"><b>{task.text}</b></span>
  }}
/>
~~~

### 针对模板的原始 HTML

要为某个特定模板渲染原始字符串，而不考虑活动策略，请使用框架包装包中导出的 `allowRawHTML` 助手。随后您需要自行对用户提供的数据进行清洗——请使用导出的 `escapeHTML` 实用程序：

~~~js
import { allowRawHTML, escapeHTML } from "@dhx/react-gantt";

const templates = {
  task_text: allowRawHTML((start, end, task) => `<b>${escapeHTML(task.text)}</b>`)
};
~~~

### 选择全局策略

~~~jsx
// 在任何地方保留原始 HTML（v10 之前的行为）
<ReactGantt htmlTemplatePolicy="unsafe-html" />

// 为丰富的 HTML 插件 DOMPurify
import DOMPurify from "dompurify";
<ReactGantt htmlTemplatePolicy={{ mode: "sanitize", sanitize: (html) => DOMPurify.sanitize(html) }} />
~~~

请参阅迁移说明以获取更多详情。[Migration notes](migration.md#91---92)