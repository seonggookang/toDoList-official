const pendingList = document.getElementById("js-pending"),
  finishedList = document.getElementById("js-finished"),
  form1 = document.getElementById("js-form"),
  input1 = form1.querySelector("input");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks =[],
 finishedTasks =[];

function getTaskObject(text) {
  return {
    id: String(Date.now()),
    text
  };
}

function findInFinished(taskId) {
  return finishedTasks.find(function(task) {
    return task.id === taskId;
  });
}

function findInPending(taskId) {
  return pendingTasks.find(function(task) {
    return task.id === taskId;
  });
}

function removeFromPending(taskId) {
  pendingTasks = pendingTasks.filter(function(task) {
    return task.id !== taskId;
  });
}

function removeFromFinished(taskId) {
  finishedTasks = finishedTasks.filter(function(task) { // task는 배열 안에 있는 요소 하나하나필터링
    return task.id !== taskId;
  });
}

function deleteTask(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  saveState();
}

function handleFinishClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  finishedTasks.push(task);
  paintFinishedTask(task);
  saveState();
}

function handleBackClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  pendingTasks.push(task);
  paintPendingTask(task);
  saveState();
}

function buildGenericLi(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  span.innerText = task.text;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTask);
  li.append(span, deleteBtn);
  li.id = task.id;
  return li;
}

function paintPendingTask(task) {
  const genericLi = buildGenericLi(task);
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✅";
  completeBtn.addEventListener("click", handleFinishClick);
  genericLi.append(completeBtn);
  pendingList.append(genericLi);
}

function paintFinishedTask(task) {
  const genericLi = buildGenericLi(task);// 빌드 제너레잇 아이콘 리스트
  const backBtn = document.createElement("button");
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", handleBackClick);
  genericLi.append(backBtn);
  finishedList.append(genericLi);
}

function saveState() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function restoreState() {
  pendingTasks.forEach(function(task) {
    paintPendingTask(task);
  });
  finishedTasks.forEach(function(task) {
    paintFinishedTask(task);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const taskObj = getTaskObject(input1.value);// 입력한거에 id 붙이고 taskObj에 할당
  input1.value = ""; //비워줌
  paintPendingTask(taskObj); // 입력한거 그려줌
  pendingTasks.push(taskObj);
  saveState();
}

function init() {
  form1.addEventListener("submit", handleFormSubmit);
  loadState();
  restoreState();
}
init();
