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
viewProjects.addEventListener("click", event => displayController.refreshProjects())
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
    displayController.refreshProjects();
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
    const modalOverlay = document.querySelector(".edit-overlay")
    function formFromObject(element){
        let properties = Object.keys(element)
        let elementList = []
        console.log(properties)
        properties.forEach(key => {
            switch(key){
                case "title":
                    const nameLabel = document.createElement("label")
                    const name = document.createElement("input")
                    nameLabel.textContent = "Project name:"
                    name.setAttribute("name", "project-name")
                    name.setAttribute("type", "text")
                    name.setAttribute("id", "project-name")
                    name.setAttribute("required", "")
                    name.setAttribute("maxlength", "60")
                    nameLabel.setAttribute("for","project-name")
                    elementList.push(nameLabel, name)
                    break;
                case "description":
                    const description = document.createElement("textarea")
                    const descLabel = document.createElement("label")
                    description.setAttribute("name","project-description")
                    description.setAttribute("id", "project-description")
                    description.setAttribute("col", "10")
                    description.setAttribute("rows", "5")
                    description.setAttribute("required", "")
                    descLabel.textContent = "Description:"
                    elementList.push(descLabel, description)
                    break;
                case "dueDate":
                    const dueDate = document.createElement("input")
                    const dateLabel = document.createElement("label")
                    dueDate.setAttribute("name","project-duedate")
                    dueDate.setAttribute("type", "date")
                    dueDate.setAttribute("id", "project-duedate")
                    dueDate.setAttribute("required", "")
                    dateLabel.textContent = "Due date:"
                    elementList.push(dateLabel, dueDate)
                    break;
                case "priority":
                    const priority = document.createElement("input")
                    const priorityLabel = document.createElement("label")
                    priority.setAttribute("name","project-priority")
                    priority.setAttribute("id", "project-priority")
                    priority.setAttribute("required", "")
                    priority.setAttribute("type", "number")
                    priority.setAttribute("min", "1")
                    priority.setAttribute("max", "5")
                    priorityLabel.textContent = "Priority:"
                    elementList.push(priorityLabel, priority)
                    break;
                case "notes":
                    const notes = document.createElement("textarea")
                    const notesLabel = document.createElement("label")
                    notes.setAttribute("name","project-notes")
                    notes.setAttribute("id","project-notes")
                    notesLabel.setAttribute("for","project-notes")
                    notesLabel.textContent = "Notes:"
                    elementList.push(notesLabel, notes)
                    break;
                case "complete":
                    console.log("need complete divs")
            }
        })
        const buttonConfirm = document.createElement("button")
        buttonConfirm.classList.add("submit-project")
        buttonConfirm.textContent = "Confirm changes"
        elementList.push(buttonConfirm)
        return {elementList, buttonConfirm}


    }
    function createEditProject(element){
        const modalSkeleton = createModalSkeleton()
        const formElements = formFromObject(element)
        formElements.elementList.forEach((formElement) => {
            modalSkeleton.form.appendChild(formElement)
        })
        /** const name = document.createElement("input")
        const nameLabel = document.createElement("label")
        const description = document.createElement("textarea")
        const descLabel = document.createElement("label")
        const dueDate = document.createElement("input")
        const dateLabel = document.createElement("label")
        const priority = document.createElement("input")
        const priorityLabel = document.createElement("label")
        const notes = document.createElement("textarea")
        const notesLabel = document.createElement("label")
        const buttonConfirm = document.createElement("button")
        buttonConfirm.classList.add("submit-project")

        name.setAttribute("name", "project-name")
        name.setAttribute("type", "text")
        name.setAttribute("id", "project-name")
        name.setAttribute("required", "")
        name.setAttribute("maxlength", "60")
        description.setAttribute("name","project-description")
        description.setAttribute("id", "project-description")
        description.setAttribute("col", "10")
        description.setAttribute("rows", "5")
        description.setAttribute("required", "")
        dueDate.setAttribute("name","project-duedate")
        dueDate.setAttribute("type", "date")
        dueDate.setAttribute("id", "project-duedate")
        dueDate.setAttribute("required", "")
        priority.setAttribute("name","project-priority")
        priority.setAttribute("id", "project-priority")
        priority.setAttribute("required", "")
        priority.setAttribute("type", "number")
        priority.setAttribute("min", "1")
        priority.setAttribute("max", "5")
        notes.setAttribute("name","project-notes")
        notes.setAttribute("id","project-notes")
        nameLabel.setAttribute("for","project-name")
        descLabel.setAttribute("for","project-description")
        dateLabel.setAttribute("for","project-duedate")
        priorityLabel.setAttribute("for","project-priority")
        notesLabel.setAttribute("for","project-notes")

        dateLabel.textContent = "Due date:"
        nameLabel.textContent = "Project name:"
        priorityLabel.textContent = "Priority:"
        notesLabel.textContent = "Notes:"
        descLabel.textContent = "Description:"
        buttonConfirm.textContent = "Confirm changes"
        
        modalSkeleton.form.appendChild(nameLabel)
        modalSkeleton.form.appendChild(name)
        modalSkeleton.form.appendChild(descLabel)
        modalSkeleton.form.appendChild(description)
        modalSkeleton.form.appendChild(dateLabel)
        modalSkeleton.form.appendChild(dueDate)
        modalSkeleton.form.appendChild(priorityLabel)
        modalSkeleton.form.appendChild(priority)
        modalSkeleton.form.appendChild(notesLabel)
        modalSkeleton.form.appendChild(notes)
        modalSkeleton.form.appendChild(buttonConfirm) **/

        formElements.buttonConfirm.addEventListener("click", (event) => {
            event.preventDefault()
            console.log("confirm edit")
            modalOverlay.classList.add("hide")
            clearModal()
        })
        modalOverlay.classList.remove("hide")
    }
    function betterCreateEditModal(){
        console.log("test")

    }
    function createModalSkeleton(){
        const wrapper = document.createElement("div")
        const closeButtonWrapper = document.createElement("div")
        const closeButton = document.createElement("button")
        const content = document.createElement("div")
        const form = document.createElement("form")
        wrapper.classList.add("modal-wrapper")
        closeButtonWrapper.classList.add("close-btn-wrapper")
        closeButton.classList.add("close-modal-btn")
        closeButton.classList.add("edit-modal")
        form.classList.add("project-form")
        content.classList.add("modal-content")
        closeButton.textContent = "Close"
        modalOverlay.appendChild(wrapper)
        wrapper.appendChild(closeButtonWrapper)
        closeButtonWrapper.appendChild(closeButton)
        wrapper.appendChild(content)
        content.appendChild(form)

        closeButton.addEventListener("click", () => {
            console.log("close")
            modalOverlay.classList.add("hide")
            clearModal()
        })
        return {wrapper, closeButtonWrapper, closeButton, content, form}
    }

    function clearModal(){
        while (modalOverlay.hasChildNodes()){
            modalOverlay.removeChild(modalOverlay.firstChild);
        }

    }
    function clearProjects(){
        while (projectContainer.hasChildNodes()){
            projectContainer.removeChild(projectContainer.firstChild);
        }
    }
    
    
    function refreshProjects(){
        clearProjects()
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
                clearProjects();
                viewItems(element, element.getItems())
                
            })
            spanEdit.addEventListener("click", event => {
                clearModal();
                createEditProject(element);
            })
        })
    }
    function viewChecklist(todo){
        clearProjects();
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
        clearProjects()
        console.log("displaying todo items...")
        let projectContainer = document.querySelector("div[id=project-container]")
        mainController.listProjects().forEach(element => {
            viewItems(element,element.getItems())
        })
    }
    
    return {refreshProjects, clearProjects, refreshTodoItems}
    
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
