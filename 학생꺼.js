const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  ul = document.querySelector(".js-toDoList"),
  toDoFList = document.querySelector("#FINISHED"),
  toDoFList2 = document.querySelector(".js-toDoFList");

let toDos = [];
let finishedToDos = [];

function BackToDo(event) { // 뒤로 가기 버튼 클릭시 진행
  const checkBtn = document.createElement("button");
  const li = event.target.parentNode;
  li.removeChild(event.target);
  ul.appendChild(li); //pending으로 이동.(❌포함한 채로)
  checkBtn.innerText = "✅";
  li.appendChild(checkBtn);
  checkBtn.addEventListener("click", finishToDo);
  const modifiedToDos = finishedToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  const cleanToDos = finishedToDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  toDos.push(cleanToDos[0]); // 하나더라도 [0] 명시 안해주면 빈값이 들어감
  finishedToDos = modifiedToDos;
  saveToDos();
}

function finishToDo(event) { // 브이표시 클릭시 진행
  const backBtn = document.createElement("button");
  const li = event.target.parentNode;
  li.removeChild(event.target);
  toDoFList2.appendChild(li);
  backBtn.innerText = "⏪";
  li.appendChild(backBtn);
  backBtn.addEventListener("click", BackToDo);

  const modifiedToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  
  finishedToDos.push(cleanToDos[0]);
  toDos = modifiedToDos;
  saveToDos();
}

function deleteToDo(event) {
  const li = event.target.parentNode; // li태그
  const ul = li.parentNode; // li태그를 감싸는 ul태그
  ul.removeChild(li); // ul에서 방금막 클릭한 거 삭제
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); // toDos 배열에 있는 것들중 방금 클릭 안한거만 반환
  });
  const cleanFToDos = finishedToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); // finishedToDos 배열에 있는 것들중 방금 클릭 안한거만 반환
  });
  toDos = cleanToDos; // 새로운 toDos로 교체
  finishedToDos = cleanFToDos; // 새로운 finishedToDos로 교체
  saveToDos(); // 로컬에 저장 -> 새로고침해도 변화 없게 하기 위함
}

function saveToDos() { // 로컬 저장하는 방법
  localStorage.setItem("PENDING", JSON.stringify(toDos));//로컬에 저장할 땐 문자열로 변환(stringify)
  localStorage.setItem("FINISHED", JSON.stringify(finishedToDos));
}

let indexNum = 1;

function paintFinishToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = indexNum;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", BackToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  toDoFList2.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  finishedToDos.push(toDoObj);
  saveToDos();
  indexNum += 1;
}

function paintToDo(text) { // text : 니가방금 입력한 값
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = indexNum;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  checkBtn.innerText = "✅";
  checkBtn.addEventListener("click", finishToDo);

  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = newId;
  ul.appendChild(li);// ul 에 li 삽입
  const toDoObj = {
    text: text, // 내가 입력한 값
    id: newId // 번호 부여 1부터 시작
  };
  toDos.push(toDoObj); // 배열에 객체 삽입
  saveToDos(); // 로컬에 저장
  indexNum += 1; // 번호 1씩 추가
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("PENDING");
  const loadedFinishedToDos = localStorage.getItem("FINISHED");
  if (loadedToDos) { // loadedToDos에 뭔가 있다면
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text); // 각각 value에 객체로 저장돼있는 상황
      // text, id값 각각 부여돼있음. 그 중 text를 가리킴
    });
  }
  if (loadedFinishedToDos !== null ) { // loadedFinishedToDos에 뭔가 있다면
    const parsedFinishedToDos = JSON.parse(loadedFinishedToDos);
    parsedFinishedToDos.forEach(function (toDo) {
      console.log(toDo); // 객체가 나옴
      console.log(toDo.text); // 객체안의 텍스트만 나옴
      paintFinishToDo(toDo.text);      
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();