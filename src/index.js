console.log("Hell world")
const defaultproject = []
import { compareAsc, format } from "date-fns"
import "./style.css"

const openProjectModal = document.querySelector("button.open-modal-btn");
const openItemModal = ""
const itemModalOverlay=""
const closeBtnItems=""
const createItem = document.querySelector(".submit-item")
const modalOverlay = document.querySelector(".modal-overlay-project");
const closeBtn = document.querySelector(".close-modal-btn");
const createProject = document.querySelector(".submit-project")


openProjectModal.addEventListener("click", openModal);
modalOverlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
createProject.addEventListener("click", (event) => {
    event.preventDefault();
    submitProject();
    modalOverlay.classList.add("hide")
})
function openModal() {
    modalOverlay.classList.remove("hide");
}

function closeModal(event){
    if (event.target.classList.contains("modal-overlay-project") || (event.target.classList.contains("close-modal-btn"))){
        modalOverlay.classList.add("hide")
    }
}

function submitProject(){
    const nameProject = document.querySelector("input[name=name]")
    const descriptionProject = document.querySelector("textarea[name=description]")
    const dateProject = document.querySelector("input[name=duedate]")
    const priorityProject = document.querySelector("input[name=priority]")
    const notesProject = document.querySelector("textarea[name=notes]")
    mainController.createProject(nameProject.value, descriptionProject.value, dateProject.value,
        priorityProject.value, notesProject.value)
    console.log(mainController.listProjects())
}

function saveProjects(){
    console.log("Saving projects")
}
function retrieveProjects(){
    console.log("Retrieving projects")
}
class checklistItem {
    constructor(title, description){
        this.title = title,
        this.description = description,
        this.complete = 0
    }
    setComplete(value){
        if (this.complete == 0 && value == 1){
            this.complete = value;
        } else if (this.complete == 1 && value == 0){
            this.complete = value;
        }
    }
    getInfo(){
        console.log(`The title of this is: ${this.title}, the description is ${this.description}, it is ${this.complete == 1 ? "complete" : "not complete"}`)
    }
}

class Todo extends checklistItem{
    constructor(title, description, dueDate = "", priority = 1, notes = "", itemlist = []){
        super(title, description),
        this.dueDate = dueDate,
        this.dateCreated = format(new Date(), 'yyyy-MM-dd'),
        this.priority = priority,
        this.notes = notes,
        this.itemlist = itemlist,
        this.complete = 0
    }
    //Add items to checklist
    addChecklistItem(checklistItem){
        this.itemlist.push(checklistItem)
    }
    removeChecklistItem(checklistItem){
        this.itemlist.remove(checklistItem)
    }

    countItems(){
        console.log(this.itemlist.length)
    }

    getItems(){
        return this.itemlist
    }

}; 
class Project extends Todo {
    constructor(title, description, dueDate, priority, notes, itemlist){
        super(title, description, dueDate, priority, notes, itemlist),
        this.complete = 0,
        this.dateCreated = format(new Date(), 'yyyy-MM-dd')
    }
    
    getInfo(){
        console.log(`The title of this is: ${this.title}, the description is ${this.description}, it is ${this.complete == 1 ? "complete" : "not complete"}`)
    }
    
    addTodoItem = super.addChecklistItem;
    removeTodoItem = super.removeChecklistItem;

}

function mainProgram(){
    let projectList = []
    const defaultproject = createProject("default", "Default project")
    function createProject(title, description, dueDate, priority, notes){
        const newProject = new Project(title, description, dueDate, priority, notes)
        projectList.push(newProject);
    }
    function createTodo(title, description, dueDate, priority, project){
        const newTodoItem = new Todo(title, description, dueDate, priority)
        project.addTodoItem(newTodoItem)
    }
    function createTodoItem(title, description, todo){
        const newItem = new checklistItem(title, description)
        todo.addChecklistItem(newItem)
    }
    function listProjects(){
        return projectList
    }
    function editItem(key, value, item){
        if (item[`${key}`]){
            item[key] = value
        } else {
            console.log("Object does not have this property.")
        }

    }
    return { createProject, createTodo, createTodoItem, listProjects, editItem}
}

const mainController = mainProgram()

//Separate classes into certain functions
