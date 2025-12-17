---
title: "dhtmlxGantt와 Python"
sidebar_label: "Python"
---

dhtmlxGantt와 Python
=====================

이 가이드는 Django 4 프레임워크와 RESTful API를 백엔드로 사용하여 Python 기반의 Gantt 차트를 만드는 과정을 안내합니다.

다른 플랫폼을 사용하는 경우, 서버 사이드 통합을 위한 튜토리얼도 제공됩니다:

- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

:::note
전체 소스 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-django)에서 확인할 수 있습니다.
:::

사전 준비
-----------------

Django가 아직 설치되지 않았다면, 아래 설치 가이드를 참고하세요:

- [Windows 설치](https://docs.djangoproject.com/en/4.0/howto/windows/)
- [Linux 설치](https://linuxhint.com/install_django_ubuntu/)

1단계. 프로젝트 초기화
-----------------------

프로젝트 폴더를 연 뒤, 아래 명령어로 새 Django 프로젝트를 생성하세요:

~~~
django-admin startproject gantt_rest_python
~~~

다음으로, **gantt_rest_python** 폴더의 내용을 현재 디렉토리로 옮기거나 해당 폴더로 이동합니다:

~~~
cd gantt_rest_python
~~~

기본 설정이 정상적으로 되었는지 확인하려면 아래 명령어를 실행하세요:

~~~
python manage.py runserver
~~~

브라우저에서 http://localhost:8000 을 열면 Django 기본 환영 페이지가 나타납니다:

![start_page](/img/howtostart_django_startpage.png)

2단계. 페이지에 Gantt 추가하기
-----------------------

먼저 Gantt 컴포넌트를 위한 새 앱을 만듭니다:

~~~
python manage.py startapp gantt
~~~

REST framework 패키지를 설치하세요:

~~~
pip install djangorestframework
pip install djangorestframework-jsonapi
~~~

**gantt** 폴더 안에 **static**과 **templates** 디렉토리를 생성합니다.

Gantt 패키지의 *codebase* 폴더를 **static** 폴더에 복사한 후 **gantt**로 이름을 바꿔 내용을 명확히 표시하세요.

그 다음, **templates/gantt** 폴더에 *index.html* 파일을 아래 내용으로 생성하세요:

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

이 시점에서 폴더 구조는 다음과 같아야 합니다:

![folder_structure](/img/howtostart_django_folder.png)

**gantt** 폴더의 *views.py* 파일을 열고 아래 코드를 추가하세요:

**gantt/views.py**
~~~
from django.shortcuts import render

def index(request):
    return render(request, 'gantt/index.html')
~~~

다음으로, **gantt** 폴더에 *urls.py* 파일을 생성하고 아래와 같이 라우팅을 설정하세요:

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

**gantt_rest_python** 폴더의 *urls.py*에서 `urlpatterns`을 아래와 같이 수정하여 gantt 앱 라우트를 포함시키세요:

**gantt_rest_python/urls.py**
~~~
from django.urls import include, re_path
from django.contrib import admin

urlpatterns = [
    re_path(r'', include('gantt.urls')),
]
~~~

Django가 템플릿과 static 파일을 인식하도록 **gantt_rest_python**의 *settings.py*를 열어 상단에 아래 코드를 추가하세요:

**gantt_rest_python/settings.py**
~~~
import os
~~~

`TEMPLATES` 설정에서 빈 `DIRS` 배열을 찾아:

~~~
'DIRS': [],
~~~

아래와 같이 변경하세요:

~~~
'DIRS': [os.path.join(BASE_DIR, 'gantt/templates')],
~~~

마지막으로 static 파일 위치를 지정하기 위해 파일 끝에 아래 라인을 추가하세요:

~~~
STATICFILES_DIRS = [os.path.join(BASE_DIR, "gantt/static")]
~~~




서버를 다시 시작하세요:

~~~
python manage.py runserver
~~~

모든 설정이 올바르면, 빈 gantt 차트가 표시됩니다:

![init_gantt](/img/howtostart_django_initpage.png)

3단계. 데이터 불러오기
---------------------

*gantt_rest_python/settings.py*에서 `'rest_framework'`와 `'gantt.apps.GanttConfig'`를 `INSTALLED_APPS` 목록에 추가하고 REST framework 옵션을 설정하세요:

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

DHTMLX Gantt는 타임존이 없는 절대 날짜를 사용하므로 타임존 지원을 비활성화하세요:

~~~
USE_TZ = False
~~~

*gantt/models.py* 파일에 Task와 Link 모델을 정의하세요:

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

새 모델에 대한 마이그레이션을 생성하세요:

~~~
python manage.py makemigrations gantt
~~~

마이그레이션을 적용하여 데이터베이스 스키마를 업데이트하세요:

~~~
python manage.py migrate
~~~

초기 데이터를 추가하려면 Django shell을 실행하세요:

~~~
python manage.py shell
~~~

shell 내에서 현재 데이터를 확인하세요:

~~~
from gantt.models import Task
Task.objects.all()

from gantt.models import Link
Link.objects.all()
~~~

데이터베이스가 비어 있으므로, 아래와 같이 task와 link를 추가하세요:

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

이제 `Task.objects.all()` 및 `Link.objects.all()`을 실행하면 새로 추가한 항목이 반환됩니다.

직렬화를 처리하기 위해 **gantt** 폴더에 *serializers.py* 파일을 생성하세요:

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

*gantt/views.py* 파일을 업데이트하여 gantt 데이터를 반환하는 뷰를 추가하세요:

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

*gantt/urls.py*에 데이터 로딩 라우트를 추가하세요:

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

마지막으로 *gantt/templates/gantt/index.html* 파일을 수정하여 서버에서 데이터를 불러오도록 아래 코드를 추가하세요:

**gantt/templates/gantt/index.html**
~~~
gantt.load("/data/", "json");
~~~

이제 서버를 실행하면 task와 link가 채워진 gantt 차트가 표시됩니다:

![gantt](/img/howtostart_django_gantt.png)

4단계. 변경사항 저장하기
-------------------

변경사항 저장을 위해 *gantt/views.py*에 `POST`, `PUT`, `DELETE` 메서드 지원을 추가하세요:

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

*gantt/urls.py*에 아래와 같이 라우트를 추가하세요:

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

변경사항을 서버로 전송하려면 *gantt/templates/gantt/index.html*에서 Data Processor를 활성화하세요:

**gantt/templates/gantt/index.html**
~~~
    var dp = new gantt.dataProcessor("/data/");
    dp.init(gantt);
    dp.setTransactionMode("REST");
~~~

이제 task 및 link 추가, 수정, 삭제 시 변경사항이 저장됩니다. 페이지를 새로고침하면 저장된 데이터가 반영됩니다:

![saving_changes](/img/howtostart_django_gantt_savechanges.png)

## 작업 순서 저장하기 {#storingtheorderoftasks}

DHTMLX Gantt는 클라이언트 사이드이므로 작업 순서를 별도로 저장하지 않습니다. 순서는 JSON 데이터의 배열 순서에 따라 달라집니다. 한 가지 방법은 서버에서 작업을 정렬하여 Gantt에 전달하는 것입니다. [자세한 내용은 여기](guides/server-side.md#storingtheorderoftasks)에서 확인하세요.

또 다른 방법은 부모 작업과 브랜치 내 위치를 활용하는 것입니다. 부모 ID는 **parent** 필드에, 브랜치 내 위치는 임시 **$local_index** 속성에 있습니다. **$local_index**를 변경해도 표시에는 영향이 없지만, 이를 별도 속성에 저장하여 순서를 추적할 수 있습니다. 로드 후 해당 속성으로 작업을 정렬할 수 있습니다.

먼저 *gantt/models.py*의 Task 모델에 **sort_order** 필드를 추가하세요:

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

*gantt/serializers.py*의 serializer에도 **sort_order**를 포함시키세요:

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

변경사항을 데이터베이스에 반영하세요:

~~~
python manage.py makemigrations gantt
python manage.py migrate
~~~

다음으로 *index.html*을 업데이트하여 작업 추가 또는 재정렬 시 **sort_order**를 조정하세요:

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

아래 코드를 `gantt.init` 전에 추가하여 수직 정렬을 활성화하세요:

~~~
gantt.config.order_branch = "marker";
gantt.config.order_branch_free = true;
~~~

데이터 로드 후 작업을 정렬하려면 `gantt.init` 또는 `gantt.load` 전에 아래 코드를 추가하세요:

~~~
gantt.attachEvent("onLoadEnd", function () {
    gantt.batchUpdate(function () {
        gantt.sort("sort_order", false)
    })
});
~~~

모든 내용을 반영한 *index.html*의 주요 부분은 다음과 같습니다:

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

이 설정으로 작업을 수직으로 재배열하면 순서가 저장됩니다:

![sort_order](/img/howtostart_django_sortorder.png)

애플리케이션 보안
-------------------------

DHTMLX Gantt는 SQL 인젝션, XSS, CSRF와 같은 위협에 대한 내장 보호 기능을 포함하지 않습니다. 백엔드에서 애플리케이션을 안전하게 만드는 것은 개발자의 책임입니다. 자세한 내용은 [보안 관련 문서](guides/app-security.md)를 참고하세요.

문제 해결
-----------------

통합 후 작업과 링크가 표시되지 않는 경우 [백엔드 통합 문제 해결](guides/troubleshooting.md)의 가이드에서 일반적인 문제 해결 방법을 확인하세요.

다음 단계
------------

이제 동작하는 Gantt 차트 애플리케이션이 완성되었습니다. 전체 소스 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-django)에서 복제하거나 다운로드하여 프로젝트에 사용할 수 있습니다.

또한 [다양한 Gantt 기능 가이드](guides.md)나 [다른 백엔드 프레임워크와의 통합 튜토리얼](integrations/howtostart-guides.md)도 참고해 보세요.
