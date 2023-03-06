let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

async function fetchtodos(){
    // GET request
        // fetch('https://jsonplaceholder.typicode.com/todos')    // returns Promise
        //     .then(function (response){   // response object
        //         return response.json();     // converted into json and returns Promise
        //     }).then(function (data){
        //         tasks=data.slice(1,10);    // actual json object
        //         renderList();
        //     })
        //     .catch(function (error){
        //         console.log('error', error);
        //     })

                        //OR
    
    // Async await
        // try{
        //     const response= await fetch('https://jsonplaceholder.typicode.com/todos');
        //     const data=await response.json();
        //     tasks=data.slice(0,10);
        //     renderList();
        // }catch(error){
        //     console.log(error);
        // }

    // Default Data
    tasks=[{ "id": 1, "title": "Make TO DO List", "completed": false}];
    renderList();
}

function addTaskToDOM(task){
    const li=document.createElement('li');

    li.innerHTML=`
        <input type="checkbox" id="${task.id}" ${task.completed?'checked':''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />   
    `;   //data attributes data will accessed using dataset.xyz
    
    taskList.append(li);
}

function renderList () {
    taskList.innerHTML='';

    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML=tasks.length;
}

function toggleTask (taskId) {
    const task=tasks.filter(function (task){
        return task.id===Number(taskId);
    })

    if(task.length>0){
        const currentTask=task[0];

        currentTask.completed=!currentTask.completed;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }

    showNotification('Could not toggle the task');
}

function deleteTask (taskId) {
    const newTasks=tasks.filter(function (task){
        return task.id!==Number(taskId);
    })

    tasks=newTasks;
    renderList();
    showNotification('Task deleted successfully')
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task can not be added')
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e){        //e is event
    if(e.key=="Enter"){
        const text=e.target.value;          //target is elemement that triggered the event
        if(!text){
            showNotification('Task can not be empty');
            return;
        }

        const task={
            title:text, // text:text can be written as text
            id:Date.now(),
            completed:false
        }

        e.target.value='';
        addTask(task);
    }
}

function handleClickListener(e){   //event delegation
    const target=e.target;

    if(target.className==='delete'){
        const taskId=target.dataset.id;     //data attributes data will accessed using dataset.xyz
        deleteTask(taskId);
        return;
    }else if(target.className==='custom-checkbox'){
        const taskId=target.id;
        toggleTask(taskId);
        return;
    }
}

function initializeApp(){
    fetchtodos();
    addTaskInput.addEventListener('keyup',handleInputKeypress);
    document.addEventListener('click',handleClickListener);   // Event Delegation
}

initializeApp();