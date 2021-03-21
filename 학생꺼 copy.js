const todoForm = document.querySelector('.js-toDoList'),
toDoInput = document.querySelector('input'),
toDoList = document.querySelector('.js-toDoList'),
toDoFList = document.querySelector('#FINISHED'),
toDoFList2 = document.querySelector('.js-toDoFList');

const TODO_LS = "PENDING";
const TODOS_lS2 = "FINISHED";

let toDos = [];
let finishedToDos = [];




function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement('button');
  const span = document.createElement('span'); // 이 span은 왜 하는가?
  const newId = indexNum;

  delBtn.innerText = "❌";
  delBtn.addEventListener('click', deleteToDo);
  checkBtn.innterText = "✅";
  checkBtn.addEventListener('click', finishToDo);

  span.innterText = text; // 여기군
}


function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos); 
    parsedToDos.forEach(function(toDo){ // js에서 다뤄주려면 JSON.parse해줘야함
      paintToDo(toDo);
    })
  }

  const loadedFinishedToDos = localStorage.getItem(TODOS_LS2);
  if(loadedFinishedToDos !== null){
    const parsedFinishedToDos = JSON.parse(loadedFinishedToDos);
    parsedFinishedToDos.forEach(function (toDo) {
      paintFinishToDo(toDo);
    })
  }
}


function init(){
  loadToDos();
}

init();