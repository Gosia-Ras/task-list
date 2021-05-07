{
    const tasks = [

    ];

    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,

        });
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-doneButton");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li 
                class="list__item ${task.done ? "list__item--done" : ""}"
                >
                     <button class="button js-doneButton">✔️</button>
                     <span class="list__span ${task.done ? "list__span--done" : ""}">
                         ${task.content}</span>
                    <button class="button button--remove js-remove">🗑️</button>    
                </li>
            </div>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const removeInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();

        if (!newTaskContent) {
            removeInput(newTask);
            return;
        }
        removeInput(newTask);
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}