---
title: "MS Project 导出模块"
sidebar_label: "MS Project 导出模块"
---

# MS Project 导出模块

该导出模块用于导入和导出 MS Project 及 Primavera 文件。它是一个 .NET Core 应用程序，可以在 dotnet 环境下运行，也可以在 docker 镜像中运行。

它不支持 PDF、PNG、Excel 或 iCal 文件的导入/导出。如果需要这些格式，请考虑使用[对应的导出模块](guides/pdf-export-module.md)或我们的在线服务器。

## 安装指南

在运行应用程序之前，请确保已安装[.NET Core 7 环境](https://learn.microsoft.com/en-us/dotnet/core/install/)。完成安装后，您可以在客户区的下载标签下下载 MSP 导出模块。以下是参考截图:

![MS export module download](/img/msp_export_module_download.png)

有两种方式运行源代码:

1. 通过 Visual Studio 运行（仅限 Windows）

此方法需要 Visual Studio 2022，因为早期版本不支持 .NET Core 7。打开应用程序后，右键点击右侧面板中的 Solution，选择 Restore NuGet packages。然后可以运行 `http` 或 `https` 版本。

2. 通过命令行运行

此方法适用于 Windows 和 Linux。进入应用程序的根文件夹，运行以下命令安装依赖包:

~~~
dotnet restore
~~~

接着，进入 "GanttToMSProject" 文件夹，运行以下命令启动应用程序:

~~~
dotnet run
~~~

如需发布应用程序，请使用以下命令:

~~~
dotnet publish -c Release -o published
~~~

## 测试导出模块

有两种方式测试导出模块:

1. 使用测试页面:

- 打开 [https://export.dhtmlx.com/test](https://export.dhtmlx.com/test)
- 在命令行输出中查找导出模块的 URL。例如:

~~~
Now listening on: http://localhost:5128
~~~

- 点击第一个带有 URL 的下拉框，选择 **custom**。
- 粘贴导出模块的 URL。

现在可以通过按钮导出数据。

2. 使用代码片段:

- 打开 [https://snippet.dhtmlx.com/kf16k0if](https://snippet.dhtmlx.com/kf16k0if)

- 在命令行输出中找到导出模块的 URL，例如:

~~~
Now listening on: http://localhost:5128
~~~

- 将该 URL 添加到导出函数的 server 参数中，如下所示:

~~~
gantt.exportToMSProject({
    server: "http://localhost:5128",
});
~~~

现在可以通过按钮正常导出数据。

## 问题解决

### 导出到 PDF/PNG/Excel 不起作用

MSP 导出模块仅支持 `gantt.exportToMSProject` 和 `exportToPrimaveraP6` 方法。以下调用方式无法使用:

~~~
gantt.exportToPDF({server:"gantt-to-msproject-url"});
~~~

此外，如果调用 `gantt.exportToMSProject()` 时未传递任何参数，则默认使用我们的在线服务 `export.dhtmlx.com`。

### MPP 文件的导出

MSP 导出模块和服务器依赖 MPXJ 库来导入和导出 MSP 及 Primavera 文件。目前，不支持导出 MPP 文件，但可以导入 XML 和 MPP 文件。更多详情请见[这里](https://www.mpxj.org/faq/)。

### 导入大文件

如需导入大文件，需移除请求大小限制。打开文件 `GanttToMSProject/Controllers/MspConversionController.cs`，取消注释 `DisableRequestSizeLimit` 属性及其后面的那一行。

保存并重启服务器后，应可导入大文件。测试显示，导入一个 244Mb 的文件可能需要多达 4Gb 的内存。

### 使用 Docker 镜像

构建 docker 镜像，请运行:

~~~
docker build -t msp_export_module 
~~~

测试时，运行 docker 镜像:

~~~
docker run -p 65163:80 msp_export_module 
~~~

可以通过 `Ctrl+C` 停止容器。

以分离模式运行 docker 镜像可使其在后台运行:

~~~
docker run -p 65163:80 msp_export_module 
~~~
