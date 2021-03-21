const toDoForm = document.querySelector('.js-toDoForm'), // 상수들이 다른 .js파일과 충도하게 되므로 각각 다르게 해줘야함.// 
toDoInput = toDoForm.querySelector('input'),
toDoList = document.querySelector('.js-toDoList');
   
const TODOS_LS = "toDos";

let toDos = [];// const면 상수니까 값을 변경할 수 없음

function deleteToDo(event){  // 삭제 기능
  const btn = event.target; // 내가 딱 클릭한 것 event.target. 이걸 알아야 컴터는 뭐가 선택됐는지 알고 지울수 있는 기반이 됨
  const li = btn.parentNode;  // 내가 딱 클린한 것의 특정 번호를 알려줌
  toDoList.removeChild(li); // ul에 저장돼있던 li 제거, // 여기까지만 하면 refresh했을때 그대로 다시 생김
  const cleanToDos = toDos.filter(function(toDo){// 조건 부합하는거 찾기
    console.log(toDo.id, li.id); // 밑의 줄을 행하는데 에러가 생김.  이런일이 빈번히 일어남. 확인해보니 좌측은 숫자, 우측은 문자. 이래서 console.log를 찍으면서 해야함
    return toDo.id !== parseInt(li.id); //parseInt:문자를 숫자로 바꿔줌 왼쪾 오른쪽 형식 맞춰줘야 비교를 할 수 있음
  });// filter: 함수 하나를 실행시킴
  toDos = cleanToDos;// old한것을 new것으로 교체
  saveToDos(); // 여기까지 하면 local storage랑html(브라우저) 모두에서사라짐 
}

function saveToDos(){ // 로컬에 저장 기능
  // 로컬 스토리지에는 js의 데이터를 저장할 수 없음
  // js는 localStorage 안에 있는 모든 데이터를 string으로 저장하려고함
  // string으로 되도록 바꾸는 작업 필요함
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //( stringify : object -> string  ) <<-- 이거 안해줄 시 인식을 못함 why?? -->
  // toDos는 객체이고, ★★★setItem은 string만 인식함★★★
  // JSON.parse : js의 string -> object
}

function paintToDo(text){ // 웹브라우저에 가시적으로 보이게 하는 기능
  // document.querySelector : HTML에서 필요한 것을 얻음
  // document.createElement : 생성함
  const li = document.createElement("li");  // li 생성
  const delBtn = document.createElement('button');// delbtn 생성
  const span = document.createElement("span");//span 생성
  delBtn.innerHTML = "❌"; // dleBtn에 이모지입력
  delBtn.addEventListener('click', deleteToDo); // 삭제 버튼 눌렀을 경우 실행
  span.innerText = text;// span 안에 text입력 (submit통해 내가쓴거)
  li.appendChild(delBtn);// li에 delBtn 넣음
  li.appendChild(span);// li에 span 넣음
  li.id = toDos.length + 1 ; // li의 id에 번호 부여->> 나중에 삭제할때 어떤걸 삭제하는지 파악해주기 위해
  toDoList.appendChild(li); // ul에  li 넣음
  const toDoObj = {  
    text: text, 
    id : toDos.length +1
  };
  toDos.push(toDoObj);// push로 toDos 배열안에 toDoObj라는 객체 추가
  saveToDos(); // push 한 이후 호출을 해야함.
}

function handleSubmit(event){ // 클릭에 대한 이벤트핸들러
  event.preventDefault(); // 새로고침해도 처음으로 돌아가는거 방지
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // submit 후 입력한 거 없애는 코드
}

function loadToDos(){// 로컬 스토리지에서 불러오기
  const loadedToDos = localStorage.getItem(TODOS_LS);// [1] toDos를 가져온다.
  if(loadedToDos !== null){ 
    console.log(loadedToDos); // 불러온게 모두 string임
    // js로 다룰거면 JSON.parse이용해서 string -> object 바꿔줘야함
    // JavaScript Object Notation
    // JSON.parse: 데이터 전달시 js가 다룰 수 있도록 object로 바꿔주는 기능
    const parsedToDos = JSON.parse(loadedToDos);// [2] parse로인해 object로 변형됨
    console.log(parsedToDos); // 불러온게 모두 객체임
    parsedToDos.forEach(function(toDo) {// [3] 리스트 안에 있는 것들에 대해 paintToDo라는 함수 실행 // 지금 만들 이함수를 , parsedToDos 안에 있는 걸들(여기선 toDo) 각각에 대해 실행함. toDo가 key라고 생각
    // filter는 배열을 위한 함수임
      paintToDo(toDo.text); 
    }) // forEach : array에 담겨있는 것들을 각각에 한 번씩 함수 실행
    // parsedToDos.forEach(something); //parsedToDos에 대하여 각각 something이라는 함수를 실행 할거임
    // array도 function이 있고, string도 function 이 있고, object 도 function있음
    // 많은 경우에 array가 있고 그 안에 있는 각각에 대해 뭔가를 해줘야 함 .js가 도와줄것임 forEach같은 것으로
  } 
}

function init(){
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
