const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function(e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  //.trim gets rid of unwanted spaces on left and right ex:____hi___
  const todoText = todoInput.value.trim();
  //requires user to enter text
  if (todoText.length > 0) {
    const todoObject = {
        text: todoText,
        completed: false,
    }
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}

function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex);//we are now passing todo as an object and no longer a string
    todoListUL.append(todoItem);
  });
}

//function that affects html
function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex; //updating the todo class in html for every todo added
  const todoLI = document.createElement("li"); //creating an html list element with 'li' as parameter
  const todoText = todo.text;//accessing the text of the object to read only the text since we input an object
  todoLI.className = "todo";
  todoLI.innerHTML = `<input type="checkbox" id = "${todoId}">
          <label for="${todoId}" class="custom-checkbox">
            <svg fill="transparent"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
          </label>
          <label for="${todoId}" class = "todo-text">
            ${todoText}
          </label>
          <button class="delete-button">
            <svg fill = "var(--secondary-color)"xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button>`;

  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });

  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", ()=>{
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  })
  checkbox.checked = todo.completed;
  return todoLI;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  /*The filter() method of array instances creates a shallow copy of a portion of a given array, 
  filtered down to just the elements from the given array that pass the test implemented by the provided function;*/
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  //converting array into json strings bc localStorage can only store strings
  const todosJson = JSON.stringify(allTodos); //changes arr to strings
  localStorage.setItem("todos", todosJson);
}

//function to load arr onto app as saveTodos only saves
function getTodos() {
  const todos = localStorage.getItem("todos") || "[]"; //"[]" if array is empty;// todos is key to get the arr which we set in saveTodos
  return JSON.parse(todos); //.parse returns it back to javascript array since we saved it as json string
}

//update colors
// Change background color
document.getElementById('bg-color-picker').addEventListener('input', function () {
  const bgColor = this.value;
  document.body.style.backgroundColor = bgColor;
  localStorage.setItem('bgColor', bgColor);
});

// Change title color
document.getElementById('title-color-picker').addEventListener('input', function () {
  const titleColor = this.value;
  document.getElementById('title').style.color = titleColor;
  document.getElementById('add-button').style.backgroundColor = titleColor;
  localStorage.setItem('title-add-Color', titleColor);
});

// Apply saved colors on page load
window.addEventListener('load', function () {
  //pulls color data from local storage to save the color from previous use when loaded up again
  const savedBgColor = localStorage.getItem('bgColor');
  const savedTitleColor = localStorage.getItem('title-add-Color');

  if (savedBgColor) {
      document.body.style.backgroundColor = savedBgColor;
      document.getElementById('bg-color-picker').value = savedBgColor;
  }

  if (savedTitleColor) {
      document.getElementById('title').style.color = savedTitleColor;
      document.getElementById('add-button').style.backgroundColor = savedTitleColor;
      document.getElementById('title-color-picker').value = savedTitleColor;
  }
});
