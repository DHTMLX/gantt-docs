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


Step 2. Adding Gantt to the page
-----------------------------------------

Let's start with creating a controller and a default page for our application.
Move to the application folder and generate a new controller with *index* action:
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

So the app is working and we've got our default page, now we can proceed to adding a gantt chart.

### Adding Gantt to the View

Now we are ready to add a gantt chart to our page. 

Open the layout page and add a yield into the *head* tag, well use it to add dhtmlxgantt files to the page:
{{snippet app/views/layouts/application.html.erb}}
~~~html
<!DOCTYPE html>
<html>
<head>
  <title>dhtmlxGantt</title>
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

Note that we added dhtmlx gantt files from [CDN](desktop/cdn_links_list.md) rather than locally. 
For the development you'll want to use a readable version of source codes that comes with the download package.

After that we can have a look at the current result. Open *http://localhost:3000/* (the rails server) in a browser.
You should get the following result:

<img src="desktop/create_view.png">

Thus you've got a Gantt chart where you can add tasks and modify them. But it lacks the saving ability.
To provide it, we need to proceed with creating models.

Step 2. Creating Models
--------------

Since we're using mysql, make sure that you have a correct connection settings in *config/database.yml*, for example:
{{snippet config/database.yml}}
~~~js
development:
  adapter: mysql2
  encoding: utf8
  host: localhost
  database: gantt-app
  username: root
  password: 
~~~

Now we need to create models for [tasks and links](desktop/server_side.md#databasesstructure).

To create a model for tasks, we need to run a command that contains the task properties:

~~~js
rails generate model Task \
    text:string \
    start_date:datetime \
    duration:integer \
    parent:integer \
    progress:decimal
~~~

A similar but shorter command is used to create a model for links:

~~~js
rails generate model Link \
    source:integer \
    target:integer \
    link_type:string:limit1
~~~

Note, that dhtmlxgantt link object must have a property named <b>[type](desktop/server_side.md#databasesstructure)</b> 
which stores a type of the relation (start-to-start, finish-to-finish, etc.).
We can't add such property to our model since the "<b>type</b>" name is already reserved by ActiveRecord. As a workaround, we'll name this property <b>link_type</b> and will do the required mapping in the controller. 

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

Step 3. Loading Data
-------------------

After we created model classes and did the migration we can load the database data into our gantt. 

dhtmlxGantt expects data in [JSON format](desktop/supported_data_formats.md), so firstly we'll add a new action to our *HomeController* where we'll read, format and output gantt data:

{{snippet app/controllers/home_controller.rb}}
~~~js
class HomeController < ApplicationController
  def index
  end
 
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
        :parent => task.parent,
        :open => true
      }},
      :links => links.map{|link|{
        :id => link.id,
        :source => link.source,
        :target => link.target,
        :type => link.link_type
      }}
    }
  end
end
~~~

Add a route for this action into *routes.rb*:
{{snippet config/routes.rb}}
~~~js
Rails.application.routes.draw do
  root :to => "home#index"
  match "home/data", :to => "home#data", :as => "data", :via => "get"
end
~~~

And call this action from the client-side using [gantt.load](api/gantt_load.md) method:
{{snippet app/views/hove/index.html.erb}}
~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("<%= data_path %>");/*!*/
~~~
Note that [xml_date](api/gantt_xml_date_config.md) config specifies the [format of dates](http://api.rubyonrails.org/v5.1/classes/DateTime.html#method-i-to_formatted_s) (<b>start_date</b> of Task) that comes from the server.

If you run the server now and open *http://localhost:3000/* in your browser, you should be able to see gantt chart populated with tasks and links from the database.
No changes would be posted back to the database, however. We're going to fix it in the next step.

Step 4. Saving changes
--------------------

dhtmlxGantt can transmit all changes made by the user to the RESTful API on a backend, where everything can be saved to the database. You can check the protocol details [here](desktop/server_side.md#technique). 
That's the way we're going to implement data saving now.

Firstly, we want enable posting changes on the client:
{{snippet app/views/hove/index.html.erb}}
~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("<%= data_path %>");

var dp = new gantt.dataProcessor("<%= data_path %>");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Then, we need to add two controllers, one for Tasks and one for Links and implement all required actions.
Let's start with a controller for Tasks:
~~~js
rails generate controller task --no-helper --no-assets --no-view-specs
~~~
Since this controller is not going to have any views we've used *--no-* flags in order not to generate files we won't need. 

And implement actions for creating/updating and deleting tasks:
{{snippet app/controllers/task_controller.rb}}
~~~js
class TaskController < ApplicationController
    protect_from_forgery
 
    def update
        task = Task.find(params["id"])
        task.text = params["text"]
        task.start_date = params["start_date"]
        task.duration = params["duration"]
        task.progress = params["progress"] || 0
        task.parent = params["parent"]
        task.save
 
        render :json => {:action => "updated"}
    end
 
    def add
        task = Task.create( 
            :text => params["text"], 
            :start_date=> params["start_date"], 
            :duration => params["duration"],
            :progress => params["progress"] || 0, 
            :parent => params["parent"]
        )
 
        render :json => {:action => "inserted", :tid => task.id}
    end
 
    def delete
        Task.find(params["id"]).destroy
        render :json => {:action => "deleted"}
    end
end
~~~

A couple of notes regarding this code

 - we don't need a get action since all data is already loaded from *home#data*
 - *"progress"* property may not have a default value on the client-side, we need to provide a default value just in case
 - an action that creates new item should return database id of newly inserted record back to the client

After that we need to add a new routes to the config, and users will be able to view/create/update and delete tasks in our gantt chart:
{{snippet config/routes.rb}}
~~~js
Rails.application.routes.draw do
  root :to => "home#index"
  match "home/data", :to => "home#data", :as => "data", :via => "get"

  post "home/data/task", :to => "task#add" /*!*/
  put "home/data/task/:id", :to => "task#update" /*!*/
  delete "home/data/task/:id", :to => "task#delete" /*!*/
end
~~~

Now, let's do the same for links.

Generate Link controller:
~~~js
rails generate controller link --no-helper --no-assets --no-view-specs
~~~

The implementation may look like the following:
{{snippet app/controllers/link_controller.rb}}
~~~js
class LinkController < ApplicationController
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
        link = Link.create( 
            :source => params["source"], 
            :target => params["target"], 
            :link_type => params["type"]
        )
 
        render :json => {:action => "inserted", :tid => link.id}
    end
 
    def delete
        Link.find(params["id"]).destroy
        render :json => {:action => "deleted"}
    end
end
~~~

And add routes for new actions: 
{{snippet config/routes.rb}}
~~~js
Rails.application.routes.draw do
  root :to => "home#index"
  match "home/data", :to => "home#data", :as => "data", :via => "get"

  post "home/data/task", :to => "task#add"
  put "home/data/task/:id", :to => "task#update"
  delete "home/data/task/:id", :to => "task#delete"

  post "home/data/link", :to => "link#add"/*!*/
  put "home/data/link/:id", :to => "link#update"/*!*/
  delete "home/data/link/:id", :to => "link#delete"/*!*/
end
~~~

And that's it. If you run application now you'll have an interactive gantt chart with Rails and MySql backend:
<img src="desktop/result.png">

Please check more of [our guides](desktop/guides.md) for more features of dhtmlxGantt.

@todo:
  proofread, recheck app code, add branch ordering
