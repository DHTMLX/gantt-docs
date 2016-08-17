Ruby on Rails Code Samples
=========================================

In this article we'll show you how to integrate Gantt with the server side based on [Ruby on Rails](http://rubyonrails.org/) framework and REST API.

You can read the [complete tutorial](desktop/howtostart_ruby.md) on using Gantt with Ruby on Rails.

If you use some other technology, check the list of below to find the appropriate variant:

- desktop/server_php.md
- desktop/server_nodejs.md
- desktop/server_dotnet.md

Creating Models
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

Loading Data
--------------------
There's a [common technique](desktop/server_side.md#technique) for loading data into Gantt from the server side.

You will find the requirements to the client side,
as well as the [description of possible requests and responses](desktop/server_side.md#requestresponsedetails)
in the desktop/server_side.md article.

[On the client side](desktop/server_side.md#technique) we've initialized gantt and added the following line:

~~~js
gantt.load("apiUrl");
~~~

Below we will consider how to load data into Gantt using Ruby on Rails on the server side.


In order to enable data loading in the chart, we should create a new data action. To do it, open the file *app/controllers/home_controller.rb*
and add the code below:

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

Saving Data
---------------

The following [client-side](desktop/server_side.md#technique) code is responsible for sending updates that happen on the client side back to the server:

~~~js
var dp = new gantt.dataProcessor("/data");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

On the server side we will create two controllers which will provide CRUD API for Tasks and Links, correspondingly.


###Task Controller

Let's create a task controller by running:

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

We will add a familiar code to organize adding/changing/deleting actions for links into the *app/controllers/link_controller.rb* file:

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