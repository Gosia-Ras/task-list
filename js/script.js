{
    let tasks = [];

    let hideAllDone = false;

    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask },
        ];
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
        const task = tasks[taskIndex];

        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...task,
                done: !task.done
            },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const bindDoneEvent = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-doneButton");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindRemoveEvent = () => {
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
                <li class="list__item${task.done & hideAllDone ? " list__item--hide" : ""}">
                    <button class="button button__list button__list--done js-doneButton">
                        ${task.done ? "✔" : " "}
                    </button>
                     <span class="list__span${task.done ? " list__span--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="button button__list button__list--remove js-remove">
                        🗑
                    </button>    
                </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlTasksString;
    };

    const toggleAllTasksDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindAllTasksDone = () => {
        const buttonAllDone = document.querySelector(".js-buttonAllDone");
        if (!buttonAllDone) {
            return;
        };
        buttonAllDone.addEventListener("click", toggleAllTasksDone);
    };

    const toggleAllTasksHidden = () => {
        hideAllDone = !hideAllDone;
        render();
    };

    const bindHideAllTasks = () => {
        const buttonHideAllDone = document.querySelector(".js-buttonHideAllDone");
        if (!buttonHideAllDone) {
            return;
        };
        buttonHideAllDone.addEventListener("click", toggleAllTasksHidden)
    };

    const renderButtons = () => {
        let htmlButtons = "";

        if (tasks.length) {
            htmlButtons += `
                <button class="button button--section js-buttonAllDone"
                    ${tasks.every(({ done }) => done) ? "disabled" : ""}
                >
                    Mark all done
                </button>
                <button class="button button--section js-buttonHideAllDone"
                ${tasks.every( ({ done }) => !done) ? "disabled" : "" } >
                   ${hideAllDone ? "Show" : "Hide"} 
                   finished tasks 
                </button>
            `
        };
        document.querySelector(".js-sectionButtons").innerHTML = htmlButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvent();
        bindDoneEvent();
        bindAllTasksDone();
        bindHideAllTasks();
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