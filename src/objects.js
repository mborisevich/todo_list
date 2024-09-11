
export { TodoClass, defaultproject }
const defaultproject = []
class checklistItem {
    constructor(title, description){
        this.title = title,
        this.description = description,
        this.complete = 0
    }
    set complete(value){
        if (value == 0 & this.value == 1){
            this.value = value;
        } else if (value == 1 && this.value == 0){
            this.value = value
        }
    };
}
class Project {
    constructor(title, description){
        this.title = title,
        this.description = description,
        this.complete = 0
    }
    set setComplete(value){
        if (value == 0 & this.value == 1){
            this.value = value;
        } else if (value == 1 && this.value == 0){
            this.value = value
        }
    };
    //add function to add Todo items
}
class Todo{
    //Methods to count remaining open todo tasks
    static todoCounter = 0;
    static incrementTodo() {
        Todo.todoCounter += 1;
    }
    static decrementTodo() {
        Todo.todoCounter -= 1;
    }
    static countTodos(){
        console.log(Todo.todoCounter);
    }
    constructor(title, description, dueDate, priority, notes, checklist = [], project = defaultproject){
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.notes = notes,
        this.checklist = checklist,
        this.complete = 0;
        this.project = project
        Todo.incrementTodo();
        this.appendToProject();
    }
    //Add the initialized object to a project list
    appendToProject(){
        if (this.project){
            this.project.push(this)
        } else {
            defaultproject.push(this)
        }
    }
    unassignProject(){
        this.project.remove(this);
    }

    //Checklist methods
    addChecklistItem(item){
        this.checklist.push(item);
    }
    setComplete(value){
        if (this.complete == 0 && value == 1){
            Todo.decrementTodo();
            this.complete = value;
        } else if (this.complete == 1 && value == 0){
            Todo.incrementTodo();
            this.complete = value;
        }
    }

}; 
