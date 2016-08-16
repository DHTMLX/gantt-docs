dhtmlxGantt with Ruby on Rails 
=========================


In this article we'll show you how to create a Gantt and implement server-side integration based on [Ruby on Rails](http://rubyonrails.org/) framework and REST API.

If you use some other technology, check the list of available integration variants below:

- desktop/howtostart_php.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_dotnet.md


If you have Ruby on Rails installed, you can begin to implement the integration at once. 
Otherwise, you should install the framework by following the steps described in the [installation guide](http://guides.rubyonrails.org/getting_started.html#installing-rails).

Once everything is ready, we can start completing the integration step by step.

Step 1. Creating a Project
------------------------

To add a new project just run the following command in the terminal:

~~~js
rails new path/to/your/project
~~~

Step 2. Creating a Controller and Specifying Routing
-----------------------------------------

Now we need to add a controller that will process users' request to the server through the application.
Since requests differ in their type, we need separate controllers for certain requests.

To define the connection between a controller and the type of request, we will use routing. Different routes can be served by different actions.
The actions collect information which will be passed to the view.

Let’s create a new controller with the name "home" and a new action called "index".

~~~js
cd path/to/your/project
rails generate controller home index
~~~

The output should confirm that new files were created.

To configure the routing, open the file *config/routes.rb*. Find the following line at the very beginning of this file

~~~js
get 'home/index'
~~~

and replace it with the following one:

~~~js
root :to => 'home#index'
~~~

After that we can test our server by running in the command line: 

~~~js
rails server
~~~

Open *http://localhost:3000/* in your browser. The result should be like this:

<img src="desktop/server_test.png">

So the server is ready and we can proceed with views adding.

Step 3. Including Source Files and Creating Views
-----------------------
 
Views will visualize the information gathered by actions. 

###Unpacking dhtmlxGantt package

To begin with, we should [download the dhtmlxGantt package](http://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml). 

Complete the next steps:

1. Unpack the file *codebase/dhtmlxgantt.js* and the directory *codebase/ext* from the package to the directory *vendor/assets/javascripts/* of your project
2. Unpack the file *codebase/dhtmlxgantt.css* and the directory *codebase/skins* from the package to the directory *vendor/assets/stylesheets/* of your project

We need to add the *dhtmlxgantt.js* and *dhtmlxgantt.css* files to the precompiled array. For this, open the **config/initializers/assets.rb** file and add the following code:

~~~js
Rails.application.config.assets.precompile += %w( dhtmlxgantt.css )
Rails.application.config.assets.precompile += %w( dhtmlxgantt.js )
~~~

###Creating a view

Now we are ready to create a view. 

If there’s no controller-specific layout, Rails will use the *app/views/layouts/application.html.erb* file
as a template for all pages that have common elements.  Open this file and replace the existing code with the following:

~~~html
<!DOCTYPE html>
<html>
<head>
  <title>Gantt</title>
  <%= stylesheet_link_tag 'application', media:'all','data-turbolinks-track' => true %>
  <%= stylesheet_link_tag 'dhtmlxgantt', media:'all','data-turbolinks-track' => true %>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>  
  <%= javascript_include_tag 'dhtmlxgantt', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
</head>
<body>

    <%= yield %>

</body>
</html>
~~~

At this point we can specify a view for the "home" controller that we've created at the previous step. 
For this, open the file *app/views/home/index.html.erb*. We need to add a container for the future Gantt chart and initialize the chart, like this:

~~~js
<div id="gantt_here" style='width:100%; height:800px;'></div>

<script>
    gantt.init("gantt_here");
</script>
~~~

After that we can have a look at the current result. Open *http://localhost:3000/* (the rails server) in a browser.
You should get the following result:

<img src="desktop/create_view.png">

Thus you've got a Gantt chart where you can add tasks and modify them. But it lacks the saving ability.
To provide it, we need to proceed with creating models.

Step 4. Creating Models
----------------------

Since Gantt operates tasks and links entities, we need to add two models: one for each of them.

To create a model for tasks, we need to run the long command that contains the task properties:

~~~js
rails generate model Task text:string start_date:datetime duration:integer progress:float sortorder:integer parent:integer
~~~

A similar but shorter command is used to create a model for links:

~~~js
rails generate model Link source:integer target:integer link_type:string:limit1
~~~

After that we can create a new database:

~~~js
rake db:migrate
~~~

Now you can try to add test tasks and links into it. The algorithm is the following:

1 . Open the Rails console by running:

~~~js
rails c
~~~

2 . Add the desired tasks and links like this:

~~~js
Task.create :text=>"Task 1", :start_date=>"2015-10-25",  :duration=>2;
Task.create :text=>"Task 2", :start_date=>"2015-10-27",  :duration=>3;
Link.create :source=>1, :target=>2, :link_type=>"0";
~~~

3 . Enter "exit" to close the console.

Next we need implement data loading and saving in the chart with the help of controllers.

Step 5. Creating Controllers
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
                          :sortorder => task.sortorder,
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

The code will create a data action that will make an object with data for a Gantt chart. It will contain a list of events and a list of links.
The dates of events should be converted into appropriate strings.


###Task Controller

Next we need to create a new controller task by running:

~~~js
rails generate controller task
~~~

We will add the code that will enable data adding, changing and deleting into the file of this task - *app/controllers/task_controller.rb*:

~~~js
protect_from_forgery

def update
    task = Task.find(params["id"])
    task.text = params["text"]
    task.start_date = params["start_date"]
    task.duration = params["duration"]
    task.progress = params["progress"]
    task.sortorder = params["sortorder"]
    task.parent = params["parent"]
    task.save

    render :json => {:status => "ok"}
  end

  def add
    task = Task.create 
    	:text => params["text"], 
        :start_date=> params["start_date"], 
        :duration => params["duration"],
        :progress => params["progress"], 
        :sortorder => params["sortorder"], 
        :parent => params["parent"]

    render :json => {:tid => task.id}
  end

  def delete
    Task.find(params["id"]).destroy
    render :json => {:status => "ok"}
  end
~~~

The code of Task Controller includes the following types of requests:

- POST request means that a new item needs to be inserted into the database
- PUT request updates an existing record 
- DELETE request goes for deleting

All actions return a JSON response containing the type of the performed operation or “error” if something went wrong.

Note that a response for the insert action also contains a database id of the new record. 
It will be applied on the client side, so the new item could be mapped to the database entity. 


###Link Controller

Now we will surely proceed with adding a link controller. The next line will help us with it:

~~~js
rails generate controller link
~~~

We will add a familiar code to organize adding/changing/deleting actions for links
into the *app/controllers/link_controller.rb* file:

~~~js
protect_from_forgery

 def update
   link = Link.find(params["id"])
   link.source = params["source"]
   link.target = params["target"]
   link.link_type = params["type"]
   link.save

   render :json => {:status => "ok"}
 end

 def add
   link = Link.create 
   		:source => params["source"], 
        :target => params["target"], 
        :link_type => params["type"]
        
   render :json => {:tid => link.id}
 end

 def delete
   Link.find(params["id"]).destroy
   render :json => {:status => "ok"}
 end
~~~

The same as for Task Controller, we describe the following types of requests in the code of Link Controller:

- POST request means that a new item should be inserted into the database
- PUT request updates an existing record 
- DELETE request goes for deleting

Actions return a JSON response with the type of operation or "error".

###Configuring Routes for API

After that we need to specify the routes to the newly created controllers and actions.
These routes will map incoming requests to specific handlers.
You can find the full route scheme [in the corresponding article](desktop/server_side.md#requestresponsedetails).

We will specify the routes in the *config/routes.rb* file with the following code:

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

Step 6. Initializing Gantt
--------------------------

The last thing we have to do is to put the following code into the &#60;script&#62;&#60;/script&#62; part of the *app/views/home/index.html.erb* file.

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

As you can see, there are two tasks connected by a link. We have added them at the [step 4](desktop/howtostart_ruby.md#step4creatingmodels).  
Now you can add more tasks and modify them and all the changes will be saved in the database.