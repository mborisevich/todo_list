console.log("Hell world")
const defaultproject = []
import {checklistItem, Todo, Project} from "./classes.js"
import {DOMController} from "./screencontroller.js"
import { format } from "date-fns"
import "./style.css"



function saveProjects(){
    console.log("Saving projects");
}

function retrieveProjects(){
    console.log("Retrieving projects");
}

function mainProgram(){
    let projectList = []
    const defaultproject = createProject("default", "Default project", format(new Date(), 'yyyy-MM-dd'), 5, "none")
    function createProject(title, description, dueDate, priority, notes){
        const newProject = new Project(title, description, dueDate, priority, notes)
        projectList.push(newProject);
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
    return { createProject, createTodo, createTodoItem, listProjects, editItem, editProject}
}

const mainController = mainProgram()
const displayController = DOMController(mainController)
displayController.InitializeMain();
//Separate classes into certain functions
