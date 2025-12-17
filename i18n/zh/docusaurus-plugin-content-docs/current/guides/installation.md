---
title: "如何安装 dhtmlxGantt"
sidebar_label: "安装"
---

如何安装 dhtmlxGantt
====================================

您可以通过包管理器如 [NuGet](https://www.nuget.org/)、[Bower](https://bower.io/) 或 [npm](https://www.npmjs.com/) 将 dhtmlxGantt 添加到您的项目中。

另外，您也可以直接从 CDN 引入所需的 JS 和 CSS 文件。

npm - 评估版与专业版
-----------------------------------

**专业评估版**

您可以下载 [试用版 Gantt 包](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml)，并按照 README 文件中的说明操作。请注意，试用版仅在 30 天内有效。

**专业版**

您可以通过 [Client's Area](https://dhtmlx.com/clients/) 获取 DHTMLX 私有 npm 注册表的访问权限，并生成您的 npm 登录名和密码。详细的安装指南也在该区域提供。请注意，只有在您的专有 Gantt 许可证有效期间，才能访问私有 npm。

npm - 标准免费版
-------------------------

dhtmlxGantt 的标准版可以通过在命令行中运行以下命令，从 [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) 安装:

~~~html
npm install dhtmlx-gantt
~~~

:::note
只有 Gantt 的标准版可在 [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) 获取
:::

NuGet
-------------------------

要通过 [NuGet](https://www.nuget.org/) 添加 dhtmlxGantt，请运行以下命令:

~~~html
nuget install DHTMLX.Gantt
~~~

如果您正在使用 Microsoft Visual Studio，可以通过包管理器控制台安装:

~~~html
install-package DHTMLX.Gantt
~~~

Bower
-------------------------

您可以通过 [Bower](https://bower.io/) 安装 dhtmlxGantt，执行以下命令:

~~~html
bower install gantt
~~~

CDN
-----

通过 CDN 引入 dhtmlxGantt，需直接链接 **dhtmlxgantt.js** 和 **dhtmlxgantt.css** 文件:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

如需根据 dhtmlxGantt 版本获取完整的 CDN 链接列表，请参阅 [单独的文章](guides/cdn-links-list.md)。

下载软件包
---------------------

### GPL 版本

您可以从 [这里](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) 下载 dhtmlxGantt 的 GPL 版本。

### PRO 版本

如果您拥有 PRO 版许可证，请从 [Client Area](https://dhtmlx.com/clients/) 下载 PRO 软件包。

下载完成后，将软件包解压到项目中的某个文件夹。然后在页面中引入 **dhtmlxgantt.js** 和 **dhtmlxgantt.css** 文件，确保路径设置正确:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~

将 PRO 版本添加到项目中
---------------------------------

### **安装 Pro 版本**

:::note
如果您之前安装过试用版，建议在安装 Pro 版本前先[卸载它](#uninstalltrialversion)。
:::

公开渠道（CDN、NuGet、Bower 和 npm）提供的是基于 GPL 协议的 dhtmlxGantt 标准版。

对于专业版和评估版，您可以使用我们的 [私有 npm 注册表](#npmevaluationandproversions)。

如果这些方式不适用，还有两种替代方法:

- 手动将 Pro 版本添加到您的项目中
- 通过 npm 从本地目录安装 Pro 版本

### 从本地文件夹安装软件包 (#installfromlocalfolder)

如果使用 **npm**，可以通过 [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) 或 [`npm link`](https://docs.npmjs.com/cli/link/) 从本地文件夹安装 Pro 包。两种方法的说明如下:

### npm install

1. 将 Gantt 软件包复制到本地目录。
2. 切换到您的项目目录。
3. 执行 `npm install ../gantt-local-package-path`。

### npm link

1. 将 Gantt 软件包复制到本地目录。
2. 在软件包文件夹内运行 `npm link`。
3. 切换到您的项目目录。
4. 执行 `npm link dhtmlx-gantt`。

如需了解 dhtmlxGantt 标准版与 PRO 版的区别，请参阅相关文档 [Standard vs PRO 라이브러리 버전](guides/editions-comparison.md)。

### **卸载试用版** (#uninstalltrialversion)

在安装 Pro 版本前，建议先移除试用包:

~~~js
npm uninstall dhtmlx-gantt
~~~

请确保应用中没有遗留的 *dhtmlxgantt.js* 文件。

在 **Linux 和 MacOS** 上，可以使用以下命令搜索:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

在 **Windows** 上，请在命令提示符下使用以下命令:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

确认已移除后，即可按照上述方式安装 Pro 版本。
