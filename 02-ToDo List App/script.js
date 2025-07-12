const input = document.getElementById('task-input');
const addButton = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
window.addEventListener("DOMContentLoaded", loadTasks);

addButton.addEventListener( "click", () => {
    const task = input.value.trim();
    if (task) {
        addTask(task);
        input.value = '';
        saveTasks();
    }
});

function addTask(text){
    const li = document.createElement('li');
    li.textContent = text ;

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add('button-group');
    li.appendChild(buttonGroup);

    const completeButton  = document.createElement('button');
    completeButton.textContent = "complete";
    completeButton.classList.add("complete-btn");
    completeButton.addEventListener( 'click', () => {
        li.classList.toggle("completed");
        saveTasks();

    })


    const delButton = document.createElement('button');
    delButton.textContent = "Del";
    delButton.classList.add('delete-btn');
    delButton.addEventListener("click", (e) => {
        e.stopPropagation(); 
        li.remove();
        saveTasks();
    });

   
    buttonGroup.appendChild(completeButton);
    buttonGroup.appendChild(delButton);
    taskList.appendChild(li);
}

function saveTasks(){
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach( li => {
        tasks.push({
            text : li.firstChild.textContent,
            completed : li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach( task => addTask( task.text, task.completed));}