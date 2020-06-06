
const tasksList = document.querySelector('#tasksList');

// Массив для хранения задач
let tasks = [];

let tasksJSON = localStorage.getItem('tasks');

if(tasksJSON){
    let tasksArray = JSON.parse(tasksJSON);
    tasks = tasksArray;
    tasks.forEach(function(item){

        // Разметка для новой задачи
     const taskHTML = `
    <li class="list-group-item d-flex justify-content-between">
    <span class="task-title">${item}</span>
    <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
    </li>
    `;

     // вставляем задачу в общий список задач 
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    });
}

// 1. Находим форму на странице
const form = document.querySelector('#NewTaskForm');
// 2. Отслеживаем событие отправки формы
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Отмена стандартного поведения, в нашем случае для сабмит (чтоб не перезагружалась страница)

    const taskInput = document.querySelector('#addNewTask'); // Находим инпут
    const taskText = taskInput.value; // Берем значение из инпута. Текст задачи

    tasks.push(taskText);

    // Сохраняем в LocalStorage JSON строку от массива tasks под ключем tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // формируем разметку для новой задачи 
    const taskHTML = `
    <li class="list-group-item d-flex justify-content-between">
    <span class="task-title">${taskText}</span>
    <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
    </li>
    `;

    // вставляем задачу в общий список задач 
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    // очищаем инпут 
    taskInput.value = "";
});


// Удаление задач 
// Прослушка клика внутри списка с задачами
tasksList.addEventListener('click', function (event) {

    // Проверка клика по кнопке УДАЛИТЬ
    if (event.target.getAttribute("data-action") === "delete-task") {
        // Удаляем задачу из массива tasks
        // 1. Получить текст задачи
        const taskText = event.target.closest('li').querySelector('.task-title').textContent;


        // 2. Определить индекс задачи в массиве таскс 
        /*
          .index.Of(value)
          tasks =  ["GO to the shop", "Выгулять собаку", "купить хлеб ", "посмотреть вебинар "];
        .index.Of('Выгулять собаку')
         */
        const taskIndex = tasks.indexOf(taskText);


        // 3. Удалить задачу тз массива 
        /*
        .splice(index, count)
        *удалить один из элементов массива, начиная (включая) с индекса 2
        *tasks.splice(2,1);
         */

        tasks.splice(taskIndex, 1);

        // Сохраняем в LocalStorage JSON строку от массива tasks под ключем tasks
        localStorage.setItem('tasks', JSON.stringify(tasks));


        // Обращаемся к родителю кнопки(к тегу <li>) и удаляем его
        event.target.parentElement.remove();
        // event.target.closest('li').remove(); Для тех случаев когда кнопка лежит не напрямую в
        // блоке который нужно удалить а обернута еще во что-то
        // data атрибуты можно создздавать в хтмл добавляя после слова data- любое логическое название 
    }
});

// ------------------- LocalStorage-----------------------

// localStorage.setItem('name', 'Yurij');
// localStorage.setItem('lesson', 'JavaScript');
// 


/*
 ОТКРЫТИЕ ПРИЛОЖЕНИЯ
 1. Проверять localStorage - есть ли в нем задачи
 2. Если задачи есть 
 - заносим их в массив tasks 
 - отображаем их на странице 
3. Если задач нет
- оставляем массив tasks пустым

ДОБАВЛЕНИЕ ЗАДАЧ 
1. Добавление новой задачи - добавляем в массив tasks
2. Отображаем на странице 
3. Сохранить массив tasks в LocalStorage

УДАЛЕНИЕ ЗАДАЧ 
1. Удаление из массива tasks
2. Удаление на странице
3. Сохранить массив tasks в LocalStorage

*/

/* 

СОХРАНЕНИЕ ДАННЫХ В LOCALSTORAGE 
1.Преобразуем массив в JSON
2.Cохрагяем JSON в LocalStorage

ПОЛУЧЕНИЕ ДАННЫХ ИЗ LOCALSTORAGE
1.Получаем данные из JSON
2.Переводим данные из JSON в массив 

*/