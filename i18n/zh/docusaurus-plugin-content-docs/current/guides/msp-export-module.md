---
title: "用于 MS Project 的导出模块"
sidebar_label: "用于 MS Project 的导出模块"
---

# 用于 MS Project 的导出模块

本导出模块可以导入/导出 MS Project 和 Primavera 文件。它是一个 .NET Core 应用程序，您可以在 dotnet 环境中运行，或在 Docker 镜像中运行。

它不包含 PDF、PNG、Excel 和 iCal 文件的导入/导出功能。如果您需要此类功能，请使用相应的导出模块或我们的在线服务器。

## 安装指南

在运行应用程序之前，您需要安装 [.NET Core 7 环境](https://learn.microsoft.com/en-us/dotnet/core/install/)。
准备就绪后，您可以在客户端区域的 Downloads 选项卡中下载 MSP 导出模块。请看下图：

![MS export module download](/img/msp_export_module_download.png)

有两种运行源代码的方式：

1. 通过 Visual Studio 运行（仅 Windows）

对于此方法，您需要 Visual Studio 2022，因为较早版本不支持 .NET Core 7。
打开应用程序时，您需要在右侧面板中对解决方案单击右键，然后点击 Restore NuGet packages 按钮。
之后即可运行 http 或 https 版本。

2. 使用命令行运行

此方法在 Windows 和 Linux 上的工作方式相同。您需要导航到应用程序的根文件夹，并运行以下命令来安装包：

~~~
dotnet restore
~~~

之后，您需要导航到 **GanttToMSProject** 文件夹并运行以下命令以运行应用程序：

~~~
dotnet run
~~~

您可以运行以下命令来发布应用程序：

~~~
dotnet publish -c Release -o published
~~~

## 测试导出模块

有两种方法可以测试导出模块的工作方式。

1. 使用测试页面：

- 打开以下 URL: [https://export.dhtmlx.com/test](https://export.dhtmlx.com/test)
- 在命令行输出中找到导出模块的 URL。例如：

~~~
Now listening on: http://localhost:5128
~~~

- 点击带有 URL 的第一个下拉菜单并选择 **custom**。
- 粘贴导出模块的 URL。

现在即可使用按钮导出数据。

2. 使用片段：

- 打开以下 URL: [https://snippet.dhtmlx.com/kf16k0if](https://snippet.dhtmlx.com/kf16k0if)

- 在命令行输出中找到导出模块的 URL。例如：

~~~
Now listening on: http://localhost:5128
~~~

- 将 URL 添加到导出函数的 server 参数中，例如：

~~~
gantt.exportToMSProject({
    server: "http://localhost:5128",
});
~~~

现在即可使用按钮导出数据。

## 问题解决

### 导出到 PDF/PNG/Excel 无法工作

MSP 导出模块对除了 gantt.exportToMSProject/exportToPrimaveraP6 之外的方法不工作，即如果您调用

~~~
gantt.exportToPDF({server:"gantt-to-msproject-url"});
~~~

此外，请注意，如果在没有参数的情况下调用 `gantt.exportToMSProject()`，它将默认调用我们在 `export.dhtmlx.com` 的在线服务。

### MPP 文件导出

MSP 导出模块和导出服务器使用 MPXJ 库来导入和导出 MSP 与 Primavera 文件。很不幸，目前无法导出 MPP 文件，但您可以 [导入 XML 和 MPP 文件](https://www.mpxj.org/faq/)。

### 处理大文件的导入

如果您想导入大文件，您需要移除请求大小的限制。为此，请打开 `GanttToMSProject/Controllers/MspConversionController.cs` 文件。在该文件中，您需要取消注释 `DisableRequestSizeLimit` 及其后面的行。

保存更改并重新启动服务器后，您应该能够导入大文件。经测试，导入一个 244Mb 的文件需要最多 4Gb RAM。

### 使用 Docker 镜像

要构建一个 Docker 镜像，请运行以下命令：

~~~
docker build -t msp_export_module 
~~~

要为测试目的运行该 Docker 镜像，请使用以下命令：

~~~
docker run -p 65163:80 msp_export_module 
~~~

您可以使用 `Ctrl+C` 快捷键组合停止容器。

如果以“分离（detached）”模式运行 Docker 镜像，它将在后台运行：

~~~
docker run -p 65163:80 msp_export_module 
~~~