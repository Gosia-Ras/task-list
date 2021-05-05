{
    const tasks = [
        {
            content: "do homework",
            done: false,
        },
        {
            content: "tidy the flat",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}>
            ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,

        });

        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask").value.trim();

        if (newTask === "") {
            return;
        }

        addNewTask(newTask);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}