---
title: "PDF 导出模块"
sidebar_label: "PDF 导出模块"
---

# PDF 导出模块

该导出模块支持将数据导出为 PDF、PNG、Excel 和 iCal 格式。可以在任何平台上部署，既可以作为 Node.js 应用运行，也可以通过 Docker 镜像部署。

请注意，该模块不支持 MS Project 和 Primavera 文件的导入/导出。如需处理这些文件，请使用[专用导出模块](guides/msp-export-module.md)或我们的在线服务。

## 安装指南

首先，请根据[官方网站](https://nodejs.org/en/)上的说明下载并安装 Node.js。

您可以在客户端专区的 Downloads 标签下找到导出模块。例如:

![PDF export module download](/img/pdf_export_module_download.png)

下载后，将文件解压到您选择的位置。然后打开命令行，进入导出模块所在文件夹，例如:

~~~
cd C:export_module
~~~

接下来，安装所需的应用模块:

~~~
npm install
~~~

如果您需要[在无图形界面的机器上安装组件](#usingserverwithoutgraphicalinterface)，请参阅下方相关章节。

若要在带有图形界面的服务器上运行导出模块，请使用以下命令启动:

~~~
npm start
~~~

要检查服务是否正常运行，请打开网址:[http://localhost:3200/test](http://localhost:3200/test)。

或者，您也可以访问主页 [http://localhost:3200](http://localhost:3200) 并点击 Test 链接。

## 无图形界面服务器的使用

若要在无图形界面的服务器上运行导出模块，需要额外安装一些组件。在基于 Debian 的发行版上，使用以下命令:

~~~
apt-get install -y xvfb libgtk2.0-0 libgtk-3-0 libgbm-dev 
libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth
~~~

在基于 RPM 的发行版上，运行:

~~~
yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel 
libnotify-devel GConf2 nss libXScrnSaver alsa-lib
~~~

安装完成后，可使用以下命令之一启动模块:

~~~
npm run start:docker
~~~

或

~~~
xvfb-run node index.js
~~~

## 问题解决

### Node.js 版本过旧

该导出模块需要 Node.js 12.03 及以上版本。如果您的版本较旧，请安装更早的 Electron 版本:

~~~
npm install electron@6.1
~~~

### 导出 PDF 无法结束

在 Windows 系统中，如果设置了自定义 DPI 或字体，Electron 存在已知问题。为解决此问题，请安装旧版 Electron:

~~~
npm install electron@6.1
~~~

### Mac M1 上 PDF/PNG 导出不工作

当前使用的 Electron 版本不支持 Darwin-ARM64 构建。作为临时解决方案，请尝试安装 Electron 11:

~~~
npm install electron@11
~~~

基本导出功能应可正常使用，但并未对所有功能进行全面测试。

### PDF 导出失败

可能有多种原因。请仔细检查错误信息。

如果出现如下错误:

* Failed to get crash dump id

* Electron crashed!

通常表示导出模块正在无图形界面的服务器上运行。此时，您需要
[安装 PDF 和 PNG 导出的必要组件](#usingserverwithoutgraphicalinterface)或使用 Docker 镜像。

### 使用 Docker 镜像

使用以下命令创建 Docker 镜像:

~~~
docker build -t dhtmlx/scheduler-gantt-export ./
~~~

使用以下命令启动 Docker 容器:

~~~
docker run -d -p 3200:80 dhtmlx/scheduler-gantt-export
~~~

此处，3200 是 Docker 服务可访问的端口。
