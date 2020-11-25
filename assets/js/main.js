const input_task = document.querySelector('.input-task')
const button_task = document.querySelector('.button-task')
const tasks = document.querySelector('.taks')

function createList() {
    const list = document.createElement('li')
    return list
}

function createTask(task) {
    const list = createList()
    list.innerText = task
    tasks.appendChild(list)
    clearInput()
    buttonDelete(list)
    saveTasks()
}

function clearInput() {
    input_task.value = ''
    input_task.focus()
}

function buttonDelete(list) {
    list.innerText += ' '
    
    const buttonDelete = document.createElement('button')
    buttonDelete.innerText = 'Apagar'

    buttonDelete.setAttribute('class', 'delete')
    list.appendChild(buttonDelete)
}

input_task.addEventListener('keypress', function(event) {
    if(event.keyCode === 13) {
        if(!input_task.value) return
        createTask(input_task.value)
    }
})

button_task.addEventListener('click', function() {
    if(!input_task.value) return // não deixa enviar o input vazio

    createTask(input_task.value)
})

document.addEventListener('click', function(event) {
    const el = event.target

    if(el.classList.contains('delete')) {
        el.parentElement.remove()
        saveTasks()
    }
})

function saveTasks() {
    const list = tasks.querySelectorAll('li')
    const taskList = []

    for(let task of list) {
        let taskTxt = task.innerText
        taskTxt = taskTxt.replace('Apagar', '').trim()
        taskList.push(taskTxt)
    }
    const taskJSON = JSON.stringify(taskList)
    localStorage.setItem('task', taskJSON)
}

function addSavedTasks() {
    const tasks = localStorage.getItem('task')
    const tasksList = JSON.parse(tasks)

    for(let task of tasksList) {
        createTask(task)
    }
}

addSavedTasks()
