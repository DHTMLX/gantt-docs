dhtmlxGantt with Ruby on Rails 
=========================

In this article we'll show you how to create a Gantt chart with [Ruby on Rails](http://rubyonrails.org/) backend.
For implementing this app we'll be using Ruby 2.4.1, Rails 5.1.3 and MySQL. This tutorial assumes that you have all prerequisites already installed. 
Otherwise please visit [the official tutorials](http://guides.rubyonrails.org/index.html) first. 

If you use some other technology, check the list of available integration variants below:

- desktop/howtostart_php.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_dotnet.md

Step 1. Creating a Project
------------------------

To add a new project just run the following command in the terminal:

~~~js
rails new gantt-app -d mysql
~~~


Step 2. Creating a Gantt
-----------------------------------------

Now we need to add a controller that will process users' request to the server through the application.
Since requests differ in their type, we need separate controllers for certain requests.

To define the connection between a controller and the type of request, we will use routing. Different routes can be served by different actions.
The actions collect information which will be passed to the view.

Let’s create a new controller with the name "home" and a new action called "index".

~~~js
cd gantt-app
rails generate controller home index
~~~

The output should confirm that new files were created.

###Setting a default route

To configure the routing, open the file *config/routes.rb*. Change the default route to the "index" action of our new controller:
{{snippet config/routes.rb}}
~~~js
Rails.application.routes.draw do
  root :to => "home#index"
end
~~~

After that we can test our server by running in the command line: 

~~~js
rails server
~~~

Open *http://localhost:3000/* in your browser. The result should be like this:

<img src="desktop/server_test.png">

So the server is ready and we can proceed with views adding.

### Adding gantt to the View

Now we are ready to add a gantt chart to our page. 

Open the layout page and add a yield into the *head* tag, well use it to add dhtmlxgantt files to the page:
{{snippet app/views/layouts/application.html.erb}}
~~~html
<!DOCTYPE html>
<html>
<head>
  <title>Gantt</title>
  <%= stylesheet_link_tag 'application', media:'all','data-turbolinks-track' => true %>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>  
  <%= yield(:head) %> /*!*/
  <%= csrf_meta_tags %>
</head>
<body>

    <%= yield %>

</body>
</html>
~~~

After that, go to home/index view and add gantt chart there:
{{snippet app/views/home/index.html.erb}}
~~~js
<% content_for :head do %>
	<%= stylesheet_link_tag 'https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css' %>
	<%= javascript_include_tag 'https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js' %>
<% end %>

<div id="gantt_here" style='width:100%; height:800px;'></div>

<script>
    gantt.init("gantt_here");
</script>
~~~

Note that we added dhtmlx gantt files from [CDN](cdn_links_list.md) rather than locally. 
For the development you'll want to use a readable version of source codes that comes with the download package.

After that we can have a look at the current result. Open *http://localhost:3000/* (the rails server) in a browser.
You should get the following result:

<img src="desktop/create_view.png">

Thus you've got a Gantt chart where you can add tasks and modify them. But it lacks the saving ability.
To provide it, we need to proceed with creating models.

Step 6. Creating Models
--------------

Since we're using mysql, make sure that connection settings in *config/database.yml* are correct:
{{snippet config/database.yml}}
~~~js
development:
  adapter: mysql2
  encoding: utf8
  database: gantt-app
  username: root
  password: 
~~~

Now we need to create models for [tasks and links](desktop/server_side.md#databasesstructure).

To create a model for tasks, we need to run a command that contains the task properties:

~~~js
rails generate model Task text:string start_date:datetime duration:integer progress:decimal
~~~

A similar but shorter command is used to create a model for links:

~~~js
rails generate model Link source:integer target:integer link_type:string:limit1
~~~

You can have a look at the full list of properties, both mandatory and optional, available for the [Task object](desktop/loading.md#task_properties) and 
[Link object](desktop/loading.md#link_properties).

After that we need to run a migration in order to update our database:

~~~js
rake db:migrate
~~~

Let's add some test data while we're here:

1 . Open the Rails console by running:

~~~js
rails c
~~~

2 . Add a couple of tasks and links like this:

~~~js
Task.create :text=>"Task 1", :start_date=>"2015-10-25",  :duration=>2, :progress=>0;
Task.create :text=>"Task 2", :start_date=>"2015-10-27",  :duration=>3, :progress=>0.5;
Link.create :source=>1, :target=>2, :link_type=>"0";
~~~
3 . Enter "exit" to close the console.

Next we need implement data loading and saving in the chart with the help of controllers.

Step 7. Creating Task and Link Controllers
--------------------

###General technique of loading data using REST API

There's a [common technique](desktop/server_side.md#technique) for loading data into Gantt from the server side.

You will find the requirements to the client side,
as well as the [description of possible requests and responses](desktop/server_side.md#requestresponsedetails)
in the desktop/server_side.md article.

Below we will consider how to load data into Gantt using Ruby on Rails server side.

###Creating a new data action

Gantt gets both tasks and links in one object, not separately.
In order to enable data loading in the chart, we should create a new data action that will be responsible for 
loading tasks and links data into Gantt.

Open the file *app/controllers/home_controller.rb* and add the code below into it:
{{snippet app/controllers/home_controller.rb}}
~~~js
def data
    tasks = Task.all
    links = Link.all

    render :json=>{
              :data => tasks.map{|task|{
                          :id => task.id,
                          :text => task.text,
                          :start_date => task.start_date.to_formatted_s(:db),
                          :duration => task.duration,
                          :progress => task.progress,
                          :parent => task.parent
                      }},
              :links => links.map{|link|{
                  :id => link.id,
                  :source => link.source,
                  :target => link.target,
                  :type => link.link_type
              }}
           }
  end
~~~

The code will create a data action that will make an object with data for a Gantt chart. It will contain a list of tasks and a list of links.
The dates of tasks should be converted into appropriate strings.


###Task Controller

Next we need to create a new controller task by running:

~~~js
rails generate controller task
~~~

We will add the code that will enable data adding, changing and deleting into the file of this task - *app/controllers/task_controller.rb*:
{{snippet app/controllers/task_controller.rb}}
~~~js
protect_from_forgery

def update
    task = Task.find(params["id"])
    task.text = params["text"]
    task.start_date = params["start_date"]
    task.duration = params["duration"]
    task.progress = params["progress"]
    task.parent = params["parent"]
    task.save

    render :json => {:action => "updated"}
  end

  def add
    task = Task.create 
    	:text => params["text"], 
        :start_date=> params["start_date"], 
        :duration => params["duration"],
        :progress => params["progress"], 
        :parent => params["parent"]

    render :json => {:action => "inserted", :tid => task.id}
  end

  def delete
    Task.find(params["id"]).destroy
    render :json => {:action => "deleted"}
  end
~~~

The code of Task Controller includes the following types of requests:

- POST request means that a new item needs to be inserted into the database
- PUT request updates an existing record 
- DELETE request goes for deleting

Note that a response for the insert action also contains a database id of the new record. 
It will be applied on the client side, so the new item could be mapped to the database entity. 

###Link Controller

Now we will surely proceed with adding a link controller. The next line will help us with it:

~~~js
rails generate controller link
~~~

We will add a familiar code to organize adding/changing/deleting actions for links
into the *app/controllers/link_controller.rb* file:
{{snippet app/controllers/link_controller.rb}}
~~~js
protect_from_forgery

 def update
   link = Link.find(params["id"])
   link.source = params["source"]
   link.target = params["target"]
   link.link_type = params["type"]
   link.save

   render :json => {:action => "updated"}
 end

 def add
   link = Link.create 
   		:source => params["source"], 
        :target => params["target"], 
        :link_type => params["type"]
        
   render :json => {:action => "inserted", :tid => link.id}
 end

 def delete
   Link.find(params["id"]).destroy
   render :json => {:action => "deleted"}
 end
~~~

The same as for Task Controller, we describe the following types of requests in the code of Link Controller:

- POST request means that a new item should be inserted into the database
- PUT request updates an existing record 
- DELETE request goes for deleting

###Configuring Routes for API

After that we need to specify the routes to the newly created controllers and actions.
These routes will map incoming requests to specific handlers.
You can find the full route scheme [in the corresponding article](desktop/server_side.md#requestresponsedetails).

We will specify the routes in the *config/routes.rb* file with the following code:
{{snippet config/routes.rb}}
~~~js
match "home/data", :to => "home#data", :as => "data", :via => "get"

post "home/data/task", :to => "task#add"
put "home/data/task/:id", :to => "task#update"
delete "home/data/task/:id", :to => "task#delete"

post "home/data/link", :to => "link#add"
put "home/data/link/:id", :to => "link#update"
delete "home/data/link/:id", :to => "link#delete"
~~~

Thus, we have set API routes for data and all the necessary actions: adding, updating and deleting tasks and links.

Step 8. Initializing Gantt
--------------------------

The last thing we have to do is to put the following code into the &#60;script&#62;&#60;/script&#62; part of the *app/views/home/index.html.erb* file.
{{views/home/index.html.erb}}
~~~js
gantt.config.xml_date="%Y-%m-%d %H:%i";

gantt.init("gantt_here");
gantt.load("<%= data_path %>");

var dp = new dataProcessor("<%= data_path %>");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

It initializes Gantt and enables it to load and save data. That's all. Now we can run our application in a browser and see the result.

<img src="desktop/result.png">

As you can see, there are two tasks connected by a link. We have added them at the [Step 6](desktop/howtostart_ruby.md#step6creatingmodels).  
Now you can add more tasks and modify them and all the changes will be saved in the database.