--- 
title: "dhtmlxGantt 与 Ruby on Rails"
sidebar_label: "Ruby on Rails"
---

# dhtmlxGantt 与 Ruby on Rails

在本文中，您将学习如何使用 [Ruby on Rails](https://rubyonrails.org/) 后端创建甘特图。
为了实现此应用，我们将使用 Ruby 2.4.1、Rails 5.1.3 和 MySQL。本教程假设您已安装好所有前提条件。
否则请先访问 [官方教程](https://guides.rubyonrails.org/index.html)。

如果您使用的是其他技术，请查看下方可用的集成变体列表：

- [dhtmlxGantt 与 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt 与 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt 与 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt 与 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt 与 PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt 与 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt 与 Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)

请在 GitHub 上查看 [演示](https://github.com/DHTMLX/gantt-howto-rails)。

## Step 1. 创建项目

要添加一个新项目，请在终端中运行以下命令：

~~~js
rails new gantt-app -d mysql
~~~

## Step 2. 在页面中添加 Gantt

让我们从创建一个控制器及应用程序的默认页面开始。
切换到应用程序文件夹并生成一个带有 index 动作的新控制器：

~~~js
cd gantt-app
rails generate controller gantt index
~~~

输出应确认新文件已创建。

### 设置默认路由

要配置路由，请打开文件 *config/routes.rb*。将默认路由更改为我们新控制器的 "index" 动作：


~~~js title="config/routes.rb"
Rails.application.routes.draw do
  root :to => "gantt#index"
end
~~~

之后，我们可以通过在命令行中运行来测试服务器： 

~~~js
rails server
~~~

在浏览器中打开 *http://localhost:3000/*。结果应如下所示：

![how_to_start_rails_blank_page](/img/how_to_start_rails_blank_page.png)

因此应用已运行，我们得到了默认页面，现在可以继续添加甘特图。

### 在视图中添加 Gantt

现在我们已经准备好在页面中添加甘特图。

打开布局页面，在 *head* 标签中添加 yield。我们将用它把 dhtmlxgantt 文件添加到页面：

~~~html title="app/views/layouts/application.html.erb"
<!DOCTYPE html>
<html>
<head>
  <title>dhtmlxGantt</title>
  (= stylesheet_link_tag 'application', media:'all','data-turbolinks-track' => true )
  (= javascript_include_tag 'application', 'data-turbolinks-track' => true )  
  (= yield(:head) ) /*!*/
  (= csrf_meta_tags )
</head>
<body>

    (= yield )

</body>
</html>
~~~

之后，转到 *gantt/index* 视图并在其中添加一个甘特图：

~~~js title="app/views/gantt/index.html.erb"
( content_for :head do )
    (= stylesheet_link_tag 'https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css' )
    (= javascript_include_tag 'https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js' )
( end )

<div id="gantt_here" style='width:100%; height:800px;'></div>

<script>
    gantt.init("gantt_here");
</script>
~~~

请注意我们已从 [CDN](guides/cdn-links-list.md) 而非本地添加了 dhtmlx gantt 文件。
在开发阶段，您会希望使用随下载包提供的可读版本的源代码。

之后，我们可以查看当前结果。打开浏览器中的 *http://localhost:3000/*（rails 服务器）。
您应该能看到一个从数据库填充的任务和链接的甘特图。
但不会将更改回传到数据库。我们将在下一步解决。

## Step 3. 创建模型

由于我们使用 MySQL，请确保在 *config/database.yml* 中拥有正确的连接设置，例如：


~~~js title="config/database.yml"
development:
  adapter: mysql2
  encoding: utf8
  host: localhost
  database: gantt-app
  username: root
  password: 
~~~

现在我们需要为 [tasks and links](guides/loading.md#databasestructure) 创建模型。

要为 tasks 创建模型，我们需要运行一个包含任务属性的命令：

~~~js
rails generate model Task 
    text:string 
    start_date:datetime 
    duration:integer 
    parent:integer 
    progress:decimal
~~~

用于创建 links 模型的命令类似但更简短：

~~~js
rails generate model Link 
    source:integer 
    target:integer 
    link_type:string:limit1
~~~

请注意，dhtmlxgantt 链接对象必须具备名为 <b>[type](guides/loading.md#databasestructure)</b> 的属性，用于存储关系的类型（start-to-start、finish-to-finish 等）。

我们不能在模型中添加这样的属性，因为 "<b>type</b>" 名称已被 ActiveRecord 保留。作为变通，我们将把该属性命名为 <b>link_type</b>，并在控制器中完成所需的映射。

您可以查看 [Task object](guides/loading.md#task_properties) 与 [Link object](guides/loading.md#link_properties) 的全部属性清单（必需和可选）。

之后，我们需要运行迁移来更新数据库：

~~~js
rake db:migrate
~~~

在这里我们可以添加一些测试数据：

1. 通过以下命令打开 Rails 控制台：

~~~js
rails c
~~~

2. 按如下方式添加几个任务和链接：

~~~js
Task.create :text=>"Task 1", :start_date=>"2015-10-25",  :duration=>2, :progress=>0;
Task.create :text=>"Task 2", :start_date=>"2015-10-27",  :duration=>3, :progress=>0.5;
Link.create :source=>1, :target=>2, :link_type=>"0";
~~~

3. 输入 "exit" 关闭控制台。

接下来，我们需要借助控制器在图表中实现数据加载和保存。

## Step 4. 加载数据

在创建模型类并运行迁移后，我们可以将数据库数据加载到甘特图中。

dhtmlxGantt 期望数据为 [JSON 格式](guides/supported-data-formats.md)，因此我们将首先向 *GanttController* 添加一个新动作，在其中读取、格式化并输出甘特图数据：



~~~js title="app/controllers/gantt_controller.rb"
class GanttController < ApplicationController
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

为此动作在 *routes.rb* 中添加路由：


~~~js title="config/routes.rb"
Rails.application.routes.draw do
  root :to => "gantt#index"

  scope '/api' do/*!*/
    get "/data", :to => "gantt#data"/*!*/
  end/*!*/
end
~~~

并在客户端使用 [gantt.load](api/method/load.md) 方法来调用此动作：


~~~js title="app/views/gantt/index.html.erb"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/api/data");/*!*/
~~~

请注意，[date_format](api/config/date_format.md) 配置指定了来自服务器的日期格式（Task 的 <b>start_date</b>），来自服务器。

如果现在运行服务器并在浏览器打开 *http://localhost:3000/*，您应该能够看到一个已从数据库填充了任务和链接的甘特图。
不过不会将改动回传到数据库。我们将在下一步解决。

## Step 5. 保存改动

dhtmlxGantt 可以将用户所做的所有更改通过 RESTful API 传输到后端，在那里可以将一切保存到数据库。
您可以在 [这里](guides/server-side.md#technique) 查看协议细节。

这就是我们现在实现数据保存的方式：

首先，我们将在客户端启用提交改动：


~~~js title="app/views/gantt/index.html.erb"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/api/data");

var dp = new gantt.dataProcessor("/api");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

然后，我们需要再添加两个控制器：一个用于 Tasks 另一个用于 Links，并实现所有必需的动作。

### 创建 Task 控制器

让我们从 Task 控制器开始：

~~~js
rails generate controller task --no-helper --no-assets --no-view-specs
~~~

由于此控制器不会有任何视图，我们使用了 *--no-* 标志以避免生成不需要的文件。

接下来我们将实现用于创建、更新和删除任务的动作：


~~~js title="app/controllers/task_controller.rb"
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

关于这段代码的几点说明：

- 由于所有数据均来自 *gantt#data*，因此不需要 get 动作。
- 客户端默认可能未初始化 *progress* 属性，因此我们需要在这里提供默认值。或者，我们也可以在模型类中定义默认值（例如，可以使用 [migration](https://api.rubyonrails.org/classes/ActiveRecord/Migration.html) 实现）。
- 创建新项的动作应将新插入记录的数据库 id 返回给客户端

之后，我们需要在配置中添加新路由，用户就能够在甘特图中查看/创建/更新和删除任务：

~~~js title="config/routes.rb"
Rails.application.routes.draw do
  root :to => "gantt#index"

  scope '/api' do
    get "/data", :to => "gantt#data"
  
    post "/task", :to => "task#add"/*!*/
    put "/task/:id", :to => "task#update"/*!*/
    delete "/task/:id", :to => "task#delete"/*!*/
  end
end
~~~

现在，让我们对 links 做同样的处理。

### 创建 Link 控制器

生成一个 Link 控制器：

~~~js
rails generate controller link --no-helper --no-assets --no-view-specs
~~~

实现可能如下所示：

~~~js title="app/controllers/link_controller.rb"
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

然后为新动作添加路由：


~~~js title="config/routes.rb"
Rails.application.routes.draw do
  root :to => "gantt#index"

  scope '/api' do
    get "/data", :to => "gantt#data"
  
    post "/task", :to => "task#add"
    put "/task/:id", :to => "task#update"
    delete "/task/:id", :to => "task#delete"
  
    post "/link", :to => "link#add"/*!*/
    put "/link/:id", :to => "link#update"/*!*/
    delete "/link/:id", :to => "link#delete"/*!*/
  end
end
~~~

就这些。如果现在运行应用程序，您将得到一个与 Rails 和 MySql 后端的交互式甘特图：

![how_to_start_rails_complete](/img/how_to_start_rails_complete.png)

请查看更多的 [我们的指南](guides.md) 以了解 dhtmlxGantt 的更多特性。

## 存储任务顺序 {#storingtheorderoftasks}

客户端甘特图允许使用拖放来 [重新排序任务](guides/reordering-tasks.md)。如果您使用此功能，必须将该顺序存储在数据库中。您可以 [在这里查看常见描述](guides/server-side.md#storingtheorderoftasks)。

现在让我们将此功能添加到我们的应用中。

### 在客户端启用任务重新排序

首先，我们需要允许用户在 UI 中更改任务顺序。打开 *Index* 视图并更新 gantt 的配置：

~~~js title="app/views/gantt/index.html.erb"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

现在，让我们在后端反映这些变化。我们需要将排序信息添加到我们的模型中，我们将命名为 *sortorder*。更新后的模型声明可能如下：

~~~js
rails generate model Task 
    text:string 
    start_date:datetime 
    duration:integer 
    parent:integer 
    progress:decimal  
    sortorder:integer  /*!*/
~~~

或者向现有模型添加新属性：

1. 创建迁移：

~~~js
rails generate migration add_sortorder_to_tasks sortorder:integer
~~~

2. 打开生成的迁移，在 "sortorder" 列中添加默认值：

~~~js
class AddSortorderToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :sortorder, :integer, :default=>0
  end
end
~~~

并执行迁移：

~~~js
rake db:migrate
~~~

之后，我们需要在控制器中更新 CRUD：

- *data* 动作必须按 `sortorder` 列排序并返回任务：


~~~js title="app/controllers/gantt_controller.rb"
class GanttController < ApplicationController
  def index
  end
 
  def data 
    tasks = Task.all
    links = Link.all
 
    render :json=>{
      :data => tasks.order(:sortorder).map{|task|{ /*!*/
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

- 新增的任务必须获得初始值 `sortorder`：


~~~js title="app/controllers/task_controller.rb"
class TaskController < ApplicationController
    ...
    def add
    
        maxOrder = Task.maximum("sortorder") || 0/*!*/
        
        task = Task.create( 
            :text => params["text"], 
            :start_date=> params["start_date"], 
            :duration => params["duration"],
            :progress => params["progress"] || 0, 
            :parent => params["parent"],
            :sortorder => maxOrder + 1/*!*/
        )
 
        render :json => {:action => "inserted", :tid => task.id}
    end

end
~~~

- 最后，当用户重新排序任务时，任务排序必须被 [更新](guides/server-side.md#storingtheorderoftasks)：

~~~js title="app/controllers/task_controller.rb"
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
 
        if(params['target'])/*!*/
            Task.updateOrder(task.id, params['target'])/*!*/
        end/*!*/

        render :json => {:action => "updated"}
    end
 
    ...
end
~~~

Task.updateOrder 的实现：


~~~js title="app/models/task.rb"
class Task < ApplicationRecord
    def self.updateOrder(taskId, target)
        nextTask = false
        targetId = target

        if(target.start_with?('next:'))
            targetId = target['next:'.length, target.length]
            nextTask = true;
        end

        if(targetId == 'null')
            return
        end

        targetTask = self.find(targetId)
        
        targetOrder = targetTask.sortorder

        if(nextTask)
            targetOrder += 1
        end
        
        self.where("sortorder >= ?", targetOrder).
            update_all('sortorder = sortorder + 1')
        
        task = self.find(taskId)
        task.sortorder = targetOrder
        task.save
    end
end
~~~

## 应用安全

Gantt 不提供防止各种威胁（如 SQL 注入、XSS 和 CSRF 攻击）的任何手段。确保应用安全的责任在于实现后端的开发者。请在相应的文章中阅读详细信息 [在此](guides/app-security.md)。

## 故障排除

如果您已经完成上述将 Gantt 与 Ruby on Rails 集成的步骤，但 Gantt 未在页面上呈现实例和链接，请查看 [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) 文章。它描述了识别问题根源的方法。

## 接下来

现在您拥有一个功能完善的甘特图。您可以在 [GitHub](https://github.com/DHTMLX/gantt-howto-rails) 查看完整代码、克隆或下载并在您的项目中使用。

您也可以查看 [大量甘特图功能的指南](guides.md) 或关于 [将 Gantt 与其他后端框架集成的教程](integrations/howtostart-guides.md)。