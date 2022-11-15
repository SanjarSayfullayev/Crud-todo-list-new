const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById('message-create')

const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

  let editTodoId;
//time
function getTime() {
  const now = new Date();

  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const seconds =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  const month_title = now.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  fullDay.textContent = `${date} ${months[month_title]}, ${year} `;

  hourEl.innerText = `${hours}`;
  minuteEl.innerText = `${minutes}`;
  secondEl.innerText = `${seconds}`;

  return `${hours}:${minutes}, ${date}.${month}.${year}`;
}
setInterval(() => getTime(), 1000);

//show todos
function showTodos() {
  const showtodos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";
  showtodos.forEach((item, idx) => {
    listGroupTodo.innerHTML += `
            <li ondblclick="todoComlated(${idx})" class="list-group-item d-flex justify-content-between
            ${item.complated == true ? 'complated' : ''}
            ">
          ${item.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick=editTodo(${idx}) src="img/edit.svg" alt="Edit icon" width="25" height="25">
            <img onclick="deleteTodos(${idx})" src="img/delete.svg" alt="Delete icon" width="25" height="25">
          </div>
    </li>
        `;
  });
}

// Form show error
function showError(where, message) {
  document.getElementById(`${where}`).innerText = message;
  setTimeout(() => {
    document.getElementById(`${where}`).innerText = "";
  }, 2000);
}

//todos setItem to Local Storage
function todoSet() {
  localStorage.setItem("list", JSON.stringify(todos));
}

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();

  if (todoText.length) {
    todos.push({
      text: todoText,
      time: getTime(),
      complated: false,
    });
    todoSet();
    showTodos();
  } else {
    showError("message-create", "Please, Enter some todo...");
  }
});

// Delete todos
function deleteTodos(id) {
  // console.log(id);
  let deletetodo = todos.filter((item, idx) => {
    return idx !== id;
  });
  todos = deletetodo;
  todoSet();
  showTodos();
}

//Comlated item
function todoComlated(id) {
  let complatedTodo = todos.map((item, idx) => {
    if (idx == id) {
      return { ...item, complated: item.complated == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = complatedTodo;
  todoSet()
  showTodos()
}


// Edit form
formEdit.addEventListener('submit', (e) => {
  e.preventDefault()

  const todoText = formEdit["input-edit"].value.trim();
  formEdit.reset();

  if (todoText.length) {
    todos.splice(editTodoId,1,{
      text: todoText,
      time: getTime(),
      complated: false,
    });
    todoSet();
    showTodos();
    closeModal();
  } else {
    showError("message-edit", "Please, Enter some todo...");
  }

})
function editTodo(id){
  openModal()
  console.log(id);
  editTodoId = id

}

document.addEventListener('keydown', (e) => {
  if(e.keyCode == 27){
    closeModal()
  }
})

overlay.addEventListener("click", closeModal);
closeEl.addEventListener("click", closeModal);

function openModal(){
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal(){
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}




