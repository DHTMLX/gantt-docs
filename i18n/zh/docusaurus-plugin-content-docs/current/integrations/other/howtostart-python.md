---
title: "dhtmlxGantt 与 Python 集成"
sidebar_label: "Python"
---

# dhtmlxGantt 与 Python 集成


本指南将介绍如何使用 Django 4 框架和 RESTful API 后端创建基于 Python 的甘特图。

如果你在其他平台开发，也可以参考以下服务端集成教程:

- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

:::note
完整源码可在 [GitHub](https://github.com/DHTMLX/gantt-howto-django) 获取。
:::

## 前置条件


如果还未安装 Django，可参考以下安装指南:

- [Windows 安装](https://docs.djangoproject.com/en/4.0/howto/windows/)
- [Linux 安装](https://linuxhint.com/install_django_ubuntu/)

## 步骤 1. 初始化项目


首先，打开你的项目文件夹，并通过以下命令创建一个新的 Django 项目:

~~~
django-admin startproject gantt_rest_python
~~~

接下来，将 **gantt_rest_python** 文件夹内容上移到当前目录，或进入该目录:

~~~
cd gantt_rest_python
~~~

验证基础配置是否生效，运行:

~~~
python manage.py runserver
~~~

在浏览器中打开 [http://localhost:8000](http://localhost:8000)，你应该能看到 Django 默认欢迎页面:

![start_page](/img/howtostart_django_startpage.png)

## 步骤 2. 在页面中添加 Gantt


首先为 Gantt 组件创建一个新的应用:

~~~
python manage.py startapp gantt
~~~

安装 REST 框架相关包:

~~~
pip install djangorestframework
pip install djangorestframework-jsonapi
~~~

在 **gantt** 文件夹下创建 **static** 和 **templates** 目录。

将 Gantt 包中的 *codebase* 文件夹复制到 **static** 目录下，并重命名为 **gantt**，以便清晰标识内容。

然后，在 **templates/gantt** 下创建 *index.html* 文件，并填入如下内容:

**gantt/templates/gantt/index.html**
~~~
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

此时，项目文件夹结构应如下所示:

![folder_structure](/img/howtostart_django_folder.png)

打开 **gantt** 文件夹下的 *views.py*，添加如下内容:

**gantt/views.py**
~~~
from django.shortcuts import render

def index(request):
    return render(request, 'gantt/index.html')
~~~

接下来，在 **gantt** 文件夹下创建 *urls.py*，内容如下:

**gantt/urls.py**
~~~
from django.urls import include, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
]
urlpatterns = format_suffix_patterns(urlpatterns)
~~~

在 **gantt_rest_python** 文件夹下的 *urls.py* 文件中，更新 `urlpatterns`，引入 gantt 应用的路由:

**gantt_rest_python/urls.py**
~~~
from django.urls import include, re_path
from django.contrib import admin

urlpatterns = [
    re_path(r'', include('gantt.urls')),
]
~~~

为了让 Django 识别你的模板和静态文件，打开 **gantt_rest_python** 下的 *settings.py*，在顶部添加:

**gantt_rest_python/settings.py**
~~~
import os
~~~

找到 `TEMPLATES` 配置，将空的 `DIRS` 数组:

~~~
'DIRS': [],
~~~

替换为:

~~~
'DIRS': [os.path.join(BASE_DIR, 'gantt/templates')],
~~~

最后，在文件末尾添加以下内容，指定静态文件位置:

~~~
STATICFILES_DIRS = [os.path.join(BASE_DIR, "gantt/static")]
~~~


再次启动服务:

~~~
python manage.py runserver
~~~

如果一切设置正确，页面会显示一个空的甘特图:

![init_gantt](/img/howtostart_django_initpage.png)

## 步骤 3. 加载数据


在 *gantt_rest_python/settings.py* 中，将 `'rest_framework'` 和 `'gantt.apps.GanttConfig'` 添加到 `INSTALLED_APPS` 列表，并配置 REST 框架选项:

**gantt_rest_python/settings.py**
~~~
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

由于 DHTMLX Gantt 使用绝对日期且不绑定时区，需禁用时区支持:

~~~
USE_TZ = False
~~~

在 *gantt/models.py* 中定义 Task 和 Link 模型:

**gantt/models.py**
~~~
from django.db import models

class Task(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    text = models.CharField(blank="True," max_length="100)"
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.IntegerField()
    progress = models.FloatField()
    parent = models.CharField(max_length="100)"

class Link(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    source = models.CharField(max_length="100)"
    target = models.CharField(max_length="100)"
    type = models.CharField(max_length="100)"
    lag = models.IntegerField(blank="True," default="0)"
~~~

为新模型创建迁移文件:

~~~
python manage.py makemigrations gantt
~~~

应用迁移，更新数据库结构:

~~~
python manage.py migrate
~~~

如需添加一些初始数据，打开 Django shell:

~~~
python manage.py shell
~~~

在 shell 中，检查当前数据:

~~~
from gantt.models import Task
Task.objects.all()

from gantt.models import Link
Link.objects.all()
~~~

数据库为空时，可按如下方式添加任务和链接:

~~~
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

l1=Link(id="1",source="1",target="2",type="0",lag="0)"
l1.save()
l1=Link(id="2",source="2",target="3",type="0",lag="0)"
l1.save()
l1=Link(id="3",source="3",target="4",type="0",lag="0)"
l1.save()
~~~

此时运行 `Task.objects.all()` 和 `Link.objects.all()` 应返回新添加的项目。

为处理序列化，在 **gantt** 文件夹下创建 *serializers.py*:

**gantt/serializers.py**
~~~
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

在 *gantt/views.py* 中添加返回 gantt 数据的视图:

**gantt/views.py**
~~~
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
        taskData = TaskSerializer(tasks, many="True)"
        linkData = LinkSerializer(links, many="True)"
        return Response({
            "tasks": taskData.data,
            "links": linkData.data
        })
~~~

在 *gantt/urls.py* 中添加数据加载路由:

**gantt/urls.py**
~~~
from django.urls import include, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
    re_path(r'^data/(.*)$', views.data_list),
]
urlpatterns = format_suffix_patterns(urlpatterns)
~~~

最后，在 *gantt/templates/gantt/index.html* 文件中添加以下内容，从服务器加载数据:

**gantt/templates/gantt/index.html**
~~~
gantt.load("/data/", "json");
~~~

此时运行服务器，甘特图将会显示已填充的任务和链接:

![gantt](/img/howtostart_django_gantt.png)

## 步骤 4. 保存更改


如需支持保存更改，需要在 *gantt/views.py* 中添加对 `POST`、`PUT` 和 `DELETE` 方法的支持:

**gantt/views.py**
~~~
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
        taskData = TaskSerializer(tasks, many="True)"
        linkData = LinkSerializer(links, many="True)"
        return Response({
            "tasks": taskData.data,
            "links": linkData.data
        })


@api_view(['POST'])
def task_add(request):
    if request.method == 'POST':
        serializer = TaskSerializer(data="request.data)"
        print(serializer)

        if serializer.is_valid():
            task = serializer.save()
            return JsonResponse({'action':'inserted', 'tid': task.id})
        return JsonResponse({'action':'error'})
    
@api_view(['PUT', 'DELETE'])
def task_update(request, pk):
    try:
        task = Task.objects.get(pk="pk)"
    except Task.DoesNotExist:
        return JsonResponse({'action':'error2'})

    if request.method == 'PUT':
        serializer = TaskSerializer(task, data="request.data)"
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
        serializer = LinkSerializer(data="request.data)"
        print(serializer)

        if serializer.is_valid():
            link = serializer.save()
            return JsonResponse({'action':'inserted', 'tid': link.id})
        return JsonResponse({'action':'error'})
    
@api_view(['PUT', 'DELETE'])
def link_update(request, pk):
    try:
        link = Link.objects.get(pk="pk)"
    except Link.DoesNotExist:
        return JsonResponse({'action':'error'})

    if request.method == 'PUT':
        serializer = LinkSerializer(link, data="request.data)"
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'action':'updated'})
        return JsonResponse({'action':'error'})

    if request.method == 'DELETE':
        link.delete()
        return JsonResponse({'action':'deleted'})
~~~

在 *gantt/urls.py* 中添加对应路由:

**gantt/urls.py**
~~~
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

要将更改发送回服务器，在 *gantt/templates/gantt/index.html* 中启用 Data Processor:

**gantt/templates/gantt/index.html**
~~~
    var dp = new gantt.dataProcessor("/data/");
    dp.init(gantt);
    dp.setTransactionMode("REST");
~~~

通过以上设置，添加、更新或删除任务和链接后，变更将被持久化。刷新页面后可看到已保存的数据:

![saving_changes](/img/howtostart_django_gantt_savechanges.png)

## 任务顺序的存储 {#storingtheorderoftasks}

由于 DHTMLX Gantt 在客户端运行，不会自动存储任务顺序。顺序取决于 JSON 数据中的排列。可以在服务端排序后再发送给 Gantt。[详细说明见此](guides/server-side.md#storingtheorderoftasks)。

另一种方法是结合父任务和分支中的位置。父任务 ID 存储在 **parent** 字段，分支内的位置对应临时的 **$local_index** 属性。虽然更改 **$local_index** 不影响显示，但可用来追踪并保存任务顺序到专用属性。加载后按该属性排序。

首先，在 *gantt/models.py* 中为 Task 模型添加 **sort_order** 字段:

**gantt/models.py**
~~~
class Task(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    text = models.CharField(blank="True," max_length="100)"
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.IntegerField()
    progress = models.FloatField()
    parent = models.CharField(max_length="100)"
    sort_order = models.IntegerField(default="0)"
~~~

在 *gantt/serializers.py* 的序列化器中加入 **sort_order**:

**gantt/serializers.py**
~~~
class TaskSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    end_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    
    class Meta:
        model = Task
        fields = ('id', 'text', 'start_date', 'end_date', 'duration', 'progress', 
            'parent', 'sort_order')
~~~

将更改应用到数据库:

~~~
python manage.py makemigrations gantt
python manage.py migrate
~~~

接下来，更新 *index.html*，在添加或重新排序任务时调整 **sort_order**:

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

在 `gantt.init` 前添加以下内容，启用垂直拖拽排序:

~~~
gantt.config.order_branch = "marker";
gantt.config.order_branch_free = true;
~~~

要在数据加载后排序任务，在 `gantt.init` 或 `gantt.load` 前添加:

~~~
gantt.attachEvent("onLoadEnd", function () {
    gantt.batchUpdate(function () {
        gantt.sort("sort_order", false)
    })
});
~~~

整合后，*index.html* 相关部分如下:

**gantt/templates/gantt/index.html**
~~~
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

通过此方案，垂直拖拽任务后，更新的顺序会被保存:

![sort_order](/img/howtostart_django_sortorder.png)

## 应用安全


DHTMLX Gantt 本身不包含防御 SQL 注入、XSS 或 CSRF 等威胁的机制。后端安全需由开发者负责。详见 [安全性相关文档](guides/app-security.md)。

## 故障排查


如果集成完成后任务和链接未显示，请参考 [백엔드 통합 문제 해결](guides/troubleshooting.md) 中的故障排查指南，获取常见问题的定位和解决建议。

## 后续步骤


至此，你已拥有可用的甘特图应用。完整源码可在 [GitHub](https://github.com/DHTMLX/gantt-howto-django) 克隆或下载，用于你的项目。

你还可以探索 [更多 Gantt 功能指南](guides.md) 或 [与其他后端框架集成的教程](integrations/howtostart-guides.md)。
