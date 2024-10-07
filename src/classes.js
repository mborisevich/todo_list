import { compareAsc, compareDesc, format } from "date-fns"
export {checklistItem, Todo, Project}
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
    setTitle(title){
        this.title = title
    }
    setDescription(description){
        this.description= description
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
    removeChecklistItem(index){
        this.itemlist.splice(index, 1)
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
