--- 
title: "dhtmlxGantt 与 Python" 
sidebar_label: "Python" 
--- 

# dhtmlxGantt 与 Python

本教程将教你如何在服务器端使用 Django 4 框架和 RESTful API 创建一个基于 Python 的甘特图。

还有一些教程是为与其他平台协同进行服务器端集成而编写的：

- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

:::note
完整源代码可在 [GitHub 上获取](https://github.com/DHTMLX/gantt-howto-django).
:::

## prerequisites

如果你还没有安装 Django，请先安装：

- [适用于 Windows](https://docs.djangoproject.com/en/4.0/howto/windows/)
- [适用于 Linux](https://linuxhint.com/install_django_ubuntu/)

## Step 1. Initializing a project

打开你的项目文件夹并使用以下命令创建一个新的 Django 项目：

~~~ 
django-admin startproject gantt_rest_python
~~~ 

之后，你可以将 **gantt_rest_python** 文件夹中的内容移动到当前文件夹，或进入到该文件夹：

~~~ 
cd gantt_rest_python
~~~ 

要检查基础应用是否正常工作，在项目文件夹中运行以下命令：

~~~ 
python manage.py runserver
~~~ 

现在你可以在浏览器中打开 http://localhost:8000 URL，你应该会看到默认页面：

![start_page](/img/howtostart_django_startpage.png)

## Step 2. Adding Gantt to the page

现在我们可以开始创建一个 Gantt 组件。运行以下命令：

~~~ 
python manage.py startapp gantt
~~~ 

安装 REST 框架：

~~~ 
pip install djangorestframework
pip install djangorestframework-jsonapi
~~~ 

打开 **gantt** 文件夹，在其中创建 **static** 和 **templates** 文件夹。

将 Gantt 包中 *codebase* 文件夹的内容复制到 **static** 文件夹中。将其重命名为 **gantt**，以指定文件所属的组件。

之后，在 **templates/gantt** 文件夹中创建一个 *index.html* 文件并添加以下代码：


~~~html title="gantt/templates/gantt/index.html" 
<html>
    <head>
        {% load static %}
        <script src="{% static "gantt/dhtmlxgantt.js" %}" type="text/javascript">
        </script>
        <link rel="stylesheet" href="{% static "gantt/dhtmlxgantt.css" %}" />
    </head>
    <body>
        <div id="gantt_here" style='width:100%; height:500px;'>
        </div>
        <script>
        gantt.config.date_format = "%Y-%m-%d %H:%i";

        gantt.config.open_tree_initially = true;
        gantt.init("gantt_here");
        </script>
    </body>
</html>
~~~ 

目前，你应该有如下的文件结构：

![folder_structure](/img/howtostart_django_folder.png)

在 **gantt** 文件夹中打开 *views.py* 文件并添加以下代码：


~~~py title="gantt/views.py" 
from django.shortcuts import render

def index(request):
    return render(request, 'gantt/index.html')
~~~ 

现在我们需要添加路由。在 **gantt** 文件夹中创建 *urls.py*，并将以下代码放入其中：


~~~py title="gantt/urls.py" 
from django.urls import include, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
]
urlpatterns = format_suffix_patterns(urlpatterns)
~~~ 

在 **gantt_rest_python** 文件夹打开 *urls.py* 文件。需要更新 `urlpatterns`。更新后的代码应该如下所示：


~~~py title="gantt_rest_python/urls.py" 
from django.urls import include, re_path
from django.contrib import admin

urlpatterns = [
    re_path(r'', include('gantt.urls')),
]
~~~ 

接下来，我们需要在设置中为 **templates** 和 **static** 文件夹定义路径。为此，打开 **gantt_rest_python** 文件夹中的 *settings.py* 并在文件开头添加以下行：


~~~py title="gantt_rest_python/settings.py" 
import os
~~~ 

找到 `TEMPLATES` 数组。在那里，我们需要 `DIRS` 属性，它当前是一个空数组：

~~~ 
'DIRS': [], 
~~~ 

你需要将其替换为以下字符串：

~~~ 
'DIRS': [os.path.join(BASE_DIR, 'gantt/templates')],
~~~ 

然后，在文件底部添加以下行：

~~~ 
STATICFILES_DIRS = [os.path.join(BASE_DIR, "gantt/static")]
~~~ 

现在，你可以使用以下命令启动服务器：

~~~ 
python manage.py runserver
~~~ 

如果一切设置正确，你应该看到一个空的甘特图页面：

![init_gantt](/img/howtostart_django_initpage.png)


## Step 3. Loading data

打开 *gantt_rest_python/settings.py* 文件。向 `INSTALLED_APPS` 数组中添加 `'rest_framework'` 和 `'gantt.apps.GanttConfig'` 字符串。然后添加 `REST_FRAMEWORK` 配置：


~~~py title="gantt_rest_python/settings.py" 
INSTALLED_APPS = [
    'gantt.apps.GanttConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.AllowAny',),
    'PAGE_SIZE': 10
}
~~~ 

DHTMLX Gantt 使用的日期是绝对日期，不绑定时区（你稍后可以修改），因此我们需要禁用 **USE_TZ** 参数：

~~~ 
USE_TZ = False
~~~ 

让我们在 *gantt/models.py* 文件中创建 Task 和 Link 模型：


~~~py title="gantt/models.py" 
from django.db import models

class Task(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    text = models.CharField(blank="True," max_length="100)")
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.IntegerField()
    progress = models.FloatField()
    parent = models.CharField(max_length="100)"

class Link(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    source = models.CharField(max_length="100)")
    target = models.CharField(max_length="100)")
    type = models.CharField(max_length="100)")
    lag = models.IntegerField(blank="True," default="0)")
~~~ 

现在，我们应该配置数据库。要创建迁移，请使用命令：

~~~ 
python manage.py makemigrations gantt
~~~ 

之后，我们可以在数据库中创建表：

~~~ 
python manage.py migrate
~~~ 

让我们检查数据库并添加若干记录。首先，运行命令：

~~~ 
python manage.py shell
~~~ 

在 Python 交互式 shell 中，你可以运行以下命令来检查数据库：


~~~ 
from gantt.models import Task
Task.objects.all()

from gantt.models import Link
Link.objects.all()
~~~ 

你应该看到如下输出：


~~~ 
>>> from gantt.models import Task
>>> Task.objects.all()
<QuerySet []>
>>>  
>>> from gantt.models import Link
>>> Link.objects.all()
<QuerySet []>
~~~ 

这意味着数据库中没有任务和链接。我们可以使用下面的命令添加它们：


~~~js 
t1=Task(id="10",text="Project #1",start_date="2025-04-01 00:00",
    end_date="2025-04-03 00:00",duration=2,progress=0.5,parent="0")
t1.save()
t1=Task(id="1", text="Task #1",start_date="2025-04-01 00:00",
    end_date="2025-04-02 00:00", duration="1," progress="0.45," parent="10")
t1.save()
t1=Task(id="2", text="Task #2",start_date="2025-04-02 00:00",
    end_date="2025-04-03 00:00", duration="1," progress="0.15," parent="10")
t1.save()
t1=Task(id="20", text="Project #2",start_date="2025-04-03 00:00",
    end_date="2025-04-05 00:00", duration="2," progress="0.35," parent="0")
t1.save()
t1=Task(id="3", text="Task #3",start_date="2025-04-03 00:00",
    end_date="2025-04-04 00:00", duration="1," progress="0.85," parent="20")
t1.save()
t1=Task(id="4", text="Task #4",start_date="2025-04-04 00:00",
    end_date="2025-04-06 00:00", duration="1," progress="0.65," parent="20")
t1.save()

l1=Link(id="1",source="1",target="2",type="0",lag="0)")
l1.save()
l1=Link(id="2",source="2",target="3",type="0",lag="0)")
l1.save()
l1=Link(id="3",source="3",target="4",type="0",lag="0)")
l1.save()
~~~ 

现在，如果我们运行 `Task.objects.all()` 和 `Link.objects.all()`，数据库中应该有 6 个 Task 对象和 3 个 Link 对象：


~~~ 
>>> Task.objects.all()
<QuerySet [<Task: Task object (1)>, <Task: Task object (2)>, <Task: Task object (3)>, 
<Task: Task object (4)>, <Task: Task object (10)>, <Task: Task object (20)>]>
>>> Link.objects.all()
<QuerySet [<Link: Link object (1)>, <Link: Link object (2)>, <Link: Link object (3)>]>
~~~ 

我们需要提供一种序列化和反序列化 Task 和 Link 实例的方式。为此，在 **gantt** 文件夹中创建 *serializers.py*，并添加以下代码：


~~~py title="gantt/serializers.py" 
from .models import Task
from .models import Link
from rest_framework import serializers

class TaskSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    end_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    
    class Meta:
        model = Task
        fields = ('id','text','start_date','end_date','duration','progress','parent')


class LinkSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Link
        fields = ('id', 'source', 'target', 'type', 'lag')
~~~ 

之后，打开 *gantt/views.py* 文件，在其中添加返回甘特数据的操作：


~~~py title="gantt/views.py" 
from django.shortcuts import render
from .models import Task
from .models import Link
from gantt.serializers import TaskSerializer
from gantt.serializers import LinkSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response

def index(request):
    return render(request, 'gantt/index.html')


@api_view(['GET'])
def data_list(request, offset):
    if request.method == 'GET':
        tasks = Task.objects.all()
        links = Link.objects.all()
        taskData = TaskSerializer(tasks, many="True)")
        linkData = LinkSerializer(links, many="True)")
        return Response({
            "tasks": taskData.data,
            "links": linkData.data
        })
~~~ 

现在，打开 *gantt/urls.py* 文件。我们需要为加载数据添加路由：


~~~py title="gantt/urls.py" 
from django.urls import include, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
    re_path(r'^data/(.*)$', views.data_list),
]
urlpatterns = format_suffix_patterns(urlpatterns)
~~~ 

最后，我们可以在 *gantt/templates/gantt/index.html* 文件中添加以下代码，以从服务器加载数据：


~~~js title="gantt/templates/gantt/index.html" 
gantt.load("/data/", "json");
~~~ 

现在如果我们运行 `python manage.py runserver` 命令，应该能看到带有任务和链接的甘特图。

![gantt](/img/howtostart_django_gantt.png)


## Step 4. Saving changes

要保存更改，你需要为处理 `POST`、`PUT` 和 `DELETE` 请求添加方法。打开 *gantt/views.py* 文件并添加以下代码：


~~~js title="gantt/views.py" 
from django.shortcuts import render
from .models import Task
from .models import Link
from gantt.serializers import TaskSerializer
from gantt.serializers import LinkSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse


def index(request):
    return render(request, 'gantt/index.html')

@api_view(['GET'])
def data_list(request, offset):
    if request.method == 'GET':
        tasks = Task.objects.all()
        links = Link.objects.all()
        taskData = TaskSerializer(tasks, many="True)")
        linkData = LinkSerializer(links, many="True)")
        return Response({
            "tasks": taskData.data,
            "links": linkData.data
        })


@api_view(['POST'])
def task_add(request):
    if request.method == 'POST':
        serializer = TaskSerializer(data="request.data)")
        print(serializer)

        if serializer.is_valid():
            task = serializer.save()
            return JsonResponse({'action':'inserted', 'tid': task.id})
        return JsonResponse({'action':'error'})
    
@api_view(['PUT', 'DELETE'])
def task_update(request, pk):
    try:
        task = Task.objects.get(pk="pk)")
    except Task.DoesNotExist:
        return JsonResponse({'action':'error2'})

    if request.method == 'PUT':
        serializer = TaskSerializer(task, data="request.data)")
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'action':'updated'})
        return JsonResponse({'action':'error'})

    if request.method == 'DELETE':
        task.delete()
        return JsonResponse({'action':'deleted'})


@api_view(['POST'])
def link_add(request):
    if request.method == 'POST':
        serializer = LinkSerializer(data="request.data)")
        print(serializer)

        if serializer.is_valid():
            link = serializer.save()
            return JsonResponse({'action':'inserted', 'tid': link.id})
        return JsonResponse({'action':'error'})
    
@api_view(['PUT', 'DELETE'])
def link_update(request, pk):
    try:
        link = Link.objects.get(pk="pk)")
    except Link.DoesNotExist:
        return JsonResponse({'action':'error'})

    if request.method == 'PUT':
        serializer = LinkSerializer(link, data="request.data)")
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'action':'updated'})
        return JsonResponse({'action':'error'})

    if request.method == 'DELETE':
        link.delete()
        return JsonResponse({'action':'deleted'})
~~~ 

现在，回到 *gantt/urls.py* 文件。在这里，我们需要为这些请求添加路由，如下所示：


~~~js title="gantt/urls.py" 
from django.urls import include, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
    re_path(r'^data/task/(?P<pk>[0-9]+)$', views.task_update),
    re_path(r'^data/task', views.task_add),
    re_path(r'^data/link/(?P<pk>[0-9]+)$', views.link_update),
    re_path(r'^data/link', views.link_add),
    re_path(r'^data/(.*)$', views.data_list),
]
urlpatterns = format_suffix_patterns(urlpatterns)
~~~ 

要将更改发送到服务器，请使用 Data Processor。在 *gantt/templates/gantt/index.html* 文件中添加以下代码：


~~~js title="gantt/templates/gantt/index.html" 
    var dp = new gantt.dataProcessor("/data/");
    dp.init(gantt);
    dp.setTransactionMode("REST");
~~~ 

现在，你可以添加、更新和删除任务和链接，修改将被保存。如果你重新加载页面，你将看到相同的数据集：

![saving_changes](/img/howtostart_django_gantt_savechanges.png)


## Storing the order of tasks {#storingtheorderoftasks}

DHTMLX Gantt 是一个客户端库。它不会存储任务的顺序。当任务被加载时，它们的顺序取决于 JSON 数据中的位置。因此，存储任务顺序的一种方式是在加载 Gantt 数据之前在服务器端对任务进行排序。[Details（请阅读详细信息）](guides/server-side.md#storingtheorderoftasks)。

但还有另一种方法来实现。加载任务时，它们在纵向上的位置取决于两个参数：它们的父任务以及它们在分支中的位置（在父任务之下）。你可以从 **parent** 参数中获取父任务的 ID。分支中的位置在临时参数 **$local_index** 中得到体现。该参数并不控制分支中的位置，因此修改它不会产生任何效果。但你可以使用它来获取分支内的位置，并将其保存到另一个属性中。任务加载后，你可以根据该属性的值对任务进行排序。

首先，你可以打开 *gantt/models.py* 文件，为 Task 模型添加 **sort_order** 属性：


~~~js title="gantt/models.py" 
class Task(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    text = models.CharField(blank="True," max_length="100)"
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.IntegerField()
    progress = models.FloatField()
    parent = models.CharField(max_length="100)"
    sort_order = models.IntegerField(default="0)")
~~~ 

接着，你需要在 *gantt/serializers.py* 文件中添加该属性：


~~~js title="gantt/serializers.py" 
class TaskSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    end_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    
    class Meta:
        model = Task
        fields = ('id', 'text', 'start_date', 'end_date', 'duration', 'progress', 
            'parent', 'sort_order')
~~~ 

要将这些修改应用到数据库，你需要运行以下命令：

~~~ 
python manage.py makemigrations gantt
python manage.py migrate
~~~ 

现在，你需要向 *index.html* 文件中添加代码，以在添加任务或手动重新排序任务时更新 **sort_order** 属性：

~~~ 
gantt.attachEvent("onRowDragEnd", function (id, target) {
    gantt.batchUpdate(function () {
        gantt.eachTask(function (task) {
            task.sort_order = task.$local_index + 1;
            gantt.updateTask(task.id)
        })
    })
});
gantt.attachEvent("onBeforeTaskAdd", function (id, task) {
    task.sort_order = task.$local_index + 1;
    return true;
});
~~~ 

要启用纵向重新排序，请在 `gantt.init` 方法之前添加以下代码：

~~~ 
gantt.config.order_branch = "marker";
gantt.config.order_branch_free = true;
~~~ 

要在加载任务后对其进行排序，你需要在 `gantt.init` 或 `gantt.load` 方法之前添加以下代码：


~~~ 
gantt.attachEvent("onLoadEnd", function () {
    gantt.batchUpdate(function () {
        gantt.sort("sort_order", false)
    })
});
~~~ 

因此，代码应该与下列内容一致：


~~~js title="gantt/templates/gantt/index.html" 
gantt.config.date_format = "%Y-%m-%d %H:%i";

gantt.config.order_branch = "marker";
gantt.config.order_branch_free = true;

gantt.config.open_tree_initially = true;

gantt.attachEvent("onLoadEnd", function() {
    gantt.batchUpdate(function() {
        gantt.sort("sort_order", false)
    })
});

gantt.attachEvent("onRowDragEnd", function(id, target) {
    //update the order of tasks
    gantt.batchUpdate(function() {
        gantt.eachTask(function(task) {
            task.sort_order = task.$local_index + 1;
            gantt.updateTask(task.id)
        })
    })
});
gantt.attachEvent("onBeforeTaskAdd", function(id, task) {
    task.sort_order = task.$local_index + 1;
    return true;
});

gantt.init("gantt_here");
gantt.load("/data/", "json");

var dp = new gantt.dataProcessor("/data/");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~ 

现在，如果你启动服务器并进行竖向重新排序，修改将被保存：


![sort_order](/img/howtostart_django_sortorder.png)


## Application security

Gantt 不提供任何防护机制来防止应用遭受各种威胁，如 SQL 注入、XSS 或 CSRF 攻击。保持应用安全的责任在于实现后端的开发者。请在相应文章中了解更多细节 [in the corresponding article](guides/app-security.md).

## Trouble shooting

如果你已经完成上述步骤以在 Django 中实现 Gantt 集成，但页面上未渲染任务和链接，请查看 [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) 文章。它描述了识别问题根源的方式。

## What's next

现在你已经拥有一个功能完善的甘特图。你可以在 [GitHub](https://github.com/DHTMLX/gantt-howto-django) 上查看完整代码，克隆或下载并将其用于你的项目。

你还可以查看 [关于 gantt 的众多功能的指南](guides.md) 或关于 [将 Gantt 与其他后端框架集成的教程]( integrations/howtostart-guides.md)。