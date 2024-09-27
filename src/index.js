console.log("Hell world")
const defaultproject = []
import { compareAsc, compareDesc, format } from "date-fns"
import "./style.css"

const openProjectModal = document.querySelector("button.open-modal-btn");
const modalProjectOverlay = document.querySelector(".modal-overlay.project-overlay");
const closeBtn = document.querySelector(".close-modal-btn.project-modal");
const createProject = document.querySelector(".submit-project")

const openItemModal = document.querySelector("button.open-modal-btn-item")
const closeItemModal = document.querySelector(".close-modal-btn.item-modal")
const modalItemOverlay=document.querySelector(".modal-overlay.item-overlay")
const createItem = document.querySelector(".submit-item")
const viewProjects = document.querySelector(".view-projects")
const viewItems = document.querySelector(".view-items")
const projectContainer = document.querySelector("div[id=project-container]")

viewItems.addEventListener("click", event => displayController.refreshTodoItems())
viewProjects.addEventListener("click", event => displayController.refreshDOMProjects())
openItemModal.addEventListener("click", event => openModalItems(modalItemOverlay,mainController.listProjects()))
closeItemModal.addEventListener("click", event => closeModal(event, modalItemOverlay))
modalItemOverlay.addEventListener("click", event => closeModal(event, modalItemOverlay))
openProjectModal.addEventListener("click",  event => openModal(modalProjectOverlay));
modalProjectOverlay.addEventListener("click", event => closeModal(event, modalProjectOverlay));
closeBtn.addEventListener("click", event => closeModal(event, modalProjectOverlay));
createProject.addEventListener("click", (event) => {
    event.preventDefault();
    submitProject();
    modalProjectOverlay.classList.add("hide");
})
createItem.addEventListener("click", (event) => {
    event.preventDefault();
    submitItem();
    modalItemOverlay.classList.add("hide");
});

function openModal(overlay) {
    overlay.classList.remove("hide");
}

function closeModal(event, overlay){
    if (event.target.classList.contains("modal-overlay") || (event.target.classList.contains("close-modal-btn"))){
        overlay.classList.add("hide");
    }
}


function openModalItems(overlay, itemList){
    openModal(overlay);
    generateProjectlistDOM(itemList)
}
function submitProject(){
    const nameProject = document.querySelector("input[name=project-name]");
    const descriptionProject = document.querySelector("textarea[name=project-description]");
    const dateProject = document.querySelector("input[name=project-duedate]");
    const priorityProject = document.querySelector("input[name=project-priority]");
    const notesProject = document.querySelector("textarea[name=project-notes]");
    mainController.createProject(nameProject.value, descriptionProject.value, dateProject.value,
        priorityProject.value, notesProject.value);
    console.log(mainController.listProjects());
    displayController.refreshDOMProjects();
}

function submitItem(){
    const nameItem = document.querySelector("input[name=name]");
    const descriptionItem = document.querySelector("textarea[name=description]");
    const dateItem= document.querySelector("input[name=duedate]");
    const priorItem = document.querySelector("input[name=priority]");
    const notesItem= document.querySelector("textarea[name=notes]");
    const project = document.querySelector("select[name=project-choice]");
    let indexNumber = project.selectedIndex;
    console.log(indexNumber);
    mainController.createTodo(nameItem.value, descriptionItem.value, dateItem.value,
        priorItem.value, notesItem.value, mainController.listProjects()[indexNumber]);
    console.log(mainController.listProjects())
}
function generateProjectlistDOM(list){
    const selectBar = document.querySelector("select[name=project-choice]");
    while (selectBar.hasChildNodes()){
        selectBar.removeChild(selectBar.firstChild);
    }
    for (let i=0; i<list.length; i++){
        let selectItem = document.createElement("option");
        selectItem.setAttribute("value", list[i].title);
        selectItem.setAttribute("id", `${i}`);
        selectItem.innerHTML = list[i].getTitle();
        selectBar.appendChild(selectItem);
    }
}

function saveProjects(){
    console.log("Saving projects");
}

function retrieveProjects(){
    console.log("Retrieving projects");
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
    getTitle(){
        return this.title
    }
    getDescription(){
        return this.description
    }
    getComplete(){
        return this.complete
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
    sortItemsPriority(){
        this.itemlist.sort((a,b) => {
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
    sortByDate(){
        this.itemlist.sort((a,b) => {
            return compareAsc(a.getDuedate(), b.getDuedate())
        })
    }
    getItems(sorter=this.sortByDate()){
        console.log(this.itemlist)
        return this.itemlist
    }
    getPriority(){
        return this.priority
    }
    getDuedate(){
        return this.dueDate
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
    getTitle = super.getTitle;
    getPriority = super.getPriority;


}
function DOMController(){
    function clearDOMProjects(){
        while (projectContainer.hasChildNodes()){
            projectContainer.removeChild(projectContainer.firstChild);
        }
    }
    function refreshDOMProjects(){
        clearDOMProjects()
        mainController.listProjects().forEach(element => {
            let projectContainer = document.querySelector("div[id=project-container]")
            let projectElement = document.createElement("div")
            let spanElement = document.createElement("span")
            let spanEdit = document.createElement("span")
            let buttonElement = document.createElement("button")
            let header = document.createElement("h1")
            let text = document.createElement("p")
            projectElement.classList.add("project")
            spanElement.setAttribute("id", "expand")
            spanEdit.setAttribute("id", "edit")
            console.log(element)
            console.log(element.getTitle())
            header.innerHTML = element.getTitle()
            text.innerHTML = element.getDescription()
            projectElement.appendChild(buttonElement)
            projectElement.appendChild(spanElement)
            projectElement.appendChild(spanEdit)
            projectElement.appendChild(header)
            projectElement.appendChild(text)
            projectContainer.appendChild(projectElement)
            spanElement.addEventListener("click", event => {
                clearDOMProjects();
                viewItems(element, element.getItems())
                
            })
        })
    }
    function viewChecklist(todo){
        clearDOMProjects();
        todo.getItems().forEach(subItem => {
        console.log("expanding item")
        let itemElement = document.createElement("div")
        let spanElement = document.createElement("span")
        let buttonElement = document.createElement("button")
        let header = document.createElement("h1")
        let projectName = document.createElement("p")
        let dueDate = document.createElement("p")
        let text = document.createElement("p")
        itemElement.classList.add("item")
        spanElement.setAttribute("id", "expand")
        header.innerHTML = subItem.getTitle()
        dueDate.classList.add("due-date")
        text.innerHTML = subItem.getDescription()
        itemElement.appendChild(buttonElement)
        itemElement.appendChild(spanElement)
        itemElement.appendChild(header)
        itemElement.appendChild(dueDate)
        itemElement.appendChild(projectName)
        itemElement.appendChild(text)
        projectContainer.appendChild(itemElement)
        })
    }
    //Streamline view project and item functions 
    function viewItems(project, itemlist=project.getItems()){
        itemlist.forEach(item => {
                let itemElement = document.createElement("div")
                let spanElement = document.createElement("span")
                let spanEdit = document.createElement("span")
                let buttonElement = document.createElement("button")
                let header = document.createElement("h1")
                let projectName = document.createElement("p")
                let dueDate = document.createElement("p")
                let text = document.createElement("p")
                itemElement.classList.add("item")
                spanElement.setAttribute("id", "expand")
                spanEdit.setAttribute("id", "edit")
                console.log(item)
                console.log(item.getTitle())
                header.innerHTML = item.getTitle()
                projectName.innerHTML = `Project: ${project.getTitle()}`
                projectName.classList.add("project-name")
                dueDate.innerHTML = `Deadline: ${item.getDuedate()}`
                dueDate.classList.add("due-date")
                text.innerHTML = item.getDescription()
                itemElement.appendChild(buttonElement)
                itemElement.appendChild(spanElement)
                itemElement.appendChild(spanEdit)
                itemElement.appendChild(header)
                itemElement.appendChild(dueDate)
                itemElement.appendChild(projectName)
                itemElement.appendChild(text)
                projectContainer.appendChild(itemElement)
                spanElement.addEventListener("click", event => {
                    viewChecklist(item);
                })
        
        })


    }
    function refreshTodoItems(){
        clearDOMProjects()
        console.log("displaying todo items...")
        let projectContainer = document.querySelector("div[id=project-container]")
        mainController.listProjects().forEach(element => {
            viewItems(element,element.getItems())
        })
    }
    
    return {refreshDOMProjects, clearDOMProjects, refreshTodoItems}
    
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
    function sortByDate(list){

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
const displayController = DOMController()
//Separate classes into certain functions
