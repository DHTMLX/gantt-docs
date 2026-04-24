---
title: "PDF 导出模块"
sidebar_label: "PDF 导出模块"
---

# PDF 导出模块

本导出模块可以将数据导出为 PDF、PNG、Excel 和 iCal 文件。它可以在任意平台上作为 Node.js 应用程序或作为 Docker 镜像进行安装。

它不包含 MS Project 和 Primavera 文件的导入/导出功能。如果你需要这样的功能，你应该使用 [对应的导出模块](guides/msp-export-module.md) 或我们的在线服务器。

## 安装指南

首先，你需要下载并安装 Node.js。你可以在其官方网站上找到安装说明。

你可以在客户端区域的 Downloads 选项卡中下载导出模块。请查看下图：

![PDF export module download](/img/pdf_export_module_download.png)

下载该文件后，将其解压到任意位置，然后打开命令行并导航到包含导出模块的文件夹。例如：

~~~
cd C:export_module
~~~

然后你需要为应用安装模块：

~~~
npm install
~~~

你可以 [在没有图形界面的计算机上安装组件](#using-server-without-graphical-interface)。

要在具有图形界面的服务器上运行，可以使用以下命令来启动 export module：

~~~
npm start
~~~

要检查服务是否正常运行，请打开网址:[http://localhost:3200/test](http://localhost:3200/test)。

或者，您也可以访问主页 [http://localhost:3200](http://localhost:3200) 并点击 Test 链接。

## 无图形界面的服务器使用

如果你计划在无头服务器上使用导出模块，需要安装额外的组件。以下是在基于 Deb 的发行版上的命令：

~~~
apt-get install -y xvfb libgtk2.0-0 libgtk-3-0 libgbm-dev 
libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth
~~~

以下是在基于 RPM 的发行版上的命令：

~~~
yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel 
libnotify-devel GConf2 nss libXScrnSaver alsa-lib
~~~

然后你需要使用另一个命令来运行它：

~~~
npm run start:docker
~~~

或

~~~
xvfb-run node index.js
~~~

## 解决问题

### 旧版 Node.js

该导出模块兼容 Node 版本 12.03 及更新版本。如果你有较旧的版本，你需要安装较旧的 Electron 版本：

~~~
npm install electron@6.1
~~~

### 导出到 PDF 永远不结束

如果你在 Windows 上使用自定义 DPI 设置或字体，Electron 组件存在一个 bug。要使其工作，需要安装较早的版本：

~~~
npm install electron@6.1
~~~

### Mac M1 上的 PDF/PNG 不工作

当前使用的 Electron 版本没有为 Darwin-ARM64 架构提供构建。作为变通办法，你可以尝试安装 Electron 11。

~~~
npm install electron@11
~~~

基本导出功能应能工作，但我们尚未检查该版本下所有功能是否正常：

### 导出到 PDF 不工作

可能原因有很多。你需要检查错误信息。

如果你收到以下错误之一：

* Failed to get crash dump id

* Electron crashed!

很可能，这意味着导出模块正在无头服务器上工作。你将需要 [安装使用 PDF 和 PNG 导出所需的组件](#using-server-without-graphical-interface)。或者你可以构建一个 Docker 镜像。

### 使用 Docker 镜像

使用以下命令构建 Docker 镜像：

~~~
docker build -t dhtmlx/scheduler-gantt-export ./
~~~

使用下面的命令运行 Docker 镜像：

~~~
docker run -d -p 3200:80 dhtmlx/scheduler-gantt-export
~~~

3200 是 Docker 服务将要监听的端口。