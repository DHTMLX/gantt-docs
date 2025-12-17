---
title: "dhtmlxGantt с Python"
sidebar_label: "Python"
---

dhtmlxGantt с Python
=====================

В этом руководстве описывается создание диаграммы Gantt на базе Python с использованием фреймворка Django 4 и RESTful API на серверной стороне.

Если вы работаете с другими платформами, доступны руководства по серверной интеграции с:

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

Необходимые условия
-----------------

Если Django еще не установлен, вот инструкции по установке:

- [Установка на Windows](https://docs.djangoproject.com/en/4.0/howto/windows/)
- [Установка на Linux](https://linuxhint.com/install_django_ubuntu/)

Шаг 1. Инициализация проекта
-----------------------

Откройте папку вашего проекта и создайте новый проект Django с помощью команды:

~~~
django-admin startproject gantt_rest_python
~~~

Далее либо переместите содержимое папки **gantt_rest_python** в текущую директорию, либо перейдите в нее:

~~~
cd gantt_rest_python
~~~

Чтобы убедиться, что базовая настройка работает, выполните:

~~~
python manage.py runserver
~~~

Откройте http://localhost:8000 в браузере - должна появиться стандартная приветственная страница Django:

![start_page](/img/howtostart_django_startpage.png)

Шаг 2. Добавление Gantt на страницу
-----------------------

Создайте новое приложение для компонента Gantt:

~~~
python manage.py startapp gantt
~~~

Установите пакеты REST framework:

~~~
pip install djangorestframework
pip install djangorestframework-jsonapi
~~~

В папке **gantt** создайте директории **static** и **templates**.

Скопируйте папку *codebase* из пакета Gantt в папку **static** и переименуйте ее в **gantt** для удобства.

Затем создайте файл *index.html* в **templates/gantt** со следующим содержимым:

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

В результате структура папок должна выглядеть так:

![folder_structure](/img/howtostart_django_folder.png)

Откройте *views.py* в папке **gantt** и добавьте:

**gantt/views.py**
~~~
from django.shortcuts import render

def index(request):
    return render(request, 'gantt/index.html')
~~~

Далее настройте маршрутизацию, создав *urls.py* в папке **gantt**:

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

В файле *urls.py* папки **gantt_rest_python** обновите `urlpatterns`, чтобы добавить маршруты приложения gantt:

**gantt_rest_python/urls.py**
~~~
from django.urls import include, re_path
from django.contrib import admin

urlpatterns = [
    re_path(r'', include('gantt.urls')),
]
~~~

Чтобы Django мог находить ваши шаблоны и статические файлы, откройте *settings.py* в **gantt_rest_python** и добавьте в начало файла:

**gantt_rest_python/settings.py**
~~~
import os
~~~

Найдите настройку `TEMPLATES` и замените пустой массив `DIRS`:

~~~
'DIRS': [],
~~~

на:

~~~
'DIRS': [os.path.join(BASE_DIR, 'gantt/templates')],
~~~

В конце файла добавьте строку, указывающую расположение статических файлов:

~~~
STATICFILES_DIRS = [os.path.join(BASE_DIR, "gantt/static")]
~~~


Снова запустите сервер:

~~~
python manage.py runserver
~~~

Если все настроено правильно, на странице появится пустая диаграмма Gantt:

![init_gantt](/img/howtostart_django_initpage.png)

Шаг 3. Загрузка данных
---------------------

В *gantt_rest_python/settings.py* добавьте `'rest_framework'` и `'gantt.apps.GanttConfig'` в список `INSTALLED_APPS`, а также настройте параметры REST framework:

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

Поскольку DHTMLX Gantt использует абсолютные даты без привязки к часовому поясу, отключите поддержку временных зон:

~~~
USE_TZ = False
~~~

Определите модели Task и Link в *gantt/models.py*:

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

Создайте миграции для новых моделей:

~~~
python manage.py makemigrations gantt
~~~

Примените миграции для обновления схемы базы данных:

~~~
python manage.py migrate
~~~

Чтобы добавить начальные данные, откройте Django shell:

~~~
python manage.py shell
~~~

Внутри shell проверьте текущие данные:

~~~
from gantt.models import Task
Task.objects.all()

from gantt.models import Link
Link.objects.all()
~~~

Так как база пуста, добавьте задачи и связи следующим образом:

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

Теперь выполнение `Task.objects.all()` и `Link.objects.all()` должно возвращать добавленные элементы.

Для сериализации создайте *serializers.py* в папке **gantt**:

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

Обновите *gantt/views.py*, добавив представление для отдачи данных Gantt:

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

Добавьте маршруты для загрузки данных в *gantt/urls.py*:

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

Наконец, обновите файл *gantt/templates/gantt/index.html* для загрузки данных с сервера, добавив:

**gantt/templates/gantt/index.html**
~~~
gantt.load("/data/", "json");
~~~

Теперь при запуске сервера диаграмма Gantt будет заполнена задачами и связями:

![gantt](/img/howtostart_django_gantt.png)

Шаг 4. Сохранение изменений
-------------------

Чтобы обеспечить сохранение изменений, добавьте поддержку методов `POST`, `PUT` и `DELETE` в *gantt/views.py*:

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

Добавьте соответствующие маршруты в *gantt/urls.py*:

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

Чтобы отправлять изменения на сервер, включите Data Processor в *gantt/templates/gantt/index.html*:

**gantt/templates/gantt/index.html**
~~~
    var dp = new gantt.dataProcessor("/data/");
    dp.init(gantt);
    dp.setTransactionMode("REST");
~~~

Теперь при добавлении, изменении или удалении задач и связей изменения будут сохраняться. После перезагрузки страницы данные сохранятся:

![saving_changes](/img/howtostart_django_gantt_savechanges.png)

## Хранение порядка задач {#storingtheorderoftasks}


Поскольку DHTMLX Gantt работает на стороне клиента, порядок задач не сохраняется автоматически. Порядок зависит от последовательности в JSON-данных. Один из способов - сортировать задачи на сервере перед отправкой в Gantt. [Подробнее здесь](guides/server-side.md#storingtheorderoftasks).

Другой способ - использовать родительскую задачу и позицию в ветке. ID родителя хранится в поле **parent**, а позиция в ветке соответствует временному свойству **$local_index**. Хотя изменение **$local_index** не влияет на отображение, его можно использовать для отслеживания порядка и сохранения в отдельном свойстве. После загрузки задачи можно отсортировать по этому свойству.

Сначала добавьте поле **sort_order** в модель Task в *gantt/models.py*:

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

Добавьте **sort_order** в сериализатор в *gantt/serializers.py*:

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

Примените изменения к базе данных:

~~~
python manage.py makemigrations gantt
python manage.py migrate
~~~

Далее обновите *index.html*, чтобы изменять **sort_order** при добавлении или изменении порядка задач:

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

Включите вертикальное изменение порядка, добавив это перед `gantt.init`:

~~~
gantt.config.order_branch = "marker";
gantt.config.order_branch_free = true;
~~~

Чтобы отсортировать задачи после загрузки данных, добавьте это перед `gantt.init` или `gantt.load`:

~~~
gantt.attachEvent("onLoadEnd", function () {
    gantt.batchUpdate(function () {
        gantt.sort("sort_order", false)
    })
});
~~~

В результате соответствующий фрагмент *index.html* будет выглядеть так:

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
    //обновление порядка задач
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

Теперь при вертикальном изменении порядка задач новая последовательность будет сохраняться:

![sort_order](/img/howtostart_django_sortorder.png)

Безопасность приложения
-------------------------

DHTMLX Gantt не содержит встроенной защиты от таких угроз, как SQL-инъекции, XSS или CSRF. Защита приложения лежит на ответственности разработчика на серверной стороне. Подробнее см. в [статье по безопасности](guides/app-security.md).

Устранение неполадок
-----------------

Если задачи и связи не отображаются после завершения интеграции, ознакомьтесь с руководством по устранению неполадок в [Устранение проблем интеграции с backend](guides/troubleshooting.md). Там приведены советы по диагностике и решению распространенных проблем.

Что дальше
------------

На данном этапе у вас есть работающее приложение с диаграммой Gantt. Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/gantt-howto-django) для клонирования или скачивания для использования в ваших проектах.

Рекомендуем также ознакомиться с [руководствами по различным возможностям Gantt](guides.md) или уроками по [интеграции Gantt с другими серверными фреймворками](integrations/howtostart-guides.md).
