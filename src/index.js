console.log("Hell world")
const defaultproject = []
import { compareAsc, format } from "date-fns"
import "./style.css"

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
    constructor(title, description, dueDate, priority, notes = "", itemlist = []){
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
    function createProject(title, description, dueDate, priority){
        const newProject = new Project(title, description, dueDate, priority)
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

window.program = mainProgram()

//Separate classes into certain functions
