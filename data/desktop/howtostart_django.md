dhtmlxGantt with Django
=====================

This tutorial will teach you how to create a Django 4 application with the REST framework and add DHTMLX Gantt there.

There are tutorials intended for building server-side integration with the help of other platforms:

- desktop/howtostart_dotnet.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_dotnet_core.md
- desktop/howtostart_php_laravel.md
- desktop/howtostart_php_slim4.md
- desktop/howtostart_salesforce.md
- desktop/howtostart_ruby.md

{{note
The complete source code is [available on GitHub]().
}}

Prerequisites
-----------------

Install Django if you don’t have it:

- [for Windows](https://docs.djangoproject.com/en/4.0/howto/windows/)
- [for Linux](https://linuxhint.com/install_django_ubuntu/)

Step 1. Initializing a project
-----------------------

Open your project folder and create a new Django project with the following command:

~~~
django-admin startproject gantt_rest_python
~~~

After that, you can move the content of the **gantt_rest_python** folder to the project folder or navigate to the newly created folder:

~~~
cd gantt_rest_python
~~~

To check that the basic application works fine, go to the application folder and run the command:

~~~
python manage.py runserver
~~~

Now you can open the http://localhost:8000 URL in a browser and you should see the default page there:

![start_page](desktop\howtostart_django_startpage.png)

Step 2. Adding Gantt to the page
-----------------------

Now we can start creating a Gantt component. Run the following command:

~~~
python manage.py startapp gantt
~~~

Install the REST framework:

~~~
pip install djangorestframework
pip install djangorestframework-jsonapi
~~~

Open the **gantt** folder and create the **static** and **templates** folders in it.

Copy the content of the *codebase* folder from the Gantt package into the **static** folder. Rename it to **gantt** to specify which component the files belong to.

After that, create a *index.html* file in the **templates/gantt** folder and add the following code there:

{{snippet gantt/templates/gantt/index.html}}
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

For now, you should have the following folder structure:

![folder_structure](desktop/howtostart_django_folder.png)


Open the *views.py* file in the **gantt** folder and add the following code there:

{{snippet gantt/views.py}}
~~~
from django.shortcuts import render

def index(request):
	return render(request, 'gantt/index.html')
~~~


Now we need to add routing. Create the *urls.py* file in the **gantt** folder and add the following code into it:

{{snippet gantt/views.py}}
~~~
from django.urls import include, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
]
urlpatterns = format_suffix_patterns(urlpatterns)
~~~

Open the *urls.py* file in the **gantt_rest_python** folder. We need to update `urlpatterns`. The code of the file must look like this:

{{snippet gantt_rest_python/urls.py}}
~~~
from django.urls import include, re_path
from django.contrib import admin

urlpatterns = [
    re_path(r'', include('gantt.urls')),
]
~~~

Now, we need to define the paths for the **templates** and **static** folders in the settings. For that, open the *settings.py* file in the **gantt_rest_python** folder and add the following line to the beginning of the file:

{{snippet gantt_rest_python/settings.py}}
~~~
import os
~~~

Find the `TEMPLATES` array. There, we need the `DIRS` property that has an empty array:

~~~
    'DIRS': [],
~~~

You need to replace it with the following string:

~~~
    'DIRS': [os.path.join(BASE_DIR, 'gantt/templates')],
~~~

Then, add the following line to the bottom of the file:

~~~
STATICFILES_DIRS = [os.path.join(BASE_DIR, "gantt/static")]
~~~

<br>
Now, you can start the server with the command:

~~~
python manage.py runserver
~~~ 

If everything is done correctly, you should see the page with an empty gantt:

![init_gantt](desktop\howtostart_django_initpage.png)


Step 3. Loading data
---------------------

Open the *gantt_rest_python/settings.py* file. Add the `'rest_framework'` and `'gantt.apps.GanttConfig'` strings to the `INSTALLED_APPS` array. Then add the `REST_FRAMEWORK` configuration:

{{snippet gantt_rest_python/settings.py}}
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

DHTMLX Gantt uses absolute dates that are not bound to the timezone (you can change it later), so we need to disable the `USE_TZ` parameter:

~~~
USE_TZ = False
~~~

Let’s create the `Task` and `Link` models. Open the `gantt/models.py` file and add the following code:

{{snippet gantt/models.py}}
~~~
from django.db import models

class Task(models.Model):
	id = models.AutoField(primary_key=True, editable=False)
	text = models.CharField(blank=True, max_length=100)
	start_date = models.DateTimeField()
	end_date = models.DateTimeField()
	duration = models.IntegerField()
	progress = models.FloatField()
	parent = models.CharField(max_length=100)

class Link(models.Model):
	id = models.AutoField(primary_key=True, editable=False)
	source = models.CharField(max_length=100)
	target = models.CharField(max_length=100)
	type = models.CharField(max_length=100)
	lag = models.IntegerField(blank=True, default=0)
~~~

Now we should configure the database. To create migrations use following command:

~~~
python manage.py makemigrations gantt
~~~

After that, we can create the table in the database:

~~~
python manage.py migrate
~~~

Let’s check the database and add several records. First, run the command:

~~~
python manage.py shell
~~~

In the python shell, you can run the following commands to check the database:

~~~
from gantt.models import Task
Task.objects.all()

from gantt.models import Link
Link.objects.all()
~~~

You will see the following output:

~~~
>>> from gantt.models import Task
>>> Task.objects.all()
<QuerySet []>
>>>  
>>> from gantt.models import Link
>>> Link.objects.all()
<QuerySet []>
~~~

It means that there are no tasks and links in the database. Let's add some tasks and links with the following commands:

~~~
t1=Task(id="10",text="Project #1",start_date="2025-04-01 00:00",
    end_date="2025-04-03 00:00",duration=2,progress=0.5,parent="0")
t1.save()
t1=Task(id="1", text="Task #1",start_date="2025-04-01 00:00",
    end_date="2025-04-02 00:00", duration=1, progress=0.45, parent="10")
t1.save()
t1=Task(id="2", text="Task #2",start_date="2025-04-02 00:00",
    end_date="2025-04-03 00:00", duration=1, progress=0.15, parent="10")
t1.save()
t1=Task(id="20", text="Project #2",start_date="2025-04-03 00:00",
    end_date="2025-04-05 00:00", duration=2, progress=0.35, parent="0")
t1.save()
t1=Task(id="3", text="Task #3",start_date="2025-04-03 00:00",
    end_date="2025-04-04 00:00", duration=1, progress=0.85, parent="20")
t1.save()
t1=Task(id="4", text="Task #4",start_date="2025-04-04 00:00",
    end_date="2025-04-06 00:00", duration=1, progress=0.65, parent="20")
t1.save()

l1=Link(id="1",source="1",target="2",type="0",lag=0)
l1.save()
l1=Link(id="2",source="2",target="3",type="0",lag=0)
l1.save()
l1=Link(id="3",source="3",target="4",type="0",lag=0)
l1.save()
~~~

Now, if we run `Task.objects.all()` and `Link.objects.all()`, we should see 6 Task objects and 3 Link objects in the database:

~~~
>>> Task.objects.all()
<QuerySet [<Task: Task object (1)>, <Task: Task object (2)>, <Task: Task object (3)>, 
<Task: Task object (4)>, <Task: Task object (10)>, <Task: Task object (20)>]>
>>> Link.objects.all()
<QuerySet [<Link: Link object (1)>, <Link: Link object (2)>, <Link: Link object (3)>]>
~~~

We need to provide a way of serializing and deserializing the `Task` and `Link` instances. For this purpose, create the *serializers.py* file in the **gantt** folder and add the following code there:

{{snippet gantt/serializers.py}}
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

Add the action returning gantt data. Open the *gantt/views.py* file and add the following code there:

{{snippet gantt/views.py}}
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
        taskData = TaskSerializer(tasks, many=True)
        linkData = LinkSerializer(links, many=True)
        return Response({
            "tasks": taskData.data,
            "links": linkData.data
        })
~~~

Now, we need to add the routes for loading data. Open the *gantt/urls.py* file and add the following code:

{{snippet gantt/urls.py}}
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

Finally, we can add the following line to the *gantt/templates/gantt/index.html* file to load the data from the server:

{{snippet gantt/templates/gantt/index.html}}
~~~
gantt.load("/data/", "json");
~~~

Now if we run the `python manage.py runserver` command, we should see Gantt with tasks and links.

![gantt](desktop\howtostart_django_gantt.png)










Step 4. Loading data
-------------------



Step 5. Saving changes
-----------------------------------



Storing the order of tasks
------------------




Application security
-------------------------

Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend. Read the details [in the corresponding article](desktop/app_security.md).


Trouble shooting
-----------------

In case you've completed the above steps to implement Gantt integration with PHP but Gantt doesn't render tasks and links on a page, have a look at the desktop/troubleshooting.md article. It describes 
the ways of identifying the roots of the problems.

What's next
------------

Now you have a fully functioning gantt. You can view the full code on [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel), clone or download it and use it for your projects.

You can also check [guides on the numerous features of gantt](desktop/guides.md) or tutorials on [integrating Gantt with other backend frameworks](desktop/howtostart_guides.md).