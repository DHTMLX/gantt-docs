--- 
title: "Python으로 dhtmlxGantt" 
sidebar_label: "파이썬" 
--- 

# Python으로 dhtmlxGantt

이 튜토리얼은 서버에서 Django 4 프레임워크와 RESTful API를 사용하여 Python 기반의 간트 차트를 만드는 방법을 안내합니다.

다른 플랫폼의 도움으로 서버 측 통합을 구축하기 위한 튜토리얼도 있습니다:

- [ASP.NET MVC로 dhtmlxGantt](integrations/dotnet/howtostart-dotnet.md)
- [Node.js로 dhtmlxGantt](integrations/node/howtostart-nodejs.md)
- [ASP.NET Core로 dhtmlxGantt](integrations/dotnet/howtostart-dotnet-core.md)
- [PHP: Laravel로 dhtmlxGantt](integrations/php/howtostart-php-laravel.md)
- [PHP:Slim으로 dhtmlxGantt](integrations/php/howtostart-php-slim4.md)
- [Salesforce LWC로 dhtmlxGantt](integrations/salesforce/howtostart-salesforce.md)
- [Ruby on Rails로 dhtmlxGantt](integrations/other/howtostart-ruby.md)

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/gantt-howto-django).
::: 

## Prerequisites

아직 Django를 설치하지 않았다면 설치하세요:

- [Windows용](https://docs.djangoproject.com/en/4.0/howto/windows/)
- [Linux용](https://linuxhint.com/install_django_ubuntu/)

## Step 1. 프로젝트 초기화

프로젝트 폴더를 열고 다음 명령으로 새로운 Django 프로젝트를 생성합니다:

~~~
django-admin startproject gantt_rest_python
~~~

그런 다음, **gantt_rest_python** 폴더의 내용을 현재 폴더로 옮기거나 해당 폴더로 이동할 수 있습니다:

~~~
cd gantt_rest_python
~~~

기본 애플리케이션이 정상적으로 작동하는지 확인하려면 프로젝트 폴더에서 다음 명령을 실행하세요:

~~~
python manage.py runserver
~~~

이제 브라우저에서 http://localhost:8000 URL을 열면 기본 페이지를 볼 수 있어야 합니다:

![start_page](/img/howtostart_django_startpage.png)

## Step 2. 페이지에 Gantt 추가

이제 Gantt 컴포넌트를 생성하기 시작할 수 있습니다. 아래 명령을 실행하세요:

~~~
python manage.py startapp gantt
~~~

REST 프레임워크를 설치합니다:

~~~
pip install djangorestframework
pip install djangorestframework-jsonapi
~~~

**gantt** 폴더를 열고 그 안에 **static**와 **templates** 폴더를 만드세요.

Gantt 패키지의 *codebase* 폴더 내용을 **static** 폴더로 복사합니다. 파일이 속한 컴포넌트를 지정하기 위해 이름을 **gantt**로 바꿉니다.

그다음, **templates/gantt** 폴더에 *index.html* 파일을 만들고 아래 코드를 추가하세요:

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

현재 폴더 구조는 다음과 같아야 합니다:

![folder_structure](/img/howtostart_django_folder.png)

**gantt** 폴더의 *views.py* 파일을 열고 아래 코드를 추가합니다:

~~~py title="gantt/views.py"
from django.shortcuts import render

def index(request):
    return render(request, 'gantt/index.html')
~~~

다음으로 라우팅을 추가합니다. **gantt** 폴더에 *urls.py* 파일을 만들고 아래 코드를 넣으세요:

~~~py title="gantt/urls.py"
from django.urls import include, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
]
urlpatterns = format_suffix_patterns(urlpatterns)
~~~

**gantt_rest_python** 폴더의 *urls.py* 파일을 열고 `urlpatterns`를 업데이트해야 합니다. 업데이트된 코드는 아래와 같아야 합니다:

~~~py title="gantt_rest_python/urls.py"
from django.urls import include, re_path
from django.contrib import admin

urlpatterns = [
    re_path(r'', include('gantt.urls')),
]
~~~

다음으로 설정에서 **templates**와 **static** 폴더의 경로를 정의해야 합니다. 이를 위해 **gantt_rest_python** 폴더의 *settings.py* 파일을 열고 파일 맨 처음에 아래 줄을 추가합니다:

~~~py title="gantt_rest_python/settings.py"
import os
~~~

`TEMPLATES` 배열을 찾으세요. 거기에 빈 배열인 `DIRS` 속성이 있습니다:

~~~ 
'DIRS': [],
~~~

다음을 문자열로 바꿔 넣어야 합니다:

~~~ 
'DIRS': [os.path.join(BASE_DIR, 'gantt/templates')],
~~~

그리고 파일 맨 아래에 아래 줄을 추가합니다:

~~~ 
STATICFILES_DIRS = [os.path.join(BASE_DIR, "gantt/static")]
~~

이제 서버를 아래 명령으로 시작할 수 있습니다:

~~~
python manage.py runserver
~~~

정상적으로 동작하면 빈 간트가 보이는 페이지가 나타나야 합니다:

![init_gantt](/img/howtostart_django_initpage.png)

## Step 3. 데이터 로딩

**gantt_rest_python/settings.py** 파일을 열고 `'rest_framework'`와 `'gantt.apps.GanttConfig'`를 INSTALLED_APPS 배열에 추가한 뒤, REST_FRAMEWORK 구성을 추가하세요:

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

절대 날짜를 사용하는 DHTMLX Gantt는 표준 시간대에 바인딩되지 않으므로 USE_TZ 매개변수를 비활성화해야 합니다:

~~~
USE_TZ = False
~~~

다음으로 *gantt/models.py* 파일에 Task와 Link 모델을 생성합니다:

~~~py title="gantt/models.py"
from django.db import models

class Task(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    text = models.CharField(blank="True," max_length="100)")
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

이제 데이터베이스를 구성합니다. 마이그레이션을 생성하려면 다음 명령을 사용합니다:

~~~
python manage.py makemigrations gantt
~~~

그다음 데이터베이스에 테이블을 생성합니다:

~~~
python manage.py migrate
~~~

데이터베이스를 확인하고 여러 레코드를 추가해 봅시다. 먼저 다음 명령을 실행합니다:

~~~
python manage.py shell
~~~

파이썬 셸에서 데이터베이스를 확인하기 위한 명령은 다음과 같습니다:

~~~ 
from gantt.models import Task
Task.objects.all()

from gantt.models import Link
Link.objects.all()
~~~

다음과 같은 출력이 표시되어야 합니다:

~~~ 
>>> from gantt.models import Task
>>> Task.objects.all()
<QuerySet []>
>>>  
>>> from gantt.models import Link
>>> Link.objects.all()
<QuerySet []>
~~~

데이터베이스에 작업과 링크가 없음을 의미합니다. 아래 명령으로 추가할 수 있습니다:

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

이제 `Task.objects.all()` 및 `Link.objects.all()`를 실행하면 데이터베이스에 6개의 Task 객체와 3개의 Link 객체가 있어야 합니다:

~~~ 
>>> Task.objects.all()
<QuerySet [<Task: Task object (1)>, <Task: Task object (2)>, <Task: Task object (3)>, 
<Task: Task object (4)>, <Task: Task object (10)>, <Task: Task object (20)>]>
>>> Link.objects.all()
<QuerySet [<Link: Link object (1)>, <Link: Link object (2)>, <Link: Link object (3)>]>
~~~

이제 Task와 Link 인스턴스를 직렬화하고 역직렬화하는 방법을 제공해야 합니다. 이를 위해 **gantt** 폴더에 *serializers.py* 파일을 만들고 아래 코드를 추가합니다:

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

그다음, *gantt/views.py* 파일로 이동해 간트 데이터 반환 작업을 추가합니다:

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

이제 *gantt/urls.py* 파일을 열고 데이터 로딩용 경로를 추가합니다:

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

마지막으로 서버에서 데이터를 로드하도록 *gantt/templates/gantt/index.html* 파일에 아래 줄을 추가합니다:

~~~js title="gantt/templates/gantt/index.html"
gantt.load("/data/", "json");
~~~

이제 `python manage.py runserver` 명령을 실행하면 작업 및 링크가 있는 Gantt가 페이지에 표시되어야 합니다:

![gantt](/img/howtostart_django_gantt.png)

## Step 4. Saving changes

변경 내용을 저장하려면 `POST`, `PUT`, `DELETE` 요청을 처리하는 메서드를 추가해야 합니다. *gantt/views.py* 파일을 열고 아래 코드를 추가합니다:

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

다음으로, *gantt/urls.py* 파일로 돌아가 요청에 대한 경로를 아래와 같이 추가합니다:

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

서버에 변경사항을 보내기 위해 Data Processor를 사용합니다. 아래 코드를 *gantt/templates/gantt/index.html* 파일에 추가합니다:

~~~js title="gantt/templates/gantt/index.html"
    var dp = new gantt.dataProcessor("/data/");
    dp.init(gantt);
    dp.setTransactionMode("REST");
~~~

이제 작업 및 링크를 추가, 업데이트, 삭제할 수 있으며 변경 내용이 저장됩니다. 페이지를 새로 고치면 동일한 데이터 세트를 얻게 됩니다:

![saving_changes](/img/howtostart_django_gantt_savechanges.png)

## Storing the order of tasks {#storingtheorderoftasks}

DHTMLX Gantt는 클라이언트 측 라이브러리로, 작업의 순서를 저장하지 않습니다. 작업이 로드될 때 순서는 JSON 데이터의 위치에 따라 달라집니다. 따라서 작업의 순서를 저장하는 한 가지 방법은 Gantt에 데이터를 로드하기 전에 서버에서 작업을 정렬하는 것입니다. [상세 내용은 해당 문서](guides/server-side.md#storingtheorderoftasks)를 참고하세요.

하지만 이를 구현하는 또 다른 방법이 있습니다. 작업이 로드될 때, 세로 위치는 두 가지 매개변수에 따라 달라집니다: 부모 작업과 가지(branch)에서의 위치입니다. 부모 작업의 ID는 **parent** 매개변수에서 얻을 수 있습니다. 가지의 위치는 임시로 사용되는 **$local_index** 매개변수에 반영됩니다. 이 매개변수는 가지의 위치를 제어하지 않으므로 그것을 변경해도 아무 효과가 없습니다. 그러나 이를 사용해 가지 내의 위치를 얻고 다른 속성에 저장할 수 있습니다. 작업이 로드된 후에는 해당 속성의 값에 따라 작업을 정렬할 수 있습니다.

먼저, **sort_order** 속성을 Task 모델에 추가하려면 *gantt/models.py* 파일을 열고 다음과 같이 추가합니다:

~~~js title="gantt/models.py"
class Task(models.Model):
    id = models.AutoField(primary_key="True," editable="False)"
    text = models.CharField(blank="True," max_length="100)")
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.IntegerField()
    progress = models.FloatField()
    parent = models.CharField(max_length="100)"
    sort_order = models.IntegerField(default="0)")
~~~

다음으로 *gantt/serializers.py* 파일에 해당 속성을 추가합니다:

~~~js title="gantt/serializers.py"
class TaskSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    end_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    
    class Meta:
        model = Task
        fields = ('id', 'text', 'start_date', 'end_date', 'duration', 'progress', 
            'parent', 'sort_order')
~~~

데이터베이스에 적용하기 위해 아래 명령을 실행합니다:

~~~
python manage.py makemigrations gantt
python manage.py migrate
~~~

이제 작업을 추가하거나 수동으로 재정렬할 때마다 **sort_order** 속성을 업데이트하는 코드를 *index.html* 파일에 추가해야 합니다:

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

수직 재정렬을 활성화하려면 `gantt.init` 메서드 앞에 아래 코드를 추가합니다:

~~~
gantt.config.order_branch = "marker";
gantt.config.order_branch_free = true;
~~~

로딩 후 작업을 정렬하려면 `gantt.init` 또는 `gantt.load` 메서드 앞에 아래 코드를 추가합니다:

~~~
gantt.attachEvent("onLoadEnd", function () {
    gantt.batchUpdate(function () {
        gantt.sort("sort_order", false)
    })
});
~~~

결과적으로 코드는 아래와 같이 보입니다:

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

이제 서버를 시작하고 작업을 세로로 재정렬하면 변경 내용이 저장됩니다:

![sort_order](/img/howtostart_django_sortorder.png)

## 애플리케이션 보안

Gantt는 SQL 주입이나 XSS, CSRF 공격 등 다양한 위협으로부터 애플리케이션을 차단하는 수단을 제공하지 않습니다. 애플리케이션의 안전을 보장하는 책임은 백엔드를 구현하는 개발자에게 있습니다. 자세한 내용은 [해당 문서](guides/app-security.md)을 읽어보세요.

## Trouble shooting

위의 단계를 따라 Django와의 통합을 구현했지만 페이지에 작업과 링크가 렌더링되지 않는 경우, Backend Integration Issues 문제 해결 문서를 참조하세요. 문제의 원인을 식별하는 방법에 대해 설명합니다.

## What's next

이제 완전히 작동하는 간트를 갖추었습니다. 전체 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-django)에서 확인하거나 클론하거나 다운로드하여 프로젝트에 사용할 수 있습니다.

또한 [간트의 다양한 기능에 대한 가이드](guides.md)나 [다른 백엔드 프레임워크와의 통합 튜토리얼]( integrations/howtostart-guides.md)을 확인해 보세요.