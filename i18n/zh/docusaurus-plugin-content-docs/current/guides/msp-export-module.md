---
title: "用于 MS Project 和 Primavera P6 的导出模块"
sidebar_label: "MS Project/P6 模块"
---

# 用于 MS Project 和 Primavera P6 的导出模块

本导出模块可以导入/导出 MS Project 和 Primavera 文件。它是一个 .NET Core 应用程序，您可以在 dotnet 环境中运行，或在 Docker 镜像中运行。

它不包含 PDF、PNG、Excel 和 iCal 文件的导入/导出功能。如果您需要此类功能，请使用[相应的导出模块](guides/pdf-export-module.md)或我们的在线服务器。

## 安装指南

在运行应用程序之前，您需要安装 [.NET Core 7 环境](https://learn.microsoft.com/en-us/dotnet/core/install/)。
准备就绪后，您可以在客户端区域的 Downloads 选项卡中下载 MS Project 导出模块。请看下图：

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

MS Project 导出模块仅适用于 gantt.exportToMSProject()、gantt.importFromMSProject()、gantt.exportToPrimaveraP6() 和 gantt.importFromPrimaveraP6() 方法。它不能导出为 PDF、PNG、Excel 或 iCal，即如果您调用

~~~
gantt.exportToPDF({server:"gantt-to-msproject-url"});
~~~

此外，请注意，如果在没有参数的情况下调用 `gantt.exportToMSProject()`，它将默认调用我们在 `export.dhtmlx.com` 的在线服务。请参阅[两个模块如何协同工作](guides/export-modules.md#service-topology)。

### MPP 文件导出

MS Project 导出模块和导出服务器使用 MPXJ 库来导入和导出 MS Project 与 Primavera 文件。很不幸，目前无法导出 MPP 文件，但您可以 [导入 XML 和 MPP 文件](https://www.mpxj.org/faq/)。

尽管不支持直接导出为 MPP，您仍然可以将在 Gantt 中所做的更改带回 MS Project。典型的往返工作流程如下：

1. 用户在 MS Project 中创建或编辑项目，并保存文件（为 MPP 或 XML 格式）。
2. 将该文件[导入到 Gantt](guides/export-msproject.md#import-from-ms-project)，在其中查看或修改数据。
3. 将 Gantt 数据[导出为 XML Project 文件](guides/export-msproject.md#export-to-ms-project)。
4. 将生成的 XML 文件导入回 MS Project 中的原始文件：
    - 如果在 Gantt 中没有删除任何任务，请使用 **Merge**（合并）选项导入 XML 文件（见下方截图）。现有任务将被更新，新任务将被添加。

    ![MS Project import wizard - Merge option](/img/msp_import_merge.png)

    - 如果在 Gantt 中删除了某些任务，它们在导入时不会被自动删除，因为 MS Project 在合并时只会更新和添加任务。在这种情况下，请先在 MS Project 中手动选择并删除相应的任务，然后使用 **Append**（追加）或 **Merge** 选项导入 XML 文件（下方显示的是 **Append** 选项）。

    ![MS Project import wizard - Append option](/img/msp_import_append.png)

默认情况下，Gantt 仅导入和导出默认的任务/项目属性集。若要在往返过程中携带其他属性，导入请参阅[获取任务属性](guides/export-msproject.md#getting-tasks-properties)，导出请参阅[导出设置](guides/export-msproject.md#export-settings)中描述的 `tasks` 对象。

### 处理大文件的导入 {#import-of-large-files}

如果您想导入大文件，您需要移除请求大小的限制。为此，请打开 `GanttToMSProject/Controllers/MspConversionController.cs` 文件。在该文件中，您需要取消注释 `DisableRequestSizeLimit` 及其后面的行。

保存更改并重新启动服务器后，您应该能够导入大文件。经测试，导入一个 244Mb 的文件需要最多 4Gb RAM，导入一个 400Mb 的文件需要约 4.7Gb RAM。

### 使用 Docker 镜像

要构建一个 Docker 镜像，请运行以下命令：

~~~
docker build -t msp_export_module .
~~~

要为测试目的运行该 Docker 镜像，请使用以下命令：

~~~
docker run -p 8080:8080 msp_export_module 
~~~

您可以使用 `Ctrl+C` 快捷键组合停止容器。

如果以“分离（detached）”模式运行 Docker 镜像，它将在后台运行：

~~~
docker run -d -p 8080:8080 msp_export_module 
~~~