let todos = [{task:"hey", done:false},{task:"hello", done:true}];
let todoList;

$(document).ready(function () {
  todoList = $('#todoList');
  let newTodoInput = $("#newTodo");
  let addTodoBtn = $("#addTodo");
  let clearTodosBtn = $("#clearTodos");
  
  refreshTodos(true)
  
  addTodoBtn.click(function () {
    addTodo(newTodoInput.val());
    newTodoInput.val("");
  })
  
  clearTodosBtn.click(function () {
    todos = todos.filter((todo) => !todo.done)
    
    refreshTodos();
  })

});

function refreshTodos(firstPageLoad = false) {
  if (!firstPageLoad) {
    saveTodos();
  }
    todoList.empty();
    retrieveTodos();

    for (i in todos) {
      let todoItem = createTodoItem(+i);
      todoList.append(todoItem);
    }

}

function remove(todoId) {
  todos.splice(todoId, 1);
  refreshTodos();
}

function moveUp(todoId) {
  todos.splice(todoId - 1, 0, todos.splice(todoId, 1)[0]);
  refreshTodos();
}

function moveDown(todoId) {
  todos.splice(todoId + 1, 0, todos.splice(todoId, 1)[0]);
  refreshTodos();
}

function createTodoItem(i) {
  let todoItem = $(`<li class="list-group-item"></li>`)
  
  let contentDiv = $(`<div class="row"></div>`)
  
  let checkBoxDiv = $(`<div class="col-2 text-center"></div>`)
  
  let check = $(`<input type="checkbox">`).click(function () {
    todos[i].done = !todos[i].done;
    refreshTodos();
  })
  
  if (todos[i].done) {
    contentDiv.css("text-decoration", "line-through");
    check.prop("checked", "true");
  }
  
  let iconUp = $(`<div class="col-sm-1"><i class="fas fa-chevron-up move-icon"></i></div>`)
    .click(() => {
      moveUp(i);
    })
  let iconDown = $(`<div class="col-sm-1"><i class="fas fa-chevron-down move-icon"></i></div>`)
    .click(() => {
      moveDown(i);
    })
  let removeButton = $(`<div class="col-sm-1"><i class="fas fa-times delete"></i></div>`)
    .click(() => {
      remove(i);
    })
  
  
  let task = $(`<div class="col">${todos[i].task}</div>`)
  
  contentDiv.append(checkBoxDiv.append(check)).append(task).append(iconUp).append(iconDown).append(removeButton);
  
  todoItem.append(contentDiv)
  
  return todoItem;
}

function retrieveTodos() {
  let savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(task) {
  todos.push({
    task: task,
    done: false
  });
  refreshTodos();
}