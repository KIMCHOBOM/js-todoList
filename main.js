//사용자가 입력한 할일 가져오기
let taskInput = document.getElementById("task-input");

//+버튼 가져오기
let addButton = document.getElementById("add-button");

//탭 정보 가져오기(여러개를 선택해야하므로 querySelectorAll)
let tabs = document.querySelectorAll(".task-tabs div");

//할일을 담을 배열
let taskList = [];

//클릭된 tab의 id 담을 변수 생성 (디폴트는 all로)
let mode = 'all';

//진행중인 아이템을 모아놓을 리스트를 생성
let filterList = [];

//클릭한 탭의 정보를 event로 받기
for(let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)
    });
}

//add-button버튼 클릭시 addTask함수 실행(+버튼)
addButton.addEventListener("click", addTask);


//+버튼 클릭시 실행될 함수
function addTask() {

    // //사용자가 입력한 할일의 내용 가져오기
    // let taskContent = taskInput.value;

    //할일의 상태(완료, 진행중)를 담을 객체 생성 + 사용자가 입력한 할일 내용 가져오기!
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }

    //할일을 배열에 추가
    taskList.push(task);
    console.log(taskList);
 
    //UI 업데이트!
    render();
}

//할일들을 화면에 그려주기
function render(){
    //탭선택에 맞춰 아이템리스트를 띄울거임 => 리스트를 새로 하나 만들어 상태별로 모아 담을 것임
    let list = [];

    //모두 탭을 눌렀을 때 표시될 아이템 리스트
    if(mode === "all"){
        list = taskList;

    } else if(mode === "ongoing" || "done") { 
        list = filterList;  //진행중 탭을 눌렀을 때 표시될 아이템 리스트

    }

    //완료 탭을 눌렀을 때 표시도리 아이템 리스트

    let resultHtml = "";

    //할일이 여러개니까 여러개 그려줄거임!
    for(let i = 0; i < list.length; i++ ){      
        if(list[i].isComplete == true){     //isComplete가 true면 밑줄을 그어줌
            //Check버튼 생성과 동시에 클릭 이벤트 생성
            resultHtml += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>
        `;
        }else{
            //Check버튼 생성과 동시에 클릭 이벤트 생성
            resultHtml += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>
            `;
        }

    }


    //task-board에 resultHtml을 붙여넣을 거야
    document.getElementById("task-board").innerHTML = resultHtml;
}

//check버튼 클릭시 isComplete 속성 변경
function toggleComplete(id){

    for(let i = 0; i < taskList.length; i++){   //클릭한 아이템의 아이디를 가져와 할일을 담은 배열에서 찾아준다
        if(taskList[i].id == id){   //같은 아이디의 객체의 상태를 반대로 바꿔준다 (!taskList[i].isComplete = 반댓값)
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    //UI 업데이트!
    render();
}

//delete버튼 클릭시 삭제 (splice)
function deleteTask(id) {
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1);   //i번째 아이템을 1개 삭제하겠다!
            break;
        }
    }
    //UI 업데이트!
    render();
}

//
function filter(event){     //addEventListner로 부터 event 매개변수 받음
    //클릭된 tab의 id
    mode = event.target.id      //event.target으로 받으면 div전체가 받아짐! 우리는 div의 id만 필요하므로 event.target.id만 써준다

    //아이템의 상태에 따라 담을 리스트
    filterList = [];

    //id가 all이면 전체리스트를 보여준다
    if (mode === "all") {
        render();
        
    } else if (mode === "ongoing"){    //진행중인 아이템만 보여준다 (task.isComplete = false)
        for(let i =0; i < taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);

            }
        }
        render();
        
    } else if (mode === "done"){       //완료된 아이템만 보여준다 (task.isComplete = true)
        for(let i =0; i < taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);

            }
        }
        render();
    }
}

//할일 객체에 아이디 부여 함수
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
    
}




