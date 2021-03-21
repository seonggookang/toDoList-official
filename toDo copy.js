const toDoForm = document.querySelector('.js-toDoForm'), 
toDoInput = toDoForm.querySelector('input'),
toDoList = document.querySelector('.js-toDoList'),
toDoFinished = document.querySelector('.js-finished');//////

const TODOS_LS = "toDos";

let toDos = [];
let finished = [];//////

function deleteToDo(event){ 
  const btn = event.target; 
  const li = btn.parentNode; 
  toDoList.removeChild(li); 
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id); 
  });
  toDos = cleanToDos;
  saveToDos(); 
}

function okayToDo(event){
  const btn = event.target;
}

function backToDo(event){
  const btn = event.target;
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement('button');
  const span = document.createElement("span");
  const okBtn = document.createElement("button");//////
  const backBtn = document.createElement("button");//////
  const newId = toDos.length +1;
  delBtn.innerHTML = "❌";
  okBtn.innerHTML = "✅";//////
  backBtn.innerHTML = "⏪";//////
  okBtn.addEventListener('click', okayToDo);//////
  backBtn.addEventListener('click', backToDo);//////
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  li.appendChild(okBtn);
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {  
    text: text,
    id : newId
  };
  toDos.push(toDoObj);
  saveToDos(); 
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){ 
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text); 
    })
  } 
} 

function init(){
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();