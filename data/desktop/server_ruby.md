Integrating Gantt with Ruby using REST
=========================================

You can integrate Gantt with [Ruby on Rails](http://rubyonrails.org/). If you have Ruby on Rails installed, you can begin to implement the integration at once. 
Otherwise, you should install the framework by following the steps described in the [installation guide](http://guides.rubyonrails.org/getting_started.html#installing-rails).

Once everything is ready, we can start completing the integration step by step.

Step 1. Creating a project
------------------------

To add a new project just run the following command in the terminal

~~~js
rails new path/to/your/project
~~~

Step 2. Creating a controller and specifying routing
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

After that we can test our server by running in the comman line: 

~~~js
rails server
~~~

Open *http://localhost:3000/* in your browser. The result should be like this:

(image)

So the server is ready and we can proceed with views adding.

Step 3. Creating Views
-----------------------
 
Views will visualize the information gathered by actions. 

###Unpacking dhtmlxGantt package

To begin with, we should [download the dhtmlxGantt package](http://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml). 

Complete the next steps:

1. Unpack the file codebase/dhtmlxgantt.js and the directory codebase/ext from the package to the directory vendor/assets/javascripts/ of your project
2. Unpack the file codebase/dhtmlxgantt.css and the directory codebase/skins from the package to the directory vendor/assets/stylesheets/ of your project

We need to add the *dhtmlxgantt.js* and *dhtmlxgantt.css* files to the precompile array. For this, open the **config/initializers/assets.rb** file and add the following code:

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
