{
    let tasks = [];

    let hideDoneButton = false;

    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask },
        ]
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [ 
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done }, //dlaczego to działa? jak to przeczytać?
            ...tasks.slice(taskIndex + 1),
    ]
        render();
    };

    const bindDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-doneButton");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindRemoveEvents = () => {
            const removeButtons = document.querySelectorAll(".js-remove");

            removeButtons.forEach((removeButtons, index) => {
                removeButtons.addEventListener("click", () => {
                    removeTask(index);
                });
            });
        };

    const renderTasks = () => {
        let htmlTasksString = "";

        for (const task of tasks) {
            htmlTasksString += `
                <li class="list__item">
                     <button class="button button--done js-doneButton">
                        ${task.done ? "✔" : " "}
                     </button>
                     <span class="list__span ${task.done ? "list__span--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="button button--remove js-remove">
                        🗑
                    </button>    
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlTasksString;
    };

    const renderButtons = () => {
        let htmlButtons = "";

        if (tasks.length > 0) {
            htmlButtons += `
            <button class="js-buttonAllDone">Mark all done</button>
            <button class="js-buttonHideAllDone">Hide all done</button>
            `
        };
        
        document.querySelector(".list__section").innerHTML = htmlButtons;
            // add buttons in HTML when there is at least one task on the list
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindDoneEvents();
    };

    const resetInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();

        if (!newTaskContent) {
            resetInput(newTask);
            return;
        }
        resetInput(newTask);
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}