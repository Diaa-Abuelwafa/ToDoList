let buttonAdd = document.querySelector(".container .task-input .add");
let taskInput = document.querySelector(".container .task-input .input");
let tasksDiv = document.querySelector(".container .tasks");
let tasks = [];

if (window.localStorage.getItem("tasks"))
{
    let data = JSON.parse(window.localStorage.getItem("tasks"));

    for (let i = 0; i < data.length; ++i)
    {
        addToContent(data[i].content);
        addToArray(data[i].content);
    }
}

function addToContent (task)
{
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    let taskResult = document.createElement("div");
    taskResult.classList.add("result");
    taskResult.innerHTML = task;

    let deleteInput = document.createElement("button");
    deleteInput.classList.add("delete");
    deleteInput.innerHTML = "Delete";


    taskDiv.append(taskResult);
    taskDiv.append(deleteInput);

    tasksDiv.append(taskDiv);
}

function addToArray(task)
{
    let obj =
    {
        num: tasks.length,
        content: task,
    }

    tasks.push(obj);
}

function addToLocalStorage (tasks)
{
    let str = JSON.stringify(tasks);

    window.localStorage.setItem("tasks", str);
}


buttonAdd.onclick = function ()
{
    if (taskInput.value.length > 0)
    {
        addToContent(taskInput.value);
        addToArray(taskInput.value);
        addToLocalStorage(tasks);
        taskInput.value = "";
    }
}

document.addEventListener("click", function (e)
{
    let buttonDelete = document.querySelectorAll(".container .tasks .delete");
    let buttonDeleteArr = Array.from(buttonDelete);
    if (e.target.className === "delete")
    {
        let indx = buttonDeleteArr.indexOf(e.target);

        let tasks2 = [];

        for (let i = 0 ; i < tasks.length; ++i)
        {
            if (i != indx)
            {
                tasks2.push(tasks[i]);
            }
        }

        tasks = tasks2;

        tasksDiv.innerHTML = "";

        for (let i = 0; i < tasks.length; ++i)
        {
            addToContent(tasks[i].content);
        }

        addToLocalStorage(tasks);
    }
})