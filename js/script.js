let inputText = document.querySelector(".text-input");
let ul = document.querySelector("ul");
let item = document.querySelector(".item");
let All = document.querySelector(".All");
let Completed = document.querySelector(".Completed");
let Active = document.querySelector(".Active");
let Clear = document.querySelector(".Clear");
let toggleAll = document.querySelector(".fa-chevron-down");
let counter = 0;


let sst =[];



function addTodo(event) {
  if (event.keyCode === 13) {
    if (event.target.value.trim()) {
      let text = event.target.value;
      let todo = {
        text: text,
        isDone: false,
      };
    //   update sst
      sst.push(todo);
    // createUI
      createUI();
    }
}
}

function createUI(data = sst, root = ul) {
    inputText.value = "";
  root.innerHTML = "";
  data.forEach((todo, index) => {
    let li = document.createElement("li");

    let input = document.createElement("input");
    input.classList.add("input-checkbox");
    input.type = "checkbox";
    input.setAttribute("data-id", index);
    input.checked = todo.isDone;

    let p = document.createElement("p");
    if (todo.isDone) {
      p.classList.add("strike");
    }
    p.innerText = todo.text;
    p.setAttribute("data-id", index); //n
    p.classList.add("para-target");

    let span = document.createElement("span");
    span.innerText = "x";
    span.setAttribute("data-id", index);
    span.classList.add("span");

    li.append(input, p, span);
    root.append(li);
    // p.addEventListener('dblclick', createInputEditor);//n
  });
  item.innerText = `${sst.filter(e => !e.isDone).length} items left`;
}

// function createInputEditor(event) {
//   if (event.target.classList.contains("para-target")) {
//     let paraInput = document.createElement("input");
//     paraInput.type = "text";
//     paraInput.autofocus = true;
//     paraInput.classList.add("para-input");

//     let parent = event.target.parentElement;
//     console.log(event.target.parentElement);
//     let p = event.target;
//     parent.replaceChild(paraInput, p);
//     paraInput.value = event.target.innerText;
//     paraInput.addEventListener("blur", event => {
//       let id = p.dataset.id;
//       sst[id].text = event.target.value;
//       console.log(sst);
//       parent.replaceChild(p, paraInput);
//       localStorage.setItem("todos", JSON.stringify(sst));
//       createUI();
//     });
//   }
// }

function toggleTodo(event) {
  if (event.target.classList.contains("input-checkbox")) {
    let id = event.target.dataset.id;
    sst[id].isDone = !sst[id].isDone;

    createUI();
  }
}

function deleteTodo(event) {
  if (event.target.classList.contains("span")) {
    let id = event.target.dataset.id;
    // update sst
    sst.splice(id, 1);
    // createUI
    createUI();
  }
}

function handleAll(event) {
  createUI();
}

function handleCompleted(event) {
  let completed = sst.filter(e => e.isDone);
  createUI(completed);
}


function handleActive() {
  let active = sst.filter(e => !e.isDone);
//   createUI 
  createUI(active);
}


function handleClear() {
  let updatedSST = sst.filter(e => !e.isDone);
  sst = updatedSST;
  createUI();
}


function selectAll(event) {
  if (counter == 0) {
    sst.forEach(todo => {
      if (!todo.isDone) {
        todo.isDone = true;
        console.log(sst);
      }
    });
    counter++;
    // console.log(counter);
  } else {
    sst.forEach(todo => {
      todo.isDone = !todo.isDone;
    });
    console.log(sst);
    counter = 0;
    // console.log(counter);
  }

  createUI();
}

createUI();
inputText.addEventListener("keyup", addTodo);
All.addEventListener("click", handleAll);
Completed.addEventListener("click", handleCompleted);
Active.addEventListener("click", handleActive);
Clear.addEventListener("click", handleClear);
ul.addEventListener("click", deleteTodo);
ul.addEventListener("click", toggleTodo);
toggleAll.addEventListener("click", selectAll);
ul.addEventListener("dblclick", createInputEditor);  
