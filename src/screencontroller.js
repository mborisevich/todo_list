export {DOMController}
function DOMController(mainController){
    const openProjectModal = document.querySelector("button.open-modal-btn");
    const modalProjectOverlay = document.querySelector(".modal-overlay.project-overlay");
    const closeBtn = document.querySelector(".close-modal-btn.project-modal");
    const createProject = document.querySelector(".submit-project")

    const openItemModal = document.querySelector("button.open-modal-btn-item")
    const closeItemModal = document.querySelector(".close-modal-btn.item-modal")
    const modalItemOverlay=document.querySelector(".modal-overlay.item-overlay")
    const createItem = document.querySelector(".submit-item")
    const viewProjectsElement = document.querySelector(".view-projects")
    const viewItemsElement = document.querySelector(".view-items")
    const projectContainer = document.querySelector("div[id=project-container]")

    function InitializeMain(){

        viewItemsElement.addEventListener("click", event => refreshTodoItems())
        viewProjectsElement.addEventListener("click", event => refreshProjects())
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
    }

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
        refreshProjects();
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
        refreshTodoItems();
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
    const modalOverlay = document.querySelector(".edit-overlay");
    const navPanel = document.querySelector("div#nav-panel");
    function formFromObject(element){
        let properties = Object.keys(element);
        let elementList = [];
        properties.forEach(key => {
            switch(key){
                case "title":
                    const nameLabel = document.createElement("label")
                    const title = document.createElement("input")
                    nameLabel.textContent = "Title:"
                    title.setAttribute("name", "project-title")
                    title.setAttribute("type", "text")
                    title.setAttribute("id", "project-title")
                    title.setAttribute("required", "")
                    title.setAttribute("maxlength", "60")
                    nameLabel.setAttribute("for","project-title")
                    title.value = element.title
                    elementList.push(nameLabel, title)
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
                    description.value = element.description
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
                    dueDate.value = element.dueDate
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
                    priority.value = element.priority
                    elementList.push(priorityLabel, priority)
                    break;
                case "notes":
                    const notes = document.createElement("textarea")
                    const notesLabel = document.createElement("label")
                    notes.setAttribute("name","project-notes")
                    notes.setAttribute("id","project-notes")
                    notesLabel.setAttribute("for","project-notes")
                    notesLabel.textContent = "Notes:"
                    notes.value = element.notes
                    elementList.push(notesLabel, notes)
                    break;
                case "complete":
                    console.log("need complete divs")
            }
        })

        const buttonConfirm = document.createElement("button");
        buttonConfirm.classList.add("submit-project");
        buttonConfirm.textContent = "Confirm changes";
        elementList.push(buttonConfirm);
        return {elementList, buttonConfirm}
    }

    function createEditProject(element){
        const modalSkeleton = createModalSkeleton();
        const formElements = formFromObject(element);
        formElements.elementList.forEach((formElement) => {
            modalSkeleton.form.appendChild(formElement);
        })

        formElements.buttonConfirm.addEventListener("click", (event) => {
            event.preventDefault()
            const nameItem = modalOverlay.querySelector("input[name=project-title]");
            const descriptionItem = modalOverlay.querySelector("textarea[name=project-description]");
            const dateItem= modalOverlay.querySelector("input[name=project-duedate]");
            const priorItem = modalOverlay.querySelector("input[name=project-priority]");
            const notesItem= modalOverlay.querySelector("textarea[name=project-notes]");
            mainController.editProject(element, nameItem.value, descriptionItem.value, dateItem.value, priorItem.value, notesItem.value)
            refreshProjects();
            console.log("confirm edit");
            modalOverlay.classList.add("hide");
            clearModal();
            refreshProjects();
        })

        modalOverlay.classList.remove("hide");
    }
    function createEditTodo(element){
        const modalSkeleton = createModalSkeleton();
        const formElements = formFromObject(element);
        formElements.elementList.forEach((formElement) => {
            modalSkeleton.form.appendChild(formElement);
        })

        formElements.buttonConfirm.addEventListener("click", (event) => {
            event.preventDefault()
            const nameItem = modalOverlay.querySelector("input[name=project-title]");
            const descriptionItem = modalOverlay.querySelector("textarea[name=project-description]");
            const dateItem= modalOverlay.querySelector("input[name=project-duedate]");
            const priorItem = modalOverlay.querySelector("input[name=project-priority]");
            const notesItem= modalOverlay.querySelector("textarea[name=project-notes]");
            mainController.editItem(element, nameItem.value, descriptionItem.value, dateItem.value, priorItem.value, notesItem.value)
            refreshTodoItems();
            console.log("confirm edit");
            modalOverlay.classList.add("hide");
            clearModal();
            refreshTodoItems();
        })

        modalOverlay.classList.remove("hide")
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
    function refreshNav(){
        navPanel.replaceChildren()
        let headerNav = document.createElement("p")
        let headerNavProject = document.createElement("p")
        headerNav.textContent = "Todo: "
        let incomingTodo = mainController.listProjects()[0].getItems()[0];
        if (incomingTodo){
            headerNavProject.textContent = incomingTodo.getTitle()
        } else {
            headerNavProject.textContent = mainController.listProjects()[0].getTitle();
        }
        navPanel.appendChild(headerNav);
        navPanel.appendChild(headerNavProject);
    }
    
    function refreshProjects(){
        clearProjects();
        refreshNav();
        mainController.listProjects().forEach(element => {
            let projectContainer = document.querySelector("div[id=project-container]")
            let projectElement = document.createElement("div")
            let spanElement = document.createElement("span")
            let spanEdit = document.createElement("span")
            let buttonElement = document.createElement("button")
            let header = document.createElement("h1")
            let dueDate = document.createElement("p")
            let text = document.createElement("p")
            projectElement.classList.add("project")
            spanElement.setAttribute("id", "expand")
            spanEdit.setAttribute("id", "edit")
            header.innerHTML = element.getTitle()
            text.innerHTML = element.getDescription()
            dueDate.innerHTML = `Deadline: ${element.getDuedate()}`
            dueDate.classList.add("due-date")
            projectElement.appendChild(buttonElement)
            projectElement.appendChild(spanElement)
            projectElement.appendChild(spanEdit)
            projectElement.appendChild(header)
            projectElement.appendChild(dueDate)
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
                spanEdit.addEventListener("click", event => {
                    createEditTodo(item)
                })
        
        })


    }
    function refreshTodoItems(){
        clearProjects()
        console.log("displaying todo items...")
        mainController.listProjects().forEach(element => {
            viewItems(element,element.getItems())
        })
    }
    
    return {refreshProjects, clearProjects, refreshTodoItems, InitializeMain}
    
}