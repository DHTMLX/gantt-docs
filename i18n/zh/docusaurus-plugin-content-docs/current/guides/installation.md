--- 
title: "如何安装 dhtmlxGantt"
sidebar_label: "安装"
---

# 如何安装 dhtmlxGantt

你可以使用 [npm](https://www.npmjs.com/)、[NuGet](https://www.nuget.org/) 或 [Bower](https://bower.io/) 包管理器将 dhtmlxGantt 包安装到你的项目中。

也可以通过 CDN 引入所需的 JS/CSS 文件。


## npm - 评估版和 PRO 版本 {#npmevaluationandproversions}

**Professional Evaluation 版本**

下载 [trial Gantt package](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) 并按照 README 文件中的步骤进行。  
请注意，试用版 Gantt 仅提供 30 天。

**Professional 版本**

你可以在 [Client's Area](https://dhtmlx.com/clients/) 直接通过为 npm 生成的登录名和密码来访问 DHTMLX 私有 npm。那里也有详细的安装指南。请注意，私有 npm 的访问仅在你的专有 Gantt 许可证处于激活状态时才可用。

## npm - 标准免费版本

你可以从 [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt) 安装 dhtmlxGantt 的标准版本，执行以下命令：

~~~html
npm install dhtmlx-gantt
~~~

:::note
Only the Standard version of the Gantt is available at [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt)
:::

## NuGet

要通过 [NuGet](https://www.nuget.org/) 安装 dhtmlxGantt，请执行以下命令：

~~~html
nuget install DHTMLX.Gantt
~~~

如果你使用的是 Microsoft Visual Studio，请从 Package Manager Console 运行以下命令：

~~~html
install-package DHTMLX.Gantt
~~~

## Bower

要通过 [Bower](https://bower.io/) 安装 dhtmlxGantt，请执行以下命令：

~~~html
bower install gantt
~~~

## CDN

要从 CDN 包含 JS/CSS 文件，你应设置指向 **dhtmlxgantt.js** 和 **dhtmlxgantt.css** 的直接链接：

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

你可以在一个[单独的文章](guides/cdn-links-list.md)中找到可包含的 CDN 链接完整列表，具体取决于 dhtmlxGantt 的版本。

## 下载包

### GPL 版本

[下载 dhtmlxGantt GPL 版本的软件包](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml)。 


### PRO 版本

如果你拥有组件的 PRO 版本，需要前往 [Client Area](https://dhtmlx.com/clients/) 并在那里下载 PRO 包。

无论版本如何，请将下载的包解压到你项目中的某个文件夹。然后在页面中包含 **dhtmlxgantt.js** 和 **dhtmlxgantt.css** 文件。确保为这些文件设置正确的相对路径：

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~


## 将 PRO 版加入到项目

### **安装 Pro 版本**

:::note
在安装 Gantt 的 Pro 版本之前，如果你已经安装了试用版本包，请先 [卸载试用版本包](#uninstall-trial-version)（若你已安装过）。
:::

所有公开来源（CDN、NuGet、Bower 和 npm）都包含组件的 Standard 版本，该版本在 GPL 许可下分发。

我们还提供 [私有 npm 注册表](#npmevaluationandproversions)，可从中安装 Professional 和 Evaluation 版本的组件。

如果上述方法在某些情况下不可用，也有两种解决方案：
 
- 你可以手动将 Pro 版本添加到你的项目中
- 你也可以通过本地目录从 npm 将 Pro 版本安装到你的项目中

### 从本地文件夹安装包 {#installfromlocalfolder}

若使用 **npm**，可以通过本地文件夹安装 Pro 包，使用 [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) 或 [`npm link`](https://docs.npmjs.com/cli/link/)。
两种变体都有逐步说明：

### npm install

1. 将 Gantt 包复制到本地某个目录。
2. 进入你的项目目录。 
3. 运行 `npm install ../gantt-local-package-path`。

### npm link

1. 将 Gantt 包复制到本地某个目录。
2. 在包目录中运行 `npm link`。
3. 进入你的项目目录。
4. 运行 `npm link dhtmlx-gantt`。

要查看 dhtmlxGantt 库的 Standard 与 PRO 版本之间的差异，请参阅相关文档 [Standard vs PRO Library Versions](guides/editions-comparison.md)。

### **卸载试用版本** 

安装 Pro 版本的正确方法是卸载试用版本包：

~~~js
npm uninstall dhtmlx-gantt
~~~

然后你需要彻底检查你的应用程序中是否没有任何 *dhtmlxgantt.js* 文件。

**在 Linux 和 macOS 上**，你可以在终端使用以下命令：

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

**在 Windows 上**，你可以在命令行使用以下命令：

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

之后你即可按照上述方法安装 Gantt 图表的 Pro 版本。