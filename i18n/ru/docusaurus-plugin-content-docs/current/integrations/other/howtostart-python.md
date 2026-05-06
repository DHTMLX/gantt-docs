---
title: "dhtmlxGantt с Python"
sidebar_label: "Python"
---

# dhtmlxGantt с Python

Этот учебник покажет, как создать Gantt на основе Python, используя фреймворк Django 4 и RESTful API на сервере.

Существуют руководства, предназначенные для настройки интеграции на стороне сервера с помощью других платформ:

- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

:::note
Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/gantt-howto-django).
:::

## Prerequisites

Установите Django, если его нет:

- [для Windows](https://docs.djangoproject.com/en/4.0/howto/windows/)
- [для Linux](https://linuxhint.com/install_django_ubuntu/)

## Шаг 1. Инициализация проекта

Откройте папку проекта и создайте новый проект Django с помощью следующей команды:

~~~ 
django-admin startproject gantt_rest_python
~~~

После этого можно либо переместить содержимое папки **gantt_rest_python** в текущую папку, либо перейти в эту папку:

~~~ 
cd gantt_rest_python
~~~

Чтобы проверить, что базовое приложение работает корректно, выполните следующую команду в папке проекта:

~~~ 
python manage.py runserver
~~~

Теперь можно открыть URL http://localhost:8000 в браузере, и вы должны увидеть страницу по умолчанию:

![start_page](/img/howtostart_django_startpage.png)

## Шаг 2. Добавление Gantt на страницу

Теперь можно начать создание компонента Gantt. Выполните следующую команду:

~~~ 
python manage.py startapp gantt
~~~

Установите REST framework:

~~~
pip install djangorestframework
pip install djangorestframework-jsonapi
~~~

Откройте папку **gantt** и создайте в ней папки **static** и **templates**.

Скопируйте содержимое папки *codebase* из пакета Gantt в папку **static**. Переименуйте её в **gantt**, чтобы указать, к какому компоненту принадлежат файлы.

Затем создайте файл *index.html* в папке **templates/gantt** и добавьте туда следующий код:


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

На данный момент структура папок должна выглядеть следующим образом:

![folder_structure](/img/howtostart_django_folder.png)

Откройте файл *views.py* в папке **gantt** и добавьте следующий код туда:

~~~py title="gantt/views.py"
from django.shortcuts import render

def index(request):
    return render(request, 'gantt/index.html')
~~~

Теперь нам нужно добавить маршрутизацию. Создайте файл *urls.py* в папке **gantt** и поместите в него следующий код:

~~~py title="gantt/urls.py"
from django.urls import include, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
]
urlpatterns = format_suffix_patterns(urlpatterns)
~~~

Откройте файл *urls.py* в папке **gantt_rest_python**. Нам нужно обновить `urlpatterns`. Обновленный код должен выглядеть так:

~~~py title="gantt_rest_python/urls.py"
from django.urls import include, re_path
from django.contrib import admin

urlpatterns = [
    re_path(r'', include('gantt.urls')),
]
~~~

Теперь нужно определить пути к папкам **templates** и **static** в настройках. Для этого откройте файл *settings.py* в папке **gantt_rest_python** и в начале файла добавьте следующую строку:

~~~py title="gantt_rest_python/settings.py"
import os
~~~

Найдите массив `TEMPLATES`. Там нужна свойство `DIRS`, которое имеет пустой массив:

~~~
'DIRS': [],
~~~

Замените его на следующую строку:

~~~
'DIRS': [os.path.join(BASE_DIR, 'gantt/templates')],
~~~

Затем добавьте следующую строку в конец файла:

~~~
STATICFILES_DIRS = [os.path.join(BASE_DIR, "gantt/static")]
~~~

Теперь можно запустить сервер командой:

~~~
python manage.py runserver
~~~

Если всё сделано правильно, вы должны увидеть страницу с пустым Gantt:

![init_gantt](/img/howtostart_django_initpage.png)

## Шаг 3. Загрузка данных

Откройте файл *gantt_rest_python/settings.py*. Добавьте в массив `INSTALLED_APPS` строки `'rest_framework'` и `'gantt.apps.GanttConfig'`. Затем добавьте конфигурацию `REST_FRAMEWORK`:

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

DHTMLX Gantt использует абсолютные даты, не привязанные к часовому поясу (позже это можно изменить), поэтому необходимо отключить параметр **USE_TZ**:

~~~ 
USE_TZ = False
~~~

Давайте создадим модели Task и Link в файле *gantt/models.py*:

~~~py title="gantt/models.py"
from django.db import models

class Task(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    text = models.CharField(blank="True," max_length="100)"
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.IntegerField()
    progress = models.FloatField()
    parent = models.CharField(max_length="100)

class Link(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    source = models.CharField(max_length="100)")
    target = models.CharField(max_length="100)")
    type = models.CharField(max_length="100)")
    lag = models.IntegerField(blank="True," default="0)")
~~~

Теперь нужно настроить базу данных. Чтобы создать миграции, используйте команду:

~~~ 
python manage.py makemigrations gantt
~~~

После этого можно создать таблицу в базе данных:

~~~ 
python manage.py migrate
~~~

Давайте посмотрим базу данных и добавим несколько записей. Сначала запустите команду:

~~~ 
python manage.py shell
~~~

В интерактивной оболочке Python можно выполнить следующие команды, чтобы проверить базу данных:

~~~ 
from gantt.models import Task
Task.objects.all()

from gantt.models import Link
Link.objects.all()
~~~

Вы должны увидеть следующий вывод:

~~~ 
>>> from gantt.models import Task
>>> Task.objects.all()
<QuerySet []>
>>>  
>>> from gantt.models import Link
>>> Link.objects.all()
<QuerySet []>
~~~

Это означает, что в базе данных нет ни одной задачи и ни одной связи. Мы можем добавить их с помощью команд:

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

Теперь, если запустить `Task.objects.all()` и `Link.objects.all()`, мы должны увидеть 6 объектов Task и 3 объекта Link в базе данных:

~~~ 
>>> Task.objects.all()
<QuerySet [<Task: Task object (1)>, <Task: Task object (2)>, <Task: Task object (3)>, 
<Task: Task object (4)>, <Task: Task object (10)>, <Task: Task object (20)>]>
>>> Link.objects.all()
<QuerySet [<Link: Link object (1)>, <Link: Link object (2)>, <Link: Link object (3)>]>
~~~

Нам нужно обеспечить сериализацию и десериализацию экземпляров Task и Link. Для этого создайте файл *serializers.py* в папке **gantt** и добавьте следующий код:

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

После этого перейдите в файл *gantt/views.py* и добавьте действие, возвращающее данные Gantt:

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

Теперь откройте файл *gantt/urls.py*. Здесь нужно добавить маршруты для загрузки данных:

~~~py title="gantt/urls.py"
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

Чтобы отправлять изменения на сервер, используйте Data Processor. Добавьте следующий код в файл *gantt/templates/gantt/index.html*:

~~~js title="gantt/templates/gantt/index.html"
    var dp = new gantt.dataProcessor("/data/");
    dp.init(gantt);
    dp.setTransactionMode("REST");
~~~

Теперь можно добавлять, обновлять и удалять задачи и связи, и изменения будут сохранены. При перезагрузке страницы вы получите тот же набор данных:

![saving_changes](/img/howtostart_django_gantt_savechanges.png)

## Сохранение порядка задач {#storingtheorderoftasks}

DHTMLX Gantt — это клиентская библиотека. Она не хранит порядок задач. При загрузке задач их порядок зависит от их положения в JSON-данных. Итак, один из способов сохранить порядок задач — сортировать задачи на сервере перед загрузкой данных в Gantt. [Подробнее](guides/server-side.md#storingtheorderoftasks).

Но есть и другой способ сделать это. Когда задачи загружаются, их вертикальное положение зависит от двух параметров: их родительской задачи и их положения в ветке (под родительской задачей). Вы можете получить ID родительской задачи из параметра **parent**. Позиция в ветке отражается во временном параметре **$local_index**. Этот параметр не управляет позицией ветки, поэтому изменение его не повлияет на положение. Но вы можете использовать его, чтобы получить позицию внутри ветки и сохранить ее в другом свойстве. После загрузки задач вы можете сортировать задачи по значению этого свойства.

Сначала откройте файл *gantt/models.py* и добавьте к модели Task свойство **sort_order**:

~~~js title="gantt/models.py"
class Task(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    text = models.CharField(blank="True," max_length="100)"
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.IntegerField()
    progress = models.FloatField()
    parent = models.CharField(max_length="100)")
    sort_order = models.IntegerField(default="0)")
~~~

Затем нужно добавить это свойство в файл *gantt/serializers.py*:

~~~js title="gantt/serializers.py"
class TaskSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    end_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    
    class Meta:
        model = Task
        fields = ('id', 'text', 'start_date', 'end_date', 'duration', 'progress', 
            'parent', 'sort_order')
~~~

Чтобы применить изменения к базе данных, выполните следующие команды:

~~~
python manage.py makemigrations gantt
python manage.py migrate
~~~

Теперь нужно добавить код в файл *index.html*, чтобы обновлять свойство **sort_order** каждый раз, когда вы добавляете задачу или вручную меняете порядок задач:

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

Чтобы включить вертикальный порядок, добавьте следующий код перед методом `gantt.init`:

~~~
gantt.config.order_branch = "marker";
gantt.config.order_branch_free = true;
~~~

Чтобы отсортировать задачи после их загрузки, добавьте следующий код перед методами `gantt.init` или `gantt.load`:

~~~
gantt.attachEvent("onLoadEnd", function () {
    gantt.batchUpdate(function () {
        gantt.sort("sort_order", false)
    })
});
~~~

В итоге код должен выглядеть так:

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

Теперь, если вы запустите сервер и выполните вертикальное изменение порядка задач, изменения будут сохранены:

![sort_order](/img/howtostart_django_sortorder.png)

## Безопасность приложения

Gantt не предоставляет каких-либо средств защиты приложения от различных угроз, таких как SQL-инъекции или XSS и CSRF-атаки. Важно, чтобы ответственность за безопасность приложения лежала на разработчиках, реализующих backend. Подробнее [в соответствующей статье](guides/app-security.md).

## Устранение неполадок

Если вы выполнили все вышеописанные шаги по интеграции Gantt с Django, но Gantt не рендерит задачи и связи на странице, посмотрите статью [Устранение неполадок интеграции Backend](guides/troubleshooting.md). В ней описаны способы идентифицировать источники проблем.

## Что дальше

Теперь у вас полноценно функционирующий Gantt. Полный код можно просмотреть на [GitHub](https://github.com/DHTMLX/gantt-howto-django), клонировать или скачать его и использовать в ваших проектах.

Вы также можете посмотреть [решения по множеству функций Gantt](guides.md) или материалы по [интеграции Gantt с другими бэкенд-фреймворками](integrations/howtostart-guides.md).