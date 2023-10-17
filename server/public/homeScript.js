import Validator from "./Validator.js"
import Utilities from "./Utilities.js"
class UiManipulator{
    static setUiEventListeners(taskId){
        //tools
        const finishTask = $(`#doneControl${taskId}`)
        const editTask = $(`#editControl${taskId}`)
        const deleteTask = $(`#deleteControl${taskId}`)
        
      
        //buttons within each card
        Utilities.ConnectClickTaskId(finishTask, TaskManager.finishTask, taskId)
        Utilities.ConnectClickTaskId(editTask, UiManipulator.showEditTask, taskId, 'Edit')
        Utilities.ConnectClickTaskId(deleteTask, TaskManager.deleteTask, taskId)
        
        
       
    }
    static setModalEventListeners(){
        const modal = document.querySelector("#modal");
        const mdlForm = document.getElementById('mdlAddTaskForm');
        mdlForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            TaskManager.submitTask(modal)

})
    }
    static sortDueDate(array, order){
        
        if(order == "ASC"){
            array.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        }
        else {
            array.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        }
        
        $("#taskDump").html("");
        const tools = `
                <div id="btnSortDueDate" class="col-12 d-flex pointer justify-content-end">
                    <img src="images/sort-numeric-down.svg"><img>
                </div>
             `
             $("#taskDump").append(tools)
        array.forEach((element)=>{
            addTaskUI(element)
        })
    }

    static addTaskUI(responseData){
        let colorCard = "";
        if(responseData.status === 'In-Progress'){
            colorCard = 'bg-warning';
        }
        else if (responseData.status === 'Done'){
            colorCard = 'bg-success';
        }
        else {
            colorCard = 'bg-danger'
        }
        if (!arrTasks.some((element) => element.taskId === responseData.taskId)) {
            arrTasks.push(responseData);
          }
          
        const content = `
        
        <div id="task${responseData.taskId}" class='card taskDiv text-center mx-2 my-2 col-12 col-md-3 '>
            
                <div class='card-header ${colorCard} text-white d-flex justify-content-between align-items-center'>
                    <span id='cardDueDate${responseData.taskId}' class="date">${responseData.dueDate}</span>
    
    
                    <div id= "taskEditToolsDiv">
                        
                        <svg id=doneControl${responseData.taskId} class="pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
    
                        <svg id=editControl${responseData.taskId} class="pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
    
                        <svg id= "deleteControl${responseData.taskId}"class="pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                    </div>
                </div>
                
            
            <div class='card-body'>
                
                 <h5 id='cardTitle${responseData.taskId}' class="card-title">${responseData.title}</h5>
                 <p id='cardDesc${responseData.taskId}' class="card-text">${responseData.description}</p>
    
            </div>
    
        </div>
        
        `
        $("#taskDump").append(content);
        UiManipulator.setUiEventListeners(responseData.taskId);
    }

    static finishTaskUI(task){
        console.log(task.taskId)
        if(task.status == "Done"){
            const element = $(`#task${task.taskId}`)
            const firstChild = element.children().first()
            firstChild.addClass("bg-success text-white")
            firstChild.removeClass("bg-warning bg-danger")
            
        }
    
    }
    static showEditTask(taskId, mode){
        const modalForm = document.getElementById("modal")
        modalForm.showModal();
        modalForm.style.opacity = 1;
    
        if(mode === 'Edit'){
           let currentTask = {}
            arrTasks.forEach((element)=>{
                if (element.taskId== taskId){
                    currentTask= element;
            }
           
            })
            $("#mdlTaskId").removeClass('hidden')
            $("#mdlTaskId").val("#" + currentTask.taskId)
            $("#mdlDueDate").val(currentTask.dueDate)
            $("#mdlTitle").val(currentTask.title)
            $("#mdlDesc").val(currentTask.description)
        

        }
        else{
            Utilities.clearControls("mdlDueDate", "mdlTitle", "mdlDesc")
         
            $("#mdlTaskId").addClass('hidden')
        }
        
           
    }
    static updateTaskUI(responseData){
        $(`#cardDueDate${responseData.taskId}`).html(responseData.dueDate)
        $(`#cardTitle${responseData.taskId}`).html(responseData.title)
        $(`#cardDesc${responseData.taskId}`).html(responseData.description)
    }
    
}
class TaskManager {
    
    static setEventListers(){
        let btnLogOut = $("#btnLogOut")
        //LogOut button
        Utilities.ConnectClickTaskId(btnLogOut, TaskManager.logOut)
    }
    static async generateTasks(){
        $("#taskDump").html("");
        try{
            const response = await fetch('http://localhost:3000/tasks', {
                method:'GET',
                credentials: 'include'
            })
            if(response.ok){
                const responseJson = await response.json();
                ///CREATES THE BUTTON TO ENABLE THE FORM TO ADD A NEW TASK
                const formAddTask = `
                <div id="taskCreator" class='mr-1 mt-3 mb-3 col-12 col-md-3 col-lg-2 pointer d-flex justify-content-center align-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                    </svg>
                </div>
        
            </div>
                
                `
                
                 $("#divBtnAddTask").html(formAddTask)
                 /*$("#divBtnAddTask").click(()=>{
                    showEditTask(null, 'Add')
                 });*/
                 let btnAddTask = $("#divBtnAddTask")
                 Utilities.ConnectClickTaskId(btnAddTask, UiManipulator.showEditTask, null, 'Add' );
                 
                 if($("#taskCreator")){
                    $(document).off('keydown');
                    $(document).one('keyup', (e)=>{
                        if(e.keyCode === 13 ||e.which == 13){
                            showEditTask();
                        } 
                    })
                 }
                 
                 
    
                 
                 //Cleaning the global array
                 arrTasks.length = 0;
                 //Create the sorting Tools
                 const tools = `
                    <div id="btnSortDueDate" class="col-12 d-flex pointer justify-content-end">
                        <img src="images/sort-numeric-down.svg"><img>
                    </div>
                 `
                 $("#taskDump").append(tools)
    
                 $("#btnSortDueDate").click(()=>{
                    UiManipulator.sortDueDate(responseJson, 'DESC')
                 })
                /////////////CREATES THE TASKS STORED IN THE DATABASE
                responseJson.forEach(element => {
                     UiManipulator.addTaskUI(element)
                });
        
            } 
          
        }
        catch(err){
            console.log(err);
        }
    }

    static async addTask(){
        if(!Validator.isEmpty('#mdlDueDate') &&
        !Validator.isEmpty('#mdlTitle') &&
        !Validator.isEmpty('#mdlDesc')){
        const dueDate = $("#mdlDueDate").val();
        const title = $("#mdlTitle").val();
        const description = $("#mdlDesc").val();

        const data = {
            title: title,
            description: description,
            dueDate: dueDate
        }

        try{
            const insertTask = await fetch('http://localhost:3000/tasks/create', {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(data)
            })
            const responseData = await insertTask.json()
            
            if(!insertTask.ok){
                const error = await insertTask.json()
                alert(error.message);
                $("#txtAddDueDate").focus()
                return false
            }
            else {
                
               UiManipulator.addTaskUI(responseData.task)
                

                return true;
            }
        }
        catch(err){
            console.log(err);
        }

       
    }
    else {
        alert("Please fill all fields");
    }
}
    static async deleteTask(taskId){
        try{
            const data = {
                taskId: taskId
            }
            const deleteTask = await fetch('http://localhost:3000/tasks/delete', {
                method: 'DELETE',
                headers:{'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(data)
            })
            if(deleteTask.ok){
                //generateTasks();
                $(`#task${taskId}`).remove();
                
                
                const index = arrTasks.findIndex(element => element.taskId === taskId);
                // If found, remove it from the array
                if (index !== -1) {
                    arrTasks.splice(index, 1);
                }
    
            }
        }
        catch(err){
            console.log(err)
        }
    }
    static async finishTask(taskId){
        try{
            const data = {
                taskId: taskId
            }
            const deleteTask = await fetch('http://localhost:3000/tasks/done', {
                method: 'PATCH',
                headers:{'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(data)
            })
            if(deleteTask.ok){
                let responseData = await deleteTask.json()
                
                UiManipulator.finishTaskUI(responseData.task)
                
            }
        }
        catch(err){
            console.log(err)
        }
    }
    static async updateTask(){
        const taskId = $("#mdlTaskId").val().substring(1)
        const newDueDate = $("#mdlDueDate").val()
        const newTitle = $("#mdlTitle").val()
        const newDesc = $("#mdlDesc").val()
        try{
            const data = {
                taskId: taskId,
                dueDate: newDueDate,
                title: newTitle,
                description: newDesc
                
            }
            const updateTask = await fetch('http://localhost:3000/tasks/update', {
                method: 'PATCH',
                headers:{'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(data)
            })
            const responseData = await updateTask.json()
            if(updateTask.ok){
                
                //update on the global array
                arrTasks.forEach((element)=>{
                    if(element.taskId == responseData.task.taskId){
                        element.dueDate = responseData.task.dueDate;
                        element.title = responseData.task.title;
                        element.description = responseData.task.description;
                    }
                })
                //update on the screen
                UiManipulator.updateTaskUI(responseData.task)
                
            }
        }
        catch(err){
            console.log(err)
        }
    }
    static async logOut(){
        const response = await fetch('http://localhost:3000/users/logout', {
            method: 'GET',
            credentials : "include"
        })
        if (response.ok) {
            window.location.href = "/login.html"
        }
    }
    static submitTask(modal){
        let isValid = true;
   
        Utilities.clearTags("errDate", "errTitle", "errDesc")

        if(Validator.isEmpty("#mdlDueDate")){
            $("#errDate").html("Please insert a valid date")
            isValid = false
        }
        else if (!Validator.checkDate($("#mdlDueDate").val())){
            $("#errDate").html("Dates in past are not allowed, please try again")
            isValid = false
        }
        if(!Validator.checkLength("mdlTitle", 5, 18)){
            $("#errTitle").html("The Title field must be between 5 and 18 characters")
            isValid = false
        }
        if(!Validator.checkLength("mdlDesc", 5, 30)){
            $("#errDesc").html("The Description field must be between 5 and 30 characters")
            isValid = false
        }
    
        if(isValid){
            if(!$("#mdlTaskId").hasClass('hidden')){
                TaskManager.updateTask()
            }
            else {
                TaskManager.addTask()
            }
            Utilities.clearControls("mdlDueDate", "mdlTitle", "mdlDesc")
            modal.style.opacity = 0;
            modal.close()
        }
    }
}


//Global task array
let arrTasks = [];
TaskManager.setEventListers()
UiManipulator.setModalEventListeners()
TaskManager.generateTasks()





