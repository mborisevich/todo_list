console.log("Hell world")
const defaultproject = []
import {checklistItem, Todo, Project} from "./classes.js"
import {DOMController} from "./screencontroller.js"
import { format } from "date-fns"
import "./style.css"


function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException && 
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        )
    }
}

if (storageAvailable("localStorage")) {
    console.log("We can use storage")
    } else {
        console.log("No local storage available.")

}

function mainProgram(){
    document.addEventListener("DOMContentLoaded", function() {
        retrieveProjects();
        displayController.refreshProjects();
      });
    let projectList = []
    let projectCount = 0
    let itemCount = 0
    function createProject(title, description, dueDate, priority, notes, itemlist = []){
        const newProject = new Project(title, description, dueDate, priority, notes, itemlist)
        projectList.push(newProject);
        return newProject
    }
    function createTodo(title, description, dueDate, priority, notes, project){
        const newTodoItem = new Todo(title, description, dueDate, priority, notes)
        project.addTodoItem(newTodoItem)
    }
    function createTodoItem(title, description, todo){
        const newItem = new checklistItem(title, description)
        todo.addChecklistItem(newItem)
    }
    function listProjects(){
        sortProjectsPriority(projectList)
        return projectList
    }
    function editProject(project, title, description, dueDate, priority, notes){
        project.title = title;
        project.description = description;
        project.dueDate = dueDate;
        project.priority = priority;
        project.notes = notes;
    }
    function editItem(item, title, description, dueDate, priority, notes){
        item.title = title;
        item.description = description;
        item.dueDate = dueDate;
        item.priority = priority;
        item.notes = notes;
    }
    function deleteItem(project, index){
        project.removeTodoItem(index);

    }
    function deleteProject(index){
        projectList.splice(index, 1)
    }
    function clearSave(){
        localStorage.clear()
    }
    function saveProjects(){
        clearSave()
        for (let i = 0; i < projectList.length; i++){
            localStorage.setItem(`project-${i}`, JSON.stringify(projectList[i]))
        }
    }
    function retrieveProjects(){
        for (let i in localStorage){
            console.log(i)
                if (localStorage.getItem(i) && i.split("-")[0] == "project" && JSON.parse(localStorage.getItem(i)).title != "default"){
                    let project = JSON.parse(localStorage.getItem(i))
                    let title = project.title
                    let description = project.description
                    let dueDate = project.dueDate
                    let priority = project.priority
                    let notes = project.notes
                    let items = project.itemlist
                    console.log(title)
                    console.log(items)
                    const projectData = createProject(title, description, dueDate, priority, notes)
                    for (let i in items){
                        let itemTitle = items[i].title
                        let itemDescription = items[i].description
                        let itemDueDate = items[i].dueDate
                        let itemPriority = items[i].priority
                        let notes = items[i].notes
                        createTodo(itemTitle, itemDescription, itemDueDate, itemPriority, notes, projectData)
                    }
                }
        }

    }

    function listProjectsNew(sorter, list){
        sorter(list)
    }
    function sortProjectsPriority(projectList){
        projectList.sort((a,b) => {
            const priorityA = a.getPriority()
            const priorityB = b.getPriority()
            if (priorityA > priorityB){
                return 1
            }
            if (priorityA < priorityB){
                return -1
            }
        })
    }
    function sortProjectsDuedate(){
        console.log("sorting by duedate")
    }
    return { createProject, createTodo, createTodoItem, listProjects, editItem, editProject, deleteProject, deleteItem, retrieveProjects, saveProjects}
}

const mainController = mainProgram()
const displayController = DOMController(mainController)
displayController.InitializeMain();

//Separate classes into certain functions
