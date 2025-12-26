---
title: "dhtmlxGantt mit Python"
sidebar_label: "Python"
---

# dhtmlxGantt mit Python

Diese Anleitung führt durch die Erstellung eines Gantt-Diagramms auf Python-Basis mit dem Django 4 Framework und einer RESTful API im Backend.

Wenn Sie mit anderen Plattformen arbeiten, gibt es Tutorials für die serverseitige Integration mit:

- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

:::note
Der vollständige Quellcode ist auf [GitHub](https://github.com/DHTMLX/gantt-howto-django) verfügbar.
:::

## Voraussetzungen

Falls Django noch nicht installiert ist, finden Sie hier Installationsanleitungen:

- [Windows-Setup](https://docs.djangoproject.com/en/4.0/howto/windows/)
- [Linux-Setup](https://linuxhint.com/install_django_ubuntu/)

## Schritt 1. Projekt initialisieren

Öffnen Sie zunächst Ihren Projektordner und erstellen Sie mit folgendem Befehl ein neues Django-Projekt:

~~~
django-admin startproject gantt_rest_python
~~~

Verschieben Sie anschließend den Inhalt des **gantt_rest_python**-Ordners in Ihr aktuelles Verzeichnis oder wechseln Sie in diesen Ordner:

~~~
cd gantt_rest_python
~~~

Um die Grundkonfiguration zu überprüfen, führen Sie aus:

~~~
python manage.py runserver
~~~

Öffnen Sie http://localhost:8000 in Ihrem Browser - die Standard-Willkommensseite von Django sollte erscheinen:

![start_page](/img/howtostart_django_startpage.png)

## Schritt 2. Gantt auf der Seite einbinden

Beginnen Sie mit der Erstellung einer neuen App für die Gantt-Komponente:

~~~
python manage.py startapp gantt
~~~

Installieren Sie die REST Framework Pakete:

~~~
pip install djangorestframework
pip install djangorestframework-jsonapi
~~~

Erstellen Sie innerhalb des **gantt**-Ordners die Verzeichnisse **static** und **templates**.

Kopieren Sie den *codebase*-Ordner aus dem Gantt-Paket in den **static**-Ordner und benennen Sie ihn in **gantt** um, um den Inhalt eindeutig zu kennzeichnen.

Erstellen Sie dann eine Datei *index.html* in **templates/gantt** mit folgendem Inhalt:

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

Zu diesem Zeitpunkt sollte Ihre Ordnerstruktur wie folgt aussehen:

![folder_structure](/img/howtostart_django_folder.png)

Öffnen Sie *views.py* im **gantt**-Ordner und fügen Sie hinzu:

**gantt/views.py**
~~~
from django.shortcuts import render

def index(request):
    return render(request, 'gantt/index.html')
~~~

Richten Sie als nächstes das Routing ein, indem Sie *urls.py* im **gantt**-Ordner erstellen:

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

Aktualisieren Sie in der *urls.py* des **gantt_rest_python**-Ordners die `urlpatterns`, um die Routen der Gantt-App einzubinden:

**gantt_rest_python/urls.py**
~~~
from django.urls import include, re_path
from django.contrib import admin

urlpatterns = [
    re_path(r'', include('gantt.urls')),
]
~~~

Damit Django Ihre Templates und statischen Dateien erkennt, öffnen Sie *settings.py* in **gantt_rest_python** und fügen Sie am Anfang hinzu:

**gantt_rest_python/settings.py**
~~~
import os
~~~

Suchen Sie die Einstellung `TEMPLATES` und ersetzen Sie das leere `DIRS`-Array:

~~~
'DIRS': [],
~~~

durch:

~~~
'DIRS': [os.path.join(BASE_DIR, 'gantt/templates')],
~~~

Fügen Sie am Ende der Datei folgende Zeile hinzu, um den Speicherort der statischen Dateien anzugeben:

~~~
STATICFILES_DIRS = [os.path.join(BASE_DIR, "gantt/static")]
~~~


Starten Sie den Server erneut:

~~~
python manage.py runserver
~~~

Wenn alles korrekt eingerichtet ist, erscheint eine leere Gantt-Ansicht:

![init_gantt](/img/howtostart_django_initpage.png)

## Schritt 3. Daten laden

Fügen Sie in *gantt_rest_python/settings.py* `'rest_framework'` und `'gantt.apps.GanttConfig'` zur Liste `INSTALLED_APPS` hinzu und konfigurieren Sie die REST Framework Optionen:

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

Da DHTMLX Gantt absolute Datumsangaben ohne Zeitzonenbindung verwendet, deaktivieren Sie die Zeitzonenunterstützung:

~~~
USE_TZ = False
~~~

Definieren Sie die Task- und Link-Modelle in *gantt/models.py*:

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

Erstellen Sie Migrationen für die neuen Modelle:

~~~
python manage.py makemigrations gantt
~~~

Wenden Sie die Migrationen an, um das Datenbankschema zu aktualisieren:

~~~
python manage.py migrate
~~~

Um erste Daten hinzuzufügen, öffnen Sie die Django-Shell:

~~~
python manage.py shell
~~~

Überprüfen Sie in der Shell die aktuellen Daten:

~~~
from gantt.models import Task
Task.objects.all()

from gantt.models import Link
Link.objects.all()
~~~

Da die Datenbank leer ist, fügen Sie Aufgaben und Verknüpfungen wie folgt hinzu:

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

Wenn Sie nun `Task.objects.all()` und `Link.objects.all()` ausführen, sollten die neu hinzugefügten Einträge angezeigt werden.

Um die Serialisierung zu ermöglichen, erstellen Sie *serializers.py* im **gantt**-Ordner:

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

Erweitern Sie *gantt/views.py* um eine View, die die Gantt-Daten zurückgibt:

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

Fügen Sie die Datenlade-Routen in *gantt/urls.py* hinzu:

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

Aktualisieren Sie abschließend die Datei *gantt/templates/gantt/index.html*, um die Daten vom Server zu laden, indem Sie Folgendes hinzufügen:

**gantt/templates/gantt/index.html**
~~~
gantt.load("/data/", "json");
~~~

Wenn Sie den Server jetzt starten, wird das Gantt-Diagramm mit Aufgaben und Verknüpfungen angezeigt:

![gantt](/img/howtostart_django_gantt.png)

## Schritt 4. Änderungen speichern

Um das Speichern von Änderungen zu ermöglichen, fügen Sie Unterstützung für die Methoden `POST`, `PUT` und `DELETE` in *gantt/views.py* hinzu:

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

Fügen Sie die entsprechenden Routen in *gantt/urls.py* hinzu:

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

Um Änderungen an den Server zu senden, aktivieren Sie den Data Processor in *gantt/templates/gantt/index.html*:

**gantt/templates/gantt/index.html**
~~~
    var dp = new gantt.dataProcessor("/data/");
    dp.init(gantt);
    dp.setTransactionMode("REST");
~~~

Mit dieser Konfiguration werden hinzugefügte, geänderte oder gelöschte Aufgaben und Verknüpfungen dauerhaft gespeichert. Nach dem Neuladen der Seite bleiben die Daten erhalten:

![saving_changes](/img/howtostart_django_gantt_savechanges.png)

## Speichern der Aufgabenreihenfolge {#storingtheorderoftasks}

Da DHTMLX Gantt clientseitig arbeitet, wird die Aufgabenreihenfolge nicht automatisch gespeichert. Die Reihenfolge ergibt sich aus der Reihenfolge der JSON-Daten. Eine Möglichkeit ist, die Aufgaben serverseitig vor dem Senden an Gantt zu sortieren. [Mehr Details hier](guides/server-side.md#storingtheorderoftasks).

Eine andere Methode nutzt das Elternelement (parent) und die Position im Zweig. Die Eltern-ID steht im Feld **parent**, die Position im Zweig entspricht der temporären Eigenschaft **$local_index**. Eine Änderung von **$local_index** beeinflusst die Anzeige zwar nicht, kann aber genutzt werden, um die Aufgabenreihenfolge zu speichern. Nach dem Laden können Aufgaben anhand dieser Eigenschaft sortiert werden.

Fügen Sie zunächst ein Feld **sort_order** zum Task-Modell in *gantt/models.py* hinzu:

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

Erweitern Sie den Serializer in *gantt/serializers.py* um **sort_order**:

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

Übernehmen Sie die Änderungen in die Datenbank:

~~~
python manage.py makemigrations gantt
python manage.py migrate
~~~

Aktualisieren Sie anschließend *index.html*, um **sort_order** bei Hinzufügen oder Umordnen von Aufgaben zu setzen:

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

Aktivieren Sie das vertikale Umordnen, indem Sie dies vor `gantt.init` hinzufügen:

~~~
gantt.config.order_branch = "marker";
gantt.config.order_branch_free = true;
~~~

Um Aufgaben nach dem Laden zu sortieren, fügen Sie dies vor `gantt.init` oder `gantt.load` hinzu:

~~~
gantt.attachEvent("onLoadEnd", function () {
    gantt.batchUpdate(function () {
        gantt.sort("sort_order", false)
    })
});
~~~

Zusammengefasst sieht der relevante Teil von *index.html* so aus:

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

Mit dieser Konfiguration wird beim vertikalen Umordnen die neue Reihenfolge gespeichert:

![sort_order](/img/howtostart_django_sortorder.png)

## Sicherheit der Anwendung

DHTMLX Gantt bietet keinen integrierten Schutz gegen Bedrohungen wie SQL-Injection, XSS oder CSRF. Die Absicherung der Anwendung liegt in der Verantwortung des Entwicklers auf der Serverseite. Weitere Informationen finden Sie im [Sicherheitsartikel](guides/app-security.md).

## Fehlerbehebung

Wenn nach der Integration Aufgaben und Verknüpfungen nicht angezeigt werden, hilft der Leitfaden in [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) weiter. Dort finden Sie Tipps zur Identifikation und Behebung häufiger Probleme.

## Wie geht es weiter

Sie haben nun eine funktionierende Gantt-Anwendung. Der vollständige Quellcode steht auf [GitHub](https://github.com/DHTMLX/gantt-howto-django) zum Klonen oder Herunterladen bereit.

Sie können auch die [Anleitungen zu verschiedenen Gantt-Funktionen](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) erkunden.
