---  
title: "dhtmlxGantt mit Python"  
sidebar_label: "Python"  
---  

# dhtmlxGantt mit Python

Diese Anleitung zeigt Ihnen, wie Sie ein Python-basiertes Gantt mit dem Django 4-Framework und einer RESTful API auf dem Server erstellen.

Es gibt Tutorials, die darauf abzielen, die serverseitige Integration mit Hilfe anderer Plattformen zu erstellen:

- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

:::note  
Der komplette Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-django).  
:::

## Voraussetzungen

Installieren Sie Django, falls Sie es noch nicht installiert haben:

- [für Windows](https://docs.djangoproject.com/en/4.0/howto/windows/)
- [für Linux](https://linuxhint.com/install_django_ubuntu/)

## Schritt 1. Projekt initialisieren

Öffnen Sie Ihren Projektordner und erstellen Sie ein neues Django-Projekt mit dem folgenden Befehl:

~~~  
django-admin startproject gantt_rest_python  
~~~

Danach können Sie entweder den Inhalt des Ordners **gantt_rest_python** in den aktuellen Ordner verschieben oder zu diesem Ordner wechseln:

~~~  
cd gantt_rest_python  
~~~

Um zu prüfen, ob die Grundanwendung funktioniert, führen Sie den folgenden Befehl im Projektordner aus:

~~~  
python manage.py runserver  
~~~

Nun können Sie die URL http://localhost:8000 in einem Browser öffnen und dort die Standardseite sehen:

![start_page](/img/howtostart_django_startpage.png)

## Schritt 2. Gantt zur Seite hinzufügen

Nun können wir damit beginnen, eine Gantt-Komponente zu erstellen. Führen Sie den folgenden Befehl aus:

~~~  
python manage.py startapp gantt  
~~~

Installieren Sie das REST Framework:

~~~  
pip install djangorestframework
pip install djangorestframework-jsonapi
~~~

Öffnen Sie den Ordner **gantt** und erstellen Sie darin die Ordner **static** und **templates**.

Kopieren Sie den Inhalt des *codebase*-Ordners aus dem Gantt-Paket in den Ordner **static**. Benennen Sie ihn in **gantt** um, um anzugeben, zu welchem Bestandteil die Dateien gehören.

Erstellen Sie anschließend eine *index.html*-Datei im Ordner **templates/gantt** und fügen Sie dort folgenden Code ein:

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

Zurzeit sollten Sie die folgende Ordnerstruktur haben:

![folder_structure](/img/howtostart_django_folder.png)

Öffnen Sie die *views.py*-Datei im **gantt**-Ordner und fügen Sie dort folgenden Code ein:

~~~py title="gantt/views.py"  
from django.shortcuts import render  

def index(request):  
    return render(request, 'gantt/index.html')  
~~~  

Nun müssen wir das Routing hinzufügen. Erstellen Sie die *urls.py*-Datei im **gantt**-Ordner und fügen Sie folgenden Code ein:

~~~py title="gantt/urls.py"  
from django.urls import include, re_path  
from . import views  
from rest_framework.urlpatterns import format_suffix_patterns  

urlpatterns = [  
    re_path(r'^$', views.index, name='index'),  
]  
urlpatterns = format_suffix_patterns(urlpatterns)  
~~~  

Öffnen Sie die *urls.py*-Datei im Ordner **gantt_rest_python**. Wir müssen `urlpatterns` aktualisieren. Der aktualisierte Code muss so aussehen:

~~~py title="gantt_rest_python/urls.py"  
from django.urls import include, re_path  
from django.contrib import admin  

urlpatterns = [  
    re_path(r'', include('gantt.urls')),  
]  
~~~  

Nun müssen die Pfade für die Ordner **templates** und **static** in den Einstellungen definiert werden. Öffnen Sie dazu die Datei *settings.py* im Ordner **gantt_rest_python** und fügen Sie am Anfang der Datei folgende Zeile hinzu:

~~~py title="gantt_rest_python/settings.py"  
import os  
~~~  

Finden Sie das `TEMPLATES`-Array. Dort benötigen wir die Eigenschaft `DIRS`, die ein leeres Array hat:

~~~  
'DIRS': [],  
~~~  

Sie müssen es durch folgende Zeichenkette ersetzen:

~~~  
'DIRS': [os.path.join(BASE_DIR, 'gantt/templates')],  
~~~  

Fügen Sie anschließend am unteren Ende der Datei folgende Zeile hinzu:

~~~  
STATICFILES_DIRS = [os.path.join(BASE_DIR, "gantt/static")]  
~~~

Nun können Sie den Server mit dem Befehl starten:

~~~  
python manage.py runserver  
~~~ 

Wenn alles korrekt erledigt ist, sollten Sie die Seite mit einem leeren Gantt sehen:

![init_gantt](/img/howtostart_django_initpage.png)

## Schritt 3. Laden von Daten

Öffnen Sie die Datei *gantt_rest_python/settings.py*. Fügen Sie die Strings `'rest_framework'` und `'gantt.apps.GanttConfig'` zum Array `INSTALLED_APPS` hinzu. Fügen Sie dann die REST_FRAMEWORK-Konfiguration hinzu:

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

DHTMLX Gantt verwendet absolute Daten, die nicht an die Zeitzone gebunden sind (Sie können dies später ändern), daher müssen wir den **USE_TZ**-Parameter deaktivieren:

~~~  
USE_TZ = False  
~~~  

Erstellen wir die Modelle Task und Link in der *gantt/models.py*-Datei:

~~~py title="gantt/models.py"  
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

Nun sollten wir die Datenbank konfigurieren. Um Migrationen zu erstellen, verwenden Sie den Befehl:

~~~  
python manage.py makemigrations gantt  
~~~  

Danach können wir die Tabelle in der Datenbank erstellen:

~~~  
python manage.py migrate  
~~~  

Sehen wir uns die Datenbank an und fügen mehrere Datensätze hinzu. Führen Sie zuerst den Befehl aus:

~~~  
python manage.py shell  
~~~  

In der Python-Shell können Sie die folgenden Befehle ausführen, um die Datenbank zu prüfen:

~~~  
from gantt.models import Task  
Task.objects.all()  

from gantt.models import Link  
Link.objects.all()  
~~~  

Sie sollten die folgende Ausgabe sehen:

~~~  
>>> from gantt.models import Task  
>>> Task.objects.all()  
<QuerySet []>  
>>>  
>>> from gantt.models import Link  
>>> Link.objects.all()  
<QuerySet []>  
~~~  

Es bedeutet, dass keine Aufgaben und Verknüpfungen in der Datenbank vorhanden sind. Wir können sie mit den folgenden Befehlen hinzufügen:

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

l1=Link(id="1",source="1",target="2",type="0",lag="0)"  
l1.save()  
l1=Link(id="2",source="2",target="3",type="0",lag="0)"  
l1.save()  
l1=Link(id="3",source="3",target="4",type="0",lag="0)"  
l1.save()  
~~~  

Wenn Sie nun `Task.objects.all()` und `Link.objects.all()` ausführen, sollten Sie 6 Task-Objekte und 3 Link-Objekte in der Datenbank sehen:

~~~  
>>> Task.objects.all()  
<QuerySet [<Task: Task object (1)>, <Task: Task object (2)>, <Task: Task object (3)>,  
<Task: Task object (4)>, <Task: Task object (10)>, <Task: Task object (20)>]>  
>>> Link.objects.all()  
<QuerySet [<Link: Link object (1)>, <Link: Link object (2)>, <Link: Link object (3)>]>  
~~~  

Wir müssen eine Möglichkeit für die Serialisierung und Deserialisierung der Task- und Link-Instanzen bereitstellen. Erstellen Sie dazu die Datei *serializers.py* im Ordner **gantt** und fügen Sie dort folgenden Code ein:

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

Danach gehen Sie zur Datei *gantt/views.py* und fügen die Aktion hinzu, die die Gantt-Daten zurückgibt:

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
        taskData = TaskSerializer(tasks, many="True)?"  
        linkData = LinkSerializer(links, many="True)?"  
        return Response({  
            "tasks": taskData.data,  
            "links": linkData.data  
        })  
~~~  

Nun, öffnen Sie die Datei *gantt/urls.py*. Wir müssen die Routen zum Laden der Daten hinzufügen:

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

Schließlich können wir folgende Zeile in die Datei *gantt/templates/gantt/index.html* einfügen, um die Daten vom Server zu laden:

~~~js title="gantt/templates/gantt/index.html"  
gantt.load("/data/", "json");  
~~~  

Wenn Sie jetzt den Befehl `python manage.py runserver` ausführen, sollten Sie unser Gantt mit Aufgaben und Verknüpfungen sehen:

![gantt](/img/howtostart_django_gantt.png)

## Schritt 4. Änderungen speichern

Um die Änderungen zu speichern, müssen Sie die Methoden zum Verarbeiten der Anfragen `POST`, `PUT` und `DELETE` hinzufügen. Öffnen Sie dazu die Datei *gantt/views.py* und fügen Sie dort folgenden Code ein:

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
        taskData = TaskSerializer(tasks, many="True)?"  
        linkData = LinkSerializer(links, many="True)?"  
        return Response({  
            "tasks": taskData.data,  
            "links": linkData.data  
        })  


@api_view(['POST'])  
def task_add(request):  
    if request.method == 'POST':  
        serializer = TaskSerializer(data="request.data)");  
        print(serializer)  

        if serializer.is_valid():  
            task = serializer.save()  
            return JsonResponse({'action':'inserted', 'tid': task.id})  
        return JsonResponse({'action':'error'})  
    \  
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

Gehen Sie nun zur Datei *gantt/urls.py*. Hier müssen wir die Routen für die Anfragen wie folgt hinzufügen:

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

Um die Änderungen zum Server zu senden, verwenden Sie den Data Processor. Fügen Sie folgenden Code in die Datei *gantt/templates/gantt/index.html* ein:

~~~js title="gantt/templates/gantt/index.html"  
    var dp = new gantt.dataProcessor("/data/");  
    dp.init(gantt);  
    dp.setTransactionMode("REST");  
~~~  

Nun können Sie Aufgaben und Verknüpfungen hinzufügen, aktualisieren und löschen, und die Änderungen werden gespeichert. Wenn Sie die Seite neu laden, haben Sie denselben Datensatz:

![saving_changes](/img/howtostart_django_gantt_savechanges.png)

## Speichern der Reihenfolge der Aufgaben {#storingtheorderoftasks}

DHTMLX Gantt ist eine clientseitige Bibliothek. Es speichert nicht die Reihenfolge der Aufgaben. Wenn die Aufgaben geladen werden, hängt deren Reihenfolge von der Position in den JSON-Daten ab. Eine der Möglichkeiten, die Reihenfolge der Aufgaben zu speichern, besteht darin, die Aufgaben auf dem Server vor dem Laden der Daten in Gantt zu sortieren. [Details lesen](guides/server-side.md#storingtheorderoftasks).

Aber es gibt noch eine andere Möglichkeit. Wenn die Aufgaben geladen werden, hängt ihre vertikale Position von 2 Parametern ab: ihrer übergeordneten Aufgabe (Parent-Aufgabe) und ihrer Position im Zweig (unter der übergeordneten Aufgabe). Die ID der übergeordneten Aufgabe erhalten Sie aus dem Parameter **parent**. Die Position im Zweig wird im temporären Parameter **$local_index** reflektiert. Dieser Parameter steuert nicht die Position im Zweig, daher wirkt sich eine Änderung nicht aus. Sie können ihn jedoch verwenden, um die Position innerhalb des Zweigs zu ermitteln und in einer anderen Eigenschaft zu speichern. Nachdem die Aufgaben geladen wurden, können Sie Aufgaben nach dem Wert dieser Eigenschaft sortieren.

Öffnen Sie zunächst die Datei *gantt/models.py* und fügen Sie die **sort_order**-Eigenschaft dem Task-Modell hinzu:

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

Dann müssen Sie diese Eigenschaft in die *gantt/serializers.py*-Datei aufnehmen:

~~~js title="gantt/serializers.py"  
class TaskSerializer(serializers.ModelSerializer):  
    start_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')  
    end_date = serializers.DateTimeField(format='%Y-%m-%d %H:%M')  
    
    class Meta:  
        model = Task  
        fields = ('id', 'text', 'start_date', 'end_date', 'duration', 'progress',  
            'parent', 'sort_order')  
~~~  

Um die Änderungen in der Datenbank anzuwenden, führen Sie die folgenden Befehle aus:

~~~  
python manage.py makemigrations gantt  
python manage.py migrate  
~~~  

Nun müssen Sie den Code in der *index.html*-Datei hinzufügen, um die Eigenschaft **sort_order** bei jedem Hinzufügen einer Aufgabe oder beim manuell neuordnen der Aufgaben zu aktualisieren:

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

Um eine vertikale Neuordnung zu ermöglichen, fügen Sie den folgenden Code vor der `gantt.init`-Methode hinzu:

~~~  
gantt.config.order_branch = "marker";  
gantt.config.order_branch_free = true;  
~~~  

Um Aufgaben nach dem Laden zu sortieren, fügen Sie den folgenden Code vor den Methoden `gantt.init` oder `gantt.load` hinzu:

~~~  
gantt.attachEvent("onLoadEnd", function () {  
    gantt.batchUpdate(function () {  
        gantt.sort("sort_order", false)  
    })  
});  
~~~  

Folglich muss der Code so aussehen:

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

Wenn Sie den Server starten und Aufgaben vertikal neu sortieren, werden die Änderungen gespeichert:

![sort_order](/img/howtostart_django_sortorder.png)

## Anwendungssicherheit

Gantt bietet keinerlei Mechanismen zum Schutz einer Anwendung vor verschiedenen Bedrohungen, wie SQL-Injections oder XSS- bzw. CSRF-Angriffen. Es liegt in der Verantwortung der Entwickler, die Backend-seitig implementiert werden, dafür zu sorgen, dass eine Anwendung sicher ist. Lesen Sie die Details [im entsprechenden Artikel](guides/app-security.md).

## Troubleshooting

Falls Sie die obigen Schritte zur Integration von Gantt mit Django abgeschlossen haben, Gantt aber keine Aufgaben und Verknüpfungen auf einer Seite rendert, schauen Sie sich den Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) an. Er beschreibt  
Möglichkeiten zur Identifizierung der Ursachen der Probleme.

## What's next

Nun haben Sie ein voll funktionsfähiges Gantt. Den vollständigen Code können Sie auf [GitHub](https://github.com/DHTMLX/gantt-howto-django) einsehen, klonen oder herunterladen und für Ihre Projekte verwenden.

Sie können auch die [Guides zu den zahlreichen Funktionen von gantt](guides.md) oder Tutorials zu [der Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) prüfen.