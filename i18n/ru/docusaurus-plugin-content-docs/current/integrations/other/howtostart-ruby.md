---
title: "dhtmlxGantt с Ruby on Rails"
sidebar_label: "Ruby on Rails"
---

# dhtmlxGantt с Ruby on Rails

В этой статье вы узнаете, как создать диаграмму Gantt с бэкендом на [Ruby on Rails](https://rubyonrails.org/).
Для реализации этого приложения мы будем использовать Ruby 2.4.1, Rails 5.1.3 и MySQL. Этот учебник предполагает, что все предварительные условия уже установлены.
В противном случае сначала, пожалуйста, посетите [официальные руководства](https://guides.rubyonrails.org/index.html).

Если вы используете другую технологию, ознакомьтесь со списком доступных вариантов интеграции ниже:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)


Ознакомьтесь с демонстрацией на GitHub:

[demo на GitHub](https://github.com/DHTMLX/gantt-howto-rails)

## Шаг 1. Создание проекта

Чтобы добавить новый проект, просто выполните следующую команду в терминале:

~~~js
rails new gantt-app -d mysql
~~~


## Шаг 2. Добавление Gantt на страницу

Начнем с создания контроллера и страницы по умолчанию для нашего приложения. 
Перейдите в папку приложения и сгенерируйте новый контроллер с действием *index*:

~~~js
cd gantt-app
rails generate controller gantt index
~~~

Вывод должен подтвердить, что новые файлы созданы.

### Установка маршрута по умолчанию

Чтобы настроить маршрутизацию, откройте файл *config/routes.rb*. Измените маршрут по умолчанию на действие "index" нашего нового контроллера:


~~~js title="config/routes.rb"
Rails.application.routes.draw do
  root :to => "gantt#index"
end
~~~

После этого мы можем протестировать наш сервер, запустив его в командной строке: 

~~~js
rails server
~~~

Откройте *http://localhost:3000/* в вашем браузере. Результат должен быть примерно таким:

![how_to_start_rails_blank_page](/img/how_to_start_rails_blank_page.png)

Итак, приложение работает и у нас есть страница по умолчанию, теперь можно переходить к добавлению диаграммы Gantt.

### Добавление Gantt во View

Теперь мы готовы добавить диаграмму Gantt на страницу. 

Откройте файл макета и добавьте yield в тег *head*. Мы используем его для добавления файлов dhtmlxgantt на страницу:

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

После этого перейдите на представление *gantt/index* и добавьте там диаграмму Gantt:


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

Обратите внимание, что мы добавили файлы dhtmlx Gantt с [CDN](guides/cdn-links-list.md), а не локально. 
Для разработки будет полезна читаемая версия исходного кода, поставляемая в пакетe загрузки.

После этого можно посмотреть текущий результат. Откройте *http://localhost:3000/* (сервер Rails) в браузере.
Вы должны увидеть диаграмму Gantt, заполненную задачами и связями из базы данных.
Однако изменения не будут отправляться обратно в базу данных. Мы исправим это на следующем шаге.

## Шаг 3. Создание моделей

Поскольку мы используем MySQL, убедитесь, что настройки подключения в *config/database.yml* верны, например:


~~~js title="config/database.yml"
development:
  adapter: mysql2
  encoding: utf8
  host: localhost
  database: gantt-app
  username: root
  password: 
~~~

Теперь нужно создать модели для [задач и связей](guides/loading.md#databasestructure).

Чтобы создать модель для задач, нужно выполнить команду, которая включает свойства задачи:

~~~js
rails generate model Task 
    text:string 
    start_date:datetime 
    duration:integer 
    parent:integer 
    progress:decimal
~~~

А аналогичная, но более короткая команда используется для создания модели для связей:

~~~js
rails generate model Link 
    source:integer 
    target:integer 
    link_type:string:limit1
~~~

Обратите внимание, что объект связи dhtmlxGantt должен иметь свойство с именем <b>[type](guides/loading.md#databasestructure)</b>, 
которое хранит тип отношения (start-to-start, finish-to-finish и т. п.).

Мы не можем добавить такое свойство в нашу модель, так как имя <b>type</b> уже зарезервировано ActiveRecord. 
В качестве обходного решения мы назовем это свойство <b>link_type</b> и сделаем соответствующее отображение в контроллере. 

Вы можете ознакомиться с полным списком свойств как обязательных, так и опциональных, доступных для [объекта Task](guides/loading.md#task_properties) и
[объекта Link](guides/loading.md#link_properties).

После этого нам нужно выполнить миграцию, чтобы обновить нашу базу данных:

~~~js
rake db:migrate
~~~

Давайте добавим тестовые данные, пока мы здесь:

1. Откройте консоль Rails, выполнив:
~~~js
rails c
~~~

2. Добавьте пару задач и связей следующим образом:

~~~js
Task.create :text=>"Task 1", :start_date=>"2015-10-25",  :duration=>2, :progress=>0;
Task.create :text=>"Task 2", :start_date=>"2015-10-27",  :duration=>3, :progress=>0.5;
Link.create :source=>1, :target=>2, :link_type=>"0";
~~~

3. Введите "exit", чтобы закрыть консоль.

Далее нам нужно реализовать загрузку данных и сохранение в диаграмме с помощью контроллеров.

## Шаг 4. Загрузка данных

После того как мы создали классы моделей и выполнили миграцию, мы можем загрузить данные из базы данных в нашу диаграмму Gantt. 

dhtmlxGantt ожидает данные в формате JSON, поэтому прежде всего мы добавим новое действие в наш *GanttController*, в котором будем читать, форматировать и выводить данные диаграммы:



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

Добавьте маршрут для этого действия в *routes.rb*:


~~~js title="config/routes.rb"
Rails.application.routes.draw do
  root :to => "gantt#index"

  scope '/api' do/*!*/
    get "/data", :to => "gantt#data"/*!*/
  end/*!*/
end
~~~

И вызовите это действие на клиентской стороне с помощью метода [gantt.load](api/method/load.md):


~~~js title="app/views/gantt/index.html.erb"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/api/data");/*!*/
~~~

Обратите внимание, что конфигурация [date_format](api/config/date_format.md) задает формат дат
(<b>start_date</b> задачи), приходящих с сервера.

Если запустить сервер сейчас и открыть *http://localhost:3000/* в браузере, вы увидите диаграмму Gantt, заполненную задачами и связями из базы данных.
Однако изменения пока не будут отправлены обратно в базу данных. Мы исправим это на следующем шаге.

## Шаг 5. Сохранение изменений

dhtmlxGantt может передавать все изменения, сделанные пользователем, в RESTful API на бэкенде, где всё можно сохранить в базу данных. 
Вы можете ознакомиться с деталями протокола [здесь](guides/server-side.md#technique). 

Так мы и реализуем сохранение данных сейчас:

Во-первых, включим отправку изменений на клиенте:


~~~js title="app/views/gantt/index.html.erb"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/api/data");

var dp = new gantt.dataProcessor("/api");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Затем необходимо добавить два контроллера: один для Задач (Tasks) и другой для Связей (Links) и реализовать все необходимые действия.

### Создание контроллера Task

Начнем с контроллера для задач:

~~~js
rails generate controller task --no-helper --no-assets --no-view-specs
~~~

Так как этот контроллер не будет иметь представлений, мы использовали флаги *--no-* чтобы не создавать ненужные файлы. 

Далее реализуем действия для создания, обновления и удаления задач:


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

Некоторые замечания по этому коду:

- нам не нужен action get, так как все данные уже загружены из *gantt#data*
- свойство *progress* может быть не инициализировано на клиенте по умолчанию, поэтому здесь нужно задать значение по умолчанию. В качестве альтернативы можно было бы задать значение по умолчанию в классе модели (это можно сделать, например, с помощью миграции)
- действие, создающее новый элемент, должно вернуть клиенту идентификатор записи в базе данных

После этого нужно добавить новые маршруты в конфигурацию, и пользователи смогут просматривать, создавать, обновлять и удалять задачи в нашей диаграмме Gantt:


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

Теперь сделаем то же самое для связей.

### Создание контроллера Link

Сгенерируйте контроллер Link:


~~~js
rails generate controller link --no-helper --no-assets --no-view-specs
~~~

Реализация может выглядеть так:


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

Затем добавьте маршруты для новых действий: 


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

И вот и всё. Если запустить приложение сейчас, вы получите интерактивную диаграмму Gantt с бэкендом на Rails и MySql:

![how_to_start_rails_complete](/img/how_to_start_rails_complete.png)

Пожалуйста, ознакомьтесь с [нашими руководствами](guides.md) для получения дополнительных возможностей dhtmlxGantt.

## Сохранение порядка задач {#storingtheorderoftasks}

Клиентская диаграмма Gantt позволяет [переставлять задачи](guides/reordering-tasks.md) путём перетаскивания. Поэтому, если вы используете эту функцию, вам придётся хранить этот порядок в базе данных. 
Вы можете [посмотреть общее описание здесь](guides/server-side.md#storingtheorderoftasks). 


Теперь давайте добавим эту функциональность в наше приложение.

### Включение перестановки задач на клиенте

Во-первых, нужно позволить пользователям менять порядок задач в интерфейсе. Откройте представление *Index* и обновите конфигурацию Gantt:


~~~js title="app/views/gantt/index.html.erb"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Теперь отразим эти изменения на бэкенде. Нужно добавить информацию о порядке в нашу модель, назовём её *sortorder*. Обновлённое объявление модели может выглядеть так:


~~~js
rails generate model Task 
    text:string 
    start_date:datetime 
    duration:integer 
    parent:integer 
    progress:decimal  
    sortorder:integer  /*!*/
~~~

Или добавьте новое свойство к существующей модели:

1. создайте миграцию:
~~~js
rails generate migration add_sortorder_to_tasks sortorder:integer
~~~

2. Откройте сгенерированную миграцию и добавьте значение по умолчанию в столбец "sortorder":
~~~js
class AddSortorderToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :sortorder, :integer, :default=>0
  end
end
~~~

И выполните миграцию:

~~~js
rake db:migrate
~~~

После этого нам нужно обновить CRUD в контроллерах:

- действие *data* должно возвращать задачи, отсортированные по столбцу `sortorder`: 


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

- вновь добавляемые задачи должны получать начальное значение `sortorder`: 


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

- наконец, когда пользователь меняет порядок задач, порядок задач должен обновляться [обновление порядка](guides/server-side.md#storingtheorderoftasks):

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

Реализация Task.updateOrder:


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

## Безопасность приложения

Gantt не предоставляет никаких средств защиты от различных угроз, таких как SQL-инъекции или XSS и CSRF-атак. Важно, чтобы ответственность за безопасность приложения лежала на разработчиках, реализующих бэкенд. Прочитайте детали [в соответствующей статье](guides/app-security.md).

## Устранение неполадок

Если вы выполнили вышеуказанные шаги по интеграции Gantt с Ruby on Rails, но диаграмма Gantt не отображает задачи и связи на странице, ознакомьтесь со статьей [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Она описывает способы выявления корней проблем.

## Что дальше

Теперь у вас полноценная диаграмма Gantt. Вы можете просмотреть полный код на [GitHub](https://github.com/DHTMLX/gantt-howto-rails), клонировать или скачать его и использовать в своих проектах.

Вы также можете ознакомиться с [guides на многочисленные возможности Gantt] или учебниками по [интеграции Gantt с другими бэкенд-фреймворками](integrations/howtostart-guides.md).